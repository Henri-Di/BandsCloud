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
    <div
      className="
        bg-gradient-to-br from-[#121212] to-[#1e1e2f] text-white rounded-2xl
        border border-purple-700/60 shadow-[0_0_24px_#9c7cffaa]
        p-6 space-y-5
        hover:shadow-[0_0_40px_#9c7cffcc] hover:scale-[1.03]
        transition-all duration-300
      "
    >
      {/* Cabeçalho com nome e data */}
      <div className="flex justify-between items-center select-none">
        <h3 className="text-xl font-bold text-purple-400 tracking-tight flex items-center gap-2">
          <FiUser />
          {name}
        </h3>
        <div className="flex items-center gap-1 text-sm text-gray-400">
          <FiCalendar />
          <span>Desde {since}</span>
        </div>
      </div>

      {/* Localização */}
      <div className="flex items-center gap-2 text-sm text-gray-300 select-none">
        <FiMapPin className="text-purple-400" />
        <span>{location}</span>
      </div>

      {/* Bio */}
      {bio && (
        <p className="text-sm text-gray-400 leading-relaxed border-l-4 border-purple-400 pl-4 italic select-text">
          {bio}
        </p>
      )}

      {/* Botões de ação */}
      <div className="flex flex-wrap gap-3 mt-4">
        <button
          className="
            flex items-center gap-2 px-4 py-2 rounded-xl
            bg-purple-700 hover:bg-purple-400 text-white text-sm font-medium
            transition-all shadow-md
            focus:outline-none focus:ring-2 focus:ring-purple-400
            select-none cursor-pointer
          "
          aria-label={`Seguir ${name} de volta`}
          type="button"
        >
          <FiUserPlus />
          Seguir de volta
        </button>

        <button
          className="
            flex items-center gap-2 px-4 py-2 rounded-xl border border-purple-700
            text-white text-sm font-medium
            hover:bg-purple-400/20 transition-all shadow-sm
            focus:outline-none focus:ring-2 focus:ring-purple-400
            select-none cursor-pointer
          "
          aria-label={`Enviar mensagem para ${name}`}
          type="button"
        >
          <FiMessageCircle />
          Mensagem
        </button>

        <button
          onClick={onViewProfile}
          className="
            flex items-center gap-2 px-4 py-2 rounded-xl border border-purple-700
            text-white text-sm font-medium
            hover:bg-purple-400/30 transition-all shadow-sm
            focus:outline-none focus:ring-2 focus:ring-purple-400
            select-none cursor-pointer
          "
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
              className={`
                text-xl px-3 py-1 rounded-lg border transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-purple-400
                ${
                  isSelected
                    ? "bg-purple-400/40 border-purple-400 shadow-inner scale-105"
                    : "border-transparent hover:bg-purple-400/20 opacity-80 hover:opacity-100"
                }
              `}
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
            className="
              flex items-center gap-2 mt-3 text-sm text-purple-300
              bg-purple-400/20 border border-purple-400 px-4 py-2 rounded-lg
              animate-pulse select-none
            "
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
