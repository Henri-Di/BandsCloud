import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: number;
  email: string;
  name?: string;
  bio?: string;
  photo?: string;
  roles?: string[];
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  refreshUser: () => Promise<void>;
  isAuthenticated: boolean;
  roles: string[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Axios interceptor para enviar token automaticamente
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }
      const response = await axios.get<User>('/api/user/profile');
      setUser(response.data);
    } catch (error) {
      console.error('Erro ao buscar perfil do usuário:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const isAuthenticated = !!user;
  const roles = user?.roles ?? [];

  return (
    <AuthContext.Provider value={{ user, setUser, loading, refreshUser, isAuthenticated, roles }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return context;
};
