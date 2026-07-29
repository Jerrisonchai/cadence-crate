# Cadence Crate — Product Requirements Document

> **Tagline:** Find your rhythm. Hit your stride.
> **Core Motif:** Help runners run effectively by following the song beats — every step lands exactly on the downbeat.

---

## 0. The Song Acquisition Pipeline (READ THIS FIRST)

> **Jerrison's question:** *"How will you update the song list? It's impossible to one-shot 100 songs for 160 BPM. What internal process validates songs are really 160-170 BPM?"*

This is the engine. Without it, Cadence Crate is an empty shell.

### 0.1 Why This Is Hard

| Problem | Detail |
|---------|--------|
| **Spotify has no BPM search** | Their search API has `genre`, `year`, `market` — but NOT `tempo` |
| **160-170 BPM is a narrow slice** | Only ~3-5% of popular songs fall in this range. Most are 100-140 or 70-90 (half-time) |
| **Chinese catalog is spotty** | Spotify's Mandopop/Cantopop metadata is thinner than English — fewer `audio-features` entries |
| **BPM data can drift** | Same track can return 168.2 BPM today and 167.8 BPM tomorrow due to API variance |

### 0.2 The Phased Collection Strategy

We don't try to get "all songs." We slice by **decade × language × genre**, one batch per week.

```
┌──────────────────────────────────────────────────────────────────┐
│  PHASE A: 1980s          PHASE B: 1990s                         │
│  ┌─────────┬─────────┐  ┌─────────┬─────────┬─────────────┐    │
│  │ Chinese │ English │  │ Chinese │ English │ Genre Deep  │    │
│  │ Pop     │ Pop     │  │ Pop     │ Pop     │ Dives       │    │
│  │ Wk 1-2  │ Wk 3-4  │  │ Wk 5-6  │ Wk 7-8  │ Wk 9-10     │    │
│  └─────────┴─────────┘  └─────────┴─────────┴─────────────┘    │
│                                                                  │
│  PHASE C: 2000s          PHASE D: 2010s                         │
│  ┌─────────┬─────────┐  ┌─────────┬─────────┬─────────────┐    │
│  │ Chinese │ English │  │ Chinese │ English │ Genre Deep  │    │
│  │ Pop     │ Pop     │  │ Pop     │ Pop     │ Dives       │    │
│  │ Wk 11-12│ Wk 13-14│  │ Wk 15-16│ Wk 17-18│ Wk 19-20    │    │
│  └─────────┴─────────┘  └─────────┴─────────┴─────────────┘    │
│                                                                  │
│  PHASE E: 2020s          PHASE F: Genre Deep Dives              │
│  ┌─────────┬─────────┐  ┌──────┬──────┬──────┬──────────┐     │
│  │ Chinese │ English │  │ Rock │HipHop│Electr│Mandopop  │     │
│  │ Pop     │ Pop     │  │      │      │onic  │Cantopop  │     │
│  │ Wk 21-22│ Wk 23-24│  │Wk25- │Wk27- │Wk29- │Wk31-32   │     │
│  └─────────┴─────────┘  └──────┴──────┴──────┴──────────┘     │
└──────────────────────────────────────────────────────────────────┘
```

**Weekly cadence:** Every Sunday 2AM MYT, a cron job targets one cell of this grid. Searches broadly, validates tightly, inserts only confirmed 160-170 BPM tracks.

### 0.3 The Validation Pipeline (Per Song)

A song does NOT enter the database until it passes ALL 4 gates:

