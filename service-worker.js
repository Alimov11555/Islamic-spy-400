// v4 — network-first JS/HTML, keshni yangilash
const CACHE_NAME = 'islamic-spy-v4';
const STATIC_ASSETS = [
  './',
  'index.html?v=4',
  'style.css?v=4',
  'names.js?v=4',
  'manifest.json?v=4'
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(STATIC_ASSETS)));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// HTML/JS uchun network-first, boshqalarga cache-first
self.addEventListener('fetch', e => {
  const url = e.request.url;
  const isHTML = url.endsWith('.html') || url.includes('index.html');
  const isJS   = url.endsWith('.js');

  if (isHTML || isJS) {
    e.respondWith(
      fetch(e.request).then(resp => {
        const copy = resp.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, copy));
        return resp;
      }).catch(() => caches.match(e.request))
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(r => r || fetch(e.request))
    );
  }
});
