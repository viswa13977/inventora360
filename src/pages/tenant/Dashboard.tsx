// pages/tenant/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTenantAuth } from '../../auth/TenantAuth';

export default function TenantDashboard() {
  const { tenant, logout } = useTenantAuth();
  const [user, setUser] = useState<{ name: string }>({ name: '' });

  useEffect(() => {
    const token = localStorage.getItem(`${tenant}_token`);
    axios
      .get(`/api/${tenant}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => alert('Failed to load tenant user data'));
  }, [tenant]);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🏢 Tenant Dashboard</h1>
      <p>Welcome, {user.name || 'User'} from tenant: <strong>{tenant}</strong></p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
