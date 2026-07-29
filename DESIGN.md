# Cadence Crate — Design System v2.1

> **Direction:** Futuristic Runner — Dark space aesthetic fused with neon performance metrics. Glassmorphism meets cyberpunk. Every visual element serves the runner's mindset: precision, rhythm, momentum.

---

## 1. Vibe Compass

### Core Identity
```
┌────────────────────────────────────────────────────────┐
│                                                        │
│   NOT: Spotify clone (music-first browsing)            │
│   NOT: Nike Run Club (motivational orange)             │
│   NOT: Strava dashboard (data-heavy)                   │
│                                                        │
│   IS: A runner's cockpit for rhythm discovery          │
│   — Dark, focused, electric.                          │
│   — BPM is the hero. Music serves the stride.          │
│   — Feels like strapping into something powerful.      │
│                                                        │
└────────────────────────────────────────────────────────┘
```

### Mood Board Keywords
`dark-space` `neon-metrics` `glassmorphism` `pulse-rhythm` `precision` `momentum` `electric-calm` `HUD-lite`

### Reference Blend
- **60% Spotify** — sidebar layout, card grid, dark base (proven music browsing UX)
- **25% Cyberpunk HUD** — neon accents, subtle grid lines, pulse rings, metric-forward
- **15% Apple Fitness** — clean glass cards, rounded geometry, smooth motion

---

## 2. Color System

### Palette: **Deep Space + Electric Performance**

```
┌─────────────────────────────────────────────────────────┐
│  BACKGROUND                                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐  │
│  │  Void    │  │  Surface │  │  Elevated            │  │
│  │ #050510 │  │ #0D0D1A  │  │ #151528              │  │
│  │ (Deep    │  │ (Card bg)│  │ (Hover, modals,      │  │
│  │  space)  │  │          │  │  glass panels)       │  │
│  └──────────┘  └──────────┘  └──────────────────────┘  │
├─────────────────────────────────────────────────────────┤
│  ACCENT (Neon Performance)                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐  │
│  │  Pulse   │  │  Surge   │  │  Alert               │  │
│  │ #A3FF12 │  │ #00D4FF  │  │ #FF3366               │  │
│  │ Electric │  │ Electric │  │  Racing Red           │  │
│  │  Lime    │  │  Blue    │  │  (160-163 badge)      │  │
│  └──────────┘  └──────────┘  └──────────────────────┘  │
│                                                         │
│  ┌──────────┐  ┌──────────┐                            │
│  │  Warm    │  │  Hot     │                            │
│  │ #FF8C42 │  │ #FF3366  │                            │
│  │ 164-167  │  │ 168-170  │  ← BPM heat scale          │
│  │  badge   │  │  badge   │                            │
│  └──────────┘  └──────────┘                            │
├─────────────────────────────────────────────────────────┤
│  TEXT                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐  │
│  │  Primary │  │ Secondary│  │  Muted               │  │
│  │ #F0F0FF │  │ #8888AA  │  │ #4A4A6A               │  │
│  │          │  │          │  │                       │  │
│  └──────────┘  └──────────┘  └──────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  GRADIENT (Hero / Brand)                         │  │
│  │  bg-gradient-to-r from-[#A3FF12] via-[#00D4FF]   │  │
│  │  to-[#A3FF12]                                    │  │
│  │                                                  │  │
│  │  Used for: Logo, page titles, BPM highlights,    │  │
│  │  active states, pulse rings                      │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Color Role Map

| Token | Hex | Usage |
|-------|-----|-------|
| `--void` | #050510 | Page background |
| `--surface` | #0D0D1A | Card backgrounds, sidebar |
| `--elevated` | #151528 | Hover states, dropdowns, glass panels |
| `--pulse` | #A3FF12 | Primary CTA, active nav, play button, BPM ring |
| `--surge` | #00D4FF | Links, secondary actions, language badges |
| `--bpm-easy` | #FF3366 | 160-163 BPM badge (race red = easiest pace paradox) |
| `--bpm-zone` | #FF8C42 | 164-167 BPM badge (sweet spot orange) |
| `--bpm-peak` | #A3FF12 | 168-170 BPM badge (peak performance lime) |
| `--text-primary` | #F0F0FF | Headings, song titles |
| `--text-secondary` | #8888AA | Artists, metadata, sidebar labels |
| `--text-muted` | #4A4A6A | Timestamps, empty states |
| `--border` | rgba(138, 138, 170, 0.1) | Glass card borders |
| `--border-hover` | rgba(0, 212, 255, 0.3) | Card hover borders |

---

## 3. Typography

### Space Grotesk + Inter

```
SPACE GROTESK — Futuristic. Sharp. Technical.
Used for: Headings, BPM display, nav labels, logo

