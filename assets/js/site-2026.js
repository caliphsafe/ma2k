(() => {
  const body = document.body;
  const toggle = document.querySelector('[data-menu-toggle]');
  const mobileNav = document.querySelector('[data-mobile-nav]');

  if (toggle && mobileNav) {
    const closeMenu = () => {
      mobileNav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      body.classList.remove('is-menu-open');
    };
    toggle.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      body.classList.toggle('is-menu-open', open);
    });

    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        body.classList.remove('is-menu-open');
      });
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && mobileNav.classList.contains('is-open')) {
        closeMenu();
        toggle.focus();
      }
    });
    window.matchMedia('(min-width: 1101px)').addEventListener('change', (event) => {
      if (event.matches) closeMenu();
    });
  }

  document.querySelectorAll('[data-year]').forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.desktop-nav a, .mobile-nav a').forEach((link) => {
    const linkPage = link.getAttribute('href').split('#')[0];
    if (linkPage === currentPage) link.setAttribute('aria-current', 'page');
  });

  const revealItems = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealItems.length) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: .12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const params = new URLSearchParams(window.location.search);
  const method = params.get('method');
  const methodNote = document.querySelector('[data-order-method]');
  if (method && methodNote) {
    const labels = {
      'screen-printing': 'Screen printing',
      embroidery: 'Embroidery',
      dtf: 'DTF printing',
      'dtf-printing': 'DTF printing'
    };
    if (labels[method]) {
      methodNote.textContent = labels[method] + ' selected. Add the garment, artwork and timing you have in mind.';
      const methodSelect = document.querySelector('#project-method');
      if (methodSelect) methodSelect.value = labels[method];
    }
  }
})();
