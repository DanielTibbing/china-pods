export interface Episode {
  id: string;
  title: string;
  description: string;
  publishDate: string;
  duration: number; // in seconds
  audioUrl: string;
  podcastId: string;
  podcastTitle: string;
  topics: string[];
}

export interface Podcast {
  id: string;
  title: string;
  description: string;
  host: string;
  imageUrl: string;
  themeColor: string; // Tailwind bg color class, e.g. 'bg-indigo-600'
  accentColor: string; // Tailwind text color class, e.g. 'text-indigo-600'
  applePodcastsUrl?: string;
  spotifyUrl?: string;
  rssUrl?: string;
  status?: 'active' | 'stale';
  categories?: string[];
  episodes: Episode[];
}

export interface PlaybackState {
  currentEpisode: Episode | null;
  isPlaying: boolean;
  progress: number; // in seconds
  duration: number; // in seconds
  speed: number; // 0.75, 1, 1.25, 1.5, 2
}

export interface QueueItem {
  id: string; // Unique queue item ID
  episode: Episode;
}

export interface EpisodeHistory {
  episodeId: string;
  playedAt: string; // ISO String
  progress: number; // in seconds
  completed: boolean;
}
