const CACHE_NAME = "versao1";
const urlsToCache = ["./background.png", "./screenshot.png"];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                console.log(`Service Worker usando recurso do cache: ${response.url}`);
                return response;
            }
            console.log("ServiceWorker: Carregando recurso do servidor: ", event.request.url);
            return fetch(event.request); 
        })
    );
});
