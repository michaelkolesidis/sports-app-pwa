self.addEventListener('install', function (event) {
    console.log('The service worker is being installed.');
    event.waitUntil(
        caches.open('sports-app').then(function(cache) {
            return cache.addAll([
                '/index.html',
                '/style/style.css',
                '/manifest.json',
                '/assets/favicon.png',
                '/assets/olympic_rings_black.svg',
                '/assets/192.png',
                '/assets/512.png',
                '/script/main.js'
            ]);
        })
    );
});

self.addEventListener('fetch', function (event) {
    console.log('The service worker is serving the asset.');
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || caches.match('/index.html');
        })
    );
});