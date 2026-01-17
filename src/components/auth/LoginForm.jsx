import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
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
    email: '',
    password: '',
    remember: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Adresse email requise';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Adresse email invalide';
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
      // 🔥 BACK-END COMPATIBLE
      const response = await login({
        email: formData.email,
        password: formData.password,
      });

      if (onSuccess) {
        onSuccess();
      } else if (redirectTo) {
        navigate(redirectTo);
      } else {
        const userType = response?.data?.user?.userType;
        if (userType === 'producer') {
          navigate('/dashboard/producteur');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      setError(err.message || 'Email ou mot de passe incorrect');
    } finally {
      setLoading(false);
    }
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
        {/* Email */}
        <Input
          label="Adresse email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="exemple@email.com"
          icon={<Mail />}
          error={errors.email}
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

        {/* Submit */}
        <Button
          fullWidth
          size="lg"
          loading={loading}
          onClick={handleSubmit}
          icon={<LogIn className="w-5 h-5" />}
        >
          {loading ? 'Connexion...' : 'Se connecter'}
        </Button>

        {/* Sign Up */}
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
