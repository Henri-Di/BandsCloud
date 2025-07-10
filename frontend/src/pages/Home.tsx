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
  FiHeart,
  FiUserPlus,
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

{/* Ícones de fundo flutuantes */}
<div
  className="absolute inset-0 z-0 pointer-events-none select-none"
  aria-hidden="true"
>
  {/* Nuvens (25) */}
  {[...Array(25)].map((_, i) => (
    <FiCloud
      key={`cloud-${i}`}
      className="absolute text-white/10 animate-cloud float-animation"
      style={{
        top: `${(i * 4 + (i * 7) % 15) % 95}%`,
        left: `${(i * 9 + (i * 13) % 20) % 95}%`,
        animationDelay: `${(i * 0.35) % 5}s`,
        fontSize: `${70 + ((i * 3) % 20)}px`,
      }}
    />
  ))}

  {/* Notas Musicais (25) */}
  {[...Array(25)].map((_, i) => (
    <FiMusic
      key={`music-${i}`}
      className="absolute text-white/10 animate-cloud float-animation"
      style={{
        top: `${(i * 3 + (i * 11) % 18) % 90}%`,
        left: `${(i * 12 + (i * 7) % 25) % 90}%`,
        animationDelay: `${(i * 0.4 + 0.5) % 6}s`,
        fontSize: `${60 + ((i * 4) % 25)}px`,
      }}
    />
  ))}

  {/* Headphones (20) */}
  {[...Array(20)].map((_, i) => (
    <FiHeadphones
      key={`phones-${i}`}
      className="absolute text-white/10 animate-cloud float-animation"
      style={{
        top: `${(i * 5 + (i * 9) % 20) % 88}%`,
        left: `${(i * 14 + (i * 5) % 18) % 85}%`,
        animationDelay: `${(i * 0.45 + 1) % 7}s`,
        fontSize: `${55 + ((i * 5) % 20)}px`,
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
            <span className="text-purple-300 font-semibold">
              artistas independentes
            </span>
            ,{" "}
            <span className="text-purple-300 font-semibold">
              espaços culturais
            </span>{" "}
            e{" "}
            <span className="text-purple-300 font-semibold">fãs de música</span>{" "}
            em uma só plataforma.
          </p>
        </section>

        {/* Botão Login */}
        <section
          className="flex justify-center"
          aria-label="Botão para acessar a página de login"
        >
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 hover:scale-105
                       active:scale-95 focus:bg-purple-800 text-white font-semibold px-8 py-4
                       rounded-full shadow-lg transition transform duration-300 focus:outline-none
                       focus:ring-4 focus:ring-purple-500/60 select-none text-lg"
            aria-label="Acessar página de login"
          >
            <FiLogIn size={24} aria-hidden="true" />
            Entrar na sua conta
          </button>
        </section>

        {/* Seções principais */}
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
            Recursos
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

        {/* Planos Premium */}
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
                title: (
                  <span className="flex items-center gap-2">
                    <FiMusic className="text-purple-400" />
                    Plano Artista Pro
                  </span>
                ),
                features: [
                  "Publique músicas e playlists sem limites",
                  "Gerencie sua agenda de shows e eventos facilmente",
                  "Interaja diretamente com seus fãs pela plataforma",
                  "Acompanhe relatórios detalhados de audiência e engajamento",
                ],
              },
              {
                icon: <FiBriefcase />,
                title: (
                  <span className="flex items-center gap-2">
                    <FiBriefcase className="text-purple-400" />
                    Plano Cultural Pro
                  </span>
                ),
                features: [
                  "Divulgue eventos e shows de forma ilimitada",
                  "Encontre artistas ideais com ferramentas de busca inteligente",
                  "Controle ingressos e presença com eficiência",
                  "Destaque seu espaço nas recomendações da plataforma",
                ],
              },
              {
                icon: <FiUsers />,
                title: (
                  <span className="flex items-center gap-2">
                    <FiUsers className="text-purple-400" />
                    Plano Fã Premium
                  </span>
                ),
                features: [
                  "Monte playlists personalizadas com seus artistas favoritos",
                  "Siga bandas e receba atualizações em tempo real",
                  "Garanta acesso exclusivo a eventos e lançamentos",
                  "Receba sugestões musicais baseadas no seu estilo",
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
                onClick={() => alert(`Plano selecionado`)}
              >
                <div
                  className="text-purple-400 mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ fontSize: "3rem" }}
                  aria-hidden="true"
                >
                  {icon}
                </div>
                <h3 className="text-2xl font-bold text-purple-300 mb-6 group-hover:text-purple-400 transition text-center">
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
                    alert(`Assinar plano`);
                  }}
                  aria-label="Botão para assinar o plano"
                >
                  Assinar
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* Ranking dos Artistas Independentes */}
        <RankingArtists />

        {/* Melhores Eventos e Shows */}
        <TopEvents />
      </main>

      <Footer />
    </div>
  );
}

function RankingArtists() {
  const artists = [
    {
      name: "The BandsRock",
      genre: "Pop Alternativo",
      plays: "120 mil reproduções",
      image: "/images/MusicPlayerHome.jpg",
    },
    {
      name: "Ritmo Urbano",
      genre: "Hip-Hop/Rap",
      plays: "95 mil reproduções",
      image: "/images/MusicPlayerHome1.jpg",
    },
    {
      name: "Café & Jazz",
      genre: "Instrumental",
      plays: "78 mil reproduções",
      image: "/images/MusicPlayerHome2.jpg",
    },
    {
      name: "Voz do Interior",
      genre: "Folk Brasileiro",
      plays: "74 mil reproduções",
      image: "/images/MusicPlayerHome2.jpg",
    },
    {
      name: "Synthwave Dreams",
      genre: "Eletrônica",
      plays: "69 mil reproduções",
      image: "/images/MusicPlayerHome1.jpg",
    },
    {
      name: "Raízes do Samba",
      genre: "Samba & MPB",
      plays: "66 mil reproduções",
      image: "/images/MusicPlayerHome.jpg",
    },
  ];

  return (
    <section
      className="space-y-8 text-center"
      aria-label="Ranking dos Artistas Independentes mais ouvidos"
    >
      <h2 className="flex justify-center items-center gap-2 text-3xl sm:text-4xl font-bold text-purple-300 select-none mb-10">
        <FiStar size={32} className="text-purple-400 animate-pulse" aria-hidden="true" />
        Artistas em Alta
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left max-w-7xl mx-auto px-4 sm:px-8">
        {artists.map((artist, idx) => (
          <ArtistCard key={idx} artist={artist} />
        ))}
      </div>
    </section>
  );
}

function ArtistCard({
  artist,
}: {
  artist: { name: string; genre: string; plays: string; image: string };
}) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(
    Math.floor(Math.random() * 1000) + 100
  );
  const [following, setFollowing] = useState(false);

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
    setLiked((prev) => !prev);
  };

  const toggleFollow = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFollowing((prev) => !prev);
  };

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`Tocando músicas de ${artist.name}`);
  };

  const handleMessage = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`Abrindo chat com ${artist.name}`);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`Link do perfil de ${artist.name} copiado!`);
  };

  return (
    <article
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
      onClick={() => alert(`Artista selecionado: ${artist.name}`)}
    >
      <img
        src={artist.image}
        alt={`Imagem do artista ${artist.name}`}
        className="w-full h-40 object-cover rounded-lg border-2 border-purple-600 shadow-md transition-transform duration-300 hover:scale-105"
      />
      <h3 className="text-xl font-bold text-purple-300">{artist.name}</h3>
      <p className="text-white/80">{artist.genre}</p>
      <p className="text-white/80">{artist.plays}</p>

      <div className="flex flex-wrap gap-3 justify-center mt-4 w-full">
        <button
          onClick={toggleLike}
          aria-pressed={liked}
          className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold transition
            ${liked ? "bg-red-600 text-white" : "bg-purple-600 text-white hover:bg-purple-700"}`}
          type="button"
        >
          <FiHeart />
          {likesCount}
        </button>

        <button
          onClick={toggleFollow}
          aria-pressed={following}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition
            ${following ? "bg-green-600 text-white" : "bg-purple-600 text-white hover:bg-purple-700"}`}
          type="button"
        >
          <FiUserPlus />
          {following ? "Seguindo" : "Seguir"}
        </button>

        <button
          onClick={handlePlay}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition bg-purple-600 text-white hover:bg-purple-700"
          type="button"
        >
          <FiPlay />
          Ouvir agora
        </button>

        <button
          onClick={handleMessage}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition bg-purple-600 text-white hover:bg-purple-700"
          type="button"
        >
          <FiHeadphones />
          Mensagem
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition bg-purple-600 text-white hover:bg-purple-700"
          type="button"
        >
          <FiCloud />
          Compartilhar
        </button>
      </div>
    </article>
  );
}

