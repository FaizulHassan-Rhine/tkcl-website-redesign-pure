import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollTitle() {
  const containerRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Smooth scrolling
    const lenis = new Lenis({
      duration: 2,
      smooth: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    let rafId;
    const raf = (time) => { lenis.raf(time); rafId = requestAnimationFrame(raf); };
    rafId = requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);

    const circle = circleRef.current;
    const text = textRef.current;

    // Fit text to a safe viewport box and return the maximum allowed scale
    const getTextFitScale = () => {
      if (!text) return 1;
      // save current scale, measure at scale(1), restore
      const prevScale = gsap.getProperty(text, "scale") || 1;
      gsap.set(text, { scale: 1 });
      const rect = text.getBoundingClientRect();

      // Safe area (tweak if you want tighter/looser bounds)
      const safeW = window.innerWidth * 0.9;  // 90% of viewport width
      const safeH = window.innerHeight * 0.7; // 70% of viewport height

      // Avoid divide by zero
      const fit =
        rect.width && rect.height
          ? Math.min(safeW / rect.width, safeH / rect.height) * 0.98 // buffer
          : 1;

      gsap.set(text, { scale: prevScale });
      return Math.max(0.1, Math.min(fit, 10));
    };

    // How big the circle should get to overfill the screen
    const getCircleScale = () => {
      const { width: cw, height: ch } = circle.getBoundingClientRect();
      const maxViewport = Math.max(window.innerWidth, window.innerHeight);
      const circleDiameter = Math.max(cw, ch);
      return (maxViewport * 1.2) / circleDiameter;
    };

    // Initial states
    gsap.set(circle, { scale: 1, transformOrigin: "50% 50%" });
    gsap.set(text,   { scale: 0.8, opacity: 1, transformOrigin: "50% 50%" });

    // Timeline: circle always grows to fill; text grows up to its fit cap
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=150%",
        scrub: true,
        pin: true,
        invalidateOnRefresh: true, // recompute on resize/orientation
      },
    });

    tl.to(circle, {
      scale: getCircleScale,
      ease: "power1.inOut",
    }).to(
      text,
      {
        // The end value is re-evaluated on refresh; during the tween the text increases
        // but never beyond the fit-to-viewport cap.
        scale: getTextFitScale,
        opacity: 1,
        ease: "power1.inOut",
      },
      0
    );

    const onResize = () => {
      // If the text was already near the cap, recompute the cap on resize
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div>
      <div ref={containerRef} className="relative w-full  ">
        <div className="sticky top-0 z-10  flex h-screen w-full items-center justify-center overflow-hidden">
          {/* Growing circle behind */}
          <div
            ref={circleRef}
            className="rounded-full bg-[#4FA59B] "
            style={{
              width: "clamp(160px, 45vw, 520px)",
              height: "clamp(160px, 45vw, 520px)",
            }}
          />

          {/* Text above circle – grows but always fits */}
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-4">
            <h1
              ref={textRef}
              className="text-center font-bold text-white leading-[0.95] max-w-[90vw]"
              style={{
                // Start size is the "design" size; the animation scales this up to the fit cap.
                fontSize: "clamp(22px, 6vw, 72px)",
                wordBreak: "break-word",
                textShadow: "0 1px 2px rgba(0,0,0,.25)",
              }}
            >
              LET&apos;S WORK
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
