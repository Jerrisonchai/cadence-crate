import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, Quote } from 'lucide-react';

export default function NoLongRunsArticle() {
  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center border-b border-border px-4 md:px-6 glass-safe">
        <Link href="/journal" className="flex items-center gap-2 font-display text-sm text-text-muted hover:text-text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Journal
        </Link>
        <h1 className="ml-4 font-display text-lg md:text-xl font-bold bg-gradient-to-r from-pulse to-surge bg-clip-text text-transparent truncate">
          You Don't Need 10-Hour Long Runs
        </h1>
      </header>

      <article className="mx-auto max-w-3xl px-4 md:px-6 py-8 md:py-12">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3 text-text-muted">
            <span className="rounded-full border border-surge/15 bg-surge/5 px-2.5 py-0.5 font-display text-[10px] font-medium text-surge">Training</span>
            <span className="flex items-center gap-1 font-body text-[11px]"><Calendar className="h-3 w-3" />2026-07-30</span>
            <span className="flex items-center gap-1 font-body text-[11px]"><Clock className="h-3 w-3" />5 min read</span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary mb-4 leading-tight">
            Why You Don't Need 10-Hour Long Runs
          </h2>
          <p className="font-body text-base text-text-secondary leading-relaxed">
            Ian Charman won the Rocky Raccoon 100-mile race in 12.5 hours. His longest training run? About 3 hours and 45 minutes. Let that sink in.
          </p>
        </div>

        <div className="rounded-2xl border border-pulse/10 bg-pulse/5 p-5 mb-8">
          <Quote className="h-5 w-5 text-pulse mb-2" />
          <p className="font-body text-lg italic text-text-primary leading-relaxed">
            "From a physiological point of view, you don't need uber-long long runs. There's just more risk for injury and it takes longer to recover."
          </p>
          <p className="mt-2 font-display text-xs font-semibold text-surge">— Ian Charman, 280+ marathons and ultras</p>
        </div>

        <div className="space-y-6 font-body text-sm text-text-secondary leading-relaxed">
          <section>
            <h3 className="font-display text-lg font-bold text-text-primary mb-3">What Jack Daniels Said</h3>
            <p className="mb-3">
              Ian once attended a talk by Jack Daniels — the legendary Olympic coach, PhD exercise physiologist, and author of "Daniels' Running Formula." Daniels coached athletes up to the marathon distance, typically capping long runs at around <strong className="text-text-primary">2.5 hours.</strong>
            </p>
            <p className="mb-3">
              Ian asked him the question every ultra runner wants to know: should we be running longer?
            </p>
            <p className="mb-3">
              Daniels' response: <strong className="text-text-primary">"No. I don't see any physiological reason why you need to do much longer runs."</strong>
            </p>
            <p>
              The endurance adaptations — mitochondrial density, capillary development, fat oxidation efficiency — are stimulated by the same physiological processes in a 3-hour run as in a 10-hour run. The 10-hour run just adds injury risk, recovery debt, and logistical nightmares.
            </p>
          </section>

          <section>
            <h3 className="font-display text-lg font-bold text-text-primary mb-3">The Real Reason to Go Longer Than 4 Hours</h3>
            <p className="mb-3">
              Ian argues there are valid reasons to do longer runs — but <strong className="text-text-primary">none of them are physiological:</strong>
            </p>
            <div className="space-y-3">
              <div className="rounded-xl border border-border bg-surface/30 p-4">
                <h4 className="font-display text-sm font-bold text-text-primary mb-1">🧪 Test Your Gear</h4>
                <p className="text-xs">Does your hydration vest chafe after 6 hours? Do your shoes hold up on technical terrain? What happens to your headlamp battery in the dark? These are things a 4-hour run won't reveal. But a 6-hour run will.</p>
              </div>
              <div className="rounded-xl border border-border bg-surface/30 p-4">
                <h4 className="font-display text-sm font-bold text-text-primary mb-1">🍽️ Practice Nutrition</h4>
                <p className="text-xs">Eating 60g of carbs per hour for 10 hours is a skill. Your stomach needs training too. A 50-mile training run teaches you what works and what doesn't before race day makes you pay for mistakes.</p>
              </div>
              <div className="rounded-xl border border-border bg-surface/30 p-4">
                <h4 className="font-display text-sm font-bold text-text-primary mb-1">🧠 Build Confidence</h4>
                <p className="text-xs">If your longest run ever is a marathon and you're attempting a 100-miler — that's a big mental leap. A 50-miler in training closes the gap. It tells your brain: "I've been here before. I can go further."</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="font-display text-lg font-bold text-text-primary mb-3">The 1,500m → 200-Mile Continuum</h3>
            <p className="mb-3">
              This is where Ian drops the truth bomb that changes how you think about distance:
            </p>
            <p className="mb-3">
              <strong className="text-text-primary">"The physiology of running 1,500 meters is very similar to the physiology of running 200 miles."</strong> They're both primarily aerobic. The cellular adaptations are the same. The energy systems overlap massively.
            </p>
            <p className="mb-3">
              Look at Olympic athletes. The 100m and 200m sprinters are muscular power machines with zero endurance. By 800m, they start looking like distance runners. By 1,500m, they <em>are</em> distance runners — just running at much higher intensities.
            </p>
            <p>
              There is <strong className="text-text-primary">way more overlap between an ultra runner and a 1,500m runner</strong> than between a 1,500m runner and a sprinter. The distance difference is vast. The physiology difference is small.
            </p>
          </section>

          <section>
            <h3 className="font-display text-lg font-bold text-text-primary mb-3">The Consistency Trade-Off</h3>
            <p className="mb-3">
              This circles back to Ian's core message: <strong className="text-text-primary">consistency beats heroics.</strong> A 10-hour training run destroys your next week. You're exhausted, your muscles are wrecked, your immune system is compromised. You miss runs. The cumulative training stress drops.
            </p>
            <p className="mb-3">
              A 4-hour long run? You're back to training within a day or two. You get your speed session in on Tuesday. Your Wednesday easy run feels good. You stack another quality week on top of the last one. Week after week, month after month — the gains compound.
            </p>
            <p>
              The runner doing consistent 3-4 hour long runs for years will outperform the runner doing quarterly 8-hour epics followed by recovery purgatory. Every time.
            </p>
          </section>

          <section>
            <h3 className="font-display text-lg font-bold text-text-primary mb-3">Ian's Long Run Rules</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-text-primary">4-hour cap for physical adaptations.</strong> Beyond that, gains are marginal and recovery costs skyrocket.</li>
              <li><strong className="text-text-primary">Go longer only for non-physical reasons.</strong> Gear testing, nutrition practice, mental confidence — but treat these as deliberate experiments, not fitness builders.</li>
              <li><strong className="text-text-primary">Back-to-back long runs &gt; one mega-run.</strong> A 3-hour Saturday + 2-hour Sunday gives cumulative volume with lower injury risk than one 6-hour monster.</li>
              <li><strong className="text-text-primary">If it stops being fun, it stops being training.</strong> Some people do 8-hour mountain adventures because they love exploring. That's valid — just don't mistake it for essential training.</li>
            </ul>
          </section>

          <div className="rounded-2xl border border-pulse/10 bg-pulse/5 p-5 mt-8">
            <p className="font-body text-sm italic text-text-secondary leading-relaxed">
              "I had one or two 50Ks in the buildup. They weren't even four hours. My fastest 100-miler — 12.5 hours — came off a longest run of about 3:45."
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <Link href="/journal" className="inline-flex items-center gap-2 font-display text-sm text-pulse hover:text-surge transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Journal
          </Link>
        </div>
      </article>
    </>
  );
}
