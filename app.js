(() => {
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu-button]');
  const nav = document.querySelector('[data-nav]');
  const form = document.querySelector('[data-contact-form]');

  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 24);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('open', !open);
    header.classList.toggle('menu-open', !open);
  });

  nav?.addEventListener('click', event => {
    if (event.target.closest('a')) {
      menuButton?.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
      header?.classList.remove('menu-open');
    }
  });

  document.querySelector('[data-language]')?.addEventListener('click', () => {
    const message = document.querySelector('[data-form-message]');
    if (message) message.textContent = 'Spanish content is prepared in the architecture and remains pending approved localization.';
  });

  const observer = 'IntersectionObserver' in window
    ? new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      }), { threshold: 0.12 })
    : null;

  document.querySelectorAll('.reveal').forEach(element => {
    if (observer) observer.observe(element);
    else element.classList.add('visible');
  });

  document.querySelectorAll('[data-event]').forEach(element => {
    element.addEventListener('click', () => {
      const eventName = element.dataset.event;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: eventName });
    });
  });

  let contactStarted = false;
  form?.addEventListener('input', () => {
    if (!contactStarted) {
      contactStarted = true;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'contact_start' });
    }
  }, { once: true });

  form?.addEventListener('submit', event => {
    event.preventDefault();
    const message = form.querySelector('[data-form-message]');
    if (!form.checkValidity()) {
      form.reportValidity();
      message.textContent = 'Please complete the required fields.';
      return;
    }

    // Front-end prototype only. Replace with a secure server-side endpoint.
    message.textContent = 'Thank you. Your request has been prepared for submission. Connect the secure server endpoint before production.';
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'contact_submit_prototype' });
    form.reset();
  });
})();
