import axiosInstance from './axios.config';

export const producerService = {
  getAllProducers: async () => {
    const response = await axiosInstance.get('/producers');
    return response.data;
  },

  getProducerById: async (id) => {
    const response = await axiosInstance.get(`/producers/${id}`);
    return response.data;
  },

  getProducerProducts: async (id) => {
    const response = await axiosInstance.get(`/producers/${id}/products`);
    return response.data;
  },

  updateProducerProfile: async (data) => {
    const response = await axiosInstance.put('/producers/profile', data);
    return response.data;
  },

  getProducerStats: async () => {
    const response = await axiosInstance.get('/producers/stats');
    return response.data;
  },
};