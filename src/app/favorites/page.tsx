import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function FavoritesPage() {
  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center border-b border-border px-6 glass">
        <h1 className="font-display text-xl font-bold bg-gradient-to-r from-pulse to-surge bg-clip-text text-transparent">
          My Favorites
        </h1>
      </header>

      <div className="flex flex-col items-center justify-center py-24 px-6">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-surface/50">
          <Heart className="h-8 w-8 text-text-muted" />
        </div>
        <h3 className="mb-2 font-display text-lg font-semibold text-text-primary">
          No favorites saved yet
        </h3>
        <p className="mb-6 max-w-md text-center font-body text-sm text-text-secondary">
          Browse songs and click the heart icon to save your running playlist.
          Sign in to sync favorites across devices.
        </p>
        <Link
          href="/"
          className="rounded-lg border border-pulse/30 bg-pulse/5 px-6 py-2 font-display text-sm font-medium text-pulse transition-all hover:bg-pulse/10"
        >
          Browse Songs
        </Link>
      </div>
    </>
  );
}
