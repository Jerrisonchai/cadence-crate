import Link from 'next/link';
import { Calendar, Clock, ArrowRight, BookOpen, Music, Footprints, Brain, Dumbbell } from 'lucide-react';

const articles = [
  {
    id: '1',
    slug: 'why-160-to-170-bpm',
    title: 'Why 160-170 BPM Is the Sweet Spot for Runners',
    excerpt: 'Elite marathoners run at 180 SPM. For the rest of us, 160-170 is where performance, safety, and enjoyment converge.',
    date: '2026-07-27',
    readTime: '4 min read',
    icon: Footprints,
    category: 'Training',
  },
  {
    id: '2',
    slug: 'how-music-syncs-your-stride',
    title: 'How Music Syncs Your Stride: The Neuroscience of Running to a Beat',
    excerpt: 'Your brain doesn\'t just hear music — it entrains to it. Here\'s how the right BPM literally changes the way you run.',
    date: '2026-07-20',
    readTime: '5 min read',
    icon: Brain,
    category: 'Science',
  },
  {
    id: '3',
    slug: 'building-the-perfect-running-playlist',
    title: 'Building the Perfect Running Playlist: A Step-by-Step Guide',
    excerpt: 'Not all 160 BPM songs work for running. Learn how to pick tracks that sustain energy, match your pace, and push through walls.',
    date: '2026-07-13',
    readTime: '6 min read',
    icon: Music,
    category: 'Guide',
  },
  {
    id: '4',
    slug: 'cadence-training-for-beginners',
    title: 'Cadence Training for Beginners: Start at 160 and Grow',
    excerpt: 'New to cadence running? Start here. A 4-week plan to go from zero to running in rhythm.',
    date: '2026-07-06',
    readTime: '7 min read',
    icon: Dumbbell,
    category: 'Training',
  },
  {
    id: '5',
    slug: 'chinese-pop-for-running',
    title: 'Why Chinese Pop Belongs on Your Running Playlist',
    excerpt: 'Mandopop and Cantopop aren\'t just for karaoke. The rhythmic structure, emotional arcs, and tempo make them perfect for running.',
    date: '2026-06-29',
    readTime: '4 min read',
    icon: Music,
    category: 'Culture',
  },
  {
    id: '6',
    slug: 'the-4-gate-validation',
    title: 'How We Verify Every Single BPM: Inside the 4-Gate Pipeline',
    excerpt: 'We don\'t trust a single data source. Every song passes through 4 quality gates before it enters the Cadence Crate library.',
    date: '2026-06-22',
    readTime: '3 min read',
    icon: BookOpen,
    category: 'Behind the Scenes',
  },
];

export default function JournalPage() {
  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center border-b border-border px-4 md:px-6 glass-safe">
        <h1 className="font-display text-lg md:text-xl font-bold bg-gradient-to-r from-pulse to-surge bg-clip-text text-transparent">
          Runner&apos;s Journal
        </h1>
      </header>

      <div className="mx-auto max-w-3xl px-4 md:px-6 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <p className="font-body text-sm text-text-secondary leading-relaxed">
            Weekly articles on cadence running, playlist science, training tips, and the intersection of music and movement. Written for runners, backed by research.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['All', 'Training', 'Science', 'Guide', 'Culture', 'Behind the Scenes'].map((cat) => (
            <button
              key={cat}
              className="rounded-full border border-border px-3 py-1 font-display text-[11px] font-medium text-text-muted hover:text-text-primary hover:border-pulse/30 transition-colors"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="space-y-4">
          {articles.map((article, i) => {
            const Icon = article.icon;
            return (
              <Link
                key={article.id}
                href={`/journal/${article.slug}`}
                className="group block rounded-2xl border border-border bg-surface/30 backdrop-blur-sm p-5 md:p-6 transition-all hover:border-pulse/20 hover:bg-surface/50"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 hidden sm:flex h-12 w-12 items-center justify-center rounded-xl bg-pulse/5 border border-pulse/10 group-hover:bg-pulse/10 transition-colors">
                    <Icon className="h-5 w-5 text-pulse" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="rounded-full border border-surge/15 bg-surge/5 px-2 py-0.5 font-display text-[10px] font-medium text-surge">
                        {article.category}
                      </span>
                      <span className="flex items-center gap-1 font-body text-[11px] text-text-muted">
                        <Calendar className="h-3 w-3" />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1 font-body text-[11px] text-text-muted">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </span>
                    </div>
                    <h3 className="font-display text-base md:text-lg font-bold text-text-primary group-hover:text-pulse transition-colors mb-1.5">
                      {article.title}
                    </h3>
                    <p className="font-body text-sm text-text-secondary line-clamp-2 mb-3">
                      {article.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 font-display text-xs font-medium text-pulse opacity-0 group-hover:opacity-100 transition-opacity">
                      Read article
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-10 rounded-2xl border border-pulse/10 bg-pulse/5 p-6 text-center">
          <BookOpen className="mx-auto h-6 w-6 text-pulse mb-3" />
          <h3 className="font-display text-base font-bold text-text-primary mb-2">
            More articles coming weekly
          </h3>
          <p className="font-body text-sm text-text-secondary mb-4 max-w-md mx-auto">
            We publish a new article every Monday covering cadence science, running tips, and playlist building.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-pulse/30 bg-pulse/10 px-5 py-2 font-display text-sm font-medium text-pulse transition-all hover:bg-pulse/15 active:scale-95"
          >
            Browse Songs While You Wait
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
