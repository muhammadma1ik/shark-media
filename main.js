/* ------------------------------------------------------------------ */
/*  Reveal the service cards – robust version                         */
/* ------------------------------------------------------------------ */
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.service-item');

  // 1️⃣ If nothing matched, bail early (HTML typo?) 
  if (!cards.length) {
    console.warn('No .service-item elements found!');
    return;
  }

  // 2️⃣ If IntersectionObserver exists, use it … 
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    cards.forEach(card => io.observe(card));
  } else {
    // 3️⃣ …otherwise just show them immediately (old browser fallback)
    cards.forEach(card => card.classList.add('show'));
  }

  import { initTextAnimation } from './textAnimation.js';
import { initLoading }      from './loading.js';
import { initMarquee }      from './marquee.js';

document.addEventListener('DOMContentLoaded', () => {
  initLoading();
  initTextAnimation();
  initMarquee();
  initSectionReveal();          // 🔸 NEW
});

/* ---------- NEW scroll-reveal helper ---------- */
function initSectionReveal(){
  const target = document.querySelector('.reveal-pop');
  if (!target) return;

  if ('IntersectionObserver' in window){
    const io = new IntersectionObserver(
      entries=>{
        entries.forEach(entry=>{
          if (entry.isIntersecting){
            entry.target.classList.add('show');
            io.unobserve(entry.target);
          }
        });
      },
      {threshold:0.25}
    );
    io.observe(target);
  }else{
    target.classList.add('show');   // fallback
  }
}


});
