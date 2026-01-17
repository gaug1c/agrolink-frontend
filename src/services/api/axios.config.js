import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

const instance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  withCredentials: false,
});

/**
 * Intercepteur de requête
 * Ajoute automatiquement le token JWT
 */
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Intercepteur de réponse
 * Gère les erreurs globales
 */
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.warn('Session expirée');

        // Nettoyage session
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // ❌ PAS DE REDIRECTION ICI
        // Le guard React s’en chargera
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
