// src/App.js
import { useState, useEffect } from 'react';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider,useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import CartSidebar from './components/CartSidebar';
import ProductCatalog from './components/ProductCatalog';
import UserDashboard from './components/UserDashboard';
function AppContent() {
  // Product data
 const { isAuthenticated, redirectTo, clearRedirect } = useAuth();
  const [currentView, setCurrentView] = useState('products');
  useEffect(() => {
    if (redirectTo) {
      if (redirectTo === 'dashboard') {
        setCurrentView('dashboard');
        window.location.hash = '#dashboard';
      } else if (redirectTo === 'products') {
        setCurrentView('products');
        window.location.hash = '';
      }
      clearRedirect(); // Clear the redirect after handling
    }
  }, [redirectTo, clearRedirect]);
   useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#dashboard') {
        setCurrentView('dashboard');
      } else {
        setCurrentView('products');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px' }}>
      <Header />
      <CartSidebar />
      
      {/* Success Message after Registration */}
      {redirectTo === 'dashboard' && (
        <div style={{
          backgroundColor: '#d1fae5',
          color: '#065f46',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1rem',
          border: '1px solid #a7f3d0',
           textAlign: 'center'
        }}>
          ✅ <strong>Registration Successful!</strong> Welcome to your dashboard!
        </div>
      )}

      {/* Show Dashboard or Products based on view */}
      {currentView === 'dashboard' && isAuthenticated ? (
        <UserDashboard />
      ) : (
        <ProductCatalog />
      )}
      {currentView === 'dashboard' && !isAuthenticated && (
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem',
          backgroundColor: '#fef2f2',
          borderRadius: '8px',
          border: '1px solid #fecaca'
        }}>
          <h2 style={{ color: '#dc2626' }}>🔒 Access Denied</h2>
          <p>Please log in to access your dashboard.</p>
          <button 
            onClick={() => window.location.hash = ''}
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
               border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            Back to Products
          </button>
        </div>
      )}
    </div>
  );
}
function App(){
  return (
     <AuthProvider>
    <CartProvider>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px' }}>
        <Header />
        <CartSidebar/>
        <ProductCatalog />
    
    </div>
  </CartProvider>
  </AuthProvider>
  );
}

export default App;