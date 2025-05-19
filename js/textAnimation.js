/**
 * Controls the text cycling and gradient animation
 */
export function initTextAnimation() {
  const textItems = document.querySelectorAll('.text-item');
  
  // Only run animation if text items exist
  if (textItems && textItems.length > 0) {
    let currentIndex = 0;
    
    // Start with the first item active
    setTimeout(() => {
      textItems[currentIndex].classList.add('active');
    }, 1000); // Delay first animation to let page load
    
    // Cycle through text items
    setInterval(() => {
      // Remove active class from current item
      textItems[currentIndex].classList.remove('active');
      
      // Update index to next item
      currentIndex = (currentIndex + 1) % textItems.length;
      
      // Add active class to new current item
      textItems[currentIndex].classList.add('active');
    }, 3000); // 3 seconds per item (1s animation + 2s display time)
  }
}