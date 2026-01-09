import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Loader from '../components/common/Loader';

const PrivateRoute = ({ requiredRole }) => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return <Loader fullScreen text="Vérification..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/connexion" replace />;
  }

  if (requiredRole && user?.userType !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;