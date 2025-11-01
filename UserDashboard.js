// src/components/UserDashboard.js
import { useAuth } from '../contexts/AuthContext';

function UserDashboard() {
  const { user, logout } = useAuth();

  return (
    <div style={{
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '2rem'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        paddingBottom: '1rem',
        borderBottom: '2px solid #e5e7eb'
      }}>
        <h1 style={{ margin: 0, color: '#3b82f6' }}>👤 Welcome, {user.name}!</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            onClick={() => window.location.hash = ''}
            style={{
              backgroundColor: '#6b7280',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            🛍️ Back to Products
          </button>
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
          </button>
        </div>
      </div>

      <div style={{
        backgroundColor: '#f9fafb',
        padding: '2rem',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#374151', marginBottom: '1rem' }}>Your Dashboard</h2>
        <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
          Welcome to your account! Here you can view your orders, manage your profile, and update settings.
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginTop: '2rem'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <h3>📝 Profile</h3>
            <p>Manage your personal information</p>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <h3>📦 Orders</h3>
            <p>View your order history</p>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <h3>⚙️ Settings</h3>
            <p>Update your preferences</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;