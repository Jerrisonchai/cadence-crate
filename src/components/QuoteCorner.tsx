'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import quotesData from '@/data/quotes.json';

interface Quote {
  text: string;
  author: string;
  title?: string | null;
  nationality?: string | null;
  lang?: string;
}

const quotes: Quote[] = quotesData;

export default function QuoteCorner() {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Random starting index
    setIndex(Math.floor(Math.random() * quotes.length));
  }, []);

  const nextQuote = useCallback(() => {
    setIndex((prev) => (prev + 1) % quotes.length);
  }, []);

  // Auto-rotate every 25 seconds
  useEffect(() => {
    if (!mounted) return;
    const timer = setInterval(nextQuote, 25000);
    return () => clearInterval(timer);
  }, [mounted, nextQuote]);

  const quote = quotes[index];
  if (!quote) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 border-t border-pulse/10 bg-[#080814]/95 backdrop-blur-2xl hidden md:block">
      <div className="mx-auto flex h-11 max-w-4xl items-center justify-center px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 font-body text-sm text-text-secondary"
          >
            <span className="flex-shrink-0 text-base">💬</span>
            <span className="italic truncate">&ldquo;{quote.text}&rdquo;</span>
            <span className="flex-shrink-0 text-xs font-semibold text-surge">
              — {quote.author}
              {quote.title && (
                <span className="text-text-muted font-normal ml-1">({quote.title})</span>
              )}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
