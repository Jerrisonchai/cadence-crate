'use client';

import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Globe, X } from 'lucide-react';
import { useState } from 'react';

interface FilterChipsProps {
  activeDecade: string | null;
  activeGenre: string | null;
  activeLanguage: string | null;
  sortBy: string;
  onDecadeChange: (decade: string | null) => void;
  onGenreChange: (genre: string | null) => void;
  onLanguageChange: (language: string | null) => void;
  onSortChange: (sort: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const decades = ['1980s', '1990s', '2000s', '2010s', '2020s'];
const genres = ['Pop', 'Rock', 'Hip-Hop', 'Mandopop', 'Cantopop', 'Electronic'];
const languages = [
  { value: null, label: 'All' },
  { value: 'zh', label: '🇨🇳 Chinese' },
  { value: 'en', label: '🇬🇧 English' },
];
const sorts = [
  { value: 'bpm_desc', label: 'BPM ▼' },
  { value: 'bpm_asc', label: 'BPM ▲' },
  { value: 'newest', label: 'Newest' },
  { value: 'title_asc', label: 'A-Z' },
];

export default function FilterChips({
  activeDecade,
  activeGenre,
  activeLanguage,
  sortBy,
  onDecadeChange,
  onGenreChange,
  onLanguageChange,
  onSortChange,
  isOpen,
  onClose,
}: FilterChipsProps) {
  const [showGenres, setShowGenres] = useState(false);

  const filterContent = (
    <div className="space-y-4">
      {/* Decade Row */}
      <div>
        <h4 className="mb-2 font-display text-[11px] font-semibold uppercase tracking-wider text-text-muted">
          Decade
        </h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onDecadeChange(null)}
            className={cn('filter-chip', !activeDecade && 'active')}
          >
            All
          </button>
          {decades.map((decade) => (
            <button
              key={decade}
              onClick={() => onDecadeChange(decade)}
              className={cn('filter-chip', activeDecade === decade && 'active')}
            >
              {decade}
            </button>
          ))}
        </div>
      </div>

      {/* Genre Row */}
      <div>
        <h4 className="mb-2 font-display text-[11px] font-semibold uppercase tracking-wider text-text-muted">
          Genre
        </h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onGenreChange(null)}
            className={cn('filter-chip', !activeGenre && 'active')}
          >
            All
          </button>
          {genres.slice(0, showGenres ? genres.length : 4).map((genre) => (
            <button
              key={genre}
              onClick={() => onGenreChange(genre)}
              className={cn('filter-chip', activeGenre === genre && 'active')}
            >
              {genre}
            </button>
          ))}
          {genres.length > 4 && (
            <button
              onClick={() => setShowGenres(!showGenres)}
              className="filter-chip flex items-center gap-1"
            >
              {showGenres ? 'Less' : `+${genres.length - 4}`}
              <ChevronDown className={cn('h-3 w-3 transition-transform', showGenres && 'rotate-180')} />
            </button>
          )}
        </div>
      </div>

      {/* Language Row */}
      <div>
        <h4 className="mb-2 font-display text-[11px] font-semibold uppercase tracking-wider text-text-muted">
          Language
        </h4>
        <div className="flex flex-wrap gap-2">
          {languages.map((lang) => (
            <button
              key={String(lang.value)}
              onClick={() => onLanguageChange(lang.value)}
              className={cn('filter-chip', activeLanguage === lang.value && 'active')}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sort Row */}
      <div>
        <h4 className="mb-2 font-display text-[11px] font-semibold uppercase tracking-wider text-text-muted">
          Sort by
        </h4>
        <div className="flex flex-wrap gap-2">
          {sorts.map((sort) => (
            <button
              key={sort.value}
              onClick={() => onSortChange(sort.value)}
              className={cn('filter-chip', sortBy === sort.value && 'active')}
            >
              {sort.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop: inline filter bar */}
      <div className="hidden md:block px-6 py-4">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="mr-1 flex-shrink-0 font-display text-[11px] font-semibold uppercase tracking-wider text-text-muted">
            Decade
          </span>
          <button onClick={() => onDecadeChange(null)} className={cn('filter-chip', !activeDecade && 'active')}>All</button>
          {decades.map((d) => (
            <button key={d} onClick={() => onDecadeChange(d)} className={cn('filter-chip', activeDecade === d && 'active')}>{d}</button>
          ))}
          <span className="mx-2 h-5 w-px bg-border" />
          <span className="flex-shrink-0 font-display text-[11px] font-semibold uppercase tracking-wider text-text-muted">Genre</span>
          <button onClick={() => onGenreChange(null)} className={cn('filter-chip', !activeGenre && 'active')}>All</button>
          {genres.map((g) => (
            <button key={g} onClick={() => onGenreChange(g)} className={cn('filter-chip', activeGenre === g && 'active')}>{g}</button>
          ))}
          <span className="mx-2 h-5 w-px bg-border" />
          <span className="flex-shrink-0 font-display text-[11px] font-semibold uppercase tracking-wider text-text-muted"><Globe className="inline h-3 w-3 mr-1" /></span>
          {languages.map((l) => (
            <button key={String(l.value)} onClick={() => onLanguageChange(l.value)} className={cn('filter-chip', activeLanguage === l.value && 'active')}>{l.label}</button>
          ))}
          <span className="mx-2 h-5 w-px bg-border" />
          <span className="flex-shrink-0 font-display text-[11px] font-semibold uppercase tracking-wider text-text-muted">Sort</span>
          {sorts.map((s) => (
            <button key={s.value} onClick={() => onSortChange(s.value)} className={cn('filter-chip', sortBy === s.value && 'active')}>{s.label}</button>
          ))}
        </div>
      </div>

      {/* Mobile: slide-down panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden md:hidden"
          >
            <div className="border-b border-border bg-surface/80 backdrop-blur-xl px-4 py-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-sm font-bold text-text-primary">Filters</h3>
                <button onClick={onClose} className="rounded-lg p-1 text-text-muted hover:text-text-primary transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>
              {filterContent}
              {/* Active filter count */}
              {(activeDecade || activeGenre || activeLanguage) && (
                <button
                  onClick={() => { onDecadeChange(null); onGenreChange(null); onLanguageChange(null); }}
                  className="mt-4 w-full rounded-lg border border-alert/20 bg-alert/5 py-2 font-display text-xs font-medium text-alert transition-colors hover:bg-alert/10"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
