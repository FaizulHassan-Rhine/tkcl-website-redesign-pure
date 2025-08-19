'use client';
import './globals.css';
import React, { useState, useEffect } from 'react';
import ThemeToggleProvider from './theme-provider';
import SmoothScrollProvider from './smooth-scroll-provider';
import Navbar from '@/components/Navbar';
import RouteLoader from '@/components/RouteLoader';
import ScrollToTop from '@/components/ScrollToTop';

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const [themeLoaded, setThemeLoaded] = useState(false);

  useEffect(() => {
    // Ensure theme is properly loaded on client
    const timer = setTimeout(() => {
      setThemeLoaded(true);
    }, 0);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
            {/* Google Fonts Embed */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
        `}</style>
       {/* <script
  dangerouslySetInnerHTML={{
    __html: `
      (function () {
        // Blocking script - executes before any rendering
        const root = document.documentElement;
        
        // Hide immediately
        root.style.visibility = 'hidden';
        
        try {
          const theme = localStorage.getItem('theme') || 'light'; // ✅ Changed default to light
          
          // Set theme immediately
          root.classList.remove('light', 'dark');
          root.classList.add(theme);
          
          // Set background immediately to prevent flash
          if (theme === 'dark') {
            root.style.backgroundColor = '#000000';
            root.style.color = '#ffffff';
          } else {
            root.style.backgroundColor = '#ffffff'; 
            root.style.color = '#000000';
          }
          
        } catch(e) {
          // Fallback to light theme
          root.classList.add('light');
          root.style.backgroundColor = '#ffffff';
          root.style.color = '#000000';
        }
        
        // Show content after theme is applied
        root.style.visibility = 'visible';
        
        // CRITICAL: Clear inline styles after React takes over
        setTimeout(() => {
          root.style.removeProperty('background-color');
          root.style.removeProperty('color');
        }, 500); // Give React time to mount
        
        // Also listen for theme changes and clear inline styles
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
              // Clear inline styles when class changes (theme toggle)
              setTimeout(() => {
                root.style.removeProperty('background-color');
                root.style.removeProperty('color');
              }, 0);
            }
          });
        });
        
        observer.observe(root, { 
          attributes: true, 
          attributeFilter: ['class'] 
        });
      })();
    `,
  }}
/> */}
      </head>
      <body
        suppressHydrationWarning
        className=" md:mx-auto antialiased transition-colors bg-[#F8F9F6] text-black dark:bg-black dark:text-white relative"
        style={{
          visibility: themeLoaded ? 'visible' : 'hidden',
          minHeight: '100vh'
        }}
      >
        <ThemeToggleProvider>
          <SmoothScrollProvider>
            <Navbar />
            <RouteLoader onLoadingDone={() => setLoading(false)} />
            <main>{children}</main>
            <ScrollToTop />
          </SmoothScrollProvider>
        </ThemeToggleProvider>
      </body>
    </html>
  );
}