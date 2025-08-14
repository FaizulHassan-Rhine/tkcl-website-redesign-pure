'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FooterGrid from '@/components/FooterNew';
import slugify from '@/lib/slugify';

gsap.registerPlugin(ScrollTrigger);

export default function ImageEditingGridPage() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch('/data.json', { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (mounted) setServices(json || []);
      } catch (err) {
        setError('Failed to load services.');
      } finally {
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const imagesEls = gsap.utils.toArray('.zoom-image');
    imagesEls.forEach((img) => {
         gsap.fromTo(
           img,
           { scale: 1, y: 0 },
           {
             scale: 1,
             y: 0,
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
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [services]);

  return (
    <>
      <section ref={sectionRef} className="mx-auto px-4 md:px-6 py-20">
        <div className="mb-8 md:mb-12 text-center">
          <h2 className="text-[100px] title font-semibold tracking-tight">Image Editing Services</h2>
          {loading && <p className="opacity-70 mt-2">Loading…</p>}
          {!loading && error && <p className="opacity-70 mt-2">{error}</p>}
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-20 max-w-8xl mx-auto">
          {!loading && !error && services.map((svc, idx) => {
            const slug = svc.slug || slugify(svc.title || svc.alt || `service-${idx+1}`);
            const href = `/image-editing-service/${slug}`;
            return (
             <div className='flex flex-col'>
              <figure key={svc.id || slug} className="flex flex-col relative overflow-hidden shadow-xl rounded group">
                <Link href={href} aria-label={svc.alt || svc.title || `Service ${idx + 1}`} className="block">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={svc.hero || svc.src}
                      alt={svc.alt || svc.title || `Grid image ${idx + 1}`}
                      loading="lazy"
                      className=" w-full h-full object-cover will-change-transform select-none transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </Link>
                
              </figure>
              <figcaption className="mt-4 text-left text-[32px] font-semibold sub-title">
                  <Link href={href} className="hover:underline">{svc.title || svc.alt || `Service ${idx + 1}`}</Link>
                </figcaption>
             
             </div>
            );
          })}
        </div>
      </section>
      <FooterGrid />
    </>
  );
}
