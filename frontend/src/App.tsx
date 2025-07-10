// src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Home from './pages/Home';
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
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Rotas de teste (sem proteção) */}
        <Route path="/artist-test" element={<ArtistDashboardTest />} />
        <Route path="/venue-test" element={<VenueDashboardTest />} />
        <Route path="/fan-test" element={<FanDashboardTest />} />

        {/* Rotas protegidas */}
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

        {/* Página de não autorizado */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Redirecionamento padrão */}
        <Route path="*" element={<Navigate to="/" replace />} /> 
      </Routes>
    </AuthProvider>
  );
};

export default App;
