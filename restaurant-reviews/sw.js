const cacheName = 'restaurant-reviews-cache-v2';

self.addEventListener('install', function (event)
{

  event.waitUntil(
    caches.open(cacheName).then(function (cache)
    {
      return cache.addAll([
        '/',
        'restaurant.html',
        'js/dbhelper.js',
        'js/restaurant_info.js',
        'js/main.js',
        'js/app.js',
        'css/styles.css',
        'css/normalize.css',
        'img/1.jpg',
        'img/2.jpg',
        'img/3.jpg',
        'img/4.jpg',
        'img/5.jpg',
        'img/6.jpg',
        'img/7.jpg',
        'img/8.jpg',
        'img/9.jpg',
        'img/10.jpg',
        'data/restaurants.json'
      ]);
    })
  );
});

self.addEventListener('activate', function (event)
{
  event.waitUntil(
    caches.keys().then(function (cacheKeys)
    {
      return Promise.all(
        cacheKeys.filter(function (cacheX)
        {
          return cacheX.startsWith('restaurant-reviews') &&
            cacheX != cacheName;
        }).map(function (cacheX)
        {
          return caches.delete(cacheX);
        })
      );
    })
  );
});

self.addEventListener('fetch', function (event)
{
  event.respondWith(
    caches.match(event.request).then(function (response)
    {
      return response || fetch(event.request);
    })
  );
});