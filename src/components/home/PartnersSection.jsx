import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

const PartnersSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const partners = [
    {
      id: 1,
      name: 'Ministère Agriculture Gabon',
      logo: 'https://tse3.mm.bing.net/th/id/OIP.t-lQYozBLE6PVb-3TlDyWQHaHa?pid=Api&P=0&h=180',
      category: 'government',
      description: 'Partenaire institutionnel',
    },
    {
      id: 2,
      name: 'Banque Gabonaise',
      logo: 'https://tse1.mm.bing.net/th/id/OIP.mshK5_4VTwjtD7A_JQdbxwHaFj?pid=Api&P=0&h=180',
      category: 'finance',
      description: 'Partenaire financier',
    },
    {
      id: 3,
      name: 'Coopérative Agricole',
      logo: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=200&h=200&fit=crop',
      category: 'cooperative',
      description: 'Coopérative locale',
    },
    {
      id: 4,
      name: 'Transport Express',
      logo: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=200&h=200&fit=crop',
      category: 'logistics',
      description: 'Partenaire logistique',
    },
    {
      id: 5,
      name: 'Bio Certification',
      logo: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=200&h=200&fit=crop',
      category: 'certification',
      description: 'Certification qualité',
    },
    {
      id: 6,
      name: 'Tech Innovation',
      logo: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=200&h=200&fit=crop',
      category: 'technology',
      description: 'Partenaire technologique',
    },
    {
      id: 7,
      name: 'Agro Formation',
      logo: 'https://tse4.mm.bing.net/th/id/OIP.u8QHbIQCBbIHZHEdl9nOGgHaEr?pid=Api&P=0&h=180',
      category: 'education',
      description: 'Formation agricole',
    },
    {
      id: 8,
      name: 'Eco Packaging',
      logo: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=200&h=200&fit=crop',
      category: 'sustainability',
      description: 'Emballage durable',
    },
  ];

  const categories = [
    { id: 'all', label: 'Tous', icon: '🌐' },
    { id: 'government', label: 'Institutionnels', icon: '🏛️' },
    { id: 'finance', label: 'Financiers', icon: '💰' },
    { id: 'cooperative', label: 'Coopératives', icon: '🤝' },
    { id: 'logistics', label: 'Logistique', icon: '🚚' },
  ];

  const filteredPartners = activeCategory === 'all' 
    ? partners 
    : partners.filter(p => p.category === activeCategory);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-200 rounded-full opacity-10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full opacity-10 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
            🤝 Nos Collaborations
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Ils nous font <span className="text-green-600">confiance</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Ensemble, nous bâtissons un écosystème agricole durable et innovant au Gabon
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-green-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
          {filteredPartners.map((partner, index) => (
            <div
              key={partner.id}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col items-center text-center h-full">
                {/* Logo */}
                <div className="relative w-24 h-24 mb-4 overflow-hidden rounded-2xl shadow-md group-hover:shadow-xl transition-shadow">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-green-600/0 to-green-600/0 group-hover:from-green-600/20 group-hover:to-green-600/10 transition-all duration-500" />
                </div>

                {/* Name */}
                <h3 className="font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                  {partner.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-500 mb-3">{partner.description}</p>

                {/* Badge */}
                <div className="mt-auto">
                  <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                    <CheckCircle className="w-3 h-3" />
                    Certifié
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Partnership CTA */}
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 md:p-12">
            {/* Left Content */}
            <div>
              <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-bold mb-4">
                ⭐ Opportunité de partenariat
              </div>
              
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Devenez partenaire d'Agrolink
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Rejoignez notre réseau de partenaires et participez activement au développement 
                de l'agriculture durable au Gabon. Ensemble, créons un impact positif.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  'Visibilité auprès de milliers de clients',
                  'Collaboration sur des projets innovants',
                  'Accompagnement personnalisé',
                  'Réseau d\'experts agricoles',
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-xl transition-all hover:scale-105 shadow-lg">
                  Devenir partenaire
                </button>
                <button className="border-2 border-green-600 text-green-600 hover:bg-green-50 font-bold py-4 px-8 rounded-xl transition-all">
                  En savoir plus
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=600&fit=crop"
                alt="Partenariat"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent flex items-end p-8">
                <div className="text-white">
                  <p className="text-2xl font-bold mb-2">Construisons l'avenir ensemble</p>
                  <p className="text-green-100">Une agriculture durable pour le Gabon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;