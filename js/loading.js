export function initLoading() {
  return new Promise((resolve) => {
    const loadingScreen = document.getElementById('loading-screen');
    const app = document.getElementById('app');
    const progress = document.querySelector('.progress');
    
    // If required elements don't exist, resolve immediately
    if (!loadingScreen || !app || !progress) {
      console.warn('Loading screen elements not found, skipping animation');
      if (app) {
        app.style.display = 'block';
      }
      resolve();
      return;
    }
    
    // Preload critical resources
    const preloadImages = [
      'images/shark-media-logo.png'
    ];
    
    Promise.all([
      ...preloadImages.map(src => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      }),
      document.fonts.ready
    ]).then(() => {
      let width = 0;
      const interval = setInterval(() => {
        if (width >= 100) {
          clearInterval(interval);
          requestAnimationFrame(() => {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.visibility = 'hidden';
            app.style.display = 'block';
            resolve();
          });
        } else {
          width += Math.random() * 15;
          if (width > 100) width = 100;
          progress.style.width = width + '%';
        }
      }, 100);
    });
    
    // Fallback
    setTimeout(() => {
      loadingScreen.style.opacity = '0';
      loadingScreen.style.visibility = 'hidden';
      app.style.display = 'block';
      resolve();
    }, 3000);
  });
}