import { Link } from 'react-router-dom';
import type { Podcast } from '../../types';
import { Star, ChevronRight, User } from 'lucide-react';
import { CATEGORIES } from '../../constants/podcasts';

interface PodcastGridProps {
  podcasts: Podcast[];
  starredPodcastIds: Set<string>;
  onToggleSubscribe: (id: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export function PodcastGrid({
  podcasts,
  starredPodcastIds,
  onToggleSubscribe,
  selectedCategory,
  setSelectedCategory
}: PodcastGridProps) {
  
  // Categorize podcasts on the fly based on their topics
  const filteredPodcasts = podcasts.filter(podcast => {
    if (selectedCategory === 'All') return true;
    
    // Check if any episode topics match the category
    return podcast.episodes.some(episode => 
      episode.topics.some(topic => {
        if (selectedCategory === 'History' && topic.toLowerCase().includes('history')) return true;
        if (selectedCategory === 'Geopolitics & Politics' && (topic.toLowerCase().includes('politics') || topic.toLowerCase().includes('relations'))) return true;
        if (selectedCategory === 'Tech & Business' && (topic.toLowerCase().includes('tech') || topic.toLowerCase().includes('reform') || topic.toLowerCase().includes('business'))) return true;
        if (selectedCategory === 'Culture & Society' && (topic.toLowerCase().includes('culture') || topic.toLowerCase().includes('society') || topic.toLowerCase().includes('life') || topic.toLowerCase().includes('feminism') || topic.toLowerCase().includes('arts'))) return true;
        return false;
      })
    );
  });

  return (
    <div className="space-y-6">
      {/* Category filters */}
      <div className="flex flex-wrap gap-2 pb-2">
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

      {filteredPodcasts.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 border border-gray-250/60 dark:border-slate-800 rounded-2xl">
          <p className="text-gray-500 dark:text-slate-400 text-sm">No shows match your selection.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPodcasts.map(podcast => {
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
                    <Link to={`/podcast/${podcast.id}`} className="block group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
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
                  <div className="mt-5 pt-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-gray-400 dark:text-slate-500">
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
      )}
    </div>
  );
}
