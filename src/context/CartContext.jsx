import React, { createContext, useContext, useState, useEffect } from 'react';

export const CartContext = createContext();

// Hook personnalisé pour utiliser le CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
  try {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const parsed = JSON.parse(storedCart);
      setCart(Array.isArray(parsed) ? parsed : []);
    }
  } catch (error) {
    console.error('Error loading cart:', error);
    setCart([]);
  }
}, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }, [cart]);

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);

      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevCart, { ...product, quantity }];
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Get total items count
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Get total price
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Check if product is in cart
  const isInCart = (productId) => {
    return cart.some(item => item.id === productId);
  };

  // Get item quantity in cart
  const getItemQuantity = (productId) => {
    const item = cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  // Apply coupon
  const applyCoupon = async (couponCode) => {
    setLoading(true);
    try {
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Coupons fictifs
      const coupons = {
        'BIENVENUE10': { amount: getTotalPrice() * 0.1, description: '10% de réduction' },
        'LIVRAISON': { amount: 2000, description: 'Livraison gratuite' },
        'PROMO2000': { amount: 2000, description: '2000 FCFA de réduction' },
      };

      const coupon = coupons[couponCode.toUpperCase()];
      
      if (!coupon) {
        throw new Error('Code promo invalide');
      }

      return { success: true, coupon: { ...coupon, code: couponCode.toUpperCase() } };
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    cart,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isInCart,
    getItemQuantity,
    applyCoupon,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};