Inter — Clean. Readable. Proven.
Used for: Body text, song titles, metadata, quote text
```

| Role | Font | Weight | Size | Letter Spacing |
|------|------|--------|------|----------------|
| **Logo** | Space Grotesk | 700 | 22px | -0.02em |
| **Page Title** | Space Grotesk | 700 | 32px | -0.01em |
| **BPM Display (Large)** | Space Grotesk | 700 | 48px | -0.02em |
| **Section Header** | Space Grotesk | 600 | 14px | +0.08em (uppercase) |
| **Nav Item** | Space Grotesk | 500 | 14px | 0 |
| **Song Title** | Inter | 600 | 15px | -0.01em |
| **Artist Name** | Inter | 400 | 13px | 0 |
| **BPM Badge** | Space Grotesk | 700 | 13px | 0 |
| **Filter Chip** | Inter | 500 | 13px | 0 |
| **Body Text** | Inter | 400 | 15px | 0 |
| **Quote Text** | Inter | 400 | 13px | 0 |
| **Quote Author** | Space Grotesk | 600 | 13px | 0 |

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');

--font-display: 'Space Grotesk', sans-serif;
--font-body: 'Inter', sans-serif;
```

---

## 4. Layout Architecture

```
┌──────────────────────────────────────────────────────────┐
│  ┌────────────┐  ┌─────────────────────────────────────┐ │
│  │            │  │  Header Bar (56px)                   │ │
│  │  SIDEBAR   │  │  ──────────────────────────────────  │ │
│  │  240px     │  │                                     │ │
│  │  fixed     │  │  Filter Chips (48px)                │ │
│  │            │  │  [All] [80s] [90s] [00s] [10s] [20s]│ │
│  │  Glass     │  │  [Pop] [Rock] [Mandopop] ...         │ │
│  │  panel     │  │                                     │ │
│  │            │  │  Song Grid                          │ │
│  │  ┌──────┐  │  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌─────┐│ │
│  │  │ LOGO │  │  │  │Album │ │Album │ │Album │ │Album││ │
│  │  └──────┘  │  │  │ Art  │ │ Art  │ │ Art  │ │ Art ││ │
│  │            │  │  │      │ │      │ │      │ │     ││ │
│  │  Browse    │  │  │Title │ │Title │ │Title │ │Title││ │
│  │  Decade ▸  │  │  │Artist│ │Artist│ │Artist│ │Artis││ │
│  │   1980s   │  │  │168BPM│ │165BPM│ │162BPM│ │169BP││ │
│  │   1990s   │  │  └──────┘ └──────┘ └──────┘ └─────┘│ │
│  │   2000s   │  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌─────┐│ │
│  │   2010s   │  │  │ ...  │ │ ...  │ │ ...  │ │ ... ││ │
│  │   2020s   │  │  └──────┘ └──────┘ └──────┘ └─────┘│ │
│  │  Genre  ▸ │  │                                     │ │
│  │  Language │  │                                     │ │
│  │  ──────── │  │                                     │ │
│  │  Favorites│  │                                     │ │
│  │  About    │  │                                     │ │
│  │            │  │                                     │ │
│  └────────────┘  └─────────────────────────────────────┘ │
├──────────────────────────────────────────────────────────┤
│  💬 QUOTE CORNER — "No human is limited." — Eliud        │
│     Kipchoge, Marathon World Record Holder                │
└──────────────────────────────────────────────────────────┘
```

