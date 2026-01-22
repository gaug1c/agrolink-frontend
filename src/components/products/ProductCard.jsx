import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react';

const ProductCard = ({
  id,
  image,
  title,
  category,
  price,
  oldPrice,
  rating,
  reviews,
  badge,
  inStock = true,
  onAddToCart,
  onToggleFavorite,
  isFavorite = false,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAddingToCart(true);

    if (onAddToCart) {
      await onAddToCart(id);
    }

    setTimeout(() => {
      setAddingToCart(false);
    }, 1000);
  };

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(id);
    }
  };

  const discount = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

  return (
    <Link to={`/products/${id}`}>
      <div
        className={`
          bg-white rounded-2xl shadow-md hover:shadow-2xl
          transition-all duration-300 overflow-hidden
          group cursor-pointer
          ${!inStock ? 'opacity-75' : ''}
          ${className}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative h-56 bg-gradient-to-br from-green-100 to-green-200 overflow-hidden">
          {/* Product Image */}
          <div className="absolute inset-0 flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-300">
            {image}
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {badge && (
              <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                {badge}
              </div>
            )}
            {discount > 0 && (
              <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                -{discount}%
              </div>
            )}
            {!inStock && (
              <div className="bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                Rupture
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {/* Favorite Button */}
            <button
              onClick={handleToggleFavorite}
              className={`
                w-10 h-10 rounded-full flex items-center justify-center
                transition-all duration-300 backdrop-blur-sm
                ${isFavorite 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white bg-opacity-90 text-gray-600 hover:bg-red-500 hover:text-white'
                }
              `}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>

            {/* Quick View Button */}
            <button
              className={`
                w-10 h-10 bg-white bg-opacity-90 rounded-full
                flex items-center justify-center text-gray-600
                hover:bg-green-500 hover:text-white
                transition-all duration-300 backdrop-blur-sm
                ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
              `}
            >
              <Eye className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Add to Cart (on hover) */}
          {inStock && (
            <div
              className={`
                absolute bottom-0 left-0 right-0 p-3
                transition-all duration-300
                ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}
              `}
            >
              <button
                onClick={handleAddToCart}
                disabled={addingToCart}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {addingToCart ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Ajout...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    Ajouter
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category */}
          {category && (
            <span className="inline-block text-xs text-green-600 font-semibold mb-2 uppercase">
              {category}
            </span>
          )}

          {/* Title */}
          <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-green-600 transition">
            {title}
          </h3>

          {/* Rating */}
          {rating && (
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">
                {rating} {reviews && `(${reviews})`}
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-2xl font-bold text-green-600">
              {price.toLocaleString()} FCFA
            </span>
            {oldPrice && (
              <span className="text-sm text-gray-400 line-through">
                {oldPrice.toLocaleString()} FCFA
              </span>
            )}
          </div>

          {/* Add to Cart Button - Mobile */}
          {inStock && (
            <button
              onClick={handleAddToCart}
              disabled={addingToCart}
              className="w-full md:hidden bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {addingToCart ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Ajout...
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  Ajouter au panier
                </>
              )}
            </button>
          )}

          {/* Out of Stock Button */}
          {!inStock && (
            <button
              disabled
              className="w-full bg-gray-300 text-gray-600 font-semibold py-2 rounded-lg cursor-not-allowed"
            >
              Rupture de stock
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;