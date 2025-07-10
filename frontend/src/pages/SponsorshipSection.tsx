import { FiUsers, FiStar, FiAward } from "react-icons/fi";

export default function SponsorshipSection() {
  return (
    <section className="bg-gradient-to-tr from-gray-900 via-gray-950 to-gray-900 text-white py-20 px-6 md:px-20 relative overflow-hidden">
      {/* Ícones decorativos flutuantes */}
      <FiUsers className="absolute top-12 left-10 text-violet-600 opacity-20 w-16 h-16 animate-float-slow" />
      <FiStar className="absolute bottom-14 right-14 text-violet-500 opacity-25 w-14 h-14 animate-float delay-1000" />
      <FiAward className="absolute top-24 right-8 text-violet-700 opacity-15 w-12 h-12 animate-float-slow delay-2000" />

      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-5xl font-extrabold text-violet-500 mb-10 tracking-wide drop-shadow-lg text-center">
          Patrocínios e Parcerias
        </h2>

        <div className="space-y-10 text-left text-lg leading-relaxed text-white/90">
          <div className="group cursor-default select-none rounded-lg p-4 hover:bg-violet-900/30 transition-all duration-300">
            <h3 className="flex items-center gap-3 text-violet-400 font-semibold mb-2">
              <FiUsers className="w-6 h-6 animate-pulse group-hover:text-violet-300" />
              Alianças Estratégicas
            </h3>
            <p>
              Reconhecemos que fortalecer a cena musical independente depende de alianças estratégicas e investimentos
              comprometidos com a cultura. Abrimos espaço para parcerias com empresas e iniciativas que compartilham
              nossa visão.
            </p>
          </div>

          <div className="group cursor-default select-none rounded-lg p-4 hover:bg-violet-900/30 transition-all duration-300">
            <h3 className="flex items-center gap-3 text-violet-400 font-semibold mb-2">
              <FiStar className="w-6 h-6 animate-pulse group-hover:text-violet-300" />
              Visibilidade Qualificada
            </h3>
            <p>
              Patrocinar o BandsCloud é apoiar novos talentos e produção cultural local, além de associar marcas a um
              projeto inovador, plural e alinhado às novas formas de consumo cultural.
            </p>
          </div>

          <div className="group cursor-default select-none rounded-lg p-4 hover:bg-violet-900/30 transition-all duration-300">
            <h3 className="flex items-center gap-3 text-violet-400 font-semibold mb-2">
              <FiAward className="w-6 h-6 animate-pulse group-hover:text-violet-300" />
              Parcerias Personalizadas
            </h3>
            <p>
              Nossas parcerias são pensadas de forma personalizada, garantindo que cada colaboração respeite a identidade
              da marca e contribua genuinamente para fortalecer o ecossistema musical independente.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
