import React from 'react';
import { Target, Users, Heart, TrendingUp } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-green-600 text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            À propos d'Agrolink Gabon
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Notre mission est de connecter les producteurs locaux aux consommateurs pour une agriculture durable
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Notre Mission</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Agrolink Gabon est une plateforme innovante qui vise à révolutionner l'agriculture locale en connectant directement les producteurs gabonais aux consommateurs.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Nous croyons en une agriculture durable, en la valorisation du travail de nos agriculteurs et en l'accès à des produits frais et de qualité pour tous.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-bold text-2xl mb-2">500+</h3>
              <p className="text-gray-600">Producteurs</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-bold text-2xl mb-2">10K+</h3>
              <p className="text-gray-600">Clients satisfaits</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-bold text-2xl mb-2">50K+</h3>
              <p className="text-gray-600">Commandes livrées</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-bold text-2xl mb-2">100%</h3>
              <p className="text-gray-600">Local</p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Valeurs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="font-bold text-xl mb-3">Qualité</h3>
              <p className="text-gray-600">
                Nous garantissons des produits frais et de qualité, cultivés localement avec soin.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="font-bold text-xl mb-3">Communauté</h3>
              <p className="text-gray-600">
                Nous soutenons les producteurs locaux et créons des liens entre agriculteurs et consommateurs.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="font-bold text-xl mb-3">Durabilité</h3>
              <p className="text-gray-600">
                Nous promouvons une agriculture responsable et respectueuse de l'environnement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