```
Song candidate from Spotify search
         │
         ▼
  ┌─────────────────────────┐
  │ GATE 1: Spotify Audio   │  GET /audio-features/{id}
  │ Features API            │  tempo must be 160.0–170.0
  └───────────┬─────────────┘
              │ PASS (tempo in range)
              ▼
  ┌─────────────────────────┐
  │ GATE 2: Re-query (24hr) │  Same API call, next day
  │                         │  tempo must match ±0.5 BPM
  └───────────┬─────────────┘
              │ PASS (stable tempo)
              ▼
  ┌─────────────────────────┐
  │ GATE 3: Cross-reference │  Tunebat API or GetSongBPM
  │ (when available)        │  Must agree within ±2 BPM
  └───────────┬─────────────┘
              │ PASS (external confirm)
              ▼
  ┌─────────────────────────┐
  │ GATE 4: Preview exists  │  Spotify preview_url must
  │                         │  be non-null (30s clip)
  └───────────┬─────────────┘
              │ PASS
              ▼
  ┌─────────────────────────┐
  │ INSERT into Supabase    │  ✅ Song enters the crate
  │ + deduplication check   │
  └─────────────────────────┘
```

**Gate 1 is the hard filter.** Most candidates die here. We search ~500 tracks to find ~15 candidates at 160-170 BPM, and ~10 survive all gates.

### 0.4 The Weekly Cron Job

```
┌────────────────────────────────────────────────────────┐
│  CRON: "Weekly BPM Collector"                          │
│  Schedule: Every Sunday 2:00 AM MYT                      │
│  Script: scripts/cadence_collector.py                    │
│  Timeout: 900s (lots of API calls)                       │
│                                                          │
│  Each run:                                               │
│  1. Read current phase + decade + genre from state file  │
│  2. Spotify Search: "year:1990-1999 genre:pop"          │
│     → paginate through 5 pages (250 tracks)              │
│  3. Batch Audio Features: 100 IDs per call × 3 calls    │
│     → filter: 160.0 ≤ tempo ≤ 170.0                    │
│  4. Gate 2: Re-validate last week's pending candidates  │
│  5. Gate 3: Tunebat cross-ref on new candidates         │
│  6. Gate 4: Strip null preview_url entries              │
│  7. INSERT validated tracks → Supabase                  │
│  8. Log: "Added 12 songs | 90s English Pop | 164 avg"   │
│  9. Advance phase pointer if collection complete        │
│                                                          │
│  Target output: 10 validated songs per run               │
│  At 52 runs/year: ~520 songs/year sustained              │
└────────────────────────────────────────────────────────┘
```

### 0.5 State Management

A `data/cadence_collector_state.json` file tracks progress:

```json
{
  "currentPhase": "B",
  "currentDecade": "1990s",
  "currentLanguage": "chinese",
  "currentGenres": ["pop", "mandopop"],
  "songsCollectedThisPhase": 23,
  "phaseTarget": 50,
  "lastRun": "2026-08-02T02:00:00+08:00",
  "totalSongsInDatabase": 87,
  "phasesCompleted": ["A"]
}
```

### 0.6 How We Know a Song Is "160-170 BPM"

| Confidence Level | Condition | Action |
|-----------------|-----------|--------|
| **High (3-check)** | Spotify 2× + Tunebat agree | ✅ Auto-insert |
| **Medium (2-check)** | Spotify 2× agree (no Tunebat) | ✅ Auto-insert with `confidence: medium` flag |
| **Low (1-check)** | Only one Spotify reading | ⚠️ Hold in pending queue, re-check next week |
| **Rejected** | Any check >170 or <160 | ❌ Discard |

### 0.7 Weekly Growth Projection

| Month | Songs Added | Total Library | Coverage |
|-------|------------|---------------|----------|
| Month 1 | ~40 | 40 | 80s CN/EN complete |
| Month 2 | ~40 | 80 | 90s CN/EN complete |
| Month 3 | ~40 | 120 | 2000s complete |
| Month 4 | ~40 | 160 | 2010s complete |
| Month 5 | ~40 | 200 | 2020s complete |
| Month 6+ | ~40/mo | 200+ | Genre deep dives ongoing |

---

## Product Vision

**Problem:** Runners know 160-170 BPM is the optimal cadence. Spotify shows you "Running Playlists" but can't filter by actual BPM. Chinese pop songs — the most natural choice for bilingual runners — are completely invisible in existing BPM tools.

**Solution:** A web app that IS the 160-170 BPM library. Browse by decade, language, genre. Every song has a verified BPM badge. Save favorites. Export to Spotify. Run with a BPM-synced display.

