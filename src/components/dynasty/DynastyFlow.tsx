import { useState, useMemo, useRef } from 'react';
import { Compass, Play, Plus, Check, Star, BookOpen, Clock } from 'lucide-react';
import type { Episode, QueueItem } from '../../types';

interface Dynasty {
  id: string;
  name: string;
  chinese: string;
  pinyin: string;
  period: string;
  capital: string;
  capitalChinese: string;
  description: string;
  details: string[];
  regions: string[];
  specialColor?: string; // used for custom fills (Three kingdoms, etc.)
  keywords: string[];
}

interface DynastyFlowProps {
  episodes: Episode[];
  onPlayEpisode: (ep: Episode) => void;
  isPlaying: boolean;
  playingEpisodeId?: string;
  queueEpisodeIds: Set<string>;
  onAddToQueue: (ep: Episode) => void;
  onRemoveFromQueue: (id: string) => void;
  starredEpisodeIds: Set<string>;
  onToggleStarEpisode: (id: string) => void;
  queueList: QueueItem[];
}

const DYNASTIES: Dynasty[] = [
  {
    id: 'xia-shang',
    name: 'Xia & Shang Dynasties',
    chinese: '夏朝 & 商朝',
    pinyin: 'Xià cháo & Shāng cháo',
    period: 'c. 2070 – 1046 BC',
    capital: 'Erlitou, Yin (Anyang)',
    capitalChinese: '二里头, 殷 (安阳)',
    description: 'The bronze dawn of Chinese civilization. Transitioned from legendary tribal confederations to dynastic rule, introducing writing via oracle bones and high-fidelity bronze metallurgy.',
    details: [
      'First written records in China discovered on oracle bones used for divination in Anyang.',
      'Worship of Shangdi (Supreme God) and high emphasis on ancestor worship and royal lineage.',
      'Advanced bronze casting technology for ceremonial ritual vessels.'
    ],
    regions: ['zhongyuan'],
    keywords: ['shang dynasty', 'xia dynasty', 'oracle bone', 'bronze age', 'anyang', 'erlitou'],
  },
  {
    id: 'zhou',
    name: 'Zhou Dynasty',
    chinese: '周朝',
    pinyin: 'Zhōu cháo',
    period: '1046 – 256 BC',
    capital: 'Fenghao (Xi\'an), Luoyang',
    capitalChinese: '丰镐 (西安), 洛阳',
    description: 'The longest-ruling dynasty, split into Western Zhou and Eastern Zhou. Developed the "Mandate of Heaven" doctrine and birthed China\'s classic philosophy during the Hundred Schools of Thought.',
    details: [
      'Establishment of the feudal fengjian network system.',
      'Birthed Confucius, Laozi, Mencius, and Sun Tzu during the turbulent Spring and Autumn / Warring States periods.',
      'Introduced iron weaponry and monumental agricultural irrigation projects.'
    ],
    regions: ['zhongyuan', 'jiangnan', 'sichuan'],
    keywords: ['zhou dynasty', 'spring and autumn', 'warring states', 'confucius', 'laozi', 'mencius', 'sun tzu', 'hundred schools', 'mandate of heaven'],
  },
  {
    id: 'qin',
    name: 'Qin Dynasty',
    chinese: '秦朝',
    pinyin: 'Qín cháo',
    period: '221 – 206 BC',
    capital: 'Xianyang',
    capitalChinese: '咸阳',
    description: 'First unified imperial dynasty under the legalist Rule of Qin Shi Huang. Standardized national measures, writing, currency, and built early iterations of the Great Wall and the Terracotta Army.',
    details: [
      'Brutal legalist centralization, replacing feudal domains with commanderies (junxian).',
      'Standardized Chinese characters (Small Seal script), track gauge, coins, and weights.',
      'Conscripted massive labor forces to link defenses, forming the Great Wall.'
    ],
    regions: ['zhongyuan', 'jiangnan', 'sichuan', 'gansu'],
    keywords: ['qin dynasty', 'qin shi huang', 'legalist', 'legalism', 'first emperor', 'terracotta army', 'xianyang'],
  },
  {
    id: 'han',
    name: 'Han Dynasty',
    chinese: '汉朝',
    pinyin: 'Hàn cháo',
    period: '202 BC – 220 AD',
    capital: 'Chang\'an, Luoyang',
    capitalChinese: '长安, 洛阳',
    description: 'A golden age of consolidation that shaped the enduring "Han" identity. Established Confucianism as the official state ideology, opened the Silk Road trade corridors, and expanded boundaries.',
    details: [
      'Emperor Wu sponsored Confucian scholar-bureaucracies and pushed back nomadic Xiongnu forces.',
      'Diplomat Zhang Qian opened the Silk Road trade route to Central Asia, Persia, and the Roman Empire.',
      'Invention of paper, the seismograph, and compilation of the Shiji (Records of the Grand Historian) by Sima Qian.'
    ],
    regions: ['zhongyuan', 'jiangnan', 'sichuan', 'gansu', 'xinjiang', 'manchuria'],
    keywords: ['han dynasty', 'emperor wu', 'silk road', 'sima qian', 'zhang qian', 'xiongnu', 'confucianism', 'tribute system'],
  },
  {
    id: 'three-kingdoms',
    name: 'Three Kingdoms & Jin',
    chinese: '三国 & 晋朝',
    pinyin: 'Sānguó & Jìn cháo',
    period: '220 – 420 AD',
    capital: 'Luoyang, Jiankang (Nanjing)',
    capitalChinese: '洛阳, 建康 (南京)',
    description: 'A legendary period of heroic divisions between Wei, Shu, and Wu kingdoms, immortalized in cultural strategems. Followed by a chaotic, short-lived reunification under the Jin Dynasty.',
    details: [
      'Tripartite clash between warlords Cao Cao (Wei), Liu Bei (Shu), and Sun Quan (Wu).',
      'Famed strategic achievements of Zhuge Liang and the iconic Battle of Red Cliffs.',
      'Southern migration of literature, poetry, and calligraphy amidst northern ethnic unrest.'
    ],
    regions: ['three-kingdoms-split'], // Custom region rendering
    keywords: ['three kingdoms', 'cao cao', 'liu bei', 'zhuge liang', 'red cliffs', 'battle of red cliffs', 'sima yi', 'jin dynasty'],
  },
  {
    id: 'sui',
    name: 'Sui Dynasty',
    chinese: '隋朝',
    pinyin: 'Suí cháo',
    period: '581 – 618 AD',
    capital: 'Daxing (Chang\'an)',
    capitalChinese: '大兴 (长安)',
    description: 'Reunified China after nearly four centuries of division. Sponsored massive engineering accomplishments, including the Grand Canal, which physically integrated the agricultural south with the political north.',
    details: [
      'Emperor Wen consolidated military control and instituted the imperial examination (keju) civil service.',
      'Construction of the Grand Canal, linking the Yellow and Yangtze river basins.',
      'Exhausted state reserves through military campaigns against Goguryeo, leading to rapid dynastic collapse.'
    ],
    regions: ['zhongyuan', 'jiangnan', 'sichuan', 'gansu'],
    keywords: ['sui dynasty', 'grand canal', 'emperor wen', 'examination system', 'keju'],
  },
  {
    id: 'tang',
    name: 'Tang Dynasty',
    chinese: '唐朝',
    pinyin: 'Táng cháo',
    period: '618 – 907 AD',
    capital: 'Chang\'an, Luoyang',
    capitalChinese: '长安, 洛阳',
    description: 'The absolute zenith of cosmopolitan culture, economic power, and geographic expanse. Renowned for its poetry (Li Bai, Du Fu), foreign embassies in Chang\'an, and the reign of Empress Wu Zetian.',
    details: [
      'Chang\'an becomes the world\'s largest city, populated by foreign merchants, monks, and ambassadors.',
      'Reign of Empress Wu Zetian, the only female emperor in Chinese history, who reformed administrative recruiting.',
      'Devastated by the An Lushan Rebellion (755 AD), shifting the dynasty from expansionist to protective.'
    ],
    regions: ['zhongyuan', 'jiangnan', 'sichuan', 'gansu', 'xinjiang', 'manchuria', 'mongolia'],
    keywords: ['tang dynasty', 'empress wu', 'wu zetian', 'an lushan', 'li bai', 'du fu', 'changan', 'tang poetry', 'silk road'],
  },
  {
    id: 'song',
    name: 'Song Dynasty',
    chinese: '宋朝',
    pinyin: 'Sòng cháo',
    period: '960 – 1279 AD',
    capital: 'Bianjing (Kaifeng), Lin\'an (Hangzhou)',
    capitalChinese: '汴京 (开封), 临安 (杭州)',
    description: 'A pre-modern renaissance of commerce, urban life, and technology, split into Northern and Southern Song. Birthed the compass, gunpowder, paper money, and movable-type printing.',
    details: [
      'Unprecedented population explosion and monetization via Jiaozi, the first paper currency.',
      'Institutionalization of Neo-Confucian philosophies under Zhu Xi.',
      'Retreated south of the Yangtze (Southern Song) after Kaifeng was captured by the Jurchen Jin dynasty.'
    ],
    regions: ['jiangnan', 'sichuan', 'zhongyuan'], // Song borders excluding Gansu/Xinjiang/North
    keywords: ['song dynasty', 'kaifeng', 'hangzhou', 'paper currency', 'jiaozi', 'gunpowder', 'movable type', 'southern song', 'neo-confucianism'],
  },
  {
    id: 'yuan',
    name: 'Yuan Dynasty',
    chinese: '元朝',
    pinyin: 'Yuán cháo',
    period: '1271 – 1368 AD',
    capital: 'Dadu (Beijing)',
    capitalChinese: '大都 (北京)',
    description: 'Established by Kublai Khan of the Mongol Empire. Reunified China under foreign rule, relocated the capital to Beijing (Dadu), and integrated Chinese markets into Pax Mongolica trade networks.',
    details: [
      'Subjugation of Song forces and institution of a strict four-class social caste system.',
      'Opened borders to western travelers, including Italian explorer Marco Polo.',
      'Sponsored Han theater, opera, and vernacular novels while maintaining military garrison control.'
    ],
    regions: ['zhongyuan', 'jiangnan', 'sichuan', 'gansu', 'xinjiang', 'manchuria', 'mongolia'],
    keywords: ['yuan dynasty', 'kublai khan', 'genghis khan', 'mongol', 'marco polo', 'dadu', 'khanate'],
  },
  {
    id: 'ming',
    name: 'Ming Dynasty',
    chinese: '明朝',
    pinyin: 'Míng cháo',
    period: '1368 – 1644 AD',
    capital: 'Nanjing, Beijing',
    capitalChinese: '南京, 北京',
    description: 'Restored native Han rule, launching immense maritime and construction campaigns. Commissioned the massive stone Great Wall, built the Forbidden City, and launched Zheng He\'s global treasure voyages.',
    details: [
      'Admiral Zheng He commanded seven epic treasure fleets across Southeast Asia, India, and East Africa.',
      'Constructed the iconic brick-and-stone fortifications of the Great Wall seen today.',
      'Prospered through global trade of porcelain, silk, and tea, fueled by silver flows from the Americas.'
    ],
    regions: ['zhongyuan', 'jiangnan', 'sichuan', 'gansu', 'manchuria'],
    keywords: ['ming dynasty', 'yongle', 'zheng he', 'forbidden city', 'great wall', 'porcelain', 'nanjing', 'treasure fleet'],
  },
  {
    id: 'qing',
    name: 'Qing Dynasty',
    chinese: '清朝',
    pinyin: 'Qīng cháo',
    period: '1644 – 1912 AD',
    capital: 'Beijing',
    capitalChinese: '北京',
    description: 'China\'s final imperial dynasty, ruled by Manchu sovereigns. Expanded boundaries to their historic max, but collapsed under the weight of domestic rebellions and foreign imperial incursions (Opium Wars).',
    details: [
      'Empresses and Emperors like Kangxi and Qianlong expanded control over Tibet, Xinjiang, and Mongolia.',
      'Forced queue hairstyle on Han subjects to symbolize loyalty to Manchu emperors.',
      'Shattered by the Opium Wars, Taiping Rebellion, Boxer Rebellion, and Empress Dowager Cixi\'s conservative grip.'
    ],
    regions: ['zhongyuan', 'jiangnan', 'sichuan', 'gansu', 'xinjiang', 'tibet', 'manchuria', 'mongolia'],
    keywords: ['qing dynasty', 'kangxi', 'qianlong', 'opium war', 'boxer rebellion', 'cixi', 'manchu', 'taiping', 'tributary system'],
  },
  {
    id: 'modern',
    name: 'Republic & Modern Era',
    chinese: '中华民国 & 中华人民共和国',
    pinyin: 'Zhōnghuá mínguó & Zhōnghuá rénmín gònghéguó',
    period: '1912 – Present',
    capital: 'Nanjing, Beijing',
    capitalChinese: '南京, 北京',
    description: 'The end of imperial cycles. Sun Yat-sen founded the Republic in 1912, followed by civil war and Japanese occupation, culminating in the founding of the People\'s Republic of China under Mao Zedong in 1949.',
    details: [
      '1911 Xinhai Revolution overthrowing 2,000 years of dynastic imperial structure.',
      'Chinese Civil War between Chiang Kai-shek\'s KMT nationalists and Mao Zedong\'s Communist Party.',
      'Post-1978 Deng Xiaoping reforms transforming China into the world\'s manufacturing and economic powerhouse.'
    ],
    regions: ['zhongyuan', 'jiangnan', 'sichuan', 'gansu', 'xinjiang', 'tibet', 'manchuria'],
    keywords: ['sun yat-sen', 'chiang kai-shek', 'mao zedong', 'civil war', 'deng xiaoping', 'long march', 'cultural revolution', 'communist party', 'prc', 'taiwan'],
  }
];

