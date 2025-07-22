// src/components/artists/AvailabilityCard.tsx
import { FiCalendar, FiMapPin, FiUsers } from "react-icons/fi";

interface AvailabilityCardProps {
  date: string;
  location: string;
  type: "Show" | "Evento";
  slotsAvailable: number;
  description?: string;
}

const AvailabilityCard: React.FC<AvailabilityCardProps> = ({
  date,
  location,
  type,
  slotsAvailable,
  description,
}) => {
  return (
    <div
      className="
        bg-gradient-to-br from-[#121212] to-[#1e1e2f] text-white rounded-2xl
        border border-purple-700/60 shadow-[0_0_24px_#9c7cffaa]
        p-6 space-y-5
        hover:shadow-[0_0_40px_#9c7cffcc] hover:scale-[1.03]
        transition-all duration-300
      "
    >
      {/* Cabeçalho */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-purple-400 tracking-tight select-none">
          {type}
        </h3>
        <div className="flex items-center gap-1 text-sm text-gray-400 select-none">
          <FiCalendar className="text-purple-400" />
          <span>{date}</span>
        </div>
      </div>

      {/* Localização */}
      <div className="flex items-center gap-2 text-sm text-gray-300 select-none">
        <FiMapPin className="text-purple-400" />
        <span>{location}</span>
      </div>

      {/* Vagas */}
      <div className="flex items-center gap-2 text-sm text-gray-300 select-none">
        <FiUsers className="text-purple-400" />
        <span>
          {slotsAvailable} vaga{slotsAvailable !== 1 && "s"} disponível
        </span>
      </div>

      {/* Descrição (se houver) */}
      {description && (
        <p className="text-sm text-gray-400 leading-relaxed border-l-4 border-purple-400 pl-4 italic select-text">
          {description}
        </p>
      )}

      {/* Botão de ação */}
      <button
        className="
          w-full mt-4 py-2 px-4 rounded-xl
          bg-purple-700 hover:bg-purple-400 text-[#1a1a1a]
          font-semibold transition-colors
          shadow-md hover:shadow-[0_0_30px_rgba(156,124,255,0.5)]
          focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-1
          select-none
          cursor-pointer
        "
        type="button"
        aria-label={`Candidatar-se para o ${type} em ${date}`}
      >
        Candidatar-se
      </button>
    </div>
  );
};

export default AvailabilityCard;
