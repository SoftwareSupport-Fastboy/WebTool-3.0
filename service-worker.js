self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('my-cache').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/Style.css',
                '/manifest.json',
                '/Call-Script.js',
                '/Script.js',          
            ]);
        })
    );
});