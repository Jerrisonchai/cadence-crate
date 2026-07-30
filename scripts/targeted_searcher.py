"""
Targeted Song Searcher — cadence-crate
Queries Tunebat/SongBPM for curated candidate songs at 160-170 BPM,
verifies BPM, searches YouTube for verified matches, adds to queue.
"""
import json, os, re, subprocess, sys, time
from datetime import datetime
from pathlib import Path

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

import requests

PROJECT_ROOT = Path(__file__).parent.parent
QUEUE_FILE = PROJECT_ROOT / 'data' / 'cadence_queue.json'
UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'

def log(msg): print(f'[{datetime.now().strftime("%H:%M:%S")}] {msg}')

# Curated candidates — songs likely to be 160-170 BPM
CANDIDATES = [
    # Chinese — Jay Chou fast tracks
    {'artist': '周杰伦', 'title': '双截棍', 'lang': 'zh', 'decade': '2000s', 'genre': 'Mandopop'},
    {'artist': '周杰伦', 'title': '霍元甲', 'lang': 'zh', 'decade': '2000s', 'genre': 'Mandopop'},
    {'artist': '周杰伦', 'title': '本草纲目', 'lang': 'zh', 'decade': '2000s', 'genre': 'Mandopop'},
    {'artist': '周杰伦', 'title': '龙拳', 'lang': 'zh', 'decade': '2000s', 'genre': 'Mandopop'},
    {'artist': '周杰伦', 'title': '乱舞春秋', 'lang': 'zh', 'decade': '2000s', 'genre': 'Mandopop'},
    {'artist': '周杰伦', 'title': '半兽人', 'lang': 'zh', 'decade': '2000s', 'genre': 'Mandopop'},

    # Chinese — other artists
    {'artist': '林俊杰', 'title': '不潮不用花钱', 'lang': 'zh', 'decade': '2000s', 'genre': 'Mandopop'},
    {'artist': '五月天', 'title': '伤心的人别听慢歌', 'lang': 'zh', 'decade': '2010s', 'genre': 'Mandopop'},
    {'artist': '五月天', 'title': '派对动物', 'lang': 'zh', 'decade': '2010s', 'genre': 'Mandopop'},
    {'artist': '蔡依林', 'title': '大艺术家', 'lang': 'zh', 'decade': '2010s', 'genre': 'Mandopop'},

    # English — pop/rock at cadence pace
    {'artist': 'Outkast', 'title': 'Hey Ya', 'lang': 'en', 'decade': '2000s', 'genre': 'Pop'},
    {'artist': 'Taylor Swift', 'title': 'Shake It Off', 'lang': 'en', 'decade': '2010s', 'genre': 'Pop'},
    {'artist': 'Queen', 'title': "Don't Stop Me Now", 'lang': 'en', 'decade': '1970s', 'genre': 'Rock'},
    {'artist': 'Elton John', 'title': "I'm Still Standing", 'lang': 'en', 'decade': '1980s', 'genre': 'Pop'},
    {'artist': 'Kenny Loggins', 'title': 'Footloose', 'lang': 'en', 'decade': '1980s', 'genre': 'Pop'},
    {'artist': 'MGMT', 'title': 'Kids', 'lang': 'en', 'decade': '2000s', 'genre': 'Electronic'},
    {'artist': 'Linkin Park', 'title': "What I've Done", 'lang': 'en', 'decade': '2000s', 'genre': 'Rock'},
    {'artist': 'Foo Fighters', 'title': 'The Pretender', 'lang': 'en', 'decade': '2000s', 'genre': 'Rock'},
    {'artist': 'Fall Out Boy', 'title': 'Centuries', 'lang': 'en', 'decade': '2010s', 'genre': 'Rock'},
    {'artist': 'Panic At The Disco', 'title': 'High Hopes', 'lang': 'en', 'decade': '2010s', 'genre': 'Pop'},
    {'artist': 'Imagine Dragons', 'title': 'Believer', 'lang': 'en', 'decade': '2010s', 'genre': 'Rock'},
    {'artist': 'The Killers', 'title': 'Somebody Told Me', 'lang': 'en', 'decade': '2000s', 'genre': 'Rock'},
    {'artist': 'Green Day', 'title': 'Basket Case', 'lang': 'en', 'decade': '1990s', 'genre': 'Rock'},
    {'artist': 'Blink-182', 'title': 'All The Small Things', 'lang': 'en', 'decade': '1990s', 'genre': 'Rock'},
    {'artist': 'Red Hot Chili Peppers', 'title': "Can't Stop", 'lang': 'en', 'decade': '2000s', 'genre': 'Rock'},
    {'artist': 'Arctic Monkeys', 'title': 'I Bet You Look Good On The Dancefloor', 'lang': 'en', 'decade': '2000s', 'genre': 'Rock'},
    {'artist': 'Franz Ferdinand', 'title': 'Take Me Out', 'lang': 'en', 'decade': '2000s', 'genre': 'Rock'},
    {'artist': 'Muse', 'title': 'Uprising', 'lang': 'en', 'decade': '2000s', 'genre': 'Rock'},
    {'artist': 'The Strokes', 'title': 'Reptilia', 'lang': 'en', 'decade': '2000s', 'genre': 'Rock'},
    {'artist': 'Weezer', 'title': 'Buddy Holly', 'lang': 'en', 'decade': '1990s', 'genre': 'Rock'},
]


