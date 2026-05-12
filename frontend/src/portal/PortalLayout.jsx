import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, ShoppingBag, Users, Settings, LogOut, Home, CalendarCheck, ClipboardList, Activity, DollarSign, Utensils } from 'lucide-react';
import './portal.css';

export default function PortalLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/portal/login');
  };

  return (
    <div className="portal-layout">
      {/* Sidebar */}
      <aside className="portal-sidebar">
        <div className="portal-brand">
          <span className="portal-brand-icon">🏔️</span>
          <div>
            <h3>Annapurna</h3>
            <p>Portal • {user.role}</p>
          </div>
        </div>

        <nav className="portal-nav">
          <NavLink to="/portal" end className={({ isActive }) => `portal-link ${isActive ? 'active' : ''}`}>
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>
          
          <NavLink to="/portal/pos" className={({ isActive }) => `portal-link ${isActive ? 'active' : ''}`}>
            <ShoppingBag size={18} /> POS Terminal
          </NavLink>
          
          <NavLink to="/portal/orders" className={({ isActive }) => `portal-link ${isActive ? 'active' : ''}`}>
            <ClipboardList size={18} /> Orders
          </NavLink>

          <NavLink to="/portal/reservations" className={({ isActive }) => `portal-link ${isActive ? 'active' : ''}`}>
            <CalendarCheck size={18} /> Reservations
          </NavLink>

          <NavLink to="/portal/menu" className={({ isActive }) => `portal-link ${isActive ? 'active' : ''}`}>
            <Utensils size={18} /> Menu Management
          </NavLink>

          {(user.role === 'admin' || user.role === 'manager') && (
            <NavLink to="/portal/staff" className={({ isActive }) => `portal-link ${isActive ? 'active' : ''}`}>
              <Users size={18} /> Staff Management
            </NavLink>
          )}

          {user.role === 'admin' && (
            <NavLink to="/portal/payments" className={({ isActive }) => `portal-link ${isActive ? 'active' : ''}`}>
              <DollarSign size={18} /> Payments
            </NavLink>
          )}

          {(user.role === 'admin' || user.role === 'manager') && (
            <NavLink to="/portal/activity" className={({ isActive }) => `portal-link ${isActive ? 'active' : ''}`}>
              <Activity size={18} /> Activity Log
            </NavLink>
          )}

          {user.role === 'admin' && (
            <NavLink to="/portal/settings" className={({ isActive }) => `portal-link ${isActive ? 'active' : ''}`}>
              <Settings size={18} /> System Settings
            </NavLink>
          )}
        </nav>

        <div className="portal-sidebar-footer">
          <div className="portal-user-info">
            <div className="portal-avatar">{user.name.charAt(0)}</div>
            <div>
              <strong>{user.name}</strong>
              <small>{user.email}</small>
            </div>
          </div>
          <button className="portal-logout-btn" onClick={handleLogout} title="Log Out">
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="portal-main">
        <header className="portal-header">
          <h2>{/* Title injected by active route/view */}</h2>
          <button className="btn-link" onClick={() => navigate('/')} style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
            <Home size={16} /> View Public Site
          </button>
        </header>
        <div className="portal-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
