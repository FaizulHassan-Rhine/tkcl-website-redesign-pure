'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoadingScreenOverlay from './LoadingScreenOverlay';

export default function RouteLoader({ onLoadingDone }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
  }, [pathname]);

  return (
    <>
      {loading && (
        <LoadingScreenOverlay onComplete={() => {
          setLoading(false);
          onLoadingDone?.();  // notify parent when done
        }} />
      )}
    </>
  );
}
