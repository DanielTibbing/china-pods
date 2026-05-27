import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Podcast } from '../../types';
import { Star, ChevronRight, User, LayoutGrid, List } from 'lucide-react';
import { CATEGORIES } from '../../constants/podcasts';

interface PodcastGridProps {
  podcasts: Podcast[];
  starredPodcastIds: Set<string>;
  onToggleSubscribe: (id: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchTerm?: string;
}

export function PodcastGrid({
  podcasts,
  starredPodcastIds,
  onToggleSubscribe,
  selectedCategory,
  setSelectedCategory,
  searchTerm = ''
}: PodcastGridProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'stale'>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'alphabetical'>('recent');
  
  // Categorize and filter podcasts on the fly
  const filteredPodcasts = podcasts.filter(podcast => {
    // 1. Category Filter
    if (selectedCategory !== 'All') {
      if (podcast.categories && Array.isArray(podcast.categories)) {
        if (!podcast.categories.includes(selectedCategory)) return false;
      } else {
        // Fallback: Check if any episode topics match the category
        const matchesCat = podcast.episodes.some(episode => 
          (episode.topics || []).some(topic => {
            if (selectedCategory === 'History' && topic.toLowerCase().includes('history')) return true;
            if (selectedCategory === 'Geopolitics & Politics' && (topic.toLowerCase().includes('politics') || topic.toLowerCase().includes('relations'))) return true;
            if (selectedCategory === 'Tech & Business' && (topic.toLowerCase().includes('tech') || topic.toLowerCase().includes('reform') || topic.toLowerCase().includes('business'))) return true;
            if (selectedCategory === 'Culture & Society' && (topic.toLowerCase().includes('culture') || topic.toLowerCase().includes('society') || topic.toLowerCase().includes('life') || topic.toLowerCase().includes('feminism') || topic.toLowerCase().includes('arts'))) return true;
            return false;
          })
        );
        if (!matchesCat) return false;
      }
    }

    // 2. Status Filter
    if (statusFilter === 'active' && podcast.status === 'stale') return false;
    if (statusFilter === 'stale' && podcast.status !== 'stale') return false;

    // 3. Search Term Filter
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      const matchesTitle = podcast.title.toLowerCase().includes(term);
      const matchesHost = podcast.host.toLowerCase().includes(term);
      const matchesDesc = podcast.description.toLowerCase().includes(term);
      if (!matchesTitle && !matchesHost && !matchesDesc) return false;
    }

    return true;
  });

  // Sort podcasts: alphabetical vs most recent release first (default)
  const sortedPodcasts = [...filteredPodcasts].sort((a, b) => {
    if (sortBy === 'alphabetical') {
      return a.title.localeCompare(b.title);
    } else {
      // Sort by recent releases first
      const dateA = a.episodes?.[0]?.publishDate ? new Date(a.episodes[0].publishDate).getTime() : 0;
      const dateB = b.episodes?.[0]?.publishDate ? new Date(b.episodes[0].publishDate).getTime() : 0;
      return dateB - dateA;
    }
  });

