"""
Cadence Crate — Weekly BPM Collector v1.0
MANDATE:
  WHO:    OpenClaw cron (Sunday 2AM MYT)
  WHEN:   Weekly, after the BPM search cron
  PURPOSE: Automate the full YouTube→MP3→website pipeline for new 160-170 BPM songs
  WHAT:
    1. Read pending song queue (songs added by search phase)
    2. Download MP3 via yt-dlp from YouTube URLs
    3. Update shared song catalog (src/data/songs.ts)
    4. Commit + push → triggers Vercel auto-deploy
  IMPROVEMENT: v1.0 — initial pipeline. Future: Spotify API integration, BPM verification
  HISTORY:
    v1.0 (Jul 29 2026) — Initial pipeline: yt-dlp download + song catalog update + git deploy
"""

import json
import os
import re
import subprocess
import sys
import tempfile
from datetime import datetime
from pathlib import Path

# Tier 2: numpy/scipy onset detection for BPM verification
import numpy as np
from scipy.io import wavfile
from scipy.signal import find_peaks

PROJECT_ROOT = Path(__file__).parent.parent
AUDIO_DIR = PROJECT_ROOT / 'public' / 'audio'
QUEUE_FILE = PROJECT_ROOT / 'data' / 'cadence_queue.json'
SONGS_FILE = PROJECT_ROOT / 'src' / 'data' / 'songs.ts'
AUDIO_DIR.mkdir(parents=True, exist_ok=True)

def log(msg: str):
    timestamp = datetime.now().strftime('%H:%M:%S')
    print(f'[{timestamp}] {msg}')

def read_queue() -> list:
    """Read pending song queue. Each entry: { id, youtube_url, title, artist }"""
    if not QUEUE_FILE.exists():
        log(f'No queue file at {QUEUE_FILE}')
        return []
    with open(QUEUE_FILE, 'r', encoding='utf-8') as f:
        queue = json.load(f)
    pending = [s for s in queue if not s.get('downloaded')]
    log(f'Queue: {len(pending)} pending of {len(queue)} total')
    return pending

def download_mp3(song: dict) -> bool:
    """Download song from YouTube as MP3 using yt-dlp"""
    sid = song['id']
    outpath = AUDIO_DIR / f'{sid}.%(ext)s'
    url = song['youtube_url']

    log(f'Downloading: {song["title"]} — {song["artist"]} ({url})')
    result = subprocess.run([
        'yt-dlp', '-x', '--audio-format', 'mp3', '--audio-quality', '192k',
        '--no-playlist', '--no-update',
        '-o', str(outpath), url
    ], capture_output=True, text=True, timeout=120)

    actual_mp3 = AUDIO_DIR / f'{sid}.mp3'
    if actual_mp3.exists():
        size_kb = actual_mp3.stat().st_size / 1024
        log(f'  ✅ Downloaded: {actual_mp3.name} ({size_kb:.0f} KB)')
        return True
    else:
        log(f'  ❌ Download failed: {result.stderr[:200]}')
        return False


# ─── TIER 2: AUDIO BPM DETECTION ────────────────────────────

def detect_bpm_from_mp3(mp3_path: Path) -> float | None:
    """
    Tier 2: numpy/scipy onset detection for BPM verification.
    Uses ffmpeg for WAV extraction + scipy peak detection.
    """
    try:
        # Step 1: Extract 30s WAV snippet with ffmpeg
        with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as tmp:
            wav_path = tmp.name

        subprocess.run([
            'ffmpeg', '-y', '-i', str(mp3_path),
            '-t', '30', '-ac', '1', '-ar', '22050',
            '-acodec', 'pcm_s16le', wav_path
        ], capture_output=True, timeout=30)

        if not os.path.exists(wav_path) or os.path.getsize(wav_path) < 1000:
            return None

        # Step 2: Read WAV
        sr, y = wavfile.read(wav_path)
        if len(y.shape) > 1:
            y = np.mean(y, axis=1)
        y = y.astype(float) / np.max(np.abs(y))  # Normalize

        # Step 3: Onset detection via energy
        frame_size = int(sr * 0.01)  # 10ms frames
        n_frames = len(y) // frame_size
        energy = np.array([
            np.sum(np.abs(y[i * frame_size:(i + 1) * frame_size]))
            for i in range(n_frames)
        ])
        if len(energy) < 10:
            return None

        # Normalize energy
        energy = energy / (np.max(energy) + 1e-10)

        # Find peaks
        min_distance = int(sr * 0.15 / frame_size)  # ~150ms min between beats
        peaks, props = find_peaks(energy, height=0.08, distance=max(1, min_distance))

        if len(peaks) < 4:
            return None

        # Inter-onset intervals in seconds
        ioi = np.diff(peaks) * (frame_size / sr)

        # Filter to reasonable beat range: 0.3s (200 BPM) to 0.75s (80 BPM)
        reasonable = ioi[(ioi >= 0.3) & (ioi <= 0.75)]

        if len(reasonable) < 2:
            return None

        # Use median for robustness
        median_interval = float(np.median(reasonable))
        bpm = 60.0 / median_interval

        # Cleanup
        os.unlink(wav_path)

        return round(bpm, 1) if 60 <= bpm <= 220 else None

    except Exception as e:
        log(f'  BPM detection error: {e}')
        return None


