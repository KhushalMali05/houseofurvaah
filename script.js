/* ==========================================================================
   House of Urvaah — Script Logic
   - Header scroll solidification (Section 4)
   - Hero video crossfade (Section 5)
   - Newsletter signup feedback (Section 9)
   - Reduced motion handling (Section 6)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initHeroSwiper();
  initGsapScrollTrigger();
  initNewsletterForm();
});

/**
 * 1. Fixed Header Background Solidify on Scroll Past Hero (Section 4)
 * Mirrors Zara's transparent overlay header that solidifies to --paper on scroll.
 */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  const hero = document.querySelector('.hero-section');
  
  if (!header || !hero) return;

  const observerOptions = {
    root: null,
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // If hero is NOT intersecting (scrolled past), solidify header
      if (!entry.isIntersecting) {
        header.classList.add('header--solid');
      } else {
        header.classList.remove('header--solid');
      }
    });
  }, observerOptions);

  observer.observe(hero);
}

/**
 * 2. Hero Video Slider (Swiper.js) (Section 5)
 * Full-viewport hero slide transition (Video1 -> Video2)
 * - effect: 'slide' (horizontal slide transition right to left)
 * - loop: true
 * - autoplay delay: 6000ms, disableOnInteraction: false
 * - speed: 900ms
 * - allowTouchMove: false (background hero, no touch drag)
 * - zero visible slider chrome/pagination
 * - Respects prefers-reduced-motion
 */
function initHeroSwiper() {
  const heroSwiperEl = document.querySelector('.hero-swiper');
  if (!heroSwiperEl || typeof Swiper === 'undefined') return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Initialize Swiper
  const swiper = new Swiper('.hero-swiper', {
    effect: 'slide',
    loop: !prefersReducedMotion,
    speed: 900,
    allowTouchMove: false,
    autoplay: prefersReducedMotion ? false : {
      delay: 6000,
      disableOnInteraction: false,
    },
    on: {
      slideChangeTransitionStart: function () {
        // Ensure videos in active slide play smoothly
        const activeSlide = this.slides[this.activeIndex];
        if (activeSlide) {
          const video = activeSlide.querySelector('video');
          if (video && video.paused) {
            video.play().catch(() => {});
          }
        }
      }
    }
  });
}

/**
 * 3. Newsletter Form Interaction (Section 9)
 */
function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  const input = document.getElementById('newsletter-email');
  const feedback = document.getElementById('newsletter-feedback');

  if (!form || !input || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = input.value.trim();
    
    if (email && email.includes('@')) {
      feedback.textContent = 'Subscribed. Thank you.';
      input.value = '';
      setTimeout(() => {
        feedback.textContent = '';
      }, 4000);
    } else {
      feedback.textContent = 'Please enter a valid email address.';
    }
  });
}

/**
 * 4. GSAP + ScrollTrigger Image Motion
 * Adds smooth luxury parallax scrolling to all collage images and statement section.
 * Respects prefers-reduced-motion.
 */
function initGsapScrollTrigger() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  gsap.registerPlugin(ScrollTrigger);

  // Smooth editorial parallax for all collage images
  const imageWrappers = document.querySelectorAll('.image-wrapper');
  imageWrappers.forEach(wrapper => {
    const img = wrapper.querySelector('img');
    if (!img) return;

    gsap.fromTo(img, 
      { yPercent: -8, scale: 1.12 }, 
      {
        yPercent: 8,
        scale: 1.0,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      }
    );
  });

  // Parallax reveal for full-bleed statement section image
  const statementImg = document.querySelector('.statement-bg-img');
  if (statementImg) {
    gsap.fromTo(statementImg,
      { yPercent: -10, scale: 1.15 },
      {
        yPercent: 10,
        scale: 1.05,
        ease: 'none',
        scrollTrigger: {
          trigger: '.statement-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      }
    );
  }
}

