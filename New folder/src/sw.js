'use strict';

var cacheName = 'v4';
var cacheFiles = [
    'assets/style/main.css',
    'index.html',
    'manifest.json',
    'js/main.js',
    'https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css',
    'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'
];

var self = this;

self.addEventListener('install', function(e){
    console.log("[ServiceWorker] Installed");
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log("[ServiceWorker] Caching cacheFiles");
            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener('activate', function(e){
    console.log("[ServiceWorker] Activated");
    // remove old cache
    caches.keys().then(function(cacheNames) {
        return Promise.all(cacheNames.map(function (thisCacheName) {
            if (thisCacheName !== cacheName) {
                console.log("[ServiceWorker] removed " + thisCacheName);
                return caches.delete(thisCacheName)
            } else {
                console.log("[ServiceWorker] did not removed" + thisCacheName);
            }
        }))
    });

});

self.addEventListener('fetch', function(e){
    console.log("[ServiceWorker] Fetching", e.request.url);
    e.respondWith(
        caches.match(e.request).then(function (response) {
            if ( response ) {
                console.log("[ServiceWorker] Found in cache", e.request.url);
                return response;
            }
            var requestClone = e.request.clone();

            fetch(requestClone)
                .then(function(response){
                    if(!response) {
                        console.log("[ServiceWorker] No response from fetch");
                        return response;
                    }
                    var  responseClone  = response.clone();

                    caches.open(cacheName).then(function (cache) {
                        cache.put(e.request, responseClone)
                        return response;
                    });
                }).catch(function (err) {
                console.log("[ServiceWorker] Error Fetching & Caching New", err)
            });
            return fetch(e.request);
        })
    );



});