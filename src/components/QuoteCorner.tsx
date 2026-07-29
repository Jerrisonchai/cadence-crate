'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

interface RunnerQuote {
  text: string;
  author: string;
  title: string;
  nationality: string;
  lang?: string;
}

const quotes: RunnerQuote[] = [
  {
    text: "No human is limited.",
    author: "Eliud Kipchoge",
    title: "Marathon World Record Holder",
    nationality: "Kenya",
  },
  {
    text: "The will to win means nothing without the will to prepare.",
    author: "Juma Ikangaa",
    title: "NYC Marathon Winner",
    nationality: "Tanzania",
  },
  {
    text: "Pain is temporary. Quitting lasts forever.",
    author: "Lance Armstrong",
    title: "Tour de France Champion",
    nationality: "USA",
  },
  {
    text: "我没有想太多，只是专注每一步。",
    author: "刘翔",
    title: "Olympic Gold Medalist, 110m Hurdles",
    nationality: "China",
    lang: "zh",
  },
  {
    text: "What seems hard now will one day be your warm-up.",
    author: "Unknown",
    title: "Running Wisdom",
    nationality: "",
  },
  {
    text: "Run when you can, walk if you have to, crawl if you must; just never give up.",
    author: "Dean Karnazes",
    title: "Ultramarathon Runner",
    nationality: "USA",
  },
  {
    text: "The miracle isn't that I finished. The miracle is that I had the courage to start.",
    author: "John Bingham",
    title: "Runner & Author",
    nationality: "USA",
  },
  {
    text: "I don't run to add days to my life, I run to add life to my days.",
    author: "Ronald Rook",
    title: "Running Philosopher",
    nationality: "",
  },
  {
    text: "To give anything less than your best is to sacrifice the gift.",
    author: "Steve Prefontaine",
    title: "Legendary Distance Runner",
    nationality: "USA",
  },
  {
    text: "Success isn't how far you got, but the distance you traveled from where you started.",
    author: "Unknown",
    title: "Running Proverb",
    nationality: "",
  },
  {
    text: "跑步是和自己對話的最好方式。",
    author: "孫英傑",
    title: "Chinese Marathon Champion",
    nationality: "China",
    lang: "zh",
  },
  {
    text: "It's not about being the best. It's about being better than you were yesterday.",
    author: "Unknown",
    title: "Training Motto",
    nationality: "",
  },
  {
    text: "The body achieves what the mind believes.",
    author: "Napoleon Hill",
    title: "Author, Think and Grow Rich",
    nationality: "USA",
  },
  {
    text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    author: "Aristotle",
    title: "Philosopher",
    nationality: "Greece",
  },
  {
    text: "Your biggest challenge isn't someone else. It's the ache in your lungs and the burning in your legs.",
    author: "Unknown",
    title: "Race Day Truth",
    nationality: "",
  },
];

export default function QuoteCorner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 30000); // rotate every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const quote = quotes[currentIndex];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex h-11 items-center justify-center border-t border-surge/8 bg-[#080814]/95 px-6 backdrop-blur-xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-3 max-w-3xl"
        >
          <Quote className="h-3.5 w-3.5 flex-shrink-0 text-pulse/60" />
          <p className="truncate font-body text-[13px] italic text-text-secondary">
            {quote.text}
            <span className="ml-2 not-italic font-display font-semibold text-surge">
              — {quote.author}
            </span>
            {quote.title && (
              <span className="ml-1 text-text-muted">
                , {quote.title}
              </span>
            )}
          </p>
          <Sparkles className="h-3 w-3 flex-shrink-0 text-pulse/40" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export { quotes };
