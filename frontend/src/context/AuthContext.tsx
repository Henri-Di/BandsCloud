import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface User {
  id: number;
  email: string;
  roles: string[];
  name?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  loadingLogout: boolean;
  login: (email: string, password: string) => Promise<string>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Base URL da API, usa VITE_API_URL ou proxy /api em dev
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [loadingLogout, setLoadingLogout] = useState(false);

  const refreshUser = async () => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Não autorizado');
      const userData = await res.json();
      setUser(userData);
    } catch {
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<string> => {
    setLoading(true);
    const res = await fetch(`${API_BASE_URL}/login_check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      setLoading(false);
      throw new Error('Falha no login');
    }
    const data = await res.json();
    localStorage.setItem('token', data.token);
    setToken(data.token);
    await refreshUser();
    setLoading(false);
    return data.token;
  };

  const logout = async () => {
    try {
      setLoadingLogout(true);
      await fetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {
      // Ignora erros no logout remoto
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
      setLoadingLogout(false);
    }
  };

  useEffect(() => {
    if (token) {
      refreshUser();
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, loading, loadingLogout, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return context;
};
