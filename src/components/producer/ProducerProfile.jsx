import React, { useState } from 'react';
import { MapPin, Phone, Mail, Star, Award, Calendar, Package, Users } from 'lucide-react';
import ProductCard from '../products/ProductCard';
import Button from '../common/Button';

const ProducerProfile = ({ producer, products = [] }) => {
  const [activeTab, setActiveTab] = useState('products');

  const tabs = [
    { id: 'products', label: 'Produits', count: products.length },
    { id: 'about', label: 'À propos' },
    { id: 'reviews', label: 'Avis', count: producer.reviewsCount },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-3xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 md:p-12">
          {/* Producer Info */}
          <div className="lg:col-span-2 text-white">
            <div className="flex items-start gap-6 mb-6">
              <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center text-6xl shadow-xl flex-shrink-0">
                {producer.image}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold">
                    {producer.name}
                  </h1>
                  {producer.verified && (
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  )}
                </div>
                <p className="text-green-200 text-lg mb-4">{producer.specialty}</p>
                
                {producer.badge && (
                  <div className="inline-flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-full font-bold">
                    <Award className="w-4 h-4" />
                    {producer.badge}
                  </div>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5" />
                <span>{producer.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5" />
                <span>{producer.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                <span>{producer.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5" />
                <span>Membre depuis {producer.memberSince}</span>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6">
            <h3 className="text-white font-bold text-lg mb-4">Statistiques</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-white">Note moyenne</span>
                </div>
                <span className="text-2xl font-bold text-white">{producer.rating}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-green-300" />
                  <span className="text-white">Produits</span>
                </div>
                <span className="text-2xl font-bold text-white">{producer.productsCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-300" />
                  <span className="text-white">Clients</span>
                </div>
                <span className="text-2xl font-bold text-white">{producer.customersCount}+</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Tab Headers */}
        <div className="border-b border-gray-200">
          <div className="flex gap-8 px-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  py-4 font-semibold transition relative
                  ${activeTab === tab.id
                    ? 'text-green-600'
                    : 'text-gray-500 hover:text-gray-700'
                  }
                `}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span className="ml-2 text-sm">({tab.count})</span>
                )}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-8">
          {/* Products Tab */}
          {activeTab === 'products' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Produits de {producer.name}
                </h2>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="all">Tous les produits</option>
                  <option value="vegetables">Légumes</option>
                  <option value="fruits">Fruits</option>
                  <option value="meat">Viandes</option>
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map(product => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </div>
          )}

          {/* About Tab */}
          {activeTab === 'about' && (
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                À propos de {producer.name}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {producer.description || 'Producteur passionné par une agriculture de qualité.'}
              </p>

              <h3 className="text-xl font-bold text-gray-800 mb-4">Notre engagement</h3>
              <ul className="space-y-3 mb-6">
                {(producer.commitments || [
                  'Production 100% locale',
                  'Agriculture biologique',
                  'Respect de l\'environnement',
                  'Fraîcheur garantie'
                ]).map((commitment, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-green-600 rounded-full" />
                    </div>
                    <span className="text-gray-700">{commitment}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-bold text-gray-800 mb-4">Certifications</h3>
              <div className="flex flex-wrap gap-4">
                {(producer.certifications || ['Bio', 'Label Rouge', 'AOP']).map((cert, index) => (
                  <div key={index} className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg">
                    <span className="font-semibold text-green-700">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Avis sur {producer.name}
              </h2>
              <div className="space-y-4">
                {(producer.reviews || []).map((review, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-gray-800">{review.userName}</h4>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-3xl p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-4">Une question ?</h3>
        <p className="mb-6">Contactez directement {producer.name}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-white text-green-800 hover:bg-gray-100">
            Envoyer un message
          </Button>
          <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-green-800">
            Appeler
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProducerProfile;