import React from 'react';

const PartnersSection = () => {
  const partners = [
    { id: 1, name: 'Organic Farm', logo: '🌱', color: 'from-green-400 to-green-600' },
    { id: 2, name: 'Vegan Food', logo: '🥗', color: 'from-emerald-400 to-emerald-600' },
    { id: 3, name: 'Farm Fresh', logo: '🌾', color: 'from-yellow-400 to-yellow-600' },
    { id: 4, name: 'Bio Products', logo: '🍃', color: 'from-lime-400 to-lime-600' },
    { id: 5, name: 'Organic Food', logo: '🌿', color: 'from-green-500 to-green-700' },
    { id: 6, name: 'Nature', logo: '🍀', color: 'from-teal-400 to-teal-600' },
    { id: 7, name: 'Fresh Market', logo: '🥬', color: 'from-green-400 to-green-500' },
    { id: 8, name: 'Eco Farm', logo: '♻️', color: 'from-cyan-400 to-cyan-600' },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Nos <span className="text-green-600">Partenaires</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Ils nous font confiance et travaillent avec nous pour promouvoir 
            une agriculture durable au Gabon
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 mb-12">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <div className="flex flex-col items-center justify-center h-full">
                {/* Logo with gradient background */}
                <div className={`w-20 h-20 bg-gradient-to-br ${partner.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <span className="text-4xl">{partner.logo}</span>
                </div>
                
                {/* Partner Name */}
                <h3 className="font-bold text-gray-800 text-center group-hover:text-green-600 transition">
                  {partner.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">
                50+
              </div>
              <p className="text-gray-700 font-medium">Partenaires</p>
            </div>

            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">
                200+
              </div>
              <p className="text-gray-700 font-medium">Producteurs</p>
            </div>

            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">
                5000+
              </div>
              <p className="text-gray-700 font-medium">Clients</p>
            </div>

            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">
                98%
              </div>
              <p className="text-gray-700 font-medium">Satisfaction</p>
            </div>
          </div>
        </div>

        {/* Partnership CTA */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Devenez partenaire
            </h3>
            <p className="text-gray-600 mb-6">
              Rejoignez notre réseau de partenaires et participez au développement 
              de l'agriculture gabonaise
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition">
              Nous contacter
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;