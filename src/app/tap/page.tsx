'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Zap, Circle, Play, Pause, ChevronRight } from 'lucide-react';
import { useMusicPlayer } from '@/context/MusicPlayerContext';

const PULSE_COLOR = '#A3FF12';
const BOTTOM_OFFSET = 120; // px from bottom — clears MobileNav (64px) + safe area

export default function TapPage() {
  const { state: player, controls, currentSong } = useMusicPlayer();
  const hasMusic = player.playlist.length > 0 && !!currentSong?.audio_url;
  const [bpm, setBpm] = useState<number | null>(null);
  const [taps, setTaps] = useState<number[]>([]);
  const [state, setState] = useState<'idle' | 'tapping' | 'result'>('idle');
  const [averageBpm, setAverageBpm] = useState<number | null>(null);
  const [beatFlash, setBeatFlash] = useState(false);

  // Refs avoid stale closures — they always hold the latest value
  const stateRef = useRef<'idle' | 'tapping' | 'result'>('idle');
  const tapsRef = useRef<number[]>([]);
  const lastTapRef = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pulseRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Keep refs in sync with state
  useEffect(() => { stateRef.current = state; }, [state]);
  useEffect(() => { tapsRef.current = taps; }, [taps]);

  const reset = useCallback(() => {
    setBpm(null);
    setTaps([]);
    setState('idle');
    setAverageBpm(null);
    setBeatFlash(false);
    stateRef.current = 'idle';
    tapsRef.current = [];
    if (timeoutRef.current) { clearTimeout(timeoutRef.current); timeoutRef.current = null; }
    if (pulseRef.current) { clearInterval(pulseRef.current); pulseRef.current = null; }
  }, []);

  const handleTap = useCallback(() => {
    const now = performance.now();
    // Ultra-short flash: fast enough even at 200+ BPM
    setBeatFlash(true);
    setTimeout(() => setBeatFlash(false), 40);

    // Clear any pending timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // First tap
    if (stateRef.current === 'idle') {
      setState('tapping');
      stateRef.current = 'tapping';
      setTaps([now]);
      tapsRef.current = [now];
      lastTapRef.current = now;
      return;
    }

    // Subsequent taps
    const interval = now - lastTapRef.current;
    lastTapRef.current = now;

    // Reject taps outside reasonable range
    if (interval < 250 || interval > 2500) {
      // If it's been >3s, start fresh
      if (interval > 3000) {
        setTaps([now]);
        tapsRef.current = [now];
        setBpm(null);
      }
      return;
    }

    const instantBpm = 60000 / interval;
    const roundedBpm = Math.round(instantBpm);

    setTaps((prev) => {
      const newTaps = [...prev, now].slice(-16); // keep last 16
      tapsRef.current = newTaps;

      if (newTaps.length >= 2) {
        let sum = 0;
        for (let i = 1; i < newTaps.length; i++) {
          sum += newTaps[i] - newTaps[i - 1];
        }
        const avg = Math.round(60000 / (sum / (newTaps.length - 1)));
        setBpm(avg);
      } else {
        setBpm(roundedBpm);
      }

      return newTaps;
    });

    // Schedule result transition after 2.5s of no taps
    timeoutRef.current = setTimeout(() => {
      if (tapsRef.current.length > 1) {
        setState('result');
        stateRef.current = 'result';
      }
    }, 2500);
  }, []);

  // Visual pulse synced to detected BPM
  useEffect(() => {
    if (!bpm || state !== 'tapping') return;
    if (pulseRef.current) clearInterval(pulseRef.current);
    const ms = (60 / bpm) * 1000;
    pulseRef.current = setInterval(() => {
      setBeatFlash(true);
      setTimeout(() => setBeatFlash(false), 100);
    }, ms);
    return () => {
      if (pulseRef.current) { clearInterval(pulseRef.current); pulseRef.current = null; }
    };
  }, [bpm, state]);

  // Calculate final average on result
  useEffect(() => {
    if (state !== 'result' || taps.length < 2) return;

    let sum = 0;
    for (let i = 1; i < taps.length; i++) {
      sum += taps[i] - taps[i - 1];
    }
    const avgBpm = Math.round(60000 / (sum / (taps.length - 1)));
    setAverageBpm(avgBpm);

    const t = setTimeout(() => reset(), 10000); // auto-reset after 10s
    return () => clearTimeout(t);
  }, [state]); // eslint-disable-line react-hooks/exhaustive-deps

  const getBpmColor = (val: number) => {
    if (val >= 168) return '#A3FF12';
    if (val >= 164) return '#F59E0B';
    if (val >= 160) return '#3B82F6';
    return '#EF4444';
  };

  const getBpmLabel = (val: number) => {
    if (val >= 168) return 'PEAK ZONE';
    if (val >= 164) return 'CADENCE ZONE';
    if (val >= 160) return 'TARGET ZONE';
    return 'OUTSIDE RANGE';
  };

  const bpmInRange = bpm !== null && bpm >= 160 && bpm <= 170;
  const avgInRange = averageBpm !== null && averageBpm >= 160 && averageBpm <= 170;

  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-[#050510] overflow-hidden select-none"
      style={{ touchAction: 'none' }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(163,255,18,0.04)_0%,transparent_70%)]" />

      {/* Back button */}
      <Link
        href="/"
        className="absolute top-4 left-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-[#080814]/60 backdrop-blur-md text-text-muted hover:text-text-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
      </Link>

      {/* Main content — centered above the button */}
      <div className="flex-1 flex flex-col items-center justify-center" style={{ paddingBottom: `calc(${BOTTOM_OFFSET}px + 5rem)` }}>
        <AnimatePresence mode="wait">
          {/* IDLE STATE */}
          {state === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center px-4"
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full border-2 border-pulse/20 bg-pulse/5"
              >
                <Zap className="h-10 w-10 text-pulse" />
              </motion.div>
              <h2 className="font-display text-2xl text-text-primary mb-2">BPM Tap Tool</h2>
              <p className="font-body text-sm text-text-muted max-w-xs mx-auto">
                Play a song, tap the circle to the beat. We'll calculate the BPM.
              </p>
              <p className="font-display text-[10px] text-text-muted/50 mt-3">
                Tip: Tap every downbeat for best accuracy
              </p>
            </motion.div>
          )}

          {/* TAPPING STATE */}
          {state === 'tapping' && bpm !== null && (
            <motion.div
              key="tapping"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center px-4"
            >
              <motion.div
                animate={beatFlash ? { scale: 1.12 } : { scale: 1 }}
                transition={{ duration: 0.06 }}
                className="relative inline-flex items-center justify-center"
              >
                <div
                  className="absolute -inset-8 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${getBpmColor(bpm)}33 0%, transparent 70%)`,
                    transform: beatFlash ? 'scale(1.25)' : 'scale(1)',
                    transition: 'transform 0.1s ease-out',
                  }}
                />
                <span
                  className="font-display text-[80px] sm:text-[96px] leading-none tabular-nums"
                  style={{
                    color: getBpmColor(bpm),
                    textShadow: `0 0 40px ${getBpmColor(bpm)}66`,
                  }}
                >
                  {bpm}
                </span>
              </motion.div>

              <div className="mt-1">
                <span
                  className="inline-block rounded-full border px-3 py-0.5 font-display text-[10px] font-bold tracking-wider"
                  style={{ borderColor: getBpmColor(bpm), color: getBpmColor(bpm) }}
                >
                  {getBpmLabel(bpm)}
                </span>
              </div>

              {/* Tap bar indicators */}
              <div className="mt-3 flex items-center justify-center gap-0.5">
                {taps.slice(-16).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scaleY: 0.3 }}
                    animate={{ scaleY: 1 }}
                    className="h-4 w-1 rounded-full"
                    style={{
                      backgroundColor: bpmInRange ? '#A3FF12' : '#F59E0B',
                      opacity: 0.15 + (i / 16) * 0.85,
                    }}
                  />
                ))}
              </div>

              <p className="font-body text-sm text-text-muted mt-3">
                Keep tapping... · {taps.length} taps
              </p>
            </motion.div>
          )}

          {/* RESULT STATE */}
          {state === 'result' && averageBpm !== null && (
            <motion.div
              key="result"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center px-4"
            >
              <span
                className="font-display text-[64px] sm:text-[72px] leading-none tabular-nums"
                style={{
                  color: getBpmColor(averageBpm),
                  textShadow: `0 0 40px ${getBpmColor(averageBpm)}66`,
                }}
              >
                {averageBpm}
              </span>
              <span className="font-display text-2xl text-text-muted ml-2">BPM</span>

              <div className="mt-2">
                <span
                  className="inline-block rounded-full border px-3 py-0.5 font-display text-[11px] font-bold tracking-wider"
                  style={{ borderColor: getBpmColor(averageBpm), color: getBpmColor(averageBpm) }}
                >
                  {getBpmLabel(averageBpm)}
                </span>
              </div>

              <p className="font-body text-sm text-text-muted mt-3">
                {avgInRange ? '🎯 Perfect cadence! Ready for your running playlist.'
                  : averageBpm < 160 ? '⬇️ Below target range (160-170 BPM)'
                  : '⬆️ Above target range (160-170 BPM)'}
              </p>

              <p className="font-body text-xs text-text-muted/60 mt-2">
                Based on {taps.length} taps — auto-resets in 10s
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- Mini Music Player (only on Tap page) --- */}
      {hasMusic && currentSong && (
        <div
          className="absolute left-4 right-4 flex items-center gap-3 rounded-xl border border-border bg-[#080814]/90 backdrop-blur-xl px-3 py-2.5"
          style={{ bottom: `${BOTTOM_OFFSET + 85}px` }}
        >
          {/* Now playing indicator */}
          <div className="flex-shrink-0">
            {player.isPlaying ? (
              <span className="flex items-center gap-[2px] h-3">
                <span className="w-[2px] bg-pulse rounded-full animate-bpm-pulse" style={{ height: '8px', animationDelay: '0ms' }} />
                <span className="w-[2px] bg-pulse rounded-full animate-bpm-pulse" style={{ height: '12px', animationDelay: '150ms' }} />
                <span className="w-[2px] bg-pulse rounded-full animate-bpm-pulse" style={{ height: '6px', animationDelay: '300ms' }} />
              </span>
            ) : (
              <span className="flex items-center gap-[2px] h-3 opacity-30">
                <span className="w-[2px] bg-text-muted rounded-full" style={{ height: '8px' }} />
                <span className="w-[2px] bg-text-muted rounded-full" style={{ height: '12px' }} />
                <span className="w-[2px] bg-text-muted rounded-full" style={{ height: '6px' }} />
              </span>
            )}
          </div>

          {/* Song info */}
          <div className="flex-1 min-w-0">
            <p className="font-display text-[11px] font-medium text-text-primary truncate">{currentSong.title}</p>
            <p className="font-body text-[10px] text-text-muted truncate">{currentSong.artist} • {currentSong.bpm} BPM</p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={controls.togglePlay}
              className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-surface/50 transition-colors"
              aria-label={player.isPlaying ? 'Pause' : 'Play'}
            >
              {player.isPlaying ? (
                <Pause className="h-4 w-4 text-pulse" />
              ) : (
                <Play className="h-4 w-4 text-pulse ml-0.5" />
              )}
            </button>
            <button
              onClick={controls.next}
              className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-surface/50 transition-colors"
              aria-label="Next track"
            >
              <ChevronRight className="h-4 w-4 text-text-muted" />
            </button>
          </div>
        </div>
      )}

      {/* Tap button — ultra-fast animation for rapid tapping */}
      <motion.button
        onClick={handleTap}
        whileTap={{ scale: 0.85 }}
        transition={{ type: 'spring', stiffness: 800, damping: 40, mass: 0.3 }}
        className="absolute flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 border-pulse/30 bg-pulse/10 text-pulse shadow-[0_0_40px_rgba(163,255,18,0.12)] active:shadow-[0_0_60px_rgba(163,255,18,0.3)] transition-shadow"
        style={{ bottom: `${BOTTOM_OFFSET}px` }}
      >
        <Circle className={state === 'idle' ? 'h-8 w-8' : 'h-6 w-6'} fill="currentColor" />
      </motion.button>

      {/* Hint above button */}
      <p
        className="absolute font-display text-[10px] text-text-muted/40"
        style={{ bottom: `${BOTTOM_OFFSET + 80}px` }}
      >
        {state === 'idle' ? 'Tap to start' : state === 'tapping' ? 'Tap every beat' : ''}
      </p>

      {/* Try again when on result */}
      {state === 'result' && (
        <motion.button
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={reset}
          className="absolute font-display text-xs text-text-muted hover:text-text-primary transition-colors"
          style={{ bottom: `${BOTTOM_OFFSET + 95}px` }}
        >
          Tap again
        </motion.button>
      )}
    </div>
  );
}
