if ('serviceWorker' in navigator) {
    console.log('cool');
      self.addEventListener('load', () => {
        window.navigator.serviceWorker
        .register('sw.js')
        .then((e) => console.log('the load event was fired by the browser %0' + e))
        .catch((error) => console.log('whoops, %0' + error));
      })
    }