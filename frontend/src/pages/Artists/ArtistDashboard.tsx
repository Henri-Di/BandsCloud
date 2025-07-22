import {
  FiMusic,
  FiBriefcase,
  FiUser,
  FiHeadphones,
  FiUsers,
  FiCloud,
} from "react-icons/fi";
import Navbar from "../../components/shared/NavbarArtist";
import MusicPlayer from "../../components/artists/ArtistPlayerAlbum";
import AvailabilityCard from "../../components/artists/ArtisCardJobs";
import FanCard from "../../components/artists/ArtistCardFans";
import TopHitsPlaylist from "../../components/artists/ArtistPlayerMusic";
import ProfileSettingsCard from "../../components/artists/ArtistCardBio";
import Footer from "../../components/shared/Footer";
import "../../styles/OverView.css";
import LogoutButton from "../../components/auth/Logout";
import LoadingSpinnerLogout from "../../components/shared/LoadingSpinnerLogout";
import ScrollTopButton from "../../components/shared/ScrollTopButton";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../../context/AuthContext";

const albums = [
  { artistName: "Artist Album", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { artistName: "Artist Album", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { artistName: "Artist Album", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { artistName: "Artist Album", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
  { artistName: "Artist Album", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
  { artistName: "Artist Album", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
];

const defaultCoverUrl = "/images/MusicPlayer.jpg";

const opportunities = [
  { date: "10/07/2025", location: "Rio de Janeiro, RJ", type: "Show", slotsAvailable: 2, description: "Evento local com público estimado em 500 pessoas. Palco com estrutura profissional." },
  { date: "15/07/2025", location: "São Paulo, SP", type: "Evento", slotsAvailable: 1, description: "Feira de cultura independente com oportunidade de networking e venda." },
  { date: "20/07/2025", location: "Belo Horizonte, MG", type: "Show", slotsAvailable: 3, description: "Festival regional com artistas locais e nacionais. Excelente para exposição." },
  { date: "25/07/2025", location: "Curitiba, PR", type: "Evento", slotsAvailable: 2, description: "Encontro cultural em espaço alternativo. Participação de produtores e imprensa." },
  { date: "28/07/2025", location: "Porto Alegre, RS", type: "Show", slotsAvailable: 1, description: "Casa de shows renomada busca artista para abertura de atração principal." },
  { date: "30/07/2025", location: "Salvador, BA", type: "Evento", slotsAvailable: 4, description: "Festival multicultural com diversas atrações artísticas e feira gastronômica." },
];

const fans = [
  { name: "Ana Silva", location: "São Paulo, SP", since: "01/2023", bio: "Fã apaixonada por música indie e shows." },
  { name: "Carlos Oliveira", location: "Rio de Janeiro, RJ", since: "11/2022", bio: "Acompanhando artistas locais desde sempre." },
  { name: "Maria Fernanda", location: "Belo Horizonte, MG", since: "06/2024", bio: "Músico amador e fã de música alternativa." },
  { name: "Lucas Pereira", location: "Curitiba, PR", since: "12/2023", bio: "Acompanho eventos culturais e novos talentos." },
  { name: "Fernanda Souza", location: "Porto Alegre, RS", since: "03/2025", bio: "Curto eventos culturais e novos talentos." },
  { name: "João Santos", location: "Salvador, BA", since: "08/2024",bio: "Busco eventos culturais e novos talentos." },
];

export default function ArtistDashboard() {
  const { user, loading, loadingLogout } = useAuth();

  if (loadingLogout) return <LoadingSpinnerLogout />;
  if (loading) return <div className="text-center text-white py-12">Carregando informações do artista...</div>;
  if (!user) return <div className="text-center text-red-500 py-12">Usuário não encontrado.</div>;

  return (
    <div className="bg-gray-950 from-[#0f0f0f] via-[#1a1a1a] to-[#2a2a2a] text-white min-h-screen flex flex-col relative overflow-hidden">
      <Helmet>
        <title>BandsCloud | Dashboard Artista</title>
      </Helmet>

      <Navbar />


      {/* Ícones flutuantes no fundo */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <FiCloud className="absolute top-10 left-5 text-white/10 animate-cloud float-animation delay-0" size={100} />
        <FiCloud className="absolute top-32 right-10 text-white/10 animate-cloud float-animation delay-2000" size={120} />
        <FiCloud className="absolute bottom-10 left-1/3 text-white/10 animate-cloud float-animation delay-1000" size={90} />
        <FiCloud className="absolute top-1/4 left-1/2 text-white/10 animate-cloud float-animation delay-2500" size={110} />
        <FiCloud className="absolute bottom-1/3 right-1/4 text-white/10 animate-cloud float-animation delay-3500" size={95} />
        <FiCloud className="absolute top-3/4 left-1/4 text-white/10 animate-cloud float-animation delay-1500" size={80} />
        <FiCloud className="absolute top-20 left-3/4 text-white/10 animate-cloud float-animation delay-3000" size={100} />
        <FiCloud className="absolute bottom-20 right-1/3 text-white/10 animate-cloud float-animation delay-4000" size={85} />
        <FiCloud className="absolute top-1/2 right-1/5 text-white/10 animate-cloud float-animation delay-4500" size={90} />

        <FiMusic className="absolute top-20 left-1/4 text-white/10 animate-cloud float-animation delay-1500" size={80} />
        <FiMusic className="absolute bottom-20 right-1/5 text-white/10 animate-cloud float-animation delay-2500" size={70} />
        <FiMusic className="absolute top-1/3 right-1/3 text-white/10 animate-cloud float-animation delay-3000" size={60} />
        <FiMusic className="absolute bottom-1/4 left-1/5 text-white/10 animate-cloud float-animation delay-4000" size={90} />
        <FiMusic className="absolute top-2/3 right-1/4 text-white/10 animate-cloud float-animation delay-1000" size={75} />
        <FiMusic className="absolute top-1/5 right-1/2 text-white/10 animate-cloud float-animation delay-3500" size={70} />
        <FiMusic className="absolute bottom-1/3 left-3/4 text-white/10 animate-cloud float-animation delay-2000" size={65} />
        <FiMusic className="absolute top-3/4 left-3/5 text-white/10 animate-cloud float-animation delay-4500" size={80} />

        <div
          className="absolute text-white/10 animate-cloud float-animation delay-1800"
          style={{ top: "15%", left: "10%", fontSize: 70, userSelect: "none", pointerEvents: "none" }}
          aria-hidden="true"
        >
          🎤
        </div>
        <div
          className="absolute text-white/10 animate-cloud float-animation delay-3200"
          style={{ top: "60%", left: "35%", fontSize: 60, userSelect: "none", pointerEvents: "none" }}
          aria-hidden="true"
        >
          🎤
        </div>
        <div
          className="absolute text-white/10 animate-cloud float-animation delay-4000"
          style={{ top: "70%", right: "20%", fontSize: 80, userSelect: "none", pointerEvents: "none" }}
          aria-hidden="true"
        >
          🎤
        </div>
        <div
          className="absolute text-white/10 animate-cloud float-animation delay-2500"
          style={{ top: "40%", right: "10%", fontSize: 65, userSelect: "none", pointerEvents: "none" }}
          aria-hidden="true"
        >
          🎤
        </div>
        <div
          className="absolute text-white/10 animate-cloud float-animation delay-5000"
          style={{ top: "80%", left: "60%", fontSize: 55, userSelect: "none", pointerEvents: "none" }}
          aria-hidden="true"
        >
          🎤
        </div>
      </div>

<main className="pt-28 px-4 sm:px-6 md:px-10 pb-20 max-w-7xl mx-auto flex-grow relative z-10 space-y-20">
{/* Perfil */}
<h2
  className="
    flex items-center gap-2 text-purple-300
    text-xl sm:text-2xl md:text-3xl font-semibold
    mb-6 sm:mb-8
    border-l-4 border-purple-500 pl-3 sm:pl-4
    truncate
  "
  aria-label="Seção Perfil"
>
  <FiUser size={20} className="sm:size-[26px]" />
  <span className="truncate">Perfil</span>
</h2>
<ProfileSettingsCard
  userName={user.name || "Artista"}
  email={user.email}
  bio={user.bio}
  avatarUrl={user.avatarUrl}
  logoutButton={<LogoutButton />}
/>


  {/* Músicas */}
  <section>
    <h2 className="flex items-center gap-3 text-purple-300 text-2xl sm:text-3xl font-semibold mb-8 border-l-4 border-purple-500 pl-4">
      <FiHeadphones size={26} />
      <span>Músicas</span>
    </h2>
    <TopHitsPlaylist />
  </section>

  {/* Álbuns */}
  <section>
    <h2 className="flex items-center gap-3 text-purple-300 text-2xl sm:text-3xl font-semibold mt-16 mb-10 border-l-4 border-purple-500 pl-4">
      <FiMusic size={28} />
      <span>Álbuns</span>
    </h2>

<div className="overflow-x-auto scrollbar-custom px-8 py-4 over-padding">
  <div className="flex flex-col gap-6 sm:flex-row sm:overflow-x-auto sm:scrollbar-custom sm:gap-6 sm:px-8 sm:min-w-max">
    {albums.map((album, idx) => (
      <div
        key={idx}
        className={`
          flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px]
          ${idx === 0 ? 'ml-2 sm:ml-4' : ''}
          ${idx === albums.length - 1 ? 'mr-2 sm:mr-4' : ''}
        `}
      >
        <MusicPlayer
          artistName={album.artistName}
          albumName={`Album ${idx + 1}`}
          coverUrl={defaultCoverUrl}
          audioSrc={album.audioSrc}
        />
      </div>
    ))}
  </div>
</div>
  </section>

  {/* Oportunidades */}
  <section>
    <h2 className="flex items-center gap-3 text-purple-300 text-2xl sm:text-3xl font-semibold mt-16 mb-10 border-l-4 border-purple-500 pl-4">
      <FiBriefcase size={26} />
      <span>Eventos e Shows</span>
    </h2>

    <div className="overflow-x-auto scrollbar-custom px-8 py-4">
      <div className="flex flex-col gap-6 sm:flex-row sm:overflow-x-auto sm:scrollbar-custom sm:gap-6 sm:px-2 sm:min-w-max">
        {opportunities.map((op, idx) => (
          <div key={idx} className="flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px]">
            <AvailabilityCard {...op} type={op.type as "Show" | "Evento"} />
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* Fãs */}
  <section>
    <h2 className="flex items-center gap-3 text-purple-300 text-2xl sm:text-3xl font-semibold mt-16 mb-10 border-l-4 border-purple-500 pl-4">
      <FiUsers size={26} />
      <span>Seguidores e Fãs</span>
    </h2>

    <div className="overflow-x-auto scrollbar-custom px-8 py-4">
      <div className="flex flex-col gap-6 sm:flex-row sm:overflow-x-auto sm:scrollbar-custom sm:gap-6 sm:px-2 sm:min-w-max">
        {fans.map((fan, idx) => (
          <div key={idx} className="flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px]">
            <FanCard {...fan} />
          </div>
        ))}
      </div>
    </div>
  </section>

</main>

<ScrollTopButton />
<Footer />

    </div>
  );
}
