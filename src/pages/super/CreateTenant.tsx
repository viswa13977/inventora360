// pages/super/CreateTenant.tsx
import { useState } from 'react';
import axios from 'axios';

export default function CreateTenant() {
  const [form, setForm] = useState({ name: '', domain: '', db: '' });

  const create = async () => {
    const token = localStorage.getItem('superToken');
    await axios.post(
      '/api/super/tenants',
      { ...form },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert('Tenant created!');
  };

  return (
    <div>
      <h2>Create Tenant</h2>
      <input placeholder="Tenant Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Tenant Domain" onChange={e => setForm({ ...form, domain: e.target.value })} />
      <input placeholder="Tenant DB" onChange={e => setForm({ ...form, db: e.target.value })} />
      <button onClick={create}>Create</button>
    </div>
  );
}
