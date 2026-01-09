import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * Hook personnalisé pour accéder au contexte d'authentification
 * @returns {Object} Contexte d'authentification avec user, login, register, logout, etc.
 * @throws {Error} Si utilisé en dehors d'un AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};