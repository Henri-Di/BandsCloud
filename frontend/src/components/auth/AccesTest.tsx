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
    onAccess && onAccess(role);

    switch (role) {
      case 'artist':
        navigate('/artist-test');
        break;
      case 'venue':
        navigate('/venue');
        break;
      case 'fan':
        navigate('/fan');
        break;
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-md p-8 sm:p-10 bg-[#1e1e2f] text-white rounded-2xl shadow-2xl border border-purple-700 animate-fade-in flex flex-col gap-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-purple-300">
          Escolha seu Dashboard 🎧
        </h2>

        <button
          type="button"
          onClick={() => handleAccess('artist')}
          disabled={disabled}
          className="w-full py-3 rounded-xl bg-[#6600cc] hover:bg-[#7f32cc] text-white font-semibold text-lg shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Acessar Dashboard Artista
        </button>

        <button
          type="button"
          onClick={() => handleAccess('venue')}
          disabled={disabled}
          className="w-full py-3 rounded-xl bg-[#4b5563] hover:bg-[#6b7280] text-white font-semibold text-lg shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Acessar Dashboard Empresas
        </button>

        <button
          type="button"
          onClick={() => handleAccess('fan')}
          disabled={disabled}
          className="w-full py-3 rounded-xl bg-[#9f7aea] hover:bg-[#b794f4] text-white font-semibold text-lg shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Acessar Dashboard Fan
        </button>
      </div>
    </div>
  );
};

export default DashboardAccessButtons;
