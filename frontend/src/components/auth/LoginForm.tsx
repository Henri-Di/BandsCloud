import React from 'react';
import { useForm } from 'react-hook-form';
import { FiMail, FiLock } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // IMPORT CORRETO
import { useAuth } from '../../context/AuthContext';
import '../../styles/OverView.css';

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

  const onSubmit = async (data: LoginFormData) => {
    clearErrors();
    try {
      // login retorna o token (ou usuário)
      const token = await login(data.email, data.password);

      // Decodifica o token para pegar os roles
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

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-indigo-50 via-white to-indigo-50 px-6 container-components-login">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-10 rounded-2xl shadow-lg ring-1 components-form-login"
        noValidate
        aria-label="Formulário de login"
      >
        <h2 className="components-text-title-form-login mb-8 text-3xl font-extrabold text-center">
          Acessar BandsCloud
        </h2>

        {errors.root && (
          <div role="alert" className="error-box">
            {errors.root.message}
          </div>
        )}

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <FiMail className="components-icons-form-login text-gray-500 text-base" />
            <label
              htmlFor="email"
              className="components-label-form-login text-sm font-semibold text-gray-700 leading-none"
            >
              Email
            </label>
          </div>
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
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby="email-error"
            className={`components-input-login w-full rounded-xl border px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${
              errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
            }`}
            placeholder="Digite seu e-mail"
          />
          {errors.email && (
            <p id="email-error" className="error-message">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <FiLock className="components-icons-form-login text-gray-500 text-base" />
            <label
              htmlFor="password"
              className="components-label-form-login text-sm font-semibold text-gray-700 leading-none"
            >
              Senha
            </label>
          </div>
          <input
            id="password"
            type="password"
            {...register('password', { required: 'Senha é obrigatória' })}
            aria-invalid={errors.password ? 'true' : 'false'}
            aria-describedby="password-error"
            className={`components-input-login w-full rounded-xl border px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${
              errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
            }`}
            placeholder="••••••••"
          />
          {errors.password && (
            <p id="password-error" className="error-message">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="components-btn-form-login w-full rounded-2xl bg-indigo-600 py-3 text-white text-lg font-semibold shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
};

export default Login;
