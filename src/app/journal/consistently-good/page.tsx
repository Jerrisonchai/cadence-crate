import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, Quote } from 'lucide-react';

export default function ConsistentlyGoodArticle() {
  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center border-b border-border px-4 md:px-6 glass-safe">
        <Link href="/journal" className="flex items-center gap-2 font-display text-sm text-text-muted hover:text-text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Journal
        </Link>
        <h1 className="ml-4 font-display text-lg md:text-xl font-bold bg-gradient-to-r from-pulse to-surge bg-clip-text text-transparent truncate">
          Consistently Good
        </h1>
      </header>

      <article className="mx-auto max-w-3xl px-4 md:px-6 py-8 md:py-12">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3 text-text-muted">
            <span className="rounded-full border border-surge/15 bg-surge/5 px-2.5 py-0.5 font-display text-[10px] font-medium text-surge">Mindset</span>
            <span className="flex items-center gap-1 font-body text-[11px]"><Calendar className="h-3 w-3" />2026-07-30</span>
            <span className="flex items-center gap-1 font-body text-[11px]"><Clock className="h-3 w-3" />7 min read</span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary mb-4 leading-tight">
            Being Consistently Good &gt; Being Occasionally Heroic
          </h2>
          <p className="font-body text-base text-text-secondary leading-relaxed">
            The title of Ian Charman's book contains a single sentence that has quietly changed how thousands of runners train, recover, and race: "Being consistently good is better than being heroic every now and then."
          </p>
        </div>

        <div className="rounded-2xl border border-pulse/10 bg-pulse/5 p-5 mb-8">
          <Quote className="h-5 w-5 text-pulse mb-2" />
          <p className="font-body text-lg italic text-text-primary leading-relaxed">
            "Consistency is probably the number one thing. Everything else is dependent on that. Doesn't matter about the tiny little things to get the last 1%. Doesn't even matter about what runs you're doing — unless you're consistent."
          </p>
          <p className="mt-2 font-display text-xs font-semibold text-surge">— Ian Charman, 280+ marathons and ultras</p>
        </div>

        <div className="space-y-6 font-body text-sm text-text-secondary leading-relaxed">
          <section>
            <h3 className="font-display text-lg font-bold text-text-primary mb-3">The One Change That Unlocked Everything</h3>
            <p className="mb-3">
              Ian Charman ran his first marathon in Prague — then ran 100 marathons and ultras in the next four years. He improved fast. But then he plateaued. For a long time, his marathon PB sat at 2:52.
            </p>
            <p className="mb-3">
              Then he met Bruce Fordyce — the legend who won Comrades Marathon nine times. Ian realized something that stopped him cold: <strong className="text-text-primary">he was doing his easy runs faster than Bruce Fordyce did his.</strong>
            </p>
            <p className="mb-3">
              He made one change. Same lifestyle. Same mileage. <strong className="text-text-primary">Easy days easier. Hard days harder.</strong> Not because he was trying harder — because he was <em>fresher</em> for them.
            </p>
            <p>
              Over the next year, his marathon time dropped from 2:52 to 2:32. Twenty minutes. From one adjustment. No secret workout. No magic program. Just the discipline to go easy when his ego wanted to push.
            </p>
          </section>

          <section>
            <h3 className="font-display text-lg font-bold text-text-primary mb-3">The 90% Rule</h3>
            <p className="mb-3">
              Here's one of the most liberating concepts in all of endurance training: <strong className="text-text-primary">90% execution is excellent.</strong>
            </p>
            <p className="mb-3">
              "If over a six-month period, you've been able to do about 90% of what you've been aiming for, that is excellent. If you've done 100%, you're probably getting a bit OCD. You're probably not being flexible. And you're more likely to have injuries and overtraining come up."
            </p>
            <p>
              Ninety percent is the sweet spot. It means you're showing up consistently, but you have the flexibility to skip a session when your body needs rest, when life happens, when you're just not feeling it. The 100% runner is a ticking time bomb — rigid, inflexible, one bad week away from breaking.
            </p>
          </section>

          <section>
            <h3 className="font-display text-lg font-bold text-text-primary mb-3">Why Do We Choose Heroics Over Consistency?</h3>
            <p className="mb-3">
              Ian nails it: <strong className="text-text-primary">"It is that feeling of not wanting to miss out. They're trying to be perfect instead of good."</strong>
            </p>
            <p className="mb-3">
              Social media has made this worse. Everyone posts their epic long runs, their PR-shattering workouts. No one posts the Tuesday 5-miler at recovery pace. So we all feel behind. And feeling behind makes us push harder — right into injury territory.
            </p>
            <p>
              The runner doing 35 miles a week, week after week, for five years? They'll improve more than the runner doing 70-mile weeks in February, burning out by March, coming back in May, getting injured in June. The math is relentless. Consistency compounds. Heroics crash.
            </p>
          </section>

          <section>
            <h3 className="font-display text-lg font-bold text-text-primary mb-3">What to Do When You Miss a Workout</h3>
            <p className="mb-3">
              First question: <strong className="text-text-primary">Why did you miss it?</strong> Legs felt terrible and you were exhausted? Good call. You listened to your body. Couldn't be bothered? That's worth investigating — is training fun? Is your race motivating enough?
            </p>
            <p className="mb-3">
              But here's what you <strong className="text-text-primary">don't</strong> do: stack missed miles onto the next run. Turning an easy 6-miler into a 10-miler "to catch up" changes the <em>purpose</em> of the run. You've traded an easy recovery day for a medium-effort day your body wasn't ready for. The missed miles are gone. Let them go.
            </p>
            <p>
              <strong className="text-text-primary">Missed workouts are not debt.</strong> They don't accrue interest. You can't pay them back. The only move is to do the next thing well.
            </p>
          </section>

          <section>
            <h3 className="font-display text-lg font-bold text-text-primary mb-3">Practical Takeaways</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Aim for 90% execution, not 100%. Flexibility is part of the plan — not a failure of it.</li>
              <li>Make your easy days <strong className="text-text-primary">actually easy</strong>. If you're finishing easy runs feeling worked, they weren't easy enough.</li>
              <li>When you miss a run, ask <em>why</em> before asking <em>when can I make it up</em>. The answer might be "never" — and that's fine.</li>
              <li>Consistency for months and years beats intensity for weeks. Your body adapts to what you <em>keep</em> doing, not what you <em>once</em> did.</li>
            </ul>
          </section>

          <div className="rounded-2xl border border-pulse/10 bg-pulse/5 p-5 mt-8">
            <p className="font-body text-sm italic text-text-secondary leading-relaxed">
              "If you can just be good for long periods of time, it adds up."
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
