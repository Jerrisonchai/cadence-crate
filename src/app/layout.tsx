import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import MobileNav from '@/components/MobileNav';
import QuoteCorner from '@/components/QuoteCorner';
import VersionFooter from '@/components/VersionFooter';

import type { Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Cadence Crate — Find Your Rhythm',
  description:
    'Discover songs at 160-170 BPM for the perfect running cadence. Chinese and English songs, verified BPM, decade by decade.',
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: '#050510',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-void font-body antialiased">
        {/* Background grid + ambient orbs */}
        <div className="fixed inset-0 bg-grid pointer-events-none" />
        <div className="fixed -top-48 -right-32 h-[600px] w-[600px] rounded-full bg-pulse/4 blur-[120px] pointer-events-none" />
        <div className="fixed -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-surge/4 blur-[120px] pointer-events-none" />

        <div className="flex min-h-screen">
          {/* Desktop Sidebar */}
          <Sidebar />
          <main className="flex-1 md:ml-60 pb-24 md:pb-11">
            {children}
          </main>
        </div>

        {/* Mobile Bottom Nav */}
        <MobileNav />

        {/* Quote Corner (hidden on mobile — shown in about page instead) */}
        <div className="hidden md:block">
          <QuoteCorner />
        </div>

        {/* Version Footer */}
        <VersionFooter />
      </body>
    </html>
  );
}
