// src/components/Header.js
import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import Login from './Login';
import Register from './Register';
function Header() {
  const { totalItems, cartTotal } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
 const openCart = () => {
    document.getElementById('cart-sidebar').style.display = 'block';
  };
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 0',
      borderBottom: '2px solid #e5e7eb',
      marginBottom: '2rem'
    }}>
      <h1 style={{ margin: 0, color: '#3b82f6' }}>🛍️ ShopEasy</h1>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          backgroundColor:totalItems > 0 ?  '#3b82f6': '#6b7280',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '20px',
          fontSize: '0.9rem',
          transition: 'all 0.3s ease'
        }}>
          🛒 Cart: {totalItems} items - ${cartTotal.toFixed(2)}
        </div>
        
        <button 
          onClick={openCart}
          style={{
            backgroundColor: totalItems > 0 ? '#10b981': '#6b7280',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
         {totalItems > 0 ? 'View Cart' : 'Cart Empty'}
        </button>
        {isAuthenticated ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span>Welcome, {user.name}!</span>
            <button 
              onClick={logout}
              style={{
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>  </div>
        ) : (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              onClick={() => setShowLogin(true)}
              style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Login
            </button>
            <button 
              onClick={() => setShowRegister(true)}
              style={{
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Register
            </button>
          </div>
        )}
      </div>

      {/* Auth Modals */}
      {showLogin && (
        <Login 
          onClose={() => setShowLogin(false)}
          switchToRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}

      {showRegister && (
        <Register 
          onClose={() => setShowRegister(false)}
          switchToLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}
    </header>
  );
}

export default Header;



     