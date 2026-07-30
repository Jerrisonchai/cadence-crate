'use client';

import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import FilterChips from '@/components/FilterChips';
import SongCard, { type Song } from '@/components/SongCard';
import MobileDrawer from '@/components/MobileDrawer';
import songsData from '@/data/songs';

// Full song catalog from shared data source
// Map SongData -> SongCard.Song type
const FALLBACK_SONGS: Song[] = songsData.map(s => ({
  id: s.id,
  title: s.title,
  artist: s.artist,
  album: s.album,
  bpm: s.bpm,
  release_year: s.year || null,
  language: s.language || null,
  genres: s.genres || null,
  energy: s.energy ?? null,
  danceability: s.danceability ?? null,
  valence: s.valence ?? null,
  album_art_url: null,
  duration_ms: null,
  preview_url: s.audio_url || null,
}));

// Client-side filter logic (used when API is unavailable / Supabase not yet wired)
function applyFilters(songs: Song[], decade: string | null, genre: string | null, lang: string | null): Song[] {
  let result = songs;
  if (decade) {
    result = result.filter((s) => {
      const y = s.release_year;
      if (!y) return false;
      const decadeKey = `${String(y).slice(0, 3)}0s`;
      return decadeKey === decade;
    });
  }
  if (genre) {
    result = result.filter((s) => s.genres?.includes(genre));
  }
  if (lang) {
    result = result.filter((s) => s.language === lang);
  }
  return result;
}

function sortSongs(songs: Song[], sortBy: string): Song[] {
  const sorted = [...songs];
  switch (sortBy) {
    case 'bpm_desc': return sorted.sort((a, b) => b.bpm - a.bpm);
    case 'bpm_asc': return sorted.sort((a, b) => a.bpm - b.bpm);
    case 'newest': return sorted.sort((a, b) => (b.release_year || 0) - (a.release_year || 0));
    case 'title_asc': return sorted.sort((a, b) => a.title.localeCompare(b.title));
    default: return sorted;
  }
}

export default function HomeContent() {
  const searchParams = useSearchParams();

  // Init filters from URL params (for sidebar/drawer links)
  const [activeDecade, setActiveDecade] = useState<string | null>(() => searchParams.get('decade'));
  const [activeGenre, setActiveGenre] = useState<string | null>(() => searchParams.get('genre'));
  const [activeLanguage, setActiveLanguage] = useState<string | null>(() => searchParams.get('language'));
  const [sortBy, setSortBy] = useState<string>(() => searchParams.get('sort') || 'bpm_desc');

  const [allSongs, setAllSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [visibleCount, setVisibleCount] = useState(12);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Sync filters from URL params (for sidebar/drawer links)
  useEffect(() => {
    setActiveDecade(searchParams.get('decade'));
    setActiveGenre(searchParams.get('genre'));
    setActiveLanguage(searchParams.get('language'));
    const sort = searchParams.get('sort');
    if (sort) setSortBy(sort);
  }, [searchParams]);

  // Save browse state to sessionStorage so Run Mode can pick up the filters
  useEffect(() => {
    sessionStorage.setItem('cadence_run_source', 'browse');
    sessionStorage.setItem('cadence_browse_state', JSON.stringify({
      decade: activeDecade,
      genre: activeGenre,
      language: activeLanguage,
      sort: sortBy,
    }));
  }, [activeDecade, activeGenre, activeLanguage, sortBy]);

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
          const raw = data.songs.map((s: Record<string, unknown>) => ({
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
          }));
          // Apply active filters + sort client-side (Supabase API may return unfiltered)
          setAllSongs(sortSongs(applyFilters(raw, activeDecade, activeGenre, activeLanguage), sortBy));
        } else {
          // Fallback to sample data with client-side filtering + sorting
          setAllSongs(sortSongs(applyFilters(FALLBACK_SONGS, activeDecade, activeGenre, activeLanguage), sortBy));
        }
      })
      .catch(() => {
        setAllSongs(sortSongs(applyFilters(FALLBACK_SONGS, activeDecade, activeGenre, activeLanguage), sortBy));
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