  return (
    <div className="space-y-6">
      
      {/* Controls Bar: Categories, Status Filters & View Toggle */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center pb-4 border-b border-gray-150 dark:border-slate-850">
        
        {/* Category Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all border ${
                selectedCategory === category
                ? 'bg-indigo-650 text-white border-indigo-650 dark:bg-indigo-600 dark:border-indigo-600 shadow-md'
                : 'bg-white dark:bg-slate-900 text-gray-500 dark:text-slate-400 border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/60'
              }`}
            >
              {category.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Right side filters, sorting & view switcher */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          
          {/* Sort Selector */}
          <div className="bg-gray-100 dark:bg-slate-900/60 border border-gray-200/50 dark:border-slate-800 rounded-xl p-1 flex gap-1 shadow-sm shrink-0">
            <button
              onClick={() => setSortBy('recent')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${
                sortBy === 'recent'
                ? 'bg-white dark:bg-slate-800 text-indigo-650 dark:text-indigo-450 shadow-sm'
                : 'text-gray-550 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-350'
              }`}
              title="Sort by latest episode release date"
            >
              RECENT
            </button>
            <button
              onClick={() => setSortBy('alphabetical')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${
                sortBy === 'alphabetical'
                ? 'bg-white dark:bg-slate-800 text-indigo-650 dark:text-indigo-450 shadow-sm'
                : 'text-gray-550 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-350'
              }`}
              title="Sort alphabetically A-Z"
            >
              A-Z
            </button>
          </div>

          {/* Status Filter Selector */}
          <div className="bg-gray-100 dark:bg-slate-900/60 border border-gray-200/50 dark:border-slate-800 rounded-xl p-1 flex gap-1 shadow-sm shrink-0">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${
                statusFilter === 'all'
                ? 'bg-white dark:bg-slate-800 text-indigo-650 dark:text-indigo-450 shadow-sm'
                : 'text-gray-550 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-300'
              }`}
            >
              ALL STATUS
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${
                statusFilter === 'active'
                ? 'bg-white dark:bg-slate-800 text-emerald-650 dark:text-emerald-400 shadow-sm'
                : 'text-gray-550 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-300'
              }`}
            >
              ACTIVE
            </button>
            <button
              onClick={() => setStatusFilter('stale')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${
                statusFilter === 'stale'
                ? 'bg-white dark:bg-slate-800 text-slate-650 dark:text-slate-400 shadow-sm'
                : 'text-gray-550 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-300'
              }`}
            >
              ENDED
            </button>
          </div>

          {/* View Mode Switcher */}
          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl p-1 flex shadow-sm shrink-0">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'grid'
                ? 'bg-indigo-650 text-white dark:bg-indigo-600 shadow-md'
                : 'text-gray-400 hover:text-gray-650 dark:text-slate-500 dark:hover:text-slate-300'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'list'
                ? 'bg-indigo-650 text-white dark:bg-indigo-600 shadow-md'
                : 'text-gray-400 hover:text-gray-650 dark:text-slate-500 dark:hover:text-slate-300'
              }`}
              title="List View"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Main Shows Feed */}
      {sortedPodcasts.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 border border-gray-250/60 dark:border-slate-800 rounded-2xl">
          <p className="text-gray-500 dark:text-slate-400 text-sm">No shows match your filtering selections.</p>
        </div>
      ) : viewMode === 'grid' ? (
        
        // GRID CARD VIEW
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPodcasts.map(podcast => {
            const isSubscribed = starredPodcastIds.has(podcast.id);
            return (
              <div 
                key={podcast.id}
                className="group relative bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-850 hover:border-indigo-300 dark:hover:border-indigo-900/60 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden"
              >
                {/* Header colored banner */}
                <div className={`h-2 ${podcast.themeColor || 'bg-slate-600'}`}></div>
                
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start gap-4 mb-4">
                    {/* Cover Avatar and Stale Status Badge */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`h-14 w-14 flex items-center justify-center text-3xl rounded-2xl shadow-inner ${podcast.themeColor || 'bg-slate-100'} bg-opacity-10 shrink-0 select-none`}>
                        {podcast.imageUrl}
                      </div>
                      {podcast.status === 'stale' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-slate-100 text-slate-500 border border-slate-200/60 dark:bg-slate-800/70 dark:text-slate-400 dark:border-slate-700/50 shadow-sm select-none shrink-0" title="No new episodes in the last 4 months">
                          Ended
                        </span>
                      )}
                    </div>
                    {/* Star toggle */}
                    <button
                      onClick={() => onToggleSubscribe(podcast.id)}
                      className={`p-2 rounded-xl border transition-all ${
                        isSubscribed
                        ? 'bg-pink-50 border-pink-100 text-pink-500 dark:bg-pink-950/20 dark:border-pink-900/30'
                        : 'bg-gray-50 border-gray-150 text-gray-400 hover:text-gray-600 dark:bg-slate-800 dark:border-slate-700 dark:hover:text-slate-350'
                      }`}
                      title={isSubscribed ? "Subscribed" : "Subscribe"}
                    >
                      <Star className={`h-4.5 w-4.5 ${isSubscribed ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Body details */}
                  <div className="flex-1">
                    <Link to={`/podcast/${podcast.id}`} className="block group-hover:text-indigo-650 dark:group-hover:text-indigo-400 transition-colors">
                      <h3 className="text-lg font-black text-gray-900 dark:text-white leading-snug tracking-tight mb-1">
                        {podcast.title}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-slate-400 font-bold mb-3">
                      <User className="h-3.5 w-3.5" />
                      <span>{podcast.host}</span>
                    </div>

                    <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                      {podcast.description}
                    </p>
                  </div>

                  {/* Footer status link */}
                  <div className="mt-5 pt-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-gray-400 dark:text-slate-550">
                    <span>{podcast.episodes.length} episodes</span>
                    <Link 
                      to={`/podcast/${podcast.id}`}
                      className="inline-flex items-center gap-1 text-indigo-650 dark:text-indigo-400 hover:translate-x-0.5 transition-transform"
                    >
                      <span>Listen Now</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        
        // TABLE/LIST VIEW
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-850 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-slate-800/30 border-b border-gray-150 dark:border-slate-850">
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-wider">Show</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-wider">Host</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-wider">Latest Episode</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-wider text-center">Subscribed</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-850">
                {sortedPodcasts.map(podcast => {
                  const isSubscribed = starredPodcastIds.has(podcast.id);
                  const latestEpisode = podcast.episodes?.[0];
                  const latestDate = latestEpisode ? latestEpisode.publishDate : 'N/A';
                  
                  return (
                    <tr key={podcast.id} className="hover:bg-indigo-50/10 dark:hover:bg-indigo-950/5 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`h-10 w-10 flex items-center justify-center text-2xl rounded-xl shadow-inner ${podcast.themeColor || 'bg-slate-100'} bg-opacity-10 shrink-0 select-none`}>
                            {podcast.imageUrl}
                          </div>
                          <div>
                            <Link to={`/podcast/${podcast.id}`} className="font-black text-gray-900 dark:text-white hover:text-indigo-650 dark:hover:text-indigo-400 transition-colors">
                              {podcast.title}
                            </Link>
                            <p className="text-[10px] text-gray-400 dark:text-slate-500 line-clamp-1 max-w-[280px] md:max-w-[380px] mt-0.5">
                              {podcast.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-bold text-gray-650 dark:text-slate-400">
                        {podcast.host}
                      </td>
                      <td className="px-6 py-4 text-xs font-bold text-gray-400 dark:text-slate-550">
                        {latestDate !== 'N/A' ? (
                          new Date(latestDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })
                        ) : 'No episodes'}
                      </td>
                      <td className="px-6 py-4">
                        {podcast.status === 'stale' ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider bg-slate-100 text-slate-500 border border-slate-200/60 dark:bg-slate-800/70 dark:text-slate-400 dark:border-slate-700/50 shadow-sm" title="No new episodes in the last 4 months">
                            Ended
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30 shadow-sm">
                            Active
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => onToggleSubscribe(podcast.id)}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            isSubscribed
                            ? 'bg-pink-50 border-pink-100 text-pink-500 dark:bg-pink-950/20 dark:border-pink-900/30'
                            : 'bg-gray-50 border-gray-150 text-gray-400 hover:text-gray-600 dark:bg-slate-800 dark:border-slate-700 dark:hover:text-slate-350'
                          }`}
                        >
                          <Star className={`h-3.5 w-3.5 ${isSubscribed ? 'fill-current' : ''}`} />
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          to={`/podcast/${podcast.id}`}
                          className="inline-flex items-center gap-0.5 text-xs font-black text-indigo-650 dark:text-indigo-400 hover:translate-x-0.5 transition-transform"
                        >
                          <span>LISTEN</span>
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}

