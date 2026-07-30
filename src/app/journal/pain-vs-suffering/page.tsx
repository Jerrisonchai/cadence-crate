import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, Quote } from 'lucide-react';

export default function PainVsSufferingArticle() {
  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center border-b border-border px-4 md:px-6 glass-safe">
        <Link href="/journal" className="flex items-center gap-2 font-display text-sm text-text-muted hover:text-text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Journal
        </Link>
        <h1 className="ml-4 font-display text-lg md:text-xl font-bold bg-gradient-to-r from-pulse to-surge bg-clip-text text-transparent truncate">
          Pain vs Suffering
        </h1>
      </header>

      <article className="mx-auto max-w-3xl px-4 md:px-6 py-8 md:py-12">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3 text-text-muted">
            <span className="rounded-full border border-alert/15 bg-alert/5 px-2.5 py-0.5 font-display text-[10px] font-medium text-alert">Mental</span>
            <span className="flex items-center gap-1 font-body text-[11px]"><Calendar className="h-3 w-3" />2026-07-30</span>
            <span className="flex items-center gap-1 font-body text-[11px]"><Clock className="h-3 w-3" />6 min read</span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary mb-4 leading-tight">
            Pain vs Suffering: Knowing When to Stop and When to Push
          </h2>
          <p className="font-body text-base text-text-secondary leading-relaxed">
            In ultra running, you're going to hurt. Everyone tells you that. What nobody tells you is that not all hurt is the same — and treating it all equally is a fast track to injury, DNF, or worse.
          </p>
        </div>

        <div className="rounded-2xl border border-pulse/10 bg-pulse/5 p-5 mb-8">
          <Quote className="h-5 w-5 text-pulse mb-2" />
          <p className="font-body text-lg italic text-text-primary leading-relaxed">
            "Toughness is being able to make difficult decisions — often not the one you want to — not just to keep going regardless."
          </p>
          <p className="mt-2 font-display text-xs font-semibold text-surge">— Ian Charman</p>
        </div>

        <div className="space-y-6 font-body text-sm text-text-secondary leading-relaxed">
          <section>
            <h3 className="font-display text-lg font-bold text-text-primary mb-3">The Critical Distinction</h3>
            <p className="mb-3">
              Ian draws a clear line that every runner needs to internalize:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="rounded-xl border border-alert/20 bg-alert/5 p-4">
                <h4 className="font-display text-sm font-bold text-alert mb-2">🔴 Pain</h4>
                <p className="text-xs">
                  <strong>Sharp. New. Escalating.</strong> Something that wasn't there before and is getting worse. The stubbed toe that makes you limp. The hip that won't track. The knee that swells. The ligament that's speaking louder than muscle fatigue ever could.
                </p>
              </div>
              <div className="rounded-xl border border-surge/20 bg-surge/5 p-4">
                <h4 className="font-display text-sm font-bold text-surge mb-2">🟡 Suffering</h4>
                <p className="text-xs">
                  <strong>Difficult. Tiring. Endurable.</strong> Heavy legs. Burning lungs. The mental fog of mile 80. The "I don't want to be out here anymore" feeling. Your body at its limit — but not breaking. This is the suffering you're supposed to push through.
                </p>
              </div>
            </div>
            <p>
              The problem? They feel similar enough that runners mix them up constantly. Fatigue masks injury signals. Endorphins blur the line. And the "no quit" mentality — the David Goggins approach — tells you to ignore both.
            </p>
          </section>

          <section>
            <h3 className="font-display text-lg font-bold text-text-primary mb-3">The Goggins Trap</h3>
            <p className="mb-3">
              David Goggins has done incredible things for the sport. His message about mental toughness is powerful. But Ian sees a dark side: runners taking pride in <strong className="text-text-primary">starting races half-injured</strong>, posting about it on social media, framing bad decisions as toughness.
            </p>
            <p className="mb-3">
              "I see so many people who just keep training because they think, 'I'm an ultra runner, it's meant to be hard. My leg is hurting — I've just got to suck it up and be tough.'"
            </p>
            <p>
              <strong className="text-text-primary">Toughness is not the ability to ignore common sense.</strong> If your bone is sticking out, finishing the race isn't brave — it's reckless. Real toughness is pulling yourself from a race you've trained six months for because you know the cost of continuing.
            </p>
          </section>

          <section>
            <h3 className="font-display text-lg font-bold text-text-primary mb-3">A Real DNF Story</h3>
            <p className="mb-3">
              At Cocodona 250 — a 253-mile race — Ian was pacing Jeff Browning, one of the most decorated ultra runners in history. At mile 190, Jeff's hip started to go. He couldn't lift his leg properly. His knees were bloody from stumbles. He was 60 miles from the finish.
            </p>
            <p className="mb-3">
              A local physical therapist gave him the best advice he'd ever received: <strong className="text-text-primary">"You're very tired. Go to sleep. Wake up. THEN decide."</strong>
            </p>
            <p className="mb-3">
              They got a hotel. He slept for hours. He woke up, tested the hip, and made the call: <strong className="text-text-primary">DNF.</strong> His first DNF in years of racing 100 and 200-milers. An MRI later confirmed serious hip damage. If he'd continued? The recovery could have been a year — or permanent.
            </p>
            <p>
              That's not failure. That's wisdom at mile 190 with incomplete information.
            </p>
          </section>

          <section>
            <h3 className="font-display text-lg font-bold text-text-primary mb-3">The Central Governor Theory</h3>
            <p className="mb-3">
              Your brain has a built-in safety mechanism — the central governor. It's constantly calculating whether you're about to damage yourself and trying to pull you back before you do. When you push to your limit and survive, the governor recalibrates: <strong className="text-text-primary">"Okay, that didn't kill us. Next time, we can go a little harder."</strong>
            </p>
            <p className="mb-3">
              This is why your lactate threshold improves over time. It's why the suffering you endured last year feels manageable this year. Your brain has expanded its "safe zone." But this only works for suffering — the normal, healthy, non-injurious kind. Pain that signals tissue damage? The governor isn't recalibrating. It's screaming for a reason.
            </p>
          </section>

          <section>
            <h3 className="font-display text-lg font-bold text-text-primary mb-3">Practical Decision Framework</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-text-primary">Is it new?</strong> Familiar, expected fatigue vs. a sensation you've never felt before. New = investigate.</li>
              <li><strong className="text-text-primary">Is it escalating?</strong> If it's getting worse with every mile, don't wait until it's catastrophic.</li>
              <li><strong className="text-text-primary">Is it localized?</strong> Whole-leg fatigue is normal. A sharp, stabbing pain in one specific spot isn't.</li>
              <li><strong className="text-text-primary">Give it 15 minutes.</strong> Get to the next aid station. Sit down. Eat. Drink. Often you'll feel completely different. If the pain is still there and still sharp — that's your answer.</li>
              <li><strong className="text-text-primary">Sleep on it.</strong> For long ultras, a few hours of rest can reveal what exhaustion was hiding. Jeff Browning's story proves it.</li>
            </ul>
          </section>

          <div className="rounded-2xl border border-pulse/10 bg-pulse/5 p-5 mt-8">
            <p className="font-body text-sm italic text-text-secondary leading-relaxed">
              "Toughness I would define as the ability to do difficult things — not the ability to ignore common sense."
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
