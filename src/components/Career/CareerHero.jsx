'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CareerHero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(titleRef.current, 
      { y: 100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    )
    .fromTo(subtitleRef.current, 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 
      '-=0.5'
    )
    .fromTo(statsRef.current?.children, 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.1 }, 
      '-=0.3'
    );

    // Parallax effect
    gsap.fromTo(heroRef.current, 
      { y: 0 }, 
      {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      }
    );
  }, []);

  return (
    <div ref={heroRef} className="bg-white text-black min-h-screen flex items-center px-6 md:px-20 py-32">
      <div className="max-w-7xl mx-auto w-full">
        {/* Main Title */}
        <div ref={titleRef} className="mb-8">
          <h1 className="text-6xl lg:text-[120px] title font-semibold leading-[1.1]" style={{fontFamily: 'Rosaline, serif'}}>
            Join Our
          
            Creative
            <br />
            <span className="sub-title">Journey</span>
          </h1>
        </div>

        {/* Section Divider */}
        <div className="border-t border-gray-300 my-12"></div>

        {/* Subtitle */}
        <div ref={subtitleRef} className="mb-16">
          <h2 className="text-2xl lg:text-[48px] leading-[30px] lg:leading-[52px] max-w-4xl sub-title">
            Shape the future of digital creativity with us. We're looking for passionate individuals 
            who want to push the boundaries of visual storytelling.
          </h2>
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-16">
          <div className="text-center md:text-left">
            <div className="text-4xl lg:text-6xl font-bold title mb-2">50+</div>
            <div className="text-lg lg:text-xl text-body">Team Members</div>
          </div>
          <div className="text-center md:text-left">
            <div className="text-4xl lg:text-6xl font-bold title mb-2">15+</div>
            <div className="text-lg lg:text-xl text-body">Countries</div>
          </div>
          <div className="text-center md:text-left">
            <div className="text-4xl lg:text-6xl font-bold title mb-2">24/7</div>
            <div className="text-lg lg:text-xl text-body">Global Support</div>
          </div>
          <div className="text-center md:text-left">
            <div className="text-4xl lg:text-6xl font-bold title mb-2">100%</div>
            <div className="text-lg lg:text-xl text-body">Remote Friendly</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16">
          <a 
            href="#open-positions" 
            className="group relative overflow-hidden bg-black text-white font-semibold px-8 lg:px-16 py-4 lg:py-6 rounded-full inline-flex items-center gap-4 transition-all duration-300"
          >
            <span className="relative z-10 text-lg lg:text-xl transition-colors duration-300 group-hover:text-white">
              View Open Positions
            </span>
            <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <span className="absolute inset-0 bg-green-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></span>
          </a>
        </div>
      </div>
    </div>
  );
}
