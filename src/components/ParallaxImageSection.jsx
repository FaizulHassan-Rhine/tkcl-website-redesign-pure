'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxImageSection() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { y: '-30%' }, // initial offset upward
        {
          y: '30%',     // end offset downward
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[200px] lg:h-[800px] w-full overflow-hidden"
    >
      <img
        ref={imageRef}
        src="https://futurestartup.com/wp-content/uploads/2021/03/Kow-AV_Sub_01.00_01_46_22.Still001.jpg"
        alt="Parallax"
        className="absolute hidden md:block top-0 left-0 w-full h-full object-cover"
      />
      <img
        // ref={imageRef}
        src="https://futurestartup.com/wp-content/uploads/2021/03/Kow-AV_Sub_01.00_01_46_22.Still001.jpg"
        alt="Parallax"
        className="absolute top-0 block md:hidden left-0 w-full h-full object-cover"
      />
    </div>
  );
}
