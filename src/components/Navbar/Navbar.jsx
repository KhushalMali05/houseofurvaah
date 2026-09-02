import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'New In', href: '#new-in' },
  { label: 'Collection', href: '#collection' },
  { label: 'Editorial', href: '#editorial' },
  { label: 'About', href: '#about' }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  // Handle scroll state
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroHeight = window.innerHeight;

      if (currentScrollY >= heroHeight - 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  const headerClass = `navbar-header ${isScrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-is-open' : ''}`;

  return (
    <header className={headerClass} ref={navRef}>
      <div className="navbar-container">
        
        {/* Left: Universal Hamburger Toggle Button */}
        <div className="navbar-left">
          <button 
            className="hamburger-btn" 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="icon-wrapper"
                >
                  <X size={22} strokeWidth={1.5} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="icon-wrapper"
                >
                  <Menu size={22} strokeWidth={1.5} />
                </motion.div>
              )}
            </AnimatePresence>
            <span className="hamburger-label ui-label">Menu</span>
          </button>
        </div>

        {/* Center: Brand Wordmark Lockup (Always Centered) */}
        <a href="#" className="navbar-brand" aria-label="House of Urvaah Homepage">
          <span className="brand-script-text">house of</span>
          <span className="brand-serif-text">URVAAH</span>
        </a>

        {/* Right: Search & Shopping Bag Actions */}
        <div className="navbar-right">
          <button className="nav-icon-btn" aria-label="Search">
            <Search size={18} strokeWidth={1.5} />
          </button>
          <button className="nav-icon-btn" aria-label="Shopping Bag">
            <ShoppingBag size={18} strokeWidth={1.5} />
            <span className="bag-count">0</span>
          </button>
        </div>
      </div>

      {/* Slide-Down Navigation Menu Panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav 
            className="navbar-dropdown-panel"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
            aria-label="Main Navigation Menu"
          >
            <div className="dropdown-inner">
              <ul className="dropdown-links-list">
                {NAV_LINKS.map((link, idx) => (
                  <motion.li 
                    key={link.href}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                  >
                    <a 
                      href={link.href} 
                      className="dropdown-nav-item" 
                      onClick={() => setMenuOpen(false)}
                    >
                      <span className="nav-item-num">0{idx + 1}</span>
                      <span className="nav-item-text">{link.label}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
