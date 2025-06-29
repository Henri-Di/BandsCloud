import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ArtistDashboard from './pages/Artists/ArtistDashboard';
import VenueDashboard from './pages/Venues/VenueDashboard';
import FanDashboard from './pages/Fans/FanDashboard';
import Login from './pages/auth/Login';
import Unauthorized from './pages/Unauthorized';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
