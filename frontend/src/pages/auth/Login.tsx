// src/pages/LoginPage.tsx
import React, { useEffect, useState } from 'react';
import Login from '../../components/auth/LoginForm';
import Header from '../../components/shared/Header';
import Footer from '../../components/shared/Footer';
import LoadingSpinnerLogin from '../../components/shared/LoadingSpinnerLogin';

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinnerLogin />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <Login />
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
