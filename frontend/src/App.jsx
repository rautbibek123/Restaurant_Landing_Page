import './styles/global.css';
import './App.css';
import { ToastProvider } from './components/Toast';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import About from './components/About';
import Menu from './components/Menu';
import Specials from './components/Specials';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Reservation from './components/Reservation';
import Location from './components/Location';
import Footer from './components/Footer';
import WhatsAppFAB from './components/WhatsAppFAB';

export default function App() {
  return (
    <ToastProvider>
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <About />
        <Menu />
        <Specials />
        <Gallery />
        <Testimonials />
        <Reservation />
        <Location />
      </main>
      <Footer />
      <WhatsAppFAB />
    </ToastProvider>
  );
}
