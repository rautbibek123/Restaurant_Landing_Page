import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '../data/menuData';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const timerRef = useRef(null);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (!isAutoPlaying) return;
    timerRef.current = setInterval(next, 4500);
    return () => clearInterval(timerRef.current);
  }, [isAutoPlaying, current]);

  return (
    <section id="testimonials" className="section testimonials">
      <div className="testimonials__bg-orb" />

      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="section-tag">Testimonials</span>
          <h2 className="section-title">
            What Our <span className="gradient-text">Guests Say</span>
          </h2>
          <p className="section-subtitle">
            Authentic voices from diners who have experienced the Himalayan flavors.
          </p>
        </motion.div>

        <div
          className="testimonials__carousel"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Main card */}
          <motion.div
            key={current}
            className="testimonial-card glass-card"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.5 }}
          >
            <Quote size={40} className="testimonial-card__quote" />
            <p className="testimonial-card__text">{testimonials[current].text}</p>

            {/* Stars */}
            <div className="testimonial-card__stars">
              {[...Array(testimonials[current].rating)].map((_, i) => (
                <Star key={i} size={18} fill="var(--color-gold)" color="var(--color-gold)" />
              ))}
            </div>

            <div className="testimonial-card__author">
              <div className="testimonial-card__avatar">
                {testimonials[current].avatar}
              </div>
              <div>
                <div className="testimonial-card__name">{testimonials[current].name}</div>
                <div className="testimonial-card__role">{testimonials[current].role}</div>
              </div>
            </div>
          </motion.div>

          {/* Controls */}
          <div className="testimonials__controls">
            <button className="testimonials__arrow" onClick={prev} aria-label="Previous">
              <ChevronLeft size={20} />
            </button>

            <div className="testimonials__dots">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`testimonials__dot ${i === current ? 'testimonials__dot--active' : ''}`}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>

            <button className="testimonials__arrow" onClick={next} aria-label="Next">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
