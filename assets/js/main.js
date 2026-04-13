/* ============================================================
   CoHost Management — Main JS
   Navigation, scroll reveals, counters, GSAP animations
   ============================================================ */

(function () {
  'use strict';

  /* -------------------------------------------------------
     Navigation — scroll effect & mobile menu
     ------------------------------------------------------- */
  const nav = document.getElementById('nav');
  const hamburger = document.getElementById('navHamburger');
  const mobileNav = document.getElementById('navMobile');

  // Scrolled glass effect
  function updateNav() {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // Hamburger toggle
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* -------------------------------------------------------
     Scroll Reveal — IntersectionObserver
     ------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // Stagger delay for siblings
            const siblings = entry.target.parentElement.querySelectorAll('.reveal');
            let index = 0;
            siblings.forEach((el, idx) => {
              if (el === entry.target) index = idx;
            });
            entry.target.style.transitionDelay = (index * 80) + 'ms';
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback
    revealElements.forEach((el) => el.classList.add('revealed'));
  }

  /* -------------------------------------------------------
     Animated Counters
     ------------------------------------------------------- */
  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const decimals = parseInt(el.dataset.decimals) || 0;
    const duration = 2000;
    const startTime = performance.now();

    // Special case for $0 setup fee
    if (target === 0 && prefix === '$') {
      el.textContent = '$0';
      return;
    }

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      if (decimals > 0) {
        el.textContent = prefix + current.toFixed(decimals) + suffix;
      } else {
        el.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        if (decimals > 0) {
          el.textContent = prefix + target.toFixed(decimals) + suffix;
        } else {
          el.textContent = prefix + target.toLocaleString() + suffix;
        }
      }
    }

    requestAnimationFrame(update);
  }

  // Observe stat numbers
  const counterElements = document.querySelectorAll('[data-target]');
  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counterElements.forEach((el) => counterObserver.observe(el));
  }

  // Observe stat items for reveal
  const statItems = document.querySelectorAll('.stat-item');
  if ('IntersectionObserver' in window) {
    const statObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const siblings = entry.target.parentElement.querySelectorAll('.stat-item');
            let index = 0;
            siblings.forEach((el, idx) => {
              if (el === entry.target) index = idx;
            });
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
              entry.target.style.transition = 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)';
            }, index * 120);
            statObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    statItems.forEach((el) => statObserver.observe(el));
  }

  /* -------------------------------------------------------
     GSAP Hero Animations
     ------------------------------------------------------- */
  function initHeroAnimations() {
    if (typeof gsap === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to('.hero-label', {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: 0.3
    })
    .to('.hero-title .line', {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.15
    }, '-=0.3')
    .to('.hero-subtitle', {
      opacity: 1,
      y: 0,
      duration: 0.6
    }, '-=0.3')
    .to('.hero-actions', {
      opacity: 1,
      y: 0,
      duration: 0.6
    }, '-=0.3')
    .to('.hero-badges', {
      opacity: 1,
      y: 0,
      duration: 0.6
    }, '-=0.3');

    // Scroll-triggered section animations
    gsap.utils.toArray('.step-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 40,
        duration: 0.7,
        delay: i * 0.15,
        ease: 'power3.out'
      });
    });
  }

  // Wait for GSAP to load
  if (typeof gsap !== 'undefined') {
    initHeroAnimations();
  } else {
    window.addEventListener('load', initHeroAnimations);
  }

  /* -------------------------------------------------------
     Smooth scroll for anchor links
     ------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* -------------------------------------------------------
     Contact Form — basic handling
     ------------------------------------------------------- */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.textContent = 'Sending...';
        btn.disabled = true;
      }
    });
  }
})();
