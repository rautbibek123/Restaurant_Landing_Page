import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

const badgeClass = {
  'Bestseller': 'badge-red',
  "Chef's Pick": 'badge-gold',
  'Traditional': 'badge-orange',
};

export default function MenuCard({ item }) {
  return (
    <motion.div
      className="menu-card glass-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6, boxShadow: '0 20px 50px rgba(0,0,0,0.6)' }}
    >
      {/* Image Area */}
      <div className="menu-card__img-container" style={{ position: 'relative', height: '200px', overflow: 'hidden', borderTopLeftRadius: 'var(--radius-md)', borderTopRightRadius: 'var(--radius-md)' }}>
        <img src={item.image} alt={item.name} className="menu-card__image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        {item.badge && (
          <span className={`badge ${badgeClass[item.badge] || 'badge-gold'} menu-card__badge`}>
            {item.badge}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="menu-card__body">
        <div className="menu-card__header">
          <div>
            <h4 className="menu-card__name">{item.name}</h4>
            <span className="menu-card__nepali">{item.nepali}</span>
          </div>
          <div className="menu-card__price">
            <span className="menu-card__currency">Rs.</span>
            {item.price}
          </div>
        </div>

        <p className="menu-card__desc">{item.description}</p>

        <div className="menu-card__footer">
          {/* Spice level */}
          {item.spice > 0 && (
            <div className="spice-dots" title={`Spice level: ${item.spice}/3`}>
              {[1, 2, 3].map(n => (
                <span key={n} className={`spice-dot ${n <= item.spice ? 'active' : ''}`} />
              ))}
              <span className="menu-card__spice-label">Spice</span>
            </div>
          )}
          {item.isVeg && (
            <span className="menu-card__veg">
              <Leaf size={13} /> Veg
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
