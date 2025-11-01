// src/components/Navigation.js
import { Link } from 'react-router-dom';

function Navigation() {
  const navStyle = {
    backgroundColor: '#f8f9fa',
    padding: '1rem',
    borderBottom: '1px solid #dee2e6',
    marginBottom: '2rem'
  };

  const linkStyle = {
    margin: '0 1rem',
    textDecoration: 'none',
    color: '#007bff',
    fontSize: '1.1rem'
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle}>🏠 Home</Link>
      <Link to="/products" style={linkStyle}>📦 Products</Link>
      <Link to="/about" style={linkStyle}>ℹ️ About</Link>
    </nav>
  );
}

export default Navigation;