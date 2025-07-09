import React from 'react';
import { useNavigate } from 'react-router-dom';

interface DashboardAccessButtonsProps {
  onAccess?: (role: 'artist' | 'venue' | 'fan') => void;
  disabled?: boolean;
}

const DashboardAccessButtons: React.FC<DashboardAccessButtonsProps> = ({
  onAccess,
  disabled = false,
}) => {
  const navigate = useNavigate();

  const handleAccess = (role: 'artist' | 'venue' | 'fan') => {
    onAccess?.(role);

    switch (role) {
      case 'artist':
        navigate('/artist-test');
        break;
      case 'venue':
        navigate('/venue-test');
        break;
      case 'fan':
        navigate('/fan-test');
        break;
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-[#1f1f2f] text-white rounded-3xl shadow-[0_0_60px_0_rgba(128,0,255,0.4)] border border-purple-600 p-6 sm:p-10 animate-fade-in-up">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-8 text-purple-300 drop-shadow-md">
          Escolha seu Dashboard 🎧
        </h2>

        <div className="space-y-5">
          <button
            type="button"
            onClick={() => handleAccess('artist')}
            disabled={disabled}
            className="w-full py-3 md:py-3.5 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white font-semibold text-base md:text-lg shadow-lg transition-all duration-300 transform hover:scale-[1.04] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🎤 Acessar Dashboard Artista
          </button>

          <button
            type="button"
            onClick={() => handleAccess('venue')}
            disabled={disabled}
            className="w-full py-3 md:py-3.5 rounded-xl bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white font-semibold text-base md:text-lg shadow-lg transition-all duration-300 transform hover:scale-[1.04] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🏢 Acessar Dashboard Empresa
          </button>

          <button
            type="button"
            onClick={() => handleAccess('fan')}
            disabled={disabled}
            className="w-full py-3 md:py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white font-semibold text-base md:text-lg shadow-lg transition-all duration-300 transform hover:scale-[1.04] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🎧 Acessar Dashboard Fã
          </button>

          <button
            type="button"
            onClick={() => navigate('/unauthorized')}
            className="w-full py-3 md:py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold text-base md:text-lg shadow-lg transition-all duration-300 transform hover:scale-[1.04] active:scale-95"
          >
            🚫 Acesso Não Autorizado
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardAccessButtons;
