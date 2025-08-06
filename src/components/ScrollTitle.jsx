import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

// Register the plugin
gsap.registerPlugin(ScrollTrigger);

export default function ScrollTitle() {
  const containerRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 2,
      smooth: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Sync ScrollTrigger updates with Lenis
    lenis.on('scroll', ScrollTrigger.update);

    // GSAP animation
    const circle = circleRef.current;
    const text = textRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=100%",
        scrub: true,
        pin: true,
      },
    });

    tl.to(circle, {
      scale: 10,
      ease: "power1.inOut",
    }).to(
      text,
      {
        scale: 1,
        opacity: 1,
        ease: "power1.inOut",
      },
      0
    );
  }, []);

  return (
    <div>
      <div ref={containerRef} className="w-full  relative">
        <div className="sticky top-0 w-full h-screen flex items-center justify-center z-10 overflow-hidden">
          <div
            ref={circleRef}
            className="bg-green-600 w-[400px] h-[400px] rounded-full flex items-center justify-center origin-center"
          >
            <h1
              ref={textRef}
              className="text-white text-2xl font-bold origin-center"
            >
              LET'S WORK
            </h1>
          </div>
        </div>
      </div>

     
    </div>
  );
}
