export function initBackToTop() {
  const button = document.createElement('button');
  button.className = 'back-to-top';
  button.setAttribute('aria-label', 'Back to top');
  button.innerHTML = '↑';
  document.body.appendChild(button);

  const toggleButton = () => {
    const scrolled = window.scrollY > window.innerHeight / 2;
    button.classList.toggle('visible', scrolled);
  };

  window.addEventListener('scroll', toggleButton);

  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

export function showNotification(message, type = 'success') {
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