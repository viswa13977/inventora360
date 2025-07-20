// context/TenantContext.tsx
import { createContext, useContext } from 'react';
import { useParams } from 'react-router-dom';

const TenantContext = createContext<{ tenant: string }>({ tenant: '' });

export const TenantProvider = ({ children }: { children: React.ReactNode }) => {
  const { tenant = '' } = useParams();
  return <TenantContext.Provider value={{ tenant }}>{children}</TenantContext.Provider>;
};

export const useTenant = () => useContext(TenantContext);
