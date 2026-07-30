import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, Quote } from 'lucide-react';

export default function UltraRealistArticle() {
  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center border-b border-border px-4 md:px-6 glass-safe">
        <Link href="/journal" className="flex items-center gap-2 font-display text-sm text-text-muted hover:text-text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Journal
        </Link>
        <h1 className="ml-4 font-display text-lg md:text-xl font-bold bg-gradient-to-r from-pulse to-surge bg-clip-text text-transparent truncate">
          The Ultra Realist
        </h1>
      </header>

      <article className="mx-auto max-w-3xl px-4 md:px-6 py-8 md:py-12">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3 text-text-muted">
            <span className="rounded-full border border-surge/15 bg-surge/5 px-2.5 py-0.5 font-display text-[10px] font-medium text-surge">Strategy</span>
            <span className="flex items-center gap-1 font-body text-[11px]"><Calendar className="h-3 w-3" />2026-07-30</span>
            <span className="flex items-center gap-1 font-body text-[11px]"><Clock className="h-3 w-3" />5 min read</span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary mb-4 leading-tight">
            The Ultra Realist's Guide to Race Day
          </h2>
          <p className="font-body text-base text-text-secondary leading-relaxed">
            Ian Charman borrowed a phrase from author Matt Fitzgerald that has become the spine of his coaching philosophy: "Be an ultra realist." Simple words. Profound consequences for how you train, race, and recover.
          </p>
        </div>

        <div className="rounded-2xl border border-pulse/10 bg-pulse/5 p-5 mb-8">
          <Quote className="h-5 w-5 text-pulse mb-2" />
          <p className="font-body text-lg italic text-text-primary leading-relaxed">
            "The quicker you can acknowledge reality and do something about it, the better you will train and the better you will race."
          </p>
          <p className="mt-2 font-display text-xs font-semibold text-surge">— Ian Charman</p>
        </div>

        <div className="space-y-6 font-body text-sm text-text-secondary leading-relaxed">
          <section>
            <h3 className="font-display text-lg font-bold text-text-primary mb-3">Reality vs. Expectations</h3>
            <p className="mb-3">
              Every runner starts race day with a plan. A pace. A goal time. A nutrition strategy. And then reality lands — and it rarely looks like the spreadsheet.
            </p>
            <p className="mb-3">
              <strong className="text-text-primary">It's 20 degrees hotter than forecast.</strong> Your stomach rejects the first gel. Your legs feel like concrete. The headwind is brutal. Your pace at easy effort is 30 seconds slower than you expected for race effort.
            </p>
            <p className="mb-3">
              Most runners do one of two things: they panic and try to force the plan anyway, or they give up entirely. The ultra realist does neither.
            </p>
            <p>
              <strong className="text-text-primary">"How can you be really good at acknowledging reality if it's different to your expectations?"</strong> You're not as fit as you thought. The conditions are worse. Something's feeling off. The faster you accept what's actually happening — not what you wanted to happen — the faster you can adapt your race to match.
            </p>
          </section>

          <section>
            <h3 className="font-display text-lg font-bold text-text-primary mb-3">What Ultra Realism Looks Like in Practice</h3>
            <p className="mb-3">
              <strong className="text-text-primary">Reality check 1:</strong> You're at the start of Boston 2018. It's freezing rain. Everyone around you is stripping down to singlets because "that's what runners wear."
            </p>
            <p className="mb-3">
              The ultra realist keeps an extra layer on. Ian took his off. He wanted to fit in. By halfway, he was hypothermic. By mile 20, he was walking. He lost 20+ minutes and spent two hours in the medical tent.
            </p>
            <p className="mb-3">
              One jacket. That was the difference between a great race and a medical emergency.
            </p>
            <p>
              <strong className="text-text-primary">Reality check 2:</strong> Your goal was 3:30. But your opening miles at goal pace feel like threshold effort. The ultra realist adjusts the goal <em>now</em> — not at mile 18 when the wheels have already fallen off. "It's better off trying to get in what is sustainable for that day and have the best execution for where you are versus trying to hit some numbers for where you wanted to be."
            </p>
          </section>

          <section>
            <h3 className="font-display text-lg font-bold text-text-primary mb-3">Flexibility Is a Skill — Train It</h3>
            <p className="mb-3">
              Ian says he moves his speed sessions about 50% of the time. Not because he's disorganized — because he's <em>listening</em>. His body tells him what it needs, and he adjusts. This isn't weakness. This is advanced-level training intelligence.
            </p>
            <p className="mb-3">
              "If you don't practice adapting in your training, you're not going to have that ability to be flexible and adaptable on race day." Flexibility isn't a personality trait. It's a skill you build — by practicing scenario changes, adjusting plans mid-workout, and letting go of perfection.
            </p>
            <p>
              The rigid runner who never deviates from the plan is the one who completely falls apart when race day throws a curveball. The flexible runner has already practiced 50 variations of "Plan B" — they just didn't know it at the time.
            </p>
          </section>

          <section>
            <h3 className="font-display text-lg font-bold text-text-primary mb-3">The Book's Hidden Architecture</h3>
            <p className="mb-3">
              Ian's book, "The Art of Ultra Running," is structured around three stages:
            </p>
            <div className="space-y-3">
              <div className="rounded-xl border border-border bg-surface/30 p-4">
                <h4 className="font-display text-sm font-bold text-pulse mb-1">Part 1: Training</h4>
                <p className="text-xs">How you prepare. The purpose behind every run. The 90% rule. Easy days and hard days.</p>
              </div>
              <div className="rounded-xl border border-border bg-surface/30 p-4">
                <h4 className="font-display text-sm font-bold text-surge mb-1">Part 2: Racing & Execution</h4>
                <p className="text-xs">How you actually do the race. Pacing, nutrition, problem-solving, adapting to reality. "The longer a race, the more of it comes down to how well you can execute — not just how fit you are at the start."</p>
              </div>
              <div className="rounded-xl border border-border bg-surface/30 p-4">
                <h4 className="font-display text-sm font-bold text-alert mb-1">Part 3: Longevity</h4>
                <p className="text-xs">How you stay in the sport for decades. Body awareness. Enjoyment. Checking in with yourself. "You get to choose what you're doing. You have agency." If you're not having fun, pivot.</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="font-display text-lg font-bold text-text-primary mb-3">The Ultra Realist's Race Day Checklist</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-text-primary">Check in at mile 3.</strong> "How is this actually feeling?" — not "What pace should I be running?" If it feels harder than expected, adjust NOW.</li>
              <li><strong className="text-text-primary">Reassess the weather.</strong> Did you dress for the forecast or for what's actually happening? Add layers. Remove them. Don't let pride dictate your clothing.</li>
              <li><strong className="text-text-primary">Listen to your stomach.</strong> Nutrition isn't a set-it-and-forget-it system. If something isn't sitting right, change the plan — don't force it.</li>
              <li><strong className="text-text-primary">Have a B-goal and a C-goal.</strong> If your A-goal is out of reach, what's the best possible outcome from where you are NOW? A 3:40 when you wanted 3:30 is better than a 4:10 because you refused to adapt.</li>
              <li><strong className="text-text-primary">Enjoy it.</strong> "If you're finding lots of your runs are a chore, it's probably not ideal." You chose this. If it stops being something you want to do, ask why.</li>
            </ul>
          </section>

          <div className="rounded-2xl border border-pulse/10 bg-pulse/5 p-5 mt-8">
            <p className="font-body text-sm italic text-text-secondary leading-relaxed">
              "In ultra running, it's not just about can you eke out another 1% of fitness. That doesn't matter if you make a whole load of mistakes on race day."
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
