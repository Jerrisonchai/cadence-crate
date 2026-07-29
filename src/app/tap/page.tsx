'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Zap, Circle } from 'lucide-react';

const PULSE_COLOR = '#A3FF12';

export default function TapPage() {
  const [bpm, setBpm] = useState<number | null>(null);
  const [taps, setTaps] = useState<number[]>([]);
  const [state, setState] = useState<'idle' | 'tapping' | 'result'>('idle');
  const [averageBpm, setAverageBpm] = useState<number | null>(null);
  const [beatFlash, setBeatFlash] = useState(false);
  const lastTapRef = useRef<number>(0);
  const tapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pulseRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Reset after 3 seconds of no taps
  const scheduleReset = useCallback(() => {
    if (tapTimeoutRef.current) clearTimeout(tapTimeoutRef.current);
    tapTimeoutRef.current = setTimeout(() => {
      if (taps.length > 1) {
        setState('result');
      }
    }, 2500);
  }, [taps.length]);

  const handleTap = useCallback(() => {
    const now = performance.now();
    setBeatFlash(true);
    setTimeout(() => setBeatFlash(false), 100);

    if (tapTimeoutRef.current) clearTimeout(tapTimeoutRef.current);

    if (state === 'idle') {
      setState('tapping');
      setTaps([now]);
      lastTapRef.current = now;
      return;
    }

    const interval = now - lastTapRef.current;
    lastTapRef.current = now;

    // Ignore taps faster than 300ms (200 BPM max) or slower than 2s (30 BPM min)
    if (interval < 300 || interval > 2000) {
      // Reset if it's been too long
      if (interval > 3000) {
        setTaps([now]);
        setBpm(null);
      }
      scheduleReset();
      return;
    }

    const instantBpm = 60000 / interval;
    const roundedBpm = Math.round(instantBpm);

    setTaps((prev) => {
      const newTaps = [...prev, now];
      // Keep last 16 taps
      const recent = newTaps.slice(-16);

      // Calculate average from intervals
      if (recent.length >= 2) {
        const intervals: number[] = [];
        for (let i = 1; i < recent.length; i++) {
          intervals.push(recent[i] - recent[i - 1]);
        }
        const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
        const avgBpm = Math.round(60000 / avgInterval);
        setBpm(avgBpm);
      }

      return newTaps;
    });

    setBpm(roundedBpm);
    scheduleReset();
  }, [state, scheduleReset]);

  // Visual pulse for the BPM display
  useEffect(() => {
    if (!bpm || state !== 'tapping') return;
    if (pulseRef.current) clearInterval(pulseRef.current);
    const intervalMs = (60 / bpm) * 1000;
    pulseRef.current = setInterval(() => {
      setBeatFlash(true);
      setTimeout(() => setBeatFlash(false), 100);
    }, intervalMs);
    return () => { if (pulseRef.current) clearInterval(pulseRef.current); };
  }, [bpm, state]);

  // When transitioning to 'result', calculate average
  useEffect(() => {
    if (state === 'result' && taps.length >= 2) {
      const intervals: number[] = [];
      for (let i = 1; i < taps.length; i++) {
        intervals.push(taps[i] - taps[i - 1]);
      }
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const avgBpm = Math.round(60000 / avgInterval);
      setAverageBpm(avgBpm);

      // Auto-reset after 8 seconds
      const t = setTimeout(() => reset(), 8000);
      return () => clearTimeout(t);
    }
  }, [state, taps]);

  const reset = () => {
    setBpm(null);
    setTaps([]);
    setState('idle');
    setAverageBpm(null);
    setBeatFlash(false);
    if (tapTimeoutRef.current) clearTimeout(tapTimeoutRef.current);
    if (pulseRef.current) clearInterval(pulseRef.current);
  };

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

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050510] overflow-hidden select-none">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(163,255,18,0.03)_0%,transparent_70%)]" />

      {/* Back */}
      <Link
        href="/"
        className="absolute top-4 left-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-[#080814]/60 backdrop-blur-md text-text-muted hover:text-text-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
      </Link>

      {/* Main Area */}
      <AnimatePresence mode="wait">
        {state === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full border-2 border-pulse/20 bg-pulse/5"
            >
              <Zap className="h-10 w-10 text-pulse" />
            </motion.div>
            <h2 className="font-display text-2xl text-text-primary mb-2">BPM Tap Tool</h2>
            <p className="font-body text-sm text-text-muted max-w-xs">
              Tap the button to the beat of any song. We'll calculate the BPM.
            </p>
            <p className="font-display text-[10px] text-text-muted/50 mt-3">
              Pro tip: Tap on every downbeat for best accuracy
            </p>
          </motion.div>
        )}

        {state === 'tapping' && bpm !== null && (
          <motion.div
            key="tapping"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            {/* BPM Display */}
            <motion.div
              animate={beatFlash ? { scale: 1.15 } : { scale: 1 }}
              transition={{ duration: 0.08 }}
              className="relative inline-flex items-center justify-center"
            >
              <div
                className="absolute inset-0 rounded-full opacity-20"
                style={{
                  background: `radial-gradient(circle, ${getBpmColor(bpm)} 0%, transparent 70%)`,
                  transform: beatFlash ? 'scale(1.3)' : 'scale(1)',
                  transition: 'transform 0.1s ease-out',
                }}
              />
              <span
                className="font-display text-[96px] leading-none tabular-nums"
                style={{
                  color: getBpmColor(bpm),
                  textShadow: `0 0 40px ${getBpmColor(bpm)}40`,
                }}
              >
                {bpm}
              </span>
            </motion.div>

            <div className="mt-1">
              <span
                className="rounded-full border px-3 py-0.5 font-display text-[10px] font-bold tracking-wider"
                style={{ borderColor: getBpmColor(bpm), color: getBpmColor(bpm) }}
              >
                {getBpmLabel(bpm)}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-center gap-1">
              {taps.slice(-12).map((_, i) => {
                const color = bpmInRange ? '#A3FF12' : '#F59E0B';
                return (
                  <motion.div
                    key={i}
                    initial={{ scaleY: 0.3 }}
                    animate={{ scaleY: 1 }}
                    className="h-4 w-1 rounded-full"
                    style={{ backgroundColor: color, opacity: 0.2 + (i / 12) * 0.8 }}
                  />
                );
              })}
            </div>

            <p className="font-body text-sm text-text-muted mt-3">
              Keep tapping... · {taps.length} taps
            </p>
          </motion.div>
        )}

        {state === 'result' && averageBpm !== null && (
          <motion.div
            key="result"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <span
              className="font-display text-[72px] leading-none tabular-nums"
              style={{
                color: getBpmColor(averageBpm),
                textShadow: `0 0 40px ${getBpmColor(averageBpm)}40`,
              }}
            >
              {averageBpm}
            </span>
            <span className="font-display text-2xl text-text-muted ml-2">BPM</span>

            <div className="mt-2">
              <span
                className="rounded-full border px-3 py-0.5 font-display text-[11px] font-bold tracking-wider"
                style={{ borderColor: getBpmColor(averageBpm), color: getBpmColor(averageBpm) }}
              >
                {getBpmLabel(averageBpm)}
              </span>
            </div>

            {/* Tap consistency meter */}
            <div className="mt-4 flex items-center gap-2 justify-center">
              <span className="font-display text-[10px] text-text-muted tracking-wider">
                {taps.length} TAPS
              </span>
            </div>

            {/* Tap intervals */}
            <div className="mt-3 flex items-end justify-center gap-1 max-w-[280px] mx-auto">
              {(() => {
                const intervals: number[] = [];
                for (let i = 1; i < taps.length; i++) {
                  intervals.push(60000 / (taps[i] - taps[i - 1]));
                }
                const maxVal = Math.max(...intervals, 200);
                const minVal = Math.min(...intervals, 60);
                return intervals.map((ibpm, i) => {
                  const height = ((ibpm - minVal) / (maxVal - minVal)) * 40 + 4;
                  const isTarget = ibpm >= 160 && ibpm <= 170;
                  return (
                    <div key={i} className="flex flex-col items-center gap-0.5">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                        className="w-1.5 rounded-full"
                        style={{
                          backgroundColor: isTarget ? '#A3FF12' : 'rgb(255,255,255,0.15)',
                        }}
                      />
                      <span className="font-display text-[7px] text-text-muted/40 tabular-nums">
                        {Math.round(ibpm)}
                      </span>
                    </div>
                  );
                });
              })()}
            </div>

            <p className="font-body text-xs text-text-muted mt-3">
              {bpmInRange
                ? '✅ Perfect cadence! 160-170 BPM is the runner sweet spot.'
                : averageBpm < 160
                  ? '⬇️ Below target cadence range (160-170)'
                  : '⬆️ Above target cadence range (160-170)'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tap Button */}
      <motion.button
        onClick={handleTap}
        whileTap={{ scale: 0.9 }}
        className="absolute bottom-24 flex h-20 w-20 items-center justify-center rounded-full border-2 border-pulse/30 bg-pulse/10 text-pulse shadow-[0_0_30px_rgba(163,255,18,0.15)] active:shadow-[0_0_60px_rgba(163,255,18,0.3)] transition-shadow"
      >
        <Circle className={state === 'idle' ? 'h-8 w-8' : 'h-6 w-6'} fill="currentColor" />
      </motion.button>

      {/* Reset button when result */}
      {state === 'result' && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={reset}
          className="absolute bottom-44 font-display text-xs text-text-muted hover:text-text-primary transition-colors"
        >
          Tap to try again
        </motion.button>
      )}

      <p className="absolute bottom-32 font-display text-[10px] text-text-muted/40">
        {state === 'idle' ? 'Tap the circle to start' : 'Tap on every beat'}
      </p>

      {/* Version */}
      <span className="fixed bottom-[60px] left-1/2 -translate-x-1/2 z-50 font-display text-[9px] text-text-muted/30 select-none">
        v0.2.0
      </span>
    </div>
  );
}
