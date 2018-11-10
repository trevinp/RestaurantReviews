
// http://jasonwatmore.com/post/2016/06/22/nodejs-setup-simple-http-server-local-web-server

const cachedFiles = [
    '/','/index.html', 'restaurant.html', '/css/styles.css', '/js/dbhelper.js', '/js/main.js','js/restaurant_info.js','/data/restaurants.json',
    '/img/1.jpg', '/img/2.jpg','/img/3.jpg','/img/4.jpg','/img/5.jpg','/img/6.jpg','/img/7.jpg','/img/8.jpg','/img/9.jpg','/img/10.jpg'
];

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('v1').then(function(cache) {
            return cache.addAll(cachedFiles);
        })
    );

})

//console.log('Service worker registered');
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function(response){
            if (response) {
                console.log('Found request in cache: ' , event.request);
                return response;
            }
            else {
                console.log('Request not found, returning cache', event.request);
                return fetch(event.request).then(function(response) {
                    const cloneResponse = response.clone();
                    caches.open('v1').then(function(cache) {
                        cache.put(event.request, cloneResponse);
                    })                    
                })
                return response;
            }
        })
    );
    console.log(event.request);
});