import { FiTarget, FiZap, FiUsers } from "react-icons/fi";

export default function MissionSection() {
  return (
    <section className="bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-white py-20 px-6 md:px-20 relative overflow-hidden">
      {/* Ícones decorativos flutuantes */}
      <FiTarget className="absolute top-10 left-8 text-violet-600 opacity-20 w-12 h-12 animate-float-slow" />
      <FiZap className="absolute top-24 right-10 text-violet-500 opacity-25 w-16 h-16 animate-float" />
      <FiUsers className="absolute bottom-12 left-12 text-violet-700 opacity-15 w-14 h-14 animate-float-slow delay-2000" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-5xl font-extrabold text-violet-500 mb-12 tracking-wide drop-shadow-lg">
          Nossa Missão
        </h2>

        <div className="space-y-12 text-left text-lg leading-relaxed text-white/90">
          {[{
            icon: <FiTarget className="w-6 h-6 animate-pulse" />,
            title: "Fortalecer a música independente",
            text: `O BandsCloud nasceu da necessidade de fortalecer e conectar os pilares da música independente: artistas,
                    espaços culturais e fãs. Nossa missão é proporcionar um ecossistema digital integrado, onde cada
                    participante da cena musical tenha voz, visibilidade e acesso a oportunidades reais.`,
          }, {
            icon: <FiZap className="w-6 h-6 animate-pulse" />,
            title: "Tecnologia com propósito",
            text: `Acreditamos que o talento local é um ativo cultural poderoso e que, com a tecnologia certa, é possível
                    potencializar esse movimento com autenticidade e propósito. Queremos ser mais que uma vitrine, queremos
                    ser um catalisador de conexões humanas e artísticas.`,
          }, {
            icon: <FiUsers className="w-6 h-6 animate-pulse" />,
            title: "Cena musical inclusiva e sustentável",
            text: `Ao aproximar músicos de espaços culturais e do público que os acompanha, contribuímos para a construção
                    de uma cena musical vibrante, inclusiva e sustentável, democratizando o acesso à cultura musical.`,
          }].map(({ icon, title, text }, idx) => (
            <div
              key={idx}
              className="group cursor-default select-none rounded-lg p-6 hover:bg-violet-900/30 transition-all duration-300 shadow-md"
            >
              <h3 className="inline-flex items-center gap-3 text-violet-400 font-semibold mb-4 group-hover:text-violet-300">
                {icon}
                {title}
              </h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
