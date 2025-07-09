// src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import ArtistDashboard from './pages/Artists/ArtistDashboard';
import ArtistDashboardTest from './pages/Artists-Test/ArtistDashboardTest';
import VenueDashboard from './pages/Venues/VenueDashboard';
import VenueDashboardTest from './pages/Venus-Test/VenueDashboardTest';
import FanDashboard from './pages/Fans/FanDashboard';
import FanDashboardTest from './pages/Fans-Test/FanDashboardTest';
import Unauthorized from './pages/Unauthorized';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Rota de teste sem proteção */}
<Route path="/artist-test" element={<ArtistDashboardTest />} /> 
<Route path="/venue-test" element={<VenueDashboardTest />} /> 
<Route path="/fan-test" element={<FanDashboardTest />} /> 
<Route
  path="/artist"
  element={
    <PrivateRoute allowedRoles={['ROLE_ARTIST']}>
      <ArtistDashboard />
    </PrivateRoute>
  }
/>
        <Route
          path="/venue"
          element={
            <PrivateRoute allowedRoles={['ROLE_VENUE']}>
              <VenueDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/fan"
          element={
            <PrivateRoute allowedRoles={['ROLE_FAN']}>
              <FanDashboard />
            </PrivateRoute>
          }
        />

        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
