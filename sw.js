let contentOfCaches = 'caches-v';
self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open(contentOfCaches).then(function(cache) {
        return cache.addAll(
          [
          'css/styles.css',
          'data/restaurants.json',
          'img/1.jpg',
          'img/2.jpg',
          'img/10.jpg',
          'img/3.jpg',
          'img/4.jpg',
          'img/5.jpg',
          'img/6.jpg',
          'img/7.jpg',
          'img/8.jpg',
          'img/9.jpg',
          'js/dbhelper.js',
          'js/main.js',
          'js/restaurant_info.js',
          'index.html',
          'register.js',
          'restaurant.html',
          'sw.js'
          ]
        ).catch((error) => {console.log('something went wrong %0' + error)});
      })
    );
  });

  self.addEventListener('activate', (event) => {
    console.log('activate event launched');
    event.waitUntil(
      caches.keys().then( (cacheNames) => {
        return Promise.all(cacheNames.map( (arrayElement) => {
          if (contentOfCaches !== arrayElement) {
            return caches.delete(arrayElement);
          }
        })).then(data => console.log(data))
        .catch(error => console.log('something went wront %0' + error))
      })
    )
  })

  //self.addEventListener('fetch', function(event) {
    //event.respondWith(
      //caches.match(event.request).then(function(response) {
        //return response;
      //})
    //);
  //});

  self.addEventListener('fetch',e=>{
    console.log("fetch is working");
    {
      event.respondWith(
        fetch(event.request)
        .then(response=>{
          const responseClone = response.clone();
          caches.open('contentOfCaches')
          .then(cache => {
            cache.put(event.request,responseClone);
          })
          return response;
        })
       .catch(error => caches.match(event.request).then(response => response))
      )
    }
  })