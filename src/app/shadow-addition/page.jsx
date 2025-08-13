'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Lenis from '@studio-freight/lenis';
import Footer from '@/components/Footer';
import { ReactCompareSlider, ReactCompareSliderImage, ReactCompareSliderHandle } from 'react-compare-slider';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FooterGrid from '@/components/FooterNew';
import ContactForm from '@/components/ContactForm';
import FAQ from '@/components/Faq';

gsap.registerPlugin(ScrollTrigger);

function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({ 
      smoothWheel: true,
      lerp: 0.1, // Smoother interpolation
      duration: 1.2, // Slightly longer duration for smoother effect
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(id);
      if (lenis && typeof lenis.destroy === 'function') lenis.destroy();
    };
  }, []);
}

// Third‑party Before/After using react-compare-slider
function BeforeAfterSlider({ beforeSrc, afterSrc, alt = 'Before After', initial = 50, className = '' }) {
  return (
    <div className={`relative h-full w-full ${className}`}>
      <ReactCompareSlider
        itemOne={<ReactCompareSliderImage src={beforeSrc} alt={`${alt} before`} />}
        itemTwo={<ReactCompareSliderImage src={afterSrc} alt={`${alt} after`} />}
        position={initial}
        boundsPadding={0}
        keyboardIncrement='5%'
        handle={
          <ReactCompareSliderHandle
            buttonStyle={{
              border: 0,
              boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
              width: 44,
              height: 44,
              borderRadius: '9999px',
              background: 'rgba(255,255,255,0.95)',
              color: 'rgba(0,0,0,0.8)',
            }}
            linesStyle={{
              background: 'rgba(255,255,255,0.85)',
              mixBlendMode: 'difference',
              width: 2
            }}
          />
        }
        style={{ width: '100%', height: '100%', borderRadius: '1rem' }}
      />
      {/* Overlays */}
      <div className="pointer-events-none absolute left-4 top-4 z-10 rounded-full bg-black/40 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white">Before</div>
      <div className="pointer-events-none absolute right-4 top-4 z-10 rounded-full bg-black/40 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white">After</div>
    </div>
  );
}

