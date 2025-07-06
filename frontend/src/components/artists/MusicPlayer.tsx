import React, { useState, useRef, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";

interface MusicPlayerProps {
  artistName: string;
  albumName: string;
  coverUrl: string;
  audioSrc: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  artistName,
  albumName,
  coverUrl,
  audioSrc,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Play / Pause
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const onTimeUpdate = () => {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    const duration = audioRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newTime = (audioRef.current.duration / 100) * Number(e.target.value);
    audioRef.current.currentTime = newTime;
    setProgress(Number(e.target.value));
  };

  const onVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const vol = Number(e.target.value);
    audioRef.current.volume = vol;
    setVolume(vol);
    setIsMuted(vol === 0);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume || 0.7;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const onEnded = () => setIsPlaying(false);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
      onTimeUpdate();
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateTime);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateTime);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#6600cc] via-[#7a3aff] to-[#9c6cff] rounded-xl p-5 text-white shadow-2xl flex flex-col gap-4 overflow-hidden max-w-[300px] w-full mx-auto">
      {/* Capa do álbum */}
      <img
        src={coverUrl}
        alt={`${artistName} - ${albumName}`}
        className="w-32 h-32 rounded-xl shadow-lg object-cover mx-auto"
        loading="lazy"
      />

      {/* Info */}
      <div className="text-center">
        <h2 className="text-xl font-bold drop-shadow-lg">{albumName}</h2>
        <p className="text-sm text-purple-200 drop-shadow">{artistName}</p>
      </div>

      {/* Barra de progresso */}
      <div className="relative w-full h-2 rounded-full bg-purple-900/40 cursor-pointer hover:bg-purple-900/70 transition-colors">
        <input
          type="range"
          min={0}
          max={100}
          value={progress}
          onChange={onSeek}
          className="absolute top-0 left-0 w-full h-2 rounded-full appearance-none bg-transparent cursor-pointer"
          style={{
            background: `linear-gradient(to right, #c4a7e7 0%, #c4a7e7 ${progress}%, transparent ${progress}%, transparent 100%)`,
          }}
          title="Seek"
        />
      </div>

      {/* Tempo */}
      <div className="flex justify-between text-xs font-mono text-purple-200 select-none">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* Controles */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <button
          aria-label="Previous"
          className="p-2 rounded-full hover:bg-purple-300/30 transition-colors text-purple-200"
          title="Previous (não implementado)"
        >
          <FaBackward size={18} />
        </button>

        <button
          aria-label={isPlaying ? "Pause" : "Play"}
          onClick={togglePlay}
          className="p-4 bg-purple-200 rounded-full text-[#6600cc] shadow-lg hover:scale-110 transition-transform active:scale-95"
        >
          {isPlaying ? <FaPause size={22} /> : <FaPlay size={22} />}
        </button>

        <button
          aria-label="Next"
          className="p-2 rounded-full hover:bg-purple-300/30 transition-colors text-purple-200"
          title="Next (não implementado)"
        >
          <FaForward size={18} />
        </button>

        {/* Volume */}
        <div className="flex items-center space-x-2 w-full max-w-[120px] ml-auto">
          <button
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute" : "Mute"}
            className="text-purple-200 hover:text-purple-400 transition-colors"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted || volume === 0 ? (
              <FaVolumeMute size={18} />
            ) : (
              <FaVolumeUp size={18} />
            )}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={onVolumeChange}
            className="w-full h-1 rounded-lg cursor-pointer accent-purple-300"
            title="Volume"
          />
        </div>
      </div>

      {/* Áudio oculto */}
      <audio ref={audioRef} src={audioSrc} preload="metadata" />
    </div>
  );
};

export default MusicPlayer;
