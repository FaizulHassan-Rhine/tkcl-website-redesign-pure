"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Separate the video item
const video = {
  type: "video",
  title: "Video Editing",
  service: "Photo Editing Services",
  src: "https://tkcl-website-redesign-pure.vercel.app/videos/crop.webm",
  alt: "Masking",
};

// Other media items
const items = [
  {
    type: "image",
    title: "Image Editing",
    service: "Photo Editing Services",
    src: "https://tkcl-website-redesign-pure.vercel.app/images/Photo-Retouch/photo-retouch-2-after.webp",
    alt: "Clipping Path",
  },
  {
    type: "3d",
    src: "https://sketchfab.com/models/ff101cef30c140eb8f6893898aa5ca2f/embed",
    title: "3D Modelling & Rendering",
    service: "3D Services",
  },
  {
    type: "image",
    title: "CAD to Campaign",
    service: "3D Services",
    src: "/images/cad-to-campaign.webp",
    alt: "CAD to Campaign",
  },
  // {
  //   type: "image",
  //   title: "Holosnap",
  //   service: "AI Services",
  //   src: "https://tkcl-redesigned.vercel.app/assets/imgs/project/image-65.webp",
  //   alt: "Holosnap",
  // },
  // {
  //   type: "image",
  //   title: "Retouched AI",
  //   service: "AI Services",
  //   src: "https://tkcl-redesigned.vercel.app/assets/imgs/project/image-66.webp",
  //   alt: "Retouched AI",
  // },
];

export default function FeaturedWork() {
  const sectionRef = useRef(null);

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
    <section ref={sectionRef}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12 w-full h-full px-4 py-10 mx-auto">
        {/* 1st: Image */}
        <MediaBox item={items[0]} />

        {/* 2nd: Video */}
        {/* 2nd: Video */}
<div className="flex flex-col space-y-2">
  <div className="relative overflow-hidden rounded-xl aspect-[3/2] w-full">
    <video
      className="zoom-image absolute top-0 left-0 w-full h-full object-cover will-change-transform"
      src={video.src}
      title={video.title}
      autoPlay
      loop
      muted
      playsInline
    />
  </div>
  <div className="px-1">
    <h2 className="text-[20px] sm:text-[25px] lg:text-[30px] title font-semibold leading-tight">
      {video.title}
    </h2>
  </div>
</div>


        {/* 3rd: 3D Model */}
        <MediaBox item={items[1]} />

        {/* Remaining 3 Images */}
        {items.slice(2).map((item, index) => (
          <MediaBox key={index} item={item} />
        ))}
      </div>
    </section>
  );
}

function MediaBox({ item }) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="relative overflow-hidden rounded-xl shadow-lg aspect-[3/2] w-full">
        {item.type === "image" ? (
          <img
            src={item.src}
            alt={item.alt}
            className="zoom-image absolute top-0 left-0 w-full h-full object-cover will-change-transform"
          />
        ) : (
          <iframe
            className="zoom-image absolute top-0 left-0 w-full h-full object-cover will-change-transform"
            src={`${item.src}${item.src.includes("?") ? "&" : "?"}autostart=0`}
            title={item.title}
            frameBorder="0"
            allow="fullscreen; vr"
            mozallowfullscreen="true"
            webkitallowfullscreen="true"
          ></iframe>
        )}
      </div>
      <div className="px-1">
        <h2 className="text-[20px] sm:text-[25px] lg:text-[30px] title font-semibold leading-tight">
          {item.title}
        </h2>
      </div>
    </div>
  );
}
