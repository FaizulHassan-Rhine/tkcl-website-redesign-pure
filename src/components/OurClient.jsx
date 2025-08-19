import React from "react";

const OurClient = () => {
  // Put client images in an array so you can map them easily
  const clients = [
    
    "/images/logo/3. Nureg.png",
    "/images/logo/7. Mother Denim.png",
    "/images/logo/6. LJG.png",
    "/images/logo/8. Laudert.png",
    "/images/logo/2. ICS.png",
    "/images/logo/4. Spice media.png",
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
      
      <div className="container mx-auto">

        <div className="overflow-hidden py-10 ">
        <h1 className='text-[40px] md:text-[50px] xl:text-[60px] text-left title font-semibold leading-[100%]'>Our Clients</h1>

        <div className="relative w-full lg:py-20">
          <div className="flex animate-slide gap-8 lg:gap-16 pt-20">
            {loopImages.map((src, i) => (
              <div key={i} className="flex justify-center items-center w-[200px] lg:w-[300px] h-auto flex-shrink-0">
                <img
                  src={src}
                  alt={`Client ${(i % clients.length) + 1}`}
                  className="max-w-[200px] h-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default OurClient;