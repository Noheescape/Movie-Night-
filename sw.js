const CACHE_NAME = 'movie-night-cache-v4';
const FILES_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon.png',
  './app.js'  // only if you have a separate JS file
  // Add any images your app uses here
];

// Install – cache all files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

// Activate – remove old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => key !== CACHE_NAME ? caches.delete(key) : null)
      )
    )
  );
  self.clients.claim();
});

// Fetch – serve cached files first
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
