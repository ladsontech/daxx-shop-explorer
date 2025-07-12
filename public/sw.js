
const CACHE_NAME = 'esale-uganda-v3'; // Updated version
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

// Fetch event - serve from cache with network-first strategy for dynamic content
self.addEventListener('fetch', function(event) {
  const url = new URL(event.request.url);
  
  // Network-first strategy for API calls and dynamic content
  if (event.request.url.includes('/api/') || 
      event.request.url.includes('supabase') ||
      event.request.method !== 'GET') {
    event.respondWith(
      fetch(event.request)
        .then(function(response) {
          // Cache successful responses
          if (response && response.status === 200 && response.type === 'basic') {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then(function(cache) {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(function() {
          // Fallback to cache if network fails
          return caches.match(event.request);
        })
    );
    return;
  }
  
  // Cache-first strategy for static assets
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Return cached version if available
        if (response) {
          // Still fetch from network to update cache in background
          fetch(event.request).then(function(fetchResponse) {
            if (fetchResponse && fetchResponse.status === 200) {
              const responseClone = fetchResponse.clone();
              caches.open(CACHE_NAME).then(function(cache) {
                cache.put(event.request, responseClone);
              });
            }
          }).catch(() => {
            // Ignore network errors for background updates
          });
          return response;
        }
        
        // If not in cache, fetch from network
        return fetch(event.request).then(function(fetchResponse) {
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

// Background sync for offline actions - Fixed with proper error handling
self.addEventListener('sync', function(event) {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
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
      // Don't throw error to prevent unhandled rejection
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
      // Don't throw error to prevent unhandled rejection
    });
}

// Update app in background
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
