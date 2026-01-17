import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Package } from 'lucide-react';

const ProducersPage = () => {
  const [producers] = useState([
    {
      id: '1',
      name: 'Ferme Bio Gabon',
      location: 'Libreville',
      description: 'Agriculture biologique depuis 2015',
      products: 45,
      rating: 4.8,
      image: 'https://ui-avatars.com/api/?name=Ferme+Bio&size=200&background=16a34a&color=fff'
    },
    {
      id: '2',
      name: 'Agro Plus',
      location: 'Port-Gentil',
      description: 'Spécialiste des légumes frais',
      products: 32,
      rating: 4.6,
      image: 'https://ui-avatars.com/api/?name=Agro+Plus&size=200&background=15803d&color=fff'
    },
    {
      id: '3',
      name: 'Tropical Fruits',
      location: 'Franceville',
      description: 'Fruits tropicaux de qualité',
      products: 28,
      rating: 4.9,
      image: 'https://ui-avatars.com/api/?name=Tropical+Fruits&size=200&background=22c55e&color=fff'
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Nos Producteurs</h1>
          <p className="text-gray-600">
            Découvrez les agriculteurs passionnés qui cultivent vos produits
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {producers.map(producer => (
            <Link
              key={producer.id}
              to={`/producers/${producer.id}`}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden"
            >
              <img
                src={producer.image}
                alt={producer.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">{producer.name}</h3>
                <p className="text-gray-600 mb-4">{producer.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{producer.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Package className="h-4 w-4" />
                    <span>{producer.products} produits</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProducersPage;