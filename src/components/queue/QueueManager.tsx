import type { Episode } from '../../types';
import { Play, ArrowUp, ArrowDown, Trash2 } from 'lucide-react';

interface QueueManagerProps {
  queue: { id: string, episode: Episode }[];
  playingEpisodeId?: string;
  onPlayEpisode: (episode: Episode) => void;
  onRemoveFromQueue: (id: string) => void;
  onClearQueue: () => void;
  onMoveQueueItem: (fromIndex: number, toIndex: number) => void;
}

export function QueueManager({
  queue,
  playingEpisodeId,
  onPlayEpisode,
  onRemoveFromQueue,
  onClearQueue,
  onMoveQueueItem
}: QueueManagerProps) {

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-gray-150 dark:border-slate-800">
        <div>
          <h2 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-wider">
            Listening Queue ({queue.length})
          </h2>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
            Episodes will play sequentially in the order shown below.
          </p>
        </div>
        {queue.length > 0 && (
          <button
            onClick={onClearQueue}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black text-red-650 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20 border border-transparent transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            <span>CLEAR QUEUE</span>
          </button>
        )}
      </div>

      {queue.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 border border-gray-250/60 dark:border-slate-800 rounded-2xl space-y-4">
          <div className="h-12 w-12 flex items-center justify-center text-2xl bg-indigo-50 dark:bg-slate-800 rounded-xl mx-auto">
            🎧
          </div>
          <div className="space-y-1">
            <p className="text-gray-900 dark:text-white text-sm font-bold">Your queue is empty</p>
            <p className="text-gray-500 dark:text-slate-400 text-xs max-w-xs mx-auto leading-relaxed">
              Explore show catalogs or active episodes and click the <span className="font-bold border border-gray-200 dark:border-slate-800 px-1 py-0.5 rounded text-[10px] bg-gray-50 dark:bg-slate-950">+</span> button to add them here.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="divide-y divide-gray-100 dark:divide-slate-850 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-850 rounded-2xl overflow-hidden shadow-sm">
            {queue.map((item, index) => {
              const isCurrentPlaying = playingEpisodeId === item.episode.id;
              
              return (
                <div 
                  key={item.id}
                  className={`p-4 flex gap-4 items-center transition-colors hover:bg-gray-50 dark:hover:bg-slate-850/20 ${
                    isCurrentPlaying 
                    ? 'bg-indigo-50/40 dark:bg-indigo-950/10' 
                    : ''
                  }`}
                >
                  {/* Play Button Index */}
                  <div className="shrink-0 flex items-center gap-3">
                    <span className="text-xs font-black text-gray-400 dark:text-slate-500 w-4 text-center">
                      {index + 1}
                    </span>
                    <button
                      onClick={() => onPlayEpisode(item.episode)}
                      className={`h-9 w-9 flex items-center justify-center rounded-full hover:scale-105 active:scale-95 transition-all shadow-sm ${
                        isCurrentPlaying
                        ? 'bg-indigo-650 text-white dark:bg-indigo-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-400'
                      }`}
                      title="Play Episode"
                    >
                      <Play className="h-4 w-4 fill-current ml-0.5" />
                    </button>
                  </div>

                  {/* Info details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate">
                      {item.episode.title}
                    </h4>
                    <p className="text-[10px] text-gray-500 dark:text-slate-400 truncate uppercase mt-0.5">
                      {item.episode.podcastTitle}
                    </p>
                  </div>

                  {/* Ordering reorder buttons & deletion */}
                  <div className="shrink-0 flex items-center gap-1">
                    <button
                      onClick={() => onMoveQueueItem(index, index - 1)}
                      disabled={index === 0}
                      className="p-2 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-slate-200 disabled:opacity-30 disabled:pointer-events-none transition-colors hover:bg-gray-100 dark:hover:bg-slate-800"
                      title="Move Up"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onMoveQueueItem(index, index + 1)}
                      disabled={index === queue.length - 1}
                      className="p-2 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-slate-200 disabled:opacity-30 disabled:pointer-events-none transition-colors hover:bg-gray-100 dark:hover:bg-slate-800"
                      title="Move Down"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onRemoveFromQueue(item.id)}
                      className="p-2 rounded-xl text-gray-400 hover:text-red-650 dark:hover:text-red-400 transition-colors hover:bg-gray-100 dark:hover:bg-slate-800 ml-1"
                      title="Remove from Queue"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
