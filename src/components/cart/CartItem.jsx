import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, Heart } from 'lucide-react';
import { CompactQuantitySelector } from '../products/QuantitySelector';

const CartItem = ({
  item,
  onUpdateQuantity,
  onRemove,
  onToggleFavorite,
  isFavorite = false,
  variant = 'default', // 'default' or 'compact'
  className = '',
}) => {
  const [removing, setRemoving] = useState(false);

  const handleRemove = async () => {
    setRemoving(true);
    if (onRemove) {
      await onRemove(item.id);
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (onUpdateQuantity) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  const totalPrice = item.price * item.quantity;

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-4 bg-white p-4 rounded-lg ${className}`}>
        {/* Image */}
        <Link to={`/produits/${item.id}`}>
          <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
            {item.image}
          </div>
        </Link>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <Link to={`/produits/${item.id}`}>
            <h4 className="font-semibold text-gray-800 hover:text-green-600 transition truncate">
              {item.title}
            </h4>
          </Link>
          <p className="text-sm text-gray-500">
            {item.price.toLocaleString()} FCFA × {item.quantity}
          </p>
        </div>

        {/* Price */}
        <div className="text-right">
          <p className="font-bold text-gray-800">
            {totalPrice.toLocaleString()} FCFA
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`
        bg-white rounded-xl shadow-md overflow-hidden
        transition-all duration-300
        ${removing ? 'opacity-50 scale-95' : 'hover:shadow-lg'}
        ${className}
      `}
    >
      <div className="flex flex-col sm:flex-row gap-4 p-4">
        {/* Image */}
        <Link to={`/produits/${item.id}`} className="flex-shrink-0">
          <div className="w-full sm:w-32 h-32 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center text-5xl hover:scale-105 transition">
            {item.image}
          </div>
        </Link>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1">
              <Link to={`/produits/${item.id}`}>
                <h3 className="font-bold text-lg text-gray-800 hover:text-green-600 transition mb-1">
                  {item.title}
                </h3>
              </Link>
              {item.category && (
                <p className="text-sm text-gray-500">{item.category}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleFavorite && onToggleFavorite(item.id)}
                className={`
                  p-2 rounded-lg transition
                  ${isFavorite 
                    ? 'bg-red-100 text-red-500' 
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }
                `}
                title="Ajouter aux favoris"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={handleRemove}
                disabled={removing}
                className="p-2 bg-red-100 text-red-500 hover:bg-red-200 rounded-lg transition disabled:opacity-50"
                title="Retirer du panier"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Pricing & Quantity */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 font-medium">Quantité:</span>
              <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="px-3 py-2 bg-gray-50 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 font-bold text-gray-800 min-w-[3rem] text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  disabled={item.quantity >= (item.stock || 99)}
                  className="px-3 py-2 bg-gray-50 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <div className="text-right">
                <p className="text-sm text-gray-500">Prix unitaire</p>
                <p className="text-lg font-semibold text-gray-700">
                  {item.price.toLocaleString()} FCFA
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-xl font-bold text-green-600">
                  {totalPrice.toLocaleString()} FCFA
                </p>
              </div>
            </div>
          </div>

          {/* Stock Info */}
          {item.stock && item.stock < 10 && (
            <p className="text-sm text-orange-600 mt-2">
              ⚠️ Plus que {item.stock} en stock
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;