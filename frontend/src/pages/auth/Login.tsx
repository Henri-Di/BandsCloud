import React from 'react';
import Login from '../../components/auth/LoginForm';
import Navbar from '../../components/shared/NavbarLogin';
import Footer from '../../components/shared/Footer';
import { Helmet } from 'react-helmet-async';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white">
    <Helmet>
      <title>Login | BandsCloud</title>
      <meta
      name="description"
      content="Faça login na BandsCloud para gerenciar seu perfil e conexões musicais."
      />
    </Helmet>
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <Login />
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
