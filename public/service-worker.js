const STATIC_CACHE = 'school-insight-board-static-v3';
const DATA_CACHE = 'school-insight-board-data-v3';
const FALLBACK_CACHE = 'school-insight-board-fallback-v3';
const STATIC_ASSETS = ['/manifest.webmanifest', '/icons/icon-192.png', '/icons/icon-512.png'];

self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(FALLBACK_CACHE).then((cache) => cache.addAll(STATIC_ASSETS)));
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        (async () => {
            const keys = await caches.keys();
            await Promise.all(
                keys.map((key) => {
                    if (![STATIC_CACHE, DATA_CACHE, FALLBACK_CACHE].includes(key)) {
                        return caches.delete(key);
                    }
                    return null;
                })
            );
            await self.clients.claim();
        })()
    );
});

self.addEventListener('message', (event) => {
    if (event.data?.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

self.addEventListener('fetch', (event) => {
    const { request } = event;

    if (request.method !== 'GET') return;

    const url = new URL(request.url);

    // Always prefer fresh HTML/navigation to avoid stale UI after deploy.
    if (request.mode === 'navigate') {
        event.respondWith(networkFirst(request));
        return;
    }

    if (url.pathname.startsWith('/api')) {
        event.respondWith(networkThenCache(request));
        return;
    }

    if (url.origin === self.location.origin) {
        if (isStaticAsset(url.pathname)) {
            event.respondWith(staleWhileRevalidate(request));
            return;
        }

        // For non-static same-origin requests, prefer network to keep content fresh.
        event.respondWith(networkFirst(request));
    }
});

const isStaticAsset = (pathname) => {
    return (
        pathname.startsWith('/assets/') ||
        /\.(?:js|css|png|jpg|jpeg|webp|gif|svg|ico|woff2?)$/i.test(pathname)
    );
};

const staleWhileRevalidate = async (request) => {
    const cache = await caches.open(STATIC_CACHE);
    const cached = await cache.match(request);

    const networkPromise = fetch(request)
        .then((response) => {
            if (response && response.ok) {
                cache.put(request, response.clone());
            }
            return response;
        })
        .catch(() => null);

    if (cached) return cached;

    const networkResponse = await networkPromise;
    if (networkResponse) return networkResponse;

    return fetch(request);
};

const networkFirst = async (request) => {
    try {
        return await fetch(request, { cache: 'no-store' });
    } catch (error) {
        const cache = await caches.open(STATIC_CACHE);
        const fallback = await cache.match(request);
        if (fallback) return fallback;

        if (request.mode === 'navigate') {
            const fallbackCache = await caches.open(FALLBACK_CACHE);
            const manifest = await fallbackCache.match('/manifest.webmanifest');
            if (manifest) return manifest;
        }

        throw error;
    }
};

const networkThenCache = async (request) => {
    const cache = await caches.open(DATA_CACHE);
    try {
        const networkResponse = await fetch(request, { cache: 'no-store' });
        if (networkResponse && networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        const cachedResponse = await cache.match(request);
        if (cachedResponse) return cachedResponse;
        throw error;
    }
};
