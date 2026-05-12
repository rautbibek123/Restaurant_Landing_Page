import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, LogIn, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

const navLinks = [
  { label: 'Home',         href: '#hero' },
  { label: 'About',        href: '#about' },
  { label: 'Menu',         href: '#menu' },
  { label: 'Gallery',      href: '#gallery' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact',      href: '#contact' },
];

// section ids in the same order as navLinks
const SECTION_IDS = ['hero', 'about', 'menu', 'gallery', 'testimonials', 'contact'];

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [active, setActive]           = useState('hero');
  const [authOpen, setAuthOpen]       = useState(false);
  const userScrolled                  = useRef(false);
  const { user, logout }              = useAuth();

  /* ── Scroll-spy via IntersectionObserver ─────────────── */
  useEffect(() => {
    const observers = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !userScrolled.current) {
            setActive(id);
          }
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  /* ── Navbar background on scroll ─────────────────────── */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ── Prevent body scroll when mobile menu open ───────── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNav = (href) => {
    setMobileOpen(false);
    const id = href.replace('#', '');
    setActive(id);

    // Briefly suppress scroll-spy so the clicked item stays highlighted
    userScrolled.current = true;
    setTimeout(() => { userScrolled.current = false; }, 1200);

    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className="container navbar__inner">
          {/* Logo */}
          <a className="navbar__logo" href="#hero" onClick={() => handleNav('#hero')}>
            <span className="navbar__logo-icon">🏔️</span>
            <span className="navbar__logo-text">
              <span className="navbar__logo-main">Annapurna</span>
              <span className="navbar__logo-sub">Kitchen</span>
            </span>
          </a>

          {/* Desktop Links */}
          <ul className="navbar__links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  className={`navbar__link ${active === link.href.replace('#', '') ? 'navbar__link--active' : ''}`}
                  onClick={() => handleNav(link.href)}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="navbar__actions">
            <a href="tel:+977-1-4567890" className="navbar__phone">
              <Phone size={16} />
              <span>+977-1-456-7890</span>
            </a>
            {user ? (
              <div className="navbar__user-container">
                <Link to="/my-account" className="navbar__user-link-premium">
                  <div className="navbar__avatar-wrapper">
                    {user.name?.charAt(0)}
                    <div className="navbar__avatar-glow"></div>
                  </div>
                  <div className="navbar__user-info-desktop">
                    <span className="navbar__user-name-premium">{user.name?.split(' ')[0]}</span>
                    <span className="navbar__user-status">Gold Member</span>
                  </div>
                </Link>
                <button onClick={logout} className="navbar__logout-btn-premium" title="Sign Out">
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <button className="navbar__signin-btn-premium" onClick={() => setAuthOpen(true)}>
                <LogIn size={16} /> <span>Sign In</span>
              </button>
            )}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary navbar__cta-premium" 
              onClick={() => handleNav('#reservation')}
            >
              Book a Table
            </motion.button>
          </div>

          {/* Hamburger */}
          <button
            className="navbar__hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="mobile-menu__header">
              <span className="navbar__logo-icon" style={{ fontSize: '2rem' }}>🏔️</span>
              <button className="navbar__hamburger" onClick={() => setMobileOpen(false)}>
                <X size={28} />
              </button>
            </div>
            <ul className="mobile-menu__links">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <button
                    onClick={() => handleNav(link.href)}
                    className={`mobile-menu__link ${active === link.href.replace('#', '') ? 'mobile-menu__link--active' : ''}`}
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>
            <button className="btn btn-primary mobile-menu__cta" onClick={() => handleNav('#reservation')}>
              Book a Table
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
