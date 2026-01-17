import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = ({ children, allowedUserTypes = [] }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;

  if (!user) return <Navigate to="/connexion" replace />;

  if (allowedUserTypes.length && !allowedUserTypes.includes(user.role)) {
    if (user.role === 'producteur' || user.role === 'producer')
      return <Navigate to="/producer/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
