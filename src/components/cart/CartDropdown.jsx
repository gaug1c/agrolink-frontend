import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, X, ArrowRight, Trash2 } from 'lucide-react';
import Button from '../common/Button';

const CartDropdown = ({
  isOpen,
  onClose,
  items = [],
  onRemoveItem,
  onCheckout,
}) => {
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-25 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Dropdown */}
      <div
        ref={dropdownRef}
        className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col animate-slide-in-right"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-bold text-gray-800">
              Panier ({itemCount})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Votre panier est vide
            </h3>
            <p className="text-gray-600 mb-6">
              Ajoutez des produits pour commencer vos achats
            </p>
            <Link to="/produits" onClick={onClose}>
              <Button>
                Découvrir les produits
              </Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition"
                >
                  {/* Image */}
                  <Link 
                    to={`/produits/${item.id}`}
                    onClick={onClose}
                    className="flex-shrink-0"
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center text-3xl">
                      {item.image}
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link 
                      to={`/produits/${item.id}`}
                      onClick={onClose}
                    >
                      <h4 className="font-semibold text-gray-800 hover:text-green-600 transition mb-1 line-clamp-2">
                        {item.title}
                      </h4>
                    </Link>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        {item.quantity} × {item.price.toLocaleString()} FCFA
                      </span>
                      <span className="font-bold text-green-600">
                        {(item.price * item.quantity).toLocaleString()} FCFA
                      </span>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="flex-shrink-0 p-2 hover:bg-red-100 text-red-500 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-6 space-y-4">
              {/* Subtotal */}
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Sous-total</span>
                <span className="text-2xl font-bold text-gray-800">
                  {subtotal.toLocaleString()} FCFA
                </span>
              </div>

              {/* Free Delivery Info */}
              {subtotal < 10000 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-800">
                    Plus que <span className="font-bold">
                      {(10000 - subtotal).toLocaleString()} FCFA
                    </span> pour la livraison gratuite !
                  </p>
                </div>
              )}

              {/* Buttons */}
              <div className="space-y-2">
                <Link to="/panier" onClick={onClose}>
                  <Button fullWidth variant="outline">
                    Voir le panier
                  </Button>
                </Link>
                <Button
                  fullWidth
                  onClick={() => {
                    onCheckout();
                    onClose();
                  }}
                  icon={<ArrowRight className="w-5 h-5" />}
                  iconPosition="right"
                >
                  Commander
                </Button>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600 pt-2">
                <span className="text-lg">🔒</span>
                <span>Paiement 100% sécurisé</span>
              </div>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slideInRight 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default CartDropdown;