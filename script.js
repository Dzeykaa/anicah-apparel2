const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const filterButtons = document.querySelectorAll('.filter-button');
const productCards = document.querySelectorAll('.product-card');
const searchInput = document.getElementById('product-search');
const searchButton = document.getElementById('search-button');
const inquiryButtons = document.querySelectorAll('.inquiry-button');
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.querySelector('.modal-close');

navToggle?.addEventListener('click', () => {
  const expanded = navLinks.classList.toggle('active');
  navToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
});

const revealTargets = document.querySelectorAll('section, .reveal, .product-card, .featured-card, .service-card, .upsell-card, .testimonial-card, .contact-card, .stat-card');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.16,
});

revealTargets.forEach((target) => {
  if (!target.classList.contains('reveal')) {
    target.classList.add('reveal');
  }
  revealObserver.observe(target);
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');

    productCards.forEach((card) => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

const filterProducts = () => {
  const query = searchInput.value.trim().toLowerCase();
  productCards.forEach((card) => {
    const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
    const description = card.querySelector('p')?.textContent.toLowerCase() || '';
    const category = card.dataset.category.toLowerCase();
    const match = title.includes(query) || description.includes(query) || category.includes(query);
    card.style.display = query ? (match ? '' : 'none') : '';
  });
};

searchButton?.addEventListener('click', filterProducts);
searchInput?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    filterProducts();
  }
});

inquiryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    modalOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });
});

modalClose.addEventListener('click', () => {
  modalOverlay.classList.add('hidden');
  document.body.style.overflow = '';
});

modalOverlay.addEventListener('click', (event) => {
  if (event.target === modalOverlay) {
    modalOverlay.classList.add('hidden');
    document.body.style.overflow = '';
  }
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 16) {
    document.querySelector('.topbar')?.classList.add('scrolled');
  } else {
    document.querySelector('.topbar')?.classList.remove('scrolled');
  }
});
