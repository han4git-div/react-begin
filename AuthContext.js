// src/contexts/AuthContext.js
import { createContext, useState, useContext,useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
const [redirectTo, setRedirectTo] = useState(null);
  // Login function
  const login = (email, password) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (email === 'user@example.com' && password === 'password') {
        const userData = {
          id: 1,
          name: 'hanan nasir',
          email: email,
          role: 'customer'
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        setRedirectTo('dashboard');
      }
      setIsLoading(false);
    }, 1000);
  };

  // Register function
  const register = (name, email, password) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: Date.now(),
        name: name,
        email: email,
        role: 'customer'
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setRedirectTo('dashboard');
      setIsLoading(false);
    }, 1000);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setRedirectTo('products'); 
  };
const clearRedirect = () => {
    setRedirectTo(null);
  };

  // Check if user is logged in on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isLoading,
      isAuthenticated: !!user,
      redirectTo,
      clearRedirect
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}