export function DynastyFlow({
  episodes,
  onPlayEpisode,
  isPlaying,
  playingEpisodeId,
  queueEpisodeIds,
  onAddToQueue,
  onRemoveFromQueue,
  starredEpisodeIds,
  onToggleStarEpisode,
  queueList
}: DynastyFlowProps) {
  const [activeDynastyIndex, setActiveDynastyIndex] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const dynastyRefs = useRef<(HTMLDivElement | null)[]>([]);

  const activeDynasty = DYNASTIES[activeDynastyIndex];

  // Dynamic Keyword-based episode filtering engine
  const matchedEpisodes = useMemo(() => {
    if (!activeDynasty) return [];
    
    return episodes.filter(ep => {
      const title = ep.title.toLowerCase();
      const desc = (ep.description || '').toLowerCase();
      
      // Match if any of the dynasty's keywords are found in title or description
      return activeDynasty.keywords.some(kw => {
        // Strict boundary check or plain inclusion
        return title.includes(kw) || desc.includes(kw);
      });
    }).slice(0, 15); // limit to 15 matching episodes per dynasty to keep feed high-quality
  }, [activeDynasty, episodes]);

  // Sync scroll detection on desktop to update active map index
  const handleScroll = () => {
    if (!timelineRef.current) return;
    
    const container = timelineRef.current;
    const scrollPosition = container.scrollTop + 150; // offset for triggers

    let currentActive = 0;
    for (let i = 0; i < dynastyRefs.current.length; i++) {
      const ref = dynastyRefs.current[i];
      if (ref && ref.offsetTop <= scrollPosition) {
        currentActive = i;
      }
    }
    
    if (currentActive !== activeDynastyIndex) {
      setActiveDynastyIndex(currentActive);
    }
  };

  const scrollToDynasty = (idx: number) => {
    setActiveDynastyIndex(idx);
    const ref = dynastyRefs.current[idx];
    if (ref && timelineRef.current) {
      timelineRef.current.scrollTo({
        top: ref.offsetTop - 30,
        behavior: 'smooth'
      });
    }
  };

  // SVG Coordinates for Shifting borders (Polygons) on a 500x350 box
  const regionsMap: Record<string, string> = {
    // 1. Core Central Plains (Zhongyuan)
    zhongyuan: "220,110 320,110 320,180 220,180 200,140",
    // 2. Jiangnan / South-East China
    jiangnan: "320,110 400,110 440,250 300,280 260,200 320,180",
    // 3. Sichuan Basin / Southwest
    sichuan: "140,180 220,180 260,200 200,270 140,240",
    // 4. Gansu / Hexi Silk corridor
    gansu: "110,100 200,120 220,110 200,140 140,180 110,130",
    // 5. Xinjiang / Tarim Basin
    xinjiang: "20,60 110,80 110,130 60,170 20,110",
    // 6. Tibet / Qinghai Plateau
    tibet: "30,170 140,180 140,240 200,270 150,310 70,270",
    // 7. Manchuria / Northeast
    manchuria: "320,30 420,20 450,110 380,120 320,110",
    // 8. Mongolia Steppes
    mongolia: "180,60 320,60 320,110 200,120"
  };

  // Modern China borders trace reference coordinate
  const modernPrcBorder = "20,60 110,80 180,60 320,60 420,20 450,110 400,110 440,250 300,280 200,270 150,310 70,270 30,170 60,170 110,130 110,80 Z";

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-210px)] relative overflow-hidden">
      
      {/* Mobile/Sticky Map Top Header Block */}
      <div className="lg:hidden w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col items-center shadow-sm shrink-0">
        <div className="flex justify-between items-center w-full mb-3 border-b border-gray-100 dark:border-slate-850 pb-2">
          <span className="text-xs font-black text-indigo-650 dark:text-indigo-400 uppercase tracking-widest flex items-center gap-1.5">
            <Compass className="h-4 w-4" />
            Border Shift Map
          </span>
          <span className="text-xs font-bold text-gray-500">
            {activeDynasty.period}
          </span>
        </div>
        
        {/* Render Shrunk SVG Map for Mobile */}
        <div className="w-[280px] h-[180px] relative">
          <svg viewBox="0 0 500 350" className="w-full h-full drop-shadow-md">
            {/* Modern reference outline */}
            <polygon
              points={modernPrcBorder}
              fill="none"
              stroke="#94a3b8"
              strokeWidth="2"
              strokeDasharray="4,4"
              className="dark:stroke-slate-700 opacity-60"
            />
            {/* Static Grid Regions */}
            {Object.entries(regionsMap).map(([id, points]) => {
              const isActive = activeDynasty.regions.includes(id);
              return (
                <polygon
                  key={id}
                  points={points}
                  className={`transition-all duration-700 ease-in-out ${
                    isActive 
                      ? 'fill-indigo-600/70 dark:fill-indigo-500/60 stroke-indigo-400 dark:stroke-indigo-300 stroke-2' 
                      : 'fill-slate-100 dark:fill-slate-950/40 stroke-gray-250 dark:stroke-slate-800/80'
                  }`}
                />
              );
            })}
          </svg>
        </div>
        <h3 className="text-md font-black text-gray-900 dark:text-white mt-2">
          {activeDynasty.name} ({activeDynasty.chinese})
        </h3>
      </div>

      {/* LEFT COLUMN: Scrollable Timeline Deck */}
      <div 
        ref={timelineRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-12 h-full"
      >
        {/* Intro Card */}
        <div className="bg-gradient-to-r from-indigo-50 to-pink-50 dark:from-indigo-950/20 dark:to-pink-950/10 border border-indigo-100/50 dark:border-indigo-900/10 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-indigo-500" />
            Dynasty-Flow: History & Media Map
          </h2>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-2 leading-relaxed font-semibold">
            Scroll down or click the timeline pins to trace the territorial expansions, philosophical turning points, and cultural golden ages of China. Corresponding podcast episodes from your database will dynamically populate under each dynasty node below!
          </p>
        </div>

        {/* Timeline Loops */}
        {DYNASTIES.map((dyn, idx) => {
          const isActive = idx === activeDynastyIndex;
          const matchesCount = matchedEpisodes.length;
          
          return (
            <div
              key={dyn.id}
              ref={el => { dynastyRefs.current[idx] = el; }}
              className={`timeline-card transition-all duration-300 border rounded-2xl p-6 ${
                isActive 
                  ? 'border-indigo-400 bg-white dark:bg-slate-900/60 dark:border-indigo-800 shadow-lg scale-[1.01]' 
                  : 'border-gray-200 dark:border-slate-850 bg-white/40 dark:bg-slate-950/20 opacity-70 hover:opacity-90'
              }`}
            >
              {/* Card Header metadata */}
              <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                <div>
                  <span className="text-[10px] font-black tracking-widest text-indigo-500 uppercase">
                    Era {idx + 1} • {dyn.period}
                  </span>
                  <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mt-1">
                    {dyn.name}
                  </h3>
                  <div className="flex flex-wrap gap-2 text-xs font-bold text-gray-400 mt-1">
                    <span>{dyn.chinese}</span>
                    <span>•</span>
                    <span className="italic">[{dyn.pinyin}]</span>
                  </div>
                </div>
                
                {/* Capital Pill */}
                <div className="bg-gray-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase text-gray-500 dark:text-slate-400 text-right">
                  <div>Capital</div>
                  <div className="text-gray-900 dark:text-slate-200 mt-0.5">{dyn.capital}</div>
                </div>
              </div>

              {/* Main Description */}
              <p className="text-sm leading-relaxed text-gray-600 dark:text-slate-300 mb-4">
                {dyn.description}
              </p>

              {/* Bullet details */}
              <ul className="space-y-1.5 pl-5 list-disc text-xs text-gray-500 dark:text-slate-400 mb-6 font-semibold">
                {dyn.details.map((d, dIdx) => (
                  <li key={dIdx}>{d}</li>
                ))}
              </ul>

              {/* DYNAMIC PODCAST EPISODES EXPANSION PANEL */}
              {isActive && (
                <div className="border-t border-gray-100 dark:border-slate-850 pt-5 animate-fade-in">
                  <h4 className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-indigo-500" />
                    Linked Media ({matchedEpisodes.length} Episodes)
                  </h4>
                  
                  {matchesCount === 0 ? (
                    <div className="text-center py-6 bg-gray-50 dark:bg-slate-950/40 rounded-xl border border-dashed border-gray-200 dark:border-slate-850">
                      <p className="text-xs text-gray-400 dark:text-slate-500 font-bold">
                        No specific audio matches found for this dynasty.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                      {matchedEpisodes.map((ep) => {
                        const isEpPlaying = playingEpisodeId === ep.id && isPlaying;
                        const inQueue = queueEpisodeIds.has(ep.id);
                        const isStarred = starredEpisodeIds.has(ep.id);
                        
                        // Look up custom ID in queue
                        const queueItem = queueList.find(q => q.episode.id === ep.id);
                        
                        return (
                          <div 
                            key={ep.id}
                            className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border transition-all ${
                              playingEpisodeId === ep.id
                                ? 'bg-indigo-50/40 border-indigo-200 dark:bg-indigo-950/20 dark:border-indigo-900/30'
                                : 'bg-gray-50/40 dark:bg-slate-950/20 border-gray-100 dark:border-slate-850 hover:bg-white dark:hover:bg-slate-900'
                            }`}
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 uppercase text-[9px] font-black">
                                  {ep.podcastTitle}
                                </span>
                                {ep.publishDate && (
                                  <span className="text-[10px] font-bold text-gray-400">
                                    {ep.publishDate}
                                  </span>
                                )}
                              </div>
                              <h5 className="text-sm font-extrabold text-gray-900 dark:text-white mt-1.5 truncate">
                                {ep.title}
                              </h5>
                              <p className="text-xs text-gray-400 dark:text-slate-500 mt-1 truncate">
                                {ep.description?.replace(/<[^>]*>/g, '') || 'No description available.'}
                              </p>
                            </div>

                            {/* Audio Action Triggers */}
                            <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                              
                              {/* Star / Sub */}
                              <button
                                onClick={() => onToggleStarEpisode(ep.id)}
                                className={`p-2 rounded-lg border transition-all ${
                                  isStarred
                                    ? 'border-pink-200 bg-pink-50 text-pink-500 dark:border-pink-900/30 dark:bg-pink-950/30 hover:bg-pink-100'
                                    : 'border-gray-200 dark:border-slate-800 text-gray-400 dark:text-slate-500 hover:text-pink-500'
                                }`}
                                title="Star Episode"
                              >
                                <Star className={`h-3.5 w-3.5 ${isStarred ? 'fill-current text-pink-500' : ''}`} />
                              </button>

                              {/* Queue Add */}
                              <button
                                onClick={() => inQueue && queueItem ? onRemoveFromQueue(queueItem.id) : onAddToQueue(ep)}
                                className={`p-2 rounded-lg border transition-all ${
                                  inQueue
                                    ? 'border-violet-200 bg-violet-50 text-violet-600 dark:border-violet-900/30 dark:bg-violet-950/30 hover:bg-violet-100'
                                    : 'border-gray-200 dark:border-slate-800 text-gray-400 dark:text-slate-500 hover:text-violet-500'
                                }`}
                                title={inQueue ? "Remove from Queue" : "Add to Queue"}
                              >
                                {inQueue ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                              </button>

                              {/* Play Episode */}
                              <button
                                onClick={() => onPlayEpisode(ep)}
                                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black shadow-sm hover:shadow flex items-center gap-1 transition-all"
                              >
                                <Play className="h-3 w-3 fill-current" />
                                {isEpPlaying ? "Playing" : "Listen"}
                              </button>

                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* RIGHT COLUMN: Sticky Territorial SVG Shifting Map (Desktop only) */}
      <div className="hidden lg:flex w-[380px] bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-850 rounded-2xl p-6 flex-col items-center justify-between shadow-sm shrink-0 sticky top-0 h-full">
        
        {/* Map Header block */}
        <div className="w-full">
          <div className="flex justify-between items-center border-b border-gray-100 dark:border-slate-850 pb-3 mb-4">
            <span className="text-[10px] font-black text-indigo-650 dark:text-indigo-400 uppercase tracking-widest flex items-center gap-1.5">
              <Compass className="h-4 w-4" />
              Border Shift Map
            </span>
            <span className="text-xs font-bold text-gray-500 dark:text-slate-400">
              {activeDynasty.period}
            </span>
          </div>

          <h3 className="text-xl font-extrabold text-gray-900 dark:text-white select-none">
            {activeDynasty.name}
          </h3>
          <div className="flex gap-2 text-xs font-bold text-gray-400 mt-1 select-none">
            <span>{activeDynasty.chinese}</span>
            <span>•</span>
            <span className="italic">{activeDynasty.pinyin}</span>
          </div>

          <p className="text-xs text-gray-500 dark:text-slate-400 mt-3 leading-normal border-l-2 border-indigo-500 pl-2 font-medium">
            Modern China borders (dashed reference) are overlayed with the territorial extent of the {activeDynasty.name}.
          </p>
        </div>

        {/* Dynamic SVG Map container */}
        <div className="w-full aspect-[4/3] flex items-center justify-center relative my-4 max-w-[340px]">
          <svg viewBox="0 0 500 350" className="w-full h-full drop-shadow-xl select-none">
            
            {/* Base grid outlines */}
            <rect width="500" height="350" fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="10,10" className="dark:stroke-slate-900/60" />

            {/* Static Region Fills (Inactive are light, Active glow with color) */}
            {Object.entries(regionsMap).map(([id, points]) => {
              const isActive = activeDynasty.regions.includes(id);
              
              // Handle Three kingdoms custom split colors
              const isThreeKingdoms = activeDynasty.id === 'three-kingdoms';
              let fillClass = 'fill-slate-100 dark:fill-slate-950/20 stroke-gray-200 dark:stroke-slate-850';
              
              if (isActive) {
                fillClass = 'fill-indigo-600/75 dark:fill-indigo-500/60 stroke-indigo-400 dark:stroke-indigo-300 stroke-[2] drop-shadow-lg';
              } else if (isThreeKingdoms) {
                if (id === 'zhongyuan') {
                  fillClass = 'fill-red-500/70 dark:fill-red-500/50 stroke-red-400 dark:stroke-red-300 stroke-[1.5]'; // Wei (Red)
                } else if (id === 'sichuan') {
                  fillClass = 'fill-emerald-500/70 dark:fill-emerald-500/50 stroke-emerald-400 dark:stroke-emerald-300 stroke-[1.5]'; // Shu (Green)
                } else if (id === 'jiangnan') {
                  fillClass = 'fill-cyan-500/70 dark:fill-cyan-500/50 stroke-cyan-400 dark:stroke-cyan-300 stroke-[1.5]'; // Wu (Blue)
                }
              }

              return (
                <polygon
                  key={id}
                  points={points}
                  className={`transition-all duration-700 ease-in-out cursor-help ${fillClass}`}
                >
                  <title>{`${id} Region`}</title>
                </polygon>
              );
            })}

            {/* Modern reference outline on top */}
            <polygon
              points={modernPrcBorder}
              fill="none"
              stroke="#94a3b8"
              strokeWidth="2.5"
              strokeDasharray="5,5"
              className="dark:stroke-slate-700 opacity-80"
            >
              <title>Modern China Borders</title>
            </polygon>
          </svg>

          {/* Three Kingdoms color legend overlays */}
          {activeDynasty.id === 'three-kingdoms' && (
            <div className="absolute bottom-0 left-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur border border-gray-150 dark:border-slate-800 rounded-lg p-2 flex flex-col gap-1 text-[9px] font-black uppercase tracking-wider">
              <span className="flex items-center gap-1 text-red-500"><span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>Cao Wei (曹魏)</span>
              <span className="flex items-center gap-1 text-emerald-500"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>Shu Han (蜀汉)</span>
              <span className="flex items-center gap-1 text-cyan-500"><span className="h-1.5 w-1.5 rounded-full bg-cyan-500"></span>Eastern Wu (东吴)</span>
            </div>
          )}
        </div>

        {/* Small Navigation index map controls */}
        <div className="w-full border-t border-gray-100 dark:border-slate-850 pt-4 flex justify-between items-center gap-1.5 overflow-x-auto custom-scrollbar scroll-smooth">
          {DYNASTIES.map((dyn, idx) => (
            <button
              key={dyn.id}
              onClick={() => scrollToDynasty(idx)}
              className={`px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase shrink-0 transition-all ${
                idx === activeDynastyIndex
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-gray-50 hover:bg-gray-100 dark:bg-slate-950/60 dark:hover:bg-slate-850 text-gray-400 hover:text-gray-600 dark:hover:text-slate-300'
              }`}
            >
              {dyn.name.split(' ')[0].split('&')[0]}
            </button>
          ))}
        </div>

      </div>

    </div>
  );
}