**Reference UI:** Modeled after spotify.com — dark theme, sidebar navigation, card-based browsing with album art. You already know how to use it.

**Hosting:** Vercel (free tier) — `cadence-crate.vercel.app`. No domain needed yet.

---

## Technical Architecture

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Frontend** | React 19 + Vite | Fast dev |
| **Styling** | Tailwind CSS 4 + framer-motion | Utility-first + smooth animations |
| **Framework** | Next.js (App Router) | SSR, API routes, Vercel-native |
| **Auth** | Supabase Auth (Google + Email) | Free 50K MAU |
| **Database** | Supabase PostgreSQL | Songs, favorites, user data |
| **BPM Source** | Spotify Web API (`audio-features`) | Primary — tempo field |
| **BPM Fallback** | Tunebat API | Cross-validation |
| **Audio Preview** | Spotify 30s `preview_url` + YouTube embed fallback | No copyright issues |
| **Hosting** | Vercel Hobby | Free, auto-deploy |
| **Cron (Song Collector)** | OpenClaw cron + Python script | Runs weekly to grow the library |

---

## Page Architecture

| Page | Route | Description |
|------|-------|-------------|
| **Browse** | `/` | Main library — browse by decade, language, genre |
| **Decade View** | `/decade/1990s` | All 160-170 BPM songs from a decade |
| **Genre View** | `/genre/mandopop` | All songs in a genre |
| **Song Detail** | `/song/:id` | Full song info, BPM, audio features, preview |
| **Favorites** | `/favorites` | User's saved songs (requires auth) |
| **About** | `/about` | Mission, journal, runner quotes |

### Navigation (Spotify-style)

```
┌──────────────────────────────────────────────────────┐
│  ┌──────────────┐  ┌───────────────────────────────┐ │
│  │  CADENCE      │  │                               │ │
│  │  CRATE        │  │                               │ │
│  │               │  │    Main Content Area          │ │
│  │  🏠 Browse    │  │    (song cards, grid)         │ │
│  │  🎵 By Decade │  │                               │ │
│  │    ├ 1980s    │  │                               │ │
│  │    ├ 1990s    │  │                               │ │
│  │    ├ 2000s    │  │                               │ │
│  │    ├ 2010s    │  │                               │ │
│  │    └ 2020s    │  │                               │ │
│  │  🎸 By Genre  │  │                               │ │
│  │    ├ Pop      │  │                               │ │
│  │    ├ Rock     │  │                               │ │
│  │    ├ Hip-Hop  │  │                               │ │
│  │    ├ Mandopop │  │                               │ │
│  │    └ Cantopop │  │                               │ │
│  │  🌐 Language  │  │                               │ │
│  │    ├ Chinese  │  │                               │ │
│  │    └ English  │  │                               │ │
│  │  ─────────── │  │                               │ │
│  │  ❤️ Favorites │  │                               │ │
│  │  ℹ️ About     │  │                               │ │
│  │               │  │                               │ │
│  │               │  │                               │ │
│  └──────────────┘  └───────────────────────────────┘ │
├──────────────────────────────────────────────────────┤
│  "The will to win means nothing without the will     │  ← Quote Corner
│   to prepare." — Juma Ikangaa, NYC Marathon winner   │
└──────────────────────────────────────────────────────┘
```

---

## Feature Set

### Core (P0)

| Feature | Description |
|---------|-------------|
| **Decade Browser** | Browse 160-170 BPM songs by decade: 80s, 90s, 00s, 10s, 20s |
| **Genre Browser** | Filter by: Pop, Rock, Hip-Hop, Electronic, Mandopop, Cantopop |
| **Language Filter** | Toggle: All / Chinese Only / English Only |
| **BPM Badge** | Every song card shows verified BPM value (e.g., `168 BPM`) |
| **Sort by BPM** | Sort ascending (160→170) or descending (170→160) |
| **Song Detail Page** | Album art, title, artist, year, BPM, energy, danceability, valence, preview player |
| **30s Preview** | Inline Spotify preview clip per song |
| **Favorites** | Click ❤️ to save. View all favorites on `/favorites` |
| **About Page** | Mission statement, running journals, articles, training tips |
| **Quote Corner** | Fixed bottom bar — rotates through famous runner quotes |
| **Spotify Export** | Export favorites as a Spotify playlist |

