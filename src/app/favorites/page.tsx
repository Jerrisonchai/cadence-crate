'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Heart, Trash2, GripVertical, Footprints } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn, getBpmHeatClass } from '@/lib/utils';

// Song type — compatible with shared catalog
interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  bpm: number;
  release_year?: number;
  year?: number;
  language: string;
  genres: string[];
  duration_ms?: number;
  energy?: number;
  danceability?: number;
  valence?: number;
  audio_url?: string;
}

const ALL_SONGS: Song[] = [
  { id: '1', title: '夜曲 (Nocturne)', artist: 'Jay Chou', album: "November's Chopin", bpm: 168, release_year: 2005, year: 2005, language: 'zh', genres: ['Mandopop', 'Pop'], duration_ms: 222000, energy: 0.72, danceability: 0.45, valence: 0.38, audio_url: '/audio/1.mp3' },
  { id: '2', title: '晴天 (Sunny Day)', artist: 'Jay Chou', album: 'Yeh Hui-mei', bpm: 165, release_year: 2003, year: 2003, language: 'zh', genres: ['Mandopop', 'Pop'], duration_ms: 269000, energy: 0.68, danceability: 0.52, valence: 0.41, audio_url: '/audio/2.mp3' },
  { id: '3', title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', bpm: 171, release_year: 2020, year: 2020, language: 'en', genres: ['Pop', 'Electronic'], duration_ms: 200000, energy: 0.80, danceability: 0.50, valence: 0.38, audio_url: '/audio/3.mp3' },
  { id: '4', title: 'Take On Me', artist: 'a-ha', album: 'Hunting High and Low', bpm: 169, release_year: 1985, year: 1985, language: 'en', genres: ['Pop', 'Rock'], duration_ms: 225000, energy: 0.86, danceability: 0.57, valence: 0.85, audio_url: '/audio/4.mp3' },
  { id: '5', title: '稻香 (Rice Aroma)', artist: 'Jay Chou', album: 'Capricorn', bpm: 162, release_year: 2008, year: 2008, language: 'zh', genres: ['Mandopop'], duration_ms: 223000, energy: 0.55, danceability: 0.60, valence: 0.72, audio_url: '/audio/5.mp3' },
  { id: '6', title: '簡單愛 (Simple Love)', artist: 'Jay Chou', album: 'Fantasy', bpm: 169, release_year: 2001, year: 2001, language: 'zh', genres: ['Mandopop', 'Pop'], duration_ms: 270000, energy: 0.62, danceability: 0.48, valence: 0.65, audio_url: '/audio/6.mp3' },
  { id: '7', title: "Don't Stop Believin'", artist: 'Journey', album: 'Escape', bpm: 160, release_year: 1981, year: 1981, language: 'en', genres: ['Rock'], duration_ms: 251000, energy: 0.74, danceability: 0.49, valence: 0.33, audio_url: '/audio/7.mp3' },
  { id: '8', title: 'Running Up That Hill', artist: 'Kate Bush', album: 'Hounds of Love', bpm: 165, release_year: 1985, year: 1985, language: 'en', genres: ['Pop', 'Rock'], duration_ms: 298000, energy: 0.56, danceability: 0.63, valence: 0.20, audio_url: '/audio/8.mp3' },
];

// Map ID → Song for fast lookup
const SONG_MAP: Record<string, Song> = {};
ALL_SONGS.forEach((s) => { SONG_MAP[s.id] = s; });

function getBpmColor(bpm: number) {
  if (bpm >= 168) return '#A3FF12';
  if (bpm >= 164) return '#F59E0B';
  return '#EF4444';
}

function getBpmLabel(bpm: number) {
  if (bpm >= 168) return 'PEAK';
  if (bpm >= 164) return 'ZONE';
  return 'BASE';
}

// --- Sortable Song Card ---

function SortableSongCard({ song, index, onRemove }: {
  song: Song;
  index: number;
  onRemove: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: song.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : 1,
  };

  const bpmColor = getBpmColor(song.bpm);
  const bpmLabel = getBpmLabel(song.bpm);
  const year = song.release_year || song.year;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'relative rounded-2xl border border-border bg-surface/40 backdrop-blur-sm overflow-hidden transition-shadow',
        isDragging && 'shadow-2xl shadow-pulse/20 scale-[1.03]'
      )}
    >
      {/* Drag Handle — top-left grip */}
      <button
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 z-10 flex h-7 w-7 items-center justify-center rounded-lg bg-void/60 text-text-muted/50 hover:text-text-muted transition-colors cursor-grab active:cursor-grabbing touch-none"
        aria-label="Drag to reorder"
      >
        <GripVertical className="h-4 w-4" />
      </button>

      {/* Remove button */}
      <button
        onClick={() => onRemove(song.id)}
        className="absolute top-2 right-2 z-10 flex h-7 w-7 items-center justify-center rounded-lg bg-void/60 text-text-muted/50 hover:text-alert transition-colors"
        aria-label={`Remove ${song.title}`}
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>

      {/* Card Content */}
      <Link href={`/song/${song.id}`} className="block p-4 pt-12">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-display text-xs font-bold" style={{ color: bpmColor }}>
            #{index + 1}
          </span>
          <span
            className="rounded-full border px-1.5 py-px font-display text-[9px] font-bold tracking-wider"
            style={{ borderColor: bpmColor, color: bpmColor }}
          >
            {bpmLabel}
          </span>
        </div>
        <h3 className="font-display text-sm font-bold text-text-primary truncate leading-tight">
          {song.title}
        </h3>
        <p className="font-body text-[11px] text-text-secondary mt-0.5">{song.artist}</p>
        <div className="flex items-center gap-3 mt-2">
          <span className="font-display text-sm font-bold" style={{ color: bpmColor }}>{song.bpm} BPM</span>
          {year && <span className="font-body text-[10px] text-text-muted">{year}</span>}
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          <span className="rounded-md border border-border px-1.5 py-px font-display text-[9px] text-text-muted">
            {song.language === 'zh' ? '中文' : 'EN'}
          </span>
          {song.genres.slice(0, 2).map((g) => (
            <span key={g} className="rounded-md border border-border px-1.5 py-px font-display text-[9px] text-text-muted">
              {g}
            </span>
          ))}
          {song.audio_url && (
            <span className="rounded-md bg-pulse/10 px-1.5 py-px font-display text-[9px] text-pulse">🎵 MP3</span>
          )}
        </div>
      </Link>
    </div>
  );
}

// --- Page ---

export default function FavoritesPage() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  // Load favorites from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('cadence_favorites');
      setFavoriteIds(raw ? JSON.parse(raw) : []);
    } catch { setFavoriteIds([]); }
  }, []);

  // Persist to localStorage on change
  const persist = useCallback((ids: string[]) => {
    setFavoriteIds(ids);
    localStorage.setItem('cadence_favorites', JSON.stringify(ids));
    window.dispatchEvent(new Event('storage'));
  }, []);

  // Get songs in order
  const favoriteSongs = favoriteIds
    .map((id) => SONG_MAP[id])
    .filter((s): s is Song => !!s);

  // Save "run source" when entering favorites page
  useEffect(() => {
    sessionStorage.setItem('cadence_run_source', 'favorites');
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = favoriteIds.indexOf(String(active.id));
    const newIndex = favoriteIds.indexOf(String(over.id));
    if (oldIndex === -1 || newIndex === -1) return;

    persist(arrayMove(favoriteIds, oldIndex, newIndex));
  };

  const removeOne = (id: string) => {
    persist(favoriteIds.filter((fid) => fid !== id));
  };

  const removeAll = () => {
    persist([]);
  };

  // Navigate to Run in favorites mode
  const goToRun = () => {
    sessionStorage.setItem('cadence_run_source', 'favorites');
    window.location.href = '/run';
  };

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border px-4 md:px-6 glass-safe">
        <h1 className="font-display text-lg md:text-xl font-bold bg-gradient-to-r from-pulse to-surge bg-clip-text text-transparent">
          My Favorites
        </h1>
        <div className="flex items-center gap-2">
          {favoriteSongs.length > 0 && (
            <>
              <button
                onClick={goToRun}
                className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 font-display text-[11px] font-medium text-surge border border-surge/20 bg-surge/5 hover:bg-surge/10 transition-all active:scale-95"
              >
                <Footprints className="h-3.5 w-3.5" />
                Run
              </button>
              <button
                onClick={removeAll}
                className="flex items-center gap-1 rounded-lg px-2 py-1 font-display text-[11px] text-text-muted hover:text-alert transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clear
              </button>
            </>
          )}
        </div>
      </header>

      <div className="px-3 md:px-6 pb-6 md:pb-12 pt-4 md:pt-6">
        {favoriteSongs.length > 0 ? (
          <>
            <div className="mb-4 flex items-center justify-between">
              <p className="font-body text-sm text-text-muted">
                {favoriteSongs.length} song{favoriteSongs.length !== 1 ? 's' : ''} • Drag to reorder
              </p>
            </div>

            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={favoriteIds}
                strategy={rectSortingStrategy}
              >
                <div className="grid grid-cols-2 gap-3 md:gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {favoriteSongs.map((song, index) => (
                    <SortableSongCard
                      key={song.id}
                      song={song}
                      index={index}
                      onRemove={removeOne}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            {/* Run CTA at bottom */}
            <div className="mt-8 text-center">
              <button
                onClick={goToRun}
                className="inline-flex items-center gap-2 rounded-xl border border-surge/30 bg-surge/10 px-6 py-3 font-display text-sm font-medium text-surge transition-all hover:bg-surge/15 active:scale-95"
              >
                <Footprints className="h-4 w-4" />
                Start Run with Favorites ({favoriteSongs.length} tracks)
              </button>
              <p className="mt-2 font-body text-[11px] text-text-muted">
                Songs play in the order you set above
              </p>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 md:py-32">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-surface/50">
              <Heart className="h-8 w-8 text-text-muted" />
            </div>
            <h3 className="mb-2 font-display text-lg font-semibold text-text-primary">
              No favorites saved yet
            </h3>
            <p className="mb-6 max-w-md text-center font-body text-sm text-text-secondary px-4">
              Tap the heart on any song to build your perfect running playlist. Drag to arrange your ideal sequence.
            </p>
            <Link
              href="/"
              className="rounded-xl border border-pulse/30 bg-pulse/5 px-6 py-2.5 font-display text-sm font-medium text-pulse transition-all hover:bg-pulse/10 active:scale-95"
            >
              Browse Songs
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
