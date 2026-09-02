import React from 'react';
import { motion } from 'framer-motion';
import './TrendingGram.css';

/**
 * TRENDING ON THE GRAM Section
 * 
 * Fixed 4-card editorial video grid showcase.
 */
const REEL_CARDS = [
  {
    id: 'reel-1',
    video: '/assets/video/Video3.mp4',
    scriptOverlay: 'New Season',
    thumb: '/assets/images/product1.jpeg',
    title: 'Sequin Floral Mini Skirt',
    price: '₹1,499',
    originalPrice: '₹2,999'
  },
  {
    id: 'reel-2',
    video: '/assets/video/Video4.mp4',
    scriptOverlay: 'The Edit',
    thumb: '/assets/images/product2.jpeg',
    title: 'Aqua Silk Motif Overlay',
    price: '₹1,899',
    originalPrice: '₹3,499'
  },
  {
    id: 'reel-3',
    video: '/assets/video/Video5.mp4',
    scriptOverlay: 'Behind the Seams',
    thumb: '/assets/images/product3.jpeg',
    title: 'Dusty Pink Beaded Skirt',
    price: '₹2,199',
    originalPrice: '₹3,999'
  },
  {
    id: 'reel-4',
    video: '/assets/video/Video6.mp4',
    scriptOverlay: 'Studio Diaries',
    thumb: '/assets/images/product4.jpeg',
    title: 'Maroon Lace Bodice Gown',
    price: '₹2,499',
    originalPrice: '₹4,499'
  }
];

export default function TrendingGram() {
  return (
    <section className="trending-gram-section" id="trending-gram">
      {/* Section Header */}
      <div className="trending-gram-header">
        <span className="ui-label text-muted">03 — SOCIAL LOOKBOOK</span>
        <h2 className="brand-serif trending-gram-title">TRENDING ON THE GRAM</h2>
      </div>

      {/* Fixed 4-Card Grid Container */}
      <div className="gram-grid-container">
        {REEL_CARDS.map((card, index) => (
          <motion.div 
            key={card.id}
            className="gram-reel-card"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ 
              duration: 0.7, 
              ease: [0.65, 0, 0.35, 1], 
              delay: index * 0.1 
            }}
          >
            {/* 9:16 Video Container */}
            <div className="reel-video-container">
              <video 
                className="reel-video"
                src={card.video}
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={card.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Dark Gradient Scrim Overlay */}
              <div className="reel-scrim" />

              {/* Script Font Overlay Caption */}
              <div className="reel-overlay-caption">
                <span className="brand-script reel-script-text">
                  {card.scriptOverlay}
                </span>
              </div>

              {/* Glassmorphic Product Overlay Strip (Oyela-Style) */}
              <div className="reel-product-caption">
                <div className="reel-thumb-box">
                  <img src={card.thumb} alt={card.title} loading="lazy" />
                </div>
                <div className="reel-product-details">
                  <span className="reel-product-title">{card.title}</span>
                  <div className="reel-price-row">
                    <span className="current-price">{card.price}</span>
                    <span className="original-price">{card.originalPrice}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
