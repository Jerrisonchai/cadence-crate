'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, Trash2 } from 'lucide-react';
import SongCard, { type Song } from '@/components/SongCard';

// Same sample songs referenceto find saved ones
const ALL_SONGS: Song[] = [
  { id: '1', title: '夜曲 (Nocturne)', artist: 'Jay Chou', album: "November's Chopin", bpm: 168.2, release_year: 2005, language: 'zh', genres: ['Mandopop', 'Pop'], duration_ms: 222000, energy: 0.72, danceability: 0.45, valence: 0.38 },
  { id: '2', title: '晴天 (Sunny Day)', artist: 'Jay Chou', album: 'Yeh Hui-mei', bpm: 165.0, release_year: 2003, language: 'zh', genres: ['Mandopop', 'Pop'], duration_ms: 269000, energy: 0.68, danceability: 0.52, valence: 0.41 },
  { id: '3', title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', bpm: 171.0, release_year: 2020, language: 'en', genres: ['Pop', 'Electronic'], duration_ms: 200000, energy: 0.80, danceability: 0.50, valence: 0.38 },
  { id: '4', title: 'Take On Me', artist: 'a-ha', album: 'Hunting High and Low', bpm: 169.0, release_year: 1985, language: 'en', genres: ['Pop', 'Rock'], duration_ms: 225000, energy: 0.86, danceability: 0.57, valence: 0.85 },
  { id: '5', title: '稻香 (Rice Aroma)', artist: 'Jay Chou', album: 'Capricorn', bpm: 162.0, release_year: 2008, language: 'zh', genres: ['Mandopop'], duration_ms: 223000, energy: 0.55, danceability: 0.60, valence: 0.72 },
  { id: '6', title: '簡單愛 (Simple Love)', artist: 'Jay Chou', album: 'Fantasy', bpm: 169.0, release_year: 2001, language: 'zh', genres: ['Mandopop', 'Pop'], duration_ms: 270000, energy: 0.62, danceability: 0.48, valence: 0.65 },
  { id: '7', title: "Don't Stop Believin'", artist: 'Journey', album: 'Escape', bpm: 160.0, release_year: 1981, language: 'en', genres: ['Rock'], duration_ms: 251000, energy: 0.74, danceability: 0.49, valence: 0.33 },
  { id: '8', title: 'Running Up That Hill', artist: 'Kate Bush', album: 'Hounds of Love', bpm: 165.0, release_year: 1985, language: 'en', genres: ['Pop', 'Rock'], duration_ms: 298000, energy: 0.56, danceability: 0.63, valence: 0.20 },
];

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      setFavorites(JSON.parse(localStorage.getItem('cadence_favorites') || '[]'));
    } catch { /* ignore */ }
  }, []);

  const favoriteSongs = ALL_SONGS.filter((s) => favorites.includes(s.id));

  const removeAll = () => {
    localStorage.removeItem('cadence_favorites');
    setFavorites([]);
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border px-4 md:px-6 glass-safe">
        <h1 className="font-display text-lg md:text-xl font-bold bg-gradient-to-r from-pulse to-surge bg-clip-text text-transparent">
          My Favorites
        </h1>
        {favoriteSongs.length > 0 && (
          <button
            onClick={removeAll}
            className="flex items-center gap-1 rounded-lg px-2 py-1 font-display text-[11px] text-text-muted hover:text-alert transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Clear
          </button>
        )}
      </header>

      <div className="px-3 md:px-6 pb-6 md:pb-12 pt-4 md:pt-6">
        {favoriteSongs.length > 0 ? (
          <>
            <p className="mb-4 font-body text-sm text-text-muted">
              {favoriteSongs.length} song{favoriteSongs.length !== 1 ? 's' : ''} saved for your runs
            </p>
            <div className="grid grid-cols-2 gap-3 md:gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {favoriteSongs.map((song, index) => (
                <SongCard
                  key={song.id}
                  song={song}
                  index={index}
                  isFavorited={true}
                />
              ))}
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
              Tap the heart on any song to build your perfect running playlist.
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
