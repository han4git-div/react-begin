// src/components/CartSidebar.js
import { useCart } from '../contexts/CartContext';
import React, { useState } from 'react';
function CartSidebar() {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    cartTotal,
    totalItems 
  } = useCart();

  const closeCart = () => {
    document.getElementById('cart-sidebar').style.display = 'none';
  };

  return (
    <div 
      id="cart-sidebar"
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '400px',
        height: '100vh',
        backgroundColor: 'white',
        boxShadow: '-2px 0 10px rgba(0,0,0,0.1)',
        padding: '20px',
        display: 'none',
        zIndex: 1000,
        overflowY: 'auto'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>🛒 Your Cart ({totalItems} items)</h2>
        <button 
          onClick={closeCart}
          style={{
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          ✕ Close
        </button>
      </div>

      {cartItems.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#6b7280', marginTop: '50px' }}>
          Your cart is empty
        </p>
      ) : (
        <>
          <div style={{ marginBottom: '20px' }}>
            {cartItems.map(item => (
              <div 
                key={item.id} 
                style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '15px',
                  marginBottom: '10px',
                  backgroundColor: '#f9fafb'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ margin: '0 0 5px 0' }}>{item.name}</h4>
                    <p style={{ margin: 0, color: '#6b7280' }}>${item.price} each</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      backgroundColor: '#ef4444',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Remove
                  </button>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                  <span>Quantity:</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    style={{
                      backgroundColor: '#6b7280',
                      color: 'white',
                      border: 'none',
                      width: '30px',
                      height: '30px',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    -
                  </button>
                  <span style={{ fontWeight: 'bold' }}>{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    style={{
                      backgroundColor: '#10b981',
                      color: 'white',
                      border: 'none',
                      width: '30px',
                      height: '30px',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    +
                  </button>
                  <span style={{ marginLeft: 'auto', fontWeight: 'bold' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '2px solid #e5e7eb', paddingTop: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '15px' }}>
              <span>Total:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            
            <button 
              onClick={clearCart}
              style={{
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                padding: '10px',
                borderRadius: '4px',
                cursor: 'pointer',
                width: '100%',
                marginBottom: '10px'
              }}
            >
              Clear Cart
            </button>
            
            <button 
              style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                padding: '12px',
                borderRadius: '4px',
                cursor: 'pointer',
                width: '100%',
                fontSize: '1.1rem'
              }}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartSidebar;