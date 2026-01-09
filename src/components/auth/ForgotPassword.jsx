import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';
import Alert from '../common/Alert';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Veuillez entrer votre email');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email invalide');
      return;
    }

    setLoading(true);

    try {
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess(true);
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Email envoyé !
          </h2>
          
          <p className="text-gray-600 mb-6">
            Nous avons envoyé un lien de réinitialisation à{' '}
            <span className="font-semibold text-gray-800">{email}</span>
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Le lien est valable pendant 1 heure. 
              Vérifiez également votre dossier spam.
            </p>
          </div>

          <div className="space-y-3">
            <Link to="/connexion">
              <Button fullWidth variant="primary">
                Retour à la connexion
              </Button>
            </Link>
            
            <button
              onClick={() => {
                setSuccess(false);
                setEmail('');
              }}
              className="w-full text-gray-600 hover:text-gray-800 text-sm font-semibold"
            >
              Renvoyer l'email
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        {/* Back Button */}
        <Link 
          to="/connexion"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Retour</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Mot de passe oublié ?
          </h2>
          <p className="text-gray-600">
            Pas de problème. Entrez votre email et nous vous enverrons 
            un lien pour réinitialiser votre mot de passe.
          </p>
        </div>

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

        {/* Form */}
        <div className="space-y-6">
          <Input
            label="Adresse email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="exemple@email.com"
            icon={<Mail />}
            required
          />

          <Button
            fullWidth
            size="lg"
            loading={loading}
            onClick={handleSubmit}
          >
            {loading ? 'Envoi en cours...' : 'Envoyer le lien'}
          </Button>
        </div>

        {/* Help */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Vous vous souvenez de votre mot de passe ?{' '}
            <Link 
              to="/connexion" 
              className="text-green-600 hover:text-green-700 font-semibold hover:underline"
            >
              Se connecter
            </Link>
          </p>
        </div>
      </div>

      {/* Additional Help */}
      <div className="mt-6 bg-gray-50 rounded-xl p-6">
        <h3 className="font-bold text-gray-800 mb-3">Besoin d'aide ?</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">•</span>
            <span>Vérifiez que l'email est correct</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">•</span>
            <span>Consultez votre dossier spam</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">•</span>
            <span>
              Contactez-nous sur{' '}
              <a href="mailto:support@agrolink.ga" className="text-green-600 hover:underline">
                support@agrolink.ga
              </a>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ForgotPassword;