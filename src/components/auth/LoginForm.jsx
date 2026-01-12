import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn, Phone } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';
import { Checkbox } from '../common/Input';
import { useAuth } from '../../hooks/useAuth';
import Alert from '../common/Alert';

const LoginForm = ({ onSuccess, redirectTo }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    identifier: '', // Email or phone
    password: '',
    remember: false,
  });

  const [errors, setErrors] = useState({});

  // Detects if identifier is an email or phone number
  const getIdentifierType = (value) => {
    // If contains @ it's an email
    if (value.includes('@')) {
      return 'email';
    }
    // If contains only digits, spaces, +, - or () it's a phone
    if (/^[\d\s\+\-\(\)]+$/.test(value)) {
      return 'phone';
    }
    return 'unknown';
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.identifier) {
      newErrors.identifier = 'Email ou numéro de téléphone requis';
    } else {
      const identifierType = getIdentifierType(formData.identifier);
      
      if (identifierType === 'email') {
        // Email validation
        if (!/\S+@\S+\.\S+/.test(formData.identifier)) {
          newErrors.identifier = 'Email invalide';
        }
      } else if (identifierType === 'phone') {
        // Phone validation (at least 8 digits)
        const phoneDigits = formData.identifier.replace(/[\s\-\(\)\+]/g, '');
        if (phoneDigits.length < 8) {
          newErrors.identifier = 'Numéro de téléphone invalide';
        }
      } else {
        newErrors.identifier = 'Format invalide. Utilisez un email ou un numéro de téléphone';
      }
    }

    if (!formData.password) {
      newErrors.password = 'Mot de passe requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validate()) return;

    setLoading(true);

    try {
      // Determine identifier type for submission
      const identifierType = getIdentifierType(formData.identifier);
      
      const loginData = {
        ...formData,
        identifierType, // Send type to backend
      };
      
      const response = await login(loginData);
      
      // Redirect based on user type
      if (onSuccess) {
        onSuccess();
      } else if (redirectTo) {
        navigate(redirectTo);
      } else {
        // Automatic redirect based on userType
        const userType = response?.user?.userType || response?.userType;
        if (userType === 'producer' || userType === 'producteur') {
          navigate('/dashboard/producteur');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      setError(err.message || 'Identifiant ou mot de passe incorrect');
    } finally {
      setLoading(false);
    }
  };

  // Determine icon to display based on content
  const getInputIcon = () => {
    if (!formData.identifier) {
      return <Mail />; // Default icon
    }
    const type = getIdentifierType(formData.identifier);
    return type === 'phone' ? <Phone /> : <Mail />;
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Error Alert */}
      {error && (
        <Alert
          type="error"
          message={error}
          dismissible
          onDismiss={() => setError('')}
          className="mb-6"
        />
      )}

      <div className="space-y-4">
        {/* Email or Phone */}
        <Input
          label="Email ou numéro de téléphone"
          type="text"
          name="identifier"
          value={formData.identifier}
          onChange={handleChange}
          placeholder="exemple@email.com ou +241 XX XX XX XX"
          icon={getInputIcon()}
          error={errors.identifier}
          required
        />

        {/* Password */}
        <div className="relative">
          <Input
            label="Mot de passe"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            icon={<Lock />}
            error={errors.password}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-11 text-gray-400 hover:text-gray-600 transition"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <Checkbox
            name="remember"
            checked={formData.remember}
            onChange={handleChange}
            label="Se souvenir de moi"
          />
          <Link 
            to="/mot-de-passe-oublie" 
            className="text-sm text-green-600 hover:text-green-700 font-semibold hover:underline"
          >
            Mot de passe oublié ?
          </Link>
        </div>

        {/* Submit Button */}
        <Button
          fullWidth
          size="lg"
          loading={loading}
          onClick={handleSubmit}
          icon={<LogIn className="w-5 h-5" />}
        >
          {loading ? 'Connexion...' : 'Se connecter'}
        </Button>

        {/* Sign Up Link */}
        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-gray-600">
            Vous n'avez pas de compte ?{' '}
            <Link 
              to="/inscription" 
              className="text-green-600 hover:text-green-700 font-bold hover:underline"
            >
              S'inscrire gratuitement
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;