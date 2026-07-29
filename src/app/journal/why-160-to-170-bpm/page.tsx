import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

export default function ArticleCadenceSweetSpot() {
  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center border-b border-border px-4 md:px-6 glass-safe">
        <Link href="/journal" className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors">
          <ArrowLeft className="h-5 w-5" />
          <span className="font-display text-sm font-medium">Journal</span>
        </Link>
      </header>

      <article className="mx-auto max-w-2xl px-4 md:px-6 py-8 md:py-12">
        {/* Meta */}
        <div className="mb-6">
          <span className="inline-block rounded-full border border-surge/15 bg-surge/5 px-3 py-1 font-display text-[11px] font-medium text-surge mb-3">
            Training
          </span>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-text-primary mb-3">
            Why 160-170 BPM Is the Sweet Spot for Runners
          </h1>
          <div className="flex items-center gap-4 font-body text-sm text-text-muted">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              July 27, 2026
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              4 min read
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="prose-cadence font-body text-sm text-text-secondary leading-relaxed space-y-4">
          <p>
            Walk into any running store and they&apos;ll tell you: 180 steps per minute. That&apos;s the gold standard. Elite marathoners from Kipchoge to Kiptum all settle into this rhythm naturally. It minimizes ground contact time, reduces impact forces, and maximizes running economy.
          </p>

          <p>
            But here&apos;s what they don&apos;t tell you: <strong className="text-text-primary">for recreational runners, 180 SPM can feel like sprinting.</strong> If your easy pace is 6:30-7:00 min/km, forcing 180 cadence means taking unnaturally short, choppy steps. It feels awkward. It raises your heart rate. And it defeats the purpose.
          </p>

          <h2 className="font-display text-lg font-bold text-text-primary mt-8 mb-3">
            Enter the 160-170 Sweet Spot
          </h2>

          <p>
            Research from the <em>Journal of Sports Sciences</em> (2020) found that recreational runners achieve optimal running economy at a self-selected cadence between 160-170 SPM — not 180. At this range:
          </p>

          <ul className="space-y-2 pl-4 list-disc">
            <li><strong className="text-text-primary">Injury risk drops</strong> — Ground contact time is still reduced compared to 150-155 SPM overstriding, but without the metabolic cost of forcing 180.</li>
            <li><strong className="text-text-primary">Perceived exertion decreases</strong> — A study in <em>Frontiers in Psychology</em> showed that music-synced running at preferred cadence reduced RPE by 8-12%.</li>
            <li><strong className="text-text-primary">Pace locks in</strong> — 168 BPM naturally maps to roughly 5:40 min/km for most runners — ideal half-marathon tempo.</li>
          </ul>

          <h2 className="font-display text-lg font-bold text-text-primary mt-8 mb-3">
            The BPM-to-Pace Table
          </h2>

          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-surface/30">
                  <th className="p-3 font-display text-xs font-semibold text-text-muted">BPM</th>
                  <th className="p-3 font-display text-xs font-semibold text-text-muted">Cadence Label</th>
                  <th className="p-3 font-display text-xs font-semibold text-text-muted">~Pace (min/km)</th>
                  <th className="p-3 font-display text-xs font-semibold text-text-muted">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="p-3 font-display text-sm font-bold text-alert">160-163</td>
                  <td className="p-3 text-text-secondary">Base</td>
                  <td className="p-3 text-text-secondary">6:00-6:15</td>
                  <td className="p-3 text-text-secondary">Easy runs, recovery</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-3 font-display text-sm font-bold text-alert">164-167</td>
                  <td className="p-3 text-text-secondary">Zone</td>
                  <td className="p-3 text-text-secondary">5:40-6:00</td>
                  <td className="p-3 text-text-secondary">Tempo runs, steady state</td>
                </tr>
                <tr>
                  <td className="p-3 font-display text-sm font-bold text-pulse">168-170</td>
                  <td className="p-3 text-text-secondary">Peak</td>
                  <td className="p-3 text-text-secondary">5:20-5:40</td>
                  <td className="p-3 text-text-secondary">Race pace, intervals</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="font-display text-lg font-bold text-text-primary mt-8 mb-3">
            How to Use This
          </h2>

          <p>
            Start a run and find a comfortable pace. Count your steps for 15 seconds and multiply by 4. That&apos;s your natural cadence. If it&apos;s below 160, you&apos;re likely overstriding — try shortening your stride slightly.
          </p>

          <p>
            Then pick songs in that BPM range. The beat becomes your metronome. Your feet will sync automatically — you don&apos;t have to think about it. After 2-3 runs, the new cadence becomes automatic.
          </p>

          <h2 className="font-display text-lg font-bold text-text-primary mt-8 mb-3">
            The Bottom Line
          </h2>

          <p>
            180 SPM is aspirational. <strong className="text-text-primary">160-170 SPM is actionable.</strong> It&apos;s the range where science meets reality — where you get the injury prevention benefits of higher cadence without fighting your body&apos;s natural rhythm.
          </p>

          <p className="text-text-muted">
            That&apos;s why Cadence Crate focuses on this range. Not because 180 is wrong — but because 160-170 is where most runners actually need to be. And the right playlist gets you there without thinking.
          </p>
        </div>

        {/* Back CTA */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-pulse/30 bg-pulse/10 px-5 py-2.5 font-display text-sm font-medium text-pulse transition-all hover:bg-pulse/15 active:scale-95"
          >
            Find Songs at Your Cadence
          </Link>
        </div>
      </article>
    </>
  );
}
