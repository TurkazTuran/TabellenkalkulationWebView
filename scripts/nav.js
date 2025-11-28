'use strict';

(function () {
  const storageKey = 'tt_theme';
  const btn = document.getElementById('siteThemeToggle');
  if (!btn) return;

  const root = document.body;
  const applyTheme = (mode) => {
    const nextMode = mode === 'light' ? 'light' : 'dark';
    root.setAttribute('data-theme', nextMode);
    btn.setAttribute('aria-pressed', nextMode === 'dark' ? 'true' : 'false');
    try {
      localStorage.setItem(storageKey, nextMode);
    } catch (err) {
      console.warn('Theme preference could not be saved.', err);
    }
  };

  let saved;
  try {
    saved = localStorage.getItem(storageKey);
  } catch (err) {
    saved = null;
  }

  if (saved === 'light' || saved === 'dark') {
    applyTheme(saved);
  } else {
    applyTheme('dark');
  }

  btn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
})();

(function () {
  const navMenu = document.getElementById('primary-menu');
  const menuToggle = document.getElementById('menuToggle');
  if (!navMenu || !menuToggle) return;

  const srLabel = menuToggle.querySelector('.sr-only');

  const closeMenu = () => {
    navMenu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    if (srLabel) srLabel.textContent = 'Menünü aç';
  };

  const toggleMenu = () => {
    const isOpen = navMenu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    if (srLabel) srLabel.textContent = isOpen ? 'Menünü bağla' : 'Menünü aç';
  };

  menuToggle.addEventListener('click', toggleMenu);

  document.addEventListener('click', (evt) => {
    if (!navMenu.classList.contains('open')) return;
    if (!(evt.target instanceof Element)) return;
    if (navMenu.contains(evt.target) || menuToggle.contains(evt.target)) return;
    closeMenu();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') closeMenu();
  });

  const mediaQuery = window.matchMedia('(min-width: 961px)');
  const handleChange = (event) => {
    if (event.matches) closeMenu();
  };

  if (typeof mediaQuery.addEventListener === 'function') {
    mediaQuery.addEventListener('change', handleChange);
  } else if (typeof mediaQuery.addListener === 'function') {
    mediaQuery.addListener(handleChange);
  }

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
})();

(function () {
  const navMenu = document.getElementById('primary-menu');
  if (!navMenu) return;

  const resolveName = (value) => {
    if (!value) return '';
    try {
      const normalized = new URL(value, window.location.href);
      const path = normalized.pathname;
      const parts = path.split('/').filter(Boolean);
      return parts.length ? parts[parts.length - 1] : 'index.html';
    } catch (err) {
      const cleaned = value.split(/[?#]/)[0];
      const pieces = cleaned.split('/').filter(Boolean);
      return pieces.length ? pieces[pieces.length - 1] : cleaned;
    }
  };

  const currentPathname = (() => {
    const raw = window.location.pathname;
    const segments = raw.split('/').filter(Boolean);
    return segments.length ? segments[segments.length - 1] : 'index.html';
  })();

  navMenu.querySelectorAll('a[href]').forEach((anchor) => {
    const target = resolveName(anchor.getAttribute('href'));
    if (!target) return;
    if (target === currentPathname) {
      anchor.setAttribute('aria-current', 'page');
    }
  });
})();
