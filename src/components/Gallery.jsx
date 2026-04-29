import { motion } from 'framer-motion';
import { galleryImages } from '../data/menuData';

export default function Gallery() {
  return (
    <section id="gallery" className="section gallery">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="section-tag">Gallery</span>
          <h2 className="section-title">
            A Feast for <span className="gradient-text">the Eyes</span>
          </h2>
          <p className="section-subtitle">
            Every corner of Annapurna Kitchen tells a story — from the kitchen to the table.
          </p>
        </motion.div>

        <div className="gallery__grid">
          {galleryImages.map((item, i) => (
            <motion.div
              key={item.id}
              className={`gallery__item gallery__item--${item.size}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ scale: 1.03, zIndex: 10 }}
            >
              <div className="gallery__item-inner">
                <img src={item.image} alt={item.label} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform var(--transition-base)' }} className="gallery__item-img" />
                <div className="gallery__item-overlay">
                  <h4 className="gallery__item-label">{item.label}</h4>
                  <p className="gallery__item-desc">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
