'use client';
import Footer from "@/components/Footer";
import React, { useEffect, useRef } from "react";

const MediaGrid = () => {
  const gridRef = useRef(null);

  useEffect(() => {
    // Import GSAP from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    script.onload = () => {
      const { gsap } = window;
      
      // Animate grid items on load
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

  // Exact layout structure with unique sizes for images, same for videos
  const gridItems = [
    // Row 1: image | image | blank | image
    { 
      id: 1, 
      type: 'image', 
      src: '/images/image-37.webp', 
      alt: 'Clipping Path', 
      title: 'Clipping Path',
      sizeClass: 'tall-image' // Unique size
    },
    { 
      id: 2, 
      type: 'image', 
      src: '/images/image-38.webp', 
      alt: 'Multipath', 
      title: 'Multipath',
      sizeClass: 'wide-image' // Unique size
    },
    null, // blank
    { 
      id: 4, 
      type: 'image', 
      src: '/images/image-39.webp', 
      alt: 'Masking', 
      title: 'Masking',
      sizeClass: 'square-large' // Unique size
    },
    
    // Row 2: blank | video | video | blank
    null, // blank
    { 
      id: 6, 
      type: 'video', 
      src: '/video1.mp4', 
      title: 'Demo Video 1',
      sizeClass: 'video-standard' // Same as other video
    },
    { 
      id: 7, 
      type: 'video', 
      src: '/video2.mp4', 
      title: 'Demo Video 2',
      sizeClass: 'video-standard' // Same as other video
    },
    null, // blank
    
    // Row 3: image | blank | image | image
    { 
      id: 9, 
      type: 'image', 
      src: '/images/image-40.webp', 
      alt: 'Invisible Mannequin', 
      title: 'Invisible Mannequin',
      sizeClass: 'square-small' // Unique size
    },
    null, // blank
    { 
      id: 11, 
      type: 'image', 
      src: '/images/image-41.webp', 
      alt: 'Retouch', 
      title: 'Retouch',
      sizeClass: 'extra-tall' // Unique size
    },
    { 
      id: 12, 
      type: 'image', 
      src: '/images/image-42.webp', 
      alt: 'More Work', 
      title: 'More Work',
      sizeClass: 'rectangle' // Unique size
    },
    
    // Row 4: blank | image | blank | image
    null, // blank
    { 
      id: 14, 
      type: 'image', 
      src: '/images/image-43.webp', 
      alt: 'Fine Tune', 
      title: 'Fine Tune',
      sizeClass: 'tall-thin' // Unique size
    },
    null, // blank
    { 
      id: 16, 
      type: 'image', 
      src: '/images/image-44.webp', 
      alt: 'Final Touch', 
      title: 'Final Touch',
      sizeClass: 'square-medium' // Unique size
    },
    
    // Row 5: blank | blank | image | blank
    null, // blank
    null, // blank
    { 
      id: 19, 
      type: 'image', 
      src: '/images/image-45.webp', 
      alt: 'Portfolio', 
      title: 'Portfolio',
      sizeClass: 'wide-short' // Unique size
    },
    null // blank
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
        return `${baseClasses} h-56 sm:h-80 md:h-28 lg:h-[240px] rounded-lg`; // Same size for both videos
      case 'square-small':
        return `${baseClasses} h-56 sm:h-80 md:h-24 lg:h-[300px] lg:w-[300px] rounded-lg`;
      case 'extra-tall':
        return `${baseClasses} h-56 sm:h-80 md:h-52 lg:h-[500px] lg:w-[500px] lg:-ml-24 rounded-2xl`;
      case 'rectangle':
        return `${baseClasses} h-56 sm:h-80 md:h-28 lg:h-[300px] lg:w-[300px] rounded-xl`;
      case 'tall-thin':
        return `${baseClasses} h-56 sm:h-80 md:h-32 lg:h-[340px] rounded-2xl`;
      case 'square-medium':
        return `${baseClasses} h-56 sm:h-80 md:h-30 lg:h-34 rounded-xl`;
      case 'wide-short':
        return `${baseClasses} h-56 sm:h-80 md:h-26 lg:h-30 rounded-lg`;
      default:
        return `${baseClasses} h-56 sm:h-80 md:h-28 lg:h-32 rounded-lg`;
    }
  };

  





  return (
    <div className="min-h-screen bg-white dark:bg-black p-4 md:p-6 lg:p-8">
        <h1 className="text-[120px] uppercase text-center py-12">Image & Video Services</h1>
      {/* Fixed 4x5 grid maintaining exact layout */}
      <div 
        ref={gridRef}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6  mx-auto"
        style={{
          gridTemplateRows: 'repeat(5, minmax(0, 1fr))'
        }}
      >
        {gridItems.map((item, index) => {
          if (!item) {
            // Blank cell - return empty div to maintain grid structure
            return <div key={`blank-${index}`} className=""></div>;
          }

          return (
            <div
              key={item.id}
              className="grid-item flex flex-col"
            >
              <div className={getSizeClasses(item.sizeClass)}>
                {item.type === 'image' ? (
                  <img
                    src={item.src}
                    alt={item.alt}
                    className={`w-full h-full object-cover transition-transform duration-500 `}
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
              
              {/* Title always visible below media */}
              <div className="mt-2 sm:mt-3">
                <h3 className={`text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-center leading-tight`}>
                  {item.title}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
      <div className="h-[1px] bg-gray-800 my-10">

      </div>
      
      <Footer/>
    </div>
  );
};

export default MediaGrid;