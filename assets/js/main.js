(function () {
  'use strict';

  /* ========== NAV — scroll glass effect ========== */
  var nav = document.getElementById('nav');
  function checkNav() {
    if (window.scrollY > 80) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', checkNav, { passive: true });
  checkNav();

  /* ========== NAV — active section highlight ========== */
  var navLinks = document.querySelectorAll('.nav-link[data-section]');
  var sections = [];
  navLinks.forEach(function(link) {
    var id = link.dataset.section;
    var el = document.getElementById(id);
    if (el) sections.push({ el: el, link: link });
  });

  function updateActiveNav() {
    var scrollY = window.scrollY + 200;
    var active = null;
    sections.forEach(function(s) {
      if (s.el.offsetTop <= scrollY) active = s;
    });
    navLinks.forEach(function(l) { l.classList.remove('active'); });
    if (active) active.link.classList.add('active');
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });

  /* ========== HAMBURGER ========== */
  var hamburger = document.getElementById('hamburger');
  var mobileNav = document.getElementById('mobileNav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ========== SCROLL REVEAL ========== */
  var reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var revealObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var parent = el.parentElement;
          var siblings = parent ? parent.querySelectorAll('.reveal') : [];
          var idx = 0;
          siblings.forEach(function(s, i) { if (s === el) idx = i; });
          el.style.transitionDelay = (idx * 80) + 'ms';
          el.classList.add('revealed');
          revealObs.unobserve(el);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function(el) { revealObs.observe(el); });
  } else {
    reveals.forEach(function(el) { el.classList.add('revealed'); });
  }

  /* ========== ANIMATED COUNTERS ========== */
  function animateCounter(el, target, duration, suffix, prefix, decimals) {
    // Special case: $0 Setup Fee
    if (el.dataset.display) {
      el.textContent = el.dataset.display;
      return;
    }

    var start = performance.now();
    prefix = prefix || '';
    suffix = suffix || '';
    decimals = decimals || 0;

    function update(time) {
      var progress = Math.min((time - start) / duration, 1);
      // cubic ease-out
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = eased * target;

      if (decimals > 0) {
        el.textContent = prefix + current.toFixed(decimals) + suffix;
      } else {
        el.textContent = prefix + Math.round(current).toLocaleString() + suffix;
      }

      if (progress < 1) requestAnimationFrame(update);
      else {
        if (decimals > 0) el.textContent = prefix + target.toFixed(decimals) + suffix;
        else el.textContent = prefix + target.toLocaleString() + suffix;
      }
    }
    requestAnimationFrame(update);
  }

  var counterEls = document.querySelectorAll('[data-target]');

  if ('IntersectionObserver' in window) {
    var counterObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseFloat(el.dataset.target);
          var suffix = el.dataset.suffix || '';
          var prefix = el.dataset.prefix || '';
          var decimals = parseInt(el.dataset.decimals) || 0;
          animateCounter(el, target, 1500, suffix, prefix, decimals);
          counterObs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counterEls.forEach(function(el) { counterObs.observe(el); });
  }

  /* ========== HERO ANIMATION ========== */
  function animateHero() {
    var eyebrow = document.querySelector('.hero-eyebrow');
    var lines = document.querySelectorAll('.hero-title .line');
    var sub = document.querySelector('.hero-sub');
    var actions = document.querySelector('.hero-actions');
    var platforms = document.querySelector('.hero-platforms');

    var delay = 200;

    if (eyebrow) {
      setTimeout(function() {
        eyebrow.style.transition = 'opacity 500ms cubic-bezier(0.16,1,0.3,1)';
        eyebrow.style.opacity = '1';
      }, delay);
    }

    lines.forEach(function(line, i) {
      setTimeout(function() {
        line.style.transition = 'opacity 600ms cubic-bezier(0.16,1,0.3,1), transform 600ms cubic-bezier(0.16,1,0.3,1)';
        line.style.opacity = '1';
        line.style.transform = 'translateY(0)';
      }, delay + 300 + i * 150);
    });

    if (sub) {
      setTimeout(function() {
        sub.style.transition = 'opacity 500ms cubic-bezier(0.16,1,0.3,1)';
        sub.style.opacity = '1';
      }, delay + 300 + lines.length * 150 + 100);
    }

    if (actions) {
      setTimeout(function() {
        actions.style.transition = 'opacity 500ms cubic-bezier(0.16,1,0.3,1)';
        actions.style.opacity = '1';
      }, delay + 300 + lines.length * 150 + 300);
    }

    if (platforms) {
      setTimeout(function() {
        platforms.style.transition = 'opacity 500ms cubic-bezier(0.16,1,0.3,1)';
        platforms.style.opacity = '1';
      }, delay + 300 + lines.length * 150 + 500);
    }
  }

  // Fire hero animation after a brief delay
  if (document.readyState === 'complete') {
    animateHero();
  } else {
    window.addEventListener('load', animateHero);
  }

  /* ========== SMOOTH SCROLL ========== */
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ========== CONTACT FORM ========== */
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function() {
      var btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.textContent = 'Sending...'; btn.disabled = true; }
    });
  }
})();
