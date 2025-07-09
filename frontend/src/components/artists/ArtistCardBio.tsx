import {
  FiSettings,
  FiEdit3,
  FiLock,
  FiBell,
} from "react-icons/fi";
import React from "react";

interface ProfileSettingsCardProps {
  userName: string;
  email: string;
  onEditProfile: () => void;
  onChangePassword: () => void;
  onPrivacySettings: () => void;
  onNotificationSettings: () => void;
  logoutButton?: React.ReactNode; // recebe componente logout customizado
}

const ProfileSettingsCard: React.FC<ProfileSettingsCardProps> = ({
  userName,
  email,
  onEditProfile,
  onChangePassword,
  onPrivacySettings,
  onNotificationSettings,
  logoutButton,
}) => {
  return (
    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2b2b2b] text-white rounded-2xl shadow-xl p-6 space-y-6 border border-[#6600cc]/50 hover:shadow-[0_0_20px_#7a3aff80] transition-all duration-300 hover:scale-[1.02] max-w-full mx-auto sm:max-w-lg md:max-w-3xl">
      {/* Cabeçalho com nome e email */}
      <div className="flex flex-col gap-1 mb-4 max-w-full">
        <h3 className="text-2xl font-bold text-[#6600cc] tracking-tight truncate">{userName}</h3>
        <p className="text-sm text-gray-400 truncate">{email}</p>
      </div>

      {/* Container horizontal dos botões */}
      <div className="flex flex-wrap sm:flex-nowrap gap-4 overflow-x-auto sm:overflow-visible py-2 no-scrollbar">
        <button
          onClick={onEditProfile}
          className="flex-shrink-0 flex items-center gap-3 px-5 py-3 rounded-xl bg-[#6600cc] hover:bg-[#d9c9ff] text-[#1a1a1a] text-base font-semibold transition-colors shadow-md whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-1"
          aria-label="Editar perfil"
          type="button"
        >
          <FiEdit3 size={20} />
          Editar Perfil
        </button>

        <button
          onClick={onChangePassword}
          className="flex-shrink-0 flex items-center gap-3 px-5 py-3 rounded-xl border border-[#6600cc] text-white text-base font-medium hover:bg-[#f0eaff] hover:text-[#6600cc] transition-colors shadow-sm whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-1"
          aria-label="Alterar senha"
          type="button"
        >
          <FiLock size={20} />
          Alterar Senha
        </button>

        <button
          onClick={onPrivacySettings}
          className="flex-shrink-0 flex items-center gap-3 px-5 py-3 rounded-xl border border-[#6600cc] text-white text-base font-medium hover:bg-[#f0eaff] hover:text-[#6600cc] transition-colors shadow-sm whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-1"
          aria-label="Configurações de privacidade"
          type="button"
        >
          <FiSettings size={20} />
          Privacidade
        </button>

        <button
          onClick={onNotificationSettings}
          className="flex-shrink-0 flex items-center gap-3 px-5 py-3 rounded-xl border border-[#6600cc] text-white text-base font-medium hover:bg-[#f0eaff] hover:text-[#6600cc] transition-colors shadow-sm whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-1"
          aria-label="Configurações de notificações"
          type="button"
        >
          <FiBell size={20} />
          Notificações
        </button>

        {/* Aqui renderiza o botão de logout passado como prop */}
        {logoutButton}
      </div>
    </div>
  );
};

export default ProfileSettingsCard;
