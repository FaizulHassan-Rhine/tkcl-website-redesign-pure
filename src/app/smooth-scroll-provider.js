'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      smooth: true,
      smoothWheel: true,
      duration: 0.005,
    });

    function raf(time) {
      lenis.raf(time);
    }

    gsap.ticker.add(raf);

    // Sync ScrollTrigger on scroll
    lenis.on('scroll', ScrollTrigger.update);

    // Set custom scroller for ScrollTrigger
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true });
        }
        return window.scrollY;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.body.style.transform ? 'transform' : 'fixed',
    });

    // Refresh triggers on load
    ScrollTrigger.addEventListener('refresh', () => lenis.resize());
    ScrollTrigger.refresh();

   return () => {
  gsap.ticker.remove(raf);
  lenis.destroy();
  ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // ✅ Proper cleanup
};

  }, []);

  return <>{children}</>;
}
