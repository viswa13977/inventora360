// auth/SuperAuth.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

interface SuperAuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  logout: () => void;
}

const SuperAuthContext = createContext<SuperAuthContextType | undefined>(undefined);

export const SuperAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('superToken'));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => !!localStorage.getItem('superToken'));

  useEffect(() => {
    const storedToken = localStorage.getItem('superToken');
    setToken(storedToken);
    setIsAuthenticated(!!storedToken);
  }, []);

  const logout = () => {
    localStorage.removeItem('superToken');
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <SuperAuthContext.Provider value={{ isAuthenticated, token, logout }}>
      {children}
    </SuperAuthContext.Provider>
  );
};

export const useSuperAuth = (): SuperAuthContextType => {
  const context = useContext(SuperAuthContext);
  if (!context) {
    throw new Error('useSuperAuth must be used within SuperAuthProvider');
  }
  return context;
};
