import { useState, useMemo, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { AudioPlayer } from './components/player/AudioPlayer';
import { PodcastGrid } from './components/podcasts/PodcastGrid';
import { PodcastDetail } from './components/podcasts/PodcastDetail';
import { EpisodeList } from './components/episodes/EpisodeList';
import { StarredView } from './components/starred/StarredView';
import { QueueManager } from './components/queue/QueueManager';
import { SettingsView } from './components/settings/SettingsView';
import { usePodcasts } from './hooks/usePodcasts';
import { useTheme } from './hooks/useTheme';

function AppContent() {
  const { isDarkMode, setIsDarkMode } = useTheme();
  
  // Custom states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTopic, setSelectedTopic] = useState('All');

  const location = useLocation();

  // Reset filtering selections when page changes
  useEffect(() => {
    setSearchTerm('');
    setSelectedTopic('All');
  }, [location.pathname]);

  const {
    podcasts,
    episodes,
    starredPodcastIds,
    starredEpisodeIds,
    queue,
    history,
    currentEpisode,
    isPlaying,
    progress,
    duration,
    speed,
    volume,
    playEpisode,
    togglePlay,
    seekTo,
    skipForward,
    skipBackward,
    setSpeed,
    setVolume,
    addToQueue,
    removeFromQueue,
    clearQueue,
    playNext,
    moveQueueItem,
    toggleStarPodcast,
    toggleStarEpisode,
    addCustomPodcast,
    removeCustomPodcast,
    clearAllData
  } = usePodcasts();



  // History episodes list
  const historyEpisodes = useMemo(() => {
    return Object.keys(history)
      .map(key => episodes.find(ep => ep.id === key))
      .filter((ep): ep is typeof episodes[0] => !!ep)
      .sort((a, b) => {
        const dateA = new Date(history[a.id]?.playedAt || 0).getTime();
        const dateB = new Date(history[b.id]?.playedAt || 0).getTime();
        return dateB - dateA;
      });
  }, [episodes, history]);

  // Sets of quick checkups
  const queueEpisodeIds = useMemo(() => new Set(queue.map(item => item.episode.id)), [queue]);


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <Header 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        starredCount={starredEpisodeIds.size + starredPodcastIds.size}
        queueCount={queue.length}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={
            <PodcastGrid 
              podcasts={podcasts}
              starredPodcastIds={starredPodcastIds}
              onToggleSubscribe={toggleStarPodcast}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          } />
          
          <Route path="/podcast/:id" element={
            <PodcastDetail 
              podcasts={podcasts}
              starredPodcastIds={starredPodcastIds}
              starredEpisodeIds={starredEpisodeIds}
              queueEpisodeIds={queueEpisodeIds}
              history={history}
              playingEpisodeId={currentEpisode?.id}
              isPlaying={isPlaying}
              onToggleSubscribe={toggleStarPodcast}
              onRemoveCustomPodcast={removeCustomPodcast}
              onPlayEpisode={playEpisode}
              onTogglePlay={togglePlay}
              onAddToQueue={addToQueue}
              onRemoveFromQueue={removeFromQueue}
              onToggleStarEpisode={toggleStarEpisode}
              queueList={queue}
            />
          } />

          <Route path="/starred" element={
            <StarredView 
              podcasts={podcasts}
              starredPodcastIds={starredPodcastIds}
              starredEpisodeIds={starredEpisodeIds}
              queueEpisodeIds={queueEpisodeIds}
              history={history}
              playingEpisodeId={currentEpisode?.id}
              isPlaying={isPlaying}
              onToggleSubscribe={toggleStarPodcast}
              onPlayEpisode={playEpisode}
              onTogglePlay={togglePlay}
              onAddToQueue={addToQueue}
              onRemoveFromQueue={removeFromQueue}
              onToggleStarEpisode={toggleStarEpisode}
              queueList={queue}
              searchTerm={searchTerm}
              selectedTopic={selectedTopic}
              setSelectedTopic={setSelectedTopic}
            />
          } />

          <Route path="/queue" element={
            <QueueManager 
              queue={queue}
              playingEpisodeId={currentEpisode?.id}
              onPlayEpisode={playEpisode}
              onRemoveFromQueue={removeFromQueue}
              onClearQueue={clearQueue}
              onMoveQueueItem={moveQueueItem}
            />
          } />

          <Route path="/history" element={
            <EpisodeList 
              episodes={historyEpisodes}
              starredEpisodeIds={starredEpisodeIds}
              queueEpisodeIds={queueEpisodeIds}
              history={history}
              playingEpisodeId={currentEpisode?.id}
              isPlaying={isPlaying}
              onPlayEpisode={playEpisode}
              onTogglePlay={togglePlay}
              onAddToQueue={addToQueue}
              onRemoveFromQueue={removeFromQueue}
              onToggleStarEpisode={toggleStarEpisode}
              queueList={queue}
              searchTerm={searchTerm}
              selectedTopic={selectedTopic}
              setSelectedTopic={setSelectedTopic}
              emptyMessage="No listening history logs found on this device."
            />
          } />

          <Route path="/settings" element={
            <SettingsView 
              onAddCustomPodcast={addCustomPodcast}
              onClearAllData={clearAllData}
            />
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer 
        podcastCount={podcasts.length}
        episodeCount={episodes.length}
        starredCount={starredEpisodeIds.size + starredPodcastIds.size}
        queueCount={queue.length}
      />

      <AudioPlayer 
        currentEpisode={currentEpisode}
        isPlaying={isPlaying}
        progress={progress}
        duration={duration}
        speed={speed}
        volume={volume}
        queueLength={queue.length}
        isStarred={currentEpisode ? starredEpisodeIds.has(currentEpisode.id) : false}
        onTogglePlay={togglePlay}
        onSeek={seekTo}
        onSkipForward={skipForward}
        onSkipBackward={skipBackward}
        onSetSpeed={setSpeed}
        onSetVolume={setVolume}
        onPlayNext={playNext}
        onToggleStar={() => currentEpisode && toggleStarEpisode(currentEpisode.id)}
      />
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}
