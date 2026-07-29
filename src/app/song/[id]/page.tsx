'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Music, Flame, Footprints, Smile, Clock, Disc, Share2, Check } from 'lucide-react';
import { cn, getBpmHeatClass, getBpmLabel } from '@/lib/utils';
import type { Song } from '@/components/SongCard';

const SAMPLE_SONGS: Song[] = [
  { id: '1', spotify_id: 'd1', title: '夜曲 (Nocturne)', artist: 'Jay Chou', album: "November's Chopin", album_art_url: null, bpm: 168.2, release_year: 2005, language: 'zh', genres: ['Mandopop', 'Pop'], duration_ms: 222000, energy: 0.72, danceability: 0.45, valence: 0.38, preview_url: null },
  { id: '2', spotify_id: 'd2', title: '晴天 (Sunny Day)', artist: 'Jay Chou', album: 'Yeh Hui-mei', album_art_url: null, bpm: 165.0, release_year: 2003, language: 'zh', genres: ['Mandopop', 'Pop'], duration_ms: 269000, energy: 0.68, danceability: 0.52, valence: 0.41, preview_url: null },
  { id: '3', spotify_id: 'd3', title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', album_art_url: null, bpm: 171.0, release_year: 2020, language: 'en', genres: ['Pop', 'Electronic'], duration_ms: 200000, energy: 0.80, danceability: 0.50, valence: 0.38, preview_url: null },
  { id: '4', spotify_id: 'd4', title: 'Take On Me', artist: 'a-ha', album: 'Hunting High and Low', album_art_url: null, bpm: 169.0, release_year: 1985, language: 'en', genres: ['Pop', 'Rock'], duration_ms: 225000, energy: 0.86, danceability: 0.57, valence: 0.85, preview_url: null },
  { id: '5', spotify_id: 'd5', title: '稻香 (Rice Aroma)', artist: 'Jay Chou', album: 'Capricorn', album_art_url: null, bpm: 162.0, release_year: 2008, language: 'zh', genres: ['Mandopop'], duration_ms: 223000, energy: 0.55, danceability: 0.60, valence: 0.72, preview_url: null },
  { id: '6', spotify_id: 'd6', title: '簡單愛 (Simple Love)', artist: 'Jay Chou', album: 'Fantasy', album_art_url: null, bpm: 169.0, release_year: 2001, language: 'zh', genres: ['Mandopop', 'Pop'], duration_ms: 270000, energy: 0.62, danceability: 0.48, valence: 0.65, preview_url: null },
  { id: '7', spotify_id: 'd7', title: "Don't Stop Believin'", artist: 'Journey', album: 'Escape', album_art_url: null, bpm: 160.0, release_year: 1981, language: 'en', genres: ['Rock'], duration_ms: 251000, energy: 0.74, danceability: 0.49, valence: 0.33, preview_url: null },
  { id: '8', spotify_id: 'd8', title: 'Running Up That Hill', artist: 'Kate Bush', album: 'Hounds of Love', album_art_url: null, bpm: 165.0, release_year: 1985, language: 'en', genres: ['Pop', 'Rock'], duration_ms: 298000, energy: 0.56, danceability: 0.63, valence: 0.20, preview_url: null },
];

// Audio feature bar component
function FeatureBar({ label, value, icon: Icon, color }: { label: string; value: number; icon: React.ComponentType<{ className?: string }>; color: string }) {
  const pct = Math.round(value * 100);
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-display text-[11px] font-medium text-text-muted">
          <Icon className="h-3 w-3" />
          {label}
        </span>
        <span className="font-display text-[11px] font-bold text-text-secondary">{pct}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-surface">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className={cn('h-full rounded-full', color)}
        />
      </div>
    </div>
  );
}

