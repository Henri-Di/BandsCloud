import { FiMusic } from "react-icons/fi";
import Navbar from "../../components/shared/NavbarArtist";
import MusicPlayer from "../../components/artists/MusicPlayer";
import Footer from "../../components/shared/Footer";


const albums = [
  {
    artistName: "Artist Album",
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    artistName: "Artist Album",
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    artistName: "Artist Album",
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    artistName: "Artist Album",
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
  {
    artistName: "Artist Album",
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  },
    {
    artistName: "Artist Album",
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
  },
];

const defaultCoverUrl = "/images/MusicPlayer.jpg";

export default function ArtistDashboard() {


  return (
    <div className="bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#2a2a2a] text-white min-h-screen flex flex-col">
      <Navbar />

      <main className="pt-32 px-4 sm:px-6 md:px-8 pb-20 max-w-7xl mx-auto flex-grow">
        <h2 className="flex items-center gap-3 text-purple-200 text-xl sm:text-2xl font-semibold mb-8">
          <FiMusic size={28} />
          <span>Álbuns - Novos Artistas</span>
        </h2>

        {/* Container com scroll horizontal customizado */}
        <div className="overflow-x-auto scrollbar-custom">
          <div className="flex flex-col gap-6 md:flex-row md:flex-nowrap md:gap-6 md:pb-4">
            {albums.map((album, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-full max-w-md md:w-[300px] mx-auto md:mx-0"
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
      </main>

      <Footer />
    </div>
  );
}
