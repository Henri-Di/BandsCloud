// src/components/auth/PrivateRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { JSX } from 'react';

interface PrivateRouteProps {
  children: JSX.Element;
  allowedRoles?: string[];
}

export default function PrivateRoute({ children, allowedRoles }: PrivateRouteProps) {
  const { isAuthenticated, roles } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" />;

  if (allowedRoles && !roles.some((role: string) => allowedRoles.includes(role))) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}
