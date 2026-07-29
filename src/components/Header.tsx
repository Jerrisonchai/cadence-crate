'use client';

import { Zap, SlidersHorizontal, ZapIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  totalSongs: number;
  onFiltersToggle?: () => void;
  filtersOpen?: boolean;
}

export default function Header({ totalSongs, onFiltersToggle, filtersOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-border glass-safe">
      <div className="flex h-14 items-center justify-between px-4 md:px-6">
        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          {/* Mobile logo icon */}
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pulse/10 md:hidden">
            <Zap className="h-4 w-4 text-pulse" />
          </div>
          <h1 className="font-display text-lg md:text-xl font-bold bg-gradient-to-r from-pulse to-surge bg-clip-text text-transparent">
            Browse
          </h1>
          <motion.span
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="rounded-full border border-pulse/15 bg-pulse/5 px-2.5 py-0.5 font-display text-[11px] md:text-xs text-pulse"
          >
            {totalSongs} songs
          </motion.span>
        </div>

        {/* Mobile: Filter Toggle */}
        <button
          onClick={onFiltersToggle}
          className="flex items-center gap-1.5 rounded-xl border border-border bg-surface/60 px-3 py-1.5 text-sm text-text-secondary backdrop-blur-md transition-all hover:border-pulse/30 hover:text-pulse active:scale-95 md:hidden"
        >
          <SlidersHorizontal className={filtersOpen ? 'text-pulse' : ''} />
        </button>
      </div>
    </header>
  );
}
