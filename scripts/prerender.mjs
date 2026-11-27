// scripts/prerender.mjs
// Runs after "npm run build". Serves the CRA build folder locally, opens every URL
// listed in public/sitemap.xml in headless Chrome, and saves the rendered HTML as
// build/<route>/index.html so crawlers and link previews see real content.
// Usage: npm run build (postbuild runs this automatically).
// Optional: set CHROME_PATH to an installed Chrome or Edge if puppeteer's own browser is missing.

import { createServer } from 'node:http';
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const buildDir = path.join(root, 'build');
const sitemapPath = path.join(root, 'public', 'sitemap.xml');
const chromePath = process.env.CHROME_PATH || undefined;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

// Reads every <loc> from the sitemap and turns it into a route such as /about or /projects/nazbiz.
async function routesFromSitemap() {
  const xml = await readFile(sitemapPath, 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  const routes = locs.map((u) => new URL(u).pathname.replace(/\/+$/, '') || '/');
  return [...new Set(routes)];
}

// Serves build/ like a static host with an SPA fallback. The fallback uses the original
// shell held in memory, so a prerendered page never leaks into another route's render.
async function startServer(shellHtml) {
  const server = createServer(async (req, res) => {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let filePath = path.join(buildDir, pathname);
    if (!filePath.startsWith(buildDir)) {
      res.writeHead(403).end();
      return;
    }
    let body = null;
    try {
      const info = await stat(filePath);
      if (info.isDirectory()) filePath = path.join(filePath, 'index.html');
      body = await readFile(filePath);
    } catch {
      body = null;
    }
    if (body === null) {
      if (path.extname(pathname)) {
        res.writeHead(404).end();
        return;
      }
      res.writeHead(200, { 'Content-Type': MIME['.html'] }).end(shellHtml);
      return;
    }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream' });
    res.end(body);
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  return server;
}

// Opens one route, waits for React to mount and for entrance animations to settle,
// and returns the serialized DOM plus any console errors seen on the page.
async function renderRoute(browser, baseUrl, route) {
  const page = await browser.newPage();
  const problems = [];
  page.on('pageerror', (err) => problems.push(err.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error') problems.push(msg.text());
  });
  try {
    await page.goto(baseUrl + route, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForFunction(() => document.getElementById('root')?.children.length > 0, { timeout: 30000 });
    await new Promise((resolve) => setTimeout(resolve, 2500));
    // React's server output separates adjacent text nodes with <!-- --> so the browser
    // parses them as separate nodes. A client-rendered DOM lacks those comments, so add them
    // before saving, otherwise hydration reports text mismatches.
    await page.evaluate(() => {
      const mark = (node) => {
        let child = node.firstChild;
        while (child) {
          if (child.nodeType === 3 && child.nextSibling && child.nextSibling.nodeType === 3) {
            node.insertBefore(document.createComment(' '), child.nextSibling);
          }
          if (child.nodeType === 1) mark(child);
          child = child.nextSibling;
        }
      };
      mark(document.getElementById('root'));
    });
    const rootLength = await page.$eval('#root', (el) => el.innerHTML.length);
    const serialized = await page.content();
    // Analytics is re-added by the client on load, so keep it out of the saved file.
    const html = '<!DOCTYPE html>\n' + serialized.replace(/<script[^>]*_vercel\/insights[^>]*><\/script>/g, '');
    return { html, rootLength, problems };
  } finally {
    await page.close();
  }
}

const HYDRATION_ERROR = /hydrat|Minified React error #(418|419|423|425)/i;

async function main() {
  // Vercel's build machine has no Chrome. Skip here so deploys do not fail.
  if (process.env.VERCEL) {
    console.log('Skipping prerender: this is a Vercel build, which has no Chrome. Prerender locally with npm run build.');
    return;
  }
  const routes = await routesFromSitemap();
  console.log('Routes from sitemap: ' + routes.length);

  const shellHtml = await readFile(path.join(buildDir, 'index.html'), 'utf8');
  const server = await startServer(shellHtml);
  const baseUrl = 'http://127.0.0.1:' + server.address().port;
  const browser = await puppeteer.launch({ headless: true, executablePath: chromePath });

  let failed = 0;
  const hydrationIssues = [];
  try {
    // Pass 1: render every route and write its HTML.
    for (const route of routes) {
      const { html, rootLength, problems } = await renderRoute(browser, baseUrl, route);
      if (rootLength < 500) {
        failed++;
        console.error('FAIL ' + route + ': #root is almost empty (' + rootLength + ' chars)');
        continue;
      }
      const outDir = path.join(buildDir, route);
      await mkdir(outDir, { recursive: true });
      await writeFile(path.join(outDir, 'index.html'), html, 'utf8');
      console.log('OK   ' + route + ' -> ' + path.relative(root, path.join(outDir, 'index.html')));
      if (problems.length) console.log('     console errors on this route: ' + problems.length);
    }

    // Pass 2: load the saved files and check that React hydrates them without mismatches.
    for (const route of routes) {
      const { problems } = await renderRoute(browser, baseUrl, route);
      const bad = problems.filter((p) => HYDRATION_ERROR.test(p));
      for (const p of bad) hydrationIssues.push(route + ': ' + p);
    }
  } finally {
    await browser.close();
    server.close();
  }

  if (failed) {
    console.error(failed + ' route(s) failed to prerender.');
    process.exit(1);
  }
  if (hydrationIssues.length) {
    console.warn('WARNING: hydration issues found (build still succeeds):');
    for (const line of hydrationIssues) console.warn('  ' + line);
  } else {
    console.log('No hydration errors on any route.');
  }
  console.log('Prerendered ' + routes.length + ' routes.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
