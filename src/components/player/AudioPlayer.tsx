import { Play, Pause, RotateCcw, RotateCw, Volume2, VolumeX, Gauge, SkipForward, Star } from 'lucide-react'
import type { Episode } from '../../types'

interface AudioPlayerProps {
  currentEpisode: Episode | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  speed: number;
  volume: number;
  queueLength: number;
  isStarred: boolean;
  onTogglePlay: () => void;
  onSeek: (seconds: number) => void;
  onSkipForward: () => void;
  onSkipBackward: () => void;
  onSetSpeed: (speed: number) => void;
  onSetVolume: (volume: number) => void;
  onPlayNext: () => void;
  onToggleStar: () => void;
}

export function AudioPlayer({
  currentEpisode,
  isPlaying,
  progress,
  duration,
  speed,
  volume,
  queueLength,
  isStarred,
  onTogglePlay,
  onSeek,
  onSkipForward,
  onSkipBackward,
  onSetSpeed,
  onSetVolume,
  onPlayNext,
  onToggleStar
}: AudioPlayerProps) {
  if (!currentEpisode) return null;

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '00:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleProgressBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSeek(parseFloat(e.target.value));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSetVolume(parseFloat(e.target.value));
  };

  const toggleMute = () => {
    onSetVolume(volume > 0 ? 0 : 0.8);
  };

  const cycleSpeed = () => {
    const speeds = [0.75, 1.0, 1.25, 1.5, 2.0];
    const currentIndex = speeds.indexOf(speed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    onSetSpeed(speeds[nextIndex]);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-30 max-w-5xl mx-auto glass-panel border border-white/20 dark:border-slate-800/40 rounded-2xl shadow-2xl p-4 transition-all duration-300">
      <div className="flex flex-col md:flex-row items-center gap-4">
        {/* Track info & visualizer */}
        <div className="flex items-center w-full md:w-1/3 gap-3">
          <div className="h-12 w-12 flex items-center justify-center text-2xl bg-indigo-50 dark:bg-slate-800 rounded-xl select-none shadow-inner">
            {/* Visualizer element or podcast logo */}
            {isPlaying ? (
              <div className="flex gap-0.5 items-end justify-center h-6 w-6">
                <span className="wave-bar w-1 bg-indigo-500 rounded-full h-1"></span>
                <span className="wave-bar w-1 bg-indigo-500 rounded-full h-2"></span>
                <span className="wave-bar w-1 bg-indigo-500 rounded-full h-3"></span>
                <span className="wave-bar w-1 bg-indigo-500 rounded-full h-1"></span>
              </div>
            ) : (
              <span>🎧</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate">
              {currentEpisode.title}
            </h4>
            <p className="text-xs text-gray-500 dark:text-slate-400 truncate">
              {currentEpisode.podcastTitle}
            </p>
          </div>
          <button
            onClick={onToggleStar}
            className={`p-2 rounded-lg transition-colors ${
              isStarred 
              ? 'text-pink-500 hover:text-pink-600' 
              : 'text-gray-400 hover:text-gray-600 dark:hover:text-slate-350'
            }`}
            title="Star Episode"
          >
            <Star className={`h-4.5 w-4.5 ${isStarred ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Center player controls & progress bar */}
        <div className="flex flex-col items-center w-full md:w-2/5 gap-2">
          {/* Controls */}
          <div className="flex items-center gap-5">
            <button
              onClick={onSkipBackward}
              className="p-1.5 text-gray-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              title="Back 15s"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
            <button
              onClick={onTogglePlay}
              className="h-10 w-10 flex items-center justify-center bg-indigo-650 dark:bg-indigo-600 text-white rounded-full hover:scale-105 active:scale-95 transition-all shadow-md"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current ml-0.5" />}
            </button>
            <button
              onClick={onSkipForward}
              className="p-1.5 text-gray-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              title="Forward 15s"
            >
              <RotateCw className="h-5 w-5" />
            </button>
            {queueLength > 0 && (
              <button
                onClick={onPlayNext}
                className="p-1.5 text-gray-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors relative"
                title="Skip to Next in Queue"
              >
                <SkipForward className="h-4.5 w-4.5" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-violet-650 text-[8px] font-bold text-white">
                  {queueLength}
                </span>
              </button>
            )}
          </div>

          {/* Time slider */}
          <div className="flex items-center w-full gap-2 text-[10px] text-gray-500 dark:text-slate-400 font-semibold">
            <span>{formatTime(progress)}</span>
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={progress}
              onChange={handleProgressBarChange}
              className="flex-1 h-1.5 bg-gray-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none"
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right volume & rate controls */}
        <div className="flex items-center justify-end w-full md:w-1/3 gap-4">
          {/* Playback speed switcher */}
          <button
            onClick={cycleSpeed}
            className="flex items-center gap-1 text-xs font-black text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/30 px-2 py-1.5 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-950/60 transition-colors"
            title="Cycle Playback Speed"
          >
            <Gauge className="h-3.5 w-3.5" />
            <span>{speed}x</span>
          </button>

          {/* Volume slider */}
          <div className="flex items-center gap-2 max-w-[120px]">
            <button
              onClick={toggleMute}
              className="text-gray-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              title={volume === 0 ? "Unmute" : "Mute"}
            >
              {volume === 0 ? <VolumeX className="h-4.5 w-4.5" /> : <Volume2 className="h-4.5 w-4.5" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 md:w-20 h-1 bg-gray-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
