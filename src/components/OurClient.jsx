import React from "react";

const OurClient = () => {
  // Put client images in an array so you can map them easily
  const clients = [
    "/images/logo/Holosnap-Logo_H_Color.png",
   
    "/images/logo/Holosnap-Logo_H_Color.png",
    
    "/images/logo/Holosnap-Logo_H_Color.png",
   
    "/images/logo/Holosnap-Logo_H_Color.png",
   
   
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
          animation: slide 10s linear infinite;
        }
        
        .animate-slide:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      <div className="overflow-hidden py-10 ">
        <h1 className='text-[40px] md:text-[50px] xl:text-[60px] text-left title font-semibold leading-[100%]'>Our Clients</h1>

        <div className="relative w-full lg:py-20">
          <div className="flex animate-slide gap-5 lg:gap-20 pt-20 ">
            {loopImages.map((src, i) => (
              <div key={i} className="flex justify-center items-center w-[200px] lg:w-[400px] h-auto">
                <img
                  src={src}
                  alt={`Client ${(i % clients.length) + 1}`}
                  className="max-w-[200px] h-auto object-contain "
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