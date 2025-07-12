
const CACHE_NAME = 'esale-uganda-v2';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/images/icon.png',
  '/images/logo.png',
  '/gadgets',
  '/fashion',
  '/cosmetics',
  '/accessories',
  '/property'
];

// Install event - cache resources
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Return cached version or fetch from network
        return response || fetch(event.request).then(function(fetchResponse) {
          // Cache successful responses
          if (fetchResponse && fetchResponse.status === 200) {
            const responseClone = fetchResponse.clone();
            caches.open(CACHE_NAME).then(function(cache) {
              cache.put(event.request, responseClone);
            });
          }
          return fetchResponse;
        });
      }).catch(function() {
        // Return offline page for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('/');
        }
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Background sync for offline actions
self.addEventListener('sync', function(event) {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

// Periodic background sync
self.addEventListener('periodicsync', function(event) {
  if (event.tag === 'content-sync') {
    event.waitUntil(syncContent());
  }
});

// Push notifications
self.addEventListener('push', function(event) {
  const options = {
    body: event.data ? event.data.text() : 'New updates available!',
    icon: '/images/icon.png',
    badge: '/images/icon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Products',
        icon: '/images/icon.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/images/icon.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Esale Uganda', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Helper functions
function doBackgroundSync() {
  return fetch('/api/sync')
    .then(response => response.json())
    .then(data => {
      console.log('Background sync completed:', data);
    })
    .catch(error => {
      console.log('Background sync failed:', error);
    });
}

function syncContent() {
  return fetch('/api/products')
    .then(response => response.json())
    .then(data => {
      return caches.open(CACHE_NAME).then(cache => {
        return cache.put('/api/products', new Response(JSON.stringify(data)));
      });
    })
    .catch(error => {
      console.log('Content sync failed:', error);
    });
}

// Update app in background
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
