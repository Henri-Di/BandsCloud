// src/components/shared/LoadingSpinner.tsx
import { FiCloud } from "react-icons/fi";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white animate-fade-in">
      <div className="flex flex-col items-center space-y-6">
        {/* Ícone da nuvem com rotação */}
        <div className="animate-spin-slow">
          <FiCloud size={64} className="text-primary drop-shadow-lg" />
        </div>

        {/* Texto animado */}
        <h2 className="text-xl sm:text-2xl font-semibold text-accent animate-pulse">
          Carregando o som das nuvens...
        </h2>

        {/* Barra de progresso falsa animada */}
        <div className="relative w-64 h-2 rounded-full bg-purple-900/40 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent animate-loading-bar rounded-full" />
        </div>
      </div>
    </div>
  );
}
