'use client';
import './globals.css';
import React, { useState, useEffect } from 'react';
import ThemeToggleProvider from './theme-provider';
import SmoothScrollProvider from './smooth-scroll-provider';
import Navbar from '@/components/Navbar';
import RouteLoader from '@/components/RouteLoader';

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
       <script
  dangerouslySetInnerHTML={{
    __html: `
      (function () {
        // Blocking script - executes before any rendering
        const root = document.documentElement;
        
        // Hide immediately
        root.style.visibility = 'hidden';
        
        try {
          const theme = localStorage.getItem('theme') || 'dark';
          
          // Set theme immediately
          root.classList.remove('light', 'dark');
          root.classList.add(theme);
          
          // Set background immediately to prevent white flash
          if (theme === 'dark') {
            root.style.backgroundColor = '#000000';
            root.style.color = '#ffffff';
          } else {
            root.style.backgroundColor = '#ffffff'; 
            root.style.color = '#000000';
          }
          
        } catch(e) {
          // Fallback to dark theme
          root.classList.add('dark');
          root.style.backgroundColor = '#000000';
          root.style.color = '#ffffff';
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
/>
      </head>
      <body
        suppressHydrationWarning
        className="2xl:container mx-auto antialiased transition-colors bg-white text-black dark:bg-black dark:text-white relative"
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
          </SmoothScrollProvider>
        </ThemeToggleProvider>
      </body>
    </html>
  );
}