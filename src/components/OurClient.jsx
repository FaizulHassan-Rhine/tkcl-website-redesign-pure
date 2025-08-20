import React from "react";

const OurClient = () => {
  const clients = [
    "/images/logo/11. belk.png",
    "/images/logo/12. Tommy.png",
    "/images/logo/17. Gap.png",
    "/images/logo/13. Arcteryx.png",
    "/images/logo/14. Sanmar.png",
    "/images/logo/15. Beyond Yoga.png",
    "/images/logo/16. Cart.png",
    "/images/logo/3. Nureg.png",
    "/images/logo/7. Mother Denim.png",
    "/images/logo/6. LJG.png",
    "/images/logo/8. Laudert.png",
    "/images/logo/2. ICS.png",
    "/images/logo/4. Spice media.avif",
  ];

  // Duplicate the list for seamless looping
  const loopImages = [...clients, ...clients];

  return (
    <>
      <style jsx>{`
        @font-face {
          font-family: 'Tartuffo';
          src: url('/fonts/Tartuffo_Trial-MediumItalic.otf') format('opentype');
          font-weight: 700;
          font-style: italic;
        }

        .slider-container {
          overflow: hidden;
          position: relative;
          width: 100%;
        }

        .slider-track {
          display: flex;
          width: max-content;
          animation: scroll 30s linear infinite;
        }

        .slider-track:hover {
          animation-play-state: paused;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .font-tartuffo-bold-italic {
          font-family: 'Tartuffo', serif;
          font-weight: 700;
          font-style: italic;
        }
      `}</style>

      <div className="container mx-auto h-screen">
        <div className="overflow-hidden pt-[200px] ">
          <h1 className="text-[40px] md:text-[50px] xl:text-[60px] text-center title 2xl:pb-40 font-tartuffo-bold-italic leading-[100%]">
            Our Clients
          </h1>

          <div className="slider-container mt-20">
            <div className="slider-track gap-8 lg:gap-16">
              {loopImages.map((src, i) => (
                <div
                  key={i}
                  className="flex justify-center items-center w-[200px] 2xl:w-[300px] h-auto flex-shrink-0"
                >
                  <img
                    src={src}
                    alt={`Client ${(i % clients.length) + 1}`}
                    className="w-full h-auto object-contain"
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
