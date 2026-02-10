import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import CartDropdown from '../components/cart/CartDropdown';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';

const MainLayout = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const { cart, removeFromCart } = useCart();
  const { success } = useNotification();

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
    success('Produit retiré du panier');
  };

  const handleCheckout = () => {
    setCartOpen(false);
    // Navigation handled by Link in CartDropdown
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header onCartClick={() => setCartOpen(true)} />
      
      <main className="flex-1">
        <Outlet />
      </main>
      
      <Footer />

      {/* Cart Dropdown */}
      <CartDropdown
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
  );
};

// Scroll to top component
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 z-40"
      aria-label="Retour en haut"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
};

export default MainLayout;