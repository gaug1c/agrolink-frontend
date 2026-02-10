import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Lock, Eye, EyeOff, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);
  const [validating, setValidating] = useState(true);

  // Vérifier la validité du token au chargement
  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setTokenValid(false);
        setValidating(false);
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/validate-reset-token/${token}`);
        
        if (!response.ok) {
          setTokenValid(false);
        }
      } catch (err) {
        setTokenValid(false);
      } finally {
        setValidating(false);
      }
    };

    validateToken();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const validate = () => {
    if (!formData.password) {
      setError('Mot de passe requis');
      return false;
    }

    if (formData.password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return false;
    }

    // Vérification force du mot de passe
    const hasUpperCase = /[A-Z]/.test(formData.password);
    const hasLowerCase = /[a-z]/.test(formData.password);
    const hasNumber = /[0-9]/.test(formData.password);

    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
      setError('Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre');
      return false;
    }

    if (!formData.confirmPassword) {
      setError('Veuillez confirmer votre mot de passe');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Une erreur est survenue');
      }

      setSuccess(true);

      // Redirection vers la page de connexion après 3 secondes
      setTimeout(() => {
        navigate('/connexion', { 
          state: { message: 'Mot de passe réinitialisé avec succès. Vous pouvez maintenant vous connecter.' }
        });
      }, 3000);

    } catch (err) {
      setError(err.message || 'Impossible de réinitialiser le mot de passe');
    } finally {
      setLoading(false);
    }
  };

  // Token en cours de validation
  if (validating) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Vérification du lien...</p>
      </div>
    );
  }

  // Token invalide ou expiré
  if (!tokenValid) {
    return (
      <div>
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Lien invalide ou expiré
          </h2>
          <p className="text-gray-600">
            Ce lien de réinitialisation n'est plus valide
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
          <p className="text-sm text-red-800 mb-4">
            Le lien de réinitialisation a peut-être expiré ou a déjà été utilisé.
          </p>
          <p className="text-sm text-red-700">
            Les liens de réinitialisation expirent après 24 heures pour des raisons de sécurité.
          </p>
        </div>

        <Link
          to="/mot-de-passe-oublie"
          className="block w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 text-center transition-colors mb-4"
        >
          Demander un nouveau lien
        </Link>

        <Link
          to="/connexion"
          className="flex items-center justify-center text-sm text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à la connexion
        </Link>
      </div>
    );
  }

  // Succès
  if (success) {
    return (
      <div>
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Mot de passe réinitialisé !
          </h2>
          <p className="text-gray-600">
            Votre mot de passe a été modifié avec succès
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <p className="text-sm text-green-800 mb-2">
            Vous allez être redirigé vers la page de connexion dans quelques instants...
          </p>
          <p className="text-sm text-green-700">
            Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
          </p>
        </div>

        <Link
          to="/connexion"
          className="block w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 text-center transition-colors"
        >
          Aller à la connexion
        </Link>
      </div>
    );
  }

  // Formulaire de réinitialisation
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Nouveau mot de passe
        </h2>
        <p className="text-gray-600">
          Choisissez un mot de passe sécurisé pour votre compte
        </p>
      </div>

      {/* Erreur */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800 font-medium mb-2">
            Votre mot de passe doit contenir :
          </p>
          <ul className="text-sm text-blue-700 space-y-1 ml-4 list-disc">
            <li>Au moins 8 caractères</li>
            <li>Une lettre majuscule</li>
            <li>Une lettre minuscule</li>
            <li>Un chiffre</li>
          </ul>
        </div>

        {/* Nouveau mot de passe */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Nouveau mot de passe
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
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="••••••••"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Confirmer mot de passe */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
            Confirmer le mot de passe
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Réinitialisation...' : 'Réinitialiser le mot de passe'}
        </button>
      </form>

      {/* Retour connexion */}
      <div className="mt-8">
        <Link
          to="/connexion"
          className="flex items-center justify-center text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à la connexion
        </Link>
      </div>
    </div>
  );
};

export default ResetPasswordPage;