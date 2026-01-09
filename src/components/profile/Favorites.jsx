import React, { useState } from 'react';
import { Heart, Trash2, ShoppingCart, Grid, List } from 'lucide-react';
import ProductCard from '../products/ProductCard';
import Button from '../common/Button';

const Favorites = ({ favorites = [], onRemove, onAddToCart }) => {
  const [viewMode, setViewMode] = useState('grid');

  if (favorites.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart className="w-12 h-12 text-red-500" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Aucun favori
        </h3>
        <p className="text-gray-600 mb-6">
          Vous n'avez pas encore ajouté de produits à vos favoris
        </p>
        <Button>
          Découvrir les produits
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Mes Favoris</h2>
          <p className="text-gray-600">{favorites.length} produit{favorites.length > 1 ? 's' : ''}</p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded transition ${
              viewMode === 'grid'
                ? 'bg-white shadow text-green-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded transition ${
              viewMode === 'list'
                ? 'bg-white shadow text-green-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map(product => (
            <ProductCard
              key={product.id}
              {...product}
              isFavorite={true}
              onAddToCart={onAddToCart}
              onToggleFavorite={onRemove}
            />
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-4">
          {favorites.map(product => (
            <div
              key={product.id}
              className="flex gap-4 bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition"
            >
              {/* Image */}
              <div className="w-32 h-32 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center text-5xl flex-shrink-0">
                {product.image}
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 mb-1">
                      {product.title}
                    </h3>
                    {product.category && (
                      <span className="text-sm text-gray-600">{product.category}</span>
                    )}
                  </div>
                  <button
                    onClick={() => onRemove(product.id)}
                    className="p-2 hover:bg-red-100 text-red-500 rounded-lg transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                {product.rating && (
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < product.rating ? 'text-yellow-400' : 'text-gray-300'}>
                        ★
                      </span>
                    ))}
                    <span className="text-sm text-gray-600 ml-1">
                      ({product.reviews})
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-green-600">
                      {product.price.toLocaleString()} FCFA
                    </span>
                    {product.oldPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        {product.oldPrice.toLocaleString()} FCFA
                      </span>
                    )}
                  </div>
                  <Button
                    onClick={() => onAddToCart(product.id)}
                    icon={<ShoppingCart className="w-4 h-4" />}
                  >
                    Ajouter au panier
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;