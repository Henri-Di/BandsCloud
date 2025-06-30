// src/pages/LoginPage.tsx
import React from 'react';
import Login from '../../components/auth/LoginForm'; 
import Header from '../../components/shared/Header'; 
import Footer from '../../components/shared/Footer'; 

const LoginPage: React.FC = () => {
  return (
    <div>
      <Header />
      <Login />
      <Footer />
    </div>
  );
};

export default LoginPage;
