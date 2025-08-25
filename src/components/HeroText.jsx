"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { HiArrowRight } from "react-icons/hi";

export default function HeroSection() {
  const [loadVideo, setLoadVideo] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // index over duplicated list
  const [isTransitioning, setIsTransitioning] = useState(true);
  const transitionMs = 1500; // keep in sync with class duration-700

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
const styles = `
  @keyframes bounceRight {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(5px); }
  }`;
  // Content for different sections (original list)
  const heroContent = useMemo(
    () => [
      {
        title: "Bring Your Visuals to Life.",
        // subtitle: "with AI-Powered, Human Perfection",
        description: "Stunning 2D Images and 3D Visualization.",
        buttonText: "Let’s talk",
        buttonLinkText: "Learn More",
      demoLink: "https://thekowcompany.com/contact-us",
        targetSection: "services",
      },
      {
        title: "AI Powered Human Perfection ",
        // subtitle: "Faster, Better, & in High Volumes With AI.",
        description: "Background Edits Done Faster, Better, & in High Volumes With AI.",
        buttonText: "Try the magic of Retouched.ai",
        buttonLinkText: "Learn More",
      demoLink: "https://retouched.ai/",
        targetSection: "services",
      },
      {
        title: "From CAD Files to Campaign Visuals.",
        // subtitle: "To 3D Models in Seconds With AI",
        description: "Time Travel to Endless Possibilities.",
        buttonText: "Try the magic of ai modelling",
        buttonLinkText: "Learn More",
      demoLink: "https://aimodelling.thekowcompany.com/",
        targetSection: "retouched",
      },
      {
        title: "Snap. Holosnap. Wow.",
        // subtitle: "with Premium Visual Content",
        description: "Transform Your 2D Images to 3D Models in Seconds With AI.",
        buttonText: "Try the magic of Holosnap",
        buttonLinkText: "Learn More",
      demoLink: "http://holosnap.ai/",
        targetSection: "retouched",
      },
      {
        title: "Content Done Right.",
        // subtitle: "with Premium Visual Content",
        description: "Resonating Perfectly With Your Contents.",
        buttonText: "Explore the philosophy​",
        buttonLinkText: "Learn More",
      demoLink: "https://thekowcompany.com/blogs",
        targetSection: "retouched",
      },
    ],
    []
  );

  // Duplicate slides to fake an infinite track (leftward only)
  const slides = useMemo(() => [...heroContent, ...heroContent], [heroContent]);

  const realCount = heroContent.length;
  const realIndex = currentIndex % realCount; // 0..realCount-1

  // Start loading bg video once hero enters viewport
  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero-section");
      const rect = hero?.getBoundingClientRect();
      if (rect?.top < window.innerHeight && rect?.bottom > 0) {
        setLoadVideo(true);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-advance forward only (leftward translate)
  useEffect(() => {
    const id = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  // When we pass the first copy (>= realCount), jump back by realCount with no transition
  const trackRef = useRef(null);
  useEffect(() => {
    if (currentIndex < realCount) return; // still in first copy
    // After transition ends, disable transition and snap back by -realCount
    const timer = setTimeout(() => {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev - realCount);
      // Re-enable transition on next tick so subsequent moves animate
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsTransitioning(true));
      });
    }, transitionMs);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, realCount]);

  // Dot click: always move forward (never backward) to the desired real index
  const goToRealIndexForwardOnly = (targetRealIndex) => {
    const advanceBy = (targetRealIndex - realIndex + realCount) % realCount; // 0..realCount-1
    if (advanceBy === 0) return; // already there
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + advanceBy);
  };

  return (
    <>
     <style>{styles}</style>
<section
  id="hero-section"
  className="relative h-[95vh] w-full overflow-hidden flex items-center justify-center max-lg:-mt-[15px]"
 style={{marginTop:'-25px'}}>
  {/* Background Video */}
  {loadVideo && (
    <video
      className="absolute inset-0 w-full h-full object-cover z-0"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src="/videos/Alnature-animation-for-website.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 z-10 " />

        {/* Content */}
        <div className="relative z-20 text-center -mt-[70px] md:-mt-[300px] text-white px-4 overflow-hidden w-full">
          <div className="relative w-full">
            {/* Sliding content container */}
            <div
              ref={trackRef}
              className={`flex ${
                isTransitioning ? "transition-transform duration-700 ease-in-out" : ""
              }`}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {slides.map((content, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="transform transition-all  duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)]" >
                    <h1 className="text-[20px] md:text-6xl font-bold leading-tight">
                      <span
                        className="block transform transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                        style={{
                          opacity: index % realCount === realIndex ? 1 : 0,
                          transform: `translateY(${index % realCount === realIndex ? "0px" : "20px"})`,
                        }}
                      >
                        {content.title}
                      </span>
                      
                      <span
                        className="text-white pt-2 transform transition-all duration-500 ease-out delay-100"
                        style={{
                          opacity: index % realCount === realIndex ? 1 : 0,
                          transform: `translateY(${index % realCount === realIndex ? "0px" : "20px"})`,
                        }}
                      >
                        {content.subtitle}
                      </span>
                    </h1>

                    <h2
                      className="mt-1 md:mt-4 text-[12px] md:text-2xl font-medium transform  transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] delay-400"
                      style={{
                        opacity: index % realCount === realIndex ? 1 : 0,
                        transform: `translateY(${index % realCount === realIndex ? "0px" : "20px"})`,
                      }}
                    >
                      {content.description}
                    </h2>
                   <div className="flex items-center justify-center gap-4">
   <button
      onClick={() => scrollToSection(content.targetSection)}
      className="relative mt-2 md:mt-8 px-4 md:px-8 md:py-3 py-2 bg-[#4FA59B] text-white border border-[#4FA59B] rounded-[10px] font-medium overflow-hidden group transition-all duration-600 hover:text-white hover:scale-105 transform delay-300"
    style={{
      opacity: index % realCount === realIndex ? 1 : 0,
      transform: `translateY(${index % realCount === realIndex ? "0px" : "30px"}) scale(${index % realCount === realIndex ? "1" : "0.9"})`,
    }}
  >
    <span className="absolute inset-0 bg-[#3B837B] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
    <span className="relative z-10 text-[14px] xl:text-[18px] transition-all duration-300">
      {content.buttonText}
    </span>
  </button>

  <a
      href={content.demoLink}
      target="_blank"
      rel="noopener noreferrer"
      className="relative mt-2 md:mt-8 px-4 md:px-8 md:py-3 py-2 bg-transparent text-white border border-white rounded-[10px] font-medium overflow-hidden group transition-all duration-600 hover:text-[#4FA59B] hover:scale-105 transform delay-300 flex items-center gap-2"
    style={{
      opacity: index % realCount === realIndex ? 1 : 0,
      transform: `translateY(${index % realCount === realIndex ? "0px" : "30px"}) scale(${index % realCount === realIndex ? "1" : "0.9"})`,
    }}
  >
    <span className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
      <span className="relative z-10 text-[14px] xl:text-[18px] transition-all duration-300 flex items-center gap-2">
        {content.buttonLinkText}
        <HiArrowRight 
          className="w-5 h-5" 
          style={{ animation: 'bounceRight 1.5s infinite ease-in-out' }}
        />
      </span>
  </a>
</div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress indicators */}
          {/* <div className="flex justify-center space-x-2 mt-8 relative z-30">
            {heroContent.map((_, index) => (
              <button
                key={index}
                onClick={() => goToRealIndexForwardOnly(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 transform ${
                  index === realIndex
                    ? "bg-white scale-110 shadow-lg"
                    : "bg-white/50 hover:bg-white/75 hover:scale-105"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div> */}
        </div>
      </section>
    </>
  );
}
