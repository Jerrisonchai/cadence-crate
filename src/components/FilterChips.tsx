'use client';

import { cn } from '@/lib/utils';
import { Globe } from 'lucide-react';

interface FilterChipsProps {
  activeDecade: string | null;
  activeGenre: string | null;
  activeLanguage: string | null;
  sortBy: string;
  onDecadeChange: (decade: string | null) => void;
  onGenreChange: (genre: string | null) => void;
  onLanguageChange: (language: string | null) => void;
  onSortChange: (sort: string) => void;
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
}: FilterChipsProps) {
  return (
    <div className="space-y-3 px-6 py-4">
      {/* Decade Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="mr-1 flex-shrink-0 font-display text-[11px] font-semibold uppercase tracking-wider text-text-muted">
          Decade
        </span>
        <button
          onClick={() => onDecadeChange(null)}
          className={cn(
            'filter-chip',
            !activeDecade && 'active'
          )}
        >
          All
        </button>
        {decades.map((decade) => (
          <button
            key={decade}
            onClick={() => onDecadeChange(decade)}
            className={cn(
              'filter-chip',
              activeDecade === decade && 'active'
            )}
          >
            {decade}
          </button>
        ))}
      </div>

      {/* Genre + Language Row */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 flex-shrink-0 font-display text-[11px] font-semibold uppercase tracking-wider text-text-muted">
          Genre
        </span>
        <button
          onClick={() => onGenreChange(null)}
          className={cn(
            'filter-chip',
            !activeGenre && 'active'
          )}
        >
          All
        </button>
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => onGenreChange(genre)}
            className={cn(
              'filter-chip',
              activeGenre === genre && 'active'
            )}
          >
            {genre}
          </button>
        ))}

        {/* Separator */}
        <span className="mx-2 h-5 w-px bg-border" />

        {/* Language Toggle */}
        <span className="flex-shrink-0 font-display text-[11px] font-semibold uppercase tracking-wider text-text-muted">
          <Globe className="inline h-3 w-3 mr-1" />
        </span>
        {languages.map((lang) => (
          <button
            key={String(lang.value)}
            onClick={() => onLanguageChange(lang.value)}
            className={cn(
              'filter-chip',
              activeLanguage === lang.value && 'active'
            )}
          >
            {lang.label}
          </button>
        ))}

        {/* Separator */}
        <span className="mx-2 h-5 w-px bg-border" />

        {/* Sort */}
        <span className="flex-shrink-0 font-display text-[11px] font-semibold uppercase tracking-wider text-text-muted">
          Sort
        </span>
        {sorts.map((sort) => (
          <button
            key={sort.value}
            onClick={() => onSortChange(sort.value)}
            className={cn(
              'filter-chip',
              sortBy === sort.value && 'active'
            )}
          >
            {sort.label}
          </button>
        ))}
      </div>
    </div>
  );
}
