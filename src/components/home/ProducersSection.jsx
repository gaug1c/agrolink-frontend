import React from 'react';
import { MapPin, Star, ArrowRight, Award, TrendingUp } from 'lucide-react';

const ProducersSection = () => {
  const producers = [
    {
      id: 1,
      name: 'Ferme Bio du Gabon',
      image: 'https://www.lsi-africa.com/miniature/gabon-interdiction-poulet-importation-5805-1306871.jpg',
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
      image: 'https://afrique.yearbook-media.com/wp-content/uploads/2024/03/vache-brune-mangeant-herbe-small.jpg',
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
      name: 'Famille MENGUE & YASSIMA',
      image: 'https://www.agenceafrique.com/wp-content/uploads/2014/12/gabon-programme-graine.jpg',
      location: 'Mouila',
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
            Rencontrez les agriculteurs et éleveurs locaux qui cultivent vos produits avec passion et savoir-faire
          </p>
        </div>

        {/* Producers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {producers.map((producer) => (
            <div key={producer.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-2">
              {/* Image plein fond */}
              <div className="relative w-full h-64 overflow-hidden">
                <img
                  src={producer.image}
                  alt={producer.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Badge */}
                {producer.badge && (
                  <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    {producer.badge}
                  </div>
                )}
              </div>

              {/* Contenu */}
              <div className="p-6">
                {/* Name */}
                <h3 className="text-xl font-bold text-gray-800 mb-2">{producer.name}</h3>

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
                <p className="text-gray-600 text-sm mb-4">{producer.description}</p>

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
                <button className="w-full bg-white border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
                  Voir le profil
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-900 rounded-3xl overflow-hidden shadow-2xl">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 md:p-12">
            {/* Left Content */}
            <div className="text-white">
              <div className="inline-block bg-yellow-400 text-green-900 px-4 py-2 rounded-full text-sm font-bold mb-6">
                🌟 Opportunité exclusive
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Vous êtes producteur ?
              </h3>
              
              <p className="text-green-100 mb-6 text-lg leading-relaxed">
                Rejoignez la première plateforme gabonaise de vente directe et développez votre activité agricole. 
                Plus de <span className="font-bold text-white">5000+ clients</span> actifs vous attendent !
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Inscription gratuite</h4>
                    <p className="text-green-100 text-sm">Aucun frais d'adhésion, commencez dès aujourd'hui</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Commission avantageuse</h4>
                    <p className="text-green-100 text-sm">Seulement 10% de commission sur vos ventes</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Paiement sécurisé</h4>
                    <p className="text-green-100 text-sm">Virement direct sous 7 jours après livraison</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Support dédié</h4>
                    <p className="text-green-100 text-sm">Équipe disponible pour vous accompagner 7j/7</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-green-800 hover:bg-green-50 shadow-lg hover:shadow-xl transition-all hover:scale-105 font-bold py-3 px-8 rounded-lg text-lg">
                  Devenir producteur
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-green-800 transition-all font-bold py-3 px-8 rounded-lg text-lg">
                  Nous contacter
                </button>
              </div>
            </div>

            {/* Right Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-5xl font-bold text-white mb-2">150+</div>
                <p className="text-green-100">Producteurs actifs</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-5xl font-bold text-white mb-2">5K+</div>
                <p className="text-green-100">Clients satisfaits</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-5xl font-bold text-white mb-2">98%</div>
                <p className="text-green-100">Taux de satisfaction</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-5xl font-bold text-white mb-2">24h</div>
                <p className="text-green-100">Temps de réponse</p>
              </div>

              {/* Testimonial */}
              <div className="col-span-2 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-3">
                  <img 
                    src="https://tse1.mm.bing.net/th/id/OIP.DD1U_EyajocKOV6hWupXGAHaE8?pid=Api&P=0&h=180" 
                    alt="Producteur"
                    className="w-12 h-12 rounded-full border-2 border-white"
                  />
                  <div>
                    <div className="font-semibold text-white">Paul MBA</div>
                    <div className="text-green-100 text-sm">Producteur à Libreville</div>
                  </div>
                </div>
                <p className="text-green-50 text-sm italic">
                  "Agrolink a transformé mon activité ! Mes ventes ont augmenté de 300% en 6 mois."
                </p>
                <div className="flex gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProducersSection;