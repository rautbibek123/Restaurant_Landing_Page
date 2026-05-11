import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function GalleryLightbox({ images, current, onClose, onPrev, onNext, onJump }) {
  const item = images[current];

  // Keyboard navigation
  const handleKey = useCallback((e) => {
    if (e.key === 'Escape')     onClose();
    if (e.key === 'ArrowRight') onNext();
    if (e.key === 'ArrowLeft')  onPrev();
  }, [onClose, onNext, onPrev]);

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  return (
    <AnimatePresence>
      <motion.div
        className="lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      >
        {/* Close */}
        <button className="lightbox__close" onClick={onClose} aria-label="Close">
          <X size={24} />
        </button>

        {/* Counter */}
        <div className="lightbox__counter">{current + 1} / {images.length}</div>

        {/* Prev */}
        <button
          className="lightbox__nav lightbox__nav--prev"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous image"
        >
          <ChevronLeft size={32} />
        </button>

        {/* Main image */}
        <motion.div
          key={current}
          className="lightbox__img-wrap"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <img src={item.image} alt={item.label} className="lightbox__img" />
          <div className="lightbox__caption">
            <h4 className="lightbox__caption-title">{item.label}</h4>
            <p className="lightbox__caption-desc">{item.desc}</p>
          </div>
        </motion.div>

        {/* Next */}
        <button
          className="lightbox__nav lightbox__nav--next"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next image"
        >
          <ChevronRight size={32} />
        </button>

        {/* Thumbnail strip */}
        <div className="lightbox__thumbs" onClick={(e) => e.stopPropagation()}>
          {images.map((img, i) => (
            <button
              key={img.id}
              className={`lightbox__thumb ${i === current ? 'lightbox__thumb--active' : ''}`}
              onClick={() => onJump(i)}
              aria-label={`View ${img.label}`}
            >
              <img src={img.image} alt={img.label} />
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
