import axiosInstance from './axios.config';

/**
 * Service pour gérer les catégories
 */
export const categoryService = {
  /**
   * Récupérer toutes les catégories
   * @returns {Promise} Liste des catégories
   */
  async getAllCategories() {
    try {
      const response = await axiosInstance.get('/categories');
      return response.data.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories:', error);
      throw error;
    }
  },

  /**
   * Récupérer la hiérarchie des catégories (arbre)
   * @returns {Promise} Arbre des catégories
   */
  async getCategoryTree() {
    try {
      const response = await axiosInstance.get('/categories/tree');
      return response.data.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'arbre des catégories:', error);
      throw error;
    }
  },

  /**
   * Récupérer les catégories populaires
   * @returns {Promise} Liste des catégories populaires
   */
  async getPopularCategories() {
    try {
      const response = await axiosInstance.get('/categories/popular');
      return response.data.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories populaires:', error);
      throw error;
    }
  },

  /**
   * Rechercher des catégories
   * @param {string} query - Terme de recherche
   * @returns {Promise} Résultats de recherche
   */
  async searchCategories(query) {
    try {
      const response = await axiosInstance.get('/categories/search', {
        params: { query },
      });
      return response.data.data;
    } catch (error) {
      console.error('Erreur lors de la recherche de catégories:', error);
      throw error;
    }
  },

  /**
   * Récupérer une catégorie par son ID
   * @param {number} id - ID de la catégorie
   * @returns {Promise} Détails de la catégorie
   */
  async getCategoryById(id) {
    try {
      const response = await axiosInstance.get(`/categories/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de la catégorie ${id}:`, error);
      throw error;
    }
  },

  /**
   * Créer une nouvelle catégorie (Admin uniquement)
   * @param {Object} categoryData - Données de la catégorie
   * @returns {Promise} Catégorie créée
   */
  async createCategory(categoryData) {
    try {
      const response = await axiosInstance.post('/categories', categoryData);
      return response.data.data;
    } catch (error) {
      console.error('Erreur lors de la création de la catégorie:', error);
      throw error;
    }
  },

  /**
   * Mettre à jour une catégorie (Admin uniquement)
   * @param {number} id - ID de la catégorie
   * @param {Object} categoryData - Nouvelles données
   * @returns {Promise} Catégorie mise à jour
   */
  async updateCategory(id, categoryData) {
    try {
      const response = await axiosInstance.put(`/categories/${id}`, categoryData);
      return response.data.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de la catégorie ${id}:`, error);
      throw error;
    }
  },

  /**
   * Supprimer une catégorie (Admin uniquement)
   * @param {number} id - ID de la catégorie
   * @returns {Promise}
   */
  async deleteCategory(id) {
    try {
      const response = await axiosInstance.delete(`/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression de la catégorie ${id}:`, error);
      throw error;
    }
  },
};