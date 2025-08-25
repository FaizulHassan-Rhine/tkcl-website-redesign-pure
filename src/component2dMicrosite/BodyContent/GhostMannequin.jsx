'use client'
import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

const GhostMannequin = () => {
  const [activeGMDivSection, setActiveGMDivSection] = useState(0);

  const sliderList = [
    {
      after: "./images/2D-Microsite/images/gm11A.webp",
      before: "./images/2D-Microsite/images/gm11B.webp",
    },
    {
      after: "./images/2D-Microsite/images/gm22A.webp",
      before: "./images/2D-Microsite/images/gm22B.webp",
      
    },
    {
      after: "./images/2D-Microsite/images/gm33A.webp",
      before: "./images/2D-Microsite/images/gm33B.webp",
    
    },
  ];

  return (
    <div id="mannequin" className="container mx-auto ">
      <div className="flex flex-col lg:flex-row justify-center items-center  bg-white rounded-lg border-2 border-[#155331]  mt-9 lg:mb-9  py-[23px]">
      <h1 className="lg:w-[440px] text-[22px] lg:text-[36px] font-bold leading-10 text-[#737373] ">
          Ghost Mannequin
        </h1>
        <p className="w-full lg:w-[730px] text-[16px] lg:text-[24px] text-center lg:text-left font-medium lg:leading-8 text-[#737373] px-2 lg:px-0 ">
          From seamless mannequin removal and sleeve preservation to flawless
          dust and scratch removal and wrinkle-free magic, we perfect every
          detail to showcase your products at their best.
        </p>
      </div>
      <h1 className="text-right text-[12px] lg:text-[20px] font-medium leading-9 pt-5 md:pt-2 pb-8 text-[#afacac] italic">
      *Slide to change
                </h1>

      {/* Image Carousel */}
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        interval={3000}
        transitionTime={1000}
        showArrows={false}
        stopOnHover={false}
        emulateTouch
        selectedItem={activeGMDivSection}
        onChange={(index) => setActiveGMDivSection(index)} // Sync active section with carousel
        className="carousel-container"
      >
        {sliderList.map((item, index) => (
          <div key={index} className="carousel-item flex flex-col mx-1  gap-2">
            <div className="flex justify-center items-center bg-white  gap-10 lg:gap-[160px] py-10 md:py-20 rounded-lg">
              <div>
                <img className="w-full h-[180px] sm:h-[600px]" src={item.before} alt="Before" />
              </div>
              <div>
                <img className="w-full h-[180px] sm:h-[600px]" src={item.after} alt="After" />
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Manual Control Buttons */}
      <div className="flex justify-center items-center gap-[18px] px-6 mb-9 mt-12">
        {sliderList.map((_, index) => (
          <button
            key={index}
            className={`rounded-2xl transition-all duration-300 ${
              activeGMDivSection === index
                ? "bg-[#15803D] h-[6px] w-[40px]"
                : "bg-[#9EA1A1] h-[6px] w-[20px]"
            }`}
            onClick={() => setActiveGMDivSection(index)}
          ></button>
        ))}
      </div>

      <div className='w-full pr-2 md:pr-0'>
            <a href='https://thekowcompany.com/2D_Portfolio.pdf' target='_blank' className="flex justify-end text-[12px] lg:text-[20px] font-medium leading-9 cursor-pointer underline ">
                    Download for more
                </a>
            </div>
    </div>
  );
};

export default GhostMannequin;
