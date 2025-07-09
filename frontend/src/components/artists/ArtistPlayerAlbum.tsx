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
    <div
      className="
        bg-gradient-to-r from-purple-900 via-purple-700 to-purple-800 
        rounded-2xl p-6 text-white 
        shadow-[0_8px_24px_rgba(110,46,160,0.6)] 
        flex flex-col gap-5 overflow-hidden max-w-[320px] w-full mx-auto
        select-none
      "
    >
      {/* Capa do álbum */}
      <img
        src={coverUrl}
        alt={`${artistName} - ${albumName}`}
        className="
          w-36 h-36 rounded-2xl shadow-xl object-cover mx-auto
          ring-4 ring-purple-800
          transition-transform duration-300 hover:scale-105
        "
        loading="lazy"
      />

      {/* Info */}
      <div className="text-center">
        <h2 className="text-2xl font-extrabold drop-shadow-lg tracking-wide">
          {albumName}
        </h2>
        <p className="text-md text-purple-300 drop-shadow-md mt-1">{artistName}</p>
      </div>

      {/* Barra de progresso */}
      <div
        className="
          relative w-full h-2 rounded-full bg-purple-900/50 
          cursor-pointer hover:bg-purple-700/70 transition-colors
          shadow-inner
        "
      >
        <input
          type="range"
          min={0}
          max={100}
          value={progress}
          onChange={onSeek}
          className="
            absolute top-0 left-0 w-full h-2 rounded-full appearance-none bg-transparent cursor-pointer
            focus:outline-none
          "
          style={{
            background: `linear-gradient(to right, #b88de0 0%, #b88de0 ${progress}%, transparent ${progress}%, transparent 100%)`,
          }}
          title="Seek"
        />
      </div>

      {/* Tempo */}
      <div className="flex justify-between text-xs font-mono text-purple-300 select-none">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* Controles */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <button
          aria-label="Previous"
          className="
            p-3 rounded-full 
            text-purple-300 hover:text-white 
            hover:bg-purple-700/60 transition-colors 
            shadow-md hover:shadow-white/40 active:scale-95
            duration-200 cursor-pointer
          "
          title="Previous (não implementado)"
        >
          <FaBackward size={20} />
        </button>

        <button
          aria-label={isPlaying ? "Pause" : "Play"}
          onClick={togglePlay}
          className="
            p-5 bg-purple-300 rounded-full text-purple-900 
            shadow-lg hover:text-white hover:bg-purple-800 
            hover:shadow-white transition-all
            hover:scale-110 active:scale-95 duration-300 cursor-pointer
          "
        >
          {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
        </button>

        <button
          aria-label="Next"
          className="
            p-3 rounded-full 
            text-purple-300 hover:text-white 
            hover:bg-purple-700/60 transition-colors 
            shadow-md hover:shadow-white/40 active:scale-95
            duration-200 cursor-pointer
          "
          title="Next (não implementado)"
        >
          <FaForward size={20} />
        </button>

        {/* Volume */}
        <div className="flex items-center space-x-3 w-full max-w-[130px] ml-auto">
          <button
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute" : "Mute"}
            className="
              text-purple-300 hover:text-white 
              shadow-md hover:shadow-white/40 rounded-full p-1
              transition-colors duration-200 cursor-pointer
            "
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted || volume === 0 ? (
              <FaVolumeMute size={20} />
            ) : (
              <FaVolumeUp size={20} />
            )}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={onVolumeChange}
            className="
              w-full h-1 rounded-lg cursor-pointer accent-purple-400
              shadow-inner
              hover:accent-gray-200
              transition-colors duration-200
            "
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