### Enhanced (P1)

| Feature | Description |
|---------|-------------|
| **Search** | Text search within the 160-170 BPM library (by title, artist) |
| **Running Mode** | Fullscreen BPM display with pulse animation — usable mid-run |
| **BPM Tap Tool** | Tap to manually detect BPM of any song |
| **Dark/Light Mode** | Default dark (Spotify vibe) |

### Future (P2)

| Feature | Description |
|---------|-------------|
| **AI DJ** | "Build me a 5K playlist from 90s Mandopop at 165 BPM" |
| **Community Favorites** | See what other runners are favoriting |
| **Weekly Challenge** | Curated list: "This week's 10 best 160-170 BPM songs" |

---

## 10-Phase Development Plan

### Phase 0 — Song Acquisition Pipeline (Week 0.5 — BEFORE CODING)

**Goal:** Build the backend engine that grows the library. Without this, the app has no songs.

| Task | Est. |
|------|------|
| Create Supabase project, set up `songs` table with all fields | 1h |
| Register Spotify Developer app, get client_id + client_secret | 30m |
| Build `scripts/cadence_collector.py` — Phase A: 80s Chinese Pop | 4h |
| Implement Spotify search + batch audio-features + 160-170 filter (Gate 1) | 2h |
| Implement Tunebat cross-reference fallback (Gate 3) | 2h |
| Implement dedup check + Supabase INSERT | 1h |
| Create `data/cadence_collector_state.json` phase tracker | 1h |
| Register cron job in OpenClaw: Sunday 2AM MYT, 900s timeout | 30m |
| **Deliverable:** Run once manually → 10+ validated 80s Chinese Pop songs in Supabase. |

---

### Phase 1 — Foundation & Scaffold (Week 1)

**Goal:** Next.js app deployed to Vercel. Supabase connected. Empty library visible.

| Task | Est. |
|------|------|
| `npx create-next-app` with TypeScript + Tailwind + App Router | 1h |
| Set up Supabase client (`@supabase/ssr`) | 1h |
| Build `songs` API route: `GET /api/songs?decade=1990s&lang=zh&sort=bpm_asc` | 3h |
| Deploy to Vercel (GitHub auto-deploy) | 30m |
| Build layout shell: sidebar + main content + quote corner | 4h |
| Build `SongCard` component (album art, title, artist, BPM badge) | 2h |
| Build decade/genre filter chips | 2h |
| **Deliverable:** `cadence-crate.vercel.app` shows real songs from Supabase, filterable by decade. |

---

### Phase 2 — Browsing Experience (Week 2)

**Goal:** Spotify-like browsing. Decade view, genre view, language toggle all working.

| Task | Est. |
|------|------|
| Build `/decade/[decade]` page with song grid | 3h |
| Build `/genre/[genre]` page | 2h |
| Language filter: `/api/songs?lang=zh` and toggle UI | 2h |
| Sort controls: BPM ascending/descending dropdown | 2h |
| Pagination / "Load More" button (50 per page) | 2h |
| Responsive: 1-col mobile, 2-col tablet, 3-col desktop grid | 2h |
| Loading skeletons for song cards | 1h |
| **Deliverable:** Browse all decades, genres, languages. Sort by BPM. Responsive. |

---

### Phase 3 — Song Detail & Preview (Week 3)

**Goal:** Click a song → full detail page with audio preview.

| Task | Est. |
|------|------|
| Build `/song/[id]` dynamic route | 2h |
| Song detail layout: large album art, metadata, audio features visualization | 3h |
| Integrate Spotify 30s `preview_url` audio player | 2h |
| YouTube embed fallback (when `preview_url` is null) | 2h |
| Audio features display: energy bar, danceability bar, valence bar | 2h |
| "Back to browse" breadcrumb | 30m |
| **Deliverable:** Full song detail page. Click play → hear 30s preview. |

