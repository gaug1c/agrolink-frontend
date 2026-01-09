import React from 'react';
import { Star, MapPin, Package, Leaf, Award, TrendingUp } from 'lucide-react';

const ProductInfo = ({
  product = {},
  className = '',
}) => {
  const {
    title,
    category,
    price,
    oldPrice,
    rating,
    reviews,
    description,
    features = [],
    specifications = {},
    producer = {},
    badge,
    inStock = true,
    stockQuantity,
  } = product;

  const discount = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Category & Badge */}
      <div className="flex items-center gap-3">
        {category && (
          <span className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold">
            {category}
          </span>
        )}
        {badge && (
          <span className="inline-block bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
            <Award className="w-4 h-4" />
            {badge}
          </span>
        )}
      </div>

      {/* Title */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          {title}
        </h1>
        {producer.name && (
          <p className="text-gray-600">
            Vendu par{' '}
            <span className="text-green-600 font-semibold hover:underline cursor-pointer">
              {producer.name}
            </span>
          </p>
        )}
      </div>

      {/* Rating */}
      {rating && (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-gray-600">
            <span className="font-semibold text-gray-800">{rating}</span>
            {reviews && ` (${reviews} avis)`}
          </span>
        </div>
      )}

      {/* Price */}
      <div className="bg-gray-50 rounded-xl p-6">
        <div className="flex items-baseline gap-3 mb-2">
          <span className="text-4xl font-bold text-green-600">
            {price.toLocaleString()} FCFA
          </span>
          {oldPrice && (
            <span className="text-xl text-gray-400 line-through">
              {oldPrice.toLocaleString()} FCFA
            </span>
          )}
        </div>
        {discount > 0 && (
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
            <TrendingUp className="w-4 h-4" />
            Économisez {discount}% ({(oldPrice - price).toLocaleString()} FCFA)
          </div>
        )}
      </div>

      {/* Stock Status */}
      <div className="flex items-center gap-3">
        {inStock ? (
          <>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-700 font-semibold">
              En stock
              {stockQuantity && ` (${stockQuantity} disponibles)`}
            </span>
          </>
        ) : (
          <>
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-red-600 font-semibold">
              Rupture de stock
            </span>
          </>
        )}
      </div>

      {/* Description */}
      {description && (
        <div>
          <h3 className="font-bold text-lg mb-3 text-gray-800">Description</h3>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
      )}

      {/* Features */}
      {features.length > 0 && (
        <div>
          <h3 className="font-bold text-lg mb-3 text-gray-800">Caractéristiques</h3>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                </div>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Specifications */}
      {Object.keys(specifications).length > 0 && (
        <div>
          <h3 className="font-bold text-lg mb-3 text-gray-800">Spécifications</h3>
          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            {Object.entries(specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between border-b border-gray-200 pb-2 last:border-0 last:pb-0">
                <span className="text-gray-600 font-medium">{key}</span>
                <span className="text-gray-800 font-semibold">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Benefits */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <Package className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <p className="text-sm font-semibold text-gray-800">Livraison rapide</p>
          <p className="text-xs text-gray-600">24-48h</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4 text-center">
          <Leaf className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <p className="text-sm font-semibold text-gray-800">100% Local</p>
          <p className="text-xs text-gray-600">Produit du Gabon</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-4 text-center">
          <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <p className="text-sm font-semibold text-gray-800">Qualité garantie</p>
          <p className="text-xs text-gray-600">Ou remboursé</p>
        </div>
      </div>

      {/* Producer Info */}
      {producer.name && (
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
          <h3 className="font-bold text-lg mb-4 text-gray-800">
            À propos du producteur
          </h3>
          <div className="flex items-start gap-4">
            {producer.image && (
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl shadow-lg flex-shrink-0">
                {producer.image}
              </div>
            )}
            <div className="flex-1">
              <h4 className="font-bold text-lg text-gray-800 mb-1">
                {producer.name}
              </h4>
              {producer.location && (
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{producer.location}</span>
                </div>
              )}
              {producer.rating && (
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold">{producer.rating}</span>
                </div>
              )}
              {producer.description && (
                <p className="text-gray-700 text-sm">{producer.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductInfo;