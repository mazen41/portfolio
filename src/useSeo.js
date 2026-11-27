import { useEffect } from 'react';

const SITE = 'https://mazendev.nazbiz.io';

function setMeta(attr, key, value) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

// Sets title, description, canonical and social tags for the current route.
// This runs after JavaScript loads. Pre-rendering (P4) makes the same tags visible to crawlers without JS.
export default function useSeo({ title, description, path }) {
  useEffect(() => {
    const url = SITE + path;
    document.title = title;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setCanonical(url);
  }, [title, description, path]);
}
