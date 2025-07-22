import React from 'react';
import {
  FiUser as FiUserIcon,
  FiShield as FiShieldIcon,
  FiFileText as FiFileTextIcon,
} from 'react-icons/fi';

interface PreviewPanelProps {
  photoPreview?: string | null;
  watchName?: string;
  watchBio?: string;
  watchRole?: string;
  className?: string;
}

const getRoleLabel = (role?: string) => {
  if (!role) return '';
  switch (role) {
    case 'ROLE_ARTIST':
      return 'Artista';
    case 'ROLE_VENUE':
      return 'Estabelecimento';
    case 'ROLE_FAN':
      return 'Fã';
    default:
      return role;
  }
};

const PreviewPanel: React.FC<PreviewPanelProps> = ({
  photoPreview,
  watchName,
  watchBio,
  watchRole,
  className,
}) => {
  return (
<aside
  aria-label="Pré-visualização do perfil"
  className={`bg-gradient-to-b from-[#0e0c1a] via-[#1f1c2f] to-[#1c1a2b]
              rounded-3xl shadow-[0_0_60px_0_rgba(128,0,255,0.3)]
              border border-purple-700 p-8
              flex flex-col overflow-y-auto max-h-[80vh]
              scrollbar-custom shadow-scroll-both
              transition-all duration-300 animate-fade-in-up ${className || ''}`}
>
      <h3 className="text-2xl font-bold text-purple-300 mb-8 text-center tracking-wide">
        Pré-visualização do Perfil
      </h3>

      {/* Foto */}
      {photoPreview ? (
        <img
          src={photoPreview}
          alt="Foto de perfil preview"
          className="rounded-full w-36 h-36 object-cover mx-auto mb-10 border-4 border-purple-600 shadow-md"
        />
      ) : (
        <div className="w-36 h-36 rounded-full bg-purple-900/40 mx-auto mb-10 flex items-center justify-center text-purple-600 text-xl font-semibold select-none shadow-inner">
          Sem foto
        </div>
      )}

      {/* Nome */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-purple-400 font-semibold mb-2">
          <FiUserIcon size={20} />
          <span className="tracking-wide uppercase text-sm">Nome</span>
        </div>
        <p className="text-white text-lg font-medium min-h-[28px]">
          {watchName || 'Nome não informado'}
        </p>
      </div>

      {/* Tipo de Perfil */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-purple-400 font-semibold mb-2">
          <FiShieldIcon size={20} />
          <span className="tracking-wide uppercase text-sm">Tipo de Perfil</span>
        </div>
        <p className="text-purple-300 italic font-semibold min-h-[24px]">
          {getRoleLabel(watchRole) || 'Tipo de perfil não selecionado'}
        </p>
      </div>

      {/* Biografia */}
      <div>
        <div className="flex items-center gap-2 text-purple-400 font-semibold mb-2">
          <FiFileTextIcon size={20} />
          <span className="tracking-wide uppercase text-sm">Biografia</span>
        </div>
        <p className="text-gray-300 whitespace-pre-wrap min-h-[72px] leading-relaxed font-light">
          {watchBio || 'Biografia não informada'}
        </p>
      </div>
    </aside>
  );
};

export default PreviewPanel;
