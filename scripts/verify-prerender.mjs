// scripts/verify-prerender.mjs
// Checks every prerendered route in build/ for the title, canonical tag, visible text,
// and any leftover old domain. Exits with code 1 if a route fails.
import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const buildDir = path.join(root, 'build');
const sitemapPath = path.join(root, 'public', 'sitemap.xml');
const SITE = 'https://mazendev.nazbiz.io';
const OLD_DOMAINS = ['mazenhossny.vercel.app', 'portfolioone-alpha-65'];
const MIN_TEXT_CHARS = 300;

async function routesFromSitemap() {
  const xml = await readFile(sitemapPath, 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  return [...new Set(locs.map((u) => new URL(u).pathname.replace(/\/+$/, '') || '/'))];
}

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<head[\s\S]*?<\/head>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalize(url) {
  return url.replace(/\/+$/, '') || '/';
}

async function checkRoute(route) {
  const file = path.join(buildDir, route, 'index.html');
  const problems = [];
  try {
    await access(file);
  } catch {
    return { route, title: '', text: 0, problems: ['missing ' + path.relative(root, file)] };
  }
  const html = await readFile(file, 'utf8');

  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';
  if (!title) problems.push('no <title>');

  const canonTag = html.match(/<link[^>]*rel="canonical"[^>]*>/i);
  const hrefMatch = canonTag ? canonTag[0].match(/href="([^"]+)"/) : null;
  const canonical = hrefMatch ? hrefMatch[1] : '';
  const expected = SITE + (route === '/' ? '/' : route);
  if (normalize(canonical) !== normalize(expected)) problems.push('canonical is "' + canonical + '"');

  const text = visibleText(html);
  if (text.length < MIN_TEXT_CHARS) problems.push('only ' + text.length + ' chars of visible text');
  // The no-JS text is expected inside <noscript>, so only check the rest of the page.
  const outsideNoscript = html.replace(/<noscript[\s\S]*?<\/noscript>/gi, '');
  if (/You need to enable JavaScript/i.test(outsideNoscript)) problems.push('no-JS message is visible');

  for (const old of OLD_DOMAINS) {
    if (html.includes(old)) problems.push('contains old domain ' + old);
  }
  return { route, title, canonical, text: text.length, problems };
}

async function main() {
  if (process.env.VERCEL) {
    console.log('Skipping prerender verification on Vercel (prerender is skipped there too).');
    return;
  }
  const routes = await routesFromSitemap();
  const results = [];
  for (const route of routes) results.push(await checkRoute(route));

  console.log('route'.padEnd(34) + 'text'.padEnd(8) + 'status  title');
  for (const r of results) {
    const status = r.problems.length ? 'FAIL' : 'ok';
    console.log(r.route.padEnd(34) + String(r.text).padEnd(8) + status.padEnd(8) + r.title);
    for (const p of r.problems) console.log('      - ' + p);
  }

  const titles = results.map((r) => r.title);
  const dupes = titles.filter((t, i) => t && titles.indexOf(t) !== i);
  if (dupes.length) console.warn('WARNING: some routes share a title: ' + [...new Set(dupes)].join(' | '));

  const failed = results.filter((r) => r.problems.length).length;
  console.log(failed ? failed + ' route(s) failed verification.' : 'All ' + results.length + ' routes verified.');
  if (failed) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
