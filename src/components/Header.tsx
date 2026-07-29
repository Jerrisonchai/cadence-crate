'use client';

import { useState, useCallback } from 'react';
import { Zap, SlidersHorizontal, Menu, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  totalSongs: number;
  onFiltersToggle?: () => void;
  filtersOpen?: boolean;
  onMenuToggle?: () => void;
  onSearch?: (query: string) => void;
}

export default function Header({ totalSongs, onFiltersToggle, filtersOpen, onMenuToggle, onSearch }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  }, [onSearch]);

  return (
    <header className="sticky top-0 z-30 border-b border-border glass-safe">
      <div className="flex h-14 items-center justify-between px-4 md:px-6 gap-3">
        {/* Left: Hamburger + Title */}
        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          <button
            onClick={onMenuToggle}
            className="rounded-lg p-1.5 text-text-secondary hover:text-text-primary active:scale-90 transition-all md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pulse/10 md:hidden">
            <Zap className="h-4 w-4 text-pulse" />
          </div>

          <h1 className="font-display text-lg md:text-xl font-bold bg-gradient-to-r from-pulse to-surge bg-clip-text text-transparent whitespace-nowrap">
            Browse
          </h1>
          <motion.span
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="hidden sm:inline rounded-full border border-pulse/15 bg-pulse/5 px-2.5 py-0.5 font-display text-[11px] md:text-xs text-pulse"
          >
            {totalSongs} songs
          </motion.span>
        </div>

        {/* Center: Search (desktop) */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search songs, artists..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface/50 py-2 pl-10 pr-4 font-body text-sm text-text-primary placeholder-text-muted backdrop-blur-md outline-none transition-all focus:border-surge/40 focus:bg-surface"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Mobile search toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="flex items-center justify-center h-8 w-8 rounded-xl border border-border bg-surface/60 text-text-secondary backdrop-blur-md transition-all hover:border-surge/30 hover:text-surge active:scale-95 md:hidden"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>

          {/* Mobile filter toggle */}
          <button
            onClick={onFiltersToggle}
            className="flex items-center gap-1.5 rounded-xl border border-border bg-surface/60 px-3 py-1.5 text-sm text-text-secondary backdrop-blur-md transition-all hover:border-pulse/30 hover:text-pulse active:scale-95 md:hidden"
            aria-label="Toggle filters"
          >
            <SlidersHorizontal className={filtersOpen ? 'text-pulse' : ''} />
          </button>
        </div>
      </div>

      {/* Mobile Search Bar (slide down) */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b border-border bg-surface/80 backdrop-blur-xl md:hidden"
          >
            <div className="px-4 py-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search songs, artists..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  autoFocus
                  className="w-full rounded-xl border border-border bg-surface py-2.5 pl-10 pr-4 font-body text-sm text-text-primary placeholder-text-muted outline-none transition-all focus:border-surge/40"
                />
                {searchQuery && (
                  <button
                    onClick={() => { handleSearch(''); setSearchOpen(false); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              {searchQuery && (
                <p className="mt-2 font-body text-[11px] text-text-muted">
                  Search across all songs...
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
