import { useState, useEffect, useRef, useMemo } from 'react';
import type { Episode } from '../../types';
import { EpisodeRow } from './EpisodeRow';
import { TOPICS } from '../../constants/podcasts';
import { ListFilter } from 'lucide-react';

interface EpisodeListProps {
  episodes: Episode[];
  starredEpisodeIds: Set<string>;
  queueEpisodeIds: Set<string>;
  history: Record<string, any>;
  playingEpisodeId?: string;
  isPlaying: boolean;
  onPlayEpisode: (episode: Episode) => void;
  onTogglePlay: () => void;
  onAddToQueue: (episode: Episode) => void;
  onRemoveFromQueue: (id: string) => void;
  onToggleStarEpisode: (id: string) => void;
  queueList: { id: string, episode: Episode }[];
  
  // Filtering & Search
  searchTerm: string;
  selectedTopic: string;
  setSelectedTopic: (topic: string) => void;
  emptyMessage?: string;
}

export function EpisodeList({
  episodes,
  starredEpisodeIds,
  queueEpisodeIds,
  history,
  playingEpisodeId,
  isPlaying,
  onPlayEpisode,
  onTogglePlay,
  onAddToQueue,
  onRemoveFromQueue,
  onToggleStarEpisode,
  queueList,
  searchTerm,
  selectedTopic,
  setSelectedTopic,
  emptyMessage = "No episodes found."
}: EpisodeListProps) {

  // Process search and topic filters
  const filteredEpisodes = episodes.filter(episode => {
    const matchesSearch = episode.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          episode.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          episode.podcastTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTopic = selectedTopic === 'All' || (episode.topics || []).includes(selectedTopic);
    
    return matchesSearch && matchesTopic;
  });

  // Infinite scroll pagination state
  const [visibleCount, setVisibleCount] = useState(20);
  const observerRef = useRef<HTMLDivElement | null>(null);

  // Reset visibleCount when search query or topic filter changes
  useEffect(() => {
    setVisibleCount(20);
  }, [searchTerm, selectedTopic]);

  // Handle observer trigger to load more episodes
  useEffect(() => {
    if (visibleCount >= filteredEpisodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount(prev => Math.min(prev + 25, filteredEpisodes.length));
        }
      },
      { rootMargin: '200px' }
    );

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [filteredEpisodes.length, visibleCount]);

  const slicedEpisodes = useMemo(() => {
    return filteredEpisodes.slice(0, visibleCount);
  }, [filteredEpisodes, visibleCount]);

  return (
    <div className="space-y-6">
      {/* Topic Filter Pills */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-gray-100 dark:border-slate-850 items-center">
        <div className="flex items-center gap-1.5 text-xs font-black text-gray-400 dark:text-slate-500 mr-2 uppercase">
          <ListFilter className="h-4 w-4" />
          <span>Filter</span>
        </div>
        {TOPICS.map(topic => (
          <button
            key={topic}
            onClick={() => setSelectedTopic(topic)}
            className={`px-3 py-1.5 rounded-xl text-[10px] font-black transition-all border ${
              selectedTopic === topic
              ? 'bg-indigo-650 text-white border-indigo-650 dark:bg-indigo-600 dark:border-indigo-600 shadow-sm'
              : 'bg-white dark:bg-slate-900 text-gray-500 dark:text-slate-400 border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/60'
            }`}
          >
            {topic.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Episode Feed */}
      {filteredEpisodes.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 border border-gray-250/60 dark:border-slate-800 rounded-2xl">
          <p className="text-gray-500 dark:text-slate-400 text-sm">{emptyMessage}</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="divide-y divide-gray-100 dark:divide-slate-850 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-850 rounded-2xl overflow-hidden shadow-sm">
            {slicedEpisodes.map(episode => {
              const inQueue = queueEpisodeIds.has(episode.id);
              const queueItem = queueList.find(item => item.episode.id === episode.id);
              const isEpStarred = starredEpisodeIds.has(episode.id);
              const playProgress = history[episode.id]?.progress || 0;
              const completed = history[episode.id]?.completed || false;

              return (
                <EpisodeRow
                  key={episode.id}
                  episode={episode}
                  isCurrentPlaying={playingEpisodeId === episode.id}
                  isPlaying={isPlaying && playingEpisodeId === episode.id}
                  isStarred={isEpStarred}
                  inQueue={inQueue}
                  playProgress={playProgress}
                  completed={completed}
                  onPlay={() => onPlayEpisode(episode)}
                  onTogglePlay={onTogglePlay}
                  onToggleStar={() => onToggleStarEpisode(episode.id)}
                  onAddToQueue={() => onAddToQueue(episode)}
                  onRemoveFromQueue={() => queueItem && onRemoveFromQueue(queueItem.id)}
                />
              );
            })}
          </div>

          {/* Sentinel loader for infinite scroll */}
          {visibleCount < filteredEpisodes.length && (
            <div ref={observerRef} className="py-6 flex justify-center items-center">
              <div className="flex gap-1.5 items-center justify-center">
                <span className="w-2.5 h-2.5 bg-indigo-500/70 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                <span className="w-2.5 h-2.5 bg-indigo-500/70 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                <span className="w-2.5 h-2.5 bg-indigo-500/70 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
