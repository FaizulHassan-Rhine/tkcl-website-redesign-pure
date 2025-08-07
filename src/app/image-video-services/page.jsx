'use client';
import Footer from "@/components/Footer";
import React, { useEffect, useRef } from "react";

const MediaGrid = () => {
  const gridRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    script.onload = () => {
      const { gsap } = window;

      gsap.fromTo('.grid-item',
        {
          scale: 0,
          opacity: 0,
          rotation: 5
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.1
        }
      );
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const gridItems = [
    // Row 1: image | image | blank | image
    {
      id: 1,
      type: 'image',
      src: '/images/image-37.webp',
      alt: 'Clipping Path',
      title: 'Clipping Path',
      sizeClass: 'tall-image'
    },
    {
      id: 2,
      type: 'image',
      src: '/images/image-38.webp',
      alt: 'Multipath',
      title: 'Multipath',
      sizeClass: 'wide-image'
    },
    null,
    {
      id: 4,
      type: 'image',
      src: '/images/image-39.webp',
      alt: 'Masking',
      title: 'Masking',
      sizeClass: 'square-large'
    },

    // Row 2: video | video (both span 2 columns on large screens)
  {
  id: 6,
  type: 'video',
  src: '/video1.mp4',
  title: 'Demo Video 1',
  sizeClass: 'video-standard',
  spanTwo: true // will now be col-span-4
},
{
  id: 7,
  type: 'video',
  src: '/video2.mp4',
  title: 'Demo Video 2',
  sizeClass: 'video-standard',
  spanTwo: true // will now be col-span-4
},

    // Row 3: image | blank | image | image
    {
      id: 9,
      type: 'image',
      src: '/images/image-40.webp',
      alt: 'Invisible Mannequin',
      title: 'Invisible Mannequin',
      sizeClass: 'square-small'
    },
    null,
    {
      id: 11,
      type: 'image',
      src: '/images/image-41.webp',
      alt: 'Retouch',
      title: 'Retouch',
      sizeClass: 'extra-tall'
    },
    {
      id: 12,
      type: 'image',
      src: '/images/image-42.webp',
      alt: 'More Work',
      title: 'More Work',
      sizeClass: 'rectangle'
    },

    // Row 4: blank | image | blank | image
    null,
    {
      id: 14,
      type: 'image',
      src: '/images/image-43.webp',
      alt: 'Fine Tune',
      title: 'Fine Tune',
      sizeClass: 'tall-thin'
    },
    null,
    {
      id: 16,
      type: 'image',
      src: '/images/image-44.webp',
      alt: 'Final Touch',
      title: 'Final Touch',
      sizeClass: 'square-medium'
    },

    // Row 5: blank | blank | image | blank
    null,
    null,
    {
      id: 19,
      type: 'image',
      src: '/images/image-45.webp',
      alt: 'Portfolio',
      title: 'Portfolio',
      sizeClass: 'wide-short'
    },
    null
  ];

  const getSizeClasses = (sizeClass) => {
    const baseClasses = "relative overflow-hidden rounded-lg group transition-all duration-500";

    switch (sizeClass) {
      case 'tall-image':
        return `${baseClasses} h-56 sm:h-80 md:h-48 lg:h-56 rounded-2xl`;
      case 'wide-image':
        return `${baseClasses} h-56 sm:h-80 md:h-32 lg:h-[400px] lg:w-[500px] rounded-xl`;
      case 'square-large':
        return `${baseClasses} h-56 sm:h-80 md:h-44 lg:h-52 rounded-3xl`;
     case 'video-standard':
  return `${baseClasses} w-full h-56 sm:h-80 md:h-64 lg:h-[400px] rounded-lg`;
      case 'square-small':
        return `${baseClasses} h-56 sm:h-80 md:h-24 lg:h-[300px] lg:w-[300px] rounded-lg`;
      case 'extra-tall':
        return `${baseClasses} h-56 sm:h-80 md:h-52 lg:h-[400px] lg:w-[500px] lg:-ml-24 rounded-2xl`;
      case 'rectangle':
        return `${baseClasses} h-56 sm:h-80 md:h-28 lg:h-[300px] lg:w-[300px] rounded-xl`;
      case 'tall-thin':
        return `${baseClasses} h-56 sm:h-80 md:h-32 lg:h-[450px] lg:w-[500px] rounded-2xl`;
      case 'square-medium':
        return `${baseClasses} h-56 sm:h-80 md:h-30 lg:h-34 rounded-xl`;
      case 'wide-short':
        return `${baseClasses} h-56 sm:h-80 md:h-26 lg:h-30 rounded-lg`;
      default:
        return `${baseClasses} h-56 sm:h-80 md:h-28 lg:h-32 rounded-lg`;
    }
  };

  return (
    <div className=" bg-white dark:bg-black p-4 md:p-6 lg:p-8 py-20 ">
      <h1 className="text-[40px] sm:text-[60px] md:text-[80px] lg:text-[200px] title uppercase text-center py-4 lg:py-12">Image & Video Services</h1>

      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 mx-auto"
        style={{ gridTemplateRows: 'repeat(5, minmax(0, 1fr))' }}
      >
        {gridItems.map((item, index) => {
          if (!item) {
            return <div key={`blank-${index}`} className="hidden sm:block"></div>;
          }

          return (
            <div
              key={item.id}
             className={`grid-item flex flex-col ${item.spanTwo ? 'lg:col-span-2' : ''}`}

            >
              <div className={getSizeClasses(item.sizeClass)}>
                {item.type === 'image' ? (
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-500"
                  />
                ) : (
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/a3ICNMQW7Ok?autoplay=1&mute=1&loop=1&playlist=a3ICNMQW7Ok&controls=0&modestbranding=1&showinfo=0&disablekb=1&rel=0&start=0"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    style={{ pointerEvents: 'none' }}
                  />
                )}
              </div>

              <div className="mt-2 sm:mt-3">
                <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-center leading-tight">
                  {item.title}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className="h-[1px] bg-gray-800 my-10"></div>

      <Footer />
    </div>
  );
};

export default MediaGrid;
