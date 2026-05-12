import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const hours = [
  { day: 'Monday – Friday', time: '12:00 PM – 10:00 PM' },
  { day: 'Saturday', time: '11:00 AM – 11:00 PM' },
  { day: 'Sunday', time: '11:00 AM – 10:00 PM' },
  { day: 'Public Holidays', time: '11:00 AM – 9:00 PM' },
];

export default function Location() {
  return (
    <section id="contact" className="section location">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="section-tag">Find Us</span>
          <h2 className="section-title">
            Visit <span className="gradient-text">Annapurna Kitchen</span>
          </h2>
          <p className="section-subtitle">
            Located in the heart of Thamel, Kathmandu — Nepal's cultural crossroads.
          </p>
        </motion.div>

        <div className="location__grid">
          {/* Map placeholder */}
          <motion.div
            className="location__map glass-card"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <iframe 
              src="https://maps.google.com/maps?q=Thamel,Kathmandu,Nepal&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Annapurna Kitchen Location"
              style={{ filter: 'invert(90%) hue-rotate(180deg) brightness(0.9) contrast(0.9)' }}
            ></iframe>
          </motion.div>

          {/* Info cards */}
          <motion.div
            className="location__info"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Hours */}
            <div className="location__card glass-card">
              <div className="location__card-icon"><Clock size={22} strokeWidth={1.5} /></div>
              <div>
                <h4 className="location__card-title">Opening Hours</h4>
                <div className="location__hours">
                  {hours.map(h => (
                    <div key={h.day} className="location__hour-row">
                      <span>{h.day}</span>
                      <span className="location__hour-time">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="location__card glass-card">
              <div className="location__card-icon"><MapPin size={22} strokeWidth={1.5} /></div>
              <div>
                <h4 className="location__card-title">Address</h4>
                <p className="location__card-text">
                  Jyatha Marg, Thamel<br />
                  Kathmandu 44600<br />
                  Nepal 🇳🇵
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="location__card glass-card">
              <div className="location__card-icon"><Phone size={22} strokeWidth={1.5} /></div>
              <div>
                <h4 className="location__card-title">Get in Touch</h4>
                <div className="location__contacts">
                  <a href="tel:+977-1-4567890" className="location__contact-link">
                    <Phone size={14} /> +977-1-456-7890
                  </a>
                  <a href="mailto:info@annapurnakitchen.com.np" className="location__contact-link">
                    <Mail size={14} /> info@annapurnakitchen.com.np
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
