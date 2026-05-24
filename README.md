# 🎙️ China Podcast Hub (china-pods)

An ultra-premium, interactive client-side web application aggregating the top podcasts on Chinese history, geopolitics, business, tech, and contemporary culture. Built on a responsive, glassmorphic dark-mode visual system, the Podcast Hub features a state-of-the-art HTML5 audio player and queue manager.

---

## ✨ Features

- **9 Curated High-Quality Podcasts:** Seeded with *The Sinica Podcast*, *The Little Red Podcast*, *Pekingology*, *The China History Podcast*, *ChinaTalk*, *Chinese Whispers*, *NüVoices*, *Mosaic of China*, and *SOAS China in Context*.
- **100% Reliable Playback Engine:** All preset episodes are verified direct MP3 streams natively supporting:
  - **CORS Wildcarding** (`Access-Control-Allow-Origin: *`) to eliminate browser security blocks.
  - **HTTP Range Requests** (`Accept-Ranges: bytes`) for smooth scrub/seeking and playback speed indices.
- **Glassmorphic Sticky Audio Player:** Features persistent playback states, speed controllers (0.75x to 2x), interactive timeline scrubbers, volume sliders, and queue indicators.
- **Queue Manager:** A reorderable sidebar queue allowing sequential, hands-free episode transitions.
- **Custom Local Show Creator:** Build your own custom local directories with custom titles, hosts, descriptions, and custom audio streams inside settings.
- **Session Archives:** One-click JSON backup/restore exports to back up your progress, custom podcasts, and playback queues.
- **Theme Tab-Sync:** Dark and light modes change instantly across all active browser suite windows using shared local storage listeners.

---

## 🛠️ Technology Stack

- **Framework:** React 19 + TypeScript + Vite 8
- **Styling:** Tailwind CSS v4.0.0 (using standard vanilla modules)
- **Deployment:** GitHub Pages subfolder (`/china-pods/`)

---

## 📂 Project Directory Structure

```text
src/
├── components/          # Reactive UI Components
│   ├── episodes/        # Episode listing and row elements
│   ├── layout/          # Cross-Navigation Switcher Header & Footer
│   ├── player/          # Sticky glassmorphic audio controller
│   ├── podcasts/        # Curated podcast directory views
│   ├── queue/           # Sidebar queue manager panel
│   └── settings/        # Custom podcast creator and backup utilities
├── constants/
│   └── podcasts.ts      # Active directory constants & audio endpoints
├── hooks/
│   ├── usePodcasts.ts   # Core audio playback context and history log engine
│   └── useTheme.ts      # Dark/light theme switcher hook
├── types/
│   └── index.ts         # TypeScript structures (Podcast, Episode, PlaybackState)
├── App.tsx              # Main layout assembler and routing configuration
└── main.tsx             # DOM entry point
```

---

## 💻 Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run locally in development mode:**
   ```bash
   npm run dev
   ```
3. **Build the production package:**
   ```bash
   npm run build
   ```
   *This compiles TypeScript strict checking (`tsc -b`) and bundles standard minified files inside `dist/` using Vite.*

---

## 🌐 China Suite Ecosystem

The Podcast Hub operates as part of the broader **China Suite** family. The switcher header instantly navigates between:
- **Switcher Portal**: [danieltibbing.github.io](https://danieltibbing.github.io/)
- **Career Board**: [china-jobs](https://danieltibbing.github.io/china-jobs/)
- **Study Hub**: [chinese-practice](https://danieltibbing.github.io/chinese-practice/)
- **Podcast Hub (This Repo)**: [china-pods](https://danieltibbing.github.io/china-pods/)
