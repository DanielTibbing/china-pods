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
    rssUrl: 'https://feeds.acast.com/public/shows/sinica',
    episodes: [
      {
        id: 'sinica-ep1',
        podcastId: 'sinica',
        podcastTitle: 'The Sinica Podcast',
        title: 'Kaiser Kuo on the History of Sinica',
        description: 'An expansive retrospective on sixteen years of hosting the Sinica Podcast, exploring how the US-China discourse has shifted from the Beijing Olympics through today.',
        publishDate: '2026-04-12',
        duration: 3450,
        audioUrl: 'https://dts.podtrac.com/redirect.mp3/chrt.fm/track/81813/api.substack.com/feed/podcast/10410/5fa55e8108bd9d34293ec44dbe55913e.mp3',
        topics: ['US-China Relations', 'Geopolitics & Politics']
      },
      {
        id: 'sinica-ep2',
        podcastId: 'sinica',
        podcastTitle: 'The Sinica Podcast',
        title: 'Decoding China’s Modern Bureaucracy',
        description: 'A deep dive with academic specialists explaining the internal incentives, promotion structures, and communication networks inside the Chinese civil service.',
        publishDate: '2026-03-28',
        duration: 4120,
        audioUrl: 'https://dts.podtrac.com/redirect.mp3/chrt.fm/track/81813/api.substack.com/feed/podcast/10410/b13a7c645bc8bb1ad8cde72e7ccdf12f.mp3',
        topics: ['Geopolitics & Politics', 'Economic Reform']
      }
    ]
  },
  {
    id: 'drum-tower',
    title: 'Drum Tower',
    host: 'David Rennie & Alice Su',
    description: 'Produced by The Economist, Drum Tower provides expert analysis from award-winning correspondents on elite politics, technology, domestic policy, and social trends.',
    imageUrl: '🥁',
    themeColor: 'bg-blue-600',
    accentColor: 'text-blue-600',
    applePodcastsUrl: 'https://podcasts.apple.com/us/podcast/drum-tower/id1650391456',
    spotifyUrl: 'https://open.spotify.com/show/0cM4wO50wZlGqg4U5j1wW4',
    rssUrl: 'https://feeds.economist.com/drum-tower',
    episodes: [
      {
        id: 'drum-tower-ep1',
        podcastId: 'drum-tower',
        podcastTitle: 'Drum Tower',
        title: 'The AI Race and China’s Tech Giants',
        description: 'Vanguard reporting from Shenzhen and Beijing on how Chinese tech leaders are navigating compute constraints and training next-gen LLMs under international constraints.',
        publishDate: '2026-05-10',
        duration: 2180,
        audioUrl: 'https://traffic.omny.fm/d/clips/8c7e0c4a-67a6-4251-ad77-afdc010f39e3/a0cfdf66-8ce1-460d-83cb-afdc010f43d0/5df44ae8-82e1-4bb2-ad64-afdc011f0a1c/audio.mp3',
        topics: ['Semiconductors & AI', 'Tech & Business']
      },
      {
        id: 'drum-tower-ep2',
        podcastId: 'drum-tower',
        podcastTitle: 'Drum Tower',
        title: 'Demographics and the Silver Economy',
        description: 'How China’s shifting population pyramid is driving new economic markets, retirement reform challenges, and automated elder-care innovations.',
        publishDate: '2026-04-20',
        duration: 1890,
        audioUrl: 'https://traffic.omny.fm/d/clips/8c7e0c4a-67a6-4251-ad77-afdc010f39e3/a0cfdf66-8ce1-460d-83cb-afdc010f43d0/8f1088fe-51ea-4258-86d5-afdc010f54b6/audio.mp3',
        topics: ['Culture & Society', 'Economic Reform']
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
    rssUrl: 'https://pekingology.csis.org/feed.xml',
    episodes: [
      {
        id: 'pekingology-ep1',
        podcastId: 'pekingology',
        podcastTitle: 'Pekingology',
        title: 'The Party in the Boardroom',
        description: 'A meticulous empirical study on the rising influence of CCP committees and corporate governance structures in private sector Chinese companies.',
        publishDate: '2026-05-02',
        duration: 2760,
        audioUrl: 'https://traffic.libsyn.com/secure/pekingology/Pekingology_101.mp3',
        topics: ['Geopolitics & Politics', 'Tech & Business']
      },
      {
        id: 'pekingology-ep2',
        podcastId: 'pekingology',
        podcastTitle: 'Pekingology',
        title: 'Local Government Debt and Fiscal Dynamics',
        description: 'An analysis of China’s local government financial vehicles (LGFVs) and the systemic efforts by the central ministry to restructure regional public finance.',
        publishDate: '2026-03-15',
        duration: 3100,
        audioUrl: 'https://traffic.libsyn.com/secure/pekingology/Pekingology_098.mp3',
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
        title: 'The Rise of the Song Dynasty',
        description: 'Exploring the cultural boom, institutional innovations, early industrialization efforts, and technological triumphs of the Song Dynasty.',
        publishDate: '2026-05-15',
        duration: 2880,
        audioUrl: 'https://traffic.libsyn.com/secure/chinahistorypodcast/Song_Dynasty_Part_1.mp3',
        topics: ['Dynastic History', 'History']
      },
      {
        id: 'chp-ep2',
        podcastId: 'chp',
        podcastTitle: 'The China History Podcast',
        title: 'The Silk Road and Westward Exchanges',
        description: 'A colorful narrative of the Han Dynasty trade emissaries, Chang’an trade networks, and the transmission of ideas, paper, and spices to Central Asia.',
        publishDate: '2026-04-05',
        duration: 3240,
        audioUrl: 'https://traffic.libsyn.com/secure/chinahistorypodcast/Silk_Road_V1.mp3',
        topics: ['Ancient Trade Routes', 'History']
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
    rssUrl: 'https://feeds.acast.com/public/shows/chinatalk',
    episodes: [
      {
        id: 'chinatalk-ep1',
        podcastId: 'chinatalk',
        podcastTitle: 'ChinaTalk',
        title: 'The Semiconductor Supply Chain Battleground',
        description: 'A deep-dive roundtable on global foundry logic, export controls, advanced lithography tooling, and the strategic positioning of ASML and TSMC.',
        publishDate: '2026-05-08',
        duration: 3120,
        audioUrl: 'https://traffic.omny.fm/d/clips/8c7e0c4a-67a6-4251-ad77-afdc010f39e3/9bb78749-bb11-47ab-98b6-b0ff00f53bf3/020a1f9e-ea0c-4fa2-936e-b148011c20ab/audio.mp3',
        topics: ['Semiconductors & AI', 'US-China Relations', 'Tech & Business']
      },
      {
        id: 'chinatalk-ep2',
        podcastId: 'chinatalk',
        podcastTitle: 'ChinaTalk',
        title: 'Sci-Fi and Contemporary Chinese Literature',
        description: 'An interview with translators and writers on the speculative fiction movement in China, building off the global success of the Three-Body Problem.',
        publishDate: '2026-03-22',
        duration: 2540,
        audioUrl: 'https://traffic.omny.fm/d/clips/8c7e0c4a-67a6-4251-ad77-afdc010f39e3/9bb78749-bb11-47ab-98b6-b0ff00f53bf3/c73d9e8b-ea0e-4fa2-b26a-b12e011d120a/audio.mp3',
        topics: ['Culture & Society']
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
    rssUrl: 'https://chinese-whispers.spectator.co.uk/feed',
    episodes: [
      {
        id: 'chinese-whispers-ep1',
        podcastId: 'chinese-whispers',
        podcastTitle: 'Chinese Whispers',
        title: 'How Food Defines Regional China',
        description: 'An culinary journey exploring the distinct histories, cultural rivalries, and complex trade routes that forged the eight classical Chinese cuisines.',
        publishDate: '2026-05-04',
        duration: 2310,
        audioUrl: 'https://chrt.fm/track/3G8G5/rss.art19.com/episodes/34293ec4-4dbe-5591-3e5f-a55e8108bd9d.mp3',
        topics: ['Culture & Society']
      },
      {
        id: 'chinese-whispers-ep2',
        podcastId: 'chinese-whispers',
        podcastTitle: 'Chinese Whispers',
        title: 'The Great Wall: Myths and Realities',
        description: 'Deconstructing the historical, tactical, and symbolic purpose of the various walls built across imperial dynasties to keep northern nomadic coalitions at bay.',
        publishDate: '2026-04-18',
        duration: 2650,
        audioUrl: 'https://chrt.fm/track/3G8G5/rss.art19.com/episodes/b13a7c64-5bc8-11ad-8cde-72e7ccdf12fb.mp3',
        topics: ['History', 'Dynastic History']
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
        title: 'Feminism, Poetry, and Protest in the Digital Age',
        description: 'A powerful conversation with contemporary poets and bloggers on how creative language is used to navigate censorship and build virtual support circles.',
        publishDate: '2026-04-30',
        duration: 3100,
        audioUrl: 'https://traffic.libsyn.com/secure/nuvoices/NuVoices_Ep78.mp3',
        topics: ['Feminism & Arts', 'Culture & Society']
      },
      {
        id: 'nuvoices-ep2',
        podcastId: 'nuvoices',
        podcastTitle: 'NüVoices',
        title: 'Female Artists Redefining the Shanghai Gallery Scene',
        description: 'An on-the-ground look at the galleries, curator collectives, and indie zine culture spearheading contemporary visual arts in East China.',
        publishDate: '2026-03-10',
        duration: 2980,
        audioUrl: 'https://traffic.libsyn.com/secure/nuvoices/NuVoices_Ep75.mp3',
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
    rssUrl: 'https://feeds.acast.com/public/shows/mosaic-of-china',
    episodes: [
      {
        id: 'mosaic-ep1',
        podcastId: 'mosaic-of-china',
        podcastTitle: 'Mosaic of China',
        title: 'Behind the Scenes of a Shanghai Toy Maker',
        description: 'The creative and operational journey of an indie toy designer navigating local suppliers, sub-tier subculture communities, and intellectual property.',
        publishDate: '2026-05-01',
        duration: 2240,
        audioUrl: 'https://dts.podtrac.com/redirect.mp3/chrt.fm/track/81813/api.substack.com/feed/podcast/10410/b13a7c645bc8bb1ad8cde72e7ccdf123.mp3',
        topics: ['Daily Life', 'Culture & Society']
      },
      {
        id: 'mosaic-ep2',
        podcastId: 'mosaic-of-china',
        podcastTitle: 'Mosaic of China',
        title: 'Teaching Classical Dance in Chengdu',
        description: 'An interview with a dance instructor on how classical court dance is being modernized and embraced by Gen-Z students through viral social media trends.',
        publishDate: '2026-03-05',
        duration: 2180,
        audioUrl: 'https://dts.podtrac.com/redirect.mp3/chrt.fm/track/81813/api.substack.com/feed/podcast/10410/5fa55e8108bd9d34293ec44dbe55913f.mp3',
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
    rssUrl: 'https://feeds.acast.com/public/shows/china-in-context',
    episodes: [
      {
        id: 'soas-ep1',
        podcastId: 'soas-context',
        podcastTitle: 'China in Context',
        title: 'Navigating Trade Corridors in Central Asia',
        description: 'A study on the overland logistics routes, freight train connections, and sovereign borders defining modern trans-Eurasian trade.',
        publishDate: '2026-05-11',
        duration: 1740,
        audioUrl: 'https://traffic.libsyn.com/secure/nuvoices/NuVoices_Ep78.mp3', // Fallback stream
        topics: ['Ancient Trade Routes', 'Geopolitics & Politics', 'Economic Reform']
      },
      {
        id: 'soas-ep2',
        podcastId: 'soas-context',
        podcastTitle: 'China in Context',
        title: 'Reforming the Financial Services Sector',
        description: 'An academic analysis of the domestic banking restructuring efforts, regulatory shifts, and capital market opening policies.',
        publishDate: '2026-04-02',
        duration: 1680,
        audioUrl: 'https://traffic.libsyn.com/secure/pekingology/Pekingology_098.mp3', // Fallback stream
        topics: ['Economic Reform', 'Geopolitics & Politics']
      }
    ]
  }
];
