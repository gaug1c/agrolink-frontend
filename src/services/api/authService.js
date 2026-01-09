import axios from './axios.config';

/**
 * Service d'authentification
 * Gère tous les appels API liés à l'authentification
 */

/**
 * Connexion d'un utilisateur
 * @param {Object} credentials - Identifiants de connexion
 * @param {string} credentials.identifier - Email ou numéro de téléphone
 * @param {string} credentials.password - Mot de passe
 * @param {string} credentials.identifierType - Type d'identifiant ('email' ou 'phone')
 * @param {boolean} credentials.remember - Se souvenir de moi
 * @returns {Promise} Réponse de l'API avec user et token
 */
export const login = async (credentials) => {
  try {
    const response = await axios.post('/auth/login', credentials);
    
    // S'assurer que la réponse contient les bonnes données
    if (response.data && response.data.token) {
      // Stocker le token dans axios pour les requêtes futures
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    }
    
    return response;
  } catch (error) {
    console.error('Erreur API login:', error);
    throw {
      message: error.response?.data?.message || 'Identifiant ou mot de passe incorrect',
      status: error.response?.status,
      data: error.response?.data
    };
  }
};

/**
 * Inscription d'un nouvel utilisateur
 * @param {FormData|Object} formData - Données d'inscription
 * @returns {Promise} Réponse de l'API avec user et token
 */
export const register = async (formData) => {
  try {
    // Déterminer si c'est un FormData (pour producteur avec fichier) ou un objet simple
    const isFormData = formData instanceof FormData;
    
    const config = isFormData ? {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    } : {};

    const response = await axios.post('/auth/register', formData, config);
    
    // S'assurer que la réponse contient les bonnes données
    if (response.data && response.data.token) {
      // Stocker le token dans axios pour les requêtes futures
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    }
    
    return response;
  } catch (error) {
    console.error('Erreur API register:', error);
    throw {
      message: error.response?.data?.message || 'Une erreur est survenue lors de l\'inscription',
      status: error.response?.status,
      data: error.response?.data
    };
  }
};

/**
 * Déconnexion de l'utilisateur
 * @returns {Promise} Réponse de l'API
 */
export const logout = async () => {
  try {
    const response = await axios.post('/auth/logout');
    
    // Supprimer le token des headers
    delete axios.defaults.headers.common['Authorization'];
    
    return response;
  } catch (error) {
    console.error('Erreur API logout:', error);
    // Supprimer le token même en cas d'erreur
    delete axios.defaults.headers.common['Authorization'];
    throw error;
  }
};

/**
 * Vérifier la validité du token
 * @param {string} token - Token JWT à vérifier
 * @returns {Promise} Réponse de l'API
 */
export const verifyToken = async (token) => {
  try {
    const response = await axios.post('/auth/verify-token', { token });
    return response;
  } catch (error) {
    console.error('Erreur API verify-token:', error);
    throw error;
  }
};

/**
 * Demander la réinitialisation du mot de passe
 * @param {string} email - Email de l'utilisateur
 * @returns {Promise} Réponse de l'API
 */
export const forgotPassword = async (email) => {
  try {
    const response = await axios.post('/auth/forgot-password', { email });
    return response;
  } catch (error) {
    console.error('Erreur API forgot-password:', error);
    throw {
      message: error.response?.data?.message || 'Une erreur est survenue',
      status: error.response?.status
    };
  }
};

/**
 * Réinitialiser le mot de passe
 * @param {string} token - Token de réinitialisation
 * @param {string} newPassword - Nouveau mot de passe
 * @returns {Promise} Réponse de l'API
 */
export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.post('/auth/reset-password', {
      token,
      password: newPassword
    });
    return response;
  } catch (error) {
    console.error('Erreur API reset-password:', error);
    throw {
      message: error.response?.data?.message || 'Une erreur est survenue',
      status: error.response?.status
    };
  }
};

/**
 * Récupérer les informations de l'utilisateur actuel
 * @returns {Promise} Réponse de l'API avec les données utilisateur
 */
export const getCurrentUser = async () => {
  try {
    const response = await axios.get('/auth/me');
    return response;
  } catch (error) {
    console.error('Erreur API get-current-user:', error);
    throw error;
  }
};

/**
 * Mettre à jour le profil de l'utilisateur
 * @param {Object} userData - Nouvelles données utilisateur
 * @returns {Promise} Réponse de l'API
 */
export const updateProfile = async (userData) => {
  try {
    const response = await axios.put('/auth/profile', userData);
    return response;
  } catch (error) {
    console.error('Erreur API update-profile:', error);
    throw {
      message: error.response?.data?.message || 'Une erreur est survenue lors de la mise à jour',
      status: error.response?.status
    };
  }
};

/**
 * Changer le mot de passe
 * @param {string} currentPassword - Mot de passe actuel
 * @param {string} newPassword - Nouveau mot de passe
 * @returns {Promise} Réponse de l'API
 */
export const changePassword = async (currentPassword, newPassword) => {
  try {
    const response = await axios.put('/auth/change-password', {
      currentPassword,
      newPassword
    });
    return response;
  } catch (error) {
    console.error('Erreur API change-password:', error);
    throw {
      message: error.response?.data?.message || 'Une erreur est survenue',
      status: error.response?.status
    };
  }
};

export default {
  login,
  register,
  logout,
  verifyToken,
  forgotPassword,
  resetPassword,
  getCurrentUser,
  updateProfile,
  changePassword
};