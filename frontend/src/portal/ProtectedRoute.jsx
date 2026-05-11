import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  // Not logged in -> redirect to login
  if (!user) {
    return <Navigate to="/portal/login" replace />;
  }

  // Logged in but role not authorized -> redirect to portal dashboard
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/portal" replace />;
  }

  // Authorized
  return children;
}
