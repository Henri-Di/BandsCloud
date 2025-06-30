// src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* você pode definir uma rota padrão para redirecionar para /login */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
