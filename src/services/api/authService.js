import axios from './axios.config';

export const login = async (credentials) => {
  try {
    const response = await axios.post('/auth/login', credentials);

    const token = response?.data?.data?.token;
    const user = response?.data?.data?.user;

    if (!token || !user) {
      throw new Error('Réponse API invalide');
    }

    // Stockage
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    return { user, token };
  } catch (error) {
    throw {
      message: error.response?.data?.message || 'Email ou mot de passe incorrect',
      status: error.response?.status,
    };
  }
};

export const logout = async () => {
  try {
    await axios.post('/auth/logout');
  } finally {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const getCurrentUser = async () => {
  const response = await axios.get('/auth/me');
  return response.data.data;
};
