const CACHE_NAME = 'movie-night-cache-v3';
const FILES_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon.png',
  './style.css',  // replace with your actual CSS filename
  './app.js',     // replace with your actual JS filename
  // add any images used in your app, e.g. './images/movie1.png'
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

// Fetch – serve cached first, then network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
