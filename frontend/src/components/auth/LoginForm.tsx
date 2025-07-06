import React from 'react';
import { useForm } from 'react-hook-form';
import { FiMail, FiLock } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../../context/AuthContext';

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

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-8 sm:p-10 bg-[#1e1e2f] text-white rounded-2xl shadow-2xl border border-purple-700 animate-fade-in"
        noValidate
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-purple-300">
          Bem-vindo de volta 🎧
        </h2>

        {errors.root && (
          <div className="bg-red-100 text-red-700 text-sm rounded-md px-4 py-2 mb-4">
            {errors.root.message}
          </div>
        )}

        {/* Email */}
        <div className="mb-6">
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
            className={`w-full rounded-xl px-4 py-3 text-gray-100 bg-gray-800 border outline-none focus:ring-2 focus:ring-[#6600cc] transition placeholder-gray-400 ${
              errors.email ? 'border-red-500' : 'border-gray-600'
            }`}
            placeholder="seu@email.com"
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>

        {/* Senha */}
        <div className="mb-8">
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
            {...register('password', {
              required: 'Senha é obrigatória',
            })}
            className={`w-full rounded-xl px-4 py-3 text-gray-100 bg-gray-800 border outline-none focus:ring-2 focus:ring-[#6600cc] transition placeholder-gray-400 ${
              errors.password ? 'border-red-500' : 'border-gray-600'
            }`}
            placeholder="••••••••"
            aria-invalid={!!errors.password}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-xl bg-[#6600cc] hover:bg-[#7f32cc] text-white font-semibold text-lg shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
};

export default Login;
