// pages/super/Login.tsx
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_BASE_URL;

export default function SuperLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    const res = await axios.post(`${apiUrl}/api/super-admin/login`, { email, password });
    if (res.data.access_token) {
      localStorage.setItem('superToken', res.data.access_token);
      console.log();
      navigate('/super/dashboard');
    }
  };

  return (
    <div>
      <h2>Super Admin Login</h2>
      <input onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
      <button onClick={login}>Login</button>
    </div>
  );
}
