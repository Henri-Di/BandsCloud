// src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Home from './pages/Home';
import About from './pages/About';
import ArtistDashboard from './pages/Artists/ArtistDashboard';
import ArtistDashboardTest from './pages/Artists-Test/ArtistDashboardTest';
import VenueDashboard from './pages/Venues/VenueDashboard';
import VenueDashboardTest from './pages/Venus-Test/VenueDashboardTest';
import FanDashboard from './pages/Fans/FanDashboard';
import FanDashboardTest from './pages/Fans-Test/FanDashboardTest';
import Register from './pages/Register';
import Unauthorized from './pages/Unauthorized';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import { HelmetProvider } from 'react-helmet-async';

const App = () => {
  return (
    <HelmetProvider>
    <AuthProvider>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* About */}
        <Route path="/about" element={<About />} />

        {/* Register User */}
        <Route path="/register" element={<Register />} />

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
  </HelmetProvider>
  );
};

export default App;
