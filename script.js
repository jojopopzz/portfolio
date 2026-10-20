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

  // Lightbox (only on pages that have one)
  const lightbox = document.querySelector('.lightbox');

  if (lightbox) {
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
  }

  // Fade content in as it scrolls into view
  const revealItems = document.querySelectorAll('.project, .service, .intro, .contact');
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
