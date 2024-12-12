self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('my-cache').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/after-login.css',
                '/clockscripts.js',
                '/clockstyle.css',
                '/loader.css',
                '/login-createaccount-styles.css',
                '/manifest.json',
                '/offline-online-script.js',
                '/offline-online-style.css',
                '/scripts.js',            
            ]);
        })
    );
});