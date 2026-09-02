import React from 'react';
import { motion } from 'framer-motion';
import ProductTag from '../ProductTag/ProductTag';
import './ProductStrip.css';

const PRODUCTS = [
  {
    id: '01',
    name: 'Sequin Floral Mini Skirt',
    category: 'Haute Couture / Edition 01',
    price: '$1,250',
    image: '/assets/images/product1.jpeg',
    details: 'Hand-embroidered sequin floral appliqué on structured linen cotton blend.',
    tag: { label: 'NEW', position: 'top-left', variant: 'dark' }
  },
  {
    id: '02',
    name: 'Aqua Silk Motif Overlay',
    category: 'Haute Couture / Edition 02',
    price: '$1,480',
    image: '/assets/images/product2.jpeg',
    details: 'Pure mulberry silk with pink and gold metallic threadwork.',
    tag: { label: '20% OFF', position: 'top-left', variant: 'dark' }
  },
  {
    id: '03',
    name: 'Dusty Pink Beaded Skirt',
    category: 'Haute Couture / Edition 03',
    price: '$1,620',
    image: '/assets/images/product3.jpeg',
    details: 'Intricate beaded hem detailing on dusty rose silk organza.',
    tag: { label: 'LIMITED EDITION', position: 'top-left', variant: 'dark' }
  }
];

export default function ProductStrip() {
  return (
    <section className="product-strip-section" id="products">
      <div className="product-strip-header">
        <div>
          <span className="ui-label text-muted">03 — CURATED SELECTION</span>
          <h2 className="brand-serif product-strip-title">THE PRODUCT LINE</h2>
        </div>
        <a href="#collection" className="editorial-link">View All Garments</a>
      </div>

      <div className="product-grid">
        {PRODUCTS.map((prod, index) => (
          <motion.div 
            key={prod.id}
            className="product-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1], delay: index * 0.12 }}
          >
            <div className="product-image-container">
              {prod.tag && (
                <ProductTag 
                  label={prod.tag.label} 
                  position={prod.tag.position} 
                  variant={prod.tag.variant} 
                />
              )}
              <img src={prod.image} alt={prod.name} loading="lazy" />
              <div className="product-overlay-tag">
                <span className="ui-label">{prod.price}</span>
              </div>
            </div>
            <div className="product-info">
              <span className="product-category ui-label">{prod.category}</span>
              <h3 className="product-name brand-serif">{prod.name}</h3>
              <p className="product-details">{prod.details}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
