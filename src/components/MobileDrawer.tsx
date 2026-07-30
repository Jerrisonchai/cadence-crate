'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  Disc3,
  Calendar,
  Guitar,
  Globe,
  Heart,
  Info,
  BookOpen,
  Footprints,
  Circle,
  ChevronDown,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const decades = ['1980s', '1990s', '2000s', '2010s', '2020s'];
const genres = ['Pop', 'Rock', 'Hip-Hop', 'Mandopop', 'Cantopop', 'Electronic'];

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const pathname = usePathname();
  const [decadeOpen, setDecadeOpen] = useState(false);
  const [genreOpen, setGenreOpen] = useState(false);

  // Close on route change
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 35 }}
            className="fixed left-0 top-0 z-50 flex h-full w-72 flex-col border-r border-border bg-[#0A0A18]/98 backdrop-blur-2xl md:hidden safe-bottom"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-border">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-pulse/10">
                  <Zap className="h-4 w-4 text-pulse" />
                </div>
                <span className="font-display text-lg font-bold bg-gradient-to-r from-pulse to-surge bg-clip-text text-transparent">
                  CADENCE
                </span>
              </Link>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-text-muted hover:text-text-primary transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Drawer Nav */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
              {/* Browse all */}
              <Link
                href="/"
                className={cn('drawer-item', pathname === '/' && 'active')}
                onClick={onClose}
              >
                <Disc3 className="h-5 w-5" />
                <span>Browse All</span>
              </Link>

              {/* Decades */}
              <button
                onClick={() => setDecadeOpen(!decadeOpen)}
                className="drawer-item w-full"
              >
                <Calendar className="h-5 w-5" />
                <span>By Decade</span>
                <motion.span
                  animate={{ rotate: decadeOpen ? 180 : 0 }}
                  className="ml-auto"
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.span>
              </button>

              <AnimatePresence>
                {decadeOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pl-3 space-y-0.5"
                  >
                    {decades.map((decade) => (
                      <Link
                        key={decade}
                        href={`/?decade=${decade}`}
                        className="drawer-item drawer-sub"
                        onClick={onClose}
                      >
                        {decade}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Genres */}
              <button
                onClick={() => setGenreOpen(!genreOpen)}
                className="drawer-item w-full"
              >
                <Guitar className="h-5 w-5" />
                <span>By Genre</span>
                <motion.span
                  animate={{ rotate: genreOpen ? 180 : 0 }}
                  className="ml-auto"
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.span>
              </button>

              <AnimatePresence>
                {genreOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pl-3 space-y-0.5"
                  >
                    {genres.map((genre) => (
                      <Link
                        key={genre}
                        href={`/?genre=${genre}`}
                        className="drawer-item drawer-sub"
                        onClick={onClose}
                      >
                        {genre}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Language */}
              <Link href="/" className="drawer-item" onClick={onClose}>
                <Globe className="h-5 w-5" />
                <span>Language</span>
              </Link>

              {/* Divider */}
              <div className="my-3 h-px bg-gradient-to-r from-transparent via-surge/15 to-transparent" />

              {/* Favorites */}
              <Link
                href="/favorites"
                className={cn('drawer-item', pathname === '/favorites' && 'active')}
                onClick={onClose}
              >
                <Heart className="h-5 w-5" />
                <span>Favorites</span>
              </Link>

              {/* Journal */}
              <Link
                href="/journal"
                className={cn('drawer-item', pathname.startsWith('/journal') && 'active')}
                onClick={onClose}
              >
                <BookOpen className="h-5 w-5" />
                <span>Journal</span>
              </Link>

              {/* Run Mode */}
              <Link
                href="/run"
                className={cn('drawer-item', pathname === '/run' && 'active')}
                onClick={onClose}
              >
                <Footprints className="h-5 w-5" />
                <span>Run Mode</span>
              </Link>

              {/* Tap Tool */}
              <Link
                href="/tap"
                className={cn('drawer-item', pathname === '/tap' && 'active')}
                onClick={onClose}
              >
                <Circle className="h-5 w-5" />
                <span>BPM Tap</span>
              </Link>

              {/* About */}
              <Link
                href="/about"
                className={cn('drawer-item', pathname === '/about' && 'active')}
                onClick={onClose}
              >
                <Info className="h-5 w-5" />
                <span>About</span>
              </Link>
            </div>

            {/* Drawer Footer */}
            <div className="px-4 py-3 border-t border-border">
              <p className="font-body text-[10px] text-text-muted">
                New songs every Sunday
              </p>
              <p className="font-display text-[10px] text-text-muted/60 mt-0.5">
                v0.3.0 — Drag + Dual Run
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
