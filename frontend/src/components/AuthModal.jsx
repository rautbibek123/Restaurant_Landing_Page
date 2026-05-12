import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const { login, register } = useAuth();

  // Block scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    let loggedInUser = null;
    if (mode === 'login') {
      loggedInUser = await login(form.email, form.password);
    } else {
      loggedInUser = await register(form.name, form.email, form.password);
    }
    setIsSubmitting(false);
    if (loggedInUser) {
      onClose();
      // If customer logs in via landing page modal, redirect to their dashboard
      if (loggedInUser.role === 'customer') {
        window.location.href = '/my-account';
      }
    }
  };

  const switchMode = () => {
    setMode(m => m === 'login' ? 'register' : 'login');
    setForm({ name: '', email: '', password: '' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="auth-modal-overlay"
          />

          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="auth-modal-content"
          >
            <div className="glass-card auth-modal-card">
              <button onClick={onClose} className="auth-modal-close" aria-label="Close modal">
                <X size={20} />
              </button>

              <div className="auth-modal-header">
                <h2 className="auth-modal-title">
                  {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="auth-modal-subtitle">
                  {mode === 'login' ? 'Sign in to view your reservations' : 'Join Annapurna Kitchen today'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="auth-form">
                {mode === 'register' && (
                  <div className="auth-input-group">
                    <User size={18} className="auth-input-icon" />
                    <input
                      type="text" required placeholder="Full Name"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="auth-input"
                    />
                  </div>
                )}

                <div className="auth-input-group">
                  <Mail size={18} className="auth-input-icon" />
                  <input
                    type="email" required placeholder="Email Address"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="auth-input"
                  />
                </div>

                <div className="auth-input-group">
                  <Lock size={18} className="auth-input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'} required
                    placeholder="Password" minLength={6}
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    className="auth-input"
                  />
                  <button type="button" onClick={() => setShowPassword(s => !s)} className="auth-toggle-pass">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <button type="submit" className="btn btn-primary auth-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? <span className="spinner" /> : mode === 'login' ? 'Sign In' : 'Create Account'}
                </button>
              </form>

              <div className="auth-switch">
                <span>
                  {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                </span>
                <button onClick={switchMode} className="auth-switch-btn">
                  {mode === 'login' ? 'Register here' : 'Sign in'}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
