import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ShoppingBag, Check } from 'lucide-react';

const AuthLayout = () => {
  const features = [
    {
      title: 'Produits 100% locaux',
      description: 'Directement de nos producteurs gabonais'
    },
    {
      title: 'Livraison rapide',
      description: 'Recevez vos commandes à domicile'
    },
    {
      title: 'Paiement sécurisé',
      description: 'Transactions 100% sécurisées'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4 py-8">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
        {/* Left section - Branding */}
        <div className="hidden md:block">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <ShoppingBag className="h-10 w-10 text-green-600" />
            <span className="text-3xl font-bold text-green-800">Agrolink Gabon</span>
          </Link>
          
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Connectons les producteurs aux consommateurs
          </h2>
          
          <p className="text-lg text-gray-600 mb-6">
            Découvrez des produits frais et locaux directement de nos agriculteurs gabonais. 
            Soutenez l'agriculture locale tout en profitant de produits de qualité.
          </p>
          
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="bg-green-600 text-white rounded-full p-2 mt-1 flex-shrink-0">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right section - Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Mobile logo */}
          <div className="md:hidden text-center mb-6">
            <Link to="/" className="inline-flex items-center space-x-2">
              <ShoppingBag className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-green-800">Agrolink</span>
            </Link>
          </div>

          {/* Dynamic content (Login or Register) */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;