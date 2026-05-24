import { useState, useEffect, useRef, useMemo } from 'react';
import type { Episode, Podcast, QueueItem, EpisodeHistory } from '../types';
import { PRESET_PODCASTS } from '../constants/podcasts';

export function usePodcasts() {
  // --- STATE ---
  const [customPodcasts, setCustomPodcasts] = useState<Podcast[]>(() => {
    const saved = localStorage.getItem('custom_podcasts_data');
    return saved ? JSON.parse(saved) : [];
  });

  const allPodcasts = useMemo(() => {
    return [...PRESET_PODCASTS, ...customPodcasts];
  }, [customPodcasts]);

  const allEpisodes = useMemo(() => {
    const episodes: Episode[] = [];
    allPodcasts.forEach((podcast) => {
      podcast.episodes.forEach((episode) => {
        episodes.push({
          ...episode,
          podcastTitle: podcast.title
        });
      });
    });
    return episodes.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  }, [allPodcasts]);

  const [starredPodcastIds, setStarredPodcastIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('starred_podcast_ids');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const [starredEpisodeIds, setStarredEpisodeIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('starred_episode_ids');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const [queue, setQueue] = useState<QueueItem[]>(() => {
    const saved = localStorage.getItem('podcast_playback_queue');
    return saved ? JSON.parse(saved) : [];
  });

  const [history, setHistory] = useState<Record<string, EpisodeHistory>>(() => {
    const saved = localStorage.getItem('podcast_playback_history');
    return saved ? JSON.parse(saved) : {};
  });

  // Playback state
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(() => {
    const saved = localStorage.getItem('current_playing_episode');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(() => {
    const saved = localStorage.getItem('playback_speed');
    return saved ? parseFloat(saved) : 1.0;
  });
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem('playback_volume');
    return saved ? parseFloat(saved) : 0.8;
  });

  // Audio HTML Element reference
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // --- PERSISTENCE EFFECTS ---
  useEffect(() => {
    localStorage.setItem('custom_podcasts_data', JSON.stringify(customPodcasts));
  }, [customPodcasts]);

  useEffect(() => {
    localStorage.setItem('starred_podcast_ids', JSON.stringify(Array.from(starredPodcastIds)));
  }, [starredPodcastIds]);

  useEffect(() => {
    localStorage.setItem('starred_episode_ids', JSON.stringify(Array.from(starredEpisodeIds)));
  }, [starredEpisodeIds]);

  useEffect(() => {
    localStorage.setItem('podcast_playback_queue', JSON.stringify(queue));
  }, [queue]);

  useEffect(() => {
    localStorage.setItem('podcast_playback_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    if (currentEpisode) {
      localStorage.setItem('current_playing_episode', JSON.stringify(currentEpisode));
    } else {
      localStorage.removeItem('current_playing_episode');
    }
  }, [currentEpisode]);

  useEffect(() => {
    localStorage.setItem('playback_speed', speed.toString());
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  }, [speed]);

  useEffect(() => {
    localStorage.setItem('playback_volume', volume.toString());
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // --- AUDIO ACTIONS & EVENT INITIALIZATION ---
  useEffect(() => {
    audioRef.current = new Audio();
    
    const audio = audioRef.current;
    audio.volume = volume;
    audio.playbackRate = speed;

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
      // Periodically update progress in history
      if (currentEpisode) {
        setHistory(prev => {
          const updated = {
            ...prev,
            [currentEpisode.id]: {
              episodeId: currentEpisode.id,
              playedAt: new Date().toISOString(),
              progress: audio.currentTime,
              completed: audio.currentTime >= audio.duration - 5 || (prev[currentEpisode.id]?.completed || false)
            }
          };
          return updated;
        });
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      // Auto play next in queue
      playNext();
    };

    const handleError = (e: any) => {
      console.error("Audio playback error:", e);
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    // Initial load
    if (currentEpisode) {
      audio.src = currentEpisode.audioUrl;
      const cachedHistory = history[currentEpisode.id];
      if (cachedHistory && !cachedHistory.completed) {
        audio.currentTime = cachedHistory.progress;
        setProgress(cachedHistory.progress);
      }
    }

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  // Sync src when current episode changes
  useEffect(() => {
    if (!audioRef.current || !currentEpisode) return;
    
    const isSameSrc = audioRef.current.src === currentEpisode.audioUrl;
    if (!isSameSrc) {
      const wasPlaying = isPlaying;
      audioRef.current.src = currentEpisode.audioUrl;
      audioRef.current.load();
      
      const cachedHistory = history[currentEpisode.id];
      if (cachedHistory && !cachedHistory.completed) {
        audioRef.current.currentTime = cachedHistory.progress;
        setProgress(cachedHistory.progress);
      } else {
        audioRef.current.currentTime = 0;
        setProgress(0);
      }
      
      audioRef.current.playbackRate = speed;
      audioRef.current.volume = volume;

      if (wasPlaying) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  }, [currentEpisode]);

  // --- PLAYBACK FUNCTIONS ---
  const playEpisode = (episode: Episode) => {
    setCurrentEpisode(episode);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }, 50);
  };

  const togglePlay = () => {
    if (!audioRef.current || !currentEpisode) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const seekTo = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = seconds;
      setProgress(seconds);
    }
  };

  const skipForward = (seconds = 15) => {
    if (audioRef.current) {
      const newTime = Math.min(audioRef.current.currentTime + seconds, duration);
      audioRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  const skipBackward = (seconds = 15) => {
    if (audioRef.current) {
      const newTime = Math.max(audioRef.current.currentTime - seconds, 0);
      audioRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  // --- QUEUE ACTIONS ---
  const addToQueue = (episode: Episode) => {
    setQueue(prev => {
      // Check if already in queue
      if (prev.some(item => item.episode.id === episode.id)) return prev;
      return [...prev, { id: `q-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`, episode }];
    });
  };

  const removeFromQueue = (queueItemId: string) => {
    setQueue(prev => prev.filter(item => item.id !== queueItemId));
  };

  const clearQueue = () => {
    setQueue([]);
  };

  const playNext = () => {
    if (queue.length === 0) return;
    const nextItem = queue[0];
    setQueue(prev => prev.slice(1));
    playEpisode(nextItem.episode);
  };

  const moveQueueItem = (fromIndex: number, toIndex: number) => {
    setQueue(prev => {
      const copy = [...prev];
      const [removed] = copy.splice(fromIndex, 1);
      copy.splice(toIndex, 0, removed);
      return copy;
    });
  };

  // --- STAR / SUBSCRIPTION FUNCTIONS ---
  const toggleStarPodcast = (podcastId: string) => {
    setStarredPodcastIds(prev => {
      const next = new Set(prev);
      if (next.has(podcastId)) {
        next.delete(podcastId);
      } else {
        next.add(podcastId);
      }
      return next;
    });
  };

  const toggleStarEpisode = (episodeId: string) => {
    setStarredEpisodeIds(prev => {
      const next = new Set(prev);
      if (next.has(episodeId)) {
        next.delete(episodeId);
      } else {
        next.add(episodeId);
      }
      return next;
    });
  };

  // --- CUSTOM PODCAST ADDER ---
  const addCustomPodcast = (podcastData: Omit<Podcast, 'id' | 'episodes'> & { episodes?: Episode[] }) => {
    const newId = `custom-podcast-${Date.now()}`;
    const newPodcast: Podcast = {
      ...podcastData,
      id: newId,
      themeColor: podcastData.themeColor || 'bg-slate-600',
      accentColor: podcastData.accentColor || 'text-slate-600',
      episodes: (podcastData.episodes || []).map((ep, idx) => ({
        ...ep,
        id: ep.id || `custom-ep-${Date.now()}-${idx}`,
        podcastId: newId,
        podcastTitle: podcastData.title
      }))
    };
    
    setCustomPodcasts(prev => [...prev, newPodcast]);
    return newPodcast;
  };

  const removeCustomPodcast = (podcastId: string) => {
    setCustomPodcasts(prev => prev.filter(p => p.id !== podcastId));
    // Prune starred
    setStarredPodcastIds(prev => {
      const next = new Set(prev);
      next.delete(podcastId);
      return next;
    });
  };

  // --- UTILS ---
  const clearAllData = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
    setCurrentEpisode(null);
    setProgress(0);
    setDuration(0);
    setCustomPodcasts([]);
    setStarredPodcastIds(new Set());
    setStarredEpisodeIds(new Set());
    setQueue([]);
    setHistory({});
    localStorage.removeItem('custom_podcasts_data');
    localStorage.removeItem('starred_podcast_ids');
    localStorage.removeItem('starred_episode_ids');
    localStorage.removeItem('podcast_playback_queue');
    localStorage.removeItem('podcast_playback_history');
    localStorage.removeItem('current_playing_episode');
  };

  return {
    // Data lists
    podcasts: allPodcasts,
    episodes: allEpisodes,
    starredPodcastIds,
    starredEpisodeIds,
    queue,
    history,
    
    // Playback state
    currentEpisode,
    isPlaying,
    progress,
    duration,
    speed,
    volume,

    // Actions
    playEpisode,
    togglePlay,
    seekTo,
    skipForward,
    skipBackward,
    setSpeed,
    setVolume,

    // Queue actions
    addToQueue,
    removeFromQueue,
    clearQueue,
    playNext,
    moveQueueItem,

    // Star/Sub actions
    toggleStarPodcast,
    toggleStarEpisode,

    // Custom actions
    addCustomPodcast,
    removeCustomPodcast,
    clearAllData
  };
}
