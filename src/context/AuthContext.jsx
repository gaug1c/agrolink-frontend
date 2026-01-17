import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../services/api/axios.config'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Charger l'utilisateur depuis le localStorage au démarrage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (storedUser && token) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
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
   * Connexion
   */
  const login = async (credentials) => {
    try {
      setLoading(true);

      const response = await axiosInstance.post('/auth/login', credentials);

      const { user: userData, token } = response.data.data;

      // Stocker dans localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);

      setUser(userData);
      return { user: userData, token };
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw new Error(
        error.response?.data?.message || error.message || 'Identifiant ou mot de passe incorrect'
      );
    } finally {
      setLoading(false);
    }
  };

  /**
   * Inscription
   */
  const register = async (formData) => {
    try {
      setLoading(true);

      // Assurer que c'est bien du FormData pour les fichiers
      const response = await axiosInstance.post('/auth/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const { user: userData, token } = response.data.data;

      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);

      setUser(userData);
      return { user: userData, token };
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      throw new Error(
        error.response?.data?.message || error.message || 'Une erreur est survenue lors de l\'inscription'
      );
    } finally {
      setLoading(false);
    }
  };

  /**
   * Déconnexion
   */
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  /**
   * Mettre à jour l'utilisateur
   */
  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  /**
   * Vérifier si l'utilisateur est un producteur
   */
  const isProducer = () => {
    return user?.userType === 'producer' || user?.userType === 'producer';
  };

  /**
   * Vérifier si l'utilisateur est un consommateur
   */
  const isConsumer = () => {
    return user?.userType === 'consumer' || user?.userType === 'consumer';
  };

  /**
   * Obtenir le token
   */
  const getToken = () => localStorage.getItem('token');

  const value = {
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
