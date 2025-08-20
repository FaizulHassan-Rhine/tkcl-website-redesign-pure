"use client";

import { useEffect, useState } from "react";

export default function HeroSection() {
  const [loadVideo, setLoadVideo] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero-section");
      const rect = hero?.getBoundingClientRect();
      if (rect?.top < window.innerHeight && rect?.bottom > 0) {
        setLoadVideo(true);
      }
    };

    handleScroll(); // run on load
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="hero-section"
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background Video */}
      {loadVideo && (
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source src="/videos/Alnature-animation-for-website.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 z-10 " />

      {/* Content */}
      <div className="relative z-20 text-center -mt-[200px] px-4 text-white">
        <h1 className="text-4xl md:text-6xl font-bold ">
          Bring Your Visuals to Life<br />
          <span className="text-white">with AI-Powered, Human Perfection</span>
        </h1>
        <h2 className="mt-4 text-xl md:text-2xl font-medium">
          Stunning 2D Image Editing and 3D Visualization
        </h2>
        <a href="/contact">
          <button className="relative mt-5 px-8 py-4 bg-[#4FA59B] text-white border border-[#4FA59B] rounded-full font-medium overflow-hidden group transition-all duration-300 hover:text-white">
            <span className="absolute inset-0 bg-[#3B837B] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
            <span className="relative z-10 text-[14px] xl:text-[20px]">Let's Talk</span>
          </button>
        </a>
      </div>
    </section>
  );
}
