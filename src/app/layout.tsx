import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import MobileNav from '@/components/MobileNav';
import QuoteCorner from '@/components/QuoteCorner';
import VersionFooter from '@/components/VersionFooter';
import PwaRegister from '@/components/PwaRegister';

import type { Viewport } from 'next';

const SITE_URL = 'https://cadence-crate.vercel.app';
const TITLE = 'Cadence Crate — Find Your Rhythm. Hit Your Stride.';
const DESCRIPTION =
  'The first BPM-verified music library for runners. Discover songs at 160-170 BPM — Chinese and English, decade by decade. Verified through 4-gate pipeline. Free.';
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: '%s | Cadence Crate',
  },
  description: DESCRIPTION,
  applicationName: 'Cadence Crate',
  authors: [{ name: 'Cadence Crate', url: SITE_URL }],
  generator: 'Next.js',
  keywords: [
    'running music', 'BPM', 'cadence', '160 BPM', '170 BPM', 'running playlist',
    'Chinese running songs', 'Mandopop', 'Cantopop', 'running cadence', 'pace music',
    'stride music', 'running tempo', 'workout music', 'free BPM finder',
  ],
  creator: 'Cadence Crate',
  publisher: 'Cadence Crate',
  formatDetection: { telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'Cadence Crate',
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Cadence Crate — Find Your Rhythm',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
    creator: '@cadencecrate',
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  appleWebApp: {
    capable: true,
    title: 'Cadence Crate',
    statusBarStyle: 'black-translucent',
    startupImage: [{ url: '/apple-splash-2048.png', media: '(device-width: 1024px) and (device-height: 1366px)' }],
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: '#050510',
};

// JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Cadence Crate',
  url: SITE_URL,
  description: DESCRIPTION,
  applicationCategory: 'HealthApplication',
  operatingSystem: 'ALL',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author: { '@type': 'Organization', name: 'Cadence Crate', url: SITE_URL },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </head>
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

        {/* PWA Register */}
        <PwaRegister />
      </body>
    </html>
  );
}
