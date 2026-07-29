'use client';

import { Zap, SlidersHorizontal, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  totalSongs: number;
  onFiltersToggle?: () => void;
  filtersOpen?: boolean;
  onMenuToggle?: () => void;
}

export default function Header({ totalSongs, onFiltersToggle, filtersOpen, onMenuToggle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-border glass-safe">
      <div className="flex h-14 items-center justify-between px-4 md:px-6">
        {/* Left: Hamburger + Title */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Hamburger (mobile only) */}
          <button
            onClick={onMenuToggle}
            className="rounded-lg p-1.5 text-text-secondary hover:text-text-primary active:scale-90 transition-all md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Logo icon (mobile only, hidden on desktop since sidebar has it) */}
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

        {/* Right: Filter toggle (mobile only) */}
        <button
          onClick={onFiltersToggle}
          className="flex items-center gap-1.5 rounded-xl border border-border bg-surface/60 px-3 py-1.5 text-sm text-text-secondary backdrop-blur-md transition-all hover:border-pulse/30 hover:text-pulse active:scale-95 md:hidden"
          aria-label="Toggle filters"
        >
          <SlidersHorizontal className={filtersOpen ? 'text-pulse' : ''} />
        </button>
      </div>
    </header>
  );
}
