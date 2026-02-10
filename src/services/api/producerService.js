import axiosInstance from './axios.config';

export const producerService = {
  /**
   * Récupérer tous les producteurs
   * @param {Object} params - Paramètres de filtrage et tri
   * @returns {Promise} Liste des producteurs
   */
  getAllProducers: async (params = {}) => {
    try {
      const response = await axiosInstance.get('/producers', { params });
      return response.data.data || response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des producteurs:', error);
      throw error;
    }
  },

  /**
   * Récupérer un producteur par son ID
   * @param {string|number} id - ID du producteur
   * @returns {Promise} Détails du producteur
   */
  getProducerById: async (id) => {
    try {
      const response = await axiosInstance.get(`/producers/${id}`);
      return response.data.data || response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du producteur ${id}:`, error);
      throw error;
    }
  },

  /**
   * Récupérer les produits d'un producteur
   * @param {string|number} producerId - ID du producteur
   * @param {Object} params - Paramètres de pagination et filtrage
   * @returns {Promise} Liste des produits du producteur
   */
  getProducerProducts: async (producerId, params = {}) => {
    try {
      const response = await axiosInstance.get(`/producers/${producerId}/products`, { params });
      return response.data.data || response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération des produits du producteur ${producerId}:`, error);
      throw error;
    }
  },

  /**
   * Récupérer les statistiques d'un producteur
   * @param {string|number} producerId - ID du producteur
   * @returns {Promise} Statistiques du producteur
   */
  getProducerStats: async (producerId) => {
    try {
      const response = await axiosInstance.get(`/producers/${producerId}/stats`);
      return response.data.data || response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération des stats du producteur ${producerId}:`, error);
      throw error;
    }
  },

  /**
   * Rechercher des producteurs
   * @param {string} query - Terme de recherche
   * @param {Object} params - Paramètres supplémentaires
   * @returns {Promise} Résultats de recherche
   */
  searchProducers: async (query, params = {}) => {
    try {
      const response = await axiosInstance.get('/producers/search', {
        params: { q: query, ...params }
      });
      return response.data.data || response.data;
    } catch (error) {
      console.error('Erreur lors de la recherche de producteurs:', error);
      throw error;
    }
  },

  /**
   * Récupérer les producteurs par province
   * @param {string} province - Nom de la province
   * @returns {Promise} Liste des producteurs de la province
   */
  getProducersByProvince: async (province) => {
    try {
      const response = await axiosInstance.get('/producers', {
        params: { province }
      });
      return response.data.data || response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération des producteurs de ${province}:`, error);
      throw error;
    }
  },

  /**
   * Récupérer les producteurs par type de production
   * @param {string} type - Type de production
   * @returns {Promise} Liste des producteurs par type
   */
  getProducersByType: async (type) => {
    try {
      const response = await axiosInstance.get('/producers', {
        params: { type }
      });
      return response.data.data || response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération des producteurs de type ${type}:`, error);
      throw error;
    }
  },
};

export default producerService;