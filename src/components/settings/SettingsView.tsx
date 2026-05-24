import { useState } from 'react';
import type { Podcast, Episode } from '../../types';
import { Plus, Download, Upload, ShieldAlert, Check } from 'lucide-react';

interface SettingsViewProps {
  onAddCustomPodcast: (podcast: Omit<Podcast, 'id' | 'episodes'> & { episodes?: Episode[] }) => Podcast;
  onClearAllData: () => void;
}

export function SettingsView({
  onAddCustomPodcast,
  onClearAllData
}: SettingsViewProps) {
  // Form states
  const [title, setTitle] = useState('');
  const [host, setHost] = useState('');
  const [description, setDescription] = useState('');
  const [coverEmoji, setCoverEmoji] = useState('🎙️');
  const [themeColor, setThemeColor] = useState('bg-indigo-650');
  const [accentColor, setAccentColor] = useState('text-indigo-600');
  
  // Episode states
  const [epTitle, setEpTitle] = useState('');
  const [epDesc, setEpDesc] = useState('');
  const [epAudioUrl, setEpAudioUrl] = useState('');
  const [epTopics, setEpTopics] = useState('Culture & Society');

  const [formSuccess, setFormSuccess] = useState(false);
  const [importStatus, setImportStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !host || !description || !epTitle || !epAudioUrl) {
      alert("Please fill in all required fields (including at least one episode).");
      return;
    }

    const newPodcast = onAddCustomPodcast({
      title,
      host,
      description,
      imageUrl: coverEmoji,
      themeColor,
      accentColor,
      episodes: [
        {
          id: `custom-ep-${Date.now()}`,
          title: epTitle,
          description: epDesc || 'No description provided.',
          publishDate: new Date().toISOString().split('T')[0],
          duration: 1800, // mock 30 mins
          audioUrl: epAudioUrl,
          podcastId: '', // Filled in by hook
          podcastTitle: title,
          topics: [epTopics]
        }
      ]
    });

    if (newPodcast) {
      setFormSuccess(true);
      setTitle('');
      setHost('');
      setDescription('');
      setEpTitle('');
      setEpDesc('');
      setEpAudioUrl('');
      setTimeout(() => setFormSuccess(false), 3000);
    }
  };

  const handleExport = () => {
    const backup: Record<string, string | null> = {
      starred_podcast_ids: localStorage.getItem('starred_podcast_ids'),
      starred_episode_ids: localStorage.getItem('starred_episode_ids'),
      podcast_playback_queue: localStorage.getItem('podcast_playback_queue'),
      podcast_playback_history: localStorage.getItem('podcast_playback_history'),
      custom_podcasts_data: localStorage.getItem('custom_podcasts_data'),
      current_playing_episode: localStorage.getItem('current_playing_episode'),
      theme: localStorage.getItem('theme'),
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `china_pods_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    const file = e.target.files?.[0];
    if (!file) return;

    fileReader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string) as Record<string, string>;
        
        // Validate keys and set item
        Object.entries(parsed).forEach(([key, val]) => {
          if (val) {
            localStorage.setItem(key, val);
          }
        });

        setImportStatus({ type: 'success', message: 'Data imported successfully! Reloading...' });
        setTimeout(() => window.location.reload(), 1500);
      } catch (err) {
        console.error(err);
        setImportStatus({ type: 'error', message: 'Failed to parse backup JSON file. Ensure it is a valid backup.' });
      }
    };
    fileReader.readAsText(file);
  };

  const handleReset = () => {
    if (confirm("WARNING: This will permanently delete all your subscriptions, listening history, custom podcasts, and play queues. Are you sure you want to proceed?")) {
      onClearAllData();
      alert("App data reset completed. Reloading page...");
      window.location.reload();
    }
  };

  return (
    <div className="space-y-10 max-w-3xl mx-auto">
      {/* Introduction */}
      <div className="pb-4 border-b border-gray-150 dark:border-slate-800">
        <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-wider">
          Settings & Integrations
        </h2>
        <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
          Customize your podcast directory, manage offline backup archives, and configure your privacy settings.
        </p>
      </div>

      {/* Manual Podcast Adder Form */}
      <section className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-850 rounded-2xl p-6 shadow-sm space-y-6">
        <div>
          <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <Plus className="h-4.5 w-4.5 text-indigo-500" />
            Add Custom Podcast
          </h3>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
            Add a new show manually to seed into your local library. All custom podcasts are stored privately on your device.
          </p>
        </div>

        {formSuccess && (
          <div className="p-4 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400 border border-emerald-150 dark:border-emerald-900/30 rounded-xl text-xs font-bold flex items-center gap-2">
            <Check className="h-4.5 w-4.5" />
            Show added successfully to library! Navigate to "Explore Shows" to view it.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black text-gray-500 dark:text-slate-455 uppercase mb-1">
                Podcast Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Environment China"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-500 dark:text-slate-455 uppercase mb-1">
                Show Host *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Beijing Energy Network"
                value={host}
                onChange={e => setHost(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-500 dark:text-slate-455 uppercase mb-1">
              Podcast Description *
            </label>
            <textarea
              required
              rows={3}
              placeholder="Provide a summary of the show topics and themes..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] font-black text-gray-500 dark:text-slate-455 uppercase mb-1">
                Cover Emoji / Icon
              </label>
              <select
                value={coverEmoji}
                onChange={e => setCoverEmoji(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="🎙️">🎙️ Microphone</option>
                <option value="🌱">🌱 Sprout</option>
                <option value="🐼">🐼 Panda</option>
                <option value="📈">📈 Charts</option>
                <option value="🎨">🎨 Palette</option>
                <option value="🏮">🏮 Lantern</option>
                <option value="📡">📡 Satellite</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-500 dark:text-slate-455 uppercase mb-1">
                Theme Accent Color
              </label>
              <select
                value={themeColor}
                onChange={e => {
                  setThemeColor(e.target.value);
                  setAccentColor(e.target.value.replace('bg-', 'text-'));
                }}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="bg-emerald-600">Emerald Green</option>
                <option value="bg-indigo-600">Indigo Blue</option>
                <option value="bg-pink-600">Magenta Pink</option>
                <option value="bg-amber-600">Amber Gold</option>
                <option value="bg-cyan-600">Cyan Blue</option>
              </select>
            </div>
            
            <div>
              <label className="block text-[10px] font-black text-gray-500 dark:text-slate-455 uppercase mb-1">
                Episode Topic
              </label>
              <select
                value={epTopics}
                onChange={e => setEpTopics(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Culture & Society">Culture & Society</option>
                <option value="Tech & Business">Tech & Business</option>
                <option value="History">History</option>
                <option value="Geopolitics & Politics">Geopolitics & Politics</option>
              </select>
            </div>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-850 rounded-xl space-y-4">
            <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wider">
              Landmark Episode Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase mb-1">
                  Episode Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Episode 1: Renewable Energy Adoption"
                  value={epTitle}
                  onChange={e => setEpTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase mb-1">
                  Audio Streaming MP3 URL *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://example.com/podcast.mp3"
                  value={epAudioUrl}
                  onChange={e => setEpAudioUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase mb-1">
                Episode Description
              </label>
              <input
                type="text"
                placeholder="A summary detailing this particular discussion..."
                value={epDesc}
                onChange={e => setEpDesc(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-indigo-650 text-white font-black text-xs hover:bg-indigo-700 shadow-md transition-all active:scale-95 uppercase tracking-wider"
          >
            Create Show & Episode
          </button>
        </form>
      </section>

      {/* Data Backup section */}
      <section className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-850 rounded-2xl p-6 shadow-sm space-y-6">
        <div>
          <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider">
            Backup & Synchronization
          </h3>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
            Export all client-side data variables into an offline JSON archive, or restore a previous session file.
          </p>
        </div>

        {importStatus && (
          <div className={`p-4 border rounded-xl text-xs font-bold ${
            importStatus.type === 'success'
            ? 'bg-emerald-50 text-emerald-800 border-emerald-150 dark:bg-emerald-950/20 dark:border-emerald-900/30 dark:text-emerald-400'
            : 'bg-red-50 text-red-750 border-red-100 dark:bg-red-950/20 dark:border-red-900/30 dark:text-red-400'
          }`}>
            {importStatus.message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Export card */}
          <div className="p-4 border border-gray-150 dark:border-slate-800 rounded-xl flex flex-col justify-between gap-4">
            <div>
              <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Download className="h-4 w-4 text-indigo-500" />
                Export Archive
              </h4>
              <p className="text-[10px] text-gray-500 dark:text-slate-455 leading-relaxed mt-1">
                Save starred shows, episodes, playback queues, history milestones, and custom podcasts locally.
              </p>
            </div>
            <button
              onClick={handleExport}
              className="py-2.5 rounded-xl border border-indigo-150 hover:bg-indigo-50 dark:border-indigo-900/40 dark:hover:bg-indigo-950/20 text-indigo-700 dark:text-indigo-400 text-xs font-black uppercase tracking-wider"
            >
              Download Backup JSON
            </button>
          </div>

          {/* Import card */}
          <div className="p-4 border border-gray-150 dark:border-slate-800 rounded-xl flex flex-col justify-between gap-4">
            <div>
              <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Upload className="h-4 w-4 text-indigo-500" />
                Restore Archive
              </h4>
              <p className="text-[10px] text-gray-500 dark:text-slate-455 leading-relaxed mt-1">
                Select a previously downloaded backup JSON file to instantly overwrite the local session state.
              </p>
            </div>
            <label className="py-2.5 rounded-xl border border-gray-250 dark:border-slate-700 text-gray-600 hover:bg-gray-50 dark:text-slate-350 dark:hover:bg-slate-800 text-xs font-black uppercase tracking-wider text-center cursor-pointer">
              Upload Session JSON
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </section>

      {/* Danger Zone Reset */}
      <section className="bg-white dark:bg-slate-900 border border-red-200 dark:border-red-950 rounded-2xl p-6 shadow-sm space-y-6">
        <div>
          <h3 className="text-sm font-black text-red-650 dark:text-red-400 uppercase tracking-wider flex items-center gap-2">
            <ShieldAlert className="h-5 w-5" />
            Danger Zone
          </h3>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
            Reset actions are absolute and irreversible. Ensure backups are saved if necessary.
          </p>
        </div>

        <div className="p-4 border border-red-100 dark:border-red-950 bg-red-50/20 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h4 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wider">
              Reset Application Cache
            </h4>
            <p className="text-[10px] text-gray-500 dark:text-slate-450 leading-relaxed mt-1">
              Completely wipe subscriptions, customized additions, sequential logs, and history playheads.
            </p>
          </div>
          <button
            onClick={handleReset}
            className="py-2 px-4 rounded-xl bg-red-650 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider shadow-sm transition-all"
          >
            Clear All Data
          </button>
        </div>
      </section>
    </div>
  );
}
