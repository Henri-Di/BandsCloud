import { FiTool, FiCalendar, FiHeadphones } from "react-icons/fi";

export default function ContributionSection() {
  return (
    <section className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white py-20 px-6 md:px-20 relative overflow-hidden">
      {/* Ícones decorativos flutuantes */}
      <FiTool className="absolute top-12 right-10 text-violet-600 opacity-20 w-16 h-16 animate-float-slow" />
      <FiCalendar className="absolute bottom-14 left-14 text-violet-500 opacity-25 w-14 h-14 animate-float delay-1000" />
      <FiHeadphones className="absolute top-24 left-8 text-violet-700 opacity-15 w-12 h-12 animate-float-slow delay-2000" />

      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-5xl font-extrabold text-violet-500 mb-10 tracking-wide drop-shadow-lg text-center">
          Nossa Contribuição
        </h2>

        <div className="space-y-10 text-left text-lg leading-relaxed text-white/90">
          <div className="group cursor-default select-none rounded-lg p-4 hover:bg-violet-900/30 transition-all duration-300">
            <h3 className="flex items-center gap-3 text-violet-400 font-semibold mb-2">
              <FiTool className="w-6 h-6 animate-pulse group-hover:text-violet-300" />
              Soluções para artistas
            </h3>
            <p>
              O BandsCloud surge como resposta aos desafios da cena independente, oferecendo ferramentas que
              empoderam artistas a divulgar projetos, criar agendas de shows e publicar playlists de forma direta.
            </p>
          </div>

          <div className="group cursor-default select-none rounded-lg p-4 hover:bg-violet-900/30 transition-all duration-300">
            <h3 className="flex items-center gap-3 text-violet-400 font-semibold mb-2">
              <FiCalendar className="w-6 h-6 animate-pulse group-hover:text-violet-300" />
              Conexão com espaços culturais
            </h3>
            <p>
              Oferecemos aos estabelecimentos um ambiente eficiente para encontrar artistas alinhados à sua proposta,
              facilitando curadoria de experiências musicais relevantes e impactantes.
            </p>
          </div>

          <div className="group cursor-default select-none rounded-lg p-4 hover:bg-violet-900/30 transition-all duration-300">
            <h3 className="flex items-center gap-3 text-violet-400 font-semibold mb-2">
              <FiHeadphones className="w-6 h-6 animate-pulse group-hover:text-violet-300" />
              Experiência autêntica para fãs
            </h3>
            <p>
              Para o público, o BandsCloud é uma porta de descoberta musical autêntica, possibilitando apoiar artistas
              locais e participar de uma cena criativa e diversa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
