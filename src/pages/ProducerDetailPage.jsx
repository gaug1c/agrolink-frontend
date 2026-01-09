import React from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Phone, Mail, Star } from 'lucide-react';
import ProductCard from '../components/products/ProductCard';

const ProducerDetailPage = () => {
  const { id } = useParams();

  const producer = {
    id: id,
    name: 'Ferme Bio Gabon',
    location: 'Libreville',
    description: 'Nous sommes une ferme familiale pratiquant l\'agriculture biologique depuis 2015. Notre passion est de fournir des produits frais et sains à nos clients.',
    phone: '+241 XX XX XX XX',
    email: 'contact@fermebio.ga',
    rating: 4.8,
    image: 'https://ui-avatars.com/api/?name=Ferme+Bio&size=200&background=16a34a&color=fff'
  };

  const products = [
    {
      id: '1',
      name: 'Bananes Plantain',
      category: 'fruits',
      price: 1500,
      unit: 'kg',
      image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400'
    },
    {
      id: '3',
      name: 'Manioc',
      category: 'tubercules',
      price: 1000,
      unit: 'kg',
      image: 'https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?w=400'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        {/* Producer Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            <img
              src={producer.image}
              alt={producer.name}
              className="w-48 h-48 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{producer.name}</h1>
              <div className="flex items-center space-x-4 text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{producer.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{producer.rating}/5</span>
                </div>
              </div>
              <p className="text-gray-700 mb-6">{producer.description}</p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Phone className="h-5 w-5" />
                  <span>{producer.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail className="h-5 w-5" />
                  <span>{producer.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Produits de ce producteur</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProducerDetailPage;