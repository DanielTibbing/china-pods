import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { parseStringPromise } from 'xml2js';

const CONFIG_PATH = path.join(process.cwd(), 'scripts', 'podcasts_config.json');
const OUTPUT_PATH = path.join(process.cwd(), 'public', 'podcasts.json');

// Axios instance with custom user agent to avoid blocking
const axiosInstance = axios.create({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/xml, text/xml, */*'
  },
  timeout: 15000
});

// Keywords for auto-tagging topics
const TOPICS_KEYWORDS = {
  'US-China Relations': [
    'us-china', 'u.s.-china', 'biden', 'trump', 'tariff', 'trade war', 
    'diplomacy', 'summit', 'taiwan', 'south china sea', 'geopolitics',
    'bilateral', 'washington', 'beijing relations', 'sanction', 'consulate'
  ],
  'Semiconductors & AI': [
    'semiconductor', 'microchip', 'chip', 'ai', 'artificial intelligence', 
    'robot', 'huawei', 'tsmc', 'asml', 'nvidia', 'tech', 'quantum', 
    'technology', 'cyber', 'supercomputer', 'lithography', 'humanoid', 'innovation'
  ],
  'Dynastic History': [
    'dynasty', 'dynastic', 'tang', 'song', 'ming', 'qing', 'han', 'emperor', 
    'ancient china', 'warring states', 'confucian', 'archaeology', 'daoist', 'buddhist', 'traditional china'
  ],
  'Daily Life': [
    'daily life', 'ordinary people', 'living in', 'shanghai', 'beijing', 
    'shenzhen', 'society', 'travel', 'cuisine', 'food', 'lifestyle', 'city',
    'provincial', 'expatriate', 'expat', 'streets of', 'housing', 'marriage'
  ],
  'Feminism & Arts': [
    'feminism', 'women', 'gender', 'art', 'music', 'movie', 'literature', 
    'writer', 'creative', 'exhibition', 'film', 'theater', 'artist', 'queer',
    'domestic violence', 'activist', 'poetry', 'novel'
  ],
  'Economic Reform': [
    'economy', 'economic', 'reform', 'market', 'finance', 'gdp', 'growth', 
    'trade', 'business', 'industry', 'deng xiaoping', 'privatization', 
    'real estate', 'evergrande', 'belt and road', 'poverty alleviation'
  ],
  'Ancient Trade Routes': [
    'silk road', 'maritime', 'trade route', 'ancient trade', 'zheng he', 
    'caravan', 'eurasia', 'dunhuang'
  ],
  // Broad categories to assist filtering
  'History': [
    'history', 'historian', 'historical', 'century', 'dynasty', 'ancient', 'republican china', 'world war', 'communist party history'
  ],
  'Geopolitics & Politics': [
    'politics', 'geopolitics', 'diplomacy', 'foreign policy', 'ccp', 'xi jinping', 'foreign relations', 'military', 'defense', 'statecraft'
  ],
  'Tech & Business': [
    'tech', 'technology', 'business', 'startup', 'market', 'corporate', 'industry', 'economic', 'regulation', 'commerce'
  ],
  'Culture & Society': [
    'culture', 'society', 'cultural', 'social', 'art', 'people', 'life', 'education', 'philosophy', 'religion', 'language', 'literature'
  ]
};

// Parse duration to seconds (handles format "hh:mm:ss", "mm:ss", or raw seconds string)
function parseDuration(durationStr) {
  if (!durationStr) return 1800; // default 30 mins if not provided
  durationStr = durationStr.toString().trim();
  
  if (!isNaN(durationStr)) {
    return parseInt(durationStr, 10);
  }
  
  const parts = durationStr.split(':').map(Number);
  if (parts.some(isNaN)) return 1800;
  
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }
  
  return 1800;
}

// Convert pubDate to YYYY-MM-DD
function formatDate(dateStr) {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) {
      throw new Error("Invalid Date");
    }
    return d.toISOString().split('T')[0];
  } catch (e) {
    return new Date().toISOString().split('T')[0];
  }
}

// Clean HTML tags and entities from description
function cleanDescription(desc) {
  if (!desc) return '';
  desc = desc.toString();
  
  let cleaned = desc.replace(/<\/?[^>]+(>|$)/g, "");
  cleaned = cleaned
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
    
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  
  if (cleaned.length > 250) {
    cleaned = cleaned.substring(0, 247) + '...';
  }
  
  return cleaned;
}

// Sanitize XML string (escape unescaped ampersands) to make parser robust against invalid XML
function sanitizeXml(xml) {
  if (!xml) return '';
  return xml.toString().replace(/&(?!(amp|lt|gt|quot|apos);)/g, '&amp;');
}

// Keyword-match topics for episodes
function assignTopics(title, description, podcastId) {
  const text = `${title} ${description}`.toLowerCase();
  const matchedTopics = [];

  for (const [topic, keywords] of Object.entries(TOPICS_KEYWORDS)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      matchedTopics.push(topic);
    }
  }

  // Deduplicate matched topics
  let uniqueTopics = [...new Set(matchedTopics)];

  // Fallback / defaults based on specific shows
  if (uniqueTopics.length === 0) {
    if (podcastId === 'chp') {
      uniqueTopics = ['History'];
    } else if (podcastId === 'sinica' || podcastId === 'pekingology' || podcastId === 'soas-context') {
      uniqueTopics = ['Geopolitics & Politics'];
    } else if (podcastId === 'chinatalk') {
      uniqueTopics = ['Tech & Business'];
    } else {
      uniqueTopics = ['Culture & Society'];
    }
  }

  // Ensure topic categories don't collide redundantly (e.g. if we have "Dynastic History" we can also have "History")
  return uniqueTopics;
}

// Main processing function
async function main() {
  console.log("Starting Podcast Episode Fetcher...");

  // 1. Read config metadata
  if (!fs.existsSync(CONFIG_PATH)) {
    console.error(`Config file not found at: ${CONFIG_PATH}`);
    process.exit(1);
  }
  const podcastsConfig = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
  console.log(`Loaded ${podcastsConfig.length} podcasts from config.`);

  // 2. Read existing episodes database if it exists (for historical merging)
  let existingDatabase = [];
  if (fs.existsSync(OUTPUT_PATH)) {
    try {
      existingDatabase = JSON.parse(fs.readFileSync(OUTPUT_PATH, 'utf-8'));
      console.log(`Loaded existing podcasts.json containing history.`);
    } catch (e) {
      console.warn("Failed to parse existing podcasts.json. Will build a fresh database.");
    }
  }

  const finalPodcasts = [];

  // 3. Fetch feeds for each podcast
  for (const podcast of podcastsConfig) {
    console.log(`\nFetching RSS for: ${podcast.title} (${podcast.rssUrl})...`);
    
    // Find pre-existing episodes for this podcast to merge with
    const existingPodcast = existingDatabase.find(p => p.id === podcast.id);
    const existingEpisodesMap = new Map();
    if (existingPodcast && existingPodcast.episodes) {
      existingPodcast.episodes.forEach(ep => {
        existingEpisodesMap.set(ep.id, ep);
      });
    }
    console.log(`  Found ${existingEpisodesMap.size} existing episodes in cache.`);

    const newEpisodes = [];

    try {
      const response = await axiosInstance.get(podcast.rssUrl);
      const xml = sanitizeXml(response.data);
      const parsed = await parseStringPromise(xml);
      
      const channel = parsed?.rss?.channel?.[0];
      const items = channel?.item || [];
      console.log(`  Found ${items.length} active episodes in RSS feed.`);

      let parsedCount = 0;
      for (const item of items) {
        // Enclosure/audio URL is absolutely required
        const audioUrl = item.enclosure?.[0]?.$.url;
        if (!audioUrl) continue;

        // Build unique episode ID
        const rawGuid = item.guid?.[0]?._ || item.guid?.[0] || item.link?.[0] || item.title?.[0];
        if (!rawGuid) continue;
        
        // Clean guid to be a safe string ID
        const cleanGuid = rawGuid.toString()
          .replace(/[^a-zA-Z0-9]/g, '-')
          .toLowerCase()
          .substring(0, 60);
        const episodeId = `${podcast.id}-ep-${cleanGuid}`;

        const title = item.title?.[0] || "Untitled Episode";
        
        // Extract description
        const descSource = item.description?.[0] || item['content:encoded']?.[0] || item['itunes:summary']?.[0] || "";
        const description = cleanDescription(descSource);

        const publishDate = formatDate(item.pubDate?.[0]);
        
        const durationStr = item['itunes:duration']?.[0] || item.duration?.[0] || "";
        const duration = parseDuration(durationStr);

        const topics = assignTopics(title, descSource, podcast.id);

        const episode = {
          id: episodeId,
          podcastId: podcast.id,
          podcastTitle: podcast.title,
          title,
          description,
          publishDate,
          duration,
          audioUrl,
          topics
        };

        newEpisodes.push(episode);
        parsedCount++;
      }
      
      console.log(`  Parsed ${parsedCount} episodes successfully.`);

      // 4. Merge logic (combine active RSS episodes with historical cached episodes)
      newEpisodes.forEach(ep => {
        existingEpisodesMap.set(ep.id, ep); // New episodes overwrite older metadata if IDs match
      });

      const mergedEpisodes = Array.from(existingEpisodesMap.values());
      
      // Sort episodes: latest first
      mergedEpisodes.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
      
      console.log(`  Total consolidated episodes (RSS + Historical): ${mergedEpisodes.length}`);

      finalPodcasts.push({
        ...podcast,
        episodes: mergedEpisodes
      });

    } catch (error) {
      console.error(`  Error parsing podcast ${podcast.title}:`, error.message);
      
      // If fetching fails, preserve whatever we had in the existing cache
      if (existingPodcast) {
        console.log(`  Preserving existing cached state for ${podcast.title} due to fetch failure.`);
        finalPodcasts.push(existingPodcast);
      } else {
        // Fallback: push empty podcast metadata so we don't break the app structure
        finalPodcasts.push({
          ...podcast,
          episodes: []
        });
      }
    }
  }

  // 5. Calculate stale status (inactive for more than 4 months / 120 days)
  const processedPodcasts = finalPodcasts.map(p => {
    let status = 'active';
    const episodes = p.episodes || [];
    if (episodes.length > 0) {
      const latestDateStr = episodes[0].publishDate;
      const latestTime = new Date(latestDateStr).getTime();
      if (!isNaN(latestTime)) {
        const ageInMs = Date.now() - latestTime;
        const ageInDays = ageInMs / (1000 * 60 * 60 * 24);
        if (ageInDays > 120) {
          status = 'stale';
        }
      }
    } else {
      status = 'stale';
    }
    return {
      ...p,
      status
    };
  });

  // 6. Ensure output directory exists and write final JSON
  const outputDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(processedPodcasts, null, 2), 'utf-8');
  console.log(`\nSuccess! Wrote consolidated database of ${processedPodcasts.length} shows to ${OUTPUT_PATH}`);
}

main();
