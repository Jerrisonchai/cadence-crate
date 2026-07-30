'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Play, Pause, ChevronLeft, ChevronRight, Disc3, Heart, Circle } from 'lucide-react';
import { useMusicPlayer, type Song, type RunMode } from '@/context/MusicPlayerContext';

// Song catalog
const ALL_SONGS: Song[] = [
  { id: '1', title: '夜曲 (Nocturne)', artist: 'Jay Chou', album: "November's Chopin", bpm: 168, decade: '2000s', language: 'zh', year: 2005, genres: ['Pop', 'Mandopop'], energy: 0.72, danceability: 0.45, valence: 0.38, audio_url: '/audio/1.mp3' },
  { id: '2', title: '晴天 (Sunny Day)', artist: 'Jay Chou', album: 'Yeh Hui-mei', bpm: 165, decade: '2000s', language: 'zh', year: 2003, genres: ['Pop', 'Mandopop'], energy: 0.68, danceability: 0.52, valence: 0.41, audio_url: '/audio/2.mp3' },
  { id: '3', title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', bpm: 171, decade: '2020s', language: 'en', year: 2020, genres: ['Pop', 'Electronic'], energy: 0.80, danceability: 0.50, valence: 0.38, audio_url: '/audio/3.mp3' },
  { id: '4', title: 'Take On Me', artist: 'a-ha', album: 'Hunting High and Low', bpm: 169, decade: '1980s', language: 'en', year: 1985, genres: ['Pop', 'Rock'], energy: 0.86, danceability: 0.57, valence: 0.85, audio_url: '/audio/4.mp3' },
  { id: '5', title: '稻香 (Rice Aroma)', artist: 'Jay Chou', album: 'Capricorn', bpm: 162, decade: '2000s', language: 'zh', year: 2008, genres: ['Pop', 'Mandopop'], energy: 0.55, danceability: 0.60, valence: 0.72, audio_url: '/audio/5.mp3' },
  { id: '6', title: '簡單愛 (Simple Love)', artist: 'Jay Chou', album: 'Fantasy', bpm: 169, decade: '2000s', language: 'zh', year: 2001, genres: ['Pop', 'Mandopop'], energy: 0.62, danceability: 0.48, valence: 0.65, audio_url: '/audio/6.mp3' },
  { id: '7', title: "Don't Stop Believin'", artist: 'Journey', album: 'Escape', bpm: 160, decade: '1980s', language: 'en', year: 1981, genres: ['Rock'], energy: 0.74, danceability: 0.49, valence: 0.33, audio_url: '/audio/7.mp3' },
  { id: '8', title: 'Running Up That Hill', artist: 'Kate Bush', album: 'Hounds of Love', bpm: 165, decade: '1980s', language: 'en', year: 1985, genres: ['Pop', 'Rock'], energy: 0.56, danceability: 0.63, valence: 0.20, audio_url: '/audio/8.mp3' },
];

// Filter helpers
function applyFilters(songs: Song[], decade: string | null, genre: string | null, lang: string | null): Song[] {
  let result = songs;
  if (decade) result = result.filter((s) => { const y = s.year; const dk = `${String(y).slice(0, 3)}0s`; return dk === decade; });
  if (genre) result = result.filter((s) => s.genres?.includes(genre));
  if (lang) result = result.filter((s) => s.language === lang);
  return result;
}

function sortSongs(songs: Song[], sortBy: string): Song[] {
  const sorted = [...songs];
  switch (sortBy) { case 'bpm_desc': return sorted.sort((a, b) => b.bpm - a.bpm); case 'bpm_asc': return sorted.sort((a, b) => a.bpm - b.bpm); case 'newest': return sorted.sort((a, b) => (b.year || 0) - (a.year || 0)); case 'title_asc': return sorted.sort((a, b) => a.title.localeCompare(b.title)); default: return sorted; }
}

function getBpmColor(bpm: number, mode: RunMode) {
  if (mode === 'favorites') {
    if (bpm >= 168) return '#00D4FF';
    if (bpm >= 164) return '#6366F1';
    return '#A78BFA';
  }
  if (bpm >= 168) return '#A3FF12';
  if (bpm >= 164) return '#F59E0B';
  return '#EF4444';
}

function getBpmLabel(bpm: number) {
  if (bpm >= 168) return 'PEAK';
  if (bpm >= 164) return 'ZONE';
  return 'BASE';
}

function bpmToInterval(bpm: number) { return 60 / bpm; }

export default function RunPage() {
  const { state, controls, currentSong } = useMusicPlayer();
  const [showGuide, setShowGuide] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const wakeLockRef = useRef<any>(null);

  // Initialize playlist from sessionStorage on mount (only once)
  useEffect(() => {
    if (initialized) return;

    const runSource = sessionStorage.getItem('cadence_run_source');
    const mode: RunMode = runSource === 'favorites' ? 'favorites' : 'browse';

    let songs: Song[];
    if (mode === 'favorites') {
      try {
        const favIds: string[] = JSON.parse(localStorage.getItem('cadence_favorites') || '[]');
        songs = favIds.map((id) => ALL_SONGS.find((s) => s.id === id)).filter((s): s is Song => !!s);
      } catch { songs = ALL_SONGS; }
    } else {
      try {
        const raw = sessionStorage.getItem('cadence_browse_state');
        if (raw) {
          const st = JSON.parse(raw);
          songs = sortSongs(applyFilters(ALL_SONGS, st.decade, st.genre, st.language), st.sort || 'bpm_desc');
        } else {
          songs = ALL_SONGS;
        }
      } catch { songs = ALL_SONGS; }
    }

    if (songs.length > 0) {
      controls.setPlaylist(songs, mode);
    }
    setInitialized(true);
  }, [initialized, controls]);

  const mode = state.mode;
  const isPlaying = state.isPlaying;
  const playlist = state.playlist;
  const index = state.currentIndex;

  // Fallback if no playlist yet
  const current = currentSong || { id: '0', title: 'No song', artist: '', album: '', bpm: 160, year: 0, language: 'en', genres: [], audio_url: null };
  const themeColor = getBpmColor(current.bpm, mode);
  const bpmLabel = getBpmLabel(current.bpm);
  const pulseInterval = bpmToInterval(current.bpm);
  const accentColor = mode === 'favorites' ? '#00D4FF' : '#A3FF12';

  // Wake Lock
  const requestWakeLock = useCallback(async () => {
    try {
      if ('wakeLock' in navigator && !wakeLockRef.current) {
        wakeLockRef.current = await (navigator as any).wakeLock.request('screen');
        wakeLockRef.current.addEventListener('release', () => { wakeLockRef.current = null; });
      }
    } catch { /* ignore */ }
  }, []);

  const releaseWakeLock = useCallback(async () => {
    try { if (wakeLockRef.current) { await wakeLockRef.current.release(); wakeLockRef.current = null; } } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    if (isPlaying) requestWakeLock(); else releaseWakeLock();
    return () => { releaseWakeLock(); };
  }, [isPlaying, requestWakeLock, releaseWakeLock]);

  // Auto-dismiss guide
  useEffect(() => {
    if (!showGuide) return;
    const t = setTimeout(() => setShowGuide(false), 4000);
    return () => clearTimeout(t);
  }, [showGuide]);

  // Switch mode
  const switchMode = (m: RunMode) => {
    if (m === mode) return;
    if (m === 'favorites') {
      try {
        const favIds: string[] = JSON.parse(localStorage.getItem('cadence_favorites') || '[]');
        const songs = favIds.map((id) => ALL_SONGS.find((s) => s.id === id)).filter((s): s is Song => !!s);
        if (songs.length > 0) controls.setPlaylist(songs, 'favorites');
      } catch { /* ignore */ }
    } else {
      try {
        const raw = sessionStorage.getItem('cadence_browse_state');
        const songs = raw
          ? (() => { const st = JSON.parse(raw); return sortSongs(applyFilters(ALL_SONGS, st.decade, st.genre, st.language), st.sort || 'bpm_desc'); })()
          : ALL_SONGS;
        controls.setPlaylist(songs, 'browse');
      } catch { controls.setPlaylist(ALL_SONGS, 'browse'); }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden select-none"
      style={{ backgroundColor: mode === 'favorites' ? '#050514' : '#050510' }}
    >
      <div className="absolute inset-0" style={{ background: mode === 'favorites' ? 'radial-gradient(ellipse_at_center,rgba(0,212,255,0.05)_0%,transparent_70%)' : 'radial-gradient(ellipse_at_center,rgba(163,255,18,0.04)_0%,transparent_70%)' }} />

      {/* Guide */}
      <AnimatePresence>
        {showGuide && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute top-6 left-0 right-0 z-20 flex items-center justify-center px-4">
            <div className="rounded-xl border px-5 py-3 text-center backdrop-blur-xl" style={{ borderColor: 'rgba(163,255,18,0.2)', backgroundColor: mode === 'favorites' ? 'rgba(5,5,20,0.9)' : 'rgba(8,8,20,0.9)' }}>
              <p className="font-display text-xs font-semibold" style={{ color: accentColor }}>🏃 Run Mode Active</p>
              <p className="font-body text-[11px] text-text-muted mt-0.5">{mode === 'browse' ? 'Browse' : 'Favorites'} • {playlist.length} tracks</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
        <Link href="/" className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-[#080814]/60 backdrop-blur-md text-text-muted hover:text-text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>

        <div className="flex items-center gap-2">
          {/* Tap shortcut */}
          <Link
            href="/tap"
            className="flex items-center gap-1.5 rounded-full border border-border bg-[#080814]/60 backdrop-blur-md px-3 py-1.5 hover:border-pulse/30 transition-colors"
          >
            <Circle className="h-3.5 w-3.5 text-pulse" />
            <span className="font-display text-[10px] font-medium text-text-muted">Tap</span>
          </Link>

          {/* Mode toggle */}
          <div className="flex rounded-xl border border-border bg-[#080814]/80 backdrop-blur-md p-0.5">
            <button onClick={() => switchMode('browse')} className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-display text-[11px] font-medium transition-all" style={{ backgroundColor: mode === 'browse' ? 'rgba(163,255,18,0.12)' : 'transparent', color: mode === 'browse' ? '#A3FF12' : 'rgb(148,163,184)' }}>
              <Disc3 className="h-3 w-3" />Browse
            </button>
            <button onClick={() => switchMode('favorites')} className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-display text-[11px] font-medium transition-all" style={{ backgroundColor: mode === 'favorites' ? 'rgba(0,212,255,0.12)' : 'transparent', color: mode === 'favorites' ? '#00D4FF' : 'rgb(148,163,184)' }}>
              <Heart className="h-3 w-3" />Favs
            </button>
          </div>
        </div>
      </div>

      {/* Empty state for favorites */}
      {mode === 'favorites' && playlist.length === 0 ? (
        <div className="flex flex-col items-center gap-4 text-center px-6">
          <Heart className="h-12 w-12 text-text-muted/30" />
          <p className="font-display text-lg font-bold text-text-primary">No favorites saved yet</p>
          <p className="font-body text-sm text-text-secondary max-w-xs">Heart some songs in Browse mode, then come back to run.</p>
          <button onClick={() => switchMode('browse')} className="rounded-xl border px-5 py-2.5 font-display text-sm font-medium transition-all active:scale-95" style={{ borderColor: 'rgba(163,255,18,0.2)', backgroundColor: 'rgba(163,255,18,0.06)', color: '#A3FF12' }}>Switch to Browse Mode</button>
        </div>
      ) : (
        <>
          {/* Pulse Rings */}
          <div className="relative flex items-center justify-center mt-2">
            <motion.div key={`outer-${current.id}`} className="absolute rounded-full" style={{ width: '300px', height: '300px', borderColor: accentColor, borderWidth: 0.8 }}
              animate={{ scale: [0.85, 1.1], opacity: [0.25, 0] }} transition={{ duration: pulseInterval, repeat: isPlaying ? Infinity : 0, ease: 'easeOut' }} />
            <motion.div key={`mid-${current.id}`} className="absolute rounded-full" style={{ width: '250px', height: '250px', borderColor: themeColor, borderWidth: 1.5 }}
              animate={{ scale: [0.95, 1.05], opacity: [0.45, 0.08] }} transition={{ duration: pulseInterval, repeat: isPlaying ? Infinity : 0, ease: 'easeInOut' }} />
            <motion.div key={`inner-${current.id}`} className="absolute rounded-full" style={{ width: '200px', height: '200px', borderColor: accentColor, borderWidth: 0.6 }}
              animate={{ scale: [0.9, 1.08], opacity: [0.55, 0.08] }} transition={{ duration: pulseInterval, repeat: isPlaying ? Infinity : 0, ease: 'easeInOut', delay: pulseInterval * 0.25 }} />

            <motion.div key={`bpm-${current.id}`} className="relative z-10 flex flex-col items-center justify-center" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3 }}>
              <motion.span className="font-display font-bold tabular-nums" style={{ fontSize: 'clamp(80px, 20vw, 120px)', color: themeColor, lineHeight: 1 }}
                animate={{ scale: isPlaying ? [1, 1.03, 1] : 1 }} transition={{ duration: pulseInterval, repeat: isPlaying ? Infinity : 0, ease: 'easeInOut' }}>{current.bpm}</motion.span>
              <span className="font-display text-xs tracking-[0.3em] text-text-muted mt-1">BPM</span>
              <span className="mt-1.5 rounded-full border px-3 py-0.5 font-display text-[10px] font-bold tracking-wider" style={{ borderColor: themeColor, color: themeColor }}>{bpmLabel}</span>
            </motion.div>
          </div>

          {/* Now Playing */}
          <div className="mt-8 text-center px-6 max-w-sm">
            <AnimatePresence mode="wait">
              <motion.div key={current.id} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.25 }}>
                <h2 className="font-display text-xl font-bold text-text-primary truncate">{current.title}</h2>
                <p className="font-body text-sm text-text-secondary mt-1">{current.artist}</p>
                <div className="flex items-center justify-center gap-3 mt-2">
                  <span className="font-body text-[11px] text-text-muted">{current.album}</span>
                  <span className="font-body text-[11px] text-text-muted">•</span>
                  <span className="font-body text-[11px] text-text-muted">{current.year}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-10 flex items-center gap-6 md:gap-8">
            <button onClick={controls.prev} className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full border border-border bg-[#080814]/60 backdrop-blur-md text-text-muted hover:text-text-primary transition-all active:scale-90" aria-label="Previous">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <motion.button onClick={controls.togglePlay} whileTap={{ scale: 0.9 }} className="flex h-16 w-16 md:h-18 md:w-18 items-center justify-center rounded-full border-2 bg-[#080814]/80 backdrop-blur-md transition-all active:scale-90" style={{ borderColor: themeColor, color: themeColor }} aria-label={isPlaying ? 'Pause' : 'Play'}>
              {isPlaying ? <Pause className="h-7 w-7" /> : <Play className="h-7 w-7 ml-1" />}
            </motion.button>
            <button onClick={controls.next} className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full border border-border bg-[#080814]/60 backdrop-blur-md text-text-muted hover:text-text-primary transition-all active:scale-90" aria-label="Next">
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Queue dots */}
          <div className="mt-8 flex items-center gap-2">
            <div className="flex items-center gap-1">
              {playlist.map((s, i) => (
                <button key={s.id} onClick={() => controls.goToSong(i)} className="h-1.5 rounded-full transition-all duration-300"
                  style={{ width: i === index ? '20px' : '6px', backgroundColor: i === index ? themeColor : s.audio_url ? 'rgb(255,255,255,0.2)' : 'rgb(255,255,255,0.06)' }}
                  aria-label={`Go to ${s.title}`} />
              ))}
            </div>
          </div>

          <p className="mt-4 font-display text-[11px] text-text-muted tracking-wider">
            <span style={{ color: accentColor }}>{mode === 'browse' ? 'Browse' : 'Favorites'}</span>
            <span className="mx-1.5">•</span>{index + 1} / {playlist.length}
          </p>
        </>
      )}

      <p className="absolute bottom-6 font-body text-[10px] text-text-muted opacity-50">Tip: Match your steps to the flashing BPM</p>
    </div>
  );
}
