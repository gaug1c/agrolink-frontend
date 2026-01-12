import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Charger l'utilisateur depuis le localStorage au démarrage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (storedUser && token) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      }
    } catch (error) {
      console.error('Erreur chargement utilisateur:', error);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Connexion
   */
  const login = async (credentials) => {
    try {
      setLoading(true);
      
      // VERSION AVEC API (décommenter quand prêt)
      /*
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      
      if (!response.ok) {
        throw new Error('Identifiant ou mot de passe incorrect');
      }
      
      const data = await response.json();
      const { user: userData, token } = data;
      */

      // VERSION SIMULÉE (supprimer une fois l'API prête)
      console.log('🔐 Login avec:', credentials);
      
      // Simuler une réponse API
      const userData = {
        id: '123',
        email: credentials.identifier,
        userType: 'consommateur', // Changez en 'producteur' pour tester le dashboard
        firstName: 'Test',
        lastName: 'User',
        phone: '+241 XX XX XX XX'
      };
      
      const token = 'fake-jwt-token-' + Date.now();
      
      // Stocker dans localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);
      
      setUser(userData);

      console.log('✅ Connexion réussie:', userData);
      return { user: userData, token };
    } catch (error) {
      console.error('❌ Erreur de connexion:', error);
      throw new Error(error.message || 'Identifiant ou mot de passe incorrect');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Inscription
   */
  const register = async (formData) => {
    try {
      setLoading(true);
      
      // Extraire le userType
      let userType = 'consommateur';
      if (formData instanceof FormData) {
        userType = formData.get('userType') || 'consommateur';
      } else {
        userType = formData.userType || 'consommateur';
      }

      console.log('📝 Inscription avec userType:', userType);

      // VERSION AVEC API (décommenter quand prêt)
      /*
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de l\'inscription');
      }
      
      const data = await response.json();
      const { user: userData, token } = data;
      */

      // VERSION SIMULÉE (supprimer une fois l'API prête)
      const userData = {
        id: 'new-' + Date.now(),
        userType: userType,
        firstName: 'Nouveau',
        lastName: 'Utilisateur',
        email: formData instanceof FormData ? formData.get('email') : formData.email,
        // Ajouter les champs producteur si c'est un producteur
        ...(userType === 'producteur' && {
          nomResponsable: formData instanceof FormData ? formData.get('nomResponsable') : formData.nomResponsable,
          province: formData instanceof FormData ? formData.get('province') : formData.province,
          villeProduction: formData instanceof FormData ? formData.get('villeProduction') : formData.villeProduction
        })
      };
      
      const token = 'fake-jwt-token-' + Date.now();
      
      // Stocker dans localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);
      
      setUser(userData);

      console.log('✅ Inscription réussie:', userData);
      return { user: userData, token };
    } catch (error) {
      console.error('❌ Erreur d\'inscription:', error);
      throw new Error(error.message || 'Une erreur est survenue lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Déconnexion
   * Note: La navigation est gérée par le composant qui appelle logout()
   */
  const logout = () => {
    console.log('👋 Déconnexion');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    // Note: La redirection vers /connexion est maintenant gérée 
    // par le composant qui appelle cette fonction (avec useNavigate)
  };

  /**
   * Mettre à jour l'utilisateur
   */
  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    console.log('🔄 Utilisateur mis à jour:', updatedUser);
  };

  /**
   * Vérifier si l'utilisateur est un producteur
   */
  const isProducer = () => {
    return user?.userType === 'producteur' || user?.userType === 'producer';
  };

  /**
   * Vérifier si l'utilisateur est un consommateur
   */
  const isConsumer = () => {
    return user?.userType === 'consommateur' || user?.userType === 'consumer';
  };

  /**
   * Obtenir le token
   */
  const getToken = () => {
    return localStorage.getItem('token');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
    isProducer,
    isConsumer,
    getToken,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};