### Breakpoints

| Breakpoint | Sidebar | Grid | Notes |
|-----------|---------|------|-------|
| **< 768px** | Hidden (bottom nav) | 2 cols | Mobile — simplified |
| **768-1023px** | 200px | 3 cols | Tablet |
| **≥ 1024px** | 240px | 4 cols | Desktop |
| **≥ 1440px** | 280px | 5 cols | Wide |

---

## 5. Component Design

### 5.1 Sidebar (Glass Panel)

```css
.sidebar {
  background: rgba(13, 13, 26, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-right: 1px solid rgba(138, 138, 170, 0.08);
  width: 240px;
  height: calc(100vh - 44px); /* subtract quote corner */
  position: fixed;
  left: 0;
  top: 0;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  z-index: 40;
}

.sidebar-logo {
  font-family: 'Space Grotesk';
  font-weight: 700;
  font-size: 22px;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #A3FF12, #00D4FF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 32px;
}

/* Nav section divider */
.sidebar-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.15), transparent);
  margin: 16px 0;
}

/* Nav item */
.sidebar-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  color: #8888AA;
  font-family: 'Space Grotesk';
  font-size: 14px;
  font-weight: 500;
  transition: all 200ms ease;
  position: relative;
}

.sidebar-item:hover {
  color: #F0F0FF;
  background: rgba(0, 212, 255, 0.06);
}

.sidebar-item.active {
  color: #A3FF12;
  background: rgba(163, 255, 18, 0.06);
  box-shadow: inset 2px 0 0 #A3FF12;
}

/* Decade sub-items */
.sidebar-sub {
  padding-left: 36px;
  font-size: 13px;
  color: #4A4A6A;
}

.sidebar-sub:hover {
  color: #8888AA;
}

.sidebar-sub.active {
  color: #00D4FF;
  box-shadow: none;
}
```

### 5.2 Song Card (Glassmorphism)

```
┌────────────────────────┐
│  ┌──────────────────┐  │
│  │                  │  │  ← Album Art (rounded 8px)
│  │   🎵             │  │     Gradient overlay at bottom
│  │   Album          │  │     Reveals BPM on hover
│  │   Art            │  │
│  │                  │  │
│  │   ┌───────────┐  │  │
│  │   │ 168 BPM ◉ │  │  │  ← BPM badge on hover (or always)
│  │   └───────────┘  │  │
│  └──────────────────┘  │
│                        │
│  Track Title           │  ← Inter 600, #F0F0FF
│  Artist Name           │  ← Inter 400, #8888AA
│                        │
│  🇨🇳 · 2005 · Pop      │  ← Inter 400, #4A4A6A, 12px
└────────────────────────┘
```

