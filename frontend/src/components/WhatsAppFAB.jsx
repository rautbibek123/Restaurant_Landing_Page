import { motion } from 'framer-motion';

export default function WhatsAppFAB() {
  const message = encodeURIComponent("Hello! I'd like to make a reservation at Annapurna Kitchen.");
  const href = `https://wa.me/9779841234567?text=${message}`;

  return (
    <motion.a
      id="whatsapp-fab"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-fab"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', damping: 12 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* WhatsApp SVG */}
      <svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor">
        <path d="M16 0C7.163 0 0 7.163 0 16c0 2.82.734 5.469 2.017 7.773L0 32l8.467-2.013A15.94 15.94 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.3 13.3 0 0 1-6.773-1.853l-.486-.29-5.027 1.196 1.224-4.896-.317-.502A13.277 13.277 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.28-9.92c-.398-.2-2.356-1.163-2.721-1.295-.365-.134-.63-.2-.896.2-.266.4-1.031 1.295-1.264 1.561-.233.267-.465.3-.863.1-.398-.2-1.682-.62-3.203-1.975-1.183-1.056-1.982-2.36-2.213-2.758-.231-.398-.025-.613.174-.811.178-.178.398-.466.597-.698.2-.233.266-.4.4-.666.133-.267.066-.5-.033-.699-.1-.2-.896-2.158-1.228-2.955-.323-.773-.652-.668-.896-.68-.231-.01-.497-.013-.763-.013-.266 0-.697.1-1.063.5-.365.4-1.394 1.362-1.394 3.32 0 1.957 1.428 3.847 1.627 4.114.2.266 2.81 4.29 6.811 6.017.952.41 1.694.655 2.273.838.955.303 1.824.26 2.511.158.766-.114 2.356-.963 2.688-1.893.332-.93.332-1.727.232-1.893-.099-.166-.365-.266-.763-.466z"/>
      </svg>
      <span className="whatsapp-fab__label">Chat with us</span>
    </motion.a>
  );
}
