import axiosInstance from './axios.config';

export const userService = {
  getProfile: async () => {
    const response = await axiosInstance.get('/users/profile');
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await axiosInstance.put('/users/profile', userData);
    return response.data;
  },

  changePassword: async (passwords) => {
    const response = await axiosInstance.post('/users/change-password', passwords);
    return response.data;
  },

  deleteAccount: async () => {
    const response = await axiosInstance.delete('/users/account');
    return response.data;
  },

  getFavorites: async () => {
    const response = await axiosInstance.get('/users/favorites');
    return response.data;
  },

  addFavorite: async (productId) => {
    const response = await axiosInstance.post(`/users/favorites/${productId}`);
    return response.data;
  },

  removeFavorite: async (productId) => {
    const response = await axiosInstance.delete(`/users/favorites/${productId}`);
    return response.data;
  },
};