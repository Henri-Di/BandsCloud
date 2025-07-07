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
    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2b2b2b] text-white rounded-2xl shadow-xl p-6 space-y-5 border border-[#6600cc]/50 hover:shadow-purple-700/30 transition-all duration-300 hover:scale-[1.02]">
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
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#6600cc] hover:bg-[#7a3aff] text-white text-sm font-medium transition-all shadow-md"
          aria-label={`Seguir ${name} de volta`}
        >
          <FiUserPlus />
          Seguir de volta
        </button>

        <button
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#6600cc] text-white text-sm font-medium hover:bg-[#6600cc]/10 transition-all shadow-sm"
          aria-label={`Enviar mensagem para ${name}`}
        >
          <FiMessageCircle />
          Mensagem
        </button>

        <button
          onClick={onViewProfile}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#6600cc] text-white text-sm font-medium hover:bg-[#6600cc]/20 transition-all shadow-sm"
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
              className={`text-xl px-2 py-1 rounded-lg border transition-all duration-300
                ${
                  isSelected
                    ? "bg-[#6600cc]/20 border-[#6600cc] shadow-inner scale-105"
                    : "border-transparent hover:bg-[#6600cc]/10 opacity-80 hover:opacity-100"
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
            className="flex items-center gap-2 mt-3 text-sm text-purple-300 bg-[#6600cc]/10 border border-[#6600cc] px-4 py-2 rounded-lg animate-pulse"
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
