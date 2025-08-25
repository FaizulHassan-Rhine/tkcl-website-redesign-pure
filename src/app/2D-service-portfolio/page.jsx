'use client';
import { useState } from 'react';

export default function Page() {
  const [key, setKey] = useState(0);
  const SRC = 'https://demo.thekowcompany.com/2D-service-portfolio';

  return (
    <main className="min-h-screen flex flex-col bg-black text-white">
      {/* <header className="sticky top-0 z-10 w-full border-b border-white/10 bg-black/70 backdrop-blur px-4 py-3 flex items-center justify-between">
        <h1 className="text-sm sm:text-base font-medium tracking-wide">2D Service Portfolio — Embedded</h1>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1.5 rounded-2xl text-xs sm:text-sm border border-white/20 hover:border-white/40 transition"
            onClick={() => setKey((n) => n + 1)}
          >
            Reload
          </button>
          <a
            href={SRC}
            target="_blank"
            rel="noreferrer noopener"
            className="px-3 py-1.5 rounded-2xl text-xs sm:text-sm border border-white/20 hover:border-white/40 transition"
          >
            Open in new tab
          </a>
        </div>
      </header> */}

      <div className="flex-1 min-h-0">
        <iframe
          key={key}
          src={SRC}
          title="2D Service Portfolio Embedded"
          className="w-full h-screen"
          loading="lazy"
          allow="clipboard-write; fullscreen; accelerometer; gyroscope; magnetometer"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-pointer-lock allow-presentation"
        />
      </div>

      <div className="sr-only">
        If the embed does not load, the target site may block iframes. Use “Open in new tab”.
      </div>
    </main>
  );
}
