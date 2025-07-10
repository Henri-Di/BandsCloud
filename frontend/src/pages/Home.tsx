import { useState, useEffect } from "react";
import React from "react";
import {
  FiMusic,
  FiUsers,
  FiBriefcase,
  FiHeadphones,
  FiCloud,
  FiStar,
  FiPlay,
  FiLogIn,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/shared/NavbarHome";
import Footer from "../components/shared/Footer";
import LoadingSpinnerHome from "../components/shared/LoadingSpinnerHome";

import "../styles/OverView.css";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinnerHome />;
  }

  return (
    <div className="relative bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#2a2a2a] text-white min-h-screen flex flex-col overflow-hidden">
      <Navbar />

      {/* Background icons */}
      <div
        className="absolute inset-0 z-0 pointer-events-none select-none"
        aria-hidden="true"
      >
        {[...Array(6)].map((_, i) => (
          <FiCloud
            key={`cloud-${i}`}
            className="absolute text-white/10 animate-cloud float-animation"
            style={{
              top: `${10 + i * 10}%`,
              left: i % 2 === 0 ? "10%" : "80%",
              animationDelay: `${i * 0.5}s`,
              fontSize: `${90 - i * 5}px`,
            }}
          />
        ))}
        {[...Array(6)].map((_, i) => (
          <FiMusic
            key={`music-${i}`}
            className="absolute text-white/10 animate-cloud float-animation"
            style={{
              top: `${20 + i * 7}%`,
              left: i % 2 === 0 ? "30%" : "70%",
              animationDelay: `${i * 0.7}s`,
              fontSize: `${80 - i * 6}px`,
            }}
          />
        ))}
        {[...Array(6)].map((_, i) => (
          <FiHeadphones
            key={`phones-${i}`}
            className="absolute text-white/10 animate-cloud float-animation"
            style={{
              top: `${15 + i * 8}%`,
              left: i % 2 === 0 ? "20%" : "60%",
              animationDelay: `${i * 0.6}s`,
              fontSize: `${75 - i * 4}px`,
            }}
          />
        ))}
      </div>

      <main className="relative z-10 pt-28 px-4 sm:px-8 pb-20 max-w-7xl mx-auto space-y-32">
        {/* Hero */}
        <section
          className="text-center space-y-6 select-none"
          aria-label="Introdução à plataforma BandsCloud"
        >
          <div
            className="inline-flex justify-center items-center gap-3 text-purple-400 text-5xl sm:text-6xl font-bold animate-fade-in cursor-default group"
            tabIndex={-1}
          >
            <FiCloud
              size={48}
              className="transition-transform duration-700 group-hover:scale-110 group-hover:text-purple-300"
              aria-hidden="true"
            />
            <span className="select-text">BandsCloud</span>
          </div>
          <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Conectando{" "}
            <span className="text-purple-300 font-semibold">artistas independentes</span>,{" "}
            <span className="text-purple-300 font-semibold">espaços culturais</span> e{" "}
            <span className="text-purple-300 font-semibold">fãs de música</span> em uma só plataforma.
          </p>
        </section>

        {/* Seção botão Login */}
        <section
          className="flex justify-center"
          aria-label="Botão para acessar a página de login"
        >
          <button
          type="button"
          onClick={() => navigate("/login")}
          className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 hover:scale-105
             active:scale-95 focus:bg-purple-800
             text-white font-semibold px-8 py-4 rounded-full shadow-lg
             transition transform duration-300 focus:outline-none focus:ring-4 focus:ring-purple-500/60
             select-none text-lg"
           aria-label="Acessar página de login"
        >
          <FiLogIn size={24} aria-hidden="true" />
            Entrar na sua conta
         </button>

        </section>

        {/* Seções de destaque */}
        <section
          className="grid md:grid-cols-3 gap-10 text-center"
          aria-label="Seções para Artistas, Espaços Culturais e Fãs"
        >
          {[
            {
              icon: <FiPlay />,
              title: "Para Artistas",
              desc: "Compartilhe sua música, gerencie shows e conecte-se com fãs de verdade. Crie playlists e mantenha sua presença artística atualizada.",
              btnIcon: <FiMusic />,
              btnText: "Artistas",
            },
            {
              icon: <FiBriefcase />,
              title: "Para Espaços Culturais",
              desc: "Cadastre eventos, descubra talentos e promova experiências únicas com artistas independentes de todo o país.",
              btnIcon: <FiBriefcase />,
              btnText: "Eventos e Shows",
            },
            {
              icon: <FiUsers />,
              title: "Para Fãs",
              desc: "Descubra novas bandas, siga seus artistas preferidos e participe de eventos incríveis na sua cidade.",
              btnIcon: <FiUsers />,
              btnText: "Fãs",
            },
          ].map(({ icon, title, desc, btnIcon, btnText }, idx) => (
            <article
              key={idx}
              tabIndex={0}
              role="button"
              className="group bg-[#1f1f1f] rounded-2xl p-8 shadow-xl border border-purple-700
                         hover:scale-[1.03] hover:border-purple-500 transition duration-300
                         flex flex-col items-center cursor-pointer
                         focus:outline-none focus:ring-4 focus:ring-purple-500/50"
              aria-pressed="false"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.currentTarget.click();
                }
              }}
              onClick={() => alert(`Você clicou na seção: ${title}`)}
            >
              <div
                className="text-purple-400 mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ fontSize: "3rem" }}
                aria-hidden="true"
              >
                {icon}
              </div>
              <h3 className="text-2xl font-bold text-purple-300 mb-3 group-hover:text-purple-400 transition">
                {title}
              </h3>
              <p className="text-white/80 text-sm mb-6 group-hover:text-white transition leading-relaxed">
                {desc}
              </p>
              <button
                type="button"
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 active:scale-95
                           focus:outline-none focus:ring-4 focus:ring-purple-500/50 text-white
                           font-medium px-6 py-2 rounded-full shadow-sm hover:shadow-md transition"
                onClick={(e) => {
                  e.stopPropagation();
                  alert(`Botão ${btnText} clicado!`);
                }}
                aria-label={`Botão para ${btnText}`}
              >
                {btnIcon}
                {btnText}
              </button>
            </article>
          ))}
        </section>

        {/* Recursos da plataforma */}
        <section
          className="space-y-8 text-center"
          aria-label="Recursos do BandsCloud"
        >
          <h2 className="flex justify-center items-center gap-2 text-3xl sm:text-4xl font-bold text-purple-300 select-none">
            <FiStar
              size={32}
              className="text-purple-400 animate-pulse"
              aria-hidden="true"
            />
            Recursos do BandsCloud
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {[
              {
                icon: <FiMusic />,
                title: "Streaming de Músicas",
                desc: "Ouça e compartilhe músicas diretamente na plataforma.",
              },
              {
                icon: <FiBriefcase />,
                title: "Oportunidades Culturais",
                desc: "Eventos, shows e feiras abertas para inscrição.",
              },
              {
                icon: <FiUsers />,
                title: "Comunidade de Fãs",
                desc: "Construa sua base de seguidores e receba apoio.",
              },
              {
                icon: <FiHeadphones />,
                title: "Playlists Personalizadas",
                desc: "Monte playlists e compartilhe com o público.",
              },
              {
                icon: <FiStar />,
                title: "Destaques e Rankings",
                desc: "Artistas em alta ganham destaque na home.",
              },
              {
                icon: <FiCloud />,
                title: "Ambiente Seguro e Escalável",
                desc: "Plataforma em nuvem com desempenho otimizado.",
              },
            ].map((item, idx) => (
              <article
                key={idx}
                tabIndex={0}
                role="button"
                className="bg-[#2a2a2a] rounded-xl p-6 shadow border border-purple-700
                           flex flex-col items-center gap-4 hover:shadow-lg hover:border-purple-400
                           hover:scale-[1.05] transition-transform duration-300 cursor-pointer
                           focus:outline-none focus:ring-4 focus:ring-purple-500/60"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.currentTarget.click();
                  }
                }}
                onClick={() => alert(`Recurso selecionado: ${item.title}`)}
              >
                <div
                  className="text-purple-400 flex justify-center items-center mb-2"
                  style={{ fontSize: "3rem" }}
                  aria-hidden="true"
                >
                  {React.cloneElement(item.icon, {
                    className: "transition-transform duration-300 hover:scale-110",
                  })}
                </div>
                <h3 className="text-lg font-semibold text-purple-300 text-center mb-2">
                  {item.title}
                </h3>
                <p className="text-white/80 text-sm text-center max-w-xs leading-relaxed">
                  {item.desc}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Planos de Cadastro Mensais */}
        <section
          className="space-y-8 text-center"
          aria-label="Planos de Cadastro Mensais"
        >
          <h2 className="flex justify-center items-center gap-2 text-3xl sm:text-4xl font-bold text-purple-300 select-none mb-10">
            <FiPlay
              size={32}
              className="text-purple-400 animate-pulse"
              aria-hidden="true"
            />
            Pacotes Premium
          </h2>
          <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto px-4 sm:px-8">
            {[
              {
                icon: <FiMusic />,
                title: "Plano para Artistas",
                features: [
                  "Cadastro ilimitado de músicas e playlists",
                  "Gerenciamento de shows e eventos",
                  "Interação direta com fãs",
                  "Relatórios de audiência e engajamento",
                ],
              },
              {
                icon: <FiBriefcase />,
                title: "Plano para Espaços Culturais",
                features: [
                  "Publicação ilimitada de eventos e shows",
                  "Busca avançada por artistas",
                  "Gerenciamento de ingressos",
                  "Promoção em destaque na plataforma",
                ],
              },
              {
                icon: <FiUsers />,
                title: "Plano para Usuários (Fãs)",
                features: [
                  "Acesso a playlists personalizadas",
                  "Seguir artistas favoritos",
                  "Participação em eventos exclusivos",
                  "Receber recomendações personalizadas",
                ],
              },
            ].map(({ icon, title, features }, idx) => (
              <article
                key={idx}
                tabIndex={0}
                role="button"
                className="group bg-[#1f1f1f] rounded-2xl p-8 shadow-xl border border-purple-700
                           hover:scale-[1.03] hover:border-purple-500 transition duration-300
                           flex flex-col items-center cursor-pointer
                           focus:outline-none focus:ring-4 focus:ring-purple-500/50"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.currentTarget.click();
                  }
                }}
                onClick={() => alert(`Plano selecionado: ${title}`)}
              >
                <div
                  className="text-purple-400 mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ fontSize: "3rem" }}
                  aria-hidden="true"
                >
                  {icon}
                </div>
                <h3 className="text-2xl font-bold text-purple-300 mb-6 group-hover:text-purple-400 transition">
                  {title}
                </h3>
                <ul className="text-white/80 text-sm mb-6 text-left list-disc list-inside space-y-2 max-w-md">
                  {features.map((feature, i) => (
                    <li
                      key={i}
                      className="group-hover:text-white transition leading-relaxed"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 active:scale-95
                             focus:outline-none focus:ring-4 focus:ring-purple-500/50 text-white
                             font-medium px-6 py-2 rounded-full shadow-sm hover:shadow-md transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`Assinar plano: ${title}`);
                  }}
                  aria-label={`Botão para assinar o ${title}`}
                >
                  Assinar
                </button>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
