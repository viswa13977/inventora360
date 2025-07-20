// pages/tenant/Login.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function TenantLogin() {
  const { tenant } = useParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    const res = await axios.post(`/api/${tenant}/login`, { email, password });
    if (res.data.token) {
      localStorage.setItem('tenantToken', res.data.token);
      navigate(`/${tenant}/dashboard`);
    }
  };

  return (
    <div>
      <h2>Tenant Login - {tenant}</h2>
      <input onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
      <button onClick={login}>Login</button>
    </div>
  );
}
