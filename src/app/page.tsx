import { Suspense } from 'react';
import HomeContent from './HomeContent';

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-24">
          <div className="h-3 w-3 rounded-full bg-pulse/40 animate-bpm-pulse" />
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
