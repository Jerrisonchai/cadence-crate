import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, Quote } from 'lucide-react';

export default function SlowestMileArticle() {
  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center border-b border-border px-4 md:px-6 glass-safe">
        <Link href="/journal" className="flex items-center gap-2 font-display text-sm text-text-muted hover:text-text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Journal
        </Link>
        <h1 className="ml-4 font-display text-lg md:text-xl font-bold bg-gradient-to-r from-pulse to-surge bg-clip-text text-transparent truncate">
          The Slowest Mile
        </h1>
      </header>

      <article className="mx-auto max-w-3xl px-4 md:px-6 py-8 md:py-12">
        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3 text-text-muted">
            <span className="rounded-full border border-surge/15 bg-surge/5 px-2.5 py-0.5 font-display text-[10px] font-medium text-surge">Pacing</span>
            <span className="flex items-center gap-1 font-body text-[11px]"><Calendar className="h-3 w-3" />2026-07-30</span>
            <span className="flex items-center gap-1 font-body text-[11px]"><Clock className="h-3 w-3" />6 min read</span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary mb-4 leading-tight">
            The Slowest Mile That Matters
          </h2>
          <p className="font-body text-base text-text-secondary leading-relaxed">
            "It's not your fastest mile that matters. It's your slowest mile." Ian Charman didn't just say this once — he said it three times in the same breath, as if he wanted us to tattoo it somewhere we'd see it before every starting line.
          </p>
        </div>

        {/* Quote Block */}
        <div className="rounded-2xl border border-pulse/10 bg-pulse/5 p-5 mb-8">
          <Quote className="h-5 w-5 text-pulse mb-2" />
          <p className="font-body text-lg italic text-text-primary leading-relaxed">
            "You go 15 seconds a mile too fast. You go half as far before you blow up."
          </p>
          <p className="mt-2 font-display text-xs font-semibold text-surge">— Ian Charman, The Art of Ultra Running</p>
        </div>

        {/* Body */}
        <div className="space-y-6 font-body text-sm text-text-secondary leading-relaxed">
          <section>
            <h3 className="font-display text-lg font-bold text-text-primary mb-3">The Math of Pacing Is Brutal</h3>
            <p className="mb-3">
              Here's a stat that should scare you: for a well-trained runner, you only need to slow down about <strong className="text-text-primary">15 seconds per mile</strong> to double your distance. From 5K to 10K. From 10K to half marathon. From half to full.
            </p>
            <p className="mb-3">
              Now reverse it. You go <strong className="text-text-primary">15 seconds a mile too fast</strong> at the start of your marathon. You don't lose 15 seconds in the second half. You don't lose 2 minutes. You go <strong className="text-pulse">half as far before you blow up.</strong>
            </p>
            <p>
              Your 4-hour marathon pace becomes a 2-hour half and a death march from mile 13. Every starting-line adrenaline surge that costs you 5 seconds per mile now is a 60-second-per-mile tax later. And your body collects with interest.
            </p>
          </section>

          <section>
            <h3 className="font-display text-lg font-bold text-text-primary mb-3">The Mile Nobody Sees</h3>
            <p className="mb-3">
              When Ian evaluates a client's race, the first thing he does isn't check their finish time. He looks at <strong className="text-text-primary">how much they slowed down.</strong>
            </p>
            <p className="mb-3">
              "If you only slow down 5 seconds a mile near the end, that's going to be a really good race." The graph tells the whole story. A flat line with a gentle dip is the signature of someone who paced themselves to perfection. A cliff from mile 20 onward? That's someone who started too fast and paid for it — in minutes, in misery, in months of recovery.
            </p>
            <p>
              Your slowest mile is your <em>truth</em>. It tells the story of every decision you made in the first 90 minutes of the race. It's the invoice for your opening-mile hubris, itemized in seconds.
            </p>
          </section>

          <section>
            <h3 className="font-display text-lg font-bold text-text-primary mb-3">The Three Thirds Framework</h3>
            <p className="mb-3">
              Ian breaks every race — 5K to 200 miles — into simple thirds:
            </p>
            <div className="space-y-3">
              <div className="rounded-xl border border-border bg-surface/30 p-4">
                <h4 className="font-display text-sm font-bold text-pulse mb-1">First Third — The Warmup</h4>
                <p className="text-xs">Should feel easy. Almost too easy. "If you're one mile into a marathon at marathon pace, of course you could go faster. You could run at your 5K pace. But it's going to hurt you quite quickly." You're not here to race. You're here to arrive intact.</p>
              </div>
              <div className="rounded-xl border border-border bg-surface/30 p-4">
                <h4 className="font-display text-sm font-bold text-surge mb-1">Middle Third — The Settle</h4>
                <p className="text-xs">Reality sets in. "I'm glad I didn't go off faster." Fatigue begins whispering. The pace feels sustainable — not because you're fresh, but because you banked nothing. Everything is still in the tank.</p>
              </div>
              <div className="rounded-xl border border-border bg-surface/30 p-4">
                <h4 className="font-display text-sm font-bold text-alert mb-1">Final Third — The Race</h4>
                <p className="text-xs">"If you've done the first two-thirds well, you've got a shot at racing." You're not speeding up — but you're not slowing down. You pass the people who banked pace they couldn't afford. Their slowest mile is now 15-30 minutes slower than yours. That's the race.</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="font-display text-lg font-bold text-text-primary mb-3">Even the Pros Get It Wrong</h3>
            <p className="mb-3">
              Ian tells a story from the Portland Marathon. He and a friend agreed — verbally, out loud, at the start line — to not go out too fast in the first mile. Five seconds later, Ian was 20 seconds a mile faster than planned. His friend was 10 seconds ahead of him.
            </p>
            <p>
              <strong className="text-text-primary">They literally just said it.</strong> The crowd, the adrenaline, the heart thumping — it overrides everything. Discipline isn't a one-time decision. It's a constant negotiation with your own excitement.
            </p>
          </section>

          <section>
            <h3 className="font-display text-lg font-bold text-text-primary mb-3">What This Means for Your Next Run</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Your first mile should feel <strong className="text-text-primary">embarrassingly slow</strong>. If it doesn't, you're going too fast.</li>
              <li>Stop looking at your watch in the early stages. The number tells you what you're doing. The feeling tells you how sustainable it is. Trust the feeling.</li>
              <li>At mile 20, open Strava and look at someone else's race. Their mile 20-26 split reveals more about their day than their finish time ever will.</li>
              <li>Practice the slow start in training. If you can't do it on a Tuesday easy run, you won't do it on race day.</li>
            </ul>
          </section>

          <div className="rounded-2xl border border-pulse/10 bg-pulse/5 p-5 mt-8">
            <p className="font-body text-sm italic text-text-secondary leading-relaxed">
              "There's no prize for halfway being in the lead. It's all about how well you can do the entire race."
            </p>
          </div>
        </div>

        {/* Back Link */}
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
