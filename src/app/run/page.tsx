'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Play, Pause, ChevronLeft, ChevronRight, Music, Heart } from 'lucide-react';

// Song catalog — shared with HomeContent, song detail, and favorites pages
const songs = [
  { id: '1', title: '夜曲 (Nocturne)', artist: 'Jay Chou', album: "November's Chopin", bpm: 168, decade: '2000s', language: 'zh', year: 2005, genres: ['Pop', 'Mandopop'], energy: 0.72, danceability: 0.45, valence: 0.38, audio_url: '/audio/1.mp3' },
  { id: '2', title: '晴天 (Sunny Day)', artist: 'Jay Chou', album: 'Yeh Hui-mei', bpm: 165, decade: '2000s', language: 'zh', year: 2003, genres: ['Pop', 'Mandopop'], energy: 0.68, danceability: 0.52, valence: 0.41, audio_url: null },
  { id: '3', title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', bpm: 171, decade: '2020s', language: 'en', year: 2020, genres: ['Pop', 'Electronic'], energy: 0.80, danceability: 0.50, valence: 0.38, audio_url: null },
  { id: '4', title: 'Take On Me', artist: 'a-ha', album: 'Hunting High and Low', bpm: 169, decade: '1980s', language: 'en', year: 1985, genres: ['Pop', 'Rock'], energy: 0.86, danceability: 0.57, valence: 0.85, audio_url: null },
  { id: '5', title: '稻香 (Rice Aroma)', artist: 'Jay Chou', album: 'Capricorn', bpm: 162, decade: '2000s', language: 'zh', year: 2008, genres: ['Pop', 'Mandopop'], energy: 0.55, danceability: 0.60, valence: 0.72, audio_url: null },
  { id: '6', title: '簡單愛 (Simple Love)', artist: 'Jay Chou', album: 'Fantasy', bpm: 169, decade: '2000s', language: 'zh', year: 2001, genres: ['Pop', 'Mandopop'], energy: 0.62, danceability: 0.48, valence: 0.65, audio_url: null },
  { id: '7', title: "Don't Stop Believin'", artist: 'Journey', album: 'Escape', bpm: 160, decade: '1980s', language: 'en', year: 1981, genres: ['Rock'], energy: 0.74, danceability: 0.49, valence: 0.33, audio_url: null },
  { id: '8', title: 'Running Up That Hill', artist: 'Kate Bush', album: 'Hounds of Love', bpm: 165, decade: '1980s', language: 'en', year: 1985, genres: ['Pop', 'Rock'], energy: 0.56, danceability: 0.63, valence: 0.20, audio_url: null },
];

function getBpmColor(bpm: number) {
  if (bpm >= 168) return '#A3FF12'; // Peak
  if (bpm >= 164) return '#F59E0B'; // Zone
  return '#EF4444'; // Base
}

function getBpmLabel(bpm: number) {
  if (bpm >= 168) return 'PEAK';
  if (bpm >= 164) return 'ZONE';
  return 'BASE';
}

function getBpmRingScale(bpm: number) {
  // Higher BPM = wider ring scaling
  return 0.85 + ((bpm - 160) / 10) * 0.15;
}

// Calculate pulse duration from BPM (seconds per beat)
function bpmToInterval(bpm: number): number {
  return 60 / bpm;
}

export default function RunPage() {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true); // auto-play on entry
  const [showGuide, setShowGuide] = useState(true);
  const wakeLockRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const current = songs[index];
  const bpmColor = getBpmColor(current.bpm);
  const bpmLabel = getBpmLabel(current.bpm);
  const pulseInterval = bpmToInterval(current.bpm);

  // Wake Lock API
  const requestWakeLock = useCallback(async () => {
    try {
      if ('wakeLock' in navigator && !wakeLockRef.current) {
        wakeLockRef.current = await (navigator as any).wakeLock.request('screen');
        wakeLockRef.current.addEventListener('release', () => {
          wakeLockRef.current = null;
        });
      }
    } catch {
      // Wake Lock might not be supported
    }
  }, []);

  const releaseWakeLock = useCallback(async () => {
    try {
      if (wakeLockRef.current) {
        await wakeLockRef.current.release();
        wakeLockRef.current = null;
      }
    } catch {
      // ignore
    }
  }, []);

  // Audio playback: load when song changes, play/pause on toggle
  useEffect(() => {
    // Clean up previous audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current.remove();
      audioRef.current = null;
    }

    if (!current.audio_url) return;

    const audio = new Audio(current.audio_url);
    audio.preload = 'auto';
    audio.loop = true;
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current.remove();
        audioRef.current = null;
      }
    };
  }, [current]);

  // Play/pause on toggle
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Media Session API
  useEffect(() => {
    if (!('mediaSession' in navigator)) return;
    const ms = (navigator as any).mediaSession;
    ms.metadata = new (window as any).MediaMetadata({
      title: current.title,
      artist: current.artist,
      album: current.album,
      artwork: [{ src: '/favicon.ico', sizes: '96x96', type: 'image/x-icon' }],
    });
    ms.setActionHandler?.('previoustrack', () => setIndex((i) => (i - 1 + songs.length) % songs.length));
    ms.setActionHandler?.('nexttrack', () => setIndex((i) => (i + 1) % songs.length));
    ms.setActionHandler?.('play', () => setIsPlaying(true));
    ms.setActionHandler?.('pause', () => setIsPlaying(false));
  }, [current]);

  useEffect(() => {
    if (isPlaying) {
      requestWakeLock();
    } else {
      releaseWakeLock();
    }
    return () => { releaseWakeLock(); };
  }, [isPlaying, requestWakeLock, releaseWakeLock]);

  // Auto-dismiss guide after 5 seconds
  useEffect(() => {
    if (!showGuide) return;
    const t = setTimeout(() => setShowGuide(false), 5000);
    return () => clearTimeout(t);
  }, [showGuide]);

  const prev = () => setIndex((i) => (i - 1 + songs.length) % songs.length);
  const next = () => setIndex((i) => (i + 1) % songs.length);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050510] overflow-hidden select-none">
      {/* Background subtle gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(163,255,18,0.04)_0%,transparent_70%)]" />

      {/* Guide overlay */}
      <AnimatePresence>
        {showGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-6 left-0 right-0 z-20 flex items-center justify-center px-4"
          >
            <div className="rounded-xl border border-pulse/20 bg-[#080814]/90 backdrop-blur-xl px-5 py-3 text-center">
              <p className="font-display text-xs font-semibold text-pulse">🏃 Run Mode Active</p>
              <p className="font-body text-[11px] text-text-muted mt-0.5">Tap controls below • Screen will stay on</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back button */}
      <Link
        href="/"
        className="absolute top-4 left-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-[#080814]/60 backdrop-blur-md text-text-muted hover:text-text-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
      </Link>

      {/* Pulse Rings */}
      <div className="relative flex items-center justify-center">
        {/* Outer ring */}
        <motion.div
          key={`outer-${current.id}`}
          className="absolute rounded-full border border-pulse/10"
          style={{
            width: '300px',
            height: '300px',
          }}
          animate={{
            scale: [getBpmRingScale(current.bpm), 1.1],
            opacity: [0.3, 0],
            borderWidth: ['2px', '0.5px'],
          }}
          transition={{
            duration: pulseInterval,
            repeat: isPlaying ? Infinity : 0,
            ease: 'easeOut',
          }}
        />

        {/* Middle ring */}
        <motion.div
          key={`mid-${current.id}`}
          className="absolute rounded-full"
          style={{
            width: '250px',
            height: '250px',
            borderColor: bpmColor,
            borderWidth: '1.5px',
          }}
          animate={{
            scale: [0.95, 1.05],
            opacity: [0.5, 0.1],
          }}
          transition={{
            duration: pulseInterval,
            repeat: isPlaying ? Infinity : 0,
            ease: 'easeInOut',
          }}
        />

        {/* Inner ring */}
        <motion.div
          key={`inner-${current.id}`}
          className="absolute rounded-full border border-pulse/20"
          style={{
            width: '200px',
            height: '200px',
          }}
          animate={{
            scale: [0.9, 1.08],
            opacity: [0.6, 0.1],
          }}
          transition={{
            duration: pulseInterval,
            repeat: isPlaying ? Infinity : 0,
            ease: 'easeInOut',
            delay: pulseInterval * 0.25,
          }}
        />

        {/* BPM Display */}
        <motion.div
          key={`bpm-${current.id}`}
          className="relative z-10 flex flex-col items-center justify-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.span
            className="font-display font-bold tabular-nums"
            style={{
              fontSize: 'clamp(80px, 20vw, 120px)',
              color: bpmColor,
              lineHeight: 1,
            }}
            animate={{
              scale: isPlaying ? [1, 1.03, 1] : 1,
            }}
            transition={{
              duration: pulseInterval,
              repeat: isPlaying ? Infinity : 0,
              ease: 'easeInOut',
            }}
          >
            {current.bpm}
          </motion.span>
          <span className="font-display text-xs tracking-[0.3em] text-text-muted mt-1">BPM</span>
          <span
            className="mt-1.5 rounded-full border px-3 py-0.5 font-display text-[10px] font-bold tracking-wider"
            style={{ borderColor: bpmColor, color: bpmColor }}
          >
            {bpmLabel}
          </span>
        </motion.div>
      </div>

      {/* Now Playing */}
      <div className="mt-8 text-center px-6 max-w-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <h2 className="font-display text-xl font-bold text-text-primary truncate">
              {current.title}
            </h2>
            <p className="font-body text-sm text-text-secondary mt-1">
              {current.artist}
            </p>
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
        {/* Prev */}
        <button
          onClick={prev}
          className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full border border-border bg-[#080814]/60 backdrop-blur-md text-text-muted hover:text-text-primary hover:border-pulse/30 transition-all active:scale-90"
          aria-label="Previous track"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* Play/Pause */}
        <motion.button
          onClick={() => setIsPlaying(!isPlaying)}
          whileTap={{ scale: 0.9 }}
          className="flex h-16 w-16 md:h-18 md:w-18 items-center justify-center rounded-full border-2 bg-[#080814]/80 backdrop-blur-md transition-all active:scale-90"
          style={{ borderColor: bpmColor, color: bpmColor }}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause className="h-7 w-7" />
          ) : (
            <Play className="h-7 w-7 ml-1" />
          )}
        </motion.button>

        {/* Next */}
        <button
          onClick={next}
          className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full border border-border bg-[#080814]/60 backdrop-blur-md text-text-muted hover:text-text-primary hover:border-pulse/30 transition-all active:scale-90"
          aria-label="Next track"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Queue indicator */}
      <div className="mt-8 flex items-center gap-2">
        <div className="flex items-center gap-1">
          {songs.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setIndex(i)}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === index ? '20px' : '6px',
                backgroundColor: i === index
                  ? bpmColor
                  : s.audio_url
                    ? 'rgb(255,255,255,0.2)'
                    : 'rgb(255,255,255,0.06)',
                opacity: s.audio_url ? 1 : 0.5,
              }}
              aria-label={`Go to ${s.title}`}
            />
          ))}
        </div>
      </div>

      {/* Song Count */}
      <p className="mt-4 font-display text-[11px] text-text-muted tracking-wider">
        {index + 1} / {songs.length}
        {!current.audio_url && <span className="ml-2 text-alert">— No audio yet</span>}
      </p>

      {/* Tip at bottom */}
      <p className="absolute bottom-6 font-body text-[10px] text-text-muted opacity-50">
        Tip: Match your steps to the flashing BPM
      </p>
    </div>
  );
}
