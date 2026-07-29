import Link from 'next/link';
import { Home, Music, Footprints } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl border-2 border-pulse/20 bg-pulse/5">
        <Footprints className="h-12 w-12 text-pulse" />
      </div>
      <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-3">
        404
      </h1>
      <h2 className="font-display text-lg font-semibold text-text-secondary mb-2">
        Lost Your Cadence?
      </h2>
      <p className="font-body text-sm text-text-muted mb-8 max-w-md">
        This page doesn&apos;t exist. But every runner takes a wrong turn sometimes — just get back on pace.
      </p>
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-pulse/30 bg-pulse/10 px-5 py-2.5 font-display text-sm font-medium text-pulse transition-all hover:bg-pulse/15 active:scale-95"
        >
          <Home className="h-4 w-4" />
          Home
        </Link>
        <Link
          href="/run"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface/40 px-5 py-2.5 font-display text-sm font-medium text-text-secondary transition-all hover:border-pulse/20 hover:text-text-primary active:scale-95"
        >
          <Music className="h-4 w-4" />
          Run Mode
        </Link>
      </div>
    </div>
  );
}
