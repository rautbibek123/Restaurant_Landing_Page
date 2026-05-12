import { motion } from 'framer-motion';
import { Users, LayoutGrid, Info } from 'lucide-react';

const TABLES = [
  { id: 1, name: 'Himalayan View', image: '/images/tables/table1.png', capacity: 2, desc: 'Romantic window seat with panoramic mountain views.' },
  { id: 2, name: 'Cozy Corner', image: '/images/tables/table2.png', capacity: 2, desc: 'Quiet, intimate nook perfect for private conversations.' },
  { id: 3, name: 'Family Booth', image: '/images/tables/table3.png', capacity: 6, desc: 'Spacious booth designed for family gatherings and comfort.' },
  { id: 4, name: 'Central Dining', image: '/images/tables/table4.png', capacity: 4, desc: 'Elegant table at the heart of our vibrant dining room.' },
  { id: 5, name: 'Luxury Lounge', image: '/images/tables/table5.png', capacity: 4, desc: 'Premium seating with plush chairs and warm lighting.' },
];

export default function TablesSection() {
  return (
    <section id="tables" className="section tables-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-tag">Ambiance</span>
          <h2 className="section-title">Explore Our <span className="gradient-text">Seating</span></h2>
          <p className="section-subtitle">Choose the perfect setting for your Himalayan dining experience.</p>
        </div>

        <div className="tables-showcase-grid">
          {TABLES.map((table, i) => (
            <motion.div 
              key={table.id}
              className="table-showcase-card glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <div className="table-showcase-img">
                <img src={table.image} alt={table.name} />
                <div className="table-showcase-tag">#{table.id}</div>
              </div>
              <div className="table-showcase-content">
                <div className="table-showcase-header">
                  <h3>{table.name}</h3>
                  <span className="table-showcase-capacity">
                    <Users size={14} /> {table.capacity} Guests
                  </span>
                </div>
                <p>{table.desc}</p>
                <div className="table-showcase-footer">
                   <a href="#reservation" className="btn btn-outline btn-sm">
                      <LayoutGrid size={14} /> Book This Table
                   </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="tables-info-banner glass-card">
          <Info size={24} className="info-icon" />
          <p>Looking for a private event? We offer exclusive floor bookings for groups larger than 12. <a href="#contact" className="gradient-text">Contact us for details.</a></p>
        </div>
      </div>
    </section>
  );
}
