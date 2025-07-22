import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiMail, FiLock } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../../context/AuthContext';
import DashboardAccessButtons from '../auth/AccesTest';
import { Helmet } from 'react-helmet-async';

interface LoginFormData {
  email: string;
  password: string;
}

interface DecodedToken {
  email: string;
  roles: string[];
  exp: number;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm<LoginFormData>();

  const navigate = useNavigate();
  const { login } = useAuth();

  const [showTestAccessOptions, setShowTestAccessOptions] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    clearErrors();
    try {
      const token = await login(data.email, data.password);
      const decoded: DecodedToken = jwtDecode(token);

      if (decoded.roles.includes('ROLE_ARTIST')) {
        navigate('/artist');
      } else if (decoded.roles.includes('ROLE_VENUE')) {
        navigate('/venue');
      } else if (decoded.roles.includes('ROLE_FAN')) {
        navigate('/fan');
      } else {
        navigate('/unauthorized');
      }
    } catch (error: any) {
      setError('root', {
        type: 'server',
        message: error.message || 'Erro ao fazer login',
      });
    }
  };

  const handleTestAccessRole = async (role: 'artist' | 'venue' | 'fan') => {
    setShowTestAccessOptions(false);
    clearErrors();

    let testEmail = '';
    const testPassword = 'senha123';

    if (role === 'artist') testEmail = 'teste-artist@exemplo.com';
    else if (role === 'venue') testEmail = 'teste-venue@exemplo.com';
    else if (role === 'fan') testEmail = 'teste-fan@exemplo.com';

    try {
      const token = await login(testEmail, testPassword);
      const decoded: DecodedToken = jwtDecode(token);

      if (decoded.roles.includes('ROLE_ARTIST')) {
        navigate('/artist');
      } else if (decoded.roles.includes('ROLE_VENUE')) {
        navigate('/venue');
      } else if (decoded.roles.includes('ROLE_FAN')) {
        navigate('/fan');
      } else {
        navigate('/unauthorized');
      }
    } catch (error: any) {
      setError('root', {
        type: 'server',
        message: error.message || 'Erro ao fazer login com acesso teste',
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | BandsCloud</title>
        <meta
          name="description"
          content="Faça login na BandsCloud para gerenciar seu perfil e conexões musicais."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-950 px-4 py-10 md:py-20 space-y-8 md:space-y-0 md:space-x-12 relative">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md p-8 sm:p-10
                     bg-gradient-to-b from-[#0c0a14] via-[#1a172a] to-[#1f1c3b]
                     text-white rounded-3xl shadow-2xl border border-purple-700
                     animate-fade-in z-10 space-y-6 transition-all duration-300"
          noValidate
        >
          <h2 className="text-3xl font-bold text-center text-purple-300 mb-4">
            Bem-vindo de volta 🎧
          </h2>

          {errors.root && (
            <div className="bg-red-700/20 text-red-400 text-sm rounded-md px-4 py-3 border-l-4 border-red-600 shadow">
              {errors.root.message}
            </div>
          )}

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-semibold text-purple-200"
            >
              <div className="flex items-center gap-2">
                <FiMail className="text-purple-400" />
                Email
              </div>
            </label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email é obrigatório',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Formato de email inválido',
                },
              })}
              className={`w-full rounded-xl px-4 py-3 bg-[#2e2b45] text-gray-100 border outline-none placeholder-purple-300
                          focus:ring-2 focus:ring-purple-500 transition-all duration-300 shadow-sm
                          ${errors.email ? 'border-red-500' : 'border-purple-700'}`}
              placeholder="seu@email.com"
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
            )}
          </div>

          {/* Senha */}
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-semibold text-purple-200"
            >
              <div className="flex items-center gap-2">
                <FiLock className="text-purple-400" />
                Senha
              </div>
            </label>
            <input
              id="password"
              type="password"
              {...register('password', { required: 'Senha é obrigatória' })}
              className={`w-full rounded-xl px-4 py-3 bg-[#2e2b45] text-gray-100 border outline-none placeholder-purple-300
                          focus:ring-2 focus:ring-purple-500 transition-all duration-300 shadow-sm
                          ${errors.password ? 'border-red-500' : 'border-purple-700'}`}
              placeholder="••••••••"
              aria-invalid={!!errors.password}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
            )}
          </div>

          {/* Botão de envio */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-xl text-white font-semibold text-lg shadow-md transition-all duration-300 transform ${
              isSubmitting
                ? 'bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 cursor-not-allowed opacity-75 flex justify-center items-center gap-3'
                : 'bg-[#6600cc] hover:bg-[#7f32cc] cursor-pointer hover:scale-105 active:scale-95'
            }`}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Entrando...
              </>
            ) : (
              'Entrar'
            )}
          </button>

          {/* Botão Acesso Teste */}
          <button
            type="button"
            onClick={() => setShowTestAccessOptions(true)}
            disabled={isSubmitting}
            className="w-full mt-4 py-2 rounded-xl bg-[#29263f] hover:bg-[#3a365a] text-purple-200 font-semibold text-md shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Acesso Teste
          </button>
        </form>

        {/* DashboardAccessButtons */}
        {showTestAccessOptions && (
          <div className="w-full max-w-md">
            <DashboardAccessButtons
              disabled={isSubmitting}
              onAccess={handleTestAccessRole}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