export default function Page() {

      const blog3dApidomain = "https://tkclbackendev.onrender.com";
      const [faqs, setFaqs] = useState([]);
      const [loading, setLoading] = useState(true);
      const [errorMsg, setErrorMsg] = useState("");
    
      useEffect(() => {
        const controller = new AbortController();
    
        const load = async () => {
          try {
            setLoading(true);
            setErrorMsg("");
    
            const res = await fetch(
              `${blog3dApidomain}/api/faqs-clip-path-details`,
              {
                headers: {
                  Accept: "application/json",
                  "x-api-key": process.env.NEXT_PUBLIC_API_SECRET_KEY, // client env var
                },
              }
            );
    
            if (!res.ok) {
              throw new Error(`HTTP ${res.status}`);
            }
    
            const data = await res.json();
            setFaqs(data);
          } catch (err) {
            setErrorMsg("Could not load FAQs.");
          } finally {
            setLoading(false);
          }
        };
    
        load();
        return () => controller.abort();
      }, []);
  useLenis();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.parallax-img').forEach((img) => {
        gsap.fromTo(
          img,
          { y: '-20%', scale: 1.05 }, // Reduced movement range and added slight scale
          {
            y: '20%',
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: img.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1, // Reduced scrub value for smoother animation
              invalidateOnRefresh: true, // Helps with responsive issues
              anticipatePin: 1, // Helps prevent flickering
            },
          }
        );
      });

      // Refresh ScrollTrigger after images load
      ScrollTrigger.refresh();
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const images = [
    '/images/Shadow-Addition/Slider/shadow-addition-2-before.webp',
    '/images/Shadow-Addition/Slider/shadow-addition-2-after.webp',
    '/images/Shadow-Addition/Slider/shadow-addition-5-before.webp',
    '/images/Shadow-Addition/Slider/shadow-addition-5-after.webp',
    '/images/Shadow-Addition/Slider/shadow-addition-6-before.webp',
    '/images/Shadow-Addition/Slider/shadow-addition-6-after.webp',
    '/images/Shadow-Addition/shadow-addition-1-after.webp',
    '/images/Shadow-Addition/shadow-addition-3-after.webp',
    '/images/Shadow-Addition/shadow-addition-4-after.webp',
    '/images/Shadow-Addition/shadow-addition-8-after.webp',
    '/images/Shadow-Addition/shadow-addition-12-before.webp',
  ];

  // Replace with your real Before/After sources
  const triptychPairs = [
    { before: images[0], after: images[1] },
    { before: images[2], after: images[3] },
    { before: images[4], after: images[5] },
  ];

  return (
    <>
      <div className="m-0 py-20 overflow-x-hidden">
        {/* Title */}
        <section className="w-full py-10 px-6 text-left flex justify-between items-center">
          <h1 className="text-4xl lg:text-[80px] title font-bold">Shadow Addition</h1>
          <div className="w-[40%] max-w-xl">
            {/* <h2 className="text-[20px] font-semibold sub-title">What is Shadow Addition?</h2> */}
            <p className="text-body text-[20px]">
              To make a product look realistic and to add dimensions, adding shadow is imperative. Being precise with the
              shadow addition gives the illusion that the image was shot in perfect lighting as it makes the subject more
              vibrant and visible.
            </p>
          </div>
        </section>

        {/* Fullscreen Image */}
        <section className="relative w-full h-[800px] overflow-hidden mb-5">
          <div className="absolute inset-0 bg-gray-100"> {/* Fallback background */}
            <img
              src={images[9]}
              alt="Fullscreen Visual"
              className="absolute top-0 left-0 w-full h-full object-cover parallax-img will-change-transform"
              loading="lazy"
            />
          </div>
        </section>

        {/* Paragraph */}
        <section className="w-full py-16 flex justify-center mb-5 px-6">
          <div className="flex justify-between items-center ">
            <h3 className="sub-title text-[50px] leading-[50px] font-semibold">Why choose <br /> The KOW Company?</h3>
            <p className="text-body w-[50%] text-[20px]">
              We have a talented pool of retouchers who meticulously add shadows that make each image look genuine, natural
              and professionally shot. From subtle drop shadows to dramatic cast effects, we match light direction, texture,
              and intensity. The team have mastered the art of shadows by exceeding the expectations of all our clients.
            </p>
          </div>
        </section>

        {/* 2 images: 70% + 30% */}
        <section className="w-full flex flex-col md:flex-row gap-5 h-[70vh] mb-5 px-6 md:px-8">
          <div className="w-full md:w-[70%] relative overflow-hidden h-[50vh] md:h-full rounded-2xl">
            <div className="absolute inset-0 bg-gray-100">
              <img
                src={images[7]}
                alt="Wide"
                className="absolute inset-0 w-full h-full object-cover parallax-img will-change-transform"
                loading="lazy"
              />
            </div>
          </div>
          <div className="w-full md:w-[30%] relative overflow-hidden h-[50vh] md:h-full rounded-2xl">
            <div className="absolute inset-0 bg-gray-100">
              <img
                src={images[10]}
                alt="Narrow"
                className="absolute inset-0 w-full h-full object-cover parallax-img will-change-transform"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Full image */}
        <section className="relative w-full h-[90vh] overflow-hidden mb-5">
          <div className="absolute inset-0 bg-gray-100">
            <img
              src={images[8]}
              alt="Full width"
              className="absolute inset-0 w-full h-full object-cover parallax-img will-change-transform"
              loading="lazy"
            />
          </div>
        </section>

        {/* 3 images same width -> Each is an individual Before/After slider */}
        <section className="w-full flex flex-col md:flex-row gap-5 h-[50vh] mb-5 ">
          {triptychPairs.map((p, i) => (
            <div key={i} className="w-full h-[50vh]">
              <BeforeAfterSlider beforeSrc={p.before} afterSrc={p.after} alt={`Shadow Compare ${i + 1}`} initial={50} />
            </div>
          ))}
        </section>

        {/* Another Paragraph */}
        <section className="w-full py-16 px-6 flex justify-center mb-5">
          <div className="flex justify-center items-center w-full ">
            <div className='w-full'>
            </div>
            <div className='w-full'>
                <h1 className='text-[40px] font-semibold sub-title'>Where it is used </h1>
                <ul className='list-disc pl-5 text-body text-[20px]'>
                    <li>eCommerce product displays </li>
                    <li>Lifestyle and catalogue photography  </li>
                    <li>Advertising layouts  </li>
                    <li>Social media product promotions  </li>
                </ul>
            </div>
            <div className='w-full'>
                <h1 className='text-[40px] font-semibold sub-title'>Common shadow styles </h1>
                <ul className='list-disc pl-5 text-body text-[20px]'>
                    <li>Drop shadow</li>
                    <li>Natural shadow </li>
                    <li>Reflection shadow </li>
                    <li>Cast shadow </li>
                </ul>
            </div>
           
          </div>
        </section>

        {/* Final Full Image */}
        <section className="relative w-full h-[800px] overflow-hidden">
          <div className="absolute inset-0 bg-gray-100">
            <img
              src={images[6]}
              alt="Final Fullscreen"
              className="absolute top-0 left-0 w-full h-full object-cover parallax-img will-change-transform"
              loading="lazy"
            />
          </div>
        </section>


      </div>
         <section className="w-full h-full px-4 py-10 mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-20">
                {/* Left Column */}
                <div className="flex flex-col space-y-2">
                  <h1 className="text-[40px] md:text-[60px] lg:text-[80px] title font-extrabold text-left">
                    FAQ
                  </h1>
      
                  {loading && (
                    <p className="text-center mt-6 opacity-70">Loading FAQs…</p>
                  )}
      
                  {!loading && errorMsg && (
                    <p className="text-center mt-3 text-sm opacity-60">{errorMsg}</p>
                  )}
                  <div className="mt-16 w-full mx-auto divide-y divide-black dark:divide-white/10">
                    {!loading && !errorMsg && faqs.length > 0 && <FAQ faqs={faqs} />}
                  </div>
                </div>
      
                {/* Right Column */}
                <div className="flex flex-col space-y-2">
                   <h1 className="text-[40px] md:text-[60px] lg:text-[80px] title font-extrabold text-left">
                    CONTACT US
                  </h1>
                  <ContactForm />
                </div>
              </div>
            </section>
      <FooterGrid />
    </>
  );
}