import { Play, Pause, Star, Plus, Check, Calendar, Clock } from 'lucide-react';
import type { Episode } from '../../types';

interface EpisodeRowProps {
  episode: Episode;
  isCurrentPlaying: boolean;
  isPlaying: boolean;
  isStarred: boolean;
  inQueue: boolean;
  playProgress: number; // in seconds
  completed: boolean;
  onPlay: () => void;
  onTogglePlay: () => void;
  onToggleStar: () => void;
  onAddToQueue: () => void;
  onRemoveFromQueue: () => void;
}

export function EpisodeRow({
  episode,
  isCurrentPlaying,
  isPlaying,
  isStarred,
  inQueue,
  playProgress,
  completed,
  onPlay,
  onTogglePlay,
  onToggleStar,
  onAddToQueue,
  onRemoveFromQueue
}: EpisodeRowProps) {
  
  const formatDuration = (sec: number) => {
    const mins = Math.floor(sec / 60);
    return `${mins} min`;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const progressPercent = Math.min((playProgress / episode.duration) * 100, 100);

  return (
    <div 
      className={`group p-4 md:p-5 flex gap-4 transition-colors hover:bg-gray-50/50 dark:hover:bg-slate-850/30 ${
        isCurrentPlaying 
        ? 'bg-indigo-50/40 dark:bg-indigo-950/10' 
        : ''
      }`}
    >
      {/* Play/Pause Button on Left */}
      <div className="shrink-0 flex items-center">
        {isCurrentPlaying ? (
          <button
            onClick={onTogglePlay}
            className="h-10 w-10 md:h-12 md:w-12 flex items-center justify-center bg-indigo-650 text-white dark:bg-indigo-600 rounded-full hover:scale-105 active:scale-95 transition-all shadow-md"
          >
            {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current ml-0.5" />}
          </button>
        ) : (
          <button
            onClick={onPlay}
            className="h-10 w-10 md:h-12 md:w-12 flex items-center justify-center bg-gray-150 text-gray-700 dark:bg-slate-800 dark:text-slate-200 rounded-full hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-400 hover:scale-105 active:scale-95 transition-all"
          >
            <Play className="h-5 w-5 fill-current ml-0.5" />
          </button>
        )}
      </div>

      {/* Main content body */}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <h4 className={`text-sm font-bold truncate ${
            isCurrentPlaying
            ? 'text-indigo-750 dark:text-indigo-400'
            : 'text-gray-900 dark:text-white'
          }`}>
            {episode.title}
          </h4>
          {completed && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30">
              PLAYED
            </span>
          )}
        </div>
        
        <p className="text-xs text-gray-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {episode.description}
        </p>

        {/* Info stats bar */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-2 text-[10px] text-gray-400 dark:text-slate-500 font-bold">
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formatDate(episode.publishDate)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{formatDuration(episode.duration)}</span>
          </div>
          {episode.podcastTitle && (
            <span className="text-indigo-650/80 dark:text-indigo-450 uppercase text-[9px]">
              {episode.podcastTitle}
            </span>
          )}
        </div>

        {/* Listening progress bar */}
        {playProgress > 0 && !completed && (
          <div className="pt-2 max-w-xs">
            <div className="w-full h-1 bg-gray-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-500 rounded-full" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <span className="text-[9px] text-gray-400 dark:text-slate-550 block mt-0.5 font-semibold">
              Resumes at {Math.floor(playProgress / 60)}m
            </span>
          </div>
        )}
      </div>

      {/* Row side actions */}
      <div className="shrink-0 flex items-center gap-2">
        {/* Star */}
        <button
          onClick={onToggleStar}
          className={`p-2 rounded-xl transition-colors hover:bg-gray-100 dark:hover:bg-slate-800 ${
            isStarred
            ? 'text-pink-500 dark:text-pink-400'
            : 'text-gray-400 hover:text-gray-600 dark:text-slate-500 dark:hover:text-slate-300'
          }`}
          title="Star Episode"
        >
          <Star className={`h-4.5 w-4.5 ${isStarred ? 'fill-current' : ''}`} />
        </button>

        {/* Queue */}
        {inQueue ? (
          <button
            onClick={onRemoveFromQueue}
            className="p-2 rounded-xl text-violet-650 bg-violet-50 border border-violet-100 dark:bg-violet-950/20 dark:border-violet-900/30 dark:text-violet-400"
            title="Remove from Queue"
          >
            <Check className="h-4.5 w-4.5" />
          </button>
        ) : (
          <button
            onClick={onAddToQueue}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-600 border border-gray-200 bg-white hover:bg-gray-50 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 dark:text-slate-500 dark:hover:text-slate-300"
            title="Add to Queue"
          >
            <Plus className="h-4.5 w-4.5" />
          </button>
        )}
      </div>
    </div>
  );
}
