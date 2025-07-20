// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SuperLogin from './pages/super/Login';
import SuperDashboard from './pages/super/Dashboard';
import CreateTenant from './pages/super/CreateTenant';

import TenantLogin from './pages/tenant/Login';
import TenantDashboard from './pages/tenant/Dashboard';

import { TenantProvider } from './context/TenantContext';
import { SuperAuthProvider } from './auth/SuperAuth';
import RequireSuperAuth from './auth/RequireSuperAuth';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Super Admin Routes */}
        <Route path="/super/login" element={<SuperLogin />} />
        <Route
          path="/super/dashboard"
          element={
            <SuperAuthProvider>
              <RequireSuperAuth>
                <SuperDashboard />
              </RequireSuperAuth>
            </SuperAuthProvider>
          }
        />
        <Route
          path="/super/create-tenant"
          element={
            <SuperAuthProvider>
              <RequireSuperAuth>
                <CreateTenant />
              </RequireSuperAuth>
            </SuperAuthProvider>
          }
        />

        {/* Tenant Routes */}
        <Route
          path="/:tenant/login"
          element={
            <TenantProvider>
              <TenantLogin />
            </TenantProvider>
          }
        />
        <Route
          path="/:tenant/dashboard"
          element={
            <TenantProvider>
              <TenantDashboard />
            </TenantProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
