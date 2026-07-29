'use client';

import { useState, useCallback, useEffect } from 'react';
import Header from '@/components/Header';
import FilterChips from '@/components/FilterChips';
import SongCard, { type Song } from '@/components/SongCard';
import MobileDrawer from '@/components/MobileDrawer';

// Central song catalog — IDs match song/[id]/page.tsx, favorites, and run page
const FALLBACK_SONGS: Song[] = [
  { id: '1', spotify_id: 'd1', title: '夜曲 (Nocturne)', artist: 'Jay Chou', album: "November's Chopin", album_art_url: null, bpm: 168.2, release_year: 2005, language: 'zh', genres: ['Mandopop', 'Pop'], duration_ms: 222000, energy: 0.72, danceability: 0.45, valence: 0.38 },
  { id: '2', spotify_id: 'd2', title: '晴天 (Sunny Day)', artist: 'Jay Chou', album: 'Yeh Hui-mei', album_art_url: null, bpm: 165.0, release_year: 2003, language: 'zh', genres: ['Mandopop', 'Pop'], duration_ms: 269000, energy: 0.68, danceability: 0.52, valence: 0.41 },
  { id: '3', spotify_id: 'd3', title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', album_art_url: null, bpm: 171.0, release_year: 2020, language: 'en', genres: ['Pop', 'Electronic'], duration_ms: 200000, energy: 0.80, danceability: 0.50, valence: 0.38 },
  { id: '4', spotify_id: 'd4', title: 'Take On Me', artist: 'a-ha', album: 'Hunting High and Low', album_art_url: null, bpm: 169.0, release_year: 1985, language: 'en', genres: ['Pop', 'Rock'], duration_ms: 225000, energy: 0.86, danceability: 0.57, valence: 0.85 },
  { id: '5', spotify_id: 'd5', title: '稻香 (Rice Aroma)', artist: 'Jay Chou', album: 'Capricorn', album_art_url: null, bpm: 162.0, release_year: 2008, language: 'zh', genres: ['Mandopop'], duration_ms: 223000, energy: 0.55, danceability: 0.60, valence: 0.72 },
  { id: '6', spotify_id: 'd6', title: '簡單愛 (Simple Love)', artist: 'Jay Chou', album: 'Fantasy', album_art_url: null, bpm: 169.0, release_year: 2001, language: 'zh', genres: ['Mandopop', 'Pop'], duration_ms: 270000, energy: 0.62, danceability: 0.48, valence: 0.65 },
  { id: '7', spotify_id: 'd7', title: "Don't Stop Believin'", artist: 'Journey', album: 'Escape', album_art_url: null, bpm: 160.0, release_year: 1981, language: 'en', genres: ['Rock'], duration_ms: 251000, energy: 0.74, danceability: 0.49, valence: 0.33 },
  { id: '8', spotify_id: 'd8', title: 'Running Up That Hill', artist: 'Kate Bush', album: 'Hounds of Love', album_art_url: null, bpm: 165.0, release_year: 1985, language: 'en', genres: ['Pop', 'Rock'], duration_ms: 298000, energy: 0.56, danceability: 0.63, valence: 0.20 },
];

export default function HomeContent() {
  const [allSongs, setAllSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeDecade, setActiveDecade] = useState<string | null>(null);
  const [activeGenre, setActiveGenre] = useState<string | null>(null);
  const [activeLanguage, setActiveLanguage] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('bpm_desc');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [visibleCount, setVisibleCount] = useState(12);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch songs from API
  useEffect(() => {
    const params = new URLSearchParams();
    if (activeDecade) params.set('decade', activeDecade);
    if (activeGenre) params.set('genre', activeGenre);
    if (activeLanguage) params.set('lang', activeLanguage);
    params.set('sort', sortBy);
    params.set('limit', '100');

    setLoading(true);
    fetch(`/api/songs?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.songs && data.songs.length > 0) {
          setAllSongs(data.songs.map((s: Record<string, unknown>) => ({
            id: s.id,
            spotify_id: s.spotify_id,
            title: s.title,
            artist: s.artist,
            album: s.album,
            album_art_url: s.album_art_url,
            bpm: s.bpm,
            release_year: s.release_year,
            language: s.language,
            genres: s.genres,
            duration_ms: s.duration_ms,
            energy: s.energy,
            preview_url: s.preview_url,
          })));
        } else {
          // Fallback to sample data
          setAllSongs(FALLBACK_SONGS);
        }
      })
      .catch(() => {
        setAllSongs(FALLBACK_SONGS);
      })
      .finally(() => setLoading(false));
  }, [activeDecade, activeGenre, activeLanguage, sortBy]);

  // Client-side search filter
  const searchedSongs = searchQuery
    ? allSongs.filter((s) =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.album && s.album.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : allSongs;

  const visibleSongs = searchedSongs.slice(0, visibleCount);
  const hasMore = visibleCount < searchedSongs.length;

  const handleFavorite = useCallback((id: string) => {
    setFavorites((prev) => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });
  }, []);

  return (
    <>
      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <Header
        totalSongs={allSongs.length}
        onFiltersToggle={() => setFiltersOpen(!filtersOpen)}
        filtersOpen={filtersOpen}
        onMenuToggle={() => setDrawerOpen(true)}
        onSearch={setSearchQuery}
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
        {loading ? (
          <div className="grid grid-cols-2 gap-3 md:gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-xl border border-border bg-surface/30 aspect-[3/4]" />
            ))}
          </div>
        ) : visibleSongs.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-3 md:gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {visibleSongs.map((song, index) => (
                <SongCard
                  key={song.id}
                  song={song}
                  index={index}
                  isFavorited={favorites.has(String(song.id))}
                  onFavorite={(id) => handleFavorite(String(id))}
                />
              ))}
            </div>

            {hasMore && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 12)}
                  className="rounded-xl border border-border bg-surface/50 px-8 py-3 font-display text-sm font-medium text-text-secondary backdrop-blur-md transition-all hover:border-pulse/30 hover:text-pulse active:scale-95"
                >
                  Load More Songs
                </button>
                <p className="mt-2 font-body text-xs text-text-muted">
                  Showing {visibleSongs.length} of {searchedSongs.length} songs
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 md:py-32">
            {searchQuery ? (
              <>
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-alert/20 bg-alert/5">
                  <span className="text-3xl">🔍</span>
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold text-text-primary">No results for &ldquo;{searchQuery}&rdquo;</h3>
                <p className="mb-6 max-w-md text-center font-body text-sm text-text-secondary px-4">
                  Try a different search term or browse by decade.
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="rounded-lg border border-pulse/30 bg-pulse/5 px-6 py-2 font-display text-sm font-medium text-pulse transition-all hover:bg-pulse/10 active:scale-95"
                >
                  Clear Search
                </button>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
