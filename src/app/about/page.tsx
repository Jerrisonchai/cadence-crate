import { Activity, Zap, Music, Timer } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center border-b border-border px-6 glass">
        <h1 className="font-display text-xl font-bold bg-gradient-to-r from-pulse to-surge bg-clip-text text-transparent">
          About
        </h1>
      </header>

      <div className="mx-auto max-w-2xl px-4 md:px-6 py-8 md:py-12 space-y-8 md:space-y-12">
        {/* Mission */}
        <section className="rounded-2xl border border-border bg-surface/40 p-8 backdrop-blur-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pulse/10">
              <Zap className="h-5 w-5 text-pulse" />
            </div>
            <h2 className="font-display text-lg font-bold text-text-primary">
              Our Mission
            </h2>
          </div>
          <p className="font-body text-sm leading-relaxed text-text-secondary">
            Cadence running — matching your foot strikes to music beats at
            160-170 steps per minute — is scientifically proven to improve
            running economy, reduce injury risk, and make running feel
            effortless.
          </p>
          <p className="mt-3 font-body text-sm leading-relaxed text-text-secondary">
            But finding songs at exactly 160-170 BPM? Especially Chinese songs?
            Nearly impossible. Until now.
          </p>
          <p className="mt-3 font-body text-sm leading-relaxed text-text-secondary">
            We built Cadence Crate because every runner deserves a playlist
            that matches their stride — in whatever language moves them.
          </p>
        </section>

        {/* Science */}
        <section className="rounded-2xl border border-border bg-surface/40 p-8 backdrop-blur-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surge/10">
              <Activity className="h-5 w-5 text-surge" />
            </div>
            <h2 className="font-display text-lg font-bold text-text-primary">
              The Science of Cadence
            </h2>
          </div>
          <ul className="space-y-3 font-body text-sm text-text-secondary">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-pulse" />
              <span>Elite runners average <strong className="text-text-primary">180 steps/minute</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-pulse" />
              <span>Recreational runners benefit most at <strong className="text-text-primary">160-170 steps/min</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-pulse" />
              <span>Music-synced running reduces perceived exertion by up to <strong className="text-text-primary">10%</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-pulse" />
              <span>The right BPM can improve running economy by <strong className="text-text-primary">5-7%</strong></span>
            </li>
          </ul>
        </section>

        {/* How It Works */}
        <section className="rounded-2xl border border-border bg-surface/40 p-8 backdrop-blur-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warm/10">
              <Music className="h-5 w-5 text-warm" />
            </div>
            <h2 className="font-display text-lg font-bold text-text-primary">
              How It Works
            </h2>
          </div>
          <ol className="space-y-4 font-body text-sm text-text-secondary">
            {[
              'Browse by your favorite decade or genre',
              'Check the verified BPM on each song',
              'Preview songs that match your stride',
              'Save favorites to build your perfect running mix',
              'Export to Spotify and hit the road',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-pulse/10 font-display text-xs font-bold text-pulse">
                  {i + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Library Stats */}
        <section className="rounded-2xl border border-border bg-surface/40 p-8 backdrop-blur-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-alert/10">
              <Timer className="h-5 w-5 text-alert" />
            </div>
            <h2 className="font-display text-lg font-bold text-text-primary">
              Library Stats
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: 'Songs', value: '8' },
              { label: 'Chinese', value: '4' },
              { label: 'English', value: '4' },
              { label: 'Decades', value: '4' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border bg-surface/50 p-4 text-center"
              >
                <div className="font-display text-2xl font-bold text-pulse">
                  {stat.value}
                </div>
                <div className="mt-1 font-body text-xs text-text-muted">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center font-body text-xs text-text-muted">
            🆕 New songs added every Sunday via BPM Collector
          </p>
        </section>

        {/* Mobile quote — visible only on mobile */}
        <section className="rounded-2xl border border-pulse/10 bg-pulse/5 p-6 backdrop-blur-sm md:hidden">
          <p className="font-body text-sm italic text-text-secondary text-center">
            &ldquo;No human is limited.&rdquo;
          </p>
          <p className="mt-1 text-center font-display text-xs font-semibold text-surge">
            — Eliud Kipchoge, Marathon WR Holder
          </p>
        </section>
      </div>
    </>
  );
}
