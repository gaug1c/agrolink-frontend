import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container-custom text-center">
          <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Votre panier est vide
          </h2>
          <p className="text-gray-600 mb-8">
            Ajoutez des produits pour commencer vos achats
          </p>
          <Link
            to="/products"
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Découvrir nos produits
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Mon Panier</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image || '/placeholder.jpg'}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600">{item.price} FCFA / {item.unit}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded border hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded border hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">
                      {item.price * item.quantity} FCFA
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-xl font-bold mb-4">Résumé</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span className="font-semibold">{getTotalPrice()} FCFA</span>
                </div>
                <div className="flex justify-between">
                  <span>Livraison</span>
                  <span className="font-semibold">Gratuite</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-green-600">{getTotalPrice()} FCFA</span>
                </div>
              </div>
              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition mb-3"
              >
                Procéder au paiement
              </button>
              <button
                onClick={clearCart}
                className="w-full border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Vider le panier
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;