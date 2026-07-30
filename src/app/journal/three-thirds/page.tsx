import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, Quote } from 'lucide-react';

export default function ThreeThirdsArticle() {
  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center border-b border-border px-4 md:px-6 glass-safe">
        <Link href="/journal" className="flex items-center gap-2 font-display text-sm text-text-muted hover:text-text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Journal
        </Link>
        <h1 className="ml-4 font-display text-lg md:text-xl font-bold bg-gradient-to-r from-pulse to-surge bg-clip-text text-transparent truncate">
          The Three Thirds
        </h1>
      </header>

      <article className="mx-auto max-w-3xl px-4 md:px-6 py-8 md:py-12">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3 text-text-muted">
            <span className="rounded-full border border-surge/15 bg-surge/5 px-2.5 py-0.5 font-display text-[10px] font-medium text-surge">Racing</span>
            <span className="flex items-center gap-1 font-body text-[11px]"><Calendar className="h-3 w-3" />2026-07-30</span>
            <span className="flex items-center gap-1 font-body text-[11px]"><Clock className="h-3 w-3" />5 min read</span>
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary mb-4 leading-tight">
            The Three Thirds: How to Race Any Distance
          </h2>
          <p className="font-body text-base text-text-secondary leading-relaxed">
            Ian Charman has finished over 280 marathons and ultras. He's coached hundreds of runners. And he's distilled race execution down to a framework so simple it fits on a napkin. Three parts. One race.
          </p>
        </div>

        <div className="rounded-2xl border border-pulse/10 bg-pulse/5 p-5 mb-8">
          <Quote className="h-5 w-5 text-pulse mb-2" />
          <p className="font-body text-lg italic text-text-primary leading-relaxed">
            "Who cares if you run up the first climb two minutes faster but you're a bit more tired? What matters is when you're at mile 80 and you're exhausted, but you've still got a solid power hike."
          </p>
          <p className="mt-2 font-display text-xs font-semibold text-surge">— Ian Charman</p>
        </div>

        <div className="space-y-6 font-body text-sm text-text-secondary leading-relaxed">
          <section>
            <h3 className="font-display text-lg font-bold text-text-primary mb-3">The Framework</h3>
            <p className="mb-3">
              This isn't just for ultras. It works for 5Ks and 200-milers. It works whether you're trying to win or just beat the cutoff.
            </p>
          </section>

          <section>
            <h3 className="font-display text-lg font-bold text-pulse mb-3">🥇 First Third: The Warmup</h3>
            <p className="mb-3">
              <strong className="text-text-primary">It should feel too easy.</strong> "For the intensity of that race, you're maybe going easier than you thought you should." In a 100-miler, that's 33 miles. Thirty-three miles of thinking, "I could totally be speeding up right now."
            </p>
            <p className="mb-3">
              And that's exactly the point. <strong className="text-text-primary">Of course you could speed up.</strong> At mile 1 of a marathon, you could run at your 5K pace. But you'll pay for it by mile 16. The temptations are everywhere — runners zooming past, the adrenaline high, the starting-line testosterone.
            </p>
            <p>
              Watch the elites. Killian Jornet and Courtney Dauwalter in the early stages of a 100-miler? They look like they're out for a casual jog. <strong className="text-text-primary">Because they are.</strong> They're just incredibly fit, so "casual" is still fast.
            </p>
          </section>

          <section>
            <h3 className="font-display text-lg font-bold text-surge mb-3">🥈 Middle Third: The Settle</h3>
            <p className="mb-3">
              Reality checks in. Fatigue whispers. This is where you feel grateful for your restraint in the first third. <strong className="text-text-primary">"I'm glad I didn't go off faster. I'm starting to get tired now. If I had been going faster, I'd really be feeling it."</strong>
            </p>
            <p className="mb-3">
              In a 5K, this is the second mile — the moment you realize that opening-mile pace isn't sustainable. In an ultra, this is where nutrition, hydration, and micro-decisions become everything. You're not racing yet. You're <em>preserving</em>.
            </p>
            <p>
              This is also where your pacing buffer proves its worth. Every second you saved yourself in the first third is a second you get to spend here.
            </p>
          </section>

          <section>
            <h3 className="font-display text-lg font-bold text-alert mb-3">🥉 Final Third: The Race</h3>
            <p className="mb-3">
              "If you've done the first two-thirds well, you've got a shot at racing that last bit." This is where it all pays off. You're not speeding up — but <strong className="text-text-primary">you're not slowing down.</strong>
            </p>
            <p className="mb-3">
              Meanwhile, the field around you is falling apart. Runners who started too fast are walking. They're sitting in aid stations, heads in their hands. They're doing death marches at a fraction of their earlier pace. Their slowest mile is hemorrhaging time.
            </p>
            <p className="mb-3">
              Your slowest mile? <strong className="text-text-primary">Still respectable.</strong> Because you protected it for two-thirds of the race.
            </p>
            <p>
              "In a race, it's your average pace that determines the finish, not your quickest mile split. No one cares that you started the marathon on 5K pace if you finished it on 200-mile pace."
            </p>
          </section>

          <section>
            <h3 className="font-display text-lg font-bold text-text-primary mb-3">The Flow State Connection</h3>
            <p className="mb-3">
              When you execute the three thirds well, something strange happens. You enter what Ian calls <strong className="text-text-primary">Flow Running</strong> — that state where miles disappear, where another marker goes by and you think, "That was quick."
            </p>
            <p className="mb-3">
              Flow requires mastery. You can't force it. But you can set the conditions for it: don't start too fast, settle into your rhythm, and trust the feeling more than the numbers on your watch.
            </p>
            <p>
              Andy Jones-Wilkins (another ultra legend) calls it <strong className="text-text-primary">"like a marble in a groove."</strong> You're not on autopilot. You're just balanced. Everything fits.
            </p>
          </section>

          <section>
            <h3 className="font-display text-lg font-bold text-text-primary mb-3">Your Race Day Cheat Sheet</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-text-primary">First third:</strong> Ignore your watch. Ignore other runners. Run by effort, not by pace. It should feel like a warmup.</li>
              <li><strong className="text-text-primary">Middle third:</strong> Nutrition and hydration become your primary focus — not pace. Practice gratitude that you didn't go out too fast.</li>
              <li><strong className="text-text-primary">Final third:</strong> Now you can race. The people around you are slowing down. Hold your line. Your pacing discipline is your weapon.</li>
            </ul>
          </section>

          <div className="rounded-2xl border border-pulse/10 bg-pulse/5 p-5 mt-8">
            <p className="font-body text-sm italic text-text-secondary leading-relaxed">
              "The bit where people blow up is typically that latter third. The first two-thirds are just trying to get into the final third in one piece — so you've got a shot at racing."
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