```css
.song-card {
  background: rgba(13, 13, 26, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(138, 138, 170, 0.08);
  border-radius: 12px;
  padding: 12px;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.song-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 12px;
  background: radial-gradient(
    600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(0, 212, 255, 0.06),
    transparent 40%
  );
  opacity: 0;
  transition: opacity 250ms ease;
}

.song-card:hover {
  border-color: rgba(0, 212, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4),
              0 0 0 1px rgba(0, 212, 255, 0.1);
}

.song-card:hover::before {
  opacity: 1;
}

/* Album Art Container */
.song-card-art {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 10px;
}

.song-card-art img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 300ms ease;
}

.song-card:hover .song-card-art img {
  transform: scale(1.05);
}

/* Gradient overlay on album art */
.song-card-art::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(to top, rgba(5, 5, 16, 0.8), transparent);
  opacity: 0;
  transition: opacity 250ms ease;
}

.song-card:hover .song-card-art::after {
  opacity: 1;
}

/* BPM Badge — visible on hover */
.bpm-badge {
  position: absolute;
  bottom: 8px;
  right: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  border-radius: 6px;
  font-family: 'Space Grotesk';
  font-weight: 700;
  font-size: 13px;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  opacity: 0;
  transform: translateY(4px);
  transition: all 250ms ease;
  z-index: 2;
}

.song-card:hover .bpm-badge {
  opacity: 1;
  transform: translateY(0);
}

/* BPM Heat Colors */
.bpm-160-163 {
  background: rgba(255, 51, 102, 0.2);
  color: #FF3366;
  border: 1px solid rgba(255, 51, 102, 0.3);
}

.bpm-164-167 {
  background: rgba(255, 140, 66, 0.2);
  color: #FF8C42;
  border: 1px solid rgba(255, 140, 66, 0.3);
}

.bpm-168-170 {
  background: rgba(163, 255, 18, 0.15);
  color: #A3FF12;
  border: 1px solid rgba(163, 255, 18, 0.3);
}

/* BPM Pulse Ring — on the bpm-168-170 badge */
.bpm-peak {
  animation: bpmPulse 2s ease-in-out infinite;
}

@keyframes bpmPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(163, 255, 18, 0.3); }
  50% { box-shadow: 0 0 12px 2px rgba(163, 255, 18, 0.15); }
}

.song-card-title {
  font-family: 'Inter';
  font-weight: 600;
  font-size: 15px;
  color: #F0F0FF;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song-card-artist {
  font-family: 'Inter';
  font-weight: 400;
  font-size: 13px;
  color: #8888AA;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song-card-meta {
  font-family: 'Inter';
  font-size: 12px;
  color: #4A4A6A;
  margin-top: 4px;
}
```

### 5.3 Filter Chips (Neon-rimmed)

```css
.filter-chips {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
  scrollbar-width: none;
}

.filter-chip {
  padding: 8px 18px;
  border-radius: 24px;
  font-family: 'Inter';
  font-size: 13px;
  font-weight: 500;
  background: rgba(13, 13, 26, 0.8);
  border: 1px solid rgba(138, 138, 170, 0.12);
  color: #8888AA;
  cursor: pointer;
  transition: all 200ms ease;
  white-space: nowrap;
  backdrop-filter: blur(8px);
}

.filter-chip:hover {
  border-color: rgba(0, 212, 255, 0.3);
  color: #F0F0FF;
}

.filter-chip.active {
  background: rgba(163, 255, 18, 0.08);
  border-color: rgba(163, 255, 18, 0.4);
  color: #A3FF12;
  box-shadow: 0 0 16px rgba(163, 255, 18, 0.08);
}

/* Language toggle */
.lang-toggle {
  display: flex;
  background: rgba(13, 13, 26, 0.8);
  border: 1px solid rgba(138, 138, 170, 0.12);
  border-radius: 24px;
  overflow: hidden;
}

.lang-toggle button {
  padding: 8px 16px;
  font-family: 'Space Grotesk';
  font-size: 13px;
  font-weight: 500;
  color: #4A4A6A;
  transition: all 200ms ease;
}

.lang-toggle button.active {
  background: rgba(0, 212, 255, 0.1);
  color: #00D4FF;
}
```

### 5.4 Header Bar

```css
.header-bar {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  border-bottom: 1px solid rgba(138, 138, 170, 0.06);
  background: rgba(5, 5, 16, 0.7);
  backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 30;
}

.page-title {
  font-family: 'Space Grotesk';
  font-weight: 700;
  font-size: 20px;
  background: linear-gradient(135deg, #A3FF12, #00D4FF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Library stats pill */
.stats-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 20px;
  background: rgba(163, 255, 18, 0.06);
  border: 1px solid rgba(163, 255, 18, 0.15);
  font-family: 'Space Grotesk';
  font-size: 13px;
  color: #A3FF12;
}
```

### 5.5 Sort Dropdown

```css
.sort-dropdown {
  padding: 8px 14px;
  border-radius: 8px;
  background: rgba(13, 13, 26, 0.8);
  border: 1px solid rgba(138, 138, 170, 0.12);
  font-family: 'Inter';
  font-size: 13px;
  color: #F0F0FF;
  cursor: pointer;
  backdrop-filter: blur(8px);
}
```

