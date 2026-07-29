'use client';

import { useEffect } from 'react';

export default function PwaRegister() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

    // Register service worker with network-first strategy for HTML
    const registerSw = async () => {
      try {
        const reg = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
        console.log('[PWA] Service worker registered:', reg.scope);

        // Check for updates every 60 minutes
        setInterval(() => { reg.update(); }, 60 * 60 * 1000);

        // Handle updates
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          if (!newWorker) return;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content available — could show a toast here
              console.log('[PWA] New version available. Refresh to update.');
            }
          });
        });
      } catch (err) {
        console.log('[PWA] Service worker registration skipped:', err);
      }
    };

    window.addEventListener('load', registerSw);
    return () => window.removeEventListener('load', registerSw);
  }, []);

  return null;
}
