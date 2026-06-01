const menuTrigger = document.querySelector('.menu-trigger');
const mobileMenu = document.querySelector('.mobile-menu');
const scrollButtons = document.querySelectorAll('.scroll-button');
const showcase = document.getElementById('product-scroller');
const fadeEls = document.querySelectorAll('.fade-up');

menuTrigger?.addEventListener('click', () => {
  const expanded = menuTrigger.getAttribute('aria-expanded') === 'true';
  menuTrigger.setAttribute('aria-expanded', String(!expanded));
  mobileMenu?.classList.toggle('active');
  mobileMenu?.setAttribute('aria-hidden', String(expanded));
});

scrollButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (!showcase) return;
    const direction = button.dataset.direction;
    const offset = direction === 'left' ? -showcase.clientWidth * 0.75 : showcase.clientWidth * 0.75;
    showcase.scrollBy({ left: offset, behavior: 'smooth' });
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.18,
});

fadeEls.forEach((el) => revealObserver.observe(el));
