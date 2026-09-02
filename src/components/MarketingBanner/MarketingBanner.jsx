import React from 'react';
import { motion } from 'framer-motion';
import './MarketingBanner.css';

export default function MarketingBanner() {
  return (
    <section className="marketing-banner-section" id="editorial">
      {/* Background Campaign Video (Video3.mp4) */}
      <div className="banner-video-container">
        <video 
          className="banner-video" 
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="/assets/video/Video3.mp4" type="video/mp4" />
        </video>
        <div className="banner-overlay-scrim" />
      </div>

      {/* Campaign Content */}
      <div className="banner-content-container">
        <motion.div 
          className="banner-text-box"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
        >
          <span className="ui-label banner-tag">CAMPAIGN / 2026</span>
          <h2 className="brand-serif banner-quote">
            "A house built on quiet form and deliberate texture."
          </h2>
          <p className="banner-subtext">
            Exploring the quiet tension between raw silk organza and structured hand-crafted embroidery.
          </p>
          <a href="#new-in" className="banner-cta-button ui-label">
            Read Editorial Manifesto
          </a>
        </motion.div>
      </div>
    </section>
  );
}
