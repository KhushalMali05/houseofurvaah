import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductTag from '../ProductTag/ProductTag';
import './CollageSection.css';

export default function CollageSection() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in-view');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const tileContainers = document.querySelectorAll('.editorial-collages-wrapper .tile-image-container');
    tileContainers.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (customIndex) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.65, 0, 0.35, 1],
        delay: customIndex * 0.15
      }
    })
  };

  return (
    <section className="editorial-collages-wrapper">
      
      {/* =========================================================================
          COLLAGE BLOCK 1: "THE EDIT" (60% Left / 40% Right Stacked)
          ========================================================================= */}
      <div className="collage-block" id="new-in">
        <div className="block-header">
          <span className="ui-label block-number">01 — COLLECTION</span>
          <h2 className="brand-serif block-title">THE AUTUMN EDIT</h2>
          <p className="block-intro">
            A restrained collection defined by subtle hand-embroidered sequin floral motifs and crisp, architectural cuts.
          </p>
        </div>

        {/* Contained Outer Grid: 1.4fr Left / 1fr Right */}
        <div className="collection-grid-container">
          
          {/* Left Column Container: Sub-grid for 3 images (product6 + stacked product4/product5) */}
          <motion.div 
            className="left-subgrid-wrapper"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            custom={0}
          >
            {/* Left Sub-column: Large Maroon Full Gown (product6.jpeg) */}
            <div className="left-subcol-main">
              <div className="tile-image-container full-height-container position-relative">
                <ProductTag 
                  label="NEW" 
                  position="top-left" 
                  variant="dark" 
                  animateDirection="left"
                  delay={0}
                />
                <img 
                  src="/assets/images/product6.jpeg" 
                  alt="Maroon hand-embroidered lace two-piece gown"
                  className="full-gown-img"
                  loading="lazy" 
                />
                <div className="overlay-script-badge">
                  <span>New arrivals</span>
                </div>
              </div>
            </div>

            {/* Right Sub-column: Stacked Bodice & Back Corset Details (blue_gold_set.png & product5.jpeg) */}
            <div className="left-subcol-stacked">
              <div className="tile-image-container half-height-container">
                <ProductTag 
                  label="LIMITED EDITION" 
                  position="top-left" 
                  variant="dark" 
                  animateDirection="top"
                  delay={100}
                />
                <img 
                  src="/assets/images/blue_gold_set.png" 
                  alt="Blue and gold hand-woven two-piece set"
                  loading="lazy" 
                />
              </div>
              <div className="tile-image-container half-height-container">
                <ProductTag 
                  label="BUY 1 GET 1 FREE" 
                  position="top-right" 
                  variant="dark" 
                  animateDirection="bottom"
                  delay={200}
                />
                <img 
                  src="/assets/images/product5.jpeg" 
                  alt="Maroon lace back corset detail"
                  loading="lazy" 
                />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Campaign Video Tile (Video2.mp4) */}
          <motion.div 
            className="right-video-wrapper"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            custom={1}
          >
            <div className="tile-image-container full-height-container">
              <video 
                className="tile-video"
                autoPlay
                muted
                loop
                playsInline
                poster="/assets/images/poster2.jpg"
              >
                <source src="/assets/video/Video2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>

        </div>

        {/* Unified Caption Bar Below Grid */}
        <div className="grid-captions-row">
          <div className="left-caption-box">
            <span className="tile-title">Maroon Lace Two-Piece Couture</span>
            <a href="#shop" className="editorial-link">Shop the look</a>
          </div>
          <div className="right-caption-box">
            <span className="tile-title">Featured Film</span>
            <a href="#editorial" className="editorial-link">Watch</a>
          </div>
        </div>
      </div>


      {/* =========================================================================
          COLLAGE BLOCK 2: "02 — CRAFTSMANSHIP / SIGNATURE EMBROIDERY" (Equal Row Height Zara Grid)
          ========================================================================= */}
      <div className="collage-block craftsmanship-block" id="collection">
        {/* Zara Editorial Heading */}
        <motion.div 
          className="block-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
        >
          <span className="ui-label block-number">02 — CRAFTSMANSHIP</span>
          <h2 className="brand-serif block-title">SIGNATURE EMBROIDERY</h2>
          <p className="block-intro">
            An exploration of heritage Indian textile techniques — from intricate zardozi metallic threadwork to hand-beaded gota-patti and resham silk embroidery.
          </p>
        </motion.div>

        {/* Equal Row Height 2-Column Zara Editorial Grid */}
        <div className="craftsmanship-grid-layout">
          
          {/* ROW 1: Tile 1 & Tile 2 */}
          <motion.div 
            className="craftsmanship-tile"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1], delay: 0.1 }}
          >
            <div className="craftsmanship-image-container">
              <ProductTag label="BESTSELLER" position="top-left" variant="dark" />
              {/* placeholder stock image — swap for real craftsmanship photography */}
              <img 
                src="/assets/images/62c7e675f9ba780d82f0ca65dd1a24cc.jpg" 
                alt="Macro Indian metallic zardozi threadwork embroidery detail"
                loading="lazy" 
              />
            </div>
            <div className="craftsmanship-caption-bar">
              <span className="tile-title ui-label">MACRO METALLIC THREADWORK</span>
              <a href="#explore-technique" className="editorial-link ui-label">EXPLORE TECHNIQUE</a>
            </div>
          </motion.div>

          <motion.div 
            className="craftsmanship-tile"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
          >
            <div className="craftsmanship-image-container">
              <ProductTag label="HANDCRAFTED" position="top-left" variant="dark" />
              {/* placeholder stock image — swap for real craftsmanship photography */}
              <img 
                src="/assets/images/2116f7f5180e5ad6fc6be0baae456a5f.jpg" 
                alt="Authentic Indian hand-embroidered floral silk garment detail"
                loading="lazy" 
              />
            </div>
            <div className="craftsmanship-caption-bar">
              <span className="tile-title ui-label">HAND-EMBROIDERED FLORAL SILK</span>
              <a href="#explore-technique" className="editorial-link ui-label">EXPLORE TECHNIQUE</a>
            </div>
          </motion.div>

          {/* ROW 2: Tile 3 & Tile 4 */}
          <motion.div 
            className="craftsmanship-tile"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1], delay: 0.3 }}
          >
            <div className="craftsmanship-image-container">
              <ProductTag label="SIGNATURE" position="top-left" variant="dark" />
              {/* placeholder stock image — swap for real craftsmanship photography */}
              <img 
                src="/assets/images/stock1.jpg" 
                alt="Indian mirror-work and resham thread embroidery border detail"
                loading="lazy" 
              />
            </div>
            <div className="craftsmanship-caption-bar">
              <span className="tile-title ui-label">MIRROR-WORK & RESHAM DETAIL</span>
              <a href="#explore-technique" className="editorial-link ui-label">EXPLORE TECHNIQUE</a>
            </div>
          </motion.div>

          <motion.div 
            className="craftsmanship-tile"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1], delay: 0.4 }}
          >
            <div className="craftsmanship-image-container">
              <ProductTag label="CRAFT ATELIER" position="top-left" variant="dark" />
              {/* placeholder stock image — swap for real craftsmanship photography */}
              <img 
                src="/assets/images/product1.jpeg" 
                alt="Handmade Zardozi hand-embroidery in progress"
                loading="lazy" 
              />
            </div>
            <div className="craftsmanship-caption-bar">
              <span className="tile-title ui-label">ZARDOZI HAND-EMBROIDERY</span>
              <a href="#explore-technique" className="editorial-link ui-label">EXPLORE TECHNIQUE</a>
            </div>
          </motion.div>

          {/* ROW 3: Tile 5 & Tile 6 */}
          <motion.div 
            className="craftsmanship-tile"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1], delay: 0.5 }}
          >
            <div className="craftsmanship-image-container">
              <ProductTag label="HANDMADE" position="top-left" variant="dark" />
              {/* placeholder stock image — swap for real craftsmanship photography */}
              <img 
                src="/assets/images/product3.jpeg" 
                alt="Hand-beaded gota-patti and sequin border motif"
                loading="lazy" 
              />
            </div>
            <div className="craftsmanship-caption-bar">
              <span className="tile-title ui-label">GOTA-PATTI & BEADED BORDER</span>
              <a href="#explore-technique" className="editorial-link ui-label">EXPLORE TECHNIQUE</a>
            </div>
          </motion.div>

          <motion.div 
            className="craftsmanship-tile"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1], delay: 0.6 }}
          >
            <div className="craftsmanship-image-container">
              <ProductTag label="ATELIER EXCLUSIVE" position="top-left" variant="dark" />
              {/* placeholder stock image — swap for real craftsmanship photography */}
              <img 
                src="/assets/images/f8b12f2242943b002bcf1aeead5e56e2.jpg" 
                alt="Banarasi silk weave and gold zari embroidery detail"
                loading="lazy" 
              />
            </div>
            <div className="craftsmanship-caption-bar">
              <span className="tile-title ui-label">BANARASI WEAVE & GOLD ZARI</span>
              <a href="#explore-technique" className="editorial-link ui-label">EXPLORE TECHNIQUE</a>
            </div>
          </motion.div>

        </div>
      </div>

    </section>
  );
}
