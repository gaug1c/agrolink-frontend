import React from 'react';
import { Package, Truck, Tag } from 'lucide-react';

const OrderSummary = ({ items = [], coupon = null, className = '' }) => {
  // Calculations
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = coupon ? coupon.amount : 0;
  const deliveryFee = subtotal > 10000 ? 0 : 2000;
  const total = subtotal - discount + deliveryFee;

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 sticky top-24 ${className}`}>
      {/* Header */}
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Package className="w-6 h-6 text-green-600" />
        Résumé de la commande
      </h3>

      {/* Items */}
      <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
              {item.image}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-800 text-sm line-clamp-1">
                {item.title}
              </h4>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Qté: {item.quantity}</span>
                <span className="font-bold text-gray-800">
                  {(item.price * item.quantity).toLocaleString()} FCFA
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pricing Details */}
      <div className="space-y-3 pb-4 border-b border-gray-200">
        <div className="flex justify-between text-gray-700">
          <span>Sous-total ({items.length} articles)</span>
          <span className="font-semibold">{subtotal.toLocaleString()} FCFA</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span className="flex items-center gap-1">
              <Tag className="w-4 h-4" />
              Réduction
              {coupon && (
                <span className="text-xs">({coupon.code})</span>
              )}
            </span>
            <span className="font-semibold">-{discount.toLocaleString()} FCFA</span>
          </div>
        )}

        <div className="flex justify-between text-gray-700">
          <span className="flex items-center gap-1">
            <Truck className="w-4 h-4" />
            Livraison
          </span>
          <span className="font-semibold">
            {deliveryFee === 0 ? (
              <span className="text-green-600">Gratuit</span>
            ) : (
              `${deliveryFee.toLocaleString()} FCFA`
            )}
          </span>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-baseline py-4">
        <span className="text-xl font-bold text-gray-800">Total</span>
        <div className="text-right">
          <span className="text-3xl font-bold text-green-600">
            {total.toLocaleString()} FCFA
          </span>
          <p className="text-xs text-gray-500">TTC</p>
        </div>
      </div>

      {/* Free Delivery Progress */}
      {deliveryFee > 0 && subtotal < 10000 && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex justify-between text-sm text-blue-800 mb-2">
            <span>Livraison gratuite à 10 000 FCFA</span>
            <span className="font-semibold">
              {((subtotal / 10000) * 100).toFixed(0)}%
            </span>
          </div>
          <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${Math.min((subtotal / 10000) * 100, 100)}%` }}
            />
          </div>
          <p className="text-xs text-blue-700 mt-2">
            Plus que {(10000 - subtotal).toLocaleString()} FCFA
          </p>
        </div>
      )}

      {/* Info */}
      <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="text-lg">✓</span>
          <span>Livraison en 24-48h</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="text-lg">✓</span>
          <span>Garantie fraîcheur</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="text-lg">✓</span>
          <span>Paiement sécurisé</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;