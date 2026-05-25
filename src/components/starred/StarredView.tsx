import { Link } from 'react-router-dom';
import type { Podcast, Episode } from '../../types';
import { Star, ChevronRight, User, ListFilter } from 'lucide-react';
import { EpisodeRow } from '../episodes/EpisodeRow';
import { TOPICS } from '../../constants/podcasts';

interface StarredViewProps {
  podcasts: Podcast[];
  starredPodcastIds: Set<string>;
  starredEpisodeIds: Set<string>;
  queueEpisodeIds: Set<string>;
  history: Record<string, any>;
  playingEpisodeId?: string;
  isPlaying: boolean;
  onToggleSubscribe: (id: string) => void;
  onPlayEpisode: (episode: Episode) => void;
  onTogglePlay: () => void;
  onAddToQueue: (episode: Episode) => void;
  onRemoveFromQueue: (id: string) => void;
  onToggleStarEpisode: (id: string) => void;
  queueList: { id: string, episode: Episode }[];
  
  // Search & Filtering
  searchTerm: string;
  selectedTopic: string;
  setSelectedTopic: (topic: string) => void;
}

export function StarredView({
  podcasts,
  starredPodcastIds,
  starredEpisodeIds,
  queueEpisodeIds,
  history,
  playingEpisodeId,
  isPlaying,
  onToggleSubscribe,
  onPlayEpisode,
  onTogglePlay,
  onAddToQueue,
  onRemoveFromQueue,
  onToggleStarEpisode,
  queueList,
  searchTerm,
  selectedTopic,
  setSelectedTopic
}: StarredViewProps) {
  
  // Get subscribed podcasts
  const subscribedPodcasts = podcasts.filter(p => starredPodcastIds.has(p.id));

  // Get starred episodes
  const starredEpisodes = podcasts
    .flatMap(p => p.episodes.map(ep => ({ ...ep, podcastTitle: p.title })))
    .filter(ep => starredEpisodeIds.has(ep.id));

  // Process search and topic filters for episodes
  const filteredEpisodes = starredEpisodes.filter(episode => {
    const matchesSearch = episode.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          episode.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          episode.podcastTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTopic = selectedTopic === 'All' || (episode.topics || []).includes(selectedTopic);
    
    return matchesSearch && matchesTopic;
  });

  const hasSubscribed = subscribedPodcasts.length > 0;
  const hasStarredEpisodes = starredEpisodes.length > 0;

  if (!hasSubscribed && !hasStarredEpisodes) {
    return (
      <div className="text-center py-20 bg-white dark:bg-slate-900 border border-gray-250/60 dark:border-slate-800 rounded-2xl max-w-2xl mx-auto space-y-4">
        <div className="h-16 w-16 bg-pink-50 dark:bg-pink-950/20 text-pink-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <Star className="h-8 w-8 fill-current" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-wider">Your Library is Empty</h3>
          <p className="text-gray-500 dark:text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">
            Subscribe to shows and star individual episodes to build your custom collection of China insights.
          </p>
        </div>
        <div className="pt-2">
          <Link to="/" className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-xs font-black bg-indigo-650 hover:bg-indigo-750 text-white dark:bg-indigo-600 dark:hover:bg-indigo-700 shadow-md transition-colors">
            EXPLORE SHOWS
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-fade-in">
      
      {/* 1. Subscribed Podcasts Section */}
      {hasSubscribed && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-150 dark:border-slate-850 pb-2">
            <h3 className="text-sm font-black text-gray-400 dark:text-slate-500 uppercase tracking-wider">
              Subscribed Shows ({subscribedPodcasts.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {subscribedPodcasts.map(podcast => (
              <div 
                key={podcast.id}
                className="group relative bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-850 hover:border-indigo-350 dark:hover:border-indigo-900/60 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden"
              >
                <div className={`h-1.5 ${podcast.themeColor || 'bg-slate-600'}`}></div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex justify-between items-start gap-3 mb-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`h-11 w-11 flex items-center justify-center text-2.5xl rounded-xl shadow-inner ${podcast.themeColor || 'bg-slate-100'} bg-opacity-10 shrink-0 select-none`}>
                        {podcast.imageUrl}
                      </div>
                      {podcast.status === 'stale' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider bg-slate-100 text-slate-500 border border-slate-200/60 dark:bg-slate-800/70 dark:text-slate-400 dark:border-slate-700/50 shadow-sm shrink-0">
                          Ended
                        </span>
                      )}
                    </div>
                    
                    <button
                      onClick={() => onToggleSubscribe(podcast.id)}
                      className="p-1.5 rounded-lg border bg-pink-50 border-pink-100 text-pink-500 dark:bg-pink-950/20 dark:border-pink-900/30 shrink-0"
                      title="Unsubscribe"
                    >
                      <Star className="h-3.5 w-3.5 fill-current" />
                    </button>
                  </div>

                  <div className="flex-1">
                    <Link to={`/podcast/${podcast.id}`} className="block group-hover:text-indigo-650 dark:group-hover:text-indigo-400 transition-colors">
                      <h4 className="text-sm font-black text-gray-900 dark:text-white leading-snug line-clamp-1">
                        {podcast.title}
                      </h4>
                    </Link>
                    <div className="flex items-center gap-1 text-[10px] text-gray-400 dark:text-slate-500 font-bold mt-1">
                      <User className="h-3 w-3" />
                      <span className="truncate">{podcast.host}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 dark:border-slate-850 flex items-center justify-between text-[10px] font-bold text-gray-400 dark:text-slate-550">
                    <span>{podcast.episodes.length} episodes</span>
                    <Link 
                      to={`/podcast/${podcast.id}`}
                      className="inline-flex items-center gap-0.5 text-indigo-650 dark:text-indigo-400 hover:translate-x-0.5 transition-transform"
                    >
                      <span>Go to Show</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Starred Episodes Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-gray-150 dark:border-slate-850 pb-2">
          <h3 className="text-sm font-black text-gray-400 dark:text-slate-500 uppercase tracking-wider">
            Favorite Episodes ({starredEpisodes.length})
          </h3>
        </div>

        {!hasStarredEpisodes ? (
          <div className="text-center py-10 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-850 rounded-2xl">
            <p className="text-gray-500 dark:text-slate-400 text-xs">
              No starred episodes yet. Star specific episodes in any show to display them here.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Topic Filter Pills */}
            <div className="flex flex-wrap gap-2 pb-1 items-center">
              <div className="flex items-center gap-1 text-[10px] font-black text-gray-400 dark:text-slate-500 mr-2 uppercase">
                <ListFilter className="h-3.5 w-3.5" />
                <span>Filter</span>
              </div>
              {TOPICS.map(topic => (
                <button
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  className={`px-3 py-1.5 rounded-xl text-[9px] font-black transition-all border ${
                    selectedTopic === topic
                    ? 'bg-indigo-650 text-white border-indigo-650 dark:bg-indigo-600 dark:border-indigo-600 shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-gray-500 dark:text-slate-400 border-gray-250 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {topic.toUpperCase()}
                </button>
              ))}
            </div>

            {filteredEpisodes.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-850 rounded-2xl">
                <p className="text-gray-500 dark:text-slate-400 text-xs">
                  No starred episodes match the selected topic.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100 dark:divide-slate-850 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-850 rounded-2xl overflow-hidden shadow-sm">
                {filteredEpisodes.map(episode => {
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
            )}
          </div>
        )}
      </div>

    </div>
  );
}