function TopEvents() {
  const events = [
    {
      id: 1,
      title: "Festival Indie Beats 2025",
      location: "Centro Cultural São Paulo",
      date: "25 de Agosto, 2025",
      image: "/images/EventsPlayer.jpg",
      attendees: 1200,
    },
    {
      id: 2,
      title: "Noite do Jazz ao Vivo",
      location: "Bar Blue Note",
      date: "10 de Setembro, 2025",
      image: "/images/EventsPlayer.jpg",
      attendees: 450,
    },
    {
      id: 3,
      title: "Show de Rock Alternativo",
      location: "Teatro Municipal",
      date: "5 de Outubro, 2025",
      image: "/images/EventsPlayer.jpg",
      attendees: 780,
    },
    {
      id: 4,
      title: "Encontro de Bandas Independentes",
      location: "Praça Central",
      date: "15 de Novembro, 2025",
      image: "/images/EventsPlayer.jpg",
      attendees: 920,
    },
    {
      id: 5,
      title: "Festival de Música Eletrônica",
      location: "Arena das Dunas",
      date: "20 de Dezembro, 2025",
      image: "/images/EventsPlayer.jpg",
      attendees: 1500,
    },
    {
      id: 6,
      title: "Samba e Pagode na Lapa",
      location: "Casa de Shows Lapa",
      date: "30 de Julho, 2025",
      image: "/images/EventsPlayer.jpg",
      attendees: 670,
    },
  ];

  return (
    <section
      className="space-y-8 text-center"
      aria-label="Melhores Eventos e Shows no BandsCloud"
    >
      <h2 className="flex justify-center items-center gap-2 text-3xl sm:text-4xl font-bold text-purple-300 select-none mb-10">
        <FiBriefcase size={32} className="text-purple-400 animate-pulse" aria-hidden="true" />
        Melhores Eventos e Shows
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 sm:px-8">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}

function EventCard({
  event,
}: {
  event: {
    id: number;
    title: string;
    location: string;
    date: string;
    image: string;
    attendees: number;
  };
}) {
  const [following, setFollowing] = useState(false);

  const toggleFollow = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFollowing(!following);
  };

  return (
    <article
      tabIndex={0}
      role="button"
      className="bg-[#2a2a2a] rounded-xl shadow border border-purple-700 p-6 flex flex-col gap-4
                 hover:shadow-lg hover:border-purple-400 hover:scale-[1.05] transition-transform duration-300 cursor-pointer
                 focus:outline-none focus:ring-4 focus:ring-purple-500/60"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.currentTarget.click();
        }
      }}
      onClick={() => alert(`Evento selecionado: ${event.title}`)}
    >
      <img
        src={event.image}
        alt={`Imagem do evento ${event.title}`}
        className="w-full h-40 object-cover rounded-lg border-2 border-purple-600 shadow-md transition-transform duration-300 hover:scale-105"
      />
      <h3 className="text-xl font-bold text-purple-300">{event.title}</h3>
      <p className="text-white/80 text-sm">{event.location}</p>
      <p className="text-white/80 text-sm font-semibold">{event.date}</p>
      <p className="text-white text-sm">{event.attendees.toLocaleString()} pessoas confirmadas</p>

      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            alert(`Detalhes do evento: ${event.title}`);
          }}
          className="flex items-center gap-1 px-5 py-2 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-full transition min-w-[110px] justify-center"
          aria-label={`Detalhes do evento ${event.title}`}
          type="button"
        >
          <FiUsers />
          Detalhes
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            alert(`Ingressos para o evento: ${event.title}`);
          }}
          className="flex items-center gap-1 px-5 py-2 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-full transition min-w-[110px] justify-center"
          aria-label={`Ingressos para o evento ${event.title}`}
          type="button"
        >
          <FiStar />
          Ingressos
        </button>

        <button
          onClick={toggleFollow}
          aria-pressed={following}
          className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition w-full sm:w-auto justify-center
            ${following ? "bg-green-600 text-white" : "bg-purple-600 text-white hover:bg-purple-700"}`}
          aria-label={following ? `Deixar de seguir o evento ${event.title}` : `Seguir o evento ${event.title}`}
          type="button"
        >
          <FiUserPlus />
          {following ? "Seguindo" : "Seguir"}
        </button>
      </div>
    </article>
  );
}
