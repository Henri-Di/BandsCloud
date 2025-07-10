import { FiShield, FiUsers, FiTrendingUp } from "react-icons/fi";

export default function ValuesSection() {
  return (
    <section className="bg-gradient-to-tr from-gray-800 via-gray-900 to-gray-800 text-white py-20 px-6 md:px-20 relative overflow-hidden">
      {/* Ícones decorativos flutuantes */}
      <FiShield className="absolute top-8 right-10 text-violet-600 opacity-20 w-14 h-14 animate-float-slow" />
      <FiUsers className="absolute bottom-10 left-10 text-violet-500 opacity-25 w-16 h-16 animate-float delay-1000" />
      <FiTrendingUp className="absolute top-24 left-8 text-violet-700 opacity-15 w-12 h-12 animate-float-slow delay-2000" />

      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-5xl font-extrabold text-violet-500 mb-10 tracking-wide drop-shadow-lg text-center">
          Nossos Valores
        </h2>

        <div className="space-y-10 text-left text-lg leading-relaxed text-white/90">
          <div className="group cursor-default select-none rounded-lg p-4 hover:bg-violet-900/30 transition-all duration-300">
            <h3 className="flex items-center gap-3 text-violet-400 font-semibold mb-2">
              <FiShield className="w-6 h-6 animate-pulse group-hover:text-violet-300" />
              Autenticidade e Diversidade
            </h3>
            <p>
              O BandsCloud se fundamenta em valores que priorizam a autenticidade, a diversidade e a colaboração.
              Nosso compromisso é com uma cultura digital ética e transparente, que valoriza os processos criativos
              e respeita a pluralidade de expressões musicais.
            </p>
          </div>

          <div className="group cursor-default select-none rounded-lg p-4 hover:bg-violet-900/30 transition-all duration-300">
            <h3 className="flex items-center gap-3 text-violet-400 font-semibold mb-2">
              <FiUsers className="w-6 h-6 animate-pulse group-hover:text-violet-300" />
              Respeito e Colaboração
            </h3>
            <p>
              Valorizamos o respeito mútuo, a construção coletiva e o impacto social positivo que a música pode gerar.
              Promovemos um ambiente onde artistas, espaços culturais e fãs caminham lado a lado, impulsionando uns
              aos outros.
            </p>
          </div>

          <div className="group cursor-default select-none rounded-lg p-4 hover:bg-violet-900/30 transition-all duration-300">
            <h3 className="flex items-center gap-3 text-violet-400 font-semibold mb-2">
              <FiTrendingUp className="w-6 h-6 animate-pulse group-hover:text-violet-300" />
              Inovação e Empatia
            </h3>
            <p>
              A inovação constante é parte do nosso DNA. Buscamos soluções criativas que otimizem a experiência dos
              usuários, sem abrir mão da empatia e da escuta ativa no desenvolvimento da plataforma.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
