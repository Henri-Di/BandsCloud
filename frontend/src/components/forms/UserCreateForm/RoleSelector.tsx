import React from 'react';
import { FiMic, FiHome, FiHeadphones, FiShield } from 'react-icons/fi';
import type { ControllerRenderProps } from 'react-hook-form';

interface RoleSelectorProps {
  field: ControllerRenderProps<any, string>;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ field }) => {
  const roles = [
    {
      value: 'ROLE_ARTIST',
      icon: <FiMic size={26} />,
      label: 'Artista',
      description: 'Músicos e bandas independentes',
    },
    {
      value: 'ROLE_VENUE',
      icon: <FiHome size={26} />,
      label: 'Estabelecimento',
      description: 'Casas de shows e locais culturais',
    },
    {
      value: 'ROLE_FAN',
      icon: <FiHeadphones size={26} />,
      label: 'Fã',
      description: 'Amantes de música e seguidores',
    },
  ];

  return (
    <div>
      <label className="text-sm font-semibold flex items-center gap-2 text-purple-200 mb-4">
        <FiShield /> Escolha seu tipo de perfil <span className="text-red-500">*</span>
      </label>
      <div className="flex gap-6 justify-center flex-wrap">
        {roles.map(({ value, icon, label, description }) => (
          <button
            key={value}
            type="button"
            onClick={() => field.onChange(value)}
            className={`flex flex-col items-center justify-center gap-2 border rounded-3xl py-5 px-6 min-w-[110px] max-w-[180px] cursor-pointer transition-shadow duration-200
              ${
                field.value === value
                  ? 'border-purple-400 bg-purple-800 shadow-xl'
                  : 'border-gray-700 hover:border-purple-600'
              }`}
            aria-pressed={field.value === value}
            aria-label={`${label}: ${description}`}
          >
            <div
              className={`rounded-full p-2 ${
                field.value === value ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-400'
              }`}
            >
              {icon}
            </div>
            <span className="font-semibold text-white text-lg">{label}</span>
            <span className="text-xs text-gray-300 text-center">{description}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoleSelector;
