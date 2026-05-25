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
| **Scheduled Automation** | 🟢 **100% Completed** | Dedicated GitHub Actions daily workflow ([update_episodes.yml](file:///Users/danieltibbing/Projects/china/china-pods/.github/workflows/update_episodes.yml)) to run the Node scraper and push daily updates. |

---

## 📊 Podcast Catalog Progress

Out of the **52 total podcasts** now listed in [podcasts.md](file:///Users/danieltibbing/Projects/china/china-pods/podcasts.md), **28 shows (54%)** have been successfully added, verified, scraped, and integrated into the active catalog, leaving **24 shows (46%)** left to integrate.

### 🟢 Added & Scraped Shows (28)

All of the following shows are fully configured in [podcasts_config.json](file:///Users/danieltibbing/Projects/china/china-pods/scripts/podcasts_config.json) and populated in the active database with over **3,300 total episodes**:

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
| 16 | **Radiokorrespondenterna Kina** | Geopolitics, Society | 🟢 Active | `https://api.sr.se/api/rss/pod/3784` |
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

---

### 🟡 Remaining Shows to Integrate (24)

The following shows listed in `podcasts.md` are not yet added to the scraper configuration. They will be added in upcoming batches:

```markdown
1. The Trivium China Podcast        [ ] General / Geopolitical
2. Insight Asia                    [ ] General
3. Asia Insight                    [ ] General
4. China Stories                   [ ] History / Culture
5. Sharp China Podcast             [ ] Geopolitical / Current Affairs
6. Made in China (German podcast)  [ ] Geopolitical
7. China Books Podcast             [ ] Literature & Culture
8. Teatime with Jesse             [ ] Culture & Society
9. The Asia Chessboard            [ ] Strategic / Security
10. China and the World            [ ] Geopolitical
11. Sinocism Podcast               [ ] Geopolitical / Newsletter
12. The Chinese Literature Podcast [ ] Arts / Literature
13. Roundtable China               [ ] Society / Media
14. The China Podcast              [ ] General
15. China in Depth                 [ ] Analytical
16. SupChina                       [ ] (Ended - Replaced by Sinica)
17. The Red Thread                 [ ] Strategic / Geopolitical
18. Young China Watchers           [ ] Career / Geopolitical
19. The Dumbrill Podcast           [ ] Media / Society
20. Young China                    [ ] Culture & Youth
21. Big Fish in the Middle Kingdom [ ] Expatriate Life
22. The China Hand                 [ ] Analytical / Strategic
23. Drum Tower (by The Economist)  [ ] Geopolitical / Society
24. China in the World             [ ] Geopolitical / Academic Think Tank
25. The China-Eurasia Podcast      [ ] Geopolitical / Belt and Road Footprint
26. Eat Drink Asia (by SCMP)       [ ] Culture & Society / Food History
27. The China Clean Energy Podcast [ ] Technical Clean Energy / Tech Transition
28. U.S.-China Nexus               [ ] Strategic Geopolitics / Academic
```
*(Note: Batch 3 is now fully integrated and migrated to the active catalog table)*

---

## 🛠️ Next Roadmap Tasks

1. **Batch 3 Expansion**: 🟢 **100% Completed** (Added `China Corner Office`, `China Flexpat`, and `Caixin-Sinica Business Brief`).
2. **Batch 4 Expansion**: Add remaining **History & Culture** shows (like `China Stories`, `China Books Podcast`, and `The Chinese Literature Podcast`).
3. **Batch 5 Expansion**: Add the remaining **Geopolitical & Strategic** programs (like `Sharp China`, `Sinocism`, `The Asia Chessboard`).
4. **Batch 6 Expansion**: Add **Forgotten Giants** (including `Drum Tower`, `China in the World`, `The China-Eurasia Podcast`, `Eat Drink Asia`, `The China Clean Energy Podcast`, and `U.S.-China Nexus`).

---

## 💡 Future Technical Improvements

### 1. Curated Database Truncation (Performance Optimization)
*   **Context**: Currently, [podcasts.json](file:///Users/danieltibbing/Projects/china/china-pods/public/podcasts.json) stores the complete historical episode archive for all 28 podcasts, totaling **3.0 MB raw**. Over years of daily scraping, this file will grow and may drag initial load performance.
*   **The Improvement**: Transition the data architecture to a hybrid truncation model:
    *   **Main Feed Truncation**: Modify `fetch_episodes.js` to only store the **latest 30 to 50 episodes** per show inside `public/podcasts.json`. This keeps the initial bundle file permanently small (~800 KB raw / ~100 KB compressed Brotli) while preserving instant global search and category filters for fresh releases.
    *   **Lazy Archives**: Dump full historical episode lists into separate static files (e.g. `public/archives/chp.json`) and lazy-load them inside the app on-demand when the user views the podcast's detailed page and selects *"Load older episodes"*.

