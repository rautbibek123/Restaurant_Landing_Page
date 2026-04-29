import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { UtensilsCrossed, Users, Award, Clock } from 'lucide-react';

const stats = [
  { icon: Clock, value: 15, suffix: '+', label: 'Years of Taste', nepali: 'वर्ष' },
  { icon: UtensilsCrossed, value: 80, suffix: '+', label: 'Authentic Dishes', nepali: 'परिकार' },
  { icon: Users, value: 10000, suffix: '+', label: 'Happy Guests', nepali: 'खुसी पाहुना' },
  { icon: Award, value: 12, suffix: '', label: 'Awards Won', nepali: 'पुरस्कार' },
];

function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({ stat, index, visible }) {
  const count = useCounter(stat.value, 2000, visible);
  const Icon = stat.icon;

  return (
    <motion.div
      className="trust-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <div className="trust-card__icon">
        <Icon size={28} strokeWidth={1.5} />
      </div>
      <div className="trust-card__value">
        {count.toLocaleString()}{stat.suffix}
      </div>
      <div className="trust-card__label">{stat.label}</div>
      <div className="trust-card__nepali">{stat.nepali}</div>
    </motion.div>
  );
}

export default function TrustStrip() {
  const [visible, setVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="trust" className="trust-strip" ref={ref}>
      <div className="container trust-strip__grid">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} index={i} visible={visible} />
        ))}
      </div>
    </section>
  );
}
