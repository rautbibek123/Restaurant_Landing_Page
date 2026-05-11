import { motion } from 'framer-motion';
import { Leaf, Flame, Heart } from 'lucide-react';
import dalBhatImg from '../assets/images/dal_bhat.jpg';
import choilaImg from '../assets/images/choila.jpg';

const highlights = [
  { icon: Leaf, title: 'Farm Fresh', desc: 'Sourced from local Himalayan farms daily' },
  { icon: Flame, title: 'Ancient Recipes', desc: 'Generations-old cooking traditions preserved' },
  { icon: Heart, title: 'Made with Love', desc: 'Every dish crafted with passion and care' },
];

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container about__inner">
        {/* Left: Images */}
        <motion.div
          className="about__visuals"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Main image */}
          <div className="about__img-placeholder about__img-placeholder--main">
            <img
              src={dalBhatImg}
              alt="Authentic Nepali Dal Bhat cuisine"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
            />
          </div>

          {/* Secondary image */}
          <div className="about__img-placeholder about__img-placeholder--secondary">
            <img
              src={choilaImg}
              alt="Chef preparing traditional Choila"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
            />
          </div>

          {/* Est. Badge */}
          <div className="about__badge glass-card">
            <span className="about__badge-year">२०१०</span>
            <span className="about__badge-text">Est. 2010<br />Kathmandu</span>
          </div>

          {/* Floating award tag */}
          <motion.div
            className="about__award glass-card"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: 'spring', damping: 15 }}
          >
            <span className="about__award-icon">🏆</span>
            <div>
              <div className="about__award-label">Best Nepali Restaurant</div>
              <div className="about__award-year">Kathmandu Food Awards 2023</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right: Text */}
        <motion.div
          className="about__content"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="section-tag">Our Story</span>
          <h2 className="section-title">
            A Taste of Nepal,<br />
            <span className="gradient-text">Crafted with Heritage</span>
          </h2>

          <div className="ornament-divider"><span>✦</span></div>

          <p className="about__text">
            Born in the heart of Kathmandu in 2010, Annapurna Kitchen was founded by
            Chef Ramesh Thapa — a third-generation cook whose grandmother's recipes
            once fed pilgrims on the Annapurna trekking trail.
          </p>
          <p className="about__text">
            We believe food is the most powerful bridge between cultures. Our menu
            celebrates the incredible diversity of Nepal — from the spicy Newari streets
            of Bhaktapur to the hearty Thakali kitchens of Mustang, every dish is a
            journey through the Himalayas.
          </p>

          {/* Highlights */}
          <div className="about__highlights">
            {highlights.map((h, i) => {
              const Icon = h.icon;
              return (
                <motion.div
                  key={h.title}
                  className="about__highlight-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.3 }}
                >
                  <div className="about__highlight-icon">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="about__highlight-title">{h.title}</h4>
                    <p className="about__highlight-desc">{h.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.button
            className="btn btn-primary"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => document.querySelector('#reservation').scrollIntoView({ behavior: 'smooth' })}
          >
            Reserve Your Experience
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
