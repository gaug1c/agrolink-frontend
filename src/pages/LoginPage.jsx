import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, AlertCircle, Phone } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    identifier: '', // Email ou téléphone
    password: '',
    remember: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Détecte si l'identifiant est un email ou un numéro de téléphone
  const getIdentifierType = (value) => {
    // Si contient @ c'est un email
    if (value.includes('@')) {
      return 'email';
    }
    // Si contient seulement des chiffres, espaces, +, - ou () c'est un téléphone
    if (/^[\d\s\+\-\(\)]+$/.test(value)) {
      return 'phone';
    }
    return 'unknown';
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError(''); // Clear error when user types
  };

  const validate = () => {
    if (!formData.identifier) {
      setError('Email ou numéro de téléphone requis');
      return false;
    }

    const identifierType = getIdentifierType(formData.identifier);
    
    if (identifierType === 'email') {
      // Validation email
      if (!/\S+@\S+\.\S+/.test(formData.identifier)) {
        setError('Email invalide');
        return false;
      }
    } else if (identifierType === 'phone') {
      // Validation téléphone (au moins 8 chiffres)
      const phoneDigits = formData.identifier.replace(/[\s\-\(\)\+]/g, '');
      if (phoneDigits.length < 8) {
        setError('Numéro de téléphone invalide');
        return false;
      }
    } else {
      setError('Format invalide. Utilisez un email ou un numéro de téléphone');
      return false;
    }

    if (!formData.password) {
      setError('Mot de passe requis');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      // Déterminer le type d'identifiant pour l'envoi
      const identifierType = getIdentifierType(formData.identifier);
      
      const loginData = {
        ...formData,
        identifierType, // Envoyer le type au backend
      };
      
      const response = await login(loginData);
      
      // Redirection automatique selon le userType
      const userType = response?.user?.userType || response?.userType;
      if (userType === 'producteur' || userType === 'producer') {
        navigate('/producteur/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Identifiant ou mot de passe incorrect');
    } finally {
      setLoading(false);
    }
  };

  // Déterminer l'icône à afficher en fonction du contenu
  const getInputIcon = () => {
    if (!formData.identifier) {
      return <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />;
    }
    const type = getIdentifierType(formData.identifier);
    return type === 'phone' 
      ? <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      : <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />;
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Bon retour !
        </h2>
        <p className="text-gray-600">
          Connectez-vous pour accéder à votre compte
        </p>
      </div>

      {/* Alert d'erreur */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email ou Téléphone */}
        <div>
          <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 mb-2">
            Email ou numéro de téléphone
          </label>
          <div className="relative">
            {getInputIcon()}
            <input
              type="text"
              id="identifier"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              placeholder="exemple@email.com ou +241 XX XX XX XX"
            />
          </div>
          {formData.identifier && (
            <p className="text-xs text-gray-500 mt-1">
              {getIdentifierType(formData.identifier) === 'email' && '✓ Format email détecté'}
              {getIdentifierType(formData.identifier) === 'phone' && '✓ Format téléphone détecté'}
              {getIdentifierType(formData.identifier) === 'unknown' && '⚠ Format non reconnu'}
            </p>
          )}
        </div>

        {/* Mot de passe */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Mot de passe
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Se souvenir de moi & Mot de passe oublié */}
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-600">Se souvenir de moi</span>
          </label>
          <Link
            to="/mot-de-passe-oublie"
            className="text-sm text-green-600 hover:text-green-700 font-medium"
          >
            Mot de passe oublié ?
          </Link>
        </div>

        {/* Bouton de connexion */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>

      {/* Divider */}
      <div className="my-8 flex items-center">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-4 text-sm text-gray-500">OU</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      {/* Connexion sociale */}
      <div className="space-y-3">
        <button className="w-full flex items-center justify-center space-x-3 border-2 border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span className="text-gray-700 font-medium">Continuer avec Google</span>
        </button>

        <button className="w-full flex items-center justify-center space-x-3 border-2 border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition">
          <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          <span className="text-gray-700 font-medium">Continuer avec Facebook</span>
        </button>
      </div>

      {/* Inscription */}
      <p className="mt-8 text-center text-sm text-gray-600">
        Vous n'avez pas de compte ?{' '}
        <Link to="/inscription" className="text-green-600 hover:text-green-700 font-semibold">
          Inscrivez-vous
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;