---

### Phase 4 — Favorites System (Week 4)

**Goal:** Users can save songs to favorites. No auth yet.

| Task | Est. |
|------|------|
| Database: `favorites` table (supabase_id, song_id, added_at) | 1h |
| ❤️ button on SongCard + SongDetail | 2h |
| API: `POST /api/favorites`, `DELETE /api/favorites`, `GET /api/favorites` | 2h |
| Build `/favorites` page — grid of saved songs | 2h |
| localStorage fallback for unauthenticated users | 2h |
| Sort favorites by BPM, date added, artist | 1h |
| **Deliverable:** Click ❤️ on any song → appears in favorites. Persistent. |

---

### Phase 5 — Authentication (Week 5)

**Goal:** Users sign up. Favorites tied to accounts. Guest mode works without login.

| Task | Est. |
|------|------|
| Set up Supabase Auth (Google OAuth + Email) | 2h |
| Build `AuthModal` component (login/signup) | 3h |
| Auth-protected API routes | 1h |
| Migrate localStorage favorites → Supabase on first login | 2h |
| User menu dropdown (avatar, name, logout) | 1h |
| "Sign in to save favorites" prompt for guests | 1h |
| **Deliverable:** Sign up, log in, favorites tied to account, guest mode works. |

---

### Phase 6 — About Page & Quote Corner (Week 6)

**Goal:** The heart of the brand. Runner motivation hub.

| Task | Est. |
|------|------|
| Write About page content (see Section 9) | 3h |
| Build About page layout: mission, how it works, science of cadence | 3h |
| Build Articles/Journal section (static content) | 2h |
| Build `RunnerQuote` component — randomly selects from quotes pool | 1h |
| Create `data/quotes.json` with 50+ runner quotes | 2h |
| Position Quote Corner as fixed bottom bar on all pages | 1h |
| Quote rotation: changes every 30s or on page navigation | 1h |
| **Deliverable:** Rich About page + rotating quotes on every page. |

---

### Phase 7 — Running Mode (Week 7)

**Goal:** Web-based running display. Fullscreen, big BPM, pulse animation.

| Task | Est. |
|------|------|
| Build `/run` page — fullscreen dark mode | 2h |
| Giant BPM display (120px font, tabular numbers) | 2h |
| BPM-synced pulse ring animation (framer-motion) | 3h |
| Now-playing: song title + artist | 1h |
| Big touch-friendly play/pause/skip controls | 2h |
| Media Session API (lock screen controls on mobile) | 1h |
| Wake Lock API (keep screen on) | 1h |
| **Deliverable:** Open `/run` on phone → giant pulsing BPM display during run. |

---

### Phase 8 — Advanced Filters & Search (Week 8)

**Goal:** Power-user features for finding the perfect running song.

| Task | Est. |
|------|------|
| Text search: `GET /api/songs?q=jay+chou` | 2h |
| Combined filters: decade + genre + language + energy range | 3h |
| Search bar in header with autocomplete | 2h |
| "No results" state with suggestions | 1h |
| Share song link (copy URL) | 1h |
| **Deliverable:** Full search + filter combo. Find any song in 2 clicks. |

---

### Phase 9 — Spotify Export & Polish (Week 9)

**Goal:** Users can export favorites to their Spotify account.

| Task | Est. |
|------|------|
| Spotify OAuth flow: `playlist-modify-public` scope | 2h |
| "Export to Spotify" button on Favorites page | 1h |
| Create Spotify playlist, add tracks in order | 3h |
| Success toast with link to open in Spotify | 1h |
| Performance optimization (Lighthouse 90+) | 3h |
| SEO: meta tags, OG images, sitemap.xml | 2h |
| **Deliverable:** One-click export favorites → Spotify playlist. |


### Phase 10 — Launch (Week 10)

**Goal:** Production ready. Share it.

