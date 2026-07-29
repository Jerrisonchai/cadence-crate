'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const decades = ['1980s', '1990s', '2000s', '2010s', '2020s'];
const genres = ['Pop', 'Rock', 'Hip-Hop', 'Mandopop', 'Cantopop', 'Electronic'];

export default function Sidebar() {
  const pathname = usePathname();
  const [decadeOpen, setDecadeOpen] = useState(true);
  const [genreOpen, setGenreOpen] = useState(false);

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-[calc(100vh-44px)] w-60 flex-col border-r border-border px-4 py-6 glass md:flex">
      {/* Logo */}
      <Link href="/" className="mb-8 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pulse/10">
          <Zap className="h-5 w-5 text-pulse" />
        </div>
        <span className="font-display text-[22px] font-bold tracking-tight bg-gradient-to-r from-pulse via-surge to-pulse bg-clip-text text-transparent">
          CADENCE
        </span>
      </Link>

      {/* Browse */}
      <Link
        href="/"
        className={cn(
          'sidebar-item',
          pathname === '/' && 'active'
        )}
      >
        <Disc3 className="h-5 w-5" />
        <span>Browse</span>
      </Link>

      {/* Decade Section */}
      <button
        onClick={() => setDecadeOpen(!decadeOpen)}
        className="sidebar-item w-full"
      >
        <Calendar className="h-5 w-5" />
        <span>Decade</span>
        <motion.span
          animate={{ rotate: decadeOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-auto"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>

      {decadeOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          {decades.map((decade) => (
            <Link
              key={decade}
              href={`/?decade=${decade}`}
              className={cn(
                'sidebar-item sidebar-sub text-sm',
                pathname.includes(decade) && 'active'
              )}
            >
              {decade}
            </Link>
          ))}
        </motion.div>
      )}

      {/* Genre Section */}
      <button
        onClick={() => setGenreOpen(!genreOpen)}
        className="sidebar-item w-full"
      >
        <Guitar className="h-5 w-5" />
        <span>Genre</span>
        <motion.span
          animate={{ rotate: genreOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-auto"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>

      {genreOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          {genres.map((genre) => (
            <Link
              key={genre}
              href={`/?genre=${genre}`}
              className={cn(
                'sidebar-item sidebar-sub text-sm',
                pathname.includes(genre.toLowerCase()) && 'active'
              )}
            >
              {genre}
            </Link>
          ))}
        </motion.div>
      )}

      {/* Language */}
      <Link
        href="/"
        className="sidebar-item"
      >
        <Globe className="h-5 w-5" />
        <span>Language</span>
      </Link>

      {/* Divider */}
      <div className="my-4 h-px bg-gradient-to-r from-transparent via-surge/15 to-transparent" />

      {/* Favorites */}
      <Link
        href="/favorites"
        className={cn(
          'sidebar-item',
          pathname === '/favorites' && 'active'
        )}
      >
        <Heart className="h-5 w-5" />
        <span>Favorites</span>
      </Link>

      {/* Journal */}
      <Link
        href="/journal"
        className={cn(
          'sidebar-item',
          pathname.startsWith('/journal') && 'active'
        )}
      >
        <BookOpen className="h-5 w-5" />
        <span>Journal</span>
      </Link>

      {/* Run Mode */}
      <Link
        href="/run"
        className={cn(
          'sidebar-item',
          pathname === '/run' && 'active'
        )}
      >
        <Footprints className="h-5 w-5" />
        <span>Run Mode</span>
      </Link>

      {/* About */}
      <Link
        href="/about"
        className={cn(
          'sidebar-item',
          pathname === '/about' && 'active'
        )}
      >
        <Info className="h-5 w-5" />
        <span>About</span>
      </Link>

      {/* Spacer */}
      <div className="mt-auto">
        <p className="px-3 text-xs text-text-muted">
          New songs every Sunday
        </p>
      </div>
    </aside>
  );
}
