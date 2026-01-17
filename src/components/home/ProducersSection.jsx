import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, ArrowRight, Award, TrendingUp } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

const ProducersSection = () => {
  const producers = [
    {
      id: 1,
      name: 'Ferme Bio du Gabon',
      image: '👨‍🌾',
      location: 'Libreville',
      specialty: 'Maraîchage Bio',
      rating: 4.9,
      reviews: 156,
      productsCount: 45,
      badge: 'Top Producteur',
      description: 'Spécialisé dans la culture biologique de légumes frais',
    },
    {
      id: 2,
      name: 'Élevage Traditionnel',
      image: '🚜',
      location: 'Franceville',
      specialty: 'Élevage de volailles',
      rating: 4.8,
      reviews: 98,
      productsCount: 23,
      badge: 'Certifié Bio',
      description: 'Poulets et œufs fermiers de qualité supérieure',
    },
    {
      id: 3,
      name: 'Jardin Tropical',
      image: '👩‍🌾',
      location: 'Port-Gentil',
      specialty: 'Fruits tropicaux',
      rating: 4.7,
      reviews: 124,
      productsCount: 38,
      description: 'Fruits frais et exotiques cultivés avec passion',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Nos <span className="text-green-600">Producteurs</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Rencontrez les agriculteurs et éleveurs locaux qui cultivent 
            vos produits avec passion et savoir-faire
          </p>
        </div>

        {/* Producers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {producers.map((producer) => (
            <Card 
              key={producer.id} 
              hover 
              padding="none"
              className="overflow-hidden group"
            >
              {/* Header with Image */}
              <div className="bg-gradient-to-br from-green-100 to-green-200 p-8 relative">
                {/* Badge */}
                {producer.badge && (
                  <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    {producer.badge}
                  </div>
                )}
                
                {/* Producer Image */}
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto text-5xl shadow-lg group-hover:scale-110 transition-transform">
                  {producer.image}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Name */}
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {producer.name}
                </h3>

                {/* Location */}
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{producer.location}</span>
                </div>

                {/* Specialty */}
                <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                  {producer.specialty}
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4">
                  {producer.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-bold text-gray-800">{producer.rating}</span>
                    </div>
                    <p className="text-xs text-gray-600">{producer.reviews} avis</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="font-bold text-gray-800">{producer.productsCount}</span>
                    </div>
                    <p className="text-xs text-gray-600">Produits</p>
                  </div>
                </div>

                {/* CTA Button */}
                <Link to={`/producers/${producer.id}`}>
                  <Button 
                    fullWidth 
                    variant="outline"
                    icon={<ArrowRight className="w-4 h-4" />}
                    iconPosition="right"
                  >
                    Voir le profil
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-3xl p-8 md:p-12 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Vous êtes producteur ?
            </h3>
            <p className="text-green-100 mb-8 text-lg">
              Rejoignez notre plateforme et vendez vos produits directement 
              aux consommateurs gabonais
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/devenir-producteur">
                <Button 
                  size="lg"
                  className="bg-white text-green-800 hover:bg-green-50"
                >
                  Devenir producteur
                </Button>
              </Link>
              <Link to="/contact">
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-green-800"
                >
                  Nous contacter
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🎯</span>
            </div>
            <h4 className="font-bold text-gray-800 mb-2">Visibilité</h4>
            <p className="text-gray-600 text-sm">
              Touchez des milliers de clients
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">💰</span>
            </div>
            <h4 className="font-bold text-gray-800 mb-2">Revenus</h4>
            <p className="text-gray-600 text-sm">
              Meilleurs prix garantis
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📱</span>
            </div>
            <h4 className="font-bold text-gray-800 mb-2">Simplicité</h4>
            <p className="text-gray-600 text-sm">
              Gestion facile en ligne
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🤝</span>
            </div>
            <h4 className="font-bold text-gray-800 mb-2">Support</h4>
            <p className="text-gray-600 text-sm">
              Accompagnement personnalisé
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProducersSection;