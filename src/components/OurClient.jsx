import React from "react";

const OurClient = () => {
  // Put client images in an array so you can map them easily
  const clients = [
    "https://via.placeholder.com/240x120/4F46E5/FFFFFF?text=Client+1",
    "https://via.placeholder.com/240x120/7C3AED/FFFFFF?text=Client+2", 
    "https://via.placeholder.com/240x120/EC4899/FFFFFF?text=Client+3",
    "https://via.placeholder.com/240x120/F59E0B/FFFFFF?text=Client+4",
    "https://via.placeholder.com/240x120/10B981/FFFFFF?text=Client+5",
  ];

  // Duplicate the list so it loops seamlessly
  const loopImages = [...clients, ...clients];

  return (
    <>
      <style jsx>{`
        @keyframes slide {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        
        .animate-slide {
          animation: slide 20s linear infinite;
        }
        
        .animate-slide:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      <div className="overflow-hidden py-10 ">
        <h1 className='text-[60px] text-left title font-semibold leading-[100%]'>Our Clients</h1>

        <div className="relative w-full lg:py-20">
          <div className="flex animate-slide gap-5 lg:gap-20 whitespace-nowrap">
            {loopImages.map((src, i) => (
              <div key={i} className="flex-shrink-0">
                <img
                  src={src}
                  alt={`Client ${(i % clients.length) + 1}`}
                  className="w-20 lg:w-60 h-auto object-contain "
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default OurClient;