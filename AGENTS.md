# 🎙️ China Podcast Hub (china-pods) - `AGENTS.md`

This directory houses the Podcast Hub application of the **China Suite** ecosystem—an ultra-premium, interactive client-side web application aggregating the top podcasts on Chinese history, geopolitics, business, tech, and contemporary culture.

---

## 🎯 Purpose & Capabilities
- **Curated Audio Feeds**: Incorporates a rich pre-seeded directory of top-tier English-language podcasts focused on Chinese affairs.
- **Playback Engine**: Incorporates a premium sticky HTML5 audio player containing scrub-bars, speed modulators, volumes, and context queue indexes.
- **Dynamic Queue**: Allows users to chain episodes into a vertical draggable/reorderable list which transitions automatically.
- **Custom Podcast Creator**: Supports local customized directory creations via user-supplied MP3 links and host metadata.
- **Data Portability**: Backup and restore all custom metadata, episode history, or active queue queues using local JSON export loaders.

---

## 🛠️ Technology Stack
- **Framework:** React 19 + TypeScript + Vite 8
- **Styling:** Tailwind CSS v4.0.0 (vanilla modules import)
- **Deployment Endpoint:** GitHub Pages subdirectory `/china-pods/`

---

## 📂 Key Directory Structures
```text
china-pods/
├── src/
│   ├── components/
│   │   ├── episodes/    # Individual list items, search cells, and episode grids
│   │   ├── layout/      # SuiteSwitcher core templates
│   │   ├── player/      # HTML5 sticky playback controls
│   │   ├── podcasts/    # Podcast grid channels and subscription folders
│   │   ├── queue/       # Sidebar draggable queue controller sheets
│   │   └── settings/    # JSON back-up utilities and custom RSS creators
│   ├── constants/
│   │   └── podcasts.ts  # Pre-seeded podcast streams database
│   ├── hooks/
│   │   ├── usePodcasts.ts # Audio context provider & history manager
│   │   └── useTheme.ts  # Shared dark/light storage toggle sync
│   ├── types/
│   │   └── index.ts     # Type models (Podcast, Episode, PlaybackState)
│   ├── App.tsx          # Dashboard compiler and overlay routing
│   └── main.tsx         # DOM entry point
```

---

## 🔑 Shared Design & Implementation Patterns

### 1. Robust Audio Streaming (CORS & Range Requests)
- Presets listed inside `src/constants/podcasts.ts` must use direct audio files (`.mp3` or `.m4a` endpoints) that natively support:
  - **CORS headers** (`Access-Control-Allow-Origin: *`) to satisfy browser fetch limits.
  - **HTTP Range Requests** (`Accept-Ranges: bytes`) enabling precise scrubbing and timeline seek indicators.
- **Agent Warning**: When testing custom feed links, confirm the target server allows CORS wildcarding; otherwise, browser HTML5 players will fail playback.

### 2. Audio State Management Context (`src/hooks/usePodcasts.ts`)
- Leverages React Context to manage a global instance of HTMLAudioElement (`new Audio()`).
- Centralizes all playing, pausing, queue transitions, and scrubbing methods. 
- Avoid initializing raw `<audio>` DOM tags inside sub-views to prevent multiple media sources playing simultaneously.

### 3. Session Backup Schema
- Settings panel supports exporting local JSON backups representing customized podcasts, playing durations, and bookmarks. Ensure standard exports map strictly against target TypeScript descriptors.

---

## 💻 Operations Reference
- **Local Dev Server:**
  ```bash
  npm install
  npm run dev
  ```
- **Compiling Production Build:**
  ```bash
  npm run build
  ```
  *(Tests TypeScript compile trees and bundles minified client assets inside `dist/`)*
