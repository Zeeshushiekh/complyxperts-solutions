(() => {
  'use strict';
  const phone = '918573983838';
  const whatsappLink = (message) => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  const menuButton = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('#mobile-nav');
  if (menuButton && mobileNav) {
    const setMenuOpen = (open) => {
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
      mobileNav.hidden = !open;
    };
    menuButton.addEventListener('click', () => setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true'));
    mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenuOpen(false)));
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setMenuOpen(false); });
  }

  document.querySelectorAll('[data-service]').forEach((link) => {
    const service = link.getAttribute('data-service');
    link.setAttribute('href', whatsappLink(`Hello ComplyXperts Solutions, I would like to enquire about ${service}.`));
  });

  const form = document.querySelector('#enquiry-form');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const name = document.querySelector('#name').value.trim();
      const service = document.querySelector('#service').value.trim();
      const details = document.querySelector('#message').value.trim();
      const lines = [`Hello ComplyXperts Solutions,`, `My name is ${name}.`, `I need assistance with: ${service}.`];
      if (details) lines.push(`Details: ${details}`);
      const url = whatsappLink(lines.join('\n'));
      window.location.assign(url);
    });
  }

  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('js-motion');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px 35px 0px' });
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  }
})();