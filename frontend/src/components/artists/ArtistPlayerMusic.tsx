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
    <div
      className="
        bg-gradient-to-br from-[#121212] to-[#1e1e2f]
        rounded-3xl p-4 sm:p-6 md:p-10
        shadow-[0_6px_12px_rgba(168,85,247,0.9)]
        text-white max-w-6xl mx-auto
        select-none ring-purple-400/60
        transition-shadow duration-300 hover:shadow-[0_6px_12px_rgba(168,85,247,0.4)]
        flex flex-col gap-5 sm:gap-7
      "
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-purple-300 drop-shadow-lg tracking-wide select-none">
        Top Hits da Semana
      </h2>

      {/* Lista de músicas */}
      <ul
        className="
    grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
    gap-3 sm:gap-5
    max-h-[400px] sm:max-h-[600px] overflow-y-auto
    px-1 sm:px-3 md:px-4 py-2
    rounded-3xl
    bg-gradient-to-br from-[#1a1a2e] to-[#1e1e2f]
    shadow-inner
    scrollbar-custom
    w-full
  "
      >
        {topHits.map((song, idx) => {
          const isCurrent = idx === currentSongIndex;
          return (
            <li
              key={idx}
              className={`
                flex items-center justify-between rounded-3xl p-3 sm:p-4 cursor-pointer select-none
                transition-colors duration-300
                ${
                  isCurrent
                    ? "bg-purple-700 shadow-[0_0_20px_#9d7fffaa] text-white"
                    : "bg-[#2c2c36] hover:bg-purple-700/60 hover:text-white shadow-sm"
                }
              `}
              onClick={() => playPauseSong(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  playPauseSong(idx);
                }
              }}
              aria-pressed={isCurrent && isPlaying}
              aria-label={`${song.title} por ${song.artist} ${
                isCurrent && isPlaying ? "tocando" : ""
              }`}
            >
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <img
                  src={song.coverUrl}
                  alt={`Capa de ${song.title}`}
                  className="w-10 h-10 sm:w-14 sm:h-14 rounded-3xl object-cover shadow-2xl flex-shrink-0"
                  loading="lazy"
                  draggable={false}
                />
                <div className="min-w-0">
                  <p className="font-extrabold text-sm sm:text-base truncate">
                    {song.title}
                  </p>
                  <p className="text-purple-400 truncate text-xs sm:text-sm">
                    {song.artist}
                  </p>
                </div>
              </div>
              <button
                className={`
                  p-2 sm:p-3 rounded-full shadow-lg transition-colors duration-300 transform
                  ${
                    isCurrent && isPlaying
                      ? "bg-purple-500 text-white hover:bg-purple-600 scale-110"
                      : "bg-purple-600 text-purple-100 hover:bg-purple-700 hover:text-white"
                  }
                  focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-offset-2
                `}
                onClick={(e) => {
                  e.stopPropagation();
                  playPauseSong(idx);
                }}
                aria-label={isCurrent && isPlaying ? "Pausar" : "Tocar"}
                title={isCurrent && isPlaying ? "Pausar" : "Tocar"}
              >
                {isCurrent && isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Player principal */}
      {currentSongIndex !== null && (
        <div
          className="
            pt-5 sm:pt-6 border-t border-purple-700 mt-5 sm:mt-6 space-y-5 sm:space-y-6
            select-none
          "
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-5 flex-wrap">
            <div className="flex items-center gap-3 sm:gap-5 min-w-0 flex-1">
              <img
                src={topHits[currentSongIndex].coverUrl}
                alt={`Capa de ${topHits[currentSongIndex].title}`}
                className="w-14 h-14 sm:w-20 sm:h-20 rounded-3xl shadow-2xl object-cover"
                loading="lazy"
                draggable={false}
              />
              <div className="min-w-0">
                <p className="font-extrabold text-lg sm:text-2xl truncate text-purple-300 drop-shadow-lg">
                  {topHits[currentSongIndex].title}
                </p>
                <p className="text-purple-400 text-xs sm:text-sm truncate drop-shadow-md">
                  {topHits[currentSongIndex].artist}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
              <button
                onClick={prevSong}
                className="text-purple-300 hover:text-white p-2 sm:p-3 rounded-full bg-purple-800 hover:bg-purple-700 shadow-lg transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-offset-2"
                aria-label="Música anterior"
                title="Anterior"
              >
                <FaStepBackward size={20} />
              </button>
              <button
                onClick={() => playPauseSong(currentSongIndex)}
                className="text-white p-4 sm:p-5 rounded-full bg-purple-400 shadow-lg hover:bg-purple-700 transition-transform duration-300 active:scale-95 focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-offset-2 cursor-pointer"
                aria-label={isPlaying ? "Pausar" : "Tocar"}
                title={isPlaying ? "Pausar" : "Tocar"}
              >
                {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
              </button>
              <button
                onClick={nextSong}
                className="text-purple-300 hover:text-white p-2 sm:p-3 rounded-full bg-purple-800 hover:bg-purple-700 shadow-lg transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-offset-2"
                aria-label="Próxima música"
                title="Próxima"
              >
                <FaStepForward size={20} />
              </button>
              <button
                onClick={toggleMute}
                className="text-purple-300 hover:text-white p-2 sm:p-3 rounded-full bg-purple-800 hover:bg-purple-700 shadow-lg transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-offset-2"
                aria-label={isMuted ? "Ativar som" : "Silenciar"}
                title={isMuted ? "Ativar som" : "Silenciar"}
              >
                {isMuted ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 sm:w-32 accent-purple-400 cursor-pointer rounded-lg shadow-inner"
                aria-label="Controle de volume"
                title="Volume"
              />
            </div>
          </div>

          {/* Barra de progresso */}
          <div className="flex items-center gap-2 sm:gap-3 w-full">
            <span className="text-xs sm:text-sm font-mono text-purple-300 w-10 sm:w-14 text-right tabular-nums select-none">
              {formatTime(progress)}
            </span>
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={progress}
              onChange={handleSeek}
              className="
                flex-grow h-2 sm:h-3 rounded-full cursor-pointer
                accent-purple-400
                shadow-inner
                hover:accent-purple-300
                transition-colors duration-300
                focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-offset-1
              "
              aria-label="Barra de progresso"
              title={`Tempo: ${formatTime(progress)}`}
              style={{
                background: `linear-gradient(90deg, #d8b4fe ${
                  (progress / duration) * 100
                }%, #6b21a8 ${(progress / duration) * 100}%)`,
                transition: "background 0.3s ease",
              }}
            />
            <span className="text-xs sm:text-sm font-mono text-purple-300 w-10 sm:w-14 tabular-nums select-none">
              {formatTime(duration)}
            </span>
          </div>

          {isLoading && (
            <p className="text-sm text-purple-400 italic select-none">
              Carregando música...
            </p>
          )}

          <audio ref={audioRef} preload="metadata" />
        </div>
      )}
    </div>
  );
};

export default TopHitsPlaylist;