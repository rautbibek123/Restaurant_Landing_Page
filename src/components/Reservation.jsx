import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Users, Send, CheckCircle2 } from 'lucide-react';

const TIMES = ['12:00 PM','12:30 PM','1:00 PM','1:30 PM','2:00 PM','6:00 PM','6:30 PM','7:00 PM','7:30 PM','8:00 PM','8:30 PM','9:00 PM'];
const GUESTS = ['1 Guest','2 Guests','3 Guests','4 Guests','5 Guests','6+ Guests'];

const initialForm = { name: '', email: '', phone: '', date: '', time: '', guests: '', message: '' };

export default function Reservation() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
    if (!form.date) e.date = 'Please select a date';
    if (!form.time) e.time = 'Please select a time';
    if (!form.guests) e.guests = 'Please select guest count';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    setLoading(false);
    setSubmitted(true);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <section id="reservation" className="section reservation">
      <div className="reservation__bg-orb" />

      <div className="container reservation__inner">
        {/* Left info */}
        <motion.div
          className="reservation__info"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="section-tag">Reservations</span>
          <h2 className="section-title">
            Reserve Your<br />
            <span className="gradient-text">Himalayan Table</span>
          </h2>
          <div className="ornament-divider"><span>✦</span></div>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
            Secure your seat for an unforgettable evening. Walk-ins welcome,
            but reservations are recommended for weekends and special occasions.
          </p>

          <div className="reservation__hours glass-card">
            <h4 className="reservation__hours-title">🕐 Opening Hours</h4>
            <div className="reservation__hours-list">
              {[
                ['Mon – Fri', '12:00 PM – 10:00 PM'],
                ['Saturday', '11:00 AM – 11:00 PM'],
                ['Sunday', '11:00 AM – 10:00 PM'],
              ].map(([day, time]) => (
                <div key={day} className="reservation__hour-row">
                  <span>{day}</span><span className="reservation__hour-time">{time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="reservation__contact-links">
            <a href="tel:+977-1-4567890" className="reservation__contact-link">
              📞 +977-1-456-7890
            </a>
            <a href="mailto:info@annapurnakitchen.com.np" className="reservation__contact-link">
              ✉️ info@annapurnakitchen.com.np
            </a>
          </div>
        </motion.div>

        {/* Right form */}
        <motion.div
          className="reservation__form-wrap"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                className="reservation__success glass-card"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', damping: 15 }}
              >
                <CheckCircle2 size={64} color="var(--color-gold)" strokeWidth={1.5} />
                <h3>Reservation Confirmed!</h3>
                <p>Thank you, <strong>{form.name}</strong>! We've received your booking for <strong>{form.date}</strong> at <strong>{form.time}</strong> for <strong>{form.guests}</strong>.</p>
                <p>We'll send a confirmation to <strong>{form.email}</strong>. See you soon! 🏔️</p>
                <button className="btn btn-primary" onClick={() => { setSubmitted(false); setForm(initialForm); }}>
                  Make Another Booking
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className="reservation__form glass-card"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                noValidate
              >
                <h3 className="reservation__form-title">Book a Table</h3>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="res-name">Full Name *</label>
                    <input id="res-name" name="name" placeholder="Ramesh Shrestha" value={form.name} onChange={handleChange} className={errors.name ? 'error' : ''} />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="res-email">Email *</label>
                    <input id="res-email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} className={errors.email ? 'error' : ''} />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="res-date"><Calendar size={14} /> Date *</label>
                    <input id="res-date" name="date" type="date" min={today} value={form.date} onChange={handleChange} className={errors.date ? 'error' : ''} />
                    {errors.date && <span className="form-error">{errors.date}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="res-time"><Clock size={14} /> Time *</label>
                    <select id="res-time" name="time" value={form.time} onChange={handleChange} className={errors.time ? 'error' : ''}>
                      <option value="">Select time</option>
                      {TIMES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    {errors.time && <span className="form-error">{errors.time}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="res-guests"><Users size={14} /> Guests *</label>
                    <select id="res-guests" name="guests" value={form.guests} onChange={handleChange} className={errors.guests ? 'error' : ''}>
                      <option value="">How many?</option>
                      {GUESTS.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                    {errors.guests && <span className="form-error">{errors.guests}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="res-phone">Phone</label>
                    <input id="res-phone" name="phone" placeholder="+977 98XXXXXXXX" value={form.phone} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="res-message">Special Requests</label>
                  <textarea id="res-message" name="message" rows={3} placeholder="Dietary needs, occasion, seating preference..." value={form.message} onChange={handleChange} />
                </div>

                <motion.button
                  type="submit"
                  className="btn btn-primary reservation__submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? (
                    <span className="reservation__loading"><span className="spinner" /> Confirming…</span>
                  ) : (
                    <><Send size={17} /> Confirm Reservation</>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
