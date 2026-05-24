import { useParams, Link, useNavigate } from 'react-router-dom';
import type { Podcast, Episode } from '../../types';
import { ArrowLeft, Star, ExternalLink, Trash2 } from 'lucide-react';
import { EpisodeRow } from '../episodes/EpisodeRow';

interface PodcastDetailProps {
  podcasts: Podcast[];
  starredPodcastIds: Set<string>;
  starredEpisodeIds: Set<string>;
  queueEpisodeIds: Set<string>;
  history: Record<string, any>;
  playingEpisodeId?: string;
  isPlaying: boolean;
  onToggleSubscribe: (id: string) => void;
  onRemoveCustomPodcast: (id: string) => void;
  onPlayEpisode: (episode: Episode) => void;
  onTogglePlay: () => void;
  onAddToQueue: (episode: Episode) => void;
  onRemoveFromQueue: (id: string) => void;
  onToggleStarEpisode: (id: string) => void;
  queueList: { id: string, episode: Episode }[];
}

export function PodcastDetail({
  podcasts,
  starredPodcastIds,
  starredEpisodeIds,
  queueEpisodeIds,
  history,
  playingEpisodeId,
  isPlaying,
  onToggleSubscribe,
  onRemoveCustomPodcast,
  onPlayEpisode,
  onTogglePlay,
  onAddToQueue,
  onRemoveFromQueue,
  onToggleStarEpisode,
  queueList
}: PodcastDetailProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const podcast = podcasts.find(p => p.id === id);

  if (!podcast) {
    return (
      <div className="text-center py-20 bg-white dark:bg-slate-900 border border-gray-250/60 dark:border-slate-800 rounded-2xl">
        <p className="text-gray-500 dark:text-slate-400 text-sm mb-4">Podcast not found.</p>
        <Link to="/" className="text-indigo-650 dark:text-indigo-400 font-bold hover:underline">
          Return to Explore
        </Link>
      </div>
    );
  }

  const isSubscribed = starredPodcastIds.has(podcast.id);
  const isCustom = podcast.id.startsWith('custom-podcast-');

  const handleRemoveCustom = () => {
    if (confirm(`Are you sure you want to remove the podcast "${podcast.title}" and all its episodes?`)) {
      onRemoveCustomPodcast(podcast.id);
      navigate('/');
    }
  };

  return (
    <div className="space-y-8">
      {/* Back button */}
      <div>
        <Link 
          to="/" 
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Shows
        </Link>
      </div>

      {/* Podcast Banner details */}
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-850 rounded-2xl overflow-hidden shadow-sm">
        {/* Banner strip */}
        <div className={`h-4 ${podcast.themeColor || 'bg-slate-600'}`}></div>

        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
          {/* Cover Avatar Large */}
          <div className={`h-24 w-24 md:h-28 md:w-28 flex items-center justify-center text-5xl md:text-6xl rounded-2xl shadow-inner ${podcast.themeColor || 'bg-slate-100'} bg-opacity-10 shrink-0 select-none`}>
            {podcast.imageUrl}
          </div>

          <div className="flex-1 min-w-0 space-y-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
                {podcast.title}
              </h2>
              <p className="text-sm font-bold text-gray-500 dark:text-slate-400 mt-1">
                Hosted by {podcast.host}
              </p>
            </div>

            <p className="text-sm text-gray-600 dark:text-slate-350 leading-relaxed max-w-3xl">
              {podcast.description}
            </p>

            {/* Platform links */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onToggleSubscribe(podcast.id)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition-all border ${
                  isSubscribed
                  ? 'bg-pink-50 border-pink-100 text-pink-700 dark:bg-pink-950/20 dark:border-pink-900/30 dark:text-pink-400'
                  : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                <Star className={`h-4 w-4 ${isSubscribed ? 'fill-current' : ''}`} />
                <span>{isSubscribed ? 'SUBSCRIBED' : 'SUBSCRIBE'}</span>
              </button>

              {podcast.spotifyUrl && (
                <a
                  href={podcast.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
                >
                  <span>SPOTIFY</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}

              {podcast.applePodcastsUrl && (
                <a
                  href={podcast.applePodcastsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
                >
                  <span>APPLE PODCASTS</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}

              {isCustom && (
                <button
                  onClick={handleRemoveCustom}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black bg-red-50 hover:bg-red-100 text-red-650 border border-red-100 dark:bg-red-950/20 dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-950/40 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>REMOVE SHOW</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Episode listings */}
      <div className="space-y-4">
        <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-wider">
          Episodes ({podcast.episodes.length})
        </h3>

        {podcast.episodes.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 border border-gray-250/60 dark:border-slate-800 rounded-2xl">
            <p className="text-gray-500 dark:text-slate-400 text-sm">No episodes available for this podcast.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-slate-850 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-850 rounded-2xl overflow-hidden shadow-sm">
            {podcast.episodes.map(episode => {
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
    </div>
  );
}
