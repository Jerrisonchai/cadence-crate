# Changelog

All notable changes to Cadence Crate.

---

## [v0.3.0] — 2026-07-30

### Added
- **Run Mode — Dual Mode System**: Browse Mode (filtered playlist) + Favorites Mode (drag-sorted playlist)
- **Favorites Drag & Sort**: @dnd-kit sortable grid with grip handles, drag to reorder
- **About Page — How to Use Section**: Song details, BPM colors, 4-phase running sequence, playlist workflow
- **Run page mode toggle**: Segmented control (Browse | Favorites) with distinct color themes
- sessionStorage persistence for Browse filter state → Run Mode picks up exact filtered list
- Per-song remove button on Favorites cards
- "Start Run with Favorites" CTA button
- 6 new Journal articles from Ian Charman podcast (12 total)
- 18 new runner quotes (69 total)
- `CHANGELOG.md`

### Changed
- Run page: complete rewrite with mode system & playlist-level looping
- Favorites page: full drag-and-drop sortable grid
- About page: expanded with comprehensive how-to guide
- Browse page (HomeContent): saves filter state to sessionStorage on every change

### Fixed
- **Next-song autoplay bug**: Audio now plays immediately when clicking Next (was creating Audio element but never starting playback)
- **Playlist looping**: Songs no longer loop individually (`loop=false`), playlist loops via `ended` event

---

## [v0.2.0] — 2026-07-29

### Added
- Run Mode (`/run`): Giant BPM display, 3 concentric pulse rings, Media Session + Wake Lock APIs
- BPM Tap Tool (`/tap`): Manual tap-to-beat with pulse sync, zone labels, interval consistency chart
- Song Detail page (`/song/[id]`): Full audio profile, cadence match analysis
- YouTube→MP3 audio pipeline: yt-dlp + ffmpeg, 8 songs (~43 MB)
- 3-Tier BPM Verification: Tunebat+SongBPM (T1), numpy/SciPy onset detection (T2), manual tap (T3)
- Weekly Searcher cron (Saturday 10PM MYT)
- Weekly Collector cron (Sunday 2AM MYT)
- PWA support: icons (192/512), manifest, service worker
- Full SEO: sitemap, robots.txt, metadata, OG image, JSON-LD

### Changed
- Expand MobileNav to 6 tabs (adds Journal, Run Mode, Tap)
- Sidebar: decades, genres, favorites, journal, run, tap, about links
- Favorites: localStorage persistence, "Clear All" button
- Journal: 6 articles with category filters

### Fixed
- BPM heat class mismatch across components
- Song ID collision in filtered views
- Run page catalog not matching Browse
- Journal filter logic
- All filters broken (API fallback returned unfiltered) — client-side `applyFilters()` + `sortSongs()`

---

## [v0.1.1] — 2026-07-28

### Added
- Mobile hamburger drawer with decade/genre submenus
- Version footer

---

## [v0.1.0] — 2026-07-27

### Added
- Initial scaffold: Next.js 15, Tailwind, framer-motion
- Browse page with song grid
- Filter chips: decade, genre, language, sort
- Song cards with BPM badge
- Favorites page (localStorage)
- About page
- Journal page with first article
- Mobile bottom nav (4 tabs)
- Desktop sidebar
- Futuristic runner design system (#050510 + #A3FF12 + #00D4FF)
- Vercel deployment: cadence-crate.vercel.app
