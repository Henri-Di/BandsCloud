import { FiCloud, FiMusic } from "react-icons/fi";

export default function LoadingLogout() {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-950 text-white overflow-hidden">
      {/* Ícones flutuantes no background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Nuvens */}
        <FiCloud
          className="absolute top-10 left-5 text-white/10 animate-cloud float-animation delay-0"
          size={100}
        />
        <FiCloud
          className="absolute top-32 right-10 text-white/10 animate-cloud float-animation delay-2000"
          size={120}
        />
        <FiCloud
          className="absolute bottom-10 left-1/3 text-white/10 animate-cloud float-animation delay-1000"
          size={90}
        />
        <FiCloud
          className="absolute top-1/4 left-1/2 text-white/10 animate-cloud float-animation delay-2500"
          size={110}
        />
        <FiCloud
          className="absolute bottom-1/3 right-1/4 text-white/10 animate-cloud float-animation delay-3500"
          size={95}
        />
        <FiCloud
          className="absolute top-3/4 left-1/4 text-white/10 animate-cloud float-animation delay-1500"
          size={80}
        />

        {/* Ícones de música */}
        <FiMusic
          className="absolute top-20 left-1/4 text-white/10 animate-cloud float-animation delay-1500"
          size={80}
        />
        <FiMusic
          className="absolute bottom-20 right-1/5 text-white/10 animate-cloud float-animation delay-2500"
          size={70}
        />
        <FiMusic
          className="absolute top-1/3 right-1/3 text-white/10 animate-cloud float-animation delay-3000"
          size={60}
        />
        <FiMusic
          className="absolute bottom-1/4 left-1/5 text-white/10 animate-cloud float-animation delay-4000"
          size={90}
        />
        <FiMusic
          className="absolute top-2/3 right-1/4 text-white/10 animate-cloud float-animation delay-1000"
          size={75}
        />
      </div>

      {/* Conteúdo central */}
      <div className="z-10 flex flex-col items-center space-y-8 text-center max-w-xs mx-auto">
        <div className="animate-spin-slower">
          <FiCloud size={72} className="text-[#7c4dff] drop-shadow-xl" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#a076ff] drop-shadow-md animate-pulse">
          Saindo do BandsCloud...
        </h2>

        <div className="relative w-64 h-2 rounded-full bg-purple-900/40 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#6600cc] to-[#9c6cff] animate-loading-bar rounded-full" />
        </div>
      </div>
    </div>
  );
}
