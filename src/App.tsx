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
import { DynastyFlow } from './components/dynasty/DynastyFlow';
import { LayoutGrid, Clock } from 'lucide-react';

function AppContent() {
  const { isDarkMode, setIsDarkMode } = useTheme();
  
  // Custom states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [homeView, setHomeView] = useState<'shows' | 'recent'>('shows');

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
            <div className="space-y-6">
              {/* Home Dashboard View Selector Tabs */}
              <div className="flex justify-start border-b border-gray-150 dark:border-slate-850 pb-px">
                <button
                  onClick={() => setHomeView('shows')}
                  className={`px-5 py-3 text-sm font-black transition-all border-b-2 -mb-px flex items-center gap-2 cursor-pointer ${
                    homeView === 'shows'
                    ? 'border-indigo-650 text-indigo-650 dark:text-indigo-400 dark:border-indigo-400'
                    : 'border-transparent text-gray-400 dark:text-slate-500 hover:text-gray-650 dark:hover:text-slate-350'
                  }`}
                >
                  <LayoutGrid className="h-4 w-4" />
                  <span>ALL SHOWS</span>
                </button>
                <button
                  onClick={() => setHomeView('recent')}
                  className={`px-5 py-3 text-sm font-black transition-all border-b-2 -mb-px flex items-center gap-2 cursor-pointer relative ${
                    homeView === 'recent'
                    ? 'border-indigo-650 text-indigo-650 dark:text-indigo-400 dark:border-indigo-400'
                    : 'border-transparent text-gray-400 dark:text-slate-500 hover:text-gray-650 dark:hover:text-slate-350'
                  }`}
                >
                  <Clock className="h-4 w-4" />
                  <span>RECENT RELEASES</span>
                  <span className="inline-flex items-center px-1.5 py-0.5 ml-1 text-[8px] font-black uppercase tracking-wider bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 rounded-md border border-indigo-100 dark:border-indigo-900/30">
                    New
                  </span>
                </button>
              </div>

              {homeView === 'shows' ? (
                <PodcastGrid 
                  podcasts={podcasts}
                  starredPodcastIds={starredPodcastIds}
                  onToggleSubscribe={toggleStarPodcast}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  searchTerm={searchTerm}
                />
              ) : (
                <EpisodeList 
                  episodes={episodes}
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
                  emptyMessage="No recently released episodes found matching your filter selection."
                />
              )}
            </div>
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

          <Route path="/dynasty" element={
            <DynastyFlow 
              episodes={episodes}
              onPlayEpisode={playEpisode}
              isPlaying={isPlaying}
              playingEpisodeId={currentEpisode?.id}
              queueEpisodeIds={queueEpisodeIds}
              onAddToQueue={addToQueue}
              onRemoveFromQueue={removeFromQueue}
              starredEpisodeIds={starredEpisodeIds}
              onToggleStarEpisode={toggleStarEpisode}
              queueList={queue}
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
