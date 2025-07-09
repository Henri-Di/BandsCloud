import React from 'react';
import { useNavigate } from 'react-router-dom';

const waveBase64 =
  "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTQ0MCAzMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PHBhdGggZmlsbD0iIzdhM2FmZiIgZmlsbC1vcGFjaXR5PSIwLjIiIGQ9Ik0wLDIyNEw2MCwxOTcuM0MxMjAsMTcxLDI0MCwxMTcsMzYwLDEyOEM0ODAsMTM5LDYwMCwyMTMsNzIwLDIzNC43Qzg0MCwyNTYsOTYwLDIyNCwxMDgwLDE4Ni43QzEyMDAsMTQ5LDEzMjAsMTA3LDEzODAsODUuM0wxNDQwLDY0VjMyMEgwWiI+PC9wYXRoPjwvc3ZnPg==";

const cloudBase64 =
  "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNjQgNjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIzMCIgcj0iMTAiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuMTUiLz48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxNSIgZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMC4xNSIvPjxjaXJjbGUgY3g9IjQwIiBjeT0iMzAiIHI9IjEwIiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjE1Ii8+PC9zdmc+";

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
    navigate(`/${role === 'artist' ? 'artist-test' : role}`);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black px-4 py-10 sm:px-6 lg:px-8 overflow-hidden">

      {/* 🔵 Wave background */}
      <div
        className="absolute bottom-0 left-0 w-[200%] h-64 bg-repeat-x bg-bottom opacity-10 animate-waveMotion"
        style={{ backgroundImage: `url("${waveBase64}")` }}
      />

      {/* ☁️ Floating clouds */}
      <img
        src={cloudBase64}
        alt="cloud"
        className="absolute top-10 left-10 w-24 animate-cloudFloat opacity-10"
      />
      <img
        src={cloudBase64}
        alt="cloud"
        className="absolute top-20 right-10 w-32 animate-cloudFloat opacity-10"
      />

      {/* 🟣 Content */}
      <div className="relative z-10 w-full max-w-md bg-dark text-white rounded-3xl shadow-[0_0_60px_0_rgba(128,0,255,0.4)] border border-secondary p-6 sm:p-10 animate-fade-in">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-8 text-secondary drop-shadow-md">
          Escolha seu Dashboard 🎧
        </h2>

        <div className="space-y-5">
          <button
            onClick={() => handleAccess('artist')}
            disabled={disabled}
            className="w-full py-3 md:py-3.5 rounded-xl bg-primary hover:bg-secondary text-white font-semibold text-base md:text-lg shadow-lg transition-all duration-300 transform hover:scale-[1.04] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🎤 Acessar Dashboard Artista
          </button>

          <button
            onClick={() => handleAccess('venue')}
            disabled={disabled}
            className="w-full py-3 md:py-3.5 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-semibold text-base md:text-lg shadow-lg transition-all duration-300 transform hover:scale-[1.04] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🏢 Acessar Dashboard Empresa
          </button>

          <button
            onClick={() => handleAccess('fan')}
            disabled={disabled}
            className="w-full py-3 md:py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white font-semibold text-base md:text-lg shadow-lg transition-all duration-300 transform hover:scale-[1.04] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🎧 Acessar Dashboard Fã
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardAccessButtons;