### 5.6 Quote Corner

```css
.quote-corner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 44px;
  background: rgba(8, 8, 20, 0.95);
  backdrop-filter: blur(16px);
  border-top: 1px solid rgba(0, 212, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  z-index: 50;
}

.quote-icon {
  color: #A3FF12;
  font-size: 14px;
  margin-right: 10px;
  flex-shrink: 0;
}

.quote-text {
  font-family: 'Inter';
  font-size: 13px;
  color: #8888AA;
  font-style: italic;
  text-align: center;
  max-width: 800px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.quote-author {
  font-family: 'Space Grotesk';
  font-weight: 600;
  color: #00D4FF;
  font-style: normal;
}
```

### 5.7 Running Mode BPM Ring (Phase 7 preview)

```
         ┌─────────────────────┐
         │                     │
         │    ◉  168  BPM      │  ← Pulsing ring at song BPM
         │                     │     Inner number: current BPM
         │   ▶ Now Playing     │
         │   Track Title       │
         │                     │
         └─────────────────────┘
```

### 5.8 Empty States

```
┌──────────────────────────────────────────┐
│                                          │
│              ◉                           │
│         (pulse ring icon)                │
│                                          │
│     No songs in this decade yet          │
│                                          │
│  We're building the library week by      │
│  week. The BPM Collector runs every      │
│  Sunday. Check back soon!                │
│                                          │
│       [Browse All Songs →]               │
│                                          │
└──────────────────────────────────────────┘
```

---

## 6. Page Layouts

### 6.1 Browse (Home)

```
┌────────────┬──────────────────────────────────────────────┐
│  CADENCE   │  ◉ Browse Library         87 songs · 5 decades│
│  CRATE     │  ─────────────────────────────────────────── │
│            │                                              │
│  ◉ Browse  │  [All] [1980s] [1990s] [2000s] [2010s] [2020s]│
│  ▸ Decade  │  [Pop] [Rock] [Hip-Hop] [Mandopop] [+4]      │
│    1980s   │  [🇨🇳 CN] [🇬🇧 EN] [🌐 All]     [BPM ▲] [▼]  │
│    1990s   │                                              │
│    2000s   │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐│
│    2010s   │  │ 夜曲   │ │ 晴天   │ │Blinding│ │Take On ││
│    2020s   │  │ Jay    │ │ Jay    │ │ Lights │ │   Me   ││
│  ▸ Genre   │  │ 168BPM │ │ 165BPM │ │ 171BPM │ │ 169BPM ││
│    Pop     │  └────────┘ └────────┘ └────────┘ └────────┘│
│    Rock    │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐│
│    Hip-Hop │  │ 稻香   │ │簡單愛  │ │Don't   │ │Running││
│    Mandopop│  │ Jay    │ │ Jay    │ │Stop... │ │Up That││
│    Cantopop│  │ 162BPM │ │ 169BPM │ │ 160BPM │ │ 165BPM ││
│  ▸ Language│  └────────┘ └────────┘ └────────┘ └────────┘│
│  ───────── │                                              │
│  ❤️ Favs   │  [Load More]    Showing 1-24 of 87 songs     │
│  ℹ️ About  │                                              │
│            │                                              │
├────────────┴──────────────────────────────────────────────┤
│  💬 "No human is limited." — Eliud Kipchoge, Marathon WR  │
└──────────────────────────────────────────────────────────┘
```

---

## 7. Motion Design (framer-motion)

### Principles
- **Rhythm-first:** Animations are quick and crisp — like a runner's foot strike.
- **Purposeful:** Every motion communicates data (BPM, selection, loading).
- **Performance:** 150-250ms transitions. No jank.

### Animation Catalog

