import axiosInstance from './axios.config';

/**
 * Service pour gérer le panier
 */
export const cartService = {
  /**
   * Récupérer le contenu du panier
   * @returns {Promise} Contenu du panier
   */
  async getCart() {
    try {
      const response = await axiosInstance.get('/cart');
      return response.data.data;
    } catch (error) {
      console.error('Erreur lors de la récupération du panier:', error);
      throw error;
    }
  },

  /**
   * Ajouter un produit au panier
   * @param {Object} cartData - {product_id, quantity}
   * @returns {Promise} Panier mis à jour
   */
  async addToCart(cartData) {
    try {
      const response = await axiosInstance.post('/cart/add', cartData);
      return response.data.data;
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier:', error);
      throw error;
    }
  },

  /**
   * Mettre à jour la quantité d'un article du panier
   * @param {number} itemId - ID de l'article dans le panier
   * @param {number} quantity - Nouvelle quantité
   * @returns {Promise} Panier mis à jour
   */
  async updateCartItem(itemId, quantity) {
    try {
      const response = await axiosInstance.put(`/cart/items/${itemId}`, { quantity });
      return response.data.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de l'article ${itemId}:`, error);
      throw error;
    }
  },

  /**
   * Supprimer un article du panier
   * @param {number} itemId - ID de l'article dans le panier
   * @returns {Promise} Panier mis à jour
   */
  async removeFromCart(itemId) {
    try {
      const response = await axiosInstance.delete(`/cart/items/${itemId}`);
      return response.data.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression de l'article ${itemId}:`, error);
      throw error;
    }
  },

  /**
   * Vider le panier
   * @returns {Promise}
   */
  async clearCart() {
    try {
      const response = await axiosInstance.delete('/cart/clear');
      return response.data;
    } catch (error) {
      console.error('Erreur lors du vidage du panier:', error);
      throw error;
    }
  },

  /**
   * Obtenir le nombre d'articles dans le panier
   * @returns {Promise} Nombre d'articles
   */
  async getCartCount() {
    try {
      const response = await axiosInstance.get('/cart/count');
      return response.data.data.count;
    } catch (error) {
      console.error('Erreur lors de la récupération du nombre d\'articles:', error);
      throw error;
    }
  },

  /**
   * Vérifier la disponibilité des articles du panier
   * @returns {Promise} Statut de disponibilité
   */
  async checkAvailability() {
    try {
      const response = await axiosInstance.get('/cart/check-availability');
      return response.data.data;
    } catch (error) {
      console.error('Erreur lors de la vérification de disponibilité:', error);
      throw error;
    }
  },
};