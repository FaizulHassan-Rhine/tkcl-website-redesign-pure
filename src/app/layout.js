'use client';
import './globals.css';
import React, { useState, useEffect } from 'react';
import ThemeToggleProvider from './theme-provider';
import SmoothScrollProvider from './smooth-scroll-provider';
import Navbar from '@/components/Navbar';
import RouteLoader from '@/components/RouteLoader';
import ScrollToTop from '@/components/ScrollToTop';
import Script from 'next/script';

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
        className="  md:mx-auto antialiased transition-colors bg-[#F8F9F6] text-black dark:bg-black dark:text-white relative"
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


              <Script id="linkedin-insight" strategy="afterInteractive">
          {`
            _linkedin_partner_id = "405043";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          `}
        </Script>
        <Script id="linkedin-loader" strategy="afterInteractive">
          {`
            (function(l) {
              if (!l) {
                window.lintrk = function(a, b) {
                  window.lintrk.q.push([a, b]);
                };
                window.lintrk.q = [];
              }
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";
              b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);
            })(window.lintrk);
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            alt=""
            src="https://px.ads.linkedin.com/collect/?pid=405043&fmt=gif"
          />
        </noscript>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3Y1MY9W29R"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-3Y1MY9W29R');
          `}
        </Script>
        <Script id="hotjar-tracking" strategy="afterInteractive">
            {`
              (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:6458913,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `}
          </Script>
          <Script id="microsoft-clarity" strategy="afterInteractive">
  {`
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "sqh4onf0co");
  `}
</Script>
      </body>
    </html>
  );
}