import { motion } from 'framer-motion';
import { ChevronDown, UtensilsCrossed, Calendar } from 'lucide-react';
import heroBg from '../assets/images/hero_bg.jpg';

export default function Hero() {
  const handleScroll = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero">
      {/* Layered Background */}
      <div className="hero__bg">
        <div className="hero__bg-image" style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="hero__bg-overlay" />
        <div className="hero__bg-pattern" />
      </div>

      {/* Floating Particles */}
      <div className="hero__particles" aria-hidden="true">
        {[...Array(12)].map((_, i) => (
          <span key={i} className="hero__particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${6 + Math.random() * 6}s`,
            fontSize: `${0.6 + Math.random() * 0.8}rem`,
          }}>✦</span>
        ))}
      </div>

      <div className="container hero__content">
        {/* Script tag line */}
        <motion.div
          className="hero__badge"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="hero__badge-dot"></span>
          <span>Himalayan Culinary Excellence</span>
        </motion.div>

        <motion.span
          className="hero__tagline"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          🍃 Authentic Flavors from the Roof of the World
        </motion.span>

        {/* Main heading */}
        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
        >
          <span className="hero__title-main">Annapurna</span>
          <br />
          <span className="gradient-text hero__title-glow">Kitchen</span>
        </motion.h1>

        {/* Nepali text */}
        <motion.p
          className="hero__nepali"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          अन्नपूर्ण किचन
        </motion.p>

        <motion.p
          className="hero__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Where the Himalayas Meet Your Plate — Dal Bhat, Momo, Thakali &amp; more,
          crafted with generations-old recipes and mountain-fresh ingredients.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="hero__ctas"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(241, 196, 15, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary hero__btn" 
            onClick={() => handleScroll('#reservation')}
          >
            <Calendar size={18} />
            Book a Table
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-outline hero__btn" 
            onClick={() => handleScroll('#menu')}
          >
            <UtensilsCrossed size={18} />
            Explore Menu
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          className="hero__scroll"
          onClick={() => handleScroll('#trust')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          aria-label="Scroll down"
        >
          <ChevronDown size={24} />
        </motion.button>
      </div>

      {/* Decorative bottom curve */}
      <div className="hero__curve" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,80 C480,0 960,0 1440,80 L1440,80 L0,80 Z" fill="var(--color-dark)" />
        </svg>
      </div>
    </section>
  );
}
