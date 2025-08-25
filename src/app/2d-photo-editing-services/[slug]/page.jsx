'use client';

// ...keep your imports
import React, { useEffect, useMemo, useState, useRef } from 'react';
// (rest of your imports unchanged)

import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import FooterGrid from '@/components/FooterNew';
import ContactForm from '@/components/ContactForm';
import FAQ from '@/components/Faq';
import MoreServices from '@/components/MoreServices';
import { useParams, notFound } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true, lerp: 0.1, duration: 1.2 });
    let id;
    const raf = (t) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis?.destroy?.(); };
  }, []);
}




export default function ServiceDetailsPage() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [faqLoading, setFaqLoading] = useState(false);
  const [error, setError] = useState('');
  // IMPORTANT: Next.js only inlines env vars with direct property access.
  // Do NOT access via dynamic key like process.env[service.faqApi.env] on the client.
  const API_KEY = process.env.NEXT_PUBLIC_API_SECRET_KEY;

  useLenis();

  // Load service by slug
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch('/data.json', { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const services = await res.json();
        const match = (services || []).find((s) => s.slug === slug);
        if (!match) {
          if (mounted) setError('Service not found');
          return;
        }
        if (mounted) setService(match);
      } catch (e) {
        setError('Failed to load service.');
      } finally {
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [slug]);

  // GSAP parallax/refresh once service is present
  useEffect(() => {
    if (!service) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.parallax-img').forEach((img) => {
        gsap.fromTo(img, { y: '-20%', scale: 1.05 }, {
          y: '20%', scale: 1, ease: 'none',
          scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 }
        });
      });
      ScrollTrigger.refresh();
    });
    return () => { ctx.revert(); ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, [service]);

  // Load FAQs optionally from API defined in JSON (keeps your existing backend)
  useEffect(() => {
    if (!service || !service.faqApi) return;
    const loadFaqs = async () => {
      try {
        setFaqLoading(true);
        const headers = { Accept: 'application/json' };
        if (service.faqApi?.headerKey && API_KEY) {
          headers[service.faqApi.headerKey] = API_KEY;
        }
        const res = await fetch(service.faqApi.url, { headers });
        if (!res.ok) throw new Error('FAQ HTTP ' + res.status);
        const data = await res.json();
        setFaqs(data);
      } catch (e) {
        // Silently ignore but render fallback (no FAQs)
      } finally {
        setFaqLoading(false);
      }
    };
    loadFaqs();
  }, [service]);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <h1 className="title text-3xl">Loading…</h1>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="py-24 text-center">
        <h1 className="title text-3xl">{error || 'Not found'}</h1>
      </div>
    );
  }

  const { title, intro, hero, sections, pairs = [], gallery = [] } = service;

  return (
    <>
      <div className='container mx-auto'>
        <div className=" py-20 overflow-x-hidden">
        {/* Title */}
        <section className="w-full border-gray-200 border-2 rounded py-10 px-6 text-left flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
          <h1 className="text-4xl lg:text-[80px] title font-bold">{title}</h1>
          <div className="w-full lg:w-[40%] max-w-xl">
            <p className="text-body text-[20px]">{intro?.long || intro?.summary}</p>
          </div>
        </section>

        {/* Fullscreen Hero */}
        {hero && (
          <section className="relative w-full h-[800px] overflow-hidden mb-5">
            <div className="absolute inset-0 bg-gray-100">
              <img src={hero} alt={`${title} hero`} className="absolute top-0 left-0 w-full h-full object-cover parallax-img will-change-transform" loading="lazy" />
            </div>
          </section>
        )}

        {/* Why section */}
        {(sections?.whyTitle || sections?.whyBody) && (
          <section className="w-full border-gray-200 border-2 rounded py-16 flex justify-center mb-5 px-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-10 w-full">
              <h3 className="sub-title text-[42px] md:text-[50px] leading-tight font-semibold max-w-[520px]">{sections?.whyTitle}</h3>
              <p className="text-body md:w-[50%] text-[20px]">{sections?.whyBody}</p>
            </div>
          </section>
        )}

        {/* 2-up images (if at least 2 gallery images) */}
        {gallery?.length >= 2 && (
          <section className="w-full flex flex-col md:flex-row gap-5 h-[70vh] mb-5 px-6 md:px-8">
            <div className="w-full md:w-[70%] relative overflow-hidden h-[50vh] md:h-full rounded-2xl">
              <div className="absolute inset-0 bg-gray-100">
                <img src={gallery[0]} alt="Wide" className="absolute inset-0 w-full h-full object-cover parallax-img will-change-transform" loading="lazy" />
              </div>
            </div>
            <div className="w-full md:w-[30%] relative overflow-hidden h-[50vh] md:h-full rounded-2xl">
              <div className="absolute inset-0 bg-gray-100">
                <img src={gallery[1]} alt="Narrow" className="absolute inset-0 w-full h-full object-cover parallax-img will-change-transform" loading="lazy" />
              </div>
            </div>
          </section>
        )}

        {/* Full image (if 3rd gallery image exists) */}
        {gallery?.[2] && (
          <section className="relative w-full h-[90vh] overflow-hidden mb-5">
            <div className="absolute inset-0 bg-gray-100">
              <img src={gallery[2]} alt="Full width" className="absolute inset-0 w-full h-full object-cover parallax-img will-change-transform" loading="lazy" />
            </div>
          </section>
        )}

        {/* Triptych Before/After */}
       {pairs?.length > 0 && (
            <section className="w-full px-6 mb-10">
              <BeforeAfterCarousel pairs={pairs} title={title} />
            </section>
          )}

        {/* Two columns lists */}
        {(sections?.whereList?.length || sections?.stylesList?.length) && (
          <section className="w-full border-gray-200 border-2 rounded py-16 px-6 flex justify-center mb-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
              <div className="hidden md:block" />
              {sections?.whereList?.length > 0 && (
                <div className='w-full'>
                  <h2 className='text-[32px] md:text-[40px] font-semibold sub-title'>{sections.whereTitle}</h2>
                  <ul className='list-disc pl-5 text-body text-[18px] md:text-[20px]'>
                    {sections.whereList.map((li, i) => (<li key={`where-${i}`}>{li}</li>))}
                  </ul>
                </div>
              )}
              {sections?.stylesList?.length > 0 && (
                <div className='w-full'>
                  <h2 className='text-[32px] md:text-[40px] font-semibold sub-title'>{sections.stylesTitle}</h2>
                  <ul className='list-disc pl-5 text-body text-[18px] md:text-[20px]'>
                    {sections.stylesList.map((li, i) => (<li key={`style-${i}`}>{li}</li>))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Final Full Image (fallback to first gallery if no dedicated final) */}
        {(gallery?.[3] || hero) && (
          <section className="relative w-full h-[800px] overflow-hidden">
            <div className="absolute inset-0 bg-gray-100">
              <img src={gallery?.[3] || hero} alt="Final Fullscreen" className="absolute top-0 left-0 w-full h-full object-cover parallax-img will-change-transform" loading="lazy" />
            </div>
          </section>
        )}
      </div>

      {/* More Services Section */}
      <MoreServices 
        currentServiceId={service?.id}
        services={[
          {
            id: "shadow-addition",
            title: "Shadow Addition",
            slug: "shadow-addition",
            hero: "/images/Shadow-Addition/shadow-addition-8-after.webp",
            href: "/image-editing-service/shadow-addition",
            intro: {
              summary: "To make a product look realistic and add dimension, shadow work is imperative."
            }
          },
          {
            id: "background-replacement",
            title: "Background Replacement",
            slug: "background-replacement",
            hero: "/images/Background-Removal/background-removal-3-after.webp",
            href: "/image-editing-service/background-replacement",
            intro: {
              summary: "Swap busy or off-brand backgrounds with clean, on‑brand scenes."
            }
          },
          {
            id: "image-manipulation",
            title: "Image Manipulation",
            slug: "image-manipulation",
            hero: "/images/Image-Manipulation/image-manipulation-6-after.webp",
            href: "/image-editing-service/image-manipulation",
            intro: {
              summary: "Change or blend images to produce new images and create specific effects."
            }
          },
          {
            id: "ghost-mannequin",
            title: "Ghost Mannequin",
            slug: "ghost-mannequin",
          hero: "/images/Ghost-Mannequin/ghost-mannequin-4-after.webp",
            href: "/image-editing-service/ghost-mannequin",
            intro: {
              summary: "Remove mannequins while maintaining the form of garments."
            }
          },
          {
            id: "photo-recolor",
            title: "Photo Recolor",
            slug: "photo-recolor",
            hero: "/images/Photo-Recolor/photo-recolor-7-after.webp",
            href: "/image-editing-service/photo-recolor",
            intro: {
              summary: "Alter or scale colors in photos without compromising texture or detail."
            }
          },
          {
            id: "photo-masking",
            title: "Photo Masking",
            slug: "photo-masking",
            hero: "/images/Photo-Masking/photo-masking-9-after.webp",
            href: "/image-editing-service/photo-masking",
            intro: {
              summary: "Accurate selection and adjustment of delicate details like hair and fur."
            }
          },
          {
            id: "photo-retouch",
            title: "Photo Retouch",
            slug: "photo-retouch",
           hero: "/images/Photo-Retouch/photo-retouch-4-after.webp",
            href: "/image-editing-service/photo-retouch",
            intro: {
              summary: "Improve pictures by eliminating spots and adding detail naturally."
            }
          },
          {
            id: "color-correction",
            title: "Color Correction",
            slug: "color-correction",
            hero: "/images/Color-Correction/color-correction-4-after.webp",
            href: "/image-editing-service/color-correction",
            intro: {
              summary: "Alter tones, brightness, and saturation to fit desired style and brand colors."
            }
          }
        ]}
      />

      {/* FAQ + Contact */}
      <section className="w-full h-full px-4 py-10 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-40">
          <div className="flex flex-col space-y-2">
            <h2 className="text-[32px] md:text-[40px] lg:text-[60px] title font-bold text-left">FAQ</h2>
            {faqLoading && <p className="mt-6 opacity-70">Loading FAQs…</p>}
            <div className="mt-10 w-full mx-auto divide-y divide-black dark:divide-white/10">
              {!faqLoading && faqs?.length > 0 && <FAQ faqs={faqs} />}
              {!faqLoading && (!faqs || faqs.length === 0) && <p className="opacity-70">No FAQs available.</p>}
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <h2 className="text-[32px] md:text-[40px] lg:text-[60px] title font-bold text-left">CONTACT US</h2>
            <ContactForm />
          </div>
        </div>
      </section>
      </div>
      <FooterGrid />
    </>
  );
}


function BeforeAfterCarousel({ pairs, title }) {
  const slides = useMemo(() => pairs.slice(0, 3), [pairs]);
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onKey = (e) => {
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % slides.length);
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + slides.length) % slides.length);
    };
    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  }, [slides.length]);

  if (slides.length === 0) return null;

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="outline-none"
      aria-roledescription="carousel"
      aria-label={`${title} before/after carousel`}
    >
      <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden rounded-2xl">
        <BeforeAfterSlider
          beforeSrc={slides[index].before}
          afterSrc={slides[index].after}
          alt={`${title} Compare ${index + 1}`}
          initial={50}
        />
      </div>

      <div className="flex items-center justify-center gap-3 mt-6" role="tablist" aria-label="Choose slide">
        {slides.map((_, i) => {
          const active = i === index;
          return (
            <button
              key={`dot-${i}`}
              role="tab"
              aria-selected={active}
              onClick={() => setIndex(i)}
              className={[
                "h-3 w-3 rounded-full transition-all duration-200",
                active ? "w-6" : "w-3",
                active ? "bg-black dark:bg-white" : "bg-black/30 dark:bg-white/30",
              ].join(' ')}
              title={`Go to slide ${i + 1}`}
            />
          );
        })}
      </div>
    </div>

  );
}