export default function SongDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [song, setSong] = useState<Song | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const found = SAMPLE_SONGS.find((s) => s.id === id) || SAMPLE_SONGS[0];
    setSong(found);

    // Check localStorage favorites
    try {
      const saved = JSON.parse(localStorage.getItem('cadence_favorites') || '[]');
      setIsFavorited(saved.includes(found.id));
    } catch { /* ignore */ }
  }, [id]);

  const toggleFavorite = () => {
    if (!song) return;
    try {
      const saved = JSON.parse(localStorage.getItem('cadence_favorites') || '[]');
      let updated: string[];
      if (saved.includes(song.id)) {
        updated = saved.filter((sid: string) => sid !== song.id);
      } else {
        updated = [...saved, song.id];
      }
      localStorage.setItem('cadence_favorites', JSON.stringify(updated));
      setIsFavorited(!isFavorited);
    } catch { /* ignore */ }
  };

  const shareLink = async () => {
    const url = `${window.location.origin}/song/${id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: show URL in a prompt
      prompt('Copy this link:', url);
    }
  };

  if (!song) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-3 w-3 rounded-full bg-pulse/40 animate-bpm-pulse" />
      </div>
    );
  }

  const durationMin = Math.floor((song.duration_ms || 0) / 60000);
  const durationSec = Math.floor(((song.duration_ms || 0) % 60000) / 1000);
  const heatClass = getBpmHeatClass(song.bpm);
  const isPeak = heatClass === 'bpm-peak';
  const isZone = heatClass === 'bpm-zone';

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border px-4 md:px-6 glass-safe">
        <Link href="/" className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors">
          <ArrowLeft className="h-5 w-5" />
          <span className="font-display text-sm font-medium">Back</span>
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={shareLink}
            className={cn(
              'flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-display text-xs font-medium transition-all active:scale-95 border',
              copied
                ? 'bg-surge/10 text-surge border-surge/20'
                : 'border-border text-text-muted hover:text-surge'
            )}
            aria-label="Share link"
          >
            {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
            {copied ? 'Copied!' : 'Share'}
          </button>
          <button
            onClick={toggleFavorite}
            className={cn(
              'flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-display text-xs font-medium transition-all active:scale-95',
              isFavorited
                ? 'bg-alert/10 text-alert border border-alert/20'
                : 'border border-border text-text-muted hover:text-alert'
            )}
          >
            <Heart className={cn('h-4 w-4', isFavorited && 'fill-current')} />
            {isFavorited ? 'Saved' : 'Save'}
          </button>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 pt-8 pb-24 md:pb-12">
        {/* Album Art + BPM Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-8"
        >
          {/* Album Art Placeholder */}
          <div className="mx-auto mb-6 flex h-48 w-48 md:h-64 md:w-64 items-center justify-center rounded-3xl bg-gradient-to-br from-surge/20 via-pulse/10 to-alert/10 border border-border shadow-2xl shadow-pulse/5">
            <Music className="h-16 w-16 text-surge/40" />
          </div>

          {/* BPM Badge */}
          <div className="absolute top-4 right-4 md:top-8 md:right-8">
            <div className={cn(
              'flex flex-col items-center rounded-2xl border bg-surface/90 backdrop-blur-xl px-5 py-3',
              isPeak ? 'border-pulse/30' :
              isZone ? 'border-alert/20' :
              'border-border'
            )}>
              <span className={cn(
                'font-display text-4xl md:text-5xl font-bold tabular-nums',
                isPeak ? 'text-pulse drop-shadow-[0_0_12px_rgba(163,255,18,0.3)] animate-bpm-pulse' :
                isZone ? 'text-alert' :
                'text-text-primary'
              )}>
                {song.bpm}
              </span>
              <span className="mt-1 font-display text-[10px] font-semibold uppercase tracking-widest text-text-muted">
                BPM
              </span>
              <span className={cn(
                'mt-1 font-display text-[9px] font-medium',
                isPeak ? 'text-pulse' :
                isZone ? 'text-alert' :
                'text-text-muted'
              )}>
                {getBpmLabel(song.bpm)}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Song Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-8"
        >
          <h1 className="font-display text-2xl md:text-3xl font-bold text-text-primary mb-2">
            {song.title}
          </h1>
          <p className="font-body text-lg text-text-secondary">{song.artist}</p>
          {song.album && (
            <p className="mt-1 font-body text-sm text-text-muted">{song.album} · {song.release_year}</p>
          )}
        </motion.div>

        {/* Meta Chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {song.genres?.map((genre) => (
            <span key={genre} className="rounded-full border border-surge/15 bg-surge/5 px-3 py-1 font-display text-[11px] font-medium text-surge">
              {genre}
            </span>
          ))}
          <span className="rounded-full border border-border bg-surface/50 px-3 py-1 font-display text-[11px] font-medium text-text-muted">
            {song.language === 'zh' ? '🇨🇳 Chinese' : '🇬🇧 English'}
          </span>
          <span className="rounded-full border border-border bg-surface/50 px-3 py-1 font-display text-[11px] font-medium text-text-muted">
            <Clock className="inline h-3 w-3 mr-1" />
            {durationMin}:{String(durationSec).padStart(2, '0')}
          </span>
        </motion.div>

        {/* Audio Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-border bg-surface/30 backdrop-blur-sm p-6 mb-6"
        >
          <h3 className="font-display text-sm font-bold text-text-primary mb-5 flex items-center gap-2">
            <Disc className="h-4 w-4 text-surge" />
            Audio Profile
          </h3>
          <div className="space-y-4">
            <FeatureBar label="Energy" value={song.energy || 0} icon={Flame} color="bg-gradient-to-r from-alert to-pulse" />
            <FeatureBar label="Danceability" value={song.danceability || 0} icon={Footprints} color="bg-gradient-to-r from-surge to-pulse" />
            <FeatureBar label="Valence (Mood)" value={song.valence || 0} icon={Smile} color="bg-gradient-to-r from-surge to-alert" />
          </div>
        </motion.div>

        {/* Cadence Match */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-2xl border border-pulse/10 bg-pulse/5 p-6 text-center"
        >
          <p className="font-display text-sm font-bold text-pulse mb-1">
            🏃 {Math.round(song.bpm)} steps per minute
          </p>
          <p className="font-body text-xs text-text-secondary">
            This song matches a {getBpmLabel(song.bpm)} cadence — perfect for tempo runs and race pace.
          </p>
        </motion.div>
      </div>
    </>
  );
}
