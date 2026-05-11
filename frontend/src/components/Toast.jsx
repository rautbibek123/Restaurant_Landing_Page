import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';

/* ─── Context ─────────────────────────────────────────── */
const ToastContext = createContext(null);

const ICONS = {
  success: <CheckCircle2 size={20} color="#2ECC71" />,
  error:   <XCircle    size={20} color="#E74C3C" />,
  info:    <Info        size={20} color="#F1C40F" />,
};

/* ─── Provider ────────────────────────────────────────── */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const id = useRef(0);

  const toast = useCallback((message, type = 'info', duration = 4000) => {
    const tid = ++id.current;
    setToasts(t => [...t, { id: tid, message, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== tid)), duration);
  }, []);

  const remove = useCallback((tid) => {
    setToasts(t => t.filter(x => x.id !== tid));
  }, []);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="toast-container" aria-live="polite">
        <AnimatePresence>
          {toasts.map(t => (
            <motion.div
              key={t.id}
              className={`toast toast--${t.type}`}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            >
              {ICONS[t.type]}
              <span className="toast__message">{t.message}</span>
              <button
                className="toast__close"
                onClick={() => remove(t.id)}
                aria-label="Dismiss"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

/* ─── Hook ────────────────────────────────────────────── */
export function useToast() {
  return useContext(ToastContext);
}
