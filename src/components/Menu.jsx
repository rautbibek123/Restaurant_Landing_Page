import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { menuItems, menuCategories } from '../data/menuData';
import MenuCard from './MenuCard';

export default function Menu() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? menuItems : menuItems.filter(i => i.category === active);

  return (
    <section id="menu" className="section menu">
      <div className="container">
        {/* Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="section-tag">Our Menu</span>
          <h2 className="section-title">
            Flavors Rooted in <span className="gradient-text">Nepali Tradition</span>
          </h2>
          <p className="section-subtitle">
            From the valleys of Kathmandu to the peaks of Mustang — every dish tells a story.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="menu__tabs">
          {menuCategories.map((cat) => (
            <motion.button
              key={cat}
              className={`menu__tab ${active === cat ? 'menu__tab--active' : ''}`}
              onClick={() => setActive(cat)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="menu__grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {filtered.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
