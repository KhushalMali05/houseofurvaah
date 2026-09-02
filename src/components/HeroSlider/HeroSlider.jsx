import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import './HeroSlider.css';

const SLIDES = [
  {
    id: 1,
    type: 'video',
    video: '/assets/video/Video1.mp4',
    poster: '/assets/images/poster1.jpg',
    subtitle: 'AUTUMN / WINTER COUTURE',
    title: 'THE URVAAH COLLECTION',
    description: 'Sculptural drapery, hand-beaded motifs, and modern luxury.',
    cta: 'Discover Collection',
    ctaLink: '#collection',
    theme: 'dark'
  },
  {
    id: 2,
    type: 'video',
    video: '/assets/video/Video2.mp4',
    poster: '/assets/images/poster2.jpg',
    subtitle: 'EDITORIAL CAMPAIGN',
    title: 'METALLIC & SILK',
    description: 'Intricate threadwork meets minimalist architectural tailoring.',
    cta: 'View Editorial',
    ctaLink: '#editorial',
    theme: 'dark'
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = slide right-to-left
  const touchStartX = useRef(0);

  // Auto-advance slider every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  // Touch swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX;
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  // Variants for translateX right-to-left sliding transition (500ms snappy duration)
  const sliderVariants = {
    initial: (dir) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 1
    }),
    animate: {
      x: '0%',
      opacity: 1,
      transition: {
        x: { type: 'tween', duration: 0.5, ease: [0.65, 0, 0.35, 1] }
      }
    },
    exit: (dir) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 1,
      transition: {
        x: { type: 'tween', duration: 0.5, ease: [0.65, 0, 0.35, 1] }
      }
    })
  };

  const activeSlide = SLIDES[currentSlide];

  return (
    <section 
      className={`hero-slider-section slide-theme-${activeSlide.theme}`}
      aria-label="Hero Slider"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="hero-slider-viewport">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={sliderVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="hero-slide-container"
          >
            {activeSlide.type === 'image' ? (
              <div className="hero-image-wrapper">
                <img
                  className="hero-slide-media hero-image"
                  src={activeSlide.image}
                  alt={activeSlide.title}
                />
              </div>
            ) : (
              <div className="hero-video-wrapper">
                {/* Ambient Blurred Video Background for Desktop Aspect Ratios */}
                <video
                  className="hero-video-blur-bg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-hidden="true"
                >
                  <source src={activeSlide.video} type="video/mp4" />
                </video>

                {/* Primary Desktop-Framed High Fashion Video */}
                <video
                  className="hero-slide-media hero-video"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  controls={false}
                  disablePictureInPicture
                  poster={activeSlide.poster}
                  onCanPlay={(e) => {
                    e.currentTarget.play().catch(() => {});
                  }}
                >
                  <source src={activeSlide.video} type="video/mp4" />
                </video>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Scrim & Overlay Content */}
      {activeSlide.minimalOverlay ? (
        <div className="hero-minimal-overlay">
          <div className="hero-floating-pill">
            <span className="pill-tag ui-label">{activeSlide.subtitle}</span>
            <a href={activeSlide.ctaLink} className="hero-pill-btn">
              <span>{activeSlide.cta}</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      ) : (
        <div className={`hero-scrim theme-${activeSlide.theme}`}>
          <div className="hero-content">
            <span className="hero-subtitle ui-label">{activeSlide.subtitle}</span>
            <h1 className="hero-title brand-serif">{activeSlide.title}</h1>
            <p className="hero-description">{activeSlide.description}</p>
            {activeSlide.cta && (
              <a href={activeSlide.ctaLink} className="hero-cta-btn">
                <span>{activeSlide.cta}</span>
                <ArrowRight size={16} />
              </a>
            )}
          </div>
        </div>
      )}

      {/* Slide Line Indicators */}
      <div className="hero-controls">
        {SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            className={`hero-indicator-line ${idx === currentSlide ? 'active' : ''}`}
            onClick={() => {
              setDirection(idx > currentSlide ? 1 : -1);
              setCurrentSlide(idx);
            }}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Scroll Down Cue */}
      <a href="#new-in" className="hero-scroll-cue" aria-label="Scroll to content">
        <span className="ui-label scroll-text">Explore</span>
        <ChevronDown size={18} className="scroll-chevron" />
      </a>
    </section>
  );
}
