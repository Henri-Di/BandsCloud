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
    <div className="flex items-center justify-center px-4 py-12 md:py-20 animate-fade-in z-10">
      <div
        className="w-full max-w-md bg-gradient-to-b from-[#0e0c1a] via-[#1e1b2e] to-[#1f1c3b]
                   text-white rounded-3xl shadow-[0_0_60px_0_rgba(128,0,255,0.3)]
                   border border-purple-700 p-6 sm:p-10 space-y-6 transition-all duration-300"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-purple-300 drop-shadow-md">
          Acesso de Teste 🎧
        </h2>

        <p className="text-sm text-purple-200 text-center mb-2">
          Experimente dashboards para diferentes tipos de perfil:
        </p>

        <div className="space-y-4">
          <button
            type="button"
            onClick={() => handleAccess('artist')}
            disabled={disabled}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-600
                       hover:from-purple-600 hover:to-indigo-500 text-white font-semibold
                       text-base shadow-md transition-all duration-300 transform
                       hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🎤 Acessar como Artista
          </button>

          <button
            type="button"
            onClick={() => handleAccess('venue')}
            disabled={disabled}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-gray-700 to-gray-600
                       hover:from-gray-600 hover:to-gray-500 text-white font-semibold
                       text-base shadow-md transition-all duration-300 transform
                       hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🏢 Acessar como Estabelecimento
          </button>

          <button
            type="button"
            onClick={() => handleAccess('fan')}
            disabled={disabled}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500
                       hover:from-pink-400 hover:to-purple-400 text-white font-semibold
                       text-base shadow-md transition-all duration-300 transform
                       hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🎧 Acessar como Fã
          </button>

          <button
            type="button"
            onClick={() => navigate('/unauthorized')}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-500
                       hover:from-red-500 hover:to-red-400 text-white font-semibold
                       text-base shadow-md transition-all duration-300 transform
                       hover:scale-105 active:scale-95"
          >
            🚫 Acesso Não Autorizado
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardAccessButtons;
