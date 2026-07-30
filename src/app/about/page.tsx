import Link from 'next/link';
import { BookOpen, Footprints, Music, Target, TrendingUp, Zap, Heart, Flame, Award, Brain } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center border-b border-border px-4 md:px-6 glass-safe">
        <h1 className="font-display text-lg md:text-xl font-bold bg-gradient-to-r from-pulse to-surge bg-clip-text text-transparent">
          About Cadence Crate
        </h1>
      </header>

      <div className="mx-auto max-w-3xl px-4 md:px-6 py-8 md:py-12 space-y-10 md:space-y-14">

        {/* Hero — Emotional Hook */}
        <section className="text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-pulse/10 border border-pulse/20">
            <Zap className="h-8 w-8 text-pulse" />
          </div>
          <h2 className="mb-3 font-display text-2xl md:text-4xl font-bold text-text-primary leading-tight">
            The right song can change <span className="bg-gradient-to-r from-pulse via-white to-surge bg-clip-text text-transparent">everything</span>.
          </h2>
          <p className="font-body text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
            Ever hit the wall mid-run — then the <em>perfect</em> song drops, and suddenly your legs have a second life? That's not luck. That's cadence running.
          </p>
          <p className="mt-4 font-body text-base text-text-secondary max-w-xl mx-auto leading-relaxed">
            We built Cadence Crate to put that feeling on repeat. A BPM-verified music library for runners — 160 to 170 beats per minute, Chinese and English tracks, validated by science. Not guesswork.
          </p>
        </section>

        {/* The Problem — Pain Point */}
        <section className="rounded-2xl border border-border bg-surface/30 backdrop-blur-sm p-6 md:p-8">
          <h3 className="flex items-center gap-2 font-display text-lg font-bold text-text-primary mb-4">
            <Flame className="h-5 w-5 text-alert" />
            The Problem Nobody Talks About
          </h3>
          <p className="font-body text-sm text-text-secondary leading-relaxed mb-3">
            Elite marathoners average <strong className="text-text-primary">180 steps per minute</strong>. For recreational runners, <strong className="text-text-primary">160-170 SPM</strong> is the sweet spot — better running economy, lower injury risk, and faster recovery.
          </p>
          <p className="font-body text-sm text-text-secondary leading-relaxed mb-3">
            But try finding songs at exactly 160-170 BPM. <strong className="text-text-primary">Spotify has no BPM search bar.</strong> Apple Music ignores tempo. Most "running playlists" are just random tracks someone thought sounded fast.
          </p>
          <p className="font-body text-sm text-text-secondary leading-relaxed mb-3">
            And if you want <strong className="text-text-primary">Chinese songs</strong> in your running mix? Forget it. You're stuck tapping BPMs yourself — one song at a time.
          </p>
          <p className="font-body text-sm text-text-secondary leading-relaxed font-semibold text-pulse">
            We got tired of that. So we built the thing that should have existed years ago.
          </p>
        </section>

        {/* The Solution */}
        <section className="rounded-2xl border border-pulse/20 bg-gradient-to-br from-pulse/5 to-surge/5 p-6 md:p-8">
          <h3 className="flex items-center gap-2 font-display text-lg font-bold text-text-primary mb-4">
            <Award className="h-5 w-5 text-pulse" />
            BPM That You Can Trust — Literally
          </h3>
          <p className="font-body text-sm text-text-secondary leading-relaxed mb-4">
            Cadence Crate is a <strong className="text-text-primary">curated library</strong> where every single song's BPM passes through our 3-tier verification pipeline:
          </p>
          <div className="space-y-3">
            {[
              { tier: 'Tier 1', label: 'Web Verification', desc: 'We scrape Tunebat & SongBPM — two independent BPM databases — and cross-check every track. Two sources must agree before we trust the number.' },
              { tier: 'Tier 2', label: 'Audio Analysis', desc: 'For songs already in our library, we run numpy/SciPy onset detection directly on the audio waveform. Science-engineered, not database-copied.' },
              { tier: 'Tier 3', label: 'Manual Tap Test', desc: 'Our built-in tap tool lets us (and you) verify any BPM in seconds. If Tier 1 and Tier 2 disagree, the human ear breaks the tie.' },
            ].map((item) => (
              <div key={item.tier} className="flex gap-4 rounded-xl border border-pulse/10 bg-surface/20 p-4">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-pulse text-[10px] font-display font-bold text-void">
                  {item.tier}
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-text-primary">{item.label}</h4>
                  <p className="font-body text-xs text-text-secondary mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 font-body text-sm text-text-secondary leading-relaxed">
            <strong className="text-surge">Result:</strong> Every song in the crate has a BPM you can actually trust. No "approximately 160." No "sounds about right." No wrong tempos throwing off your stride.
          </p>
        </section>

        {/* Philosophy — Ian Charman Inspired */}
        <section className="rounded-2xl border border-border bg-surface/30 backdrop-blur-sm p-6 md:p-8">
          <h3 className="flex items-center gap-2 font-display text-lg font-bold text-text-primary mb-4">
            <Brain className="h-5 w-5 text-surge" />
            Our Philosophy
          </h3>
          <p className="font-body text-sm text-text-secondary leading-relaxed mb-4">
            Cadence Crate is built on a simple belief: <strong className="text-text-primary">the right music makes running feel effortless.</strong>
          </p>
          <p className="font-body text-sm text-text-secondary leading-relaxed mb-3">
            Your brain entrains to rhythm automatically. When music matches your stride, you stop thinking about pace and start flowing. Runners report lower perceived exertion, longer endurance, and — most importantly — <strong className="text-text-primary">more fun.</strong>
          </p>
          <p className="font-body text-sm text-text-secondary leading-relaxed mb-3">
            We don't just throw songs at you. We think about <strong className="text-text-primary">decade, language, genre, energy, and emotional arc.</strong> A 1980s Mandopop ballad at 162 BPM hits different than a 2020s rock anthem at 168 BPM. Both belong in your rotation — but at different moments of your run.
          </p>
          <div className="mt-5 rounded-xl border border-pulse/10 bg-pulse/5 p-4">
            <p className="font-body text-sm italic text-text-secondary leading-relaxed">
              "Being consistently good is better than being heroic every now and then."
            </p>
            <p className="mt-2 font-display text-xs font-semibold text-surge">— Ian Charman, The Art of Ultra Running</p>
            <p className="mt-1 font-body text-[11px] text-text-muted">
              That's our north star. Better to release a few verified tracks every week than flood you with unverified noise. Consistency over heroics — in running and in curation.
            </p>
          </div>
        </section>

        {/* Science of Cadence */}
        <section className="rounded-2xl border border-border bg-surface/30 backdrop-blur-sm p-6 md:p-8">
          <h3 className="flex items-center gap-2 font-display text-lg font-bold text-text-primary mb-4">
            <TrendingUp className="h-5 w-5 text-surge" />
            The Science Behind 160-170 BPM
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: '👟', title: '180 SPM Gold Standard', desc: 'Elite marathoners average 180 steps per minute. Most recreational runners benefit most at 160-170 SPM — enough elevation without overstriding.' },
              { icon: '🧠', title: 'Auditory-Motor Entrainment', desc: 'Your motor cortex syncs to rhythm automatically. Studies show music-matched running reduces perceived exertion by up to 10%.' },
              { icon: '📈', title: 'Running Economy Boost', desc: 'The right BPM can improve oxygen efficiency by 5-7%. Same effort. Faster times. No extra training needed.' },
              { icon: '🛡️', title: 'Impact Force Reduction', desc: 'Higher cadence shortens ground contact time, reducing impact forces on your knees, hips, and ankles with every step.' },
              { icon: '🎯', title: 'Race Pace Lock-in', desc: '160-170 BPM translates to roughly 5:30–6:15 min/km pace — ideal for marathon tempo, half-marathon racing, and threshold training.' },
              { icon: '🔄', title: 'The Metronome Effect', desc: 'Your feet sync to the downbeat automatically. The right playlist is hands-free pacing — no watch, no beeps, just flow.' },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-surface/40 p-4">
                <div className="text-2xl mb-2">{item.icon}</div>
                <h4 className="font-display text-sm font-bold text-text-primary mb-1">{item.title}</h4>
                <p className="font-body text-xs text-text-secondary leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How to Use This Website — Comprehensive */}
        <section className="rounded-2xl border border-pulse/20 bg-gradient-to-br from-pulse/3 to-surge/3 p-6 md:p-8">
          <h3 className="flex items-center gap-2 font-display text-lg font-bold text-text-primary mb-6">
            <Footprints className="h-5 w-5 text-pulse" />
            How to Use This Website
          </h3>

          {/* 1. Song Details */}
          <div className="mb-6">
            <h4 className="font-display text-base font-bold text-pulse mb-3">📋 What's on Every Song Card</h4>
            <p className="font-body text-sm text-text-secondary leading-relaxed mb-3">
              Each song in the Browse page shows all the information you need to build the perfect running playlist:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { label: 'BPM', desc: 'Beats per minute — verified through our 3-tier pipeline' },
                { label: 'Genre', desc: 'Pop, Rock, Mandopop, Electronic & more' },
                { label: 'Language', desc: '中文 or English — filter by either' },
                { label: 'Audio Profile', desc: 'Energy, danceability & valence scores (0-100)' },
                { label: 'Artist', desc: 'Who made the track' },
                { label: 'Album', desc: 'Where it came from' },
                { label: 'Year', desc: 'Release year — filter by decade' },
                { label: 'BPM Verified', desc: 'Confidence badge: HIGH / MEDIUM / LOW' },
              ].map((item) => (
                <div key={item.label} className="rounded-lg border border-border bg-surface/40 px-3 py-2">
                  <span className="font-display text-[11px] font-bold text-text-primary">{item.label}</span>
                  <p className="font-body text-[11px] text-text-muted mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 2. BPM Color System */}
          <div className="mb-6 rounded-xl border border-border bg-surface/40 p-4">
            <h4 className="font-display text-base font-bold text-pulse mb-3">🎨 BPM Color Indicators</h4>
            <p className="font-body text-sm text-text-secondary leading-relaxed mb-3">
              Every song card and the Run Mode display use a color-coded system to instantly tell you which zone you're in:
            </p>
            <div className="space-y-2">
              {[
                { color: '#A3FF12', label: 'PEAK (168-170 BPM)', desc: 'Green — Maximum cadence synergy. Your stride and the beat are perfectly locked. Best for race pace and speed work.' },
                { color: '#F59E0B', label: 'ZONE (164-167 BPM)', desc: 'Amber — Strong cadence match. Great for tempo runs and sustained effort. Comfortably fast.' },
                { color: '#EF4444', label: 'BASE (160-163 BPM)', desc: 'Red — Entry-level cadence. Ideal for warm-ups, recovery runs, and building your form at lower intensity.' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3 rounded-lg border border-border bg-surface/30 p-3">
                  <div className="mt-0.5 h-4 w-4 flex-shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
                  <div>
                    <span className="font-display text-[11px] font-bold" style={{ color: item.color }}>{item.label}</span>
                    <p className="font-body text-[11px] text-text-secondary mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Suggested Running BPM Sequence */}
          <div className="mb-6 rounded-xl border border-surge/20 bg-surge/5 p-4">
            <h4 className="font-display text-base font-bold text-surge mb-3">🏃 Suggested Running BPM Sequence</h4>
            <p className="font-body text-sm text-text-secondary leading-relaxed mb-3">
              Think of your run like a story with a beginning, middle, and end. Your music should follow:
            </p>
            <div className="space-y-2">
              {[
                { phase: '1. Warm-Up (0-5 min)', bpm: '160-163 BPM (BASE)', desc: 'Start easy. Low-energy tracks. Find your rhythm. Let the beat guide your feet into a comfortable cadence.' },
                { phase: '2. Build (5-15 min)', bpm: '164-167 BPM (ZONE)', desc: 'Pick up the pace. Medium-energy tracks. Your breathing steadies. The miles start to feel effortless.' },
                { phase: '3. Peak (15-40 min)', bpm: '168-170 BPM (PEAK)', desc: "Full stride lock. High-energy anthems. This is where you forget you're running. Flow state unlocked." },
                { phase: '4. Cool Down (last 5 min)', bpm: '160-163 BPM (BASE)', desc: 'Ease back. Let your heart rate come down. Celebrate the effort with something uplifting.' },
              ].map((item) => (
                <div key={item.phase} className="flex flex-col rounded-lg border border-border bg-surface/40 p-3">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-xs font-bold text-text-primary">{item.phase}</span>
                    <span className="rounded-full border border-pulse/20 bg-pulse/5 px-2 py-px font-display text-[10px] text-pulse">{item.bpm}</span>
                  </div>
                  <p className="font-body text-[11px] text-text-secondary mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Favorites & Drag */}
          <div className="mb-6 rounded-xl border border-border bg-surface/40 p-4">
            <h4 className="font-display text-base font-bold text-pulse mb-3">❤️ Build Your Playlist</h4>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-alert/10 border border-alert/20 font-display text-sm text-alert">1</div>
                <div>
                  <h5 className="font-display text-sm font-bold text-text-primary">Heart the Songs You Love</h5>
                  <p className="font-body text-xs text-text-secondary mt-0.5">Click the heart icon on any song card in Browse to add it to your Favorites. No account needed — saved directly to your device.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-alert/10 border border-alert/20 font-display text-sm text-alert">2</div>
                <div>
                  <h5 className="font-display text-sm font-bold text-text-primary">Drag to Arrange Your Sequence</h5>
                  <p className="font-body text-xs text-text-secondary mt-0.5">Go to Favorites and drag the grip handle (⠿) on each card to reorder your playlist. Your warm-up song at the top, peak anthem in the middle, cool-down at the end.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-alert/10 border border-alert/20 font-display text-sm text-alert">3</div>
                <div>
                  <h5 className="font-display text-sm font-bold text-text-primary">Click Run to Start</h5>
                  <p className="font-body text-xs text-text-secondary mt-0.5">Hit the Run button to launch into full-screen run mode. Giant BPM display. Pulsing rings. Your playlist plays in the exact order you arranged.</p>
                </div>
              </div>
            </div>
          </div>

          {/* 5. Run Mode */}
          <div className="rounded-xl border border-surge/20 bg-surge/5 p-4">
            <h4 className="font-display text-base font-bold text-surge mb-3">▶️ Run Mode — Two Ways to Run</h4>
            <p className="font-body text-sm text-text-secondary leading-relaxed mb-3">
              When you hit Run, you get two modes — each matching exactly what you see on the source page:
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="rounded-lg border border-pulse/20 bg-surface/40 p-3">
                <h5 className="font-display text-sm font-bold text-pulse flex items-center gap-1.5">
                  <span className="text-lg">📂</span> Browse Mode
                </h5>
                <ul className="mt-2 space-y-1 text-[11px] text-text-secondary font-body">
                  <li>• Plays the exact filtered list from Browse</li>
                  <li>• Filter by decade, genre, language & sort order</li>
                  <li>• Pulse green theme</li>
                  <li>• Full 8-track library</li>
                </ul>
              </div>
              <div className="rounded-lg border border-surge/20 bg-surface/40 p-3">
                <h5 className="font-display text-sm font-bold text-surge flex items-center gap-1.5">
                  <span className="text-lg">❤️</span> Favorites Mode
                </h5>
                <ul className="mt-2 space-y-1 text-[11px] text-text-secondary font-body">
                  <li>• Plays only your Favorites playlist</li>
                  <li>• Songs play in your drag-sorted order</li>
                  <li>• Surge blue theme</li>
                  <li>• Your personal running soundtrack</li>
                </ul>
              </div>
            </div>
            <p className="mt-3 font-body text-xs text-text-muted">
              💡 <strong>Pro tip:</strong> The playlist you see in Browse or Favorites is exactly what plays in Run Mode. Filter first, arrange first, then run.
            </p>
          </div>
        </section>

        {/* Library Stats */}
        <section className="rounded-2xl border border-border bg-surface/30 backdrop-blur-sm p-6 md:p-8">
          <h3 className="flex items-center gap-2 font-display text-lg font-bold text-text-primary mb-4">
            <Music className="h-5 w-5 text-surge" />
            The Library
          </h3>
          <p className="font-body text-sm text-text-secondary mb-6 leading-relaxed">
            We're building this <strong>decade by decade, language by language.</strong> Every Saturday night, our BPM Searcher scans YouTube for new 160-170 BPM tracks. Every Sunday morning, our Collector downloads, verifies, and adds the best ones. The crate grows. Your options grow.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Decades', value: '1980s–2020s' },
              { label: 'Languages', value: '中文 + English' },
              { label: 'BPM Target', value: '160–170 BPM' },
              { label: 'Verification', value: '3-Tier Pipeline' },
              { label: 'New Tracks', value: 'Every Sunday' },
              { label: 'Genres', value: 'Pop, Rock, Mando+' },
              { label: 'Cost', value: 'Free Forever' },
              { label: 'Audio', value: 'MP3 Included' },
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
            Runner's Journal
          </h3>
          <p className="font-body text-sm text-text-secondary leading-relaxed mb-4">
            Read our weekly articles on cadence training, playlist psychology, pacing strategy, and the science behind music-powered running. Not just BPM data — real insights from coaches and runners.
          </p>
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 rounded-xl border border-pulse/30 bg-pulse/10 px-5 py-2.5 font-display text-sm font-medium text-pulse transition-all hover:bg-pulse/15 active:scale-95"
          >
            <BookOpen className="h-4 w-4" />
            Read the Journal
          </Link>
        </section>

        {/* Weekly + Final CTA */}
        <section className="rounded-2xl border border-surge/10 bg-gradient-to-r from-surge/5 to-pulse/5 p-6 text-center">
          <p className="font-body text-xs text-text-secondary mb-1">
            🆕 New songs every Sunday via automated BPM Collection pipeline
          </p>
          <p className="font-body text-[11px] text-text-muted">
            Built by runners • Fueled by science • Powered by music
          </p>
        </section>
      </div>
    </>
  );
}
