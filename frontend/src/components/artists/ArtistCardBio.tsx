// imports mantidos
import {
  FiSettings,
  FiEdit3,
  FiLock,
  FiBell,
  FiX,
  FiImage,
  FiUser,
  FiInfo,
  FiKey,
} from "react-icons/fi";
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProfileSettingsCardProps {
  userName: string;
  email: string;
  bio?: string;
  avatarUrl?: string;
  logoutButton?: React.ReactNode;
}

const ProfileSettingsCard: React.FC<ProfileSettingsCardProps> = ({
  userName,
  email,
  bio,
  avatarUrl,
  logoutButton,
}) => {
  const [activeModal, setActiveModal] = useState<
    null | "edit" | "password" | "privacy" | "notification"
  >(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8081";
  const fullAvatarUrl = avatarUrl
    ? `${API_BASE_URL}/uploads/photos/${avatarUrl}`
    : null;

  useEffect(() => {
    if (activeModal !== null) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [activeModal]);

  const closeModal = () => setActiveModal(null);

  const InputWrapper: React.FC<{ icon: React.ReactNode; children: React.ReactNode }> =
    ({ icon, children }) => (
      <div className="relative flex items-center border border-gray-700 rounded-xl bg-gray-900 hover:border-purple-600 focus-within:border-purple-500 transition-colors shadow-inner">
        <div className="pl-3 text-gray-400">{icon}</div>
        {children}
      </div>
    );

  const EditProfileForm = () => {
    const [name, setName] = useState(userName);
    const [newBio, setNewBio] = useState(bio || "");
    const [image, setImage] = useState<File | null>(null);

    const canSubmit = useMemo(() => {
      return (
        name.trim() !== userName.trim() ||
        newBio.trim() !== (bio || "").trim() ||
        image !== null
      );
    }, [name, newBio, image, userName, bio]);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!canSubmit) return;
      console.log({ name, newBio, image });
      closeModal();
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-semibold text-gray-300 select-none">
            Nome
          </label>
          <InputWrapper icon={<FiUser size={20} />}>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-transparent w-full px-3 py-2 rounded-r-xl text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1 transition"
              placeholder="Seu nome"
              autoComplete="name"
              spellCheck={false}
            />
          </InputWrapper>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="bio" className="text-sm font-semibold text-gray-300 select-none">
            Biografia
          </label>
          <InputWrapper icon={<FiInfo size={20} className="mt-2" />}>
            <textarea
              id="bio"
              value={newBio}
              onChange={(e) => setNewBio(e.target.value)}
              rows={4}
              className="bg-transparent w-full px-3 py-2 rounded-r-xl text-white placeholder-gray-500 resize-none outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1 transition"
              placeholder="Conte um pouco sobre você"
              spellCheck={true}
            />
          </InputWrapper>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="profile-image" className="text-sm font-semibold text-gray-300 select-none">
            Foto de Perfil
          </label>
          <div className="flex items-center gap-3">
            <FiImage className="text-gray-400" size={24} />
            <input
              id="profile-image"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="text-gray-300 file:bg-purple-700 file:text-white file:px-4 file:py-2 file:rounded-xl file:border-0 hover:file:bg-purple-600 cursor-pointer transition"
              aria-label="Selecionar foto de perfil"
            />
            {image && (
              <span title={`Arquivo selecionado: ${image.name}`} className="text-xs text-purple-400 italic truncate max-w-xs">
                {image.name}
              </span>
            )}
          </div>
        </div>

        <div className="text-right">
          <button
            type="submit"
            disabled={!canSubmit}
            className={`px-6 py-3 rounded-xl font-semibold shadow-md transition 
              ${
                canSubmit
                  ? "bg-purple-700 hover:bg-purple-600 text-white shadow-lg shadow-purple-700/40 hover:shadow-purple-600/70 cursor-pointer"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
          >
            Salvar Alterações
          </button>
        </div>
      </form>
    );
  };

  const PasswordForm = () => {
    const [current, setCurrent] = useState("");
    const [newPass, setNewPass] = useState("");
    const canSubmit = current.length >= 6 && newPass.length >= 6;

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!canSubmit) return;
      console.log({ current, newPass });
      closeModal();
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col gap-1">
          <label htmlFor="current-password" className="text-sm font-semibold text-gray-300 select-none">
            Senha Atual
          </label>
          <InputWrapper icon={<FiKey size={20} />}>
            <input
              id="current-password"
              type="password"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              required
              minLength={6}
              className="bg-transparent w-full px-3 py-2 rounded-r-xl text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1 transition"
              placeholder="Sua senha atual"
              autoComplete="current-password"
            />
          </InputWrapper>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="new-password" className="text-sm font-semibold text-gray-300 select-none">
            Nova Senha
          </label>
          <InputWrapper icon={<FiLock size={20} />}>
            <input
              id="new-password"
              type="password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              required
              minLength={6}
              className="bg-transparent w-full px-3 py-2 rounded-r-xl text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1 transition"
              placeholder="Sua nova senha"
              autoComplete="new-password"
            />
          </InputWrapper>
        </div>

        <div className="text-right">
          <button
            type="submit"
            disabled={!canSubmit}
            className={`px-6 py-3 rounded-xl font-semibold shadow-md transition 
              ${
                canSubmit
                  ? "bg-purple-700 hover:bg-purple-600 text-white shadow-lg shadow-purple-700/40 hover:shadow-purple-600/70 cursor-pointer"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
          >
            Atualizar Senha
          </button>
        </div>
      </form>
    );
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.25 } },
    exit: { opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.2 } },
  };

  const renderModal = (title: string, content: React.ReactNode) => (
    <AnimatePresence>
      {activeModal !== null && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm px-4"
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={closeModal}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-3xl p-8 max-w-lg w-full shadow-2xl relative text-white"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-purple-500 rounded"
              aria-label="Fechar modal"
            >
              <FiX size={28} />
            </button>
            <h2 className="text-3xl font-extrabold text-purple-400 mb-6 select-none">
              {title}
            </h2>
            <div>{content}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="
      bg-gradient-to-br from-[#121212] to-[#1e1e2f] text-white rounded-2xl
      p-6 space-y-6 border border-purple-700/60
      shadow-[0_0_14px_#9c7cffaa] hover:shadow-[0_0_14px_#9c7cffcc]
      ring-1 ring-purple-500/40
      transition-all duration-300 hover:scale-[1.03]
      max-w-full mx-auto sm:max-w-lg md:max-w-3xl
    ">
      <div className="flex items-center gap-5 mb-4 max-w-full">
        {fullAvatarUrl ? (
          <img
            src={fullAvatarUrl}
            alt={`${userName} avatar`}
            className="w-20 h-20 rounded-full object-cover border-4 border-purple-600 shadow-lg"
            loading="lazy"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-purple-700 flex items-center justify-center text-4xl font-extrabold uppercase text-white shadow-lg">
            {userName.charAt(0)}
          </div>
        )}
        <div className="flex flex-col truncate">
          <h3 className="text-3xl font-extrabold text-purple-400 tracking-tight truncate">
            {userName}
          </h3>
          <p className="text-sm text-gray-400 truncate">{email}</p>
        </div>
      </div>

      {bio && (
        <p className="
      text-gray-300 text-sm leading-relaxed border-l-4 border-purple-600
      pl-4 italic max-h-28 overflow-y-auto scrollbar-custom shadow-inner shadow-scroll-both
      whitespace-pre-wrap
    ">
          {bio}
        </p>
      )}

      <div className="flex flex-wrap sm:flex-nowrap gap-4 overflow-x-auto sm:overflow-visible py-2 no-scrollbar">
        <button
          onClick={() => setActiveModal("edit")}
          className="flex-shrink-0 flex items-center gap-3 px-6 py-3 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-semibold shadow-lg shadow-purple-700/40 transition-transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-1"
        >
          <FiEdit3 size={20} />
          Editar Perfil
        </button>

        <button
          onClick={() => setActiveModal("password")}
          className="flex-shrink-0 flex items-center gap-3 px-6 py-3 rounded-xl border border-purple-600 text-purple-300 hover:bg-purple-800 hover:text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-1"
        >
          <FiLock size={20} />
          Alterar Senha
        </button>

        <button
          onClick={() => setActiveModal("privacy")}
          className="flex-shrink-0 flex items-center gap-3 px-6 py-3 rounded-xl border border-purple-600 text-purple-300 hover:bg-purple-800 hover:text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-1"
        >
          <FiSettings size={20} />
          Privacidade
        </button>

        <button
          onClick={() => setActiveModal("notification")}
          className="flex-shrink-0 flex items-center gap-3 px-6 py-3 rounded-xl border border-purple-600 text-purple-300 hover:bg-purple-800 hover:text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-1"
        >
          <FiBell size={20} />
          Notificações
        </button>

        {logoutButton && <div className="flex-shrink-0">{logoutButton}</div>}
      </div>

      {/* Modais */}
      {activeModal === "edit" && renderModal("Editar Perfil", <EditProfileForm />)}
      {activeModal === "password" && renderModal("Alterar Senha", <PasswordForm />)}
      {activeModal === "privacy" &&
        renderModal("Privacidade", <p className="text-gray-400 text-sm select-text">Configurações futuras — Em breve você poderá controlar sua privacidade.</p>)}
      {activeModal === "notification" &&
        renderModal("Notificações", <p className="text-gray-400 text-sm select-text">Configurações futuras — Ajuste suas preferências de notificações.</p>)}
    </div>
  );
};

export default ProfileSettingsCard;
