import React from 'react';
import './ProductTag.css';

/**
 * ProductTag Component
 * 
 * Reusable promotional tag / badge component for product tiles.
 * 
 * Props:
 * - label (string): Required. Text to render (e.g. "NEW", "20% OFF", "BESTSELLER").
 * - position (string): Corner placement ("top-left", "top-right", "bottom-left", "bottom-right"). Default: "top-left".
 * - variant (string): Visual theme ("dark" [black bg / white text] or "light" [white bg / black text + border]). Default: "dark".
 * - className (string): Additional optional CSS class name.
 */
export default function ProductTag({
  label,
  position = 'top-left',
  variant = 'dark',
  animateDirection,
  delay = 0,
  className = ''
}) {
  if (!label) return null;

  const validPositions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
  const posClass = validPositions.includes(position) ? `tag-pos-${position}` : 'tag-pos-top-left';
  const varClass = variant === 'light' ? 'tag-variant-light' : 'tag-variant-dark';
  const animClass = animateDirection ? `tag-animate-${animateDirection}` : '';

  const style = delay ? { '--tag-delay': `${delay}ms` } : undefined;

  return (
    <div className={`product-tag ${posClass} ${varClass} ${animClass} ${className}`} style={style}>
      <span className="product-tag-text">{label}</span>
    </div>
  );
}
