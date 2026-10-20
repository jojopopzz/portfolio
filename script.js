document.addEventListener('DOMContentLoaded', () => {
  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile navigation
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');

  const setNavOpen = (open) => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open);
    toggle.textContent = open ? 'Close' : 'Menu';
  };

  toggle.addEventListener('click', () => setNavOpen(!nav.classList.contains('is-open')));
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setNavOpen(false));
  });

  // Lightbox
  const lightbox = document.querySelector('.lightbox');
  const lightboxContent = lightbox.querySelector('.lightbox-content');

  const closeLightbox = () => {
    lightbox.hidden = true;
    lightboxContent.innerHTML = '';
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.media:not(.media--hero)').forEach((media) => {
    media.addEventListener('click', () => {
      lightboxContent.appendChild(media.firstElementChild.cloneNode(true));
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
    });
  });

  lightbox.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !lightbox.hidden) closeLightbox();
  });

  // Work page filters
  const filters = document.querySelectorAll('.filter');
  const projects = document.querySelectorAll('.project[data-category]');

  filters.forEach((button) => {
    button.addEventListener('click', () => {
      const category = button.dataset.filter;

      filters.forEach((other) => {
        const active = other === button;
        other.classList.toggle('is-active', active);
        other.setAttribute('aria-pressed', active);
      });

      projects.forEach((project) => {
        const show = category === 'all' || project.dataset.category === category;
        project.classList.toggle('is-hidden', !show);
        if (show) project.classList.add('is-visible');
      });
    });
  });

  // Fade content in as it scrolls into view
  const revealItems = document.querySelectorAll('.project, .service, .intro, .contact, .cta');
  revealItems.forEach((item) => item.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealItems.forEach((item) => observer.observe(item));
});
