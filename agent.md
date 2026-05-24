# Agent Context — China Podcast Hub (china-pods)

This repository serves as the audio podcast center for the **China Suite** ecosystem, aggregating historical, geopolitical, business, and cultural audio programs with custom streaming controls.

---

## 🗺️ Suite Ecosystem Architecture

The Podcast Hub operates as a sub-app under the path `/china-pods/` of the main portal:
1. **Switcher Portal**: `https://danieltibbing.github.io/`
2. **Career Board (`china-jobs`)**: `https://danieltibbing.github.io/china-jobs/`
3. **Study Hub (`chinese-practice`)**: `https://danieltibbing.github.io/chinese-practice/`
4. **Podcast Hub (This Repo)**: `https://danieltibbing.github.io/china-pods/`

---

## 🛠️ Technical Stack & Configurations

- **Framework**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS v4.0.0
- **Build Configurations**:
  - `vite.config.ts`: Base is `/china-pods/` to allow subdirectory routing on GitHub Pages.
  - `tsconfig.json` & `tsconfig.app.json`: Strict TypeScript checking, utilizing `verbatimModuleSyntax: true` for clean type imports.
- **Routing**: `HashRouter` is integrated inside `src/App.tsx` to handle page routing seamlessly.

---

## 🎧 Audio Engine & Stream Integrity

All preset podcasts inside `src/constants/podcasts.ts` are populated with verified, active, open audio MP3 URLs:
- **CORS Support**: All audio URLs natively support wildcard CORS headers (`Access-Control-Allow-Origin: *`) to avoid browser sandbox playback blocks.
- **Scrubbing/Seeking**: The streams support HTTP Range Requests (`Accept-Ranges: bytes`) for smooth scrub, speed-change, and playback buffer adjustments in the player.
- **The Little Red Podcast**: Substituted the locked/paywalled *Drum Tower* with this highly acclaimed open show hosted on Omny Studio.

---

## 🎨 Design Rules & Aesthetics

- **Visual Theme**: Premium dark-violet accents (`#7c3aed` / `text-violet-600`) and a glassmorphic bottom-anchored HTML5 sticky audio player displaying active track details, visualizers, volume nodes, and speed indices (0.75x to 2x).
- **Theme Synchronization**:
  - Leverages the shared `theme` key in `localStorage`.
  - Implements an early FOUC-preventive `<script>` inside `index.html`'s `<head>`.
  - Real-time sync: Active listener inside `App.tsx` listens for storage events, aligning dark/light classes instantly across active tabs.

---

## 📂 Codebase Organization

- `src/constants/podcasts.ts`: Central database for the 9 preset podcasts and verified streams.
- `src/types/index.ts`: Strict types for Episodes, Podcasts, PlaybackState, and history logs.
- `src/hooks/usePodcasts.ts`: The primary audio context hook, managing browser `Audio` nodes, playheads, queue additions, and history logs.
- `src/components/layout/Header.tsx`: Cross-navigation bar linking all 4 apps together.
- `src/components/player/AudioPlayer.tsx`: The sticky persistent media controller.
- `src/components/queue/QueueManager.tsx`: Sidebar manager for sequential playlist orderings.
- `src/components/settings/SettingsView.tsx`: Manages custom podcast creations and session JSON backup/restore exports.
- `.github/workflows/deploy.yml`: Deploys compiled assets to the `/china-pods/` path.

---

## 💻 Useful Operations

- Run development server: `npm run dev`
- Build project: `npm run build` (runs `tsc -b && vite build`)
- Deployment: Push to the `main` branch to trigger the automated GitHub actions runner.
