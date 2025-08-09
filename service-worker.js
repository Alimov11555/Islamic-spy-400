// v3 — keshni yangilash va eskilarni tozalash
const CACHE_NAME = 'islamic-spy-v3';
const urlsToCache = [
  './',
  'index.html?v=3',
  'style.css?v=3',
  'app.js?v=3',
  'names.js?v=3',
  'manifest.json?v=3'
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(urlsToCache)));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
