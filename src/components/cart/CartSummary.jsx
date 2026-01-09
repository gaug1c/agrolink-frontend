import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag, TrendingUp, ShoppingBag, ArrowRight } from 'lucide-react';
import Button from '../common/Button';

const CartSummary = ({
  items = [],
  onApplyCoupon,
  onCheckout,
  className = '',
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [loading, setLoading] = useState(false);

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = appliedCoupon ? appliedCoupon.amount : 0;
  const deliveryFee = subtotal > 10000 ? 0 : 2000; // Livraison gratuite au-dessus de 10000 FCFA
  const total = subtotal - discount + deliveryFee;

  const handleApplyCoupon = async () => {
    setCouponError('');
    setLoading(true);

    try {
      // Simulation d'application de coupon
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Codes de réduction fictifs
      const validCoupons = {
        'BIENVENUE10': { amount: subtotal * 0.1, description: '10% de réduction' },
        'LIVRAISON': { amount: deliveryFee, description: 'Livraison gratuite' },
        'PROMO2000': { amount: 2000, description: '2000 FCFA de réduction' },
      };

      const coupon = validCoupons[couponCode.toUpperCase()];

      if (coupon) {
        setAppliedCoupon({ ...coupon, code: couponCode.toUpperCase() });
        if (onApplyCoupon) {
          onApplyCoupon(coupon);
        }
      } else {
        setCouponError('Code promo invalide');
      }
    } catch (error) {
      setCouponError('Erreur lors de l\'application du code');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 sticky top-24 ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <ShoppingBag className="w-6 h-6 text-green-600" />
        <h2 className="text-2xl font-bold text-gray-800">Résumé</h2>
      </div>

      {/* Coupon Code */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2 text-sm">
          Code promo
        </label>
        
        {appliedCoupon ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-green-600" />
                <span className="font-bold text-green-700">{appliedCoupon.code}</span>
              </div>
              <button
                onClick={handleRemoveCoupon}
                className="text-sm text-red-600 hover:text-red-700 font-semibold"
              >
                Retirer
              </button>
            </div>
            <p className="text-sm text-green-700">{appliedCoupon.description}</p>
          </div>
        ) : (
          <div>
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                placeholder="PROMO2024"
                className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Button
                onClick={handleApplyCoupon}
                loading={loading}
                disabled={!couponCode.trim()}
                variant="outline"
              >
                Appliquer
              </Button>
            </div>
            {couponError && (
              <p className="text-sm text-red-500 mt-2">{couponError}</p>
            )}
          </div>
        )}
      </div>

      {/* Summary Details */}
      <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
        <div className="flex justify-between text-gray-700">
          <span>Sous-total ({items.length} articles)</span>
          <span className="font-semibold">{subtotal.toLocaleString()} FCFA</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              Réduction
            </span>
            <span className="font-semibold">-{discount.toLocaleString()} FCFA</span>
          </div>
        )}

        <div className="flex justify-between text-gray-700">
          <span>Frais de livraison</span>
          <span className="font-semibold">
            {deliveryFee === 0 ? (
              <span className="text-green-600">Gratuit</span>
            ) : (
              `${deliveryFee.toLocaleString()} FCFA`
            )}
          </span>
        </div>

        {/* Free Delivery Progress */}
        {deliveryFee > 0 && subtotal < 10000 && (
          <div className="pt-2">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Livraison gratuite à partir de 10 000 FCFA</span>
              <span className="font-semibold">
                {((subtotal / 10000) * 100).toFixed(0)}%
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-300"
                style={{ width: `${Math.min((subtotal / 10000) * 100, 100)}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Plus que <span className="font-bold text-green-600">
                {(10000 - subtotal).toLocaleString()} FCFA
              </span> pour la livraison gratuite !
            </p>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="flex justify-between items-baseline mb-6">
        <span className="text-xl font-bold text-gray-800">Total</span>
        <div className="text-right">
          <span className="text-3xl font-bold text-green-600">
            {total.toLocaleString()} FCFA
          </span>
          <p className="text-sm text-gray-500">TTC</p>
        </div>
      </div>

      {/* Checkout Button */}
      <Button
        fullWidth
        size="lg"
        onClick={onCheckout}
        disabled={items.length === 0}
        icon={<ArrowRight className="w-5 h-5" />}
        iconPosition="right"
      >
        Passer la commande
      </Button>

      {/* Continue Shopping */}
      <Link to="/produits">
        <Button
          fullWidth
          variant="ghost"
          className="mt-3"
        >
          Continuer mes achats
        </Button>
      </Link>

      {/* Trust Badges */}
      <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-xl">🔒</span>
          </div>
          <span>Paiement 100% sécurisé</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-xl">✓</span>
          </div>
          <span>Garantie satisfaction</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-xl">🚚</span>
          </div>
          <span>Livraison rapide 24-48h</span>
        </div>
      </div>

      {/* Suggested Coupons */}
      {!appliedCoupon && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            Codes promo disponibles :
          </p>
          <div className="space-y-2">
            <button
              onClick={() => {
                setCouponCode('BIENVENUE10');
                handleApplyCoupon();
              }}
              className="w-full text-left text-sm bg-green-50 hover:bg-green-100 text-green-700 px-3 py-2 rounded-lg transition"
            >
              <span className="font-bold">BIENVENUE10</span> - 10% de réduction
            </button>
            <button
              onClick={() => {
                setCouponCode('LIVRAISON');
                handleApplyCoupon();
              }}
              className="w-full text-left text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-lg transition"
            >
              <span className="font-bold">LIVRAISON</span> - Livraison gratuite
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartSummary;