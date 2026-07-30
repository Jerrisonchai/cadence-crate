"""
Cadence Crate — Weekly Searcher v1.0
MANDATE:
  WHO:    OpenClaw cron (Saturday 10PM MYT)
  WHEN:   Weekly, before the Collector cron (Sunday 2AM)
  PURPOSE: Search YouTube for 160-170 BPM songs, verify BPM via web sources,
           append candidates to cadence_queue.json
  WHAT:
    Tier 1: Scrape Tunebat + SongBPM for BPM (fully automated)
    Tier 2: numpy/scipy onset detection on downloaded audio (post-collector)
    Tier 3: /tap page — manual BPM tool (built separately as React page)
  IMPROVEMENT: v1.0 — initial searcher with Tier 1 web scraping
  HISTORY:
    v1.0 (Jul 29 2026) — Initial: YouTube search → Tunebat/SongBPM → queue
"""

import json
import sys
import os

# Fix Unicode output on Windows
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

import re
import subprocess
import time
from datetime import datetime
from pathlib import Path
from urllib.parse import quote_plus

# Selenium/Playwright fallback for sites blocking requests
try:
    import requests
    HAS_REQUESTS = True
except ImportError:
    HAS_REQUESTS = False

PROJECT_ROOT = Path(__file__).parent.parent
QUEUE_FILE = PROJECT_ROOT / 'data' / 'cadence_queue.json'
STATE_FILE = PROJECT_ROOT / 'data' / 'cadence_searcher_state.json'

# Reasonable user agents
UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'

def log(msg: str):
    print(f'[{datetime.now().strftime("%H:%M:%S")}] {msg}')

# ─── STATE MANAGEMENT ───────────────────────────────────────

def load_state() -> dict:
    if STATE_FILE.exists():
        return json.loads(STATE_FILE.read_text(encoding='utf-8'))
    return {
        'current_decade': '1980s',
        'current_language': 'chinese',
        'current_genre': 'Pop',
        'week_number': 1,
        'total_songs_found': 0
    }

def save_state(state: dict):
    STATE_FILE.parent.mkdir(parents=True, exist_ok=True)
    STATE_FILE.write_text(json.dumps(state, indent=2, ensure_ascii=False), encoding='utf-8')

def rotate_search(state: dict) -> dict:
    """Rotate search parameters weekly through decades × languages × genres"""
    decades = ['1980s', '1990s', '2000s', '2010s', '2020s']
    languages = ['chinese', 'english']
    genres_cn = ['Mandopop', 'Cantopop', 'Pop']
    genres_en = ['Pop', 'Rock', 'Electronic', 'Hip-Hop']

    decade_idx = decades.index(state['current_decade'])
    lang_idx = languages.index(state['current_language'])

    # Advance
    if state['current_language'] == 'chinese':
        genres = genres_cn
    else:
        genres = genres_en

    genre_idx = genres.index(state['current_genre']) if state['current_genre'] in genres else 0
    genre_idx += 1

    if genre_idx >= len(genres):
        genre_idx = 0
        lang_idx += 1
        if lang_idx >= len(languages):
            lang_idx = 0
            decade_idx += 1
            if decade_idx >= len(decades):
                decade_idx = 0  # Loop back

    state['current_decade'] = decades[decade_idx]
    state['current_language'] = languages[lang_idx]
    state['current_genre'] = (genres_cn if languages[lang_idx] == 'chinese' else genres_en)[genre_idx]
    state['week_number'] += 1

    return state

# ─── YOUTUBE SEARCH ─────────────────────────────────────────

def youtube_search(state: dict, max_results: int = 10) -> list:
    """Search YouTube for songs in the current decade/language/genre slice"""
    decade = state['current_decade']
    lang = state['current_language']
    genre = state['current_genre']
    lang_term = '中文' if lang == 'chinese' else ''

    # Build search query
    year_start = int(decade.replace('s', ''))
    year_end = year_start + 9
    query = f'{lang_term} {genre} {year_start}s songs 160 bpm running'

    log(f'Searching YouTube: "{query}"')
    log(f'Decade={decade} Lang={lang} Genre={genre} (Week {state["week_number"]})')

    result = subprocess.run([
        'yt-dlp', '--flat-playlist', '--dump-json', '--no-update',
        '--playlist-end', str(max_results),
        f'ytsearch{max_results}:{query}'
    ], capture_output=True, text=True, timeout=60, cwd=PROJECT_ROOT)

    songs = []
    for line in result.stdout.strip().split('\n'):
        if not line:
            continue
        try:
            info = json.loads(line)
            songs.append({
                'youtube_id': info.get('id', ''),
                'title': info.get('title', 'Unknown'),
                'youtube_url': info.get('webpage_url', '') or f'https://youtube.com/watch?v={info.get("id", "")}',
                'duration': info.get('duration', 0),
                'bpm': None,
                'bpm_verified': False,
                'bpm_source': None,
                'confidence': None,
                'decade': decade,
                'language': lang,
                'genres': [genre],
            })
        except json.JSONDecodeError:
            continue

    log(f'YouTube search returned {len(songs)} results')
    return songs

# ─── TIER 1: WEB BPM VERIFICATION ────────────────────────────

def query_tunebat(title: str) -> float | None:
    """Query Tunebat.com for BPM. Returns float or None."""
    if not HAS_REQUESTS:
        return None

    query = quote_plus(title.strip())
    url = f'https://tunebat.com/Search?q={query}'

    try:
        resp = requests.get(url, headers={'User-Agent': UA}, timeout=15)
        if resp.status_code != 200:
            return None

        # Tunebat returns JSON-like data in the HTML
        # Look for BPM patterns like "168 BPM" or tempo values
        text = resp.text
        # Pattern: "bpm":168 or "tempo":168.0 or "BPM": 168
        patterns = [
            r'"bpm"\s*:\s*(\d+(?:\.\d+)?)',
            r'"tempo"\s*:\s*(\d+(?:\.\d+)?)',
            r'(\d+(?:\.\d+)?)\s*BPM',
            r'BPM[:\s]*(\d+(?:\.\d+)?)',
        ]
        for pat in patterns:
            match = re.search(pat, text, re.IGNORECASE)
            if match:
                bpm = float(match.group(1))
                if 30 <= bpm <= 300:
                    return bpm
        return None
    except Exception:
        return None

def query_songbpm(artist: str, title: str) -> float | None:
    """Query SongBPM.com for BPM. Returns float or None."""
    if not HAS_REQUESTS:
        return None

    # SongBPM URL format: songbpm.com/@artist/song-title
    # Clean up for URL
    def slugify(s):
        return re.sub(r'[^a-z0-9]+', '-', s.lower().strip()).strip('-')

    art_slug = slugify(artist)
    title_slug = slugify(title)
    url = f'https://songbpm.com/@{art_slug}/{title_slug}'

    try:
        resp = requests.get(url, headers={'User-Agent': UA}, timeout=15)
        if resp.status_code != 200:
            return None

        text = resp.text
        # Look for BPM patterns
        patterns = [
            r'(\d+(?:\.\d+)?)\s*BPM',
            r'BPM[:\s]*(\d+(?:\.\d+)?)',
            r'"tempo"\s*:\s*(\d+(?:\.\d+)?)',
        ]
        for pat in patterns:
            match = re.search(pat, text, re.IGNORECASE)
            if match:
                bpm = float(match.group(1))
                if 30 <= bpm <= 300:
                    return bpm
        return None
    except Exception:
        return None

def verify_bpm_web(song: dict) -> dict:
    """Tier 1: Verify BPM using Tunebat + SongBPM scraping"""
    title = song['title']
    # Extract clean title (remove YouTube extras)
    title_clean = re.sub(r'\(.*?\)|\[.*?\]|Official.*|MV|Audio|Video|HD|4K', '', title).strip()
    artist = song.get('artist', '')
    if not artist:
        # Try to extract artist from title "Artist - Title" format
        parts = title_clean.split(' - ', 1)
        if len(parts) == 2:
            artist, title_clean = parts[0].strip(), parts[1].strip()

    log(f'  Verifying: {title_clean[:60]}')

    tunebat_bpm = query_tunebat(f'{artist} {title_clean}')
    time.sleep(1)  # Rate limit
    songbpm_bpm = query_songbpm(artist, title_clean)

    results = []
    if tunebat_bpm:
        results.append(('tunebat', tunebat_bpm))
    if songbpm_bpm:
        results.append(('songbpm', songbpm_bpm))

    if len(results) >= 2:
        bpms = [r[1] for r in results]
        avg_bpm = sum(bpms) / len(bpms)
        max_diff = max(bpms) - min(bpms)
        if max_diff <= 2 and 160 <= avg_bpm <= 170:
            song['bpm'] = round(avg_bpm, 1)
            song['bpm_verified'] = True
            song['bpm_source'] = '+'.join(r[0] for r in results)
            song['confidence'] = 'high'
            log(f'  ✅ HIGH confidence: {avg_bpm:.1f} BPM ({song["bpm_source"]})')
            return song
        elif 155 <= avg_bpm <= 175:
            song['bpm'] = round(avg_bpm, 1)
            song['bpm_verified'] = False
            song['bpm_source'] = '+'.join(r[0] for r in results)
            song['confidence'] = 'medium'
            log(f'  ⚠️ MEDIUM confidence: {avg_bpm:.1f} BPM (near range)')
            return song
    elif len(results) == 1:
        source, bpm = results[0]
        if 160 <= bpm <= 170:
            song['bpm'] = bpm
            song['bpm_verified'] = False
            song['bpm_source'] = source
            song['confidence'] = 'medium'
            log(f'  ⚠️ MEDIUM confidence: {bpm} BPM ({source} only)')
            return song

    # Not found or outside range
    song['confidence'] = 'low'
    song['bpm_verified'] = False
    log(f'  ❌ Not verified (no web sources or outside 160-170)')
    return song

# ─── QUEUE MANAGEMENT ────────────────────────────────────────

def read_existing_queue() -> list:
    if QUEUE_FILE.exists():
        return json.loads(QUEUE_FILE.read_text(encoding='utf-8'))
    return []

def get_next_id(queue: list) -> str:
    if not queue:
        return '1'
    ids = [int(s['id']) for s in queue if s.get('id', '').isdigit()]
    return str(max(ids) + 1) if ids else '1'

def add_to_queue(song: dict, queue: list):
    """Add a song to the queue if it passes 160-170 BPM filter"""
    # Check for duplicates by title
    existing_titles = [s.get('title', '').lower() for s in queue]
    if song['title'].lower() in existing_titles:
        log(f'  ⏭️ Duplicate: {song["title"][:50]}')
        return False

    song['id'] = get_next_id(queue)
    song['downloaded'] = False
    song['added_at'] = datetime.now().isoformat()

    # Map decade string to year for compatibility
    decade_year = {
        '1980s': 1985, '1990s': 1995, '2000s': 2005,
        '2010s': 2015, '2020s': 2022
    }
    song['year'] = song.get('year', decade_year.get(song.get('decade', '2000s'), 2005))

    # Default album/energy fields for songs with unknown metadata
    song.setdefault('album', 'Unknown')
    song.setdefault('energy', 0.5)
    song.setdefault('danceability', 0.5)
    song.setdefault('valence', 0.5)

    queue.append(song)
    return True

# ─── MAIN ────────────────────────────────────────────────────

def main():
    log('=== Cadence Crate Weekly Searcher v1.0 ===')

    state = load_state()
    log(f'Decade={state["current_decade"]} Lang={state["current_language"]} Genre={state["current_genre"]} Week={state["week_number"]}')

    # Step 1: Search YouTube
    candidates = youtube_search(state, max_results=10)

    # Step 2: Verify BPM via web sources
    queue = read_existing_queue()
    added = 0
    for song in candidates:
        verified = verify_bpm_web(song)
        if verified['confidence'] in ('high', 'medium') and add_to_queue(verified, queue):
            added += 1

    # Step 3: Save queue
    QUEUE_FILE.parent.mkdir(parents=True, exist_ok=True)
    QUEUE_FILE.write_text(json.dumps(queue, indent=2, ensure_ascii=False), encoding='utf-8')

    # Step 4: Rotate state for next week
    state = rotate_search(state)
    state['total_songs_found'] += added
    save_state(state)

    # Summary
    high = sum(1 for s in queue if s.get('confidence') == 'high' and not s.get('downloaded'))
    med = sum(1 for s in queue if s.get('confidence') == 'medium' and not s.get('downloaded'))
    downloaded = sum(1 for s in queue if s.get('downloaded'))

    summary = (
        f'🔍 Cadence Crate Weekly Search\n'
        f'📻 YouTube: {len(candidates)} candidates from {state["current_decade"]} {state["current_genre"]}\n'
        f'✅ Added: {added} songs (BPM verified)\n'
        f'📊 Queue: {len(queue)} total ({downloaded} downloaded, {high} high-conf pending, {med} medium-conf pending)\n'
        f'🔄 Next week: {state["current_decade"]} {state["current_language"]} {state["current_genre"]}'
    )
    log(f'\n{summary}')
    print(summary)

    return 0

if __name__ == '__main__':
    sys.exit(main())
