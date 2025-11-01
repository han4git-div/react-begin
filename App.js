// src/App.js
import { useState ,useEffect } from 'react';
import { CartProvider } from './contexts/CartContext';
import { useCart } from './contexts/CartContext';
import Header from './components/Header';
import CartSidebar from './components/CartSidebar';
import ProductCatalog from './components/ProductCatalog';
import UserDashboard from './components/UserDashboard';
function App() {
  // Product data
  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop', price: 999, category: 'Electronics' },
    { id: 2, name: 'Coffee Mug', price: 15, category: 'Home' },
    { id: 3, name: 'Notebook', price: 8, category: 'Office' },
    { id: 4, name: 'Wireless Mouse', price: 25, category: 'Electronics' },
    { id: 5, name: 'Desk Lamp', price: 45, category: 'Home' },
    { id: 6, name: 'Stapler', price: 12, category: 'Office' }
  ]);
const { addToCart } = useCart();
  // State for new product form
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: ''
  });

  // State for editing
  const [editingProduct, setEditingProduct] = useState(null);

  // State for search and filter
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // DELETE functionality
  const deleteProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  // RESET functionality
  const resetProducts = () => {
    setProducts([
      { id: 1, name: 'Laptop', price: 999, category: 'Electronics' },
      { id: 2, name: 'Coffee Mug', price: 15, category: 'Home' },
      { id: 3, name: 'Notebook', price: 8, category: 'Office' },
      { id: 4, name: 'Wireless Mouse', price: 25, category: 'Electronics' },
      { id: 5, name: 'Desk Lamp', price: 45, category: 'Home' },
      { id: 6, name: 'Stapler', price: 12, category: 'Office' }
    ]);
    setSearchTerm('');
    setSelectedCategory('All');
  };

  // CREATE functionality - Add new product
  const addProduct = (e) => {
    e.preventDefault();
    
    const product = {
      id: Date.now(),
      name: newProduct.name,
      price: Number(newProduct.price),
      category: newProduct.category
    };

    setProducts([...products, product]);
    setNewProduct({ name: '', price: '', category: '' });
  };

  // START EDIT functionality
  const startEdit = (product) => {
    setEditingProduct({ ...product });
  };

  // SAVE EDIT functionality
  const saveEdit = (e) => {
    e.preventDefault();
    
    setProducts(products.map(product => 
      product.id === editingProduct.id ? editingProduct : product
    ));
    
    setEditingProduct(null);
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingProduct(null);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value
    });
  };

  // Handle edit form input changes
  const handleEditChange = (e) => {
    setEditingProduct({
      ...editingProduct,
      [e.target.name]: e.target.name === 'price' ? Number(e.target.value) : e.target.value
    });
  };

  // FILTERED PRODUCTS - Search and Category filter
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter dropdown
  const categories = ['All', ...new Set(products.map(product => product.category))];

  return (
  <CartProvider>
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px' }}>
      <Header />
      <CartSidebar />
      
      {/* YOUR EXISTING PRODUCT CATALOG CODE */}
      {/* ... */}
    

    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        My Product Catalog
      </h1>
      
      {/* SEARCH AND FILTER SECTION */}
      <div style={{ backgroundColor: '#f3f4f6', padding: '20px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '1rem' }}>Search & Filter Products</h2>
        <div>
          <input
            type="text"
            placeholder="Search products or categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '4px', margin: '5px', width: '300px', fontSize: '16px' }}
          />
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '4px', margin: '5px', fontSize: '16px' }}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <p style={{ marginTop: '10px', color: '#6b7280' }}>
          Showing {filteredProducts.length} of {products.length} products
        </p>
      </div>
      
      {/* EDIT PRODUCT FORM */}
      {editingProduct && (
        <div style={{backgroundColor: '#f9fafb', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb', marginBottom: '20px'}}>
          <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Edit Product</h2>
          <form onSubmit={saveEdit} style={{ textAlign: 'center' }}>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={editingProduct.name}
              onChange={handleEditChange}
              style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '4px', margin: '5px', width: '200px' }}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={editingProduct.price}
              onChange={handleEditChange}
              style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '4px', margin: '5px', width: '200px' }}
              required
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={editingProduct.category}
              onChange={handleEditChange}
              style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '4px', margin: '5px', width: '200px' }}
              required
            />
            <button type="submit" style={{ backgroundColor: '#10b981', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', margin: '5px' }}>
              Save Changes
            </button>
            <button type="button" onClick={cancelEdit} style={{ backgroundColor: '#6b7280', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', margin: '5px' }}>
              Cancel
            </button>
          </form>
        </div>
      )}
      
      {/* ADD PRODUCT FORM */}
      <div style={{backgroundColor: '#f9fafb', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb', marginBottom: '20px'}}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Add New Product</h2>
        <form onSubmit={addProduct} style={{ textAlign: 'center' }}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleInputChange}
            style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '4px', margin: '5px', width: '200px' }}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleInputChange}
            style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '4px', margin: '5px', width: '200px' }}
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newProduct.category}
            onChange={handleInputChange}
            style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '4px', margin: '5px', width: '200px' }}
            required
          />
          <button type="submit" style={{ backgroundColor: '#10b981', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', margin: '5px' }}>
            Add Product
          </button>
        </form>
      </div>

      {/* RESET BUTTON */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button 
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          onClick={resetProducts}
        >
          Reset All Products
        </button>
      </div>
      
      {/* PRODUCTS GRID */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '16px' 
      }}>
        {filteredProducts.map(product => (
          <div key={product.id} style={{ 
            border: '1px solid #ddd', 
            borderRadius: '8px', 
            padding: '16px', 
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)' 
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              {product.name}
            </h3>
            <p style={{ color: '#666', fontSize: '1.125rem', marginBottom: '0.25rem' }}>
              ${product.price}
            </p>
            <p style={{ fontSize: '0.875rem', color: '#3b82f6', marginBottom: '0.5rem' }}>
              {product.category}
            </p>
            <div>
              <button style={{ 
          backgroundColor: '#10b981', 
          color: 'white', 
          border: 'none', 
          padding: '8px 16px', 
          borderRadius: '4px', 
          cursor: 'pointer', 
          marginTop: '8px', 
          marginRight: '8px'
        }}
        onClick={() => addToCart(product)} 
      >
        🛒 Add to Cart
      </button>
                <button style={{ 
                  backgroundColor: '#3b82f6', 
                  color: 'white', 
                  border: 'none', 
                  padding: '8px 16px', 
                  borderRadius: '4px', 
                  cursor: 'pointer', 
                  marginTop: '8px', 
                  marginRight: '12px',
                  boxShadow: '0 2px 6px rgba(59, 130, 246, 0.4)'
                }}
                onClick={() => startEdit(product)}
              >
                Edit 
              </button>
              <button 
                style={{ 
                  backgroundColor: '#ef4444', 
                  color: 'white', 
                  border: 'none', 
                  padding: '8px 16px', 
                  borderRadius: '4px', 
                  cursor: 'pointer', 
                  marginTop: '8px',
                  boxShadow: '0 2px 6px rgba(239, 68, 68, 0.4)'
                }}
                onClick={() => deleteProduct(product.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    <CartProvider>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px' }}>
        <Header />
        
        {/* YOUR EXISTING PRODUCT CATALOG CODE */}
        <h1 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          My Product Catalog
        </h1>
        
        {/* Search, Filters, Forms, Product Grid - everything stays the same */}
        {/* ... */}
      </div>
    </CartProvider>
    </div>
    </CartProvider>
  );
}

export default App;