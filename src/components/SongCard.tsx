'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { cn, getBpmHeatClass } from '@/lib/utils';
import { useState, useEffect } from 'react';

export interface Song {
  id: string;
  spotify_id?: string | null;
  title: string;
  artist: string;
  album?: string;
  album_art_url?: string | null;
  bpm: number;
  release_year?: number | null;
  language?: string | null;
  genres?: string[] | null;
  duration_ms?: number | null;
  energy?: number | null;
  danceability?: number | null;
  valence?: number | null;
  preview_url?: string | null;
}

interface SongCardProps {
  song: Song;
  index: number;
  isFavorited?: boolean;
  onFavorite?: (id: string) => void;
}

export default function SongCard({ song, index, isFavorited, onFavorite }: SongCardProps) {
  const [imgError, setImgError] = useState(false);
  const [liked, setLiked] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('cadence_favorites') || '[]');
      setLiked(saved.includes(song.id));
    } catch { /* ignore */ }
  }, [song.id]);

  // Sync with prop
  useEffect(() => {
    if (isFavorited !== undefined) setLiked(isFavorited);
  }, [isFavorited]);

  const formatDuration = (ms?: number) => {
    if (!ms) return '';
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const langFlag = song.language === 'zh' ? '🇨🇳' : song.language === 'en' ? '🇬🇧' : '';

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const saved: string[] = JSON.parse(localStorage.getItem('cadence_favorites') || '[]');
      const updated = saved.includes(song.id)
        ? saved.filter((id) => id !== song.id)
        : [...saved, song.id];
      localStorage.setItem('cadence_favorites', JSON.stringify(updated));
      setLiked(!liked);
      onFavorite?.(song.id);
    } catch { /* ignore */ }
  };

  const heatClass = getBpmHeatClass(song.bpm);
  const isPeak = heatClass === 'bpm-peak';
  const isZone = heatClass === 'bpm-zone';

  return (
    <Link href={`/song/${song.id}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="group relative cursor-pointer overflow-hidden rounded-xl border border-border bg-surface/60 p-3 backdrop-blur-md transition-all duration-300 hover:border-border-hover hover:shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(0,212,255,0.1)] song-card"
      >
        {/* Hover glow */}
        <div className="pointer-events-none absolute inset-0 rounded-xl bg-radial-gradient opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Album Art */}
        <div className="relative mb-3 aspect-square overflow-hidden rounded-lg">
          {imgError || !song.album_art_url ? (
            <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-surge/10 via-pulse/5 to-alert/5">
              <div className="text-3xl">🎵</div>
              <div className={cn(
                'mt-1 font-display text-xs font-bold',
                isPeak ? 'text-pulse' :
                isZone ? 'text-alert' :
                'text-text-secondary'
              )}>
                {song.bpm} BPM
              </div>
            </div>
          ) : (
            <img
              src={song.album_art_url}
              alt={`${song.title} by ${song.artist}`}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          )}

          {/* BPM Badge — always visible on mobile, hover on desktop */}
          <div className="absolute bottom-2 right-2 z-10 md:translate-y-1 md:opacity-0 transition-all duration-300 md:group-hover:translate-y-0 md:group-hover:opacity-100">
            <span
              className={cn(
                'inline-flex items-center gap-1 rounded-md px-2 py-1 font-display text-xs font-bold backdrop-blur-md',
                isPeak &&
                  'border border-pulse/30 bg-pulse/10 text-pulse animate-bpm-pulse',
                isZone &&
                  'border border-alert/20 bg-alert/10 text-alert',
                !isPeak && !isZone &&
                  'border border-border bg-surface/70 text-text-secondary'
              )}
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
              {song.bpm} BPM
            </span>
          </div>
        </div>

        {/* Song Info */}
        <div>
          <h3 className="truncate font-body text-[15px] font-semibold text-text-primary leading-snug">
            {song.title}
          </h3>
          <p className="truncate font-body text-[13px] text-text-secondary mt-0.5">
            {song.artist}
          </p>
          <div className="mt-1.5 flex items-center gap-2 font-body text-[11px] text-text-muted">
            {song.release_year && <span>{song.release_year}</span>}
            {song.genres?.[0] && (
              <>
                <span>·</span>
                <span>{song.genres[0]}</span>
              </>
            )}
            {song.duration_ms && (
              <>
                <span>·</span>
                <span>{formatDuration(song.duration_ms)}</span>
              </>
            )}
            {langFlag && (
              <>
                <span>·</span>
                <span>{langFlag}</span>
              </>
            )}
          </div>
        </div>

        {/* Favorite Button */}
        <motion.button
          whileTap={{ scale: 1.2 }}
          onClick={handleFavorite}
          className="absolute right-3 top-3 z-10 rounded-full p-1.5 md:opacity-0 backdrop-blur-md transition-all duration-200 md:group-hover:opacity-100 bg-surface/80 hover:bg-surface active:scale-110"
          aria-label={liked ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            className={cn(
              'h-4 w-4 transition-colors',
              liked
                ? 'fill-alert text-alert drop-shadow-[0_0_6px_rgba(255,60,30,0.4)]'
                : 'text-text-secondary hover:text-alert'
            )}
          />
        </motion.button>
      </motion.div>
    </Link>
  );
}
