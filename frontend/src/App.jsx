import './styles/global.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ToastProvider } from './components/Toast';
import { AuthProvider } from './context/AuthContext';

// Public Landing Page Components
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

// Portal Components
import Login from './portal/Login';
import PortalLayout from './portal/PortalLayout';
import ProtectedRoute from './portal/ProtectedRoute';
import POS from './portal/views/POS';
import OrderManagement from './portal/views/OrderManagement';
import StaffManagement from './portal/views/StaffManagement';

function LandingPage() {
  return (
    <>
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
    </>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Route */}
            <Route path="/" element={<LandingPage />} />

            {/* Portal Login */}
            <Route path="/portal/login" element={<Login />} />

            {/* Protected Portal Routes */}
            <Route 
              path="/portal" 
              element={
                <ProtectedRoute>
                  <PortalLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<div style={{padding: '20px'}}><h2>Welcome to the Portal</h2><p>Select an option from the sidebar to begin.</p></div>} />
              <Route path="pos" element={<POS />} />
              <Route path="orders" element={<OrderManagement />} />
              <Route 
                path="staff" 
                element={
                  <ProtectedRoute allowedRoles={['admin', 'manager']}>
                    <StaffManagement />
                  </ProtectedRoute>
                } 
              />
              <Route path="settings" element={<div><h2>System Settings</h2><p>Admin only</p></div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ToastProvider>
  );
}