| Task | Est. |
|------|------|
| Error monitoring (Sentry free tier) | 1h |
| Analytics (Plausible or Vercel Analytics) | 1h |
| Final QA: test all filters, sort orders, auth flows | 2h |
| Mobile responsive polish (test on real phone) | 2h |
| Share on running forums: Reddit r/running, r/c25k, r/spotify | 1h |
| Share on Chinese running communities (WeChat, Xiaohongshu) | 1h |
| **Deliverable:** Live at `cadence-crate.vercel.app`. Running community knows about it. |

---

## About Page Content

```
┌─────────────────────────────────────────────────────────┐
│  ABOUT CADENCE CRATE                                     │
│                                                          │
│  🏃 Our Mission                                          │
│  ─────────────────────────────────────────────────────── │
│  Cadence running — matching your foot strikes to music   │
│  beats at 160-170 steps per minute — is scientifically   │
│  proven to improve running economy, reduce injury risk,  │
│  and make running feel effortless.                        │
│                                                          │
│  But finding songs at exactly 160-170 BPM? Especially     │
│  Chinese songs? Nearly impossible. Until now.             │
│                                                          │
│  We built Cadence Crate because every runner deserves     │
│  a playlist that matches their stride — in whatever       │
│  language moves them.                                     │
│                                                          │
│  📚 The Science of Cadence                                │
│  ─────────────────────────────────────────────────────── │
│  • Elite runners average 180 steps/minute                 │
│  • Recreational runners benefit most at 160-170           │
│  • Studies show music-synced running reduces perceived    │
│    exertion by up to 10%                                  │
│  • The right BPM can improve running economy by 5-7%      │
│                                                          │
│  📝 Runner's Journal                                       │
│  ─────────────────────────────────────────────────────── │
│  Weekly articles on cadence training, playlist building,  │
│  running form, and music psychology for runners.           │
│                                                          │
│  🎯 How to Use Cadence Crate                               │
│  ─────────────────────────────────────────────────────── │
│  1. Browse by your favorite decade or genre               │
│  2. Check the BPM badge on each song                      │
│  3. Preview songs that match your stride                  │
│  4. Save favorites to build your perfect running mix      │
│  5. Export to Spotify and hit the road                    │
│                                                          │
│  📬 We're building the library week by week,              │
│  decade by decade. Check back every Sunday for new songs. │
└─────────────────────────────────────────────────────────┘
```

---

## Quote Corner

### Design (static bottom bar, always visible)

A thin bar at the bottom of every page:

```
┌──────────────────────────────────────────────────────────┐
│  💬 "The will to win means nothing without the will       │
│      to prepare." — Juma Ikangaa (NYC Marathon Winner)   │
└──────────────────────────────────────────────────────────┘
```

- Changes every 30 seconds (or on page navigation)
- 50+ quotes sourced from Olympic champions, marathon world record holders, running philosophers
- Includes Chinese runners: 刘翔 (Liu Xiang), 孙英杰 (Sun Yingjie), etc.
- `data/quotes.json` format:

```json
[
  {
    "text": "The will to win means nothing without the will to prepare.",
    "author": "Juma Ikangaa",
    "title": "NYC Marathon Winner",
    "nationality": "Tanzania"
  },
  {
    "text": "Pain is temporary. Quitting lasts forever.",
    "author": "Lance Armstrong",
    "title": "Tour de France Champion",
    "nationality": "USA"
  },
  {
    "text": "我没有想太多，只是专注每一步。",
    "author": "刘翔",
    "title": "Olympic Gold Medalist, 110m Hurdles",
    "nationality": "China",
    "lang": "zh"
  }
]
```

### Quote Sources (to curate)

