/* ═══════════════════════════════════════════
   MUSTAPHA ABDULSALAM — PORTFOLIO SCRIPT
   CodeAlpha Internship
   ═══════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────
   1. NAVBAR — sticky + mobile toggle
───────────────────────────────────────── */
(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const toggle    = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');
  const links     = navLinks.querySelectorAll('a');

  // Scrolled state
  function updateNavbar() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  // Mobile toggle
  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    }
  });
})();


/* ─────────────────────────────────────────
   2. HERO VIDEO — performance optimised
───────────────────────────────────────── */
(function initHeroVideo() {
  const video = document.querySelector('.hero-video');
  if (!video) return;

  // Reduce motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    video.pause();
    video.style.display = 'none';
    return;
  }

  // Pause when tab hidden (save CPU/battery)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  });

  // Pause when hero not visible (intersection)
  const heroSection = document.getElementById('hero');
  if (heroSection && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(heroSection);
  }
})();


/* ─────────────────────────────────────────
   3. SCROLL REVEAL ANIMATIONS
───────────────────────────────────────── */
(function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
  );

  // Stagger cards in grids
  document.querySelectorAll('.projects-grid, .skills-categories, .contact-items').forEach(container => {
    const children = container.querySelectorAll('.reveal');
    children.forEach((child, i) => {
      child.style.transitionDelay = `${i * 0.1}s`;
    });
  });

  els.forEach(el => obs.observe(el));
})();


/* ─────────────────────────────────────────
   4. SKILL BAR ANIMATION
───────────────────────────────────────── */
(function initSkillBars() {
  const fills = document.querySelectorAll('.skill-bar-fill');
  if (!fills.length) return;

  if (!('IntersectionObserver' in window)) {
    fills.forEach(el => el.style.width = el.dataset.width + '%');
    return;
  }

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          fill.style.width = fill.dataset.width + '%';
          obs.unobserve(fill);
        }
      });
    },
    { threshold: 0.3 }
  );

  fills.forEach(fill => obs.observe(fill));
})();


/* ─────────────────────────────────────────
   5. SMOOTH SCROLL for anchor links
───────────────────────────────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH   = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
      const top    = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


/* ─────────────────────────────────────────
   6. CONTACT FORM — client-side feedback
───────────────────────────────────────── */
(function initContactForm() {
  const btn     = document.getElementById('formSubmit');
  const success = document.getElementById('formSuccess');
  if (!btn) return;

  function getVal(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  function setError(input, show) {
    if (!input) return;
    input.style.borderColor = show ? '#f87171' : '';
    input.style.boxShadow   = show ? '0 0 0 3px rgba(248,113,113,0.12)' : '';
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  btn.addEventListener('click', () => {
    const fnameEl   = document.getElementById('fname');
    const emailEl   = document.getElementById('email');
    const messageEl = document.getElementById('message');

    const fname   = getVal('fname');
    const email   = getVal('email');
    const message = getVal('message');

    let valid = true;

    setError(fnameEl,   !fname);
    setError(emailEl,   !email || !isValidEmail(email));
    setError(messageEl, !message);

    if (!fname)                    { valid = false; fnameEl?.focus(); }
    else if (!email || !isValidEmail(email)) { valid = false; emailEl?.focus(); }
    else if (!message)             { valid = false; messageEl?.focus(); }

    if (!valid) {
      btn.style.animation = 'shake .4s ease';
      setTimeout(() => btn.style.animation = '', 500);
      return;
    }

    // Simulate submit
    btn.disabled = true;
    btn.querySelector('.form-submit-text').textContent = 'Sending…';

    setTimeout(() => {
      btn.style.display = 'none';
      success.classList.add('show');

      // Reset inputs
      ['fname','lname','email','subject','message'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
      });
    }, 1200);
  });

  // Remove error styling on focus
  document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('focus', () => setError(input, false));
  });
})();


/* ─────────────────────────────────────────
   7. HERO PARALLAX (subtle, desktop only)
───────────────────────────────────────── */
(function initHeroParallax() {
  const hero    = document.getElementById('hero');
  const content = hero ? hero.querySelector('.hero-content') : null;
  if (!content) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || window.innerWidth < 768) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const heroH   = hero.offsetHeight;
        if (scrollY < heroH) {
          const ratio = scrollY / heroH;
          content.style.transform  = `translateY(${scrollY * 0.22}px)`;
          content.style.opacity    = `${1 - ratio * 1.4}`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();


/* ─────────────────────────────────────────
   8. ACTIVE NAV LINK on scroll
───────────────────────────────────────── */
(function initActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');
  if (!sections.length || !links.length) return;

  function updateActive() {
    const scrollY = window.scrollY + window.innerHeight * 0.3;
    let current = '';
    sections.forEach(section => {
      if (section.offsetTop <= scrollY) current = section.id;
    });
    links.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', href === current);
    });
  }

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
})();


/* ─────────────────────────────────────────
   9. SHAKE KEYFRAME (inject dynamically)
───────────────────────────────────────── */
(function injectShakeKeyframe() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%,100% { transform: translateX(0); }
      20%      { transform: translateX(-6px); }
      40%      { transform: translateX(6px); }
      60%      { transform: translateX(-4px); }
      80%      { transform: translateX(4px); }
    }
    .nav-link.active {
      color: var(--text) !important;
    }
    .nav-link.active::after {
      width: 100% !important;
    }
  `;
  document.head.appendChild(style);
})();


/* ─────────────────────────────────────────
   10. PREFERS REDUCED MOTION — disable all
───────────────────────────────────────── */
(function respectReducedMotion() {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mq.matches) {
    const style = document.createElement('style');
    style.textContent = `
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    `;
    document.head.appendChild(style);
  }
})();
