import React from "react";

const OurClient = () => {
  // Put client images in an array so you can map them easily
  const clients = [
    "/images/client/client-1.webp",
    "/images/client/client-2.webp",
    "/images/client/client-3.webp",
    "/images/client/client-4.webp",
    "/images/client/client-5.webp",
  ];

  // Duplicate the list so it loops seamlessly
  const loopImages = [...clients, ...clients];

  return (
    <div className="overflow-hidden py-10">
      <h1 className="text-[40px] sm:text-[60px] md:text-[80px] lg:text-[128px] title font-bold text-center mb-8">
        Our Clients
      </h1>

      <div className="relative w-full lg:py-20">
        <div className="flex animate-slide gap-5 lg:gap-20">
          {loopImages.map((src, i) => (
            <div key={i} className="flex-shrink-0">
              <img
                src={src}
                alt={`Client ${i + 1}`}
                className="w-20 lg:w-60 h-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurClient;
