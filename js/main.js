// Main & Forms Combined JavaScript

// Import only what's needed
import { initTextAnimation } from './textAnimation.js';
import { initLoading } from './loading.js';
import { initMarquee } from './marquee.js';
import { initNav } from './nav.js';
import { initBackToTop } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize loading first
  initLoading().then(() => {
    // Initialize other features after loading completes
    initTextAnimation();
    initMarquee();
    initScrollAnimations();
    initNav();
    initBackToTop();
    initFormHandling();
  });
});

function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: '50px' }
  );

  document.querySelectorAll('.service-item, .reveal-pop, .clients-section')
    .forEach(el => observer.observe(el));
}

// Form Handling Functions
export function initFormHandling() {
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Add loading state
      form.classList.add('form-loading');
      
      try {
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        showNotification('Form submitted successfully!', 'success');
        form.reset();
      } catch (error) {
        // Show error message
        showNotification('An error occurred. Please try again.', 'error');
      } finally {
        // Remove loading state
        form.classList.remove('form-loading');
      }
    });
  });
}

function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);

  // Force reflow
  notification.offsetHeight;

  // Show notification
  notification.classList.add('visible');

  // Remove after delay
  setTimeout(() => {
    notification.classList.remove('visible');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}