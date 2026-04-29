import { motion } from 'framer-motion';
import { specials } from '../data/menuData';
import { Sparkles } from 'lucide-react';

const tagColors = {
  'Weekend Special': { bg: 'rgba(192,57,43,0.2)', color: '#E74C3C', border: 'rgba(192,57,43,0.4)' },
  'Festival Menu': { bg: 'rgba(241,196,15,0.15)', color: '#F1C40F', border: 'rgba(241,196,15,0.35)' },
  "Chef's Pick": { bg: 'rgba(230,126,34,0.15)', color: '#E67E22', border: 'rgba(230,126,34,0.35)' },
};

export default function Specials() {
  return (
    <section id="specials" className="section specials">
      {/* Background decoration */}
      <div className="specials__bg-orb specials__bg-orb--1" />
      <div className="specials__bg-orb specials__bg-orb--2" />

      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="section-tag">Chef's Specials</span>
          <h2 className="section-title">
            Curated <span className="gradient-text">Experiences</span>
          </h2>
          <p className="section-subtitle">
            Exclusive multi-course journeys and seasonal offerings — available for a limited time.
          </p>
        </motion.div>

        <div className="specials__grid">
          {specials.map((item, i) => {
            const tag = tagColors[item.tag] || tagColors["Chef's Pick"];
            return (
              <motion.div
                key={item.id}
                className="specials-card glass-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ y: -8, scale: 1.01 }}
              >
                {/* Tag */}
                <span
                  className="specials-card__tag"
                  style={{ background: tag.bg, color: tag.color, border: `1px solid ${tag.border}` }}
                >
                  <Sparkles size={12} /> {item.tag}
                </span>

                {/* Emoji icon */}
                <div className="specials-card__icon">
                  {i === 0 ? '🏔️' : i === 1 ? '🎊' : '🍢'}
                </div>

                <h3 className="specials-card__name">{item.name}</h3>
                <p className="specials-card__nepali">{item.nepali}</p>
                <p className="specials-card__desc">{item.description}</p>

                <div className="specials-card__footer">
                  <span className="specials-card__price">
                    <span className="specials-card__currency">Rs.</span>
                    {item.price.toLocaleString()}
                  </span>
                  <motion.button
                    className="btn btn-primary specials-card__btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => document.querySelector('#reservation').scrollIntoView({ behavior: 'smooth' })}
                  >
                    Reserve Now
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
