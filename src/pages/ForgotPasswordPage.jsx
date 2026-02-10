import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!email) {
      setError('Adresse email requise');
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Adresse email invalide');
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
      // Appel API pour envoyer l'email de réinitialisation
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Une erreur est survenue');
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Impossible d\'envoyer l\'email de réinitialisation');
    } finally {
      setLoading(false);
    }
  };

  // Affichage du message de succès
  if (success) {
    return (
      <div>
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Email envoyé !
          </h2>
          <p className="text-gray-600">
            Vérifiez votre boîte de réception
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <p className="text-sm text-green-800 mb-4">
            Nous avons envoyé un lien de réinitialisation à <strong>{email}</strong>
          </p>
          <p className="text-sm text-green-700">
            Cliquez sur le lien dans l'email pour créer un nouveau mot de passe.
            Ce lien expirera dans <strong>24 heures</strong>.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600 mb-2">
            <strong>Vous ne voyez pas l'email ?</strong>
          </p>
          <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
            <li>Vérifiez vos spams ou courriers indésirables</li>
            <li>Assurez-vous d'avoir entré la bonne adresse email</li>
            <li>Attendez quelques minutes, l'email peut prendre du temps</li>
          </ul>
        </div>

        <button
          onClick={() => setSuccess(false)}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors mb-4"
        >
          Renvoyer l'email
        </button>

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

  // Formulaire de demande
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Mot de passe oublié ?
        </h2>
        <p className="text-gray-600">
          Pas de soucis, nous allons vous aider à le réinitialiser
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
          <p className="text-sm text-blue-800">
            Entrez l'adresse email associée à votre compte et nous vous enverrons
            un lien pour réinitialiser votre mot de passe.
          </p>
        </div>

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
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="exemple@email.com"
              autoFocus
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Envoi en cours...' : 'Envoyer le lien de réinitialisation'}
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

      {/* Inscription */}
      <p className="mt-6 text-center text-sm text-gray-600">
        Vous n'avez pas de compte ?{' '}
        <Link to="/inscription" className="text-green-600 font-semibold hover:text-green-700">
          Inscrivez-vous
        </Link>
      </p>
    </div>
  );
};

export default ForgotPasswordPage;