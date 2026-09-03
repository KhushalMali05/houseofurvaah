import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductTag from '../ProductTag/ProductTag';
import './CategoryGrid.css';

const CATEGORY_SLIDES = [
  {
    id: 'dresses-gowns',
    title: 'Dresses & Gowns',
    subtitle: 'HAUTE COUTURE / ATELIER',
    image: '/assets/images/f8b12f2242943b002bcf1aeead5e56e2.jpg',
    detailThumb: '/assets/images/product4.jpeg',
    tag: 'DETAIL DECODED',
    bgTheme: 'theme-monochrome-1'
  },
  {
    id: 'coord-sets',
    title: 'Co-ord Sets',
    subtitle: 'MATCHING EDITS / SILK',
    image: '/assets/images/62c7e675f9ba780d82f0ca65dd1a24cc.jpg',
    detailThumb: '/assets/images/product2.jpeg',
    tag: 'HAND-BEADED',
    bgTheme: 'theme-monochrome-2'
  },
  {
    id: 'skirts',
    title: 'Skirts',
    subtitle: 'EMBROIDERED / SCULPTED',
    image: '/assets/images/product1.jpeg',
    detailThumb: '/assets/images/hero_editorial.jpg',
    tag: 'SEQUIN MOTIFS',
    bgTheme: 'theme-monochrome-3'
  },
  {
    id: 'blouses-tops',
    title: 'Blouses & Tops',
    subtitle: 'HAND-BEADED / TAILORED',
    image: '/assets/images/product4.jpeg',
    detailThumb: '/assets/images/product5.jpeg',
    tag: 'BACK CORSET',
    bgTheme: 'theme-monochrome-1'
  },
  {
    id: 'ethnic-wear',
    title: 'Ethnic Wear',
    subtitle: 'HERITAGE / FESTIVE',
    image: '/assets/images/2116f7f5180e5ad6fc6be0baae456a5f.jpg',
    detailThumb: '/assets/images/stock1.jpg',
    tag: 'GOLD THREADWORK',
    bgTheme: 'theme-monochrome-2'
  },
  {
    id: 'new-in',
    title: 'New In',
    subtitle: 'SEASON 2026 / CAMPAIGN',
    image: '/assets/images/product3.jpeg',
    detailThumb: '/assets/images/stock_statement.jpg',
    tag: 'LIMITED EDITION',
    bgTheme: 'theme-monochrome-3'
  }
];

export default function CategoryGrid() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isUserPaused, setIsUserPaused] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [isPageVisible, setIsPageVisible] = useState(true);

  const sectionRef = useRef(null);
  const autoPlayTimerRef = useRef(null);
  const resumeTimeoutRef = useRef(null);

  // 1. IntersectionObserver: Only run auto-play when section is visible in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 2. Page Visibility API: Pause auto-play when browser tab is backgrounded
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageVisible(document.visibilityState === 'visible');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // 3. Continuous right-to-left auto-advance timer (4.5s interval, reduced motion check, cleanup)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion || !isInView || !isPageVisible || isUserPaused) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CATEGORY_SLIDES.length);
    }, 2200);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [activeIndex, isUserPaused, isInView, isPageVisible]);

  // Pause timer on manual interaction & auto-resume after 3s of inactivity
  const triggerInteraction = () => {
    if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    setIsUserPaused(true);

    resumeTimeoutRef.current = setTimeout(() => {
      setIsUserPaused(false);
    }, 3000);
  };

  const nextSlide = () => {
    triggerInteraction();
    setActiveIndex((prev) => (prev + 1) % CATEGORY_SLIDES.length);
  };

  const prevSlide = () => {
    triggerInteraction();
    setActiveIndex((prev) => (prev - 1 + CATEGORY_SLIDES.length) % CATEGORY_SLIDES.length);
  };

  const handleSelectCard = (index) => {
    triggerInteraction();
    setActiveIndex(index);
  };

  const handleMouseEnter = () => {
    triggerInteraction();
  };

  const handleMouseLeave = () => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      setIsUserPaused(false);
    }, 3000);
  };

  const getCardOffsetClass = (index) => {
    const total = CATEGORY_SLIDES.length;
    let diff = (index - activeIndex) % total;
    if (diff < 0) diff += total;

    if (diff === 0) return 'card-center';
    if (diff === 1) return 'card-right-1';
    if (diff === 2) return 'card-right-2';
    if (diff === total - 1) return 'card-left-1';
    if (diff === total - 2) return 'card-left-2';
    return 'card-hidden';
  };

  return (
    <section className="category-moodboard-section" id="categories" ref={sectionRef}>
      {/* Scroll-Reveal Header Container */}
      <motion.div 
        className="category-section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
      >
        <span className="ui-label text-muted">04 — CATEGORIES</span>
        <h2 className="brand-serif category-section-title">SHOP BY CATEGORY</h2>
      </motion.div>

      {/* Widened Moodboard Carousel Showcase */}
      <motion.div 
        className="carousel-viewport-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseEnter}
        onTouchEnd={handleMouseLeave}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1], delay: 0.15 }}
      >
        {/* Left Arrow Navigation Button */}
        <button 
          className="carousel-nav-btn nav-btn-left"
          onClick={prevSlide}
          aria-label="Previous Category"
        >
          <ChevronLeft size={22} strokeWidth={1.5} />
        </button>

        {/* Carousel Cards Track */}
        <div className="moodboard-carousel-track">
          {CATEGORY_SLIDES.map((cat, index) => {
            const offsetClass = getCardOffsetClass(index);
            const isCenter = offsetClass === 'card-center';

            return (
              <div
                key={cat.id}
                className={`moodboard-card-wrapper ${offsetClass} ${cat.bgTheme}`}
                onClick={() => {
                  if (!isCenter) handleSelectCard(index);
                }}
              >
                <div className="moodboard-card-inner">
                  
                  {/* Full Bleed Flush Model Image Tile */}
                  <div className="model-cutout-container">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="model-cutout-img"
                      loading="lazy"
                    />
                    {/* Rectangular Black Tag Overlay */}
                    <ProductTag 
                      label={cat.tag} 
                      position="top-right" 
                      variant="dark" 
                    />
                  </div>

                  {/* Bottom Info Bar: Two-Line Category Title + Shop All Text Link (Below Image) */}
                  <div className="moodboard-bottom-bar">
                    <div className="category-title-lockup">
                      <h3 className="brand-serif category-main-title">{cat.title}</h3>
                      <span className="ui-label category-sub-title">{cat.subtitle}</span>
                    </div>

                    <a href="#category" className="shop-all-link">
                      Shop All
                    </a>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Right Arrow Navigation Button */}
        <button 
          className="carousel-nav-btn nav-btn-right"
          onClick={nextSlide}
          aria-label="Next Category"
        >
          <ChevronRight size={22} strokeWidth={1.5} />
        </button>
      </motion.div>

      {/* Carousel Progress Dots for Mobile & Desktop */}
      <div className="carousel-dots-row">
        {CATEGORY_SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            className={`carousel-dot ${idx === activeIndex ? 'active' : ''}`}
            onClick={() => handleSelectCard(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
