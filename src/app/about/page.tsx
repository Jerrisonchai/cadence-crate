import Link from 'next/link';
import { BookOpen, Footprints, Music, Target, TrendingUp, Zap, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center border-b border-border px-4 md:px-6 glass-safe">
        <h1 className="font-display text-lg md:text-xl font-bold bg-gradient-to-r from-pulse to-surge bg-clip-text text-transparent">
          About Cadence Crate
        </h1>
      </header>

      <div className="mx-auto max-w-3xl px-4 md:px-6 py-8 md:py-12 space-y-10 md:space-y-14">

        {/* Hero */}
        <section className="text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-pulse/10 border border-pulse/20">
            <Zap className="h-8 w-8 text-pulse" />
          </div>
          <h2 className="mb-3 font-display text-2xl md:text-3xl font-bold text-text-primary">
            Find Your Rhythm. Hit Your Stride.
          </h2>
          <p className="font-body text-base text-text-secondary max-w-xl mx-auto leading-relaxed">
            The first BPM-verified music library for runners. 160-170 beats per minute. Chinese and English songs. Every single track validated by science, not guesswork.
          </p>
        </section>

        {/* Mission */}
        <section className="rounded-2xl border border-border bg-surface/30 backdrop-blur-sm p-6 md:p-8">
          <h3 className="flex items-center gap-2 font-display text-lg font-bold text-text-primary mb-4">
            <Target className="h-5 w-5 text-pulse" />
            Our Mission
          </h3>
          <p className="font-body text-sm text-text-secondary leading-relaxed">
            Cadence running — matching your foot strikes to music beats at 160-170 steps per minute — is scientifically proven to improve running economy, reduce injury risk, and make running feel effortless.
          </p>
          <p className="mt-3 font-body text-sm text-text-secondary leading-relaxed">
            But finding songs at exactly 160-170 BPM? Especially if you want Chinese songs mixed in? Nearly impossible. Spotify has no BPM search. Apple Music ignores tempo. Most BPM tools list random tracks with unverified data.
          </p>
          <p className="mt-3 font-body text-sm text-text-secondary leading-relaxed">
            <strong className="text-text-primary">We fixed that.</strong> Cadence Crate is a curated library where <strong>every song&apos;s BPM has been verified through our 4-gate validation pipeline</strong> — Spotify double-checked, cross-referenced, and confirmed. No guessing. No wrong tempos throwing off your stride.
          </p>
        </section>

        {/* Science of Cadence */}
        <section className="rounded-2xl border border-border bg-surface/30 backdrop-blur-sm p-6 md:p-8">
          <h3 className="flex items-center gap-2 font-display text-lg font-bold text-text-primary mb-4">
            <TrendingUp className="h-5 w-5 text-surge" />
            The Science of Cadence
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: '👟', title: '180 SPM Gold Standard', desc: 'Elite marathoners average 180 steps per minute. Recreational runners benefit most at 160-170 SPM.' },
              { icon: '🧠', title: 'Reduced Perceived Exertion', desc: 'Studies show music-synced running reduces RPE by up to 10%, making hard efforts feel manageable.' },
              { icon: '📈', title: 'Better Running Economy', desc: 'The right BPM can improve oxygen efficiency by 5-7%, letting you run faster with the same effort.' },
              { icon: '🛡️', title: 'Injury Prevention', desc: 'Higher cadence reduces ground contact time and impact forces on knees, hips, and ankles.' },
              { icon: '🎯', title: 'Race Pace Lock-in', desc: '160-170 BPM equals 5:30-6:15 min/km pace — ideal for marathon tempo and half-marathon race pace.' },
              { icon: '🔄', title: 'Auto-Pacing Effect', desc: 'Your feet naturally sync to the downbeat. The right playlist becomes your metronome — hands-free pacing.' },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-surface/40 p-4">
                <div className="text-2xl mb-2">{item.icon}</div>
                <h4 className="font-display text-sm font-bold text-text-primary mb-1">{item.title}</h4>
                <p className="font-body text-xs text-text-secondary leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How to Use */}
        <section className="rounded-2xl border border-border bg-surface/30 backdrop-blur-sm p-6 md:p-8">
          <h3 className="flex items-center gap-2 font-display text-lg font-bold text-text-primary mb-4">
            <Footprints className="h-5 w-5 text-alert" />
            How to Use Cadence Crate
          </h3>
          <div className="space-y-4">
            {[
              { step: '1', title: 'Browse by Decade or Genre', desc: 'Find songs from the 1980s all the way to the 2020s. Filter by Pop, Rock, Mandopop, Cantopop, and more.' },
              { step: '2', title: 'Check the BPM Badge', desc: 'Every song displays its verified BPM. Green = peak cadence (168-170), orange = zone (164-167), red = base (160-163).' },
              { step: '3', title: 'Tap to See Details', desc: 'View full audio profile — energy, danceability, and mood scores — plus the cadence match analysis.' },
              { step: '4', title: 'Save Your Favorites', desc: 'Tap the heart to build your running playlist. All favorites saved on your device.' },
              { step: '5', title: 'Hit the Road', desc: 'Open your playlist, sync your steps to the beat, and let the music carry you.' },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-pulse/10 border border-pulse/20 font-display text-sm font-bold text-pulse">
                  {item.step}
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-text-primary">{item.title}</h4>
                  <p className="font-body text-xs text-text-secondary mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Library Stats */}
        <section className="rounded-2xl border border-border bg-surface/30 backdrop-blur-sm p-6 md:p-8">
          <h3 className="flex items-center gap-2 font-display text-lg font-bold text-text-primary mb-4">
            <Music className="h-5 w-5 text-surge" />
            The Library
          </h3>
          <p className="font-body text-sm text-text-secondary mb-6 leading-relaxed">
            We&apos;re building this library <strong>decade by decade</strong>, language by language. Every Sunday at 2AM, our BPM Collector scans Spotify for new 160-170 BPM tracks, validates them through 4 quality gates, and adds the verified ones to the crate.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Decades', value: '1980s–2020s' },
              { label: 'Languages', value: 'Chinese + English' },
              { label: 'BPM Range', value: '160–170 BPM' },
              { label: 'Validation', value: '4-Gate Verified' },
              { label: 'Updates', value: 'Every Sunday' },
              { label: 'Genres', value: 'Pop, Rock, Mandopop+' },
              { label: 'Cost', value: 'Free Forever' },
              { label: 'Method', value: 'Spotify × Tunebat' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg border border-border bg-surface/40 p-3 text-center">
                <div className="font-display text-xs font-medium text-text-muted mb-0.5">{stat.label}</div>
                <div className="font-display text-sm font-bold text-text-primary">{stat.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Journal CTA */}
        <section className="rounded-2xl border border-pulse/10 bg-pulse/5 p-6 md:p-8">
          <h3 className="flex items-center gap-2 font-display text-lg font-bold text-text-primary mb-3">
            <BookOpen className="h-5 w-5 text-pulse" />
            Runner&apos;s Journal
          </h3>
          <p className="font-body text-sm text-text-secondary leading-relaxed mb-4">
            Read our weekly articles on cadence training, playlist psychology, running form tips, and the science behind music-powered running.
          </p>
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 rounded-xl border border-pulse/30 bg-pulse/10 px-5 py-2.5 font-display text-sm font-medium text-pulse transition-all hover:bg-pulse/15 active:scale-95"
          >
            <BookOpen className="h-4 w-4" />
            Read the Journal
          </Link>
        </section>

        {/* Weekly Update */}
        <section className="rounded-2xl border border-surge/10 bg-surge/5 p-6 text-center">
          <p className="font-body text-xs text-text-secondary">
            🆕 New songs added every Sunday via BPM Collector. The library grows week by week.
          </p>
        </section>

        {/* Mobile quote */}
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
