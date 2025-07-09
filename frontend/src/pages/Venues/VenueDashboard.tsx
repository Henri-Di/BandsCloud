import { FiUsers, FiCloud, FiMusic } from "react-icons/fi";
import Navbar from "../../components/shared/NavbarVenue";
import Footer from "../../components/shared/Footer";
import { useNavigate } from "react-router-dom";

export default function VenueDashboard() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#2a2a2a] text-white min-h-screen flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Ícones flutuantes suaves no fundo */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <FiCloud className="absolute top-10 left-5 text-white/10 animate-cloud float-animation delay-0" size={100} />
        <FiCloud className="absolute top-32 right-10 text-white/10 animate-cloud float-animation delay-2000" size={120} />
        <FiCloud className="absolute bottom-10 left-1/3 text-white/10 animate-cloud float-animation delay-1000" size={90} />
        <FiMusic className="absolute top-20 left-1/4 text-white/10 animate-cloud float-animation delay-1500" size={80} />
        <FiMusic className="absolute bottom-20 right-1/5 text-white/10 animate-cloud float-animation delay-2500" size={70} />
        <FiUsers className="absolute top-1/2 right-1/3 text-white/10 animate-cloud float-animation delay-3000" size={90} />
      </div>

      <main className="flex-grow flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 relative z-10 text-center max-w-3xl mx-auto">
        <FiUsers className="mb-6 text-purple-400 animate-pulse" size={80} />
        <h1 className="text-4xl sm:text-5xl font-extrabold text-purple-300 mb-4 animate-fadeInDown">
          Página em Construção
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 max-w-xl mb-8 animate-fadeInUp">
          Estamos trabalhando para criar a melhor experiência para você, fã! 
          Em breve, você poderá acessar funcionalidades incríveis e se conectar ainda mais com seus artistas favoritos.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 transition rounded-md text-white font-semibold shadow-lg animate-bounce"
        >
          Voltar para Home
        </button>
      </main>

      <Footer />
    </div>
  );
}
