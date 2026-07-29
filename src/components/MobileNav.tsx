'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Disc3, Heart, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

const tabs = [
  { href: '/', icon: Disc3, label: 'Browse' },
  { href: '/favorites', icon: Heart, label: 'Favorites' },
  { href: '/about', icon: Info, label: 'About' },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <>
      {/* Version (mobile only) */}
      <span className="fixed bottom-[60px] left-1/2 -translate-x-1/2 z-50 font-display text-[9px] text-text-muted/40 select-none md:hidden">
        v0.2.0
      </span>

      <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-surge/10 bg-[#080814]/95 backdrop-blur-2xl md:hidden safe-bottom">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 px-5 py-2 transition-colors duration-200',
                isActive ? 'text-pulse' : 'text-text-muted'
              )}
            >
              <motion.div
                whileTap={{ scale: 0.85 }}
                className="relative"
              >
                <tab.icon className={cn('h-5 w-5', isActive && 'drop-shadow-[0_0_8px_rgba(163,255,18,0.4)]')} />
                {isActive && (
                  <motion.div
                    layoutId="mobileNavIndicator"
                    className="absolute -bottom-2 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-pulse"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.div>
              <span className={cn(
                'font-display text-[10px] font-medium',
                isActive && 'text-pulse'
              )}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
