"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { info } from "autoprefixer";

gsap.registerPlugin(ScrollTrigger);

const images = [
  {
    type: "image",
    title: "Image Editing",
    service: "Photo Editing Services",
    src: "/images/image-1.webp",
    alt: "Clipping Path",
  },
  { type: "image", title: "Video Editing", service: "Photo Editing Services", src: "/images/image-2.webp", alt: "Masking" },
  {
    type: "3d",
    src: "https://sketchfab.com/models/20a01f39619f47a6a656778239db3ff8/embed?autospin=1&autostart=1&preload=1", // Example 3D Model #1
    title: "3D Modelling & Rendering",
    service: "3D Services",
  },
  {
    type: "3d",
    src: "https://sketchfab.com/models/f3e6f16527af4465858a34cc1e9e7a2b/embed?autostart=1", // Example 3D Model #2
    title: "CAD to Campaign",
    service: "3D Services",
  },
  { type: "image", title: "Holosnap", service: "AI Services", src: "/images/image-5.webp", alt: "Holosnap" },
  { type: "image", title: "Retouched AI", service: "AI Services", src: "/images/image-6.webp", alt: "Retouched AI" },
];

export default function FeaturedWork() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const images = gsap.utils.toArray(".zoom-image");

    images.forEach((img) => {
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
    <section ref={sectionRef} className="">
      {/* <h1 className="text-[40px] sm:text-[60px] md:text-[80px] lg:text-[140px] title font-bold text-center mb-2">Feature Work</h1> */}
      <div className="flex justify-between items-center px-4 ">
        {/* <h1 className="text-[10px] lg:text-lg font-light text-center mb-2">Featured Work</h1> */}
        {/* <h1 className="text-[10px] lg:text-[24px] font-light text-center mb-2">
          Feature Work
        </h1> */}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12  w-full h-full px-4 py-10 mx-auto">
        {images.map((item, index) => (
          <div key={index} className="flex flex-col space-y-2">
            {/* Image or 3D model box */}
            <div className="relative overflow-hidden rounded-xl  aspect-[3/2] w-full">
              {item.type === "image" ? (
                <img
                  src={item.src}
                  alt={item.alt}
                  className="zoom-image absolute top-0 left-0 w-full h-full object-cover will-change-transform"
                />
              ) : (
                <iframe
                  className="zoom-image absolute top-0 left-0 w-full h-full object-cover will-change-transform"
                  src={item.src}
                  title={item.title}
                  frameBorder="0"
                  allow="autoplay; fullscreen; vr"
                  mozallowfullscreen="true"
                  webkitallowfullscreen="true"
                ></iframe>
              )}
            </div>

            {/* Text below */}
            <div className=" px-1">
              {item.title && (
                <h2 className= "text-[20px] sm:text-[25px] lg:text-[30px] title font-semibold leading-tight">
                  {item.title}
                </h2>
              )}
             
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
