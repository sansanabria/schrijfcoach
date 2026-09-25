// Service worker: makes Schrijfcoach usable offline.
//
// App files (same origin) are network-first: online you always get the latest
// deploy, offline the last cached copy is served. Fonts and the Supabase
// library (cross-origin CDN files) are cache-first, since their URLs are
// versioned and never change. Supabase API calls are never cached.
//
// Bump CACHE_VERSION only to force-drop old caches; normal deploys don't need it.

const CACHE_VERSION = 'v1';
const APP_CACHE = 'schrijfcoach-app-' + CACHE_VERSION;
const CDN_CACHE = 'schrijfcoach-cdn-' + CACHE_VERSION;
const NETWORK_TIMEOUT_MS = 4000;

const APP_SHELL = [
  './',
  'index.html',
  'manifest.json',
  'css/styles.css',
  'js/supabase-config.js',
  'js/supabase-auth.js',
  'js/data.js',
  'js/grammar-data.js',
  'js/reading-data.js',
  'js/app.js',
  'js/supabase-sync.js',
];

const CDN_HOSTS = ['cdn.jsdelivr.net', 'fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(APP_CACHE)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== APP_CACHE && k !== CDN_CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin === self.location.origin) {
    event.respondWith(networkFirst(req));
  } else if (CDN_HOSTS.includes(url.hostname)) {
    event.respondWith(cacheFirst(req));
  }
  // Anything else (Supabase API, etc.) goes straight to the network.
});

async function networkFirst(req) {
  const cache = await caches.open(APP_CACHE);
  const network = fetch(req).then(res => {
    if (res.ok) cache.put(req, res.clone());
    return res;
  });
  try {
    return await withTimeout(network, NETWORK_TIMEOUT_MS);
  } catch (e) {
    const cached = await cache.match(req, { ignoreSearch: true })
      // Navigations to any path fall back to the app page.
      || (req.mode === 'navigate' ? await cache.match('index.html') : undefined);
    if (cached) return cached;
    return network;   // slow but not offline, and nothing cached: keep waiting
  }
}

async function cacheFirst(req) {
  const cache = await caches.open(CDN_CACHE);
  const cached = await cache.match(req);
  if (cached) return cached;
  const res = await fetch(req);
  // Opaque (no-cors) responses have status 0 but are still usable.
  if (res.ok || res.type === 'opaque') cache.put(req, res.clone());
  return res;
}

function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('network timeout')), ms);
    promise.then(
      v => { clearTimeout(t); resolve(v); },
      e => { clearTimeout(t); reject(e); }
    );
  });
}
