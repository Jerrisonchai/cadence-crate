import { Heart, Play, ExternalLink, ArrowLeft, Gauge, Zap, Activity } from 'lucide-react';
import Link from 'next/link';

export default function SongDetailPage() {
  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center border-b border-border px-6 glass">
        <Link href="/" className="flex items-center gap-2 font-body text-sm text-text-secondary transition-colors hover:text-text-primary">
          <ArrowLeft className="h-4 w-4" />
          Back to Browse
        </Link>
      </header>

      <div className="mx-auto max-w-2xl px-6 py-16 text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-surface/50">
            <Music className="h-8 w-8 text-text-muted" />
          </div>
        </div>
        <h3 className="mb-2 font-display text-lg font-semibold text-text-primary">
          Song Detail
        </h3>
        <p className="font-body text-sm text-text-secondary">
          Select a song from the library to view details, BPM data, and preview.
        </p>
      </div>
    </>
  );
}

function Music({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}
