'use client';

import { useState, useCallback, useMemo } from 'react';
import Header from '@/components/Header';
import FilterChips from '@/components/FilterChips';
import SongCard, { type Song } from '@/components/SongCard';
import MobileDrawer from '@/components/MobileDrawer';

const SAMPLE_SONGS: Song[] = [
  { id: '1', title: '夜曲 (Nocturne)', artist: 'Jay Chou', album: "November's Chopin", album_art_url: null, bpm: 168, release_year: 2005, language: 'zh', genres: ['Mandopop', 'Pop'], duration_ms: 222000, energy: 0.72, preview_url: null },
  { id: '2', title: '晴天 (Sunny Day)', artist: 'Jay Chou', album: 'Yeh Hui-mei', album_art_url: null, bpm: 165, release_year: 2003, language: 'zh', genres: ['Mandopop', 'Pop'], duration_ms: 269000, energy: 0.68, preview_url: null },
  { id: '3', title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', album_art_url: null, bpm: 171, release_year: 2020, language: 'en', genres: ['Pop', 'Electronic'], duration_ms: 200000, energy: 0.80, preview_url: null },
  { id: '4', title: 'Take On Me', artist: 'a-ha', album: 'Hunting High and Low', album_art_url: null, bpm: 169, release_year: 1985, language: 'en', genres: ['Pop', 'Rock'], duration_ms: 225000, energy: 0.86, preview_url: null },
  { id: '5', title: '稻香 (Rice Aroma)', artist: 'Jay Chou', album: 'Capricorn', album_art_url: null, bpm: 162, release_year: 2008, language: 'zh', genres: ['Mandopop'], duration_ms: 223000, energy: 0.55, preview_url: null },
  { id: '6', title: '簡單愛 (Simple Love)', artist: 'Jay Chou', album: 'Fantasy', album_art_url: null, bpm: 169, release_year: 2001, language: 'zh', genres: ['Mandopop', 'Pop'], duration_ms: 270000, energy: 0.62, preview_url: null },
  { id: '7', title: "Don't Stop Believin'", artist: 'Journey', album: 'Escape', album_art_url: null, bpm: 160, release_year: 1981, language: 'en', genres: ['Rock'], duration_ms: 251000, energy: 0.74, preview_url: null },
  { id: '8', title: 'Running Up That Hill', artist: 'Kate Bush', album: 'Hounds of Love', album_art_url: null, bpm: 165, release_year: 1985, language: 'en', genres: ['Pop', 'Rock'], duration_ms: 298000, energy: 0.56, preview_url: null },
];

export default function HomeContent() {
  const [activeDecade, setActiveDecade] = useState<string | null>(null);
  const [activeGenre, setActiveGenre] = useState<string | null>(null);
  const [activeLanguage, setActiveLanguage] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('bpm_desc');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [visibleCount, setVisibleCount] = useState(8);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filteredSongs = useMemo(() => {
    let result = [...SAMPLE_SONGS];
    if (activeDecade) {
      const startYear = parseInt(activeDecade);
      result = result.filter((s) => s.release_year && s.release_year >= startYear && s.release_year < startYear + 10);
    }
    if (activeGenre) {
      result = result.filter((s) => s.genres?.some((g) => g.toLowerCase() === activeGenre.toLowerCase()));
    }
    if (activeLanguage) {
      result = result.filter((s) => s.language === activeLanguage);
    }
    switch (sortBy) {
      case 'bpm_desc': result.sort((a, b) => b.bpm - a.bpm); break;
      case 'bpm_asc': result.sort((a, b) => a.bpm - b.bpm); break;
      case 'newest': result.sort((a, b) => (b.release_year || 0) - (a.release_year || 0)); break;
      case 'title_asc': result.sort((a, b) => a.title.localeCompare(b.title)); break;
    }
    return result;
  }, [activeDecade, activeGenre, activeLanguage, sortBy]);

  const visibleSongs = filteredSongs.slice(0, visibleCount);
  const hasMore = visibleCount < filteredSongs.length;

  const handleFavorite = useCallback((id: string) => {
    setFavorites((prev) => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });
  }, []);

  return (
    <>
      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <Header
        totalSongs={SAMPLE_SONGS.length}
        onFiltersToggle={() => setFiltersOpen(!filtersOpen)}
        filtersOpen={filtersOpen}
        onMenuToggle={() => setDrawerOpen(true)}
      />

      <FilterChips
        activeDecade={activeDecade}
        activeGenre={activeGenre}
        activeLanguage={activeLanguage}
        sortBy={sortBy}
        onDecadeChange={setActiveDecade}
        onGenreChange={setActiveGenre}
        onLanguageChange={setActiveLanguage}
        onSortChange={setSortBy}
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
      />

      {/* Song Grid */}
      <div className="px-3 md:px-6 pb-6 md:pb-12 pt-2 md:pt-0">
        {visibleSongs.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-3 md:gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {visibleSongs.map((song, index) => (
                <SongCard
                  key={song.id}
                  song={song}
                  index={index}
                  isFavorited={favorites.has(song.id)}
                  onFavorite={handleFavorite}
                />
              ))}
            </div>

            {hasMore && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 8)}
                  className="rounded-xl border border-border bg-surface/50 px-8 py-3 font-display text-sm font-medium text-text-secondary backdrop-blur-md transition-all hover:border-pulse/30 hover:text-pulse active:scale-95"
                >
                  Load More Songs
                </button>
                <p className="mt-2 font-body text-xs text-text-muted">
                  Showing {visibleSongs.length} of {filteredSongs.length} songs
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 md:py-32">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-surface/50">
              <div className="h-3 w-3 rounded-full bg-pulse/40 animate-bpm-pulse" />
            </div>
            <h3 className="mb-2 font-display text-lg font-semibold text-text-primary">No songs in this filter yet</h3>
            <p className="mb-6 max-w-md text-center font-body text-sm text-text-secondary px-4">
              We&apos;re building the library week by week. The BPM Collector runs every Sunday. Check back soon!
            </p>
            <button
              onClick={() => { setActiveDecade(null); setActiveGenre(null); setActiveLanguage(null); }}
              className="rounded-lg border border-pulse/30 bg-pulse/5 px-6 py-2 font-display text-sm font-medium text-pulse transition-all hover:bg-pulse/10 active:scale-95"
            >
              Browse All Songs
            </button>
          </div>
        )}
      </div>
    </>
  );
}
