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
  const [isSeeking, setIsSeeking] = useState(false);

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
    setCurrentTime(current);
  };

  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newProgress = Number(e.target.value);
    const newTime = (audioRef.current.duration / 100) * newProgress;
    audioRef.current.currentTime = newTime;
    setProgress(newProgress);
    setCurrentTime(newTime);
  };

  const onSeekStart = () => setIsSeeking(true);
  const onSeekEnd = () => setIsSeeking(false);

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
        bg-gradient-to-br from-[#121212] to-[#1e1e2f] text-white
        rounded-3xl p-8 space-y-6
        border border-purple-700/60 ring-1 ring-purple-500/40
        shadow-[0_0_24px_#9c7cffaa] hover:shadow-[0_0_40px_#9c7cffcc]
        transition-all duration-300 hover:scale-[1.03]
        max-w-sm w-full mx-auto
      "
    >
      <img
        src={coverUrl}
        alt={`${artistName} - ${albumName}`}
        className="
          w-40 h-40 mx-auto rounded-3xl object-cover
          ring-4 ring-purple-500/80 shadow-2xl
          animate-pulse-slow hover:scale-105 hover:shadow-[0_0_40px_rgba(216,180,254,0.9)]
          transition-all duration-500 ease-in-out
          cursor-pointer select-none
        "
        loading="lazy"
        draggable={false}
        onDoubleClick={togglePlay}
      />

      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-wide truncate text-purple-300 drop-shadow-lg">
          {albumName}
        </h2>
        <p className="text-sm sm:text-md text-purple-400 mt-1 truncate drop-shadow-md">
          {artistName}
        </p>
      </div>

      <div className="relative w-full h-3 rounded-full bg-purple-900/90 shadow-inner">
        <input
          type="range"
          min={0}
          max={100}
          value={progress}
          onChange={onSeek}
          onMouseDown={onSeekStart}
          onMouseUp={onSeekEnd}
          onTouchStart={onSeekStart}
          onTouchEnd={onSeekEnd}
          className="absolute top-0 left-0 w-full h-3 rounded-full appearance-none bg-transparent cursor-pointer"
          style={{
            background: `linear-gradient(90deg, #d8b4fe ${progress}%, #6b21a8 ${progress}%)`,
            transition: isSeeking ? "none" : "background 0.3s ease",
          }}
        />
        {isSeeking && (
          <div
            className="absolute -top-8 bg-purple-700 text-white text-xs rounded px-3 py-1 opacity-90 select-none pointer-events-none transition-opacity duration-200"
            style={{ left: `${progress}%`, transform: "translateX(-50%)" }}
          >
            {formatTime(currentTime)}
          </div>
        )}
      </div>

      <div className="flex justify-between text-xs font-mono text-purple-300">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <button
          aria-label="Previous"
          className="p-3 rounded-full text-purple-400 hover:text-purple-200 hover:bg-purple-700/95 transition-colors shadow-md hover:shadow-purple-400/70 active:scale-90 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-1"
          title="Anterior"
        >
          <FaBackward size={20} />
        </button>

        <button
          aria-label={isPlaying ? "Pause" : "Play"}
          onClick={togglePlay}
          className="
            p-6 rounded-full text-purple-900 bg-purple-400
            shadow-lg hover:text-white hover:bg-purple-700 hover:shadow-[0_0_25px_rgba(216,180,254,0.8)]
            transition-transform duration-300 ease-in-out active:scale-95
            focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-offset-2
          "
          title={isPlaying ? "Pausar" : "Tocar"}
        >
          {isPlaying ? <FaPause size={26} /> : <FaPlay size={26} />}
        </button>

        <button
          aria-label="Next"
          className="p-3 rounded-full text-purple-400 hover:text-purple-200 hover:bg-purple-700/95 transition-colors shadow-md hover:shadow-purple-400/70 active:scale-90 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-1"
          title="Próxima"
        >
          <FaForward size={20} />
        </button>

        <div className="flex items-center space-x-3 w-full max-w-[140px] ml-auto">
          <button
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute" : "Mute"}
            className="text-purple-400 hover:text-purple-200 shadow-md hover:shadow-purple-400/70 rounded-full p-1 transition-colors duration-300 active:scale-90 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-1"
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
            className="w-full h-2 rounded-lg cursor-pointer accent-purple-400 hover:accent-purple-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-1"
            title="Volume"
          />
        </div>
      </div>

      <audio ref={audioRef} src={audioSrc} preload="metadata" />
    </div>
  );
};

export default MusicPlayer;
