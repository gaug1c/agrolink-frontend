import axios from 'axios';

/**
 * Configuration de l'URL de base de l'API
 * Modifiez cette valeur selon votre environnement
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

/**
 * Instance Axios configurée pour l'API Agrolink
 */
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

/**
 * Intercepteur de requête
 * Ajoute automatiquement le token d'authentification si disponible
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Intercepteur de réponse
 * Gère les erreurs globalement
 */
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Gestion des erreurs d'authentification
    if (error.response?.status === 401) {
      // Token expiré ou invalide
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Redirection vers la page de connexion
      if (window.location.pathname !== '/connexion') {
        window.location.href = '/connexion';
      }
    }

    // Gestion des erreurs de validation (422)
    if (error.response?.status === 422) {
      const errors = error.response.data.errors;
      console.error('Erreurs de validation:', errors);
    }

    // Gestion des erreurs serveur (500)
    if (error.response?.status >= 500) {
      console.error('Erreur serveur:', error.response.data);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;