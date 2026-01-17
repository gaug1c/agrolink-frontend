import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setError('');
  };

  const validate = () => {
    if (!formData.email) {
      setError('Adresse email requise');
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Adresse email invalide');
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

    if (!validate()) return;

    setLoading(true);

    try {
      // 🔥 PAYLOAD COMPATIBLE BACK-END
      const response = await login({
        email: formData.email,
        password: formData.password,
      });

      const userType = response?.data?.user?.userType;

      if (userType === 'producteur' || userType === 'producer') {
        navigate('/producer/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Email ou mot de passe incorrect'
      );
    } finally {
      setLoading(false);
    }
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

      {/* Erreur */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Adresse email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="exemple@email.com"
            />
          </div>
        </div>

        {/* Mot de passe */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Mot de passe
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>

        {/* Remember & Forgot */}
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
              className="h-4 w-4 text-green-600"
            />
            <span className="ml-2 text-sm text-gray-600">
              Se souvenir de moi
            </span>
          </label>

          <Link
            to="/mot-de-passe-oublie"
            className="text-sm text-green-600 hover:text-green-700"
          >
            Mot de passe oublié ?
          </Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>

      {/* Inscription */}
      <p className="mt-8 text-center text-sm text-gray-600">
        Vous n'avez pas de compte ?{' '}
        <Link to="/inscription" className="text-green-600 font-semibold">
          Inscrivez-vous
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
