// auth/RequireSuperAuth.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSuperAuth } from './SuperAuth';

interface RequireSuperAuthProps {
  children: React.ReactNode;
}

export default function RequireSuperAuth({ children }: RequireSuperAuthProps) {
  const { isAuthenticated } = useSuperAuth();

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/super/login" replace />;
  }

  // Otherwise, render the protected content
  return <>{children}</>;
}
