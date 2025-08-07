'use client';

import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Footer from "@/components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Page() {
 useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.utils.toArray(".parallax-img").forEach((img) => {
      gsap.fromTo(
        img,
        { y: "-30%", scale: 1 },
        {
          y: "30%",
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );
    });
  });

  return () => {
    ctx.revert(); // clean up animations
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}, []);


  const images = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1000&q=80",
    "https://images.unsplash.com/photo-1569596082827-c5e8990496cb?w=1000&q=80",
    "https://images.unsplash.com/photo-1587932775991-708a20af2cc2?w=1000&q=80",
    "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=1000&q=80",
    "https://images.unsplash.com/photo-1623166200209-6bd48520d6cb?w=1000&q=80",
    "https://images.unsplash.com/photo-1532587459811-f057563d1936?w=1000&q=80",
  ];

  return (
    <div className="m-0 py-20 overflow-x-hidden ">
      {/* Title */}
      <section className="w-full py-20 px-6 text-left  ">
        <h1 className="text-4xl lg:text-[128px] title font-bold">Clip Path</h1>
      </section>

      {/* Fullscreen Image */}
      <section className="relative w-full h-[800px] overflow-hidden mb-5">
        <img
          src={images[0]}
          alt="Fullscreen Visual"
          className="absolute top-0 left-0 w-full h-full object-cover parallax-img will-change-transform"
        />
      </section>

      {/* Paragraph */}
      <section className="w-full py-16 px-6 flex justify-center  mb-5">
        <div className="max-w-2xl text-center">
          <p className="text-lg md:text-xl leading-relaxed">
            This visual journey combines balance, beauty, and depth through immersive imagery and thoughtful layout.
          </p>
        </div>
      </section>

      {/* 2 images: 70% + 30% */}
      <section className="w-full flex flex-col md:flex-row gap-5 h-[70vh] mb-5">
        <div className="w-full md:w-[70%] relative overflow-hidden h-[50vh] md:h-full">
          <img
            src={images[1]}
            alt="Wide"
            className="absolute inset-0 w-full h-full object-cover parallax-img will-change-transform"
          />
        </div>
        <div className="w-full md:w-[30%] relative overflow-hidden h-[50vh] md:h-full">
          <img
            src={images[2]}
            alt="Narrow"
            className="absolute inset-0 w-full h-full object-cover parallax-img will-change-transform"
          />
        </div>
      </section>

      {/* Full image */}
      <section className="relative w-full h-[90vh] overflow-hidden mb-5">
        <img
          src={images[3]}
          alt="Full width"
          className="absolute inset-0 w-full h-full object-cover parallax-img will-change-transform"
        />
      </section>

      {/* 3 images same width */}
      <section className="w-full flex flex-col md:flex-row gap-5 h-[50vh] mb-5">
        {[images[1], images[4], images[2]].map((img, i) => (
          <div key={i} className="w-full md:w-1/3 relative overflow-hidden h-[50vh]">
            <img
              src={img}
              alt={`Three Col ${i + 1}`}
              className="absolute inset-0 w-full h-full object-cover parallax-img will-change-transform"
            />
          </div>
        ))}
      </section>

      {/* Another Paragraph */}
      <section className="w-full py-16 px-6 flex justify-center  mb-5">
        <div className="max-w-2xl text-center">
          <p className="text-lg md:text-xl leading-relaxed">
            Carefully selected visual moments, paced with whitespace and layout rhythm, evoke emotion and elegance.
          </p>
        </div>
      </section>

      {/* Final Full Image */}
      <section className="relative w-full h-[800px] overflow-hidden">
        <img
          src={images[5]}
          alt="Final Fullscreen"
          className="absolute top-0 left-0 w-full h-full object-cover parallax-img will-change-transform"
        />
      </section>
      <Footer/>
    </div>
  );
}
