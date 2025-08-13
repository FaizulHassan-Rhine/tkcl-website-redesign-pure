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
    title: 'Video Editing',
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
    number: '03',
    title: '3D Visualization',
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
    number: '04',
    title: 'AI Solutions',
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
    <div ref={containerRef} className="space-y-24 py-16">
      <div className='leading-[400%] '>
        <h1 className='text-[60px] title font-semibold'>Explore <br/> Our Creativity</h1>
        
      </div>
      <div className='h-[1px]'></div>
      
      {services.map((s, index) => (
        <div
          key={index}
          className="service-item grid grid-cols-1 md:grid-cols-3 border-b-[1px] border-[text-devider] py-10 gap-8 px-6 md:px-24"
        >
          {/* Column 1: Number */}
          <div className="flex items-start justify-start">
            <p className="text-6xl font-bold text-body">({s.number})</p>
          </div>
          
          {/* Column 2: Title and Services */}
          <div className="space-y-4">
            {/* <h2 className="text-3xl font-semibold">{s.title}</h2> */}
            <ul className="list-none space-y-2 text-2xl">
              {s.services.map((service, i) => (
                <li key={i} className="flex items-start text-body">
                  {/* <span className="inline-block w-2 h-2 bg-current rounded-full mt-2 mr-2"></span> */}
                  {service}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3: Image Card */}
          <div className="flex justify-end">
            <div
              className="service-image w-full max-w-[500px] h-[300px] bg-gray-100 object-cover rounded-lg opacity-0 translate-x-10"
            >
                <h1 className='flex items-center justify-center h-full text-[50px] sub-title'>{s.title}</h1>
              {/* Image would go here */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}