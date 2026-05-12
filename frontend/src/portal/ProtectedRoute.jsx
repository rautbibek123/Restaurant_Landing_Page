import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  // Not logged in → redirect to portal login
  if (!user) {
    return <Navigate to="/portal/login" replace />;
  }

  // Logged-in customer trying to access staff portal → redirect to their account
  if (user.role === 'customer' && (!allowedRoles || !allowedRoles.includes('customer'))) {
    return <Navigate to="/my-account" replace />;
  }

  // Logged in but role not in allowedRoles → redirect to portal dashboard
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/portal" replace />;
  }

  // Authorized
  return children;
}
