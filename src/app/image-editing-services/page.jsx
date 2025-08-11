'use client';

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ResponsiveZoomGrid({
  images = [
    { src: "/images/image-1.webp", alt: "Clipping Path" },
    { src: "/images/image-2.webp", alt: "Background Removal" },
    { src: "/images/image-3.webp", alt: "Shadow Creation" },
    { src: "/images/image-4.webp", alt: "Color Correction" },
    { src: "/images/image-5.webp", alt: "Photo Retouching" },
    { src: "/images/image-6.webp", alt: "Image Masking" },
    { src: "/images/image-7.webp", alt: "Ghost Mannequin" },
    { src: "/images/image-8.webp", alt: "Product Photo Editing" },
  ]
}) {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const imagesEls = gsap.utils.toArray(".zoom-image");

    imagesEls.forEach((img) => {
      gsap.fromTo(
        img,
        { scale: 1.4, y: 20 },
        {
          scale: 1,
          y: -20,
          ease: "power2.out",
          scrollTrigger: {
            trigger: img,
            start: "top 80%",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="mx-auto px-4 md:px-6 py-20">
      <div className="mb-8 md:mb-12 text-center">
        <h2 className="text-[128px] title font-semibold tracking-tight">
          Image Editing Services
        </h2>
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
      >
        {images.map((img, idx) => (
          <figure
            key={idx}
            className="flex flex-col relative overflow-hidden rounded-t-lg"
          >
            <div className="aspect-[4/3] overflow-hidden " >
              <img
                src={img.src}
                alt={img.alt || `Grid image ${idx + 1}`}
                loading="lazy"
                className="zoom-image w-full h-full object-cover will-change-transform select-none"
              />
            </div>
            <figcaption className="mt-4 text-left text-lg font-medium text-gray-800">
              {img.alt || `Service ${idx + 1}`}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
