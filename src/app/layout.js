'use client';

import './globals.css';
import React, { useState } from 'react';
import ThemeToggleProvider from './theme-provider';
import SmoothScrollProvider from './smooth-scroll-provider';
import Navbar from '@/components/Navbar';
import RouteLoader from '@/components/RouteLoader';

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className=" 2xl:container mx-auto antialiased transition-colors bg-white text-black dark:bg-black dark:text-white relative"
      >
        <ThemeToggleProvider>
          <SmoothScrollProvider>
            {/* RouteLoader is ABOVE everything, absolute to body */}
            {loading && (
              <div className="fixed inset-0 z-[1000]">
                <RouteLoader onLoadingDone={() => setLoading(false)} />
              </div>
            )}

            {/* This stays rendered under the loader */}
            <Navbar />
            <main>{children}</main>
          </SmoothScrollProvider>
        </ThemeToggleProvider>
      </body>
    </html>
  );
}
