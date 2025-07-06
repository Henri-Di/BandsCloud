// src/components/artists/AvailabilityCard.tsx
import { FiCalendar, FiMapPin, FiUsers } from 'react-icons/fi';

interface AvailabilityCardProps {
  date: string;
  location: string;
  type: 'Show' | 'Evento';
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
    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2b2b2b] text-white rounded-2xl shadow-xl p-6 space-y-5 border border-[#6600cc]/50 hover:shadow-purple-700/30 transition-all duration-300 hover:scale-[1.02]">
      
      {/* Cabeçalho */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-[#6600cc] tracking-tight">
          {type}
        </h3>
        <div className="flex items-center gap-1 text-sm text-gray-400">
          <FiCalendar />
          <span>{date}</span>
        </div>
      </div>

      {/* Localização */}
      <div className="flex items-center gap-2 text-sm text-gray-300">
        <FiMapPin className="text-[#6600cc]" />
        <span>{location}</span>
      </div>

      {/* Vagas */}
      <div className="flex items-center gap-2 text-sm text-gray-300">
        <FiUsers className="text-[#6600cc]" />
        <span>
          {slotsAvailable} vaga{slotsAvailable !== 1 && 's'} disponível
        </span>
      </div>

      {/* Descrição (se houver) */}
      {description && (
        <p className="text-sm text-gray-400 leading-relaxed border-l-4 border-[#6600cc] pl-4 italic">
          {description}
        </p>
      )}

      {/* Botão de ação */}
      <button className="w-full mt-4 py-2 px-4 rounded-xl bg-[#6600cc] hover:bg-[#7a3aff] text-white font-medium transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-[#7a3aff]/40">
        Candidatar-se
      </button>
    </div>
  );
};

export default AvailabilityCard;
