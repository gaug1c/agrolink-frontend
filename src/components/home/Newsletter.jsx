import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import Button from '../common/Button';
import Alert from '../common/Alert';

const Newsletter = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    adresse: '',
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulation d'envoi
    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
      setFormData({ nom: '', email: '', adresse: '' });

      // Masquer le message après 5 secondes
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-green-600 via-green-700 to-green-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px'
          }}
        />
      </div>

      {/* Decorative Lemons */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:flex items-center justify-end pr-12 pointer-events-none">
        <div className="relative">
          <div className="text-9xl opacity-90 animate-float">🍋</div>
          <div className="absolute -top-20 -left-20 text-7xl opacity-70 animate-float" style={{ animationDelay: '1s' }}>🍋</div>
          <div className="absolute -bottom-20 -right-10 text-6xl opacity-60 animate-float" style={{ animationDelay: '2s' }}>🍋</div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Mail className="w-4 h-4" />
              <span className="text-sm font-semibold">Newsletter</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Rejoignez notre liste de diffusion
            </h2>
            
            <p className="text-green-100 text-lg mb-8">
              Soyez parmi les premiers informés de nos produits et services. 
              Nous vous les livrerons directement dans vos boutiques.
            </p>

            {/* Benefits */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Offres exclusives</h4>
                  <p className="text-green-100 text-sm">
                    Recevez des promotions réservées aux abonnés
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Nouveaux produits</h4>
                  <p className="text-green-100 text-sm">
                    Soyez informé en avant-première des nouveautés
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Conseils & astuces</h4>
                  <p className="text-green-100 text-sm">
                    Des recettes et conseils pour mieux consommer
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Form */}
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-8 border border-white border-opacity-20">
            {showSuccess ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Merci de votre inscription !
                </h3>
                <p className="text-green-100">
                  Vous recevrez bientôt nos dernières actualités dans votre boîte mail.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Name Input */}
                <div>
                  <label className="block text-white font-medium mb-2 text-sm">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                    required
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-white font-medium mb-2 text-sm">
                    Adresse email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="exemple@email.com"
                    className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                    required
                  />
                </div>

                {/* Address Input */}
                <div>
                  <label className="block text-white font-medium mb-2 text-sm">
                    Adresse (optionnel)
                  </label>
                  <input
                    type="text"
                    name="adresse"
                    value={formData.adresse}
                    onChange={handleChange}
                    placeholder="Votre adresse"
                    className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  fullWidth
                  size="lg"
                  loading={loading}
                  onClick={handleSubmit}
                  className="bg-green-900 hover:bg-green-950 text-white"
                >
                  {loading ? 'Inscription en cours...' : 'Soumettre'}
                </Button>

                {/* Privacy Notice */}
                <p className="text-green-100 text-xs text-center mt-4">
                  En vous inscrivant, vous acceptez de recevoir nos emails. 
                  Vous pouvez vous désabonner à tout moment.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 bg-white bg-opacity-10 backdrop-blur-sm rounded-full px-6 py-3">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 bg-green-400 rounded-full border-2 border-white flex items-center justify-center text-lg">
                👨
              </div>
              <div className="w-10 h-10 bg-green-500 rounded-full border-2 border-white flex items-center justify-center text-lg">
                👩
              </div>
              <div className="w-10 h-10 bg-green-600 rounded-full border-2 border-white flex items-center justify-center text-lg">
                👨
              </div>
              <div className="w-10 h-10 bg-green-700 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-sm">
                +1K
              </div>
            </div>
            <div className="text-left">
              <p className="text-white font-bold text-sm">Plus de 1000 abonnés</p>
              <p className="text-green-200 text-xs">nous font déjà confiance</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Newsletter;