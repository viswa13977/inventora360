// auth/TenantAuth.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

interface TenantAuthContextProps {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  tenant: string;
}

const TenantAuthContext = createContext<TenantAuthContextProps | null>(null);

export const TenantAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { tenant = '' } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(`${tenant}_token`);
    if (token) setIsAuthenticated(true);
  }, [tenant]);

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post(`/api/${tenant}/login`, { email, password });
      localStorage.setItem(`${tenant}_token`, res.data.token);
      setIsAuthenticated(true);
      navigate(`/${tenant}/dashboard`);
    } catch (err) {
      alert('Tenant login failed.');
    }
  };

  const logout = () => {
    localStorage.removeItem(`${tenant}_token`);
    setIsAuthenticated(false);
    navigate(`/${tenant}/login`);
  };

  return (
    <TenantAuthContext.Provider value={{ isAuthenticated, login, logout, tenant }}>
      {children}
    </TenantAuthContext.Provider>
  );
};

export const useTenantAuth = () => {
  const context = useContext(TenantAuthContext);
  if (!context) throw new Error('useTenantAuth must be used within TenantAuthProvider');
  return context;
};
