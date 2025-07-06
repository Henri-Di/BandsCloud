import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

interface Song {
  title: string;
  artist: string;
  coverUrl: string;
  audioSrc: string;
}

// Lista fake de 30 músicas com nomes e artistas falsos
const topHits: Song[] = [
  { title: "Luzes da Cidade", artist: "Banda Aurora", coverUrl: "/images/MusicPlayer.jpg", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { title: "Caminho das Estrelas", artist: "Solar Beats", coverUrl: "/images/MusicPlayer.jpg", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { title: "Maré Alta", artist: "Onda Nova", coverUrl: "/images/MusicPlayer.jpg", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { title: "Noite em Claro", artist: "Ecos Urbanos", coverUrl: "/images/MusicPlayer.jpg", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
  { title: "Vento Sul", artist: "Brisa Forte", coverUrl: "/images/MusicPlayer.jpg", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
  { title: "Fogo na Alma", artist: "Chama Viva", coverUrl: "/images/MusicPlayer.jpg", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
  { title: "Horizonte Vermelho", artist: "Sol Poente", coverUrl: "/images/MusicPlayer.jpg", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
  { title: "Céu de Prata", artist: "Estrelas Nômades", coverUrl: "/images/MusicPlayer.jpg", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
  { title: "Eco do Silêncio", artist: "Sombras Sonoras", coverUrl: "/images/MusicPlayer.jpg", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" },
  { title: "Passos na Areia", artist: "Maré Baixa", coverUrl: "/images/MusicPlayer.jpg", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" },
  { title: "Brilho Eterno", artist: "Luz do Norte", coverUrl: "/images/MusicPlayer.jpg", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { title: "No Ritmo do Coração", artist: "Batida Urbana", coverUrl: "/images/MusicPlayer.jpg", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { title: "Ondas do Tempo", artist: "Fluxo Livre", coverUrl: "/images/MusicPlayer.jpg", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { title: "Sussurros da Noite", artist: "Vozes Anônimas", coverUrl: "/images/MusicPlayer.jpg", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
  { title: "Entre Sombras", artist: "Lua Crescente", coverUrl: "/images/MusicPlayer.jpg", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
  { title: "Rastro de Luz", artist: "Clara Visão", coverUrl: "/images/MusicPlayer.jpg", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
  { title: "Cidade Alta", artist: "Alto Escuro", coverUrl: "/images/MusicPlayer.jpg", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
  { title: "Som da Rua", artist: "Ritmo Vivo", coverUrl: "/images/MusicPlayer.jpg", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
  { title: "Olhos de Fogo", artist: "Chama Ardente", coverUrl: "/images/MusicPlayer.jpg", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" },
  { title: "Águas Claras", artist: "Rio Sereno", coverUrl: "/images/MusicPlayer.jpg", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" },
  { title: "Vozes do Vento", artist: "Sopro Leve", coverUrl: "/images/MusicPlayer.jpg", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { title: "Pé na Estrada", artist: "Caminho Livre", coverUrl: "/images/MusicPlayer.jpg", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { title: "Raízes do Som", artist: "Terra Fértil", coverUrl: "/images/MusicPlayer.jpg", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { title: "Sombras da Manhã", artist: "Luz Nascente", coverUrl: "/images/MusicPlayer.jpg", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
  { title: "Jardim Secreto", artist: "Flores de Aço", coverUrl: "/images/MusicPlayer.jpg", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
  { title: "Passarela", artist: "Noite Viva", coverUrl: "/images/MusicPlayer.jpg", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
  { title: "Luar do Sertão", artist: "Vento Forte", coverUrl: "/images/MusicPlayer.jpg", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
  { title: "Coração Selvagem", artist: "Alma Livre", coverUrl: "/images/MusicPlayer.jpg", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
  { title: "Vento do Norte", artist: "Brisa Fresca", coverUrl: "/images/MusicPlayer.jpg", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" },
  { title: "Luzes da Cidade", artist: "Banda Aurora", coverUrl: "/images/MusicPlayer.jpg", audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" },
];

const TopHitsPlaylist: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);

  const playSong = (song: Song) => {
    if (currentSong?.audioSrc === song.audioSrc) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
    } else {
      setCurrentSong(song);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    audioRef.current.volume = newMuteState ? 0 : volume;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    setIsMuted(vol === 0);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  };

  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentSong]);

  return (
    <div className="w-full mx-auto bg-[#1a1a1a] rounded-xl p-6 shadow-lg text-white space-y-6">
      <h2 className="text-2xl font-bold text-purple-300 mb-4">
        Top Hits da Semana
      </h2>

      <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto scrollbar-custom shadow-scroll-both">
        {topHits.map((song, idx) => (
          <li
            key={idx}
            className="flex items-center justify-between bg-[#2a2a2a] rounded-lg p-4 hover:bg-[#3a3a3a] transition-colors cursor-pointer"
            onClick={() => playSong(song)}
            title={`Tocar ${song.title} - ${song.artist}`}
          >
            <div className="flex items-center gap-4">
              <img
                src={song.coverUrl}
                alt={song.title}
                className="w-12 h-12 rounded object-cover shadow-md"
              />
              <div>
                <p className="font-semibold">{song.title}</p>
                <p className="text-sm text-gray-400">{song.artist}</p>
              </div>
            </div>
            <button
              className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-md"
              onClick={(e) => {
                e.stopPropagation();
                playSong(song);
              }}
              title={
                currentSong?.audioSrc === song.audioSrc && isPlaying
                  ? "Pausar"
                  : "Tocar"
              }
            >
              {currentSong?.audioSrc === song.audioSrc && isPlaying ? (
                <FaPause size={16} />
              ) : (
                <FaPlay size={16} />
              )}
            </button>
          </li>
        ))}
      </ul>

      {currentSong && (
        <div className="pt-4 border-t border-purple-700 mt-4">
          <div className="flex items-center gap-4">
            <img
              src={currentSong.coverUrl}
              alt="Capa"
              className="w-14 h-14 rounded shadow-md"
            />
            <div className="flex-grow">
              <p className="font-semibold">{currentSong.title}</p>
              <p className="text-sm text-gray-400">{currentSong.artist}</p>
            </div>
            <button
              onClick={toggleMute}
              className="text-purple-300 hover:text-purple-500"
              title={isMuted ? "Ativar som" : "Silenciar"}
            >
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 accent-purple-400"
              title="Volume"
            />
          </div>

          <audio ref={audioRef} preload="metadata">
            <source src={currentSong.audioSrc} type="audio/mpeg" />
            Seu navegador não suporta áudio.
          </audio>
        </div>
      )}
    </div>
  );
};

export default TopHitsPlaylist;