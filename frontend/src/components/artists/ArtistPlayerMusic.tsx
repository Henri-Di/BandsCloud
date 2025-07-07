import React, { useState, useRef, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaStepBackward,
  FaStepForward,
} from "react-icons/fa";

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

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

const TopHitsPlaylist: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentSongIndex, setCurrentSongIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const playPauseSong = (index: number) => {
    if (currentSongIndex === index) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
    } else {
      setCurrentSongIndex(index);
    }
  };

  const nextSong = () => {
    if (currentSongIndex === null) return;
    const nextIndex = (currentSongIndex + 1) % topHits.length;
    setCurrentSongIndex(nextIndex);
  };

  const prevSong = () => {
    if (currentSongIndex === null) return;
    const prevIndex = (currentSongIndex - 1 + topHits.length) % topHits.length;
    setCurrentSongIndex(prevIndex);
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
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setProgress(audio.currentTime);
    const onDurationChange = () => setDuration(audio.duration);
    const onEnded = () => nextSong();
    const onLoadStart = () => setIsLoading(true);
    const onCanPlay = () => setIsLoading(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("loadstart", onLoadStart);
    audio.addEventListener("canplay", onCanPlay);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("loadstart", onLoadStart);
      audio.removeEventListener("canplay", onCanPlay);
    };
  }, [currentSongIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || currentSongIndex === null) return;

    audio.pause();
    audio.src = topHits[currentSongIndex].audioSrc;
    audio.load();

    audio.volume = isMuted ? 0 : volume;
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));

    setProgress(0);
  }, [currentSongIndex, volume, isMuted]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
    setProgress(time);
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-[#1a1a1a] rounded-xl p-6 shadow-lg text-white space-y-6">
      <h2 className="text-2xl font-bold text-purple-300 mb-4">Top Hits da Semana</h2>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto px-2 sm:px-4 py-2 scrollbar-custom shadow-scroll-both rounded">
        {topHits.map((song, idx) => {
          const isCurrent = idx === currentSongIndex;
          return (
            <li
              key={idx}
              className={`flex items-center justify-between rounded-lg p-3 cursor-pointer transition-colors ${
                isCurrent ? "bg-purple-700 shadow-lg" : "bg-[#2a2a2a] hover:bg-[#3a3a3a]"
              }`}
              onClick={() => playPauseSong(idx)}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <img
                  src={song.coverUrl}
                  alt={song.title}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover shadow-md"
                />
                <div className="min-w-0">
                  <p className="font-semibold text-sm sm:text-base truncate">{song.title}</p>
                  <p className="text-xs sm:text-sm text-gray-400 truncate">{song.artist}</p>
                </div>
              </div>
              <button
                className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-md"
                onClick={(e) => {
                  e.stopPropagation();
                  playPauseSong(idx);
                }}
              >
                {isCurrent && isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
              </button>
            </li>
          );
        })}
      </ul>

      {currentSongIndex !== null && (
        <div className="pt-4 border-t border-purple-700 mt-4 space-y-4">
          {/* Controles principais */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <img
                src={topHits[currentSongIndex].coverUrl}
                alt="Capa"
                className="w-12 h-12 sm:w-16 sm:h-16 rounded shadow-md object-cover"
              />
              <div className="min-w-0">
                <p className="font-semibold text-base sm:text-lg truncate">
                  {topHits[currentSongIndex].title}
                </p>
                <p className="text-sm sm:text-base text-gray-400 truncate">
                  {topHits[currentSongIndex].artist}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
              <button onClick={prevSong} className="text-purple-300 hover:text-purple-500 p-2 rounded">
                <FaStepBackward size={20} />
              </button>
              <button
                onClick={() => playPauseSong(currentSongIndex)}
                className="text-purple-300 hover:text-purple-500 p-3 rounded-full bg-purple-600 shadow-md"
              >
                {isPlaying ? <FaPause size={22} /> : <FaPlay size={22} />}
              </button>
              <button onClick={nextSong} className="text-purple-300 hover:text-purple-500 p-2 rounded">
                <FaStepForward size={20} />
              </button>
              <button onClick={toggleMute} className="text-purple-300 hover:text-purple-500 p-2 rounded">
                {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={handleVolumeChange}
                className="w-28 sm:w-36 accent-purple-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Barra de progresso */}
          <div className="flex items-center gap-2 sm:gap-3 w-full">
            <span className="text-xs sm:text-sm text-gray-400 w-10 text-right tabular-nums">
              {formatTime(progress)}
            </span>
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={progress}
              onChange={handleSeek}
              className="flex-grow accent-purple-400 cursor-pointer rounded"
            />
            <span className="text-xs sm:text-sm text-gray-400 w-10 tabular-nums">
              {formatTime(duration)}
            </span>
          </div>

          {isLoading && <p className="text-sm text-gray-400 italic">Carregando música...</p>}

          <audio ref={audioRef} preload="metadata" />
        </div>
      )}
    </div>
  );
};

export default TopHitsPlaylist;