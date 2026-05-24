import { Headphones } from 'lucide-react'

interface FooterProps {
  podcastCount: number;
  episodeCount: number;
  starredCount: number;
  queueCount: number;
}

export function Footer({ podcastCount, episodeCount, starredCount, queueCount }: FooterProps) {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 mt-20 pb-36 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
               <div className="bg-gradient-to-tr from-indigo-600 to-pink-600 p-1.5 rounded-lg">
                 <Headphones className="h-4 w-4 text-white" />
               </div>
               <h3 className="text-sm font-black text-gray-900 dark:text-white tracking-wider uppercase">China Pods</h3>
            </div>
            <p className="text-gray-500 dark:text-slate-400 text-sm max-w-sm leading-relaxed mx-auto md:mx-0">
              A premium, curated audio hub aggregating conversations and historical chronicles on China's dynamic place in global affairs.
            </p>
          </div>
          <div className="md:text-right flex flex-col items-center md:items-end">
            <h3 className="text-sm font-black text-gray-900 dark:text-white tracking-wider uppercase mb-4">Statistics</h3>
            <div className="flex flex-wrap justify-center md:justify-end gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-black bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30">{podcastCount} SHOWS</span>
              <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-black bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-400 border border-pink-100 dark:border-pink-900/30">{starredCount} STARRED</span>
              <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-black bg-violet-50 dark:bg-violet-900/20 text-violet-750 dark:text-violet-300 border border-violet-200 dark:border-violet-900/30">{queueCount} QUEUED</span>
              <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-black bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-700">{episodeCount} EPISODES</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