| Runner | Achievement | Vibe |
|--------|------------|------|
| Eliud Kipchoge | Marathon WR 2:01:39 | Discipline, consistency |
| Kelvin Kiptum | Marathon WR 2:00:35 (unofficial) | Pushing limits |
| Paula Radcliffe | Women's Marathon WR | Grit |
| 刘翔 (Liu Xiang) | 110m Hurdles Olympic Gold | Chinese pride, perseverance |
| Kathrine Switzer | First woman to run Boston Marathon | Courage, breaking barriers |
| Steve Prefontaine | Legendary distance runner | Heart, guts |
| Haile Gebrselassie | 2× Olympic 10K Gold | Joy of running |
| Joan Benoit Samuelson | First Women's Olympic Marathon Gold | Trailblazer |
| Emil Zátopek | 3× Olympic Gold (1952) | Unconventional training |
| Shalane Flanagan | NYC Marathon Winner | American distance |

---

## Database Schema

```sql
-- Songs table (all 160-170 BPM verified)
CREATE TABLE songs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  spotify_id TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  album TEXT,
  album_art_url TEXT,
  bpm DECIMAL(5,1) NOT NULL,           -- e.g., 168.3
  bpm_confidence TEXT DEFAULT 'medium', -- 'high' | 'medium' | 'low'
  duration_ms INTEGER,
  release_year INTEGER,
  decade TEXT,                           -- '1980s', '1990s', etc.
  language TEXT,                         -- 'zh', 'en'
  genres TEXT[],                        -- ['pop', 'mandopop']
  energy DECIMAL(3,2),                  -- Spotify: 0.00-1.00
  danceability DECIMAL(3,2),
  valence DECIMAL(3,2),
  preview_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  validated_at TIMESTAMPTZ,
  validation_method TEXT                -- 'spotify_2x+tunebat' | 'spotify_2x' | 'spotify_1x'
);

-- User favorites
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  song_id UUID REFERENCES songs(id) ON DELETE CASCADE,
  added_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, song_id)
);

-- Runner quotes
CREATE TABLE quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text TEXT NOT NULL,
  author TEXT NOT NULL,
  title TEXT,
  nationality TEXT,
  lang TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/songs` | List songs (decade, genre, lang, sort, page) | No |
| GET | `/api/songs/:id` | Single song detail | No |
| GET | `/api/songs/search?q=...` | Text search within library | No |
| GET | `/api/decades` | List available decades with song counts | No |
| GET | `/api/genres` | List available genres with song counts | No |
| GET | `/api/favorites` | User's favorites | Yes |
| POST | `/api/favorites` | Add song to favorites | Yes |
| DELETE | `/api/favorites/:songId` | Remove from favorites | Yes |
| GET | `/api/quotes/random` | Random runner quote | No |
| GET | `/api/stats` | Library stats (total songs, by decade, by genre) | No |

---

## Cost Estimates (Monthly)

| Service | Free Tier | Our Usage | Cost |
|---------|-----------|-----------|------|
| **Vercel** | 100 GB bandwidth, 1000 serverless hrs | Well within | $0 |
| **Supabase** | 500 MB DB, 50K MAU | Well within | $0 |
| **Spotify API** | Free (rate limited, 180 req/min) | ~600 req/week (collector) | $0 |
| **Domain** | N/A | `cadence-crate.vercel.app` (Vercel subdomain) | $0 |
| **Total** | | | **$0/mo** |

---

## Competitor Landscape

| Tool | BPM Filter | Chinese Songs | Browse by Decade | Free |
|------|-----------|---------------|------------------|------|
| **Spotify** | ❌ No BPM filter | ✅ | ✅ | ❌ Premium |
| **SongBPM.com** | ✅ | ⚠️ Limited | ❌ | ✅ |
| **Tunebat** | ✅ | ⚠️ | ❌ | ✅ (50/day) |
| **RunTempo** | ✅ | ❌ | ❌ | ❌ $3.99 |
| **PaceDJ** | ✅ | ❌ | ❌ | ❌ $4.99 |
| **Cadence Crate** | ✅ (verified) | ✅ | ✅ (80s–2020s) | ✅ Free |

> **Key differentiator:** Only tool that combines verified 160-170 BPM data, Chinese + English songs, decade browsing, and free access.

---

**Version:** 2.0 | **Date:** 2026-07-29 | **Status:** Proposal (No Execution)
