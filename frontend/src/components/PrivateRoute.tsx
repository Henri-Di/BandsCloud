import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { JSX } from 'react';

interface PrivateRouteProps {
  children: JSX.Element;
  allowedRoles?: string[];
}

export default function PrivateRoute({ children, allowedRoles }: PrivateRouteProps) {
  const { isAuthenticated, roles = [] } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const hasRole = roles.some(role => allowedRoles.includes(role));
    if (!hasRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children;
}
