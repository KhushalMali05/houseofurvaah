import React, { useState } from 'react';
import './Footer.css';

{/* Replace placeholder URLs with official House of Urvaah social profile links */}
const SOCIAL_PROFILES = [
  {
    name: 'Instagram',
    url: 'https://instagram.com/houseofurvaah',
    ariaLabel: 'Follow us on Instagram',
    renderIcon: (size = 20) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    )
  },
  {
    name: 'WhatsApp',
    url: 'https://wa.me/910000000000',
    ariaLabel: 'Chat with us on WhatsApp',
    renderIcon: (size = 20) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 0.9" />
        <path d="M9 10a0.5 0.5 0 0 0 1 0v-1a0.5 0.5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a0.5 0.5 0 0 0 0 -1h-1a0.5 0.5 0 0 0 0 1" />
      </svg>
    )
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com/houseofurvaah',
    ariaLabel: 'Follow us on Facebook',
    renderIcon: (size = 20) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    )
  },
  {
    name: 'X (Twitter)',
    url: 'https://x.com/houseofurvaah',
    ariaLabel: 'Follow us on X (Twitter)',
    renderIcon: (size = 20) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
      </svg>
    )
  }
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="site-footer-wrapper" id="about">
      <div className="footer-container">
        
        {/* Top Footer Grid */}
        <div className="footer-top">
          
          {/* Brand Lockup */}
          <div className="footer-brand-col">
            <a href="#" className="footer-brand-link" aria-label="House of Urvaah Home">
              <img 
                src="/assets/logo/house_of_urvaah_logo.png" 
                alt="House of Urvaah" 
                className="footer-logo-img" 
              />
            </a>
            <p className="footer-tagline">
              Haute Couture & High Fashion Lookbook. Defined by quiet form and deliberate luxury.
            </p>

            {/* Replace placeholder URLs with official House of Urvaah social profile links */}
            <div className="footer-social-links" aria-label="Social Media Profiles">
              {SOCIAL_PROFILES.map((profile) => (
                <a
                  key={profile.name}
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={profile.ariaLabel}
                  className="social-icon-btn"
                >
                  {profile.renderIcon()}
                </a>
              ))}
            </div>
          </div>

          {/* Nav Links Column 1 */}
          <div className="footer-col">
            <span className="ui-label footer-col-title">Collections</span>
            <ul className="footer-links-list">
              <li><a href="#new-in">New Arrivals</a></li>
              <li><a href="#collection">Signature Edit</a></li>
              <li><a href="#products">Signature Pieces</a></li>
              <li><a href="#editorial">Campaign 2026</a></li>
            </ul>
          </div>

          {/* Nav Links Column 2 */}
          <div className="footer-col">
            <span className="ui-label footer-col-title">Client Care</span>
            <ul className="footer-links-list">
              <li><a href="#about">Private Appointments</a></li>
              <li><a href="#about">Size & Fit Guide</a></li>
              <li><a href="#about">Shipping & Delivery</a></li>
              <li><a href="#about">Contact Atelier</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="footer-col footer-newsletter-col">
            <span className="ui-label footer-col-title">Newsletter</span>
            <p className="newsletter-desc">
              Receive private invitations to new release lookbooks and private presentations.
            </p>
            
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <div className="newsletter-input-wrapper">
                <input 
                  type="email" 
                  className="newsletter-input" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
                <button type="submit" className="newsletter-submit-btn ui-label">
                  Submit
                </button>
              </div>
            </form>

            {subscribed && (
              <p className="newsletter-success-msg ui-label">
                Thank you for subscribing to House of Urvaah updates.
              </p>
            )}
          </div>

        </div>

        {/* Bottom Footer Bar */}
        <div className="footer-bottom">
          <p className="copyright-text ui-label">
            &copy; {new Date().getFullYear()} HOUSE OF URVAAH. ALL RIGHTS RESERVED.
          </p>
        </div>

      </div>
    </footer>
  );
}
