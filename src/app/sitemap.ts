import type { MetadataRoute } from 'next';

const SITE_URL = 'https://cadence-crate.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: '', priority: 1.0, changeFreq: 'weekly' as const },
    { path: '/about', priority: 0.8, changeFreq: 'monthly' as const },
    { path: '/journal', priority: 0.7, changeFreq: 'weekly' as const },
    { path: '/journal/why-160-to-170-bpm', priority: 0.6, changeFreq: 'monthly' as const },
    { path: '/run', priority: 0.9, changeFreq: 'monthly' as const },
    { path: '/favorites', priority: 0.5, changeFreq: 'weekly' as const },
  ];

  return pages.map((p) => ({
    url: `${SITE_URL}${p.path}`,
    lastModified: new Date(),
    changeFrequency: p.changeFreq,
    priority: p.priority,
  }));
}