```jsx
// Song Card — subtle lift on hover
<motion.div
  whileHover={{ y: -2 }}
  transition={{ duration: 0.2, ease: 'easeOut' }}
>

// Song Card — staggered grid entrance
<motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, delay: index * 0.05 }}
>

// Filter Chip — active state
<motion.button
  whileTap={{ scale: 0.96 }}
  animate={{
    borderColor: isActive ? 'rgba(163,255,18,0.4)' : 'rgba(138,138,170,0.12)',
  }}
>

// Favorite Heart — bouncy fill
<motion.button
  whileTap={{ scale: 1.2 }}
  transition={{ type: 'spring', stiffness: 400, damping: 12 }}
>

// Quote Corner — crossfade
<AnimatePresence mode="wait">
  <motion.div
    key={quote.id}
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -6 }}
    transition={{ duration: 0.3 }}
  />
</AnimatePresence>

// Running Mode — BPM pulse ring (Phase 7)
<motion.div
  animate={{
    scale: [1, 1.04, 1],
    borderColor: [
      'rgba(163,255,18,0.2)',
      'rgba(163,255,18,0.7)',
      'rgba(163,255,18,0.2)',
    ],
    boxShadow: [
      '0 0 0 0 rgba(163,255,18,0)',
      '0 0 20px 4px rgba(163,255,18,0.15)',
      '0 0 0 0 rgba(163,255,18,0)',
    ],
  }}
  transition={{
    duration: 60 / bpm,
    repeat: Infinity,
    ease: 'easeInOut',
  }}
/>

// Page transition
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.15 }}
/>
```

### Background Atmosphere

```css
/* Subtle dot grid — gives the "space/HUD" feel */
.bg-grid {
  background-image: radial-gradient(
    rgba(138, 138, 170, 0.06) 1px,
    transparent 1px
  );
  background-size: 32px 32px;
}

/* Ambient gradient orbs */
.bg-orb {
  position: fixed;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.04;
  pointer-events: none;
}

.bg-orb-1 {
  width: 600px;
  height: 600px;
  background: #A3FF12;
  top: -200px;
  right: -100px;
}

.bg-orb-2 {
  width: 500px;
  height: 500px;
  background: #00D4FF;
  bottom: -150px;
  left: -100px;
}
```

---

## 8. Icon System

**Library:** `lucide-react`

| Icon | Usage |
|------|-------|
| `Zap` | Logo / Brand |
| `Disc3` | Browse library |
| `Calendar` | Decade filter |
| `Guitar` | Genre filter |
| `Globe` | Language toggle |
| `Heart` | Favorite |
| `Info` | About |
| `ArrowUpDown` | Sort |
| `Search` | Search |
| `Play` / `Pause` | Preview player |
| `ExternalLink` | Spotify link |
| `Quote` | Quote corner |
| `Activity` | BPM indicator |
| `Gauge` | Energy meter |
| `Timer` | Duration |

---

## 9. Accessibility

| Requirement | Implementation |
|-------------|---------------|
| **Contrast** | #F0F0FF on #050510 = 18.2:1 ✅ |
| **Keyboard** | Full tab flow through sidebar → filters → grid |
| **Screen reader** | `aria-label="Track Title by Artist, 168 beats per minute"` |
| **Focus ring** | `focus-visible:ring-2 focus-visible:ring-[#A3FF12] focus-visible:ring-offset-2` |
| **Reduced motion** | `prefers-reduced-motion` kills all framer-motion |
| **Touch targets** | Min 44×44px for all interactive elements |

---

## 10. Technology Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js 15 (App Router) | SSR, API routes, Vercel-native |
| Styling | Tailwind CSS 4 | Custom theme via CSS variables |
| Animation | framer-motion | Declarative spring physics |
| Icons | lucide-react | Light, tree-shakeable |
| Fonts | Space Grotesk + Inter | Google Fonts |
| Backend | Supabase (PostgreSQL) | Auth, realtime, free tier |
| Hosting | Vercel | Free Hobby plan |
| Domain | `cadence-crate.vercel.app` | Vercel subdomain |

---

**Version:** 2.1 — Futuristic Runner | **Date:** 2026-07-29 | **Status:** Phase 1 Execution
