import React, { createContext, useState, useEffect } from 'react';
import * as authService from '../services/api/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Charger l'utilisateur depuis le localStorage au démarrage
   */
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (storedUser && token) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Erreur chargement utilisateur:', error);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Connexion (API réelle)
   */
  const login = async (credentials) => {
    try {
      setLoading(true);

      const response = await authService.login(credentials);
      const { user: userData, token } = response.data;

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);

      return response.data;
    } catch (error) {
      console.error('❌ Erreur login:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Inscription (API réelle)
   */
  const register = async (formData) => {
    try {
      setLoading(true);

      const response = await authService.register(formData);
      const { user: userData, token } = response.data;

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);

      return response.data;
    } catch (error) {
      console.error('❌ Erreur inscription:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Déconnexion
   */
  const logout = async () => {
    try {
      await authService.logout();
    } catch (e) {
      // même si l'API échoue, on nettoie côté frontend
      console.warn('Logout API error (ignored)');
    } finally {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  /**
   * Mettre à jour l'utilisateur localement
   */
  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  /**
   * Helpers
   */
  const isProducer = () =>
    user?.userType === 'producteur' || user?.userType === 'producer';

  const isConsumer = () =>
    user?.userType === 'consommateur' || user?.userType === 'consumer';

  const getToken = () => localStorage.getItem('token');

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateUser,
        isProducer,
        isConsumer,
        getToken,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
