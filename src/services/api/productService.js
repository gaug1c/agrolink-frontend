import axiosInstance from './axios.config';

/**
 * Service pour gérer les produits
 */
export const productService = {
  /**
   * Récupérer tous les produits avec filtres optionnels
   * @param {Object} params - Paramètres de filtrage
   * @returns {Promise} Liste des produits
   */
  async getAllProducts(params = {}) {
  try {
    const response = await axiosInstance.get('/products', { params });
    // Retourne le tableau directement
    return Array.isArray(response.data) ? response.data : response.data.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    throw error;
  }
},

  /**
   * Récupérer un produit par son ID
   * @param {number} id - ID du produit
   * @returns {Promise} Détails du produit
   */
  async getProductById(id) {
    try {
      const response = await axiosInstance.get(`/products/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du produit ${id}:`, error);
      throw error;
    }
  },

  /**
   * Récupérer les produits mis en avant
   * @returns {Promise} Liste des produits featured
   */
  async getFeaturedProducts() {
    try {
      const response = await axiosInstance.get('/products/featured');
      return response.data.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des produits featured:', error);
      throw error;
    }
  },

  /**
   * Récupérer les produits frais
   * @returns {Promise} Liste des produits frais
   */
  async getFreshProducts() {
    try {
      const response = await axiosInstance.get('/products/fresh');
      return response.data.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des produits frais:', error);
      throw error;
    }
  },

  /**
   * Récupérer les produits par catégorie
   * @param {number} categoryId - ID de la catégorie
   * @param {Object} params - Paramètres additionnels
   * @returns {Promise} Liste des produits de la catégorie
   */
  async getProductsByCategory(categoryId, params = {}) {
  try {
    const response = await axiosInstance.get(`/products/category/${categoryId}`, { params });
    return Array.isArray(response.data) ? response.data : response.data.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération des produits de la catégorie ${categoryId}:`, error);
    throw error;
  }
},

  /**
   * Créer un nouveau produit (Producteur uniquement)
   * @param {FormData} formData - Données du produit
   * @returns {Promise} Produit créé
   */
  async createProduct(formData) {
    try {
      const response = await axiosInstance.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.data;
    } catch (error) {
      console.error('Erreur lors de la création du produit:', error);
      throw error;
    }
  },

  /**
   * Mettre à jour un produit (Producteur uniquement)
   * @param {number} id - ID du produit
   * @param {FormData} formData - Nouvelles données du produit
   * @returns {Promise} Produit mis à jour
   */
  async updateProduct(id, formData) {
    try {
      const response = await axiosInstance.post(`/products/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du produit ${id}:`, error);
      throw error;
    }
  },

  /**
   * Supprimer un produit (Producteur uniquement)
   * @param {number} id - ID du produit
   * @returns {Promise}
   */
  async deleteProduct(id) {
    try {
      const response = await axiosInstance.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression du produit ${id}:`, error);
      throw error;
    }
  },
};