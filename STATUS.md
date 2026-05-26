# Show & Project Status — China Podcast Hub

This document tracks the technical progress, catalog status, and remaining work for the **China Podcast Hub (`china-pods`)**.

---

## 🚀 Application Technical Status

The application has successfully completed its core engineering transitions:

| Feature / System | Implementation Status | Tech Stack / Abstractions |
| :--- | :--- | :--- |
| **Data Architecture** | 🟢 **100% Completed** | Shifted from hardcoded static TS constants to a build-time RSS-scraped dynamic database file ([podcasts.json](file:///Users/danieltibbing/Projects/china/china-pods/public/podcasts.json)). |
| **Inactivity Tracking** | 🟢 **100% Completed** | Automatically calculates `status: "stale"` for shows without new episodes in **120 days** (4 months), rendering custom `Ended` badges. |
| **Grid/List Layouts** | 🟢 **100% Completed** | Dual-mode view toggle (Grid Cards vs Compact Table Row lists) matching the `china-jobs` catalog design. |
| **Exact Category Filters** | 🟢 **100% Completed** | Uses explicit show-level core categories with a robust episode-level topics filter fallback for custom RSS inputs. |
| **Custom Library (Starred)** | 🟢 **100% Completed** | Multi-section [StarredView](file:///Users/danieltibbing/Projects/china/china-pods/src/components/starred/StarredView.tsx) rendering both Subscribed Shows and Favorite Episodes in one dashboard. |
| **Scheduled Automation** | 🟢 **100% Completed** | Dedicated GitHub Actions daily workflow ([update_episodes.yml](file:///Users/danieltibbing/Projects/china/china-pods/.github/workflows/update_episodes.yml)) to run the Node scraper and push daily updates to main. |

## 📊 Catalog Status

Out of the **55 total podcasts** now listed, **55 shows (100%)** have been successfully added, verified, scraped, and integrated into the active catalog, leaving **0 shows (0%)** left to integrate.

### 🟢 Added & Scraped Shows (42)

All of the following shows are fully configured in [podcasts_config.json](file:///Users/danieltibbing/Projects/china/china-pods/scripts/podcasts_config.json) and populated in the active database with over **5,200 total episodes**:

| # | Show Title | Core Categories | Latest Status | Verified Feed Endpoint |
| :--- | :--- | :--- | :--- | :--- |
| 1 | **The Sinica Podcast** | Geopolitics, Society | 🟢 Active | `https://www.sinicapodcast.com/feed` |
| 2 | **The Little Red Podcast** | Geopolitics, Society | 🟢 Active | `https://omny.fm/shows/the-little-red-podcast/playlists/podcast.rss` |
| 3 | **Pekingology** | Geopolitics & Politics | 🟢 Active | `https://feeds.megaphone.fm/pekingology` |
| 4 | **The China History Podcast** | History | 🟢 Active | `https://chinahistorypodcast.libsyn.com/rss` |
| 5 | **ChinaTalk** | Tech & Business, Politics | 🟢 Active | `https://feeds.megaphone.fm/CHTAL4990341033` |
| 6 | **Chinese Whispers** | Society, History | 🟢 Active | `https://feeds.acast.com/public/shows/chinese-whispers` |
| 7 | **NüVoices** | Culture & Society | 🟢 Active | `https://nuvoices.libsyn.com/rss` |
| 8 | **Mosaic of China** | Culture & Society | 🟢 Active | `https://feed.podbean.com/mosaicofchina/feed.xml` |
| 9 | **China in Context** | Geopolitics & Politics | 🟢 Active | `https://feeds.soundcloud.com/users/soundcloud:users:943463482/sounds.rss` |
| 10 | **The China-Global South Podcast** | Geopolitics, Business | 🟢 Active | `https://rss.libsyn.com/shows/500733/destinations/4287628.xml` |
| 11 | **China Power** | Geopolitics & Politics | 🟢 Active | `https://feeds.megaphone.fm/CSIS6301448962` |
| 12 | **MERICS China Podcast** | Geopolitics & Politics | 🟢 Active | `https://rss.buzzsprout.com/1825833.rss` |
| 13 | **TeaTime Chinese 茶歇中文** | Culture & Society | 🟢 Active | `https://teatimechinese.libsyn.com/rss` |
| 14 | **Strangers in China** | Culture & Society | 🔴 Ended | `https://rss.art19.com/strangers-in-china` |
| 15 | **Den Digitala Draken** | Tech & Business | 🔴 Ended | `https://digitaladraken.libsyn.com/rss` |
| 16 | **Radiokorrespondenterna Kina** | Geopolitics, Society | 🟢 Active | `https://api.sr.se/api/rss/pod/itunes/34159` |
| 17 | **China Business Cast** | Tech & Business | 🔴 Ended | `https://feeds.simplecast.com/WeHw_1yx` |
| 18 | **The Asiabits Podcast** | Tech & Business | 🟢 Active | `https://rss.buzzsprout.com/2572872.rss` |
| 19 | **Tech in Shanghai** | Tech & Business | 🔴 Ended | `https://anchor.fm/s/21019cc8/podcast/rss` |
| 20 | **Digitally China** | Tech & Business | 🔴 Ended | `http://www.ximalaya.com/album/25003858.xml` |
| 21 | **Conside - China Tech Scene** | Tech & Business | 🔴 Ended | `https://anchor.fm/s/fbc0f278/podcast/rss` |
| 22 | **China Tech Investor** | Tech & Business | 🔴 Ended | `https://feeds.simplecast.com/eAOEC11F` |
| 23 | **China Tech Talk (TP Huang)** | Tech & Business | 🟢 Active | `https://api.substack.com/feed/podcast/2128842.rss` |
| 24 | **Inside China Tech** | Tech & Business | 🔴 Ended | `https://cms.scmp.com/rss/google_assistant/325477/media_rss.xml?article-type=329434` |
| 25 | **China Tech Talk (TechNode)** | Tech & Business | 🔴 Ended | `http://chinatechtalk.libsyn.com/rss` |
| 26 | **China Corner Office** | Tech & Business | 🔴 Ended | `https://rss.art19.com/china-corner-office` |
| 27 | **China Flexpat** | Tech & Business | 🔴 Ended | `https://feeds.buzzsprout.com/479218.rss` |
| 28 | **Caixin-Sinica Business Brief** | Tech & Business | 🔴 Ended | `https://rss.art19.com/caixin-sinica-business-brief` |
| 29 | **China Stories** | History, Culture & Society | 🔴 Ended | `https://rss.art19.com/china-stories` |
| 30 | **China Books Podcast** | Culture & Society, History | 🔴 Ended | `https://rss.buzzsprout.com/2252666.rss` |
| 31 | **The Chinese Literature Podcast** | Culture & Society, History | 🔴 Ended | `https://rss.libsyn.com/shows/80114/destinations/368338.xml` |
| 32 | **Teatime with Jesse** | Culture & Society | 🔴 Ended | `https://feeds.megaphone.fm/teatimewithjesse` |
| 33 | **Young China** | Culture & Society | 🔴 Ended | `http://rss.castbox.fm/everest/e259dc88289a44a2afcf8cc424fe2c47.xml` |
| 34 | **Eat Drink Asia** | Culture & Society, History | 🔴 Ended | `https://cms.scmp.com/rss/google_assistant/325477/media_rss.xml?article-type=329436` |
| 35 | **Big Fish in the Middle Kingdom** | Culture & Society | 🔴 Ended | `https://www.crazyinagoodway.com/home?format=rss` |
| 36 | **Sharp China with Bill Bishop** | Geopolitics & Politics | 🟢 Active | `https://sharpchina.fm/feed/podcast` |
| 37 | **Sinocism Live** | Geopolitics & Politics | 🟢 Active | `https://api.substack.com/feed/podcast/2/s/7556.rss` |
| 38 | **The Asia Chessboard** | Geopolitics & Politics | 🟢 Active | `https://feeds.megaphone.fm/CSIS3910820010` |
| 39 | **Made in China (German)** | Tech & Business, Geopolitics & Politics | 🟢 Active | `https://rss.buzzsprout.com/1869386.rss` |
| 40 | **China and the World Program's Podcast** | Geopolitics & Politics | 🟢 Active | `https://sipacwp.podomatic.com/rss2.xml` |
| 41 | **The Red Line** | Geopolitics & Politics | 🟢 Active | `https://feeds.megaphone.fm/ARML4010200722` |
| 42 | **China Hands** | Geopolitics & Politics, History | 🟢 Active | `https://rss.buzzsprout.com/2232707.rss` |
| 43 | **The Trivium China Podcast** | Geopolitics & Politics | 🟢 Active | `https://rss.buzzsprout.com/2408047.rss` |
| 44 | **Insight Asia** | Tech & Business | 🟢 Active | `https://rss.libsyn.com/shows/420659/destinations/3494030.xml` |
| 45 | **Asia Insight (NBR)** | Geopolitics & Politics | 🟢 Active | `https://feed.podbean.com/podcasts.nbr.org/feed.xml` |
| 46 | **Roundtable China** | Culture & Society | 🟢 Active | `https://aezfm.meldingcloud.com/rss/program/11` |
| 47 | **The Wire China Podcast** | Tech & Business, Geopolitics & Politics | 🟢 Active | `https://rss.buzzsprout.com/2591600.rss` |
| 48 | **China in Depth** | Culture & Society | 🟢 Active | `https://mp3mp4pdf.net/chinaindepth.xml` |
| 49 | **Young China Watchers** | Geopolitics & Politics | 🔴 Ended | `https://anchor.fm/s/bc9b0e8/podcast/rss` |
| 50 | **The Dumbrill Podcast** | Geopolitics & Politics | 🟢 Active | `https://feeds.captivate.fm/dumbrill/` |
| 51 | **Drum Tower (The Economist)** | Geopolitics & Politics, Culture & Society | 🟢 Active | `https://access.acast.com/rss/633ebf6dfc7f5a0012acdc97` |
| 52 | **Environment China (Clean Energy)** | Tech & Business, Culture & Society | 🟢 Active | `https://rss.libsyn.com/shows/90651/destinations/450972.xml` |
| 53 | **China in the World (Carnegie)** | Geopolitics & Politics | 🔴 Ended | `https://feeds.simplecast.com/WZ57mq5R` |
| 54 | **Talking China In Eurasia** | Geopolitics & Politics, History | 🔴 Ended | `https://www.rferl.org/podcast/?count=50&daycount=3000&zoneId=22795` |
| 55 | **U.S.-China Nexus Podcast** | Geopolitics & Politics | 🟢 Active | `https://uschinadialogue.georgetown.edu/series/u-s-china-nexus-podcast/feed.rss` |

---

### 🟡 Remaining Shows to Integrate (0)

All podcasts from `podcasts.md` are now fully integrated into the scraper configuration and consolidated in the active dynamic database!

*(Note: Batch 6 is now fully integrated and migrated to the active catalog table)*

---

## 🛠️ Next Roadmap Tasks

1. **Batch 3 Expansion**: 🟢 **100% Completed** (Added `China Corner Office`, `China Flexpat`, and `Caixin-Sinica Business Brief`).
2. **Batch 4 Expansion**: 🟢 **100% Completed** (Added `China Stories`, `China Books Podcast`, `The Chinese Literature Podcast`, `Teatime with Jesse`, `Young China`, `Eat Drink Asia`, and `Big Fish in the Middle Kingdom`).
3. **Batch 5 Expansion**: 🟢 **100% Completed** (Added `Sharp China with Bill Bishop`, `Sinocism Live`, `The Asia Chessboard`, `Made in China (German)`, `China and the World Program's Podcast`, `The Red Line`, and `China Hands`).
4. **Batch 6 Expansion**: 🟢 **100% Completed** (Added the final 10 podcasts: `The Trivium China Podcast`, `Insight Asia`, `Asia Insight (NBR)`, `Roundtable China`, `The Wire China Podcast`, `China in Depth`, `Young China Watchers`, `The Dumbrill Podcast`, `Drum Tower (The Economist)`, and `Environment China (Clean Energy)`, plus three premier policy additions: `China in the World (Carnegie)`, `Talking China In Eurasia`, and `U.S.-China Nexus Podcast`).

---

## 💡 Future Technical Improvements

### 1. Curated Database Truncation (Performance Optimization)
*   **Context**: Currently, [podcasts.json](file:///Users/danieltibbing/Projects/china/china-pods/public/podcasts.json) stores the complete historical episode archive for all 28 podcasts, totaling **3.0 MB raw**. Over years of daily scraping, this file will grow and may drag initial load performance.
*   **The Improvement**: Transition the data architecture to a hybrid truncation model:
    *   **Main Feed Truncation**: Modify `fetch_episodes.js` to only store the **latest 30 to 50 episodes** per show inside `public/podcasts.json`. This keeps the initial bundle file permanently small (~800 KB raw / ~100 KB compressed Brotli) while preserving instant global search and category filters for fresh releases.
    *   **Lazy Archives**: Dump full historical episode lists into separate static files (e.g. `public/archives/chp.json`) and lazy-load them inside the app on-demand when the user views the podcast's detailed page and selects *"Load older episodes"*.

