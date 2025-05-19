export function initMarquee() {
  const marqueeContent = document.querySelector('.marquee-content');
  const clientsSection = document.querySelector('.clients-section');
  
  if (marqueeContent) {
    const clientLogos = Array.from(marqueeContent.children);
    
    // Use DocumentFragment for better performance
    const fragment = document.createDocumentFragment();
    clientLogos.forEach(logo => {
      const clone = logo.cloneNode(true);
      fragment.appendChild(clone);
    });
    marqueeContent.appendChild(fragment);
    
    // Optimize animation
    marqueeContent.style.willChange = 'transform';
    
    // Adjust speed based on screen size
    adjustMarqueeSpeed();
    
    // Intersection Observer for performance
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('show');
              marqueeContent.style.animationPlayState = 'running';
            } else {
              marqueeContent.style.animationPlayState = 'paused';
            }
          });
        },
        { threshold: 0.2 }
      );
      
      if (clientsSection) {
        observer.observe(clientsSection);
      }
    }
  }
}

function adjustMarqueeSpeed() {
  const marqueeContent = document.querySelector('.marquee-content');
  if (!marqueeContent) return;
  
  const viewportWidth = window.innerWidth;
  const duration = viewportWidth < 480 ? 15 : viewportWidth < 768 ? 20 : 25;
  
  requestAnimationFrame(() => {
    marqueeContent.style.animationDuration = `${duration}s`;
  });
}