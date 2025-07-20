// pages/super/Dashboard.tsx
import { useSuperAuth } from '../../auth/SuperAuth';
import { useNavigate } from 'react-router-dom';

export default function SuperDashboard() {
  const { logout } = useSuperAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/super/login');
  };

  const handleCreateTenant = () => {
    navigate('/super/create-tenant');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🛡️ Super Admin Dashboard</h1>

      <div style={{ marginTop: '1rem' }}>
        <button onClick={handleCreateTenant} style={{ marginRight: '1rem' }}>
          ➕ Create New Tenant
        </button>
        <button onClick={handleLogout}>🚪 Logout</button>
      </div>
    </div>
  );
}
