import axiosInstance from './axios.config';

/**
 * Service pour gérer les commandes
 */
export const orderService = {
  /**
   * Récupérer toutes les commandes de l'utilisateur
   * @param {Object} params - Paramètres de filtrage (status, sort, etc.)
   * @returns {Promise} Liste des commandes
   */
  async getAllOrders(params = {}) {
    try {
      const response = await axiosInstance.get('/orders', { params });
      return response.data.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des commandes:', error);
      throw error;
    }
  },

  /**
   * Créer une nouvelle commande
   * @param {Object} orderData - Données de la commande
   * @returns {Promise} Commande créée
   */
  async createOrder(orderData) {
    try {
      const response = await axiosInstance.post('/orders', orderData);
      return response.data.data;
    } catch (error) {
      console.error('Erreur lors de la création de la commande:', error);
      throw error;
    }
  },

  /**
   * Récupérer les détails d'une commande
   * @param {number} id - ID de la commande
   * @returns {Promise} Détails de la commande
   */
  async getOrderById(id) {
    try {
      const response = await axiosInstance.get(`/orders/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de la commande ${id}:`, error);
      throw error;
    }
  },

  /**
   * Annuler une commande
   * @param {number} id - ID de la commande
   * @param {string} reason - Raison de l'annulation (optionnel)
   * @returns {Promise} Commande annulée
   */
  async cancelOrder(id, reason = '') {
    try {
      const response = await axiosInstance.post(`/orders/${id}/cancel`, { reason });
      return response.data.data;
    } catch (error) {
      console.error(`Erreur lors de l'annulation de la commande ${id}:`, error);
      throw error;
    }
  },

  /**
   * Suivre une commande par son numéro
   * @param {string} orderNumber - Numéro de commande
   * @returns {Promise} Informations de suivi
   */
  async trackOrder(orderNumber) {
    try {
      const response = await axiosInstance.get(`/orders/track/${orderNumber}`);
      return response.data.data;
    } catch (error) {
      console.error(`Erreur lors du suivi de la commande ${orderNumber}:`, error);
      throw error;
    }
  },

  /**
   * Confirmer la livraison d'une commande
   * @param {number} id - ID de la commande
   * @returns {Promise} Commande confirmée
   */
  async confirmDelivery(id) {
    try {
      const response = await axiosInstance.post(`/orders/${id}/confirm-delivery`);
      return response.data.data;
    } catch (error) {
      console.error(`Erreur lors de la confirmation de livraison de la commande ${id}:`, error);
      throw error;
    }
  },
};