'use client';

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FooterGrid from "@/components/FooterNew";

gsap.registerPlugin(ScrollTrigger);

function slugify(str = "") {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function ResponsiveZoomGrid({
  images = [
    { src: "/images/image-1.webp", alt: "Shadow Addition", href: "/shadow-addition" },
    { src: "/images/image-2.webp", alt: "Background Replacement", href: "/background-replacement" },
    { src: "/images/image-3.webp", alt: "Image Manipulation", href: "/image-manipulation" },
    { src: "/images/image-4.webp", alt: "Ghost Mannequin", href: "/ghost-mannequin" },
    { src: "/images/image-5.webp", alt: "Photo Recolor", href: "/photo-recolor" },
    { src: "/images/image-6.webp", alt: "Photo Masking", href: "/photo-masking" },
    { src: "/images/image-7.webp", alt: "Photo Retouch", href: "/photo-retouch" },
    { src: "/images/image-8.webp", alt: "Color Correction", href: "/color-correction" },
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

  const getHref = (img) => img.href || `/services/${slugify(img.alt || "")}`;

  return (
    <>
      <section ref={sectionRef} className="mx-auto px-4 md:px-6 py-20">
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="text-[100px] title font-semibold tracking-tight">
            Image Editing Services
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-20 max-w-8xl mx-auto"
        >
          {images.map((img, idx) => {
            const href = getHref(img);
            return (
              <figure
                key={idx}
                className="flex flex-col relative overflow-hidden rounded-t-lg group"
              >
                <Link href={href} aria-label={img.alt || `Service ${idx + 1}`} className="block">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={img.src}
                      alt={img.alt || `Grid image ${idx + 1}`}
                      loading="lazy"
                      className="zoom-image w-full h-full object-cover will-change-transform select-none transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                </Link>
                <figcaption className="mt-4 text-left text-[32px] font-semibold sub-title">
                  <Link href={href} className="hover:underline">
                    {img.alt || `Service ${idx + 1}`}
                  </Link>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </section>
      <FooterGrid />
    </>
  );
}
