import type { Podcast } from '../types';

export const CATEGORIES = [
  'All',
  'History',
  'Geopolitics & Politics',
  'Tech & Business',
  'Culture & Society'
];

export const TOPICS = [
  'All',
  'US-China Relations',
  'Semiconductors & AI',
  'Dynastic History',
  'Daily Life',
  'Feminism & Arts',
  'Economic Reform',
  'Ancient Trade Routes'
];

export const PRESET_PODCASTS: Podcast[] = [
  {
    id: 'sinica',
    title: 'The Sinica Podcast',
    host: 'Kaiser Kuo',
    description: 'The gold standard of China current affairs podcasts, featuring weekly discussions with journalists, academics, and policymakers on international relations, elite politics, and society.',
    imageUrl: '🎙️',
    themeColor: 'bg-red-600',
    accentColor: 'text-red-600',
    applePodcastsUrl: 'https://podcasts.apple.com/us/podcast/the-sinica-podcast/id361665568',
    spotifyUrl: 'https://open.spotify.com/show/5PZ88YfFokE8o91C1bE5B5',
    rssUrl: 'https://www.sinicapodcast.com/feed',
    episodes: [
      {
        id: 'sinica-ep1',
        podcastId: 'sinica',
        podcastTitle: 'The Sinica Podcast',
        title: 'Trivium China Podcast | Jon Czin on Xi, Trump, and the U.S.-China stalemate',
        description: 'Listen now | It\'s been a consequential week for U.S.-China relations, as Xi Jinping and Donald Trump finally held their long-awaited summit in Beijing amid ongoing trade tens...',
        publishDate: '2026-05-22',
        duration: 1800,
        audioUrl: 'https://api.substack.com/feed/podcast/198783665/494fd83e1834bba58f9151533a80e6d7.mp3',
        topics: ['US-China Relations', 'Geopolitics & Politics']
      },
      {
        id: 'sinica-ep2',
        podcastId: 'sinica',
        podcastTitle: 'The Sinica Podcast',
        title: 'To Rule All Under Heaven: Andrew Meyer on His New Popular History of the Warring States',
        description: 'This week on Sinica, I speak with Andrew Seth Meyer, professor of history at CUNY Brooklyn College and the author of a remarkable new book from Oxford University Press, To Rule All...',
        publishDate: '2026-05-21',
        duration: 1800,
        audioUrl: 'https://api.substack.com/feed/podcast/198643178/e4d7c332965d2de3a0448c163ae95273.mp3',
        topics: ['History', 'Culture & Society']
      }
    ]
  },
  {
    id: 'little-red-podcast',
    title: 'The Little Red Podcast',
    host: 'Graeme Smith & Louisa Lim',
    description: 'An award-winning podcast celebrating China beyond the Beijing beltway. Hosted by Graeme Smith from the Australian National University and Louisa Lim from the University of Melbourne.',
    imageUrl: '🥁',
    themeColor: 'bg-blue-600',
    accentColor: 'text-blue-600',
    applePodcastsUrl: 'https://podcasts.apple.com/us/podcast/the-little-red-podcast/id1125679505',
    spotifyUrl: 'https://open.spotify.com/show/5tP0JgG4M4r25e5i6O4P3P',
    rssUrl: 'https://omny.fm/shows/the-little-red-podcast/playlists/podcast.rss',
    episodes: [
      {
        id: 'little-red-podcast-ep1',
        podcastId: 'little-red-podcast',
        podcastTitle: 'The Little Red Podcast',
        title: 'Lightning Strikes: China’s Robot Revolution',
        description: 'In the second episode of our series, China Rules, we look at an industry dominated by China: humanoid robots. Beijing\'s running, dancing and fighting robots are more than jus...',
        publishDate: '2026-05-06',
        duration: 3057,
        audioUrl: 'https://traffic.omny.fm/d/clips/a7b4f8fe-59d9-4afc-a79a-a90101378abf/bf2c1d80-3656-4449-9d00-a903004e8f84/9d1aa3ac-8756-4820-a912-b4420049eccf/audio.mp3?utm_source=Podcast&in_playlist=efbff746-e7c1-463a-9d80-a903004e8f8f',
        topics: ['Semiconductors & AI', 'Tech & Business']
      },
      {
        id: 'little-red-podcast-ep2',
        podcastId: 'little-red-podcast',
        podcastTitle: 'The Little Red Podcast',
        title: 'China Rules: Autocracy for sale',
        description: 'In our new series—China Rules, we look at how China is a global exporter, not just of goods, but also of standards, ideas, technologies and mechanisms of control. We\'ve only...',
        publishDate: '2026-04-21',
        duration: 2918,
        audioUrl: 'https://traffic.omny.fm/d/clips/a7b4f8fe-59d9-4afc-a79a-a90101378abf/bf2c1d80-3656-4449-9d00-a903004e8f84/c0104c3c-323a-4d00-95eb-b43300898da1/audio.mp3?utm_source=Podcast&in_playlist=efbff746-e7c1-463a-9d80-a903004e8f8f',
        topics: ['Geopolitics & Politics', 'Culture & Society']
      }
    ]
  },
  {
    id: 'pekingology',
    title: 'Pekingology',
    host: 'Jude Blanchette',
    description: 'Hosted at the Center for Strategic and International Studies (CSIS), Pekingology presents technical discussions on CCP elite governance, policy networks, and domestic regulations.',
    imageUrl: '🏛️',
    themeColor: 'bg-slate-700',
    accentColor: 'text-slate-700',
    applePodcastsUrl: 'https://podcasts.apple.com/us/podcast/pekingology/id1527583687',
    spotifyUrl: 'https://open.spotify.com/show/0H4K642B5yPvxCj1c9jWre',
    rssUrl: 'https://feeds.megaphone.fm/pekingology',
    episodes: [
      {
        id: 'pekingology-ep1',
        podcastId: 'pekingology',
        podcastTitle: 'Pekingology',
        title: 'BONUS POD: Trump and Xi Meet in China',
        description: 'In this bonus episode of Pekingology, host Henrietta Levin is joined by Jon Czin to discuss the May 14-15 summit between President Trump and President Xi in Beijing. Henrietta and ...',
        publishDate: '2026-05-15',
        duration: 2629,
        audioUrl: 'https://www.podtrac.com/pts/redirect.mp3/cohst.app/pdcst/0C0K2I/traffic.megaphone.fm/CSIS6748848944.mp3',
        topics: ['Geopolitics & Politics', 'US-China Relations']
      },
      {
        id: 'pekingology-ep2',
        podcastId: 'pekingology',
        podcastTitle: 'Pekingology',
        title: 'How to Win a Summit: China’s Economic and Commercial Leverage',
        description: 'In this episode of Pekingology, CSIS Senior Fellow Henrietta Levin is joined by Philip Luck, Director of the CSIS Economics Program and Scholl Chair in International Business. Phil...',
        publishDate: '2026-05-14',
        duration: 2656,
        audioUrl: 'https://www.podtrac.com/pts/redirect.mp3/cohst.app/pdcst/0C0K2I/traffic.megaphone.fm/CSIS7750555926.mp3',
        topics: ['Economic Reform', 'Geopolitics & Politics']
      }
    ]
  },
  {
    id: 'chp',
    title: 'The China History Podcast',
    host: 'Laszlo Montgomery',
    description: 'A legendary production by veteran Laszlo Montgomery, covering five thousand years of dynastic transitions, legendary figures, trade routes, and cultural milestones.',
    imageUrl: '📜',
    themeColor: 'bg-amber-600',
    accentColor: 'text-amber-600',
    applePodcastsUrl: 'https://podcasts.apple.com/us/podcast/the-china-history-podcast/id379373585',
    spotifyUrl: 'https://open.spotify.com/show/0Sg1vKz3YvH0a3Uf2rB5tD',
    rssUrl: 'https://chinahistorypodcast.libsyn.com/rss',
    episodes: [
      {
        id: 'chp-ep1',
        podcastId: 'chp',
        podcastTitle: 'The China History Podcast',
        title: 'A word from Laszlo',
        description: 'Nothing to see here. Just a quick announcement on the latest from the CHP. Thanks for your patience. Lots of new stuff coming soon. The CHP Patreon: https://www.patreon.com/TheChin...',
        publishDate: '2026-05-07',
        duration: 185,
        audioUrl: 'https://dts.podtrac.com/redirect.mp3/traffic.libsyn.com/secure/be7f8b11-c1d1-43ec-b3ff-e615f54dfb5f/Announcement_050626.mp3?dest-id=4955980',
        topics: ['History']
      },
      {
        id: 'chp-ep2',
        podcastId: 'chp',
        podcastTitle: 'The China History Podcast',
        title: 'This Was Funnier in China | Laszlo and Jesse Appell',
        description: 'I drove downtown not too long ago to meet with Jesse Appell to talk about his first book, "This was funnier in China" https://www.simonandschuster.com/books/This-Was-Funnier-in-Chi...',
        publishDate: '2026-02-04',
        duration: 4240,
        audioUrl: 'https://dts.podtrac.com/redirect.mp3/traffic.libsyn.com/secure/be7f8b11-c1d1-43ec-b3ff-e615f54dfb5f/CHP_Special__Life_at_Jesses_Teahouse.mp3?dest-id=4955980',
        topics: ['History', 'Culture & Society']
      }
    ]
  },
  {
    id: 'chinatalk',
    title: 'ChinaTalk',
    host: 'Jordan Schneider',
    description: 'An energetic and in-depth exploration of Chinese tech policy, semiconductor supply chains, US-China defense developments, and modern pop culture trends.',
    imageUrl: '💻',
    themeColor: 'bg-violet-600',
    accentColor: 'text-violet-600',
    applePodcastsUrl: 'https://podcasts.apple.com/us/podcast/chinatalk/id1289062971',
    spotifyUrl: 'https://open.spotify.com/show/3D2bEclJ93X8qjC7nfeD3f',
    rssUrl: 'https://feeds.megaphone.fm/CHTAL4990341033',
    episodes: [
      {
        id: 'chinatalk-ep1',
        podcastId: 'chinatalk',
        podcastTitle: 'ChinaTalk',
        title: 'Doing Big Things in Policy: It\'s All White Space',
        description: 'Wanna do big things? This week, a how-to guide for technically minded people who want to stop posting and start changing things — covering everything from why every globally import...',
        publishDate: '2026-05-22',
        duration: 3369,
        audioUrl: 'https://pscrb.fm/rss/p/traffic.megaphone.fm/CHTAL2998935355.mp3',
        topics: ['Tech & Business', 'Geopolitics & Politics']
      },
      {
        id: 'chinatalk-ep2',
        podcastId: 'chinatalk',
        podcastTitle: 'ChinaTalk',
        title: 'Trump\'s China Visit: Prestige on the Cheap',
        description: 'From Mar-a-Lago to the Great Hall, Trump returns to Beijing desperate for validation while Xi Jinping treats him to strategic flattery. It’s the first time an American president ha...',
        publishDate: '2026-05-18',
        duration: 4073,
        audioUrl: 'https://pscrb.fm/rss/p/traffic.megaphone.fm/CHTAL1861925895.mp3',
        topics: ['US-China Relations', 'Geopolitics & Politics']
      }
    ]
  },
  {
    id: 'chinese-whispers',
    title: 'Chinese Whispers',
    host: 'Cindy Yu',
    description: 'A highly acclaimed fortnightly series by The Spectator, looking beyond the geopolitical headlines to explore the everyday lives, arts, and history of ordinary people.',
    imageUrl: '💬',
    themeColor: 'bg-emerald-600',
    accentColor: 'text-emerald-600',
    applePodcastsUrl: 'https://podcasts.apple.com/us/podcast/chinese-whispers/id1534947936',
    spotifyUrl: 'https://open.spotify.com/show/06gN13P9S4qZ8E4G0w5l7m',
    rssUrl: 'https://feeds.acast.com/public/shows/chinese-whispers',
    episodes: [
      {
        id: 'chinese-whispers-ep1',
        podcastId: 'chinese-whispers',
        podcastTitle: 'Chinese Whispers',
        title: 'New podcast: Quite right! with Michael Gove & Madeline Grant',
        description: 'Michael Gove and Madeline Grant launch Quite right!, The Spectator’s new podcast promising sanity and common sense in an increasingly unhinged world. This week, they talk about Lab...',
        publishDate: '2025-09-10',
        duration: 1103,
        audioUrl: 'https://sphinx.acast.com/p/open/s/68358ff2998551779f248a35/e/68c161eb0fa00b5817ed3598/media.mp3?tk=eyJ0ayI6ImRlZmF1bHQiLCJhZHMiOnRydWUsInNwb25zIjp0cnVlLCJzdGF0dXMiOiJwdWJsaWMifQ==&sig=BOKd8K6E8zj9mlhXunYNZr-Zn7V_2Nhm84HRd-30UO0',
        topics: ['Culture & Society']
      },
      {
        id: 'chinese-whispers-ep2',
        podcastId: 'chinese-whispers',
        podcastTitle: 'Chinese Whispers',
        title: 'A compilation of Chinese Whispers: understanding China',
        description: 'As Chinese Whispers comes to an end, here is a compilation of some of the best discussions Cindy Yu has had across the podcast to understand modern China and President Xi. On this ...',
        publishDate: '2025-05-05',
        duration: 5877,
        audioUrl: 'https://sphinx.acast.com/p/open/s/68358ff2998551779f248a35/e/tag%3Aaudioboom.com%2C2025-04-30%3A%2Fposts%2F8713426/media.mp3?tk=eyJ0ayI6ImRlZmF1bHQiLCJhZHMiOnRydWUsInNwb25zIjp0cnVlLCJzdGF0dXMiOiJwdWJsaWMifQ==&sig=41kBfUviTyRYfe94akyT5gmjlC-kSzhZ9LdQeC_3qaA',
        topics: ['History', 'Geopolitics & Politics']
      }
    ]
  },
  {
    id: 'nuvoices',
    title: 'NüVoices',
    host: 'NüVoices Collective',
    description: 'Focusing on the creative work and sharp perspectives of women, non-binary individuals, and underrepresented voices reporting on or working in Greater China.',
    imageUrl: '👩‍🎨',
    themeColor: 'bg-pink-600',
    accentColor: 'text-pink-600',
    applePodcastsUrl: 'https://podcasts.apple.com/us/podcast/n%C3%BCvoices/id1399432326',
    spotifyUrl: 'https://open.spotify.com/show/4zR7tJ7yS0yE6uNfeD3f',
    rssUrl: 'https://nuvoices.libsyn.com/rss',
    episodes: [
      {
        id: 'nuvoices-ep1',
        podcastId: 'nuvoices',
        podcastTitle: 'NüVoices',
        title: 'Episode 18: Cultivating community in corporate culture',
        description: 'A deep discussion on navigating gender dynamics and building local networks in the modern professional landscape in Shanghai.',
        publishDate: '2019-07-22',
        duration: 2657,
        audioUrl: 'https://dts.podtrac.com/redirect.mp3/traffic.libsyn.com/secure/nuvoices/NuVoices_18.mp3?dest-id=757179',
        topics: ['Feminism & Arts', 'Culture & Society']
      },
      {
        id: 'nuvoices-ep2',
        podcastId: 'nuvoices',
        podcastTitle: 'NüVoices',
        title: 'NüVoices: Legal advocacy against domestic violence in China',
        description: 'An interview exploring grass-roots legal aid efforts, policy reform advocacy, and the systemic protections for underrepresented groups in public civil proceedings.',
        publishDate: '2019-06-20',
        duration: 2332,
        audioUrl: 'https://dts.podtrac.com/redirect.mp3/traffic.libsyn.com/secure/nuvoices/Siodhbhra_Parkin_NuVoices_Final.mp3?dest-id=757179',
        topics: ['Feminism & Arts', 'Culture & Society']
      }
    ]
  },
  {
    id: 'mosaic-of-china',
    title: 'Mosaic of China',
    host: 'Oscar Fuchs',
    description: 'A charming collection of structured conversations with people from different walks of life in China, revealing a composite mosaic of the modern nation.',
    imageUrl: '🧩',
    themeColor: 'bg-cyan-600',
    accentColor: 'text-cyan-600',
    applePodcastsUrl: 'https://podcasts.apple.com/us/podcast/mosaic-of-china/id1481198544',
    spotifyUrl: 'https://open.spotify.com/show/368yDk7S0gE8o91C1bE5B5',
    rssUrl: 'https://feed.podbean.com/mosaicofchina/feed.xml',
    episodes: [
      {
        id: 'mosaic-of-china-ep1',
        podcastId: 'mosaic-of-china',
        podcastTitle: 'Mosaic of China',
        title: '[Re-Release] Lissanthea TAYLOR, Parkway Health',
        description: 'This is a re-release of Season 01 Episode 28: The Pain Whisperer (Lissanthea Taylor, Pain Management Practitioner) Chapters 00:00 - Intro 02:20 - Part 1 17:52 - Part 2',
        publishDate: '2023-09-19',
        duration: 1398,
        audioUrl: 'https://mcdn.podbean.com/mf/web/rigkh8/CNs03b07_Re-Release_Lissanthea_TAYLOR_-_03_Audio_-_REGULAR7cguy.mp3',
        topics: ['Daily Life', 'Culture & Society']
      },
      {
        id: 'mosaic-of-china-ep2',
        podcastId: 'mosaic-of-china',
        podcastTitle: 'Mosaic of China',
        title: '[Re-Release] Emily MADGE, Sea Life',
        description: 'This is a re-release of Season 01 Episode 14: The Aquarium Queen (Emily Madge, Asia Head of Conservation, Sea Life). Chapters 00:00 - Intro 02:20 - Part 1 18:28 - Part 2',
        publishDate: '2023-07-31',
        duration: 1536,
        audioUrl: 'https://mcdn.podbean.com/mf/web/ta7h52/CNs03b06_Re-Release_Emily_MADGE_-_03_Audio_-_REGULAR998c2.mp3',
        topics: ['Daily Life', 'Culture & Society']
      }
    ]
  },
  {
    id: 'soas-context',
    title: 'China in Context',
    host: 'SOAS China Institute',
    description: 'Academic and policy insights into the governance, macroeconomics, and regional dynamics of Greater China, produced by the SOAS China Institute in London.',
    imageUrl: '🌍',
    themeColor: 'bg-teal-700',
    accentColor: 'text-teal-700',
    applePodcastsUrl: 'https://podcasts.apple.com/us/podcast/china-in-context/id1535947936',
    spotifyUrl: 'https://open.spotify.com/show/06gN13P9S4qZ8E4G0w5l7c',
    rssUrl: 'https://feeds.soundcloud.com/users/soundcloud:users:943463482/sounds.rss',
    episodes: [
      {
        id: 'soas-context-ep1',
        podcastId: 'soas-context',
        podcastTitle: 'China in Context',
        title: 'Ep208: Did China trump Trump? — After the Beijing summit',
        description: 'Donald Trump\'s visit to Beijing, the first by a US president in nine years, not only included plenty of pageantry, but produced some apparently substantive agreements. Aside from C...',
        publishDate: '2026-05-21',
        duration: 2553,
        audioUrl: 'https://feeds.soundcloud.com/stream/2324628401-soas-china-institute-did-china-trump-trump.mp3',
        topics: ['US-China Relations', 'Geopolitics & Politics']
      },
      {
        id: 'soas-context-ep2',
        podcastId: 'soas-context',
        podcastTitle: 'China in Context',
        title: 'Ep207: China\'s Middle East Balancing Act — Peace plans, pragmatism and economic prospects',
        description: 'The war in the Middle East has affected China in many ways: as well as targeting Iran, a country with which Beijing has a comprehensive strategic partnership, it has disrupted expo...',
        publishDate: '2026-05-06',
        duration: 2134,
        audioUrl: 'https://feeds.soundcloud.com/stream/2315725502-soas-china-institute-china-s-middle-east-balancing-act-peace-plans-pragmatism-and-economic-prospects.mp3',
        topics: ['Geopolitics & Politics', 'Economic Reform']
      }
    ]
  }
];
