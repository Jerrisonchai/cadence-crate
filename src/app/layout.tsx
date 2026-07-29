import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import QuoteCorner from '@/components/QuoteCorner';

export const metadata: Metadata = {
  title: 'Cadence Crate — Find Your Rhythm',
  description:
    'Discover songs at 160-170 BPM for the perfect running cadence. Chinese and English songs, verified BPM, decade by decade.',
  icons: {
    icon: '/favicon.ico',
  },
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
          <Sidebar />
          <main className="ml-60 flex-1 pb-11">
            {children}
          </main>
        </div>
        <QuoteCorner />
      </body>
    </html>
  );
}