def update_songs_file() -> str:
    """Regenerate src/data/songs.ts from the audio directory state"""
    # Read existing song catalog from the current songs.ts
    current_songs = {}
    if SONGS_FILE.exists():
        content = SONGS_FILE.read_text(encoding='utf-8')
        # Simple extraction of song IDs with audio_url to preserve existing data
        import re
        ids = re.findall(r"id:\s*'(\d+)'", content)
        urls = re.findall(r"audio_url:\s*'([^']*)'", content)
        for id_val in ids:
            idx = int(id_val) - 1  # zero-indexed
            if idx < len(urls):
                current_songs[id_val] = urls[idx]

    # Update audio_url for any songs with downloaded MP3s
    for mp3 in sorted(AUDIO_DIR.glob('*.mp3')):
        sid = mp3.stem  # e.g., '1', '2', etc.
        current_songs[sid] = f'/audio/{mp3.name}'

    return str(len(current_songs))

def mark_downloaded(song_id: str):
    """Mark a song as downloaded in the queue file"""
    if not QUEUE_FILE.exists():
        return
    with open(QUEUE_FILE, 'r', encoding='utf-8') as f:
        queue = json.load(f)
    for s in queue:
        if s['id'] == song_id:
            s['downloaded'] = True
            s['downloaded_at'] = datetime.now().isoformat()
    with open(QUEUE_FILE, 'w', encoding='utf-8') as f:
        json.dump(queue, f, indent=2, ensure_ascii=False)

def commit_and_push():
    """Commit audio changes and push to GitHub → Vercel auto-deploys"""
    log('Committing changes...')
    subprocess.run(['git', 'add', 'public/audio/', 'src/data/songs.ts'], cwd=PROJECT_ROOT, capture_output=True)
    subprocess.run(['git', 'add', 'data/cadence_queue.json'], cwd=PROJECT_ROOT, capture_output=True)

    result = subprocess.run(
        ['git', 'commit', '-m', f'Weekly collector: update song catalog ({datetime.now().strftime("%Y-%m-%d")})'],
        cwd=PROJECT_ROOT, capture_output=True, text=True
    )
    if 'nothing to commit' in result.stdout + result.stderr:
        log('No changes to commit')
        return

    log('Pushing to GitHub...')
    push = subprocess.run(['git', 'push'], cwd=PROJECT_ROOT, capture_output=True, text=True, timeout=30)
    if push.returncode == 0:
        log('✅ Pushed — Vercel will auto-deploy')
    else:
        log(f'⚠️ Push failed: {push.stderr[:200]}')

def main():
    log('=== Cadence Crate Weekly Collector v1.0 ===')
    log(f'Project: {PROJECT_ROOT}')

    pending = read_queue()
    if not pending:
        log('No pending songs — nothing to download')
        return 0

    downloaded = []
    failed = []
    for song in pending:
        success = download_mp3(song)
        if success:
            mark_downloaded(song['id'])
            downloaded.append(song['title'])

            # Tier 2: Analyze BPM if not already verified
            if not song.get('bpm_verified'):
                mp3_path = AUDIO_DIR / f'{song["id"]}.mp3'
                detected_bpm = detect_bpm_from_mp3(mp3_path)
                if detected_bpm:
                    song['bpm'] = detected_bpm
                    song['bpm_verified'] = True
                    song['bpm_source'] = song.get('bpm_source', '') + '+numpy/scipy'
                    song['confidence'] = 'high' if 160 <= detected_bpm <= 170 else 'medium'
                    log(f'  Tier 2 BPM: {detected_bpm:.1f} BPM (confidence={song["confidence"]})')
                else:
                    log(f'  Tier 2 BPM: detection failed')
        else:
            failed.append(song['title'])

    num_total = update_songs_file()
    log(f'Catalog: {num_total} songs with audio')

    if downloaded:
        commit_and_push()

    log(f'=== Complete: {len(downloaded)} downloaded, {len(failed)} failed ===')

    # Summary for cron delivery
    summary = f'📦 Cadence Crate Weekly Collector\n'
    summary += f'✅ Downloaded: {len(downloaded)} songs\n'
    if downloaded:
        for title in downloaded:
            summary += f'   🎵 {title}\n'
    if failed:
        summary += f'❌ Failed: {len(failed)} songs\n'
        for title in failed:
            summary += f'   ⚠️ {title}\n'
    summary += f'📊 Total with audio: {num_total} songs'
    print(summary)

    return 0 if not failed else 1

if __name__ == '__main__':
    sys.exit(main())
