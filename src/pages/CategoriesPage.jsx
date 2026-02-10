import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categoryService } from '../services/api/categoryService';
import { Loader2, Package } from 'lucide-react';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryService.getAllCategories();
      setCategories(data || []);
    } catch (err) {
      console.error('Erreur lors du chargement des catégories:', err);
      setError('Impossible de charger les catégories');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-green-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Chargement des catégories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Erreur</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={loadCategories}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Toutes nos catégories
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez notre large gamme de produits agricoles locaux
          </p>
        </div>

        {/* Categories Grid */}
        {categories.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Aucune catégorie disponible
            </h3>
            <p className="text-gray-500">
              Les catégories seront bientôt disponibles
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-green-100 to-green-200">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.nom || category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="h-20 w-20 text-green-600" />
                    </div>
                  )}
                  
                  {/* Badge du nombre de produits */}
                  {category.productsCount > 0 && (
                    <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 shadow-md">
                      <span className="text-sm font-semibold text-green-600">
                        {category.productsCount} produit{category.productsCount > 1 ? 's' : ''}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    {category.nom || category.name}
                  </h3>
                  
                  {category.description && (
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                      {category.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-sm text-green-600 font-medium group-hover:underline">
                      Voir les produits
                    </span>
                    <svg
                      className="w-5 h-5 text-green-600 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;