def query_tunebat(artist, title):
    """Query Tunebat search API."""
    query = f'{artist} {title}'
    url = f'https://tunebat.com/Search?q={requests.utils.quote(query)}'
    try:
        resp = requests.get(url, headers={'User-Agent': UA}, timeout=15)
        if resp.status_code != 200:
            return None
        matches = re.findall(r'"bpm"\s*:\s*(\d+(?:\.\d+)?)', resp.text)
        for m in matches:
            bpm = float(m)
            if 30 <= bpm <= 300:
                return bpm
        return None
    except:
        return None


def query_songbpm(artist, title):
    """Query SongBPM.com."""
    def slug(s):
        return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')
    url = f'https://songbpm.com/@{slug(artist)}/{slug(title)}'
    try:
        resp = requests.get(url, headers={'User-Agent': UA}, timeout=15)
        if resp.status_code != 200:
            return None
        matches = re.findall(r'(\d+(?:\.\d+)?)\s*BPM', resp.text)
        for m in matches:
            bpm = float(m)
            if 30 <= bpm <= 300:
                return bpm
        return None
    except:
        return None


def youtube_search_song(artist, title, lang):
    """Search YouTube for a specific song."""
    if lang == 'zh':
        query = f'{artist} {title} MV'
    else:
        query = f'{artist} {title} official'
    
    result = subprocess.run([
        'yt-dlp', '--flat-playlist', '--dump-json', '--no-update',
        '--playlist-end', '1',
        f'ytsearch1:{query}'
    ], capture_output=True, text=True, timeout=30)
    
    for line in result.stdout.strip().split('\n'):
        if not line:
            continue
        try:
            info = json.loads(line)
            return {
                'youtube_id': info.get('id', ''),
                'youtube_url': info.get('webpage_url', f'https://youtube.com/watch?v={info.get("id", "")}'),
                'duration': info.get('duration', 0),
            }
        except:
            continue
    return None


def read_queue():
    if QUEUE_FILE.exists():
        return json.loads(QUEUE_FILE.read_text(encoding='utf-8'))
    return []


def save_queue(queue):
    QUEUE_FILE.parent.mkdir(parents=True, exist_ok=True)
    QUEUE_FILE.write_text(json.dumps(queue, indent=2, ensure_ascii=False), encoding='utf-8')


def main():
    log('=== Targeted Song Searcher ===')
    queue = read_queue()
    existing = [s['title'].lower() for s in queue]
    
    added = 0
    target = 10  # We want 10 new songs
    
    for c in CANDIDATES:
        if added >= target:
            break
        
        artist, title, lang = c['artist'], c['title'], c['lang']
        key = title.lower()
        if key in existing:
            log(f'⏭️ Skip (duplicate): {artist} — {title}')
            continue
        
        log(f'🔍 {artist} — {title}')
        
        # Step 1: Verify BPM
        tb = query_tunebat(artist, title)
        time.sleep(0.8)
        sb = query_songbpm(artist, title)
        
        bpms = []
        if tb: bpms.append(('tunebat', tb))
        if sb: bpms.append(('songbpm', sb))
        
        if not bpms:
            log(f'  ❌ No BPM data found')
            continue
        
        avg = sum(b for _, b in bpms) / len(bpms)
        sources = '+'.join(s for s, _ in bpms)
        
        if not (160 <= avg <= 170):
            log(f'  ⏭️ BPM {avg:.1f} — outside 160-170 range')
            continue
        
        confidence = 'high' if len(bpms) >= 2 else 'medium'
        log(f'  ✅ {avg:.1f} BPM ({confidence} confidence, {sources})')
        
        # Step 2: Find YouTube URL
        yt = youtube_search_song(artist, title, lang)
        if not yt:
            log(f'  ⚠️ No YouTube result found')
            continue
        
        # Step 3: Add to queue
        new_id = str(len(queue) + 1)
        decade_year = {'1970s': 1975, '1980s': 1985, '1990s': 1995, '2000s': 2005, '2010s': 2015, '2020s': 2022}
        
        song = {
            'id': new_id,
            'title': f'{artist} — {title}',
            'artist': artist,
            'youtube_url': yt['youtube_url'],
            'youtube_id': yt['youtube_id'],
            'duration': yt['duration'],
            'bpm': round(avg, 1),
            'bpm_verified': True,
            'bpm_source': sources,
            'confidence': confidence,
            'decade': c['decade'],
            'language': lang,
            'genres': [c['genre']],
            'year': decade_year.get(c['decade'], 2005),
            'album': 'Unknown',
            'energy': 0.6,
            'danceability': 0.5,
            'valence': 0.5,
            'downloaded': False,
            'added_at': datetime.now().isoformat(),
        }
        
        queue.append(song)
        existing.append(key)
        added += 1
        log(f'  ➕ Added as #{new_id}')
    
    save_queue(queue)
    
    total = len(queue)
    pending = sum(1 for s in queue if not s.get('downloaded'))
    log(f'\n=== Done: {added} songs verified & added ===')
    log(f'Queue: {total} total, {pending} pending download')
    
    return 0

if __name__ == '__main__':
    sys.exit(main())
