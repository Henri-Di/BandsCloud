import React from 'react';
import { FiMic, FiHome, FiHeadphones } from 'react-icons/fi';

const AccountTypeInfo: React.FC = () => (
  <div className="max-w-4xl w-full mb-10 bg-[#1e1e2f] border border-purple-700 rounded-2xl p-8 text-white shadow-xl">
    <h2 className="text-3xl font-extrabold mb-8 text-purple-300 text-center">
      Tipos de Perfil no BandsCloud
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        {
          icon: <FiMic className="text-purple-400 text-4xl" />,
          title: 'Artista',
          desc: 'Perfil para músicos e bandas independentes.',
        },
        {
          icon: <FiHome className="text-purple-400 text-4xl" />,
          title: 'Estabelecimento',
          desc: 'Para casas de shows e locais culturais.',
        },
        {
          icon: <FiHeadphones className="text-purple-400 text-4xl" />,
          title: 'Fã',
          desc: 'Para amantes de música e seguidores de artistas.',
        },
      ].map(({ icon, title, desc }) => (
        <div
          key={title}
          className="flex flex-col items-center gap-3 p-6 bg-purple-900 rounded-lg shadow-md text-center"
          role="region"
          aria-label={title}
        >
          {icon}
          <h3 className="font-semibold text-xl">{title}</h3>
          <p className="text-gray-300 text-sm">{desc}</p>
        </div>
      ))}
    </div>
  </div>
);

export default AccountTypeInfo;
