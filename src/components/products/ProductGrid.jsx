import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { Skeleton } from '../common/Loader';
import { Grid, List, SlidersHorizontal } from 'lucide-react';

const ProductGrid = ({
  products = [],
  loading = false,
  onAddToCart,
  onToggleFavorite,
  favorites = [],
  showFilters = true,
  className = '',
}) => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('popular');

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name':
        return a.title.localeCompare(b.title);
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      default: // popular
        return 0;
    }
  });

  if (loading) {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden">
            <Skeleton height="56" rounded="none" />
            <div className="p-4 space-y-3">
              <Skeleton width="1/2" height="3" />
              <Skeleton width="full" height="4" />
              <Skeleton width="3/4" height="3" />
              <div className="flex gap-2">
                <Skeleton width="1/3" height="6" />
                <Skeleton width="1/4" height="6" />
              </div>
              <Skeleton width="full" height="10" rounded="lg" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Aucun produit trouvé
        </h3>
        <p className="text-gray-600">
          Essayez de modifier vos critères de recherche ou filtres
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Toolbar */}
      {showFilters && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          {/* Results count */}
          <div className="text-gray-600">
            <span className="font-semibold text-gray-800">{products.length}</span> produits trouvés
          </div>

          <div className="flex items-center gap-4">
            {/* Sort */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              >
                <option value="popular">Populaire</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="name">Nom A-Z</option>
                <option value="rating">Meilleures notes</option>
              </select>
            </div>

            {/* View Mode */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
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
        </div>
      )}

      {/* Products Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={onAddToCart}
              onToggleFavorite={onToggleFavorite}
              isFavorite={favorites.includes(product.id)}
            />
          ))}
        </div>
      ) : (
        /* Products List */
        <div className="space-y-4">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row">
                {/* Image */}
                <div className="w-full sm:w-48 h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center flex-shrink-0">
                  <span className="text-6xl">{product.image}</span>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    {product.category && (
                      <span className="inline-block text-xs text-green-600 font-semibold mb-2 uppercase">
                        {product.category}
                      </span>
                    )}
                    <h3 className="font-bold text-xl text-gray-800 mb-2">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                  </div>

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
                    <button
                      onClick={() => onAddToCart && onAddToCart(product.id)}
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition"
                    >
                      Ajouter au panier
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;