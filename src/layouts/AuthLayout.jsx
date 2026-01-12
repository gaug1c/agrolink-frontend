import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4 py-8">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
        {/* Section gauche - Branding */}
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
            <div className="flex items-start space-x-3">
              <div className="bg-green-600 text-white rounded-full p-2 mt-1">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Produits 100% locaux</h3>
                <p className="text-gray-600">Directement de nos producteurs gabonais</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-green-600 text-white rounded-full p-2 mt-1">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Livraison rapide</h3>
                <p className="text-gray-600">Recevez vos commandes à domicile</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-green-600 text-white rounded-full p-2 mt-1">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Paiement sécurisé</h3>
                <p className="text-gray-600">Transactions 100% sécurisées</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section droite - Formulaire */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Logo mobile */}
          <div className="md:hidden text-center mb-6">
            <Link to="/" className="inline-flex items-center space-x-2">
              <ShoppingBag className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-green-800">Agrolink</span>
            </Link>
          </div>

          {/* Contenu dynamique (Login ou Register) */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;