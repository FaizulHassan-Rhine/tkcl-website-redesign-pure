'use client';
import './globals.css';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import ThemeToggleProvider from './theme-provider';
import SmoothScrollProvider from './smooth-scroll-provider';
import Navbar from '@/components/Navbar';
import RouteLoader from '@/components/RouteLoader';
import ScrollToTop from '@/components/ScrollToTop';
import Script from 'next/script';

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const [themeLoaded, setThemeLoaded] = useState(false);
  const pathname = usePathname();

  // Routes where navbar should be hidden
  const hideNavbarRoutes = ['/2D-service-portfolio'];
  const hideNavbar = hideNavbarRoutes.includes(pathname);

  useEffect(() => {
    const timer = setTimeout(() => setThemeLoaded(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
        `}</style>
      </head>
      <body
        suppressHydrationWarning
        className="md:mx-auto antialiased transition-colors bg-[#F8F9F6] text-black dark:bg-black dark:text-white relative"
        style={{ visibility: themeLoaded ? 'visible' : 'hidden', minHeight: '100vh' }}
      >
        <ThemeToggleProvider>
          <SmoothScrollProvider>
            {!hideNavbar && <Navbar />}
            <RouteLoader onLoadingDone={() => setLoading(false)} />
            <main>{children}</main>
            <ScrollToTop />
          </SmoothScrollProvider>
        </ThemeToggleProvider>

        {/* LinkedIn */}
        <Script id="linkedin-insight" strategy="afterInteractive">
          {`
            _linkedin_partner_id = "405043";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          `}
        </Script>
        <Script id="linkedin-loader" strategy="afterInteractive">
          {`
            (function(l){
              if (!l) {
                window.lintrk = function(a,b){ window.lintrk.q.push([a,b]); };
                window.lintrk.q = [];
              }
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript"; b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);
            })(window.lintrk);
          `}
        </Script>
        <noscript>
          <img height="1" width="1" style={{ display: 'none' }} alt=""
               src="https://px.ads.linkedin.com/collect/?pid=405043&fmt=gif" />
        </noscript>

        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-3Y1MY9W29R" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){ dataLayer.push(arguments); }
            gtag('js', new Date()); gtag('config', 'G-3Y1MY9W29R');
          `}
        </Script>

        {/* Hotjar */}
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

        {/* Microsoft Clarity */}
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
