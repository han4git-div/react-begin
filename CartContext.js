// src/contexts/CartContext.js
import { createContext, useState, useContext } from 'react';

// Create Context
const CartContext = createContext();

// Cart Provider Component
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Add to Cart
  const addToCart = (product) => {
    setCartItems(prev => {
      // Check if product already exists in cart
      const existingItem = prev.find(item => item.id === product.id);
      
      if (existingItem) {
        // If exists, increase quantity
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If new, add with quantity 1
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove from Cart
  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  // Update Quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Clear Cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate Total
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Calculate Total Items
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      totalItems
    }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom Hook to use Cart
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}