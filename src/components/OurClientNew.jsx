import React from "react";

const OurClientNew = () => {
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

  return (
    <>
      <style jsx>{`
        @font-face {
          font-family: 'Tartuffo';
          src: url('/fonts/Tartuffo_Trial-MediumItalic.otf') format('opentype');
          font-weight: 700;
          font-style: italic;
        }
        .font-tartuffo-bold-italic {
          font-family: 'Tartuffo', serif;
          font-weight: 700;
          font-style: italic;
        }
      `}</style>

      <div className="container mx-auto h-screen ">
        <h1 className="text-[40px] md:text-[50px] title py-20 xl:text-[60px] text-center font-tartuffo-bold-italic leading-[100%]">
          Our Clients
        </h1>

        <div className="grid grid-cols-2 justify-items-center sm:grid-cols-3 lg:grid-cols-4 gap-10 mt-16 px-4 sm:px-8">
          {clients.map((src, i) => (
            <div
              key={i}
              className="flex justify-center items-center w-[100px] md:w-[200px] h-[120px]"
            >
              <img
                src={src}
                alt={`Client ${(i + 1)}`}
                className="max-h-full max-w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OurClientNew;
