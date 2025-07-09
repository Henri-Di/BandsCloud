import {
  FiUser,
  FiMapPin,
  FiCalendar,
  FiMessageCircle,
  FiUserPlus,
  FiEye,
} from "react-icons/fi";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FanCardProps {
  name: string;
  location: string;
  since: string;
  bio?: string;
  onViewProfile?: () => void;
}

const FanCard: React.FC<FanCardProps> = ({
  name,
  location,
  since,
  bio,
  onViewProfile,
}) => {
  const [reaction, setReaction] = useState<string | null>(null);

  const handleReaction = (emoji: string) => {
    setReaction(emoji === reaction ? null : emoji);
  };

  return (
    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2b2b2b] text-white rounded-2xl shadow-xl p-6 space-y-5 border border-[#6600cc]/50 hover:shadow-[0_0_15px_#7a3aff80] transition-all duration-300 hover:scale-[1.02]">
      {/* Cabeçalho com nome e data */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-[#6600cc] tracking-tight flex items-center gap-2">
          <FiUser />
          {name}
        </h3>
        <div className="flex items-center gap-1 text-sm text-gray-400">
          <FiCalendar />
          <span>Desde {since}</span>
        </div>
      </div>

      {/* Localização */}
      <div className="flex items-center gap-2 text-sm text-gray-300">
        <FiMapPin className="text-[#6600cc]" />
        <span>{location}</span>
      </div>

      {/* Bio */}
      {bio && (
        <p className="text-sm text-gray-400 leading-relaxed border-l-4 border-[#6600cc] pl-4 italic">
          {bio}
        </p>
      )}

      {/* Botões de ação */}
      <div className="flex flex-wrap gap-3 mt-4">
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#6600cc] hover:bg-[#b285ff] text-white text-sm font-medium transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          aria-label={`Seguir ${name} de volta`}
          type="button"
        >
          <FiUserPlus />
          Seguir de volta
        </button>

        <button
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#6600cc] text-white text-sm font-medium hover:bg-[#b285ff]/20 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          aria-label={`Enviar mensagem para ${name}`}
          type="button"
        >
          <FiMessageCircle />
          Mensagem
        </button>

        <button
          onClick={onViewProfile}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#6600cc] text-white text-sm font-medium hover:bg-[#b285ff]/30 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          aria-label={`Ver perfil de ${name}`}
          type="button"
        >
          <FiEye />
          Ver Perfil
        </button>
      </div>

      {/* Reações com emojis usando motion */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {["🎵", "❤️", "👏", "🔥", "😍", "🤘", "💯", "😎", "🎤"].map((emoji) => {
          const isSelected = reaction === emoji;

          return (
            <motion.button
              key={emoji}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleReaction(emoji)}
              title={`Reagir com ${emoji}`}
              aria-label={`Reagir com ${emoji}`}
              aria-pressed={isSelected}
              type="button"
              className={`text-xl px-3 py-1 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400
                ${
                  isSelected
                    ? "bg-[#b285ff]/40 border-[#b285ff] shadow-inner scale-105"
                    : "border-transparent hover:bg-[#b285ff]/20 opacity-80 hover:opacity-100"
                }`}
            >
              {emoji}
            </motion.button>
          );
        })}
      </div>

      {/* Reação selecionada com animação */}
      <AnimatePresence>
        {reaction && (
          <motion.div
            key={reaction}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 mt-3 text-sm text-purple-300 bg-[#b285ff]/20 border border-[#b285ff] px-4 py-2 rounded-lg animate-pulse"
          >
            <span className="text-lg">{reaction}</span>
            <span className="italic">Você reagiu com {reaction}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FanCard;
