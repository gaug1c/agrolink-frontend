import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../services/api/axios.config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ----------------------------
  // Initialisation au démarrage
  // ----------------------------
  useEffect(() => {
    const initAuth = () => {
      try {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (token) {
          axiosInstance.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${token}`;
        }

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Erreur chargement utilisateur:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        delete axiosInstance.defaults.headers.common['Authorization'];
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // ----------------------------
  // Connexion
  // ----------------------------
  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/auth/login', credentials);
      const { user: userData, token } = response.data.data;

      // Stockage local
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);

      // Axios
      axiosInstance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${token}`;

      setUser(userData);
      return { user: userData, token };
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw new Error(
        error.response?.data?.message || 'Identifiant ou mot de passe incorrect'
      );
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------
  // Inscription
  // ----------------------------
  const register = async (formData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/auth/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const { user: userData, token } = response.data.data;

      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);

      axiosInstance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${token}`;

      setUser(userData);
      return { user: userData, token };
    } catch (error) {
      console.error('Erreur inscription:', error);
      throw new Error(
        error.response?.data?.message || 'Une erreur est survenue lors de l’inscription'
      );
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------
  // Déconnexion
  // ----------------------------
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    delete axiosInstance.defaults.headers.common['Authorization'];
    setUser(null);
  };

  // ----------------------------
  // Mise à jour de l'utilisateur
  // ----------------------------
  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  // ----------------------------
  // Vérifications de rôle
  // ----------------------------
  const hasRole = (roles) => {
    if (!user?.role) return false;
    const allowedRoles = Array.isArray(roles) ? roles : [roles];
    return allowedRoles.includes(user.role);
  };

  const isProducer = () => hasRole(['producer', 'producteur']);
  const isConsumer = () => hasRole(['consumer', 'consommateur']);

  // ----------------------------
  // Récupérer token
  // ----------------------------
  const getToken = () => localStorage.getItem('token');

  // ----------------------------
  // Context value
  // ----------------------------
  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
    hasRole,
    isProducer,
    isConsumer,
    getToken,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
