import axios from 'axios';

// Configuration de base d'axios 
// IMPORTANT: Remplacez l'URL par celle de votre API backend
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

const instance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercepteur de requête - Ajouter le token à chaque requête
instance.interceptors.request.use(
  (config) => {
    // Récupérer le token depuis localStorage
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

// Intercepteur de réponse - Gérer les erreurs globalement
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Gérer les erreurs d'authentification
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Token expiré ou invalide
          console.warn('Session expirée. Déconnexion...');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          // Rediriger vers la page de connexion
          if (window.location.pathname !== '/connexion') {
            window.location.href = '/connexion';
          }
          break;
          
        case 403:
          // Accès interdit
          console.error('Accès interdit');
          break;
          
        case 404:
          // Ressource non trouvée
          console.error('Ressource non trouvée');
          break;
          
        case 500:
          // Erreur serveur
          console.error('Erreur serveur');
          break;
          
        default:
          console.error('Erreur API:', error.response.status);
      }
    } else if (error.request) {
      // La requête a été faite mais aucune réponse n'a été reçue
      console.error('Pas de réponse du serveur');
    } else {
      // Erreur lors de la configuration de la requête
      console.error('Erreur de configuration:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default instance;