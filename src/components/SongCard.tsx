'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { cn, getBpmHeatClass, getBpmLabel } from '@/lib/utils';
import { useState } from 'react';

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

  const formatDuration = (ms?: number) => {
    if (!ms) return '';
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const langFlag = song.language === 'zh' ? '🇨🇳' : song.language === 'en' ? '🇬🇧' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -2 }}
      className="group relative cursor-pointer overflow-hidden rounded-xl border border-border bg-surface/60 p-3 backdrop-blur-md transition-all duration-300 hover:border-border-hover hover:shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(0,212,255,0.1)]"
    >
      {/* Hover glow */}
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-radial-gradient opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Album Art */}
      <div className="relative mb-3 aspect-square overflow-hidden rounded-lg">
        {imgError || !song.album_art_url ? (
          <div className="flex h-full w-full items-center justify-center bg-elevated">
            <div className="text-center">
              <div className="text-3xl">🎵</div>
              <div className="mt-1 font-display text-xs font-bold text-pulse">
                {song.bpm} BPM
              </div>
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

        {/* BPM Badge — appears on hover */}
        <div className="absolute bottom-2 right-2 z-10 translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <span
            className={cn(
              'inline-flex items-center gap-1 rounded-md px-2 py-1 font-display text-xs font-bold backdrop-blur-md',
              getBpmHeatClass(song.bpm) === 'bpm-peak' &&
                'border border-pulse/30 bg-pulse/10 text-pulse animate-bpm-pulse',
              getBpmHeatClass(song.bpm) === 'bpm-zone' &&
                'border border-warm/30 bg-warm/10 text-warm',
              getBpmHeatClass(song.bpm) === 'bpm-easy' &&
                'border border-alert/30 bg-alert/10 text-alert'
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
      {onFavorite && (
        <motion.button
          whileTap={{ scale: 1.2 }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onFavorite(song.id);
          }}
          className="absolute right-3 top-3 z-10 rounded-full p-1.5 opacity-0 backdrop-blur-md transition-all duration-200 group-hover:opacity-100 bg-surface/80 hover:bg-surface"
        >
          <Heart
            className={cn(
              'h-4 w-4 transition-colors',
              isFavorited
                ? 'fill-alert text-alert'
                : 'text-text-secondary hover:text-alert'
            )}
          />
        </motion.button>
      )}
    </motion.div>
  );
}
