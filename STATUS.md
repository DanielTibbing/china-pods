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

Out of the **46 total podcasts** listed in [podcasts.md](file:///Users/danieltibbing/Projects/china/china-pods/podcasts.md), **24 shows (52%)** have been successfully added, verified, scraped, and integrated into the active catalog, leaving **22 shows (48%)** left to integrate.

### 🟢 Added & Scraped Shows (24)

All of the following shows are fully configured in [podcasts_config.json](file:///Users/danieltibbing/Projects/china/china-pods/scripts/podcasts_config.json) and populated in the active database with over **2,800 total episodes**:

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
| 23 | **China Tech Talk** | Tech & Business | 🟢 Active | `https://api.substack.com/feed/podcast/2128842.rss` |
| 24 | **Inside China Tech** | Tech & Business | 🔴 Ended | `https://cms.scmp.com/rss/google_assistant/325477/media_rss.xml?article-type=329434` |

---

### 🟡 Remaining Shows to Integrate (22)

The following shows listed in `podcasts.md` are not yet added to the scraper configuration. They will be added in upcoming batches:

```markdown
1. The Trivium China Podcast        [ ] General / Geopolitical
2. Insight Asia                    [ ] General
3. Asia Insight                    [ ] General
4. China Flexpat                   [ ] Business / Career
5. China Corner Office             [ ] Business / Leadership
6. China Stories                   [ ] History / Culture
7. Sharp China Podcast             [ ] Geopolitical / Current Affairs
8. Made in China (German podcast)  [ ] Geopolitical
9. China Books Podcast             [ ] Literature & Culture
10. Teatime with Jesse             [ ] Culture & Society
11. The Asia Chessboard            [ ] Strategic / Security
12. China and the World            [ ] Geopolitical
13. Sinocism Podcast               [ ] Geopolitical / Newsletter
14. The Chinese Literature Podcast [ ] Arts / Literature
15. Roundtable China               [ ] Society / Media
16. The China Podcast              [ ] General
17. China in Depth                 [ ] Analytical
18. SupChina                       [ ] (Ended - Replaced by Sinica)
19. The Red Thread                 [ ] Strategic / Geopolitical
20. Young China Watchers           [ ] Career / Geopolitical
21. The Dumbrill Podcast           [ ] Media / Society
22. Young China                    [ ] Culture & Youth
23. Big Fish in the Middle Kingdom [ ] Expatriate Life
24. Caixin-Sinica Business Brief   [ ] Business / Tech News
25. The China Hand                 [ ] Analytical / Strategic
```

---

## 🛠️ Next Roadmap Tasks

1. **Batch 3 Expansion**: Add the next set of **Business / Career** shows (like `China Corner Office`, `China Flexpat`, and `Caixin-Sinica Business Brief`) to config.
2. **Batch 4 Expansion**: Add remaining **History & Culture** shows (like `China Stories`, `China Books Podcast`, and `The Chinese Literature Podcast`).
3. **Batch 5 Expansion**: Add the remaining **Geopolitical & Strategic** programs (like `Sharp China`, `Sinocism`, `The Asia Chessboard`).
