// Scheme Access Kit Service Worker
const CACHE_NAME = 'sak-cache-v1';
const OFFLINE_URLS = [
  '/',
  '/en',
  '/kn',
  '/te',
  '/hi',
  '/en/checklist',
  '/kn/checklist',
  '/te/checklist',
  '/en/schemes',
  '/kn/schemes',
  '/te/schemes',
  '/en/finder',
  '/kn/finder',
  '/te/finder',
  '/en/glossary',
  '/kn/glossary',
  '/te/glossary',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(OFFLINE_URLS).catch((err) => {
        console.warn('Pre-cache notice:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Only intercept GET requests
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Ignore API requests and auth callbacks from caching
  if (url.pathname.startsWith('/api') || url.pathname.includes('/auth/')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Stale-while-revalidate strategy
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // If offline and not in cache, fallback to main page
          return cachedResponse;
        });

      return cachedResponse || fetchPromise;
    })
  );
});
