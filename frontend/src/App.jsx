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
import CustomerDashboard from './components/CustomerDashboard';
import TablesSection from './components/TablesSection';

// Portal Components
import Login from './portal/Login';
import PortalLayout from './portal/PortalLayout';
import ProtectedRoute from './portal/ProtectedRoute';
import POS from './portal/views/POS';
import Dashboard from './portal/views/Dashboard';
import OrderManagement from './portal/views/OrderManagement';
import StaffManagement from './portal/views/StaffManagement';
import TableManagement from './portal/views/TableManagement';
import Payments from './portal/views/Payments';
import ActivityLog from './portal/views/ActivityLog';
import Settings from './portal/views/Settings';
import MenuManagement from './portal/views/MenuManagement';

function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <About />
        <Menu />
        <TablesSection />
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
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />

            {/* Customer Account Dashboard */}
            <Route path="/my-account" element={<CustomerDashboard />} />

            {/* Portal Login */}
            <Route path="/portal/login" element={<Login />} />

            {/* Protected Portal Routes (Staff only) */}
            <Route
              path="/portal"
              element={
                <ProtectedRoute allowedRoles={['admin', 'manager', 'staff']}>
                  <PortalLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="pos" element={<POS />} />
              <Route path="orders" element={<OrderManagement />} />
              <Route path="reservations" element={<TableManagement />} />
              <Route path="menu" element={<MenuManagement />} />
              <Route path="payments" element={<Payments />} />
              <Route path="activity" element={<ActivityLog />} />
              <Route
                path="staff"
                element={
                  <ProtectedRoute allowedRoles={['admin', 'manager']}>
                    <StaffManagement />
                  </ProtectedRoute>
                }
              />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ToastProvider>
  );
}

