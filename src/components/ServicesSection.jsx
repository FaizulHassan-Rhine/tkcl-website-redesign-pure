'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: '01',
    title: 'Image Editing',
    services: [
      'Background Removal',
      'Ghost Mannequine',
      'Color Correction',
      'Masing & Clipping',
      'Photo Retouch',
    ],
    image: '/images/image-7.webp',
  },
  {
    number: '02',
    title: '3D Modelling',
    services: [
      'Cosmetics',
      'Tech Accessories',
      'Packaging',
      'Furniture',
      'Interior/Exterior Design',
    ],
    image: '/images/image-8.webp',
  },
  {
    number: '02',
    title: '3D Modelling',
    services: [
      'Cosmetics',
      'Tech Accessories',
      'Packaging',
      'Furniture',
      'Interior/Exterior Design',
    ],
    image: '/images/image-9.webp',
  },
  {
    number: '02',
    title: '3D Modelling',
    services: [
      'Cosmetics',
      'Tech Accessories',
      'Packaging',
      'Furniture',
      'Interior/Exterior Design',
    ],
    image: '/images/image-10.webp',
  },
  
];

export default function ServicesSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    const items = gsap.utils.toArray('.service-item');

    items.forEach((item) => {
      const image = item.querySelector('.service-image');

      gsap.fromTo(
        image,
        { x: 200, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 75%',
            end: 'bottom 25%',
            scrub: true,
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    });
  }, []);

  return (
    <div ref={containerRef} className=" space-y-24 py-16">
        <div className='leading-[400%] '>
            <h1 className='text-[60px] font-semibold '>Services </h1>
        <h1 className='text-[60px] font-semibold '>At A Glance</h1>

        </div>
        <div className='h-[1px] '></div>
      {services.map((s, index) => (
        <div
          key={index}
          className="service-item flex flex-col border-b-[1px] border-gray-800 py-10 md:flex-row items-start justify-between gap-8 px-6 md:px-24"
        >
          <div className="w-full md:w-1/2 space-y-2">
            <p className="text-lg ">({s.number})</p>
            <h2 className="text-3xl font-semibold">{s.title}</h2>
            <ul className="list-none mt-2 space-y-1">
              {s.services.map((service, i) => (
                <li key={i} className="">
                  {service}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-1/2 flex justify-end">
            <img
              src={s.image}
              alt={s.title}
              className="service-image w-[500px] h-[300px] object-cover rounded-lg opacity-0 translate-x-10"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
