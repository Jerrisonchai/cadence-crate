'use client';

import { Search, SlidersHorizontal } from 'lucide-react';

interface HeaderProps {
  totalSongs: number;
}

export default function Header({ totalSongs }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border px-6 glass">
      <div className="flex items-center gap-4">
        <h1 className="font-display text-xl font-bold bg-gradient-to-r from-pulse to-surge bg-clip-text text-transparent">
          Browse Library
        </h1>
        <span className="rounded-full border border-pulse/15 bg-pulse/5 px-3 py-1 font-display text-xs text-pulse">
          {totalSongs} songs
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 rounded-lg border border-border bg-surface/50 px-3 py-1.5 text-sm text-text-secondary transition-colors hover:border-border-hover hover:text-text-primary">
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">Search</span>
        </button>
        <button className="flex items-center gap-2 rounded-lg border border-border bg-surface/50 px-3 py-1.5 text-sm text-text-secondary transition-colors hover:border-border-hover hover:text-text-primary">
          <SlidersHorizontal className="h-4 w-4" />
          <span className="hidden sm:inline">Filters</span>
        </button>
      </div>
    </header>
  );
}
