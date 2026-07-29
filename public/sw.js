// Cadence Crate — Service Worker
// Network-first for HTML (critical for PWA freshness)
// Cache-first for static assets (JS, CSS, fonts, images)

const CACHE_NAME = 'cadence-crate-v1';
const STATIC_ASSETS = /\.(js|css|woff2?|png|jpg|svg|ico|json)$/;

self.addEventListener('install', (event) => {
  (event as any).waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  (event as any).waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      );
    }).then(() => (self as any).clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = (event as any).request as Request;

  // Skip non-GET
  if (request.method !== 'GET') return;

  // Skip cross-origin
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Skip API routes — always network
  if (url.pathname.startsWith('/api/')) return;

  // Skip Next.js HMR / _next data
  if (url.pathname.startsWith('/_next/')) {
    (event as any).respondWith(cachesFirst(request));
    return;
  }

  // HTML: network-first
  if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
    (event as any).respondWith(networkFirst(request));
    return;
  }

  // Static assets: cache-first
  if (STATIC_ASSETS.test(url.pathname)) {
    (event as any).respondWith(cachesFirst(request));
    return;
  }

  // Default: network-first
  (event as any).respondWith(networkFirst(request));
});

async function networkFirst(request: Request): Promise<Response> {
  try {
    const response = await fetch(request);
    // Cache successful responses
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    // Offline fallback for HTML
    if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
      const offlineCache = await caches.match('/offline');
      if (offlineCache) return offlineCache;
    }
    return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
  }
}

async function cachesFirst(request: Request): Promise<Response> {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('Offline', { status: 503 });
  }
}
