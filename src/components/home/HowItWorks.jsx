import React from 'react';
import { Search, ShoppingCart, Truck, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <Search className="w-8 h-8" />,
      title: 'Parcourez',
      description: 'Découvrez notre sélection de produits frais et locaux',
      color: 'from-blue-500 to-blue-600',
      emoji: '🔍',
    },
    {
      id: 2,
      icon: <ShoppingCart className="w-8 h-8" />,
      title: 'Commandez',
      description: 'Ajoutez vos produits préférés au panier et validez',
      color: 'from-green-500 to-green-600',
      emoji: '🛒',
    },
    {
      id: 3,
      icon: <Truck className="w-8 h-8" />,
      title: 'Recevez',
      description: 'Livraison rapide à votre domicile en 24-48h',
      color: 'from-orange-500 to-orange-600',
      emoji: '🚚',
    },
    {
      id: 4,
      icon: <CheckCircle className="w-8 h-8" />,
      title: 'Dégustez',
      description: 'Savourez des produits frais et de qualité',
      color: 'from-purple-500 to-purple-600',
      emoji: '😋',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-200 rounded-full opacity-10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full opacity-10 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Comment <span className="text-green-600">ça marche ?</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Commander vos produits locaux n'a jamais été aussi simple. 
            Suivez ces 4 étapes faciles
          </p>
        </div>

        {/* Steps Grid - Desktop */}
        <div className="hidden md:grid md:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="absolute top-16 left-1/2 w-full h-1 bg-gradient-to-r from-green-200 to-green-300 transform translate-y-1/2 hidden lg:block">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                    <div className="w-3 h-3 bg-green-400 rounded-full" />
                  </div>
                </div>
              )}

              {/* Step Card */}
              <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                {/* Number Badge */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {step.id}
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-white mb-4 mx-auto`}>
                  {step.icon}
                </div>

                {/* Emoji */}
                <div className="text-5xl text-center mb-4">
                  {step.emoji}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm text-center">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Steps List - Mobile */}
        <div className="md:hidden space-y-6 mb-12">
          {steps.map((step) => (
            <div key={step.id} className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-start gap-4">
                {/* Number */}
                <div className={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0`}>
                  {step.id}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-800">
                      {step.title}
                    </h3>
                    <span className="text-3xl">{step.emoji}</span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-md text-center">
            <div className="text-5xl mb-4">⚡</div>
            <h4 className="font-bold text-lg mb-2 text-gray-800">Rapide</h4>
            <p className="text-gray-600 text-sm">
              Commandez en quelques clics et recevez rapidement
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md text-center">
            <div className="text-5xl mb-4">🔒</div>
            <h4 className="font-bold text-lg mb-2 text-gray-800">Sécurisé</h4>
            <p className="text-gray-600 text-sm">
              Paiement sécurisé et protection de vos données
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md text-center">
            <div className="text-5xl mb-4">💚</div>
            <h4 className="font-bold text-lg mb-2 text-gray-800">Local</h4>
            <p className="text-gray-600 text-sm">
              Soutenez l'économie locale et les producteurs gabonais
            </p>
          </div>
        </div>

        {/* Video Section */}
        <div className="mt-16 bg-gradient-to-r from-green-600 to-green-800 rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <h3 className="text-3xl font-bold mb-4">
                Découvrez Agrolink en vidéo
              </h3>
              <p className="text-green-100 mb-6">
                Regardez notre tutoriel pour découvrir comment utiliser 
                la plateforme et commander vos produits préférés en toute simplicité.
              </p>
              <button className="bg-white text-green-800 hover:bg-green-50 font-bold py-3 px-8 rounded-lg transition flex items-center gap-2">
                <span>▶</span>
                Regarder la vidéo
              </button>
            </div>

            <div className="bg-green-700 bg-opacity-30 backdrop-blur-sm rounded-2xl p-8 text-center">
              <div className="text-9xl mb-4">📹</div>
              <p className="text-white font-semibold">
                Tutoriel vidéo disponible bientôt
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;