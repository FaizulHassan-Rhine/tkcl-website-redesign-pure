
import React, { useState } from "react";


const GhostMannequinOld = () => {
     const [activeGMDivSection, setActiveGMDivSection] = useState(1); // Default to the first div
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
      <div className="">
        <div className="bg-white rounded-xl">
          <div className="flex flex-col items-center  p-8">
            {/* Toggle Buttons */}
           

            {/* Div Sections */}
            <div className="w-full pt-8 ">
              {activeGMDivSection === 1 && (
                <div className="flex justify-center items-center gap-10 lg:gap-[160px]">
                  <div>
                    <img className="w-full  h-[200px]  sm:h-[600px]" src="./img/2D-Microsite/images/gm11B.webp"/>
                  </div>
                  <div>
                    <img className="w-full  h-[200px] sm:h-[600px]"  src="./img/2D-Microsite/images/gm11A.webp"/>
                  </div>
                </div>
              )}
              {activeGMDivSection === 2 && (
                <div className="flex justify-center items-center  lg:gap-[160px]">
                <div>
                  <img className="w-full h-[200px] sm:h-[600px]"  src="./img/2D-Microsite/images/gm22B.webp"/>
                </div>
                <div>
                  <img className="w-full h-[200px] sm:h-[600px]"  src="./img/2D-Microsite/images/gm22A.webp"/>
                </div>
              </div>
              )}
              {activeGMDivSection === 3 && (
                <div className="flex justify-center items-center gap-10 lg:gap-[160px]">
                <div>
                  <img className="w-full  h-[200px] sm:h-[600px]"  src="./img/2D-Microsite/images/gm33B.webp"/>
                </div>
                <div>
                  <img className="w-full  h-[200px] sm:h-[600px]"  src="./img/2D-Microsite/images/gm33A.webp"/>
                </div>
              </div>
              )}
            </div>
          </div>

         
          
        </div>
        <div className="flex justify-center items-center gap-[18px]  px-6  my-[36px]">
              <button
                className={` rounded-2xl   ${
                    activeGMDivSection === 1
                    ? "  bg-[#15803D] h-[6px] w-[40px]"
                    : " bg-[#9EA1A1] h-[6px] w-[20px]"
                }`}
                onClick={() => setActiveGMDivSection(1)}
              >
                
              </button>
              <button
               className={` rounded-2xl   ${
                activeGMDivSection === 2
                ? "  bg-[#15803D] h-[6px] w-[40px]"
                : " bg-[#9EA1A1] h-[6px] w-[20px]"
            }`}
                onClick={() => setActiveGMDivSection(2)}
              >
                
              </button>
              <button
               className={` rounded-2xl   ${
                activeGMDivSection === 3
                ? "  bg-[#15803D] h-[6px] w-[40px]"
                : " bg-[#9EA1A1] h-[6px] w-[20px]"
            }`}
                onClick={() => setActiveGMDivSection(3)}
              >
               
              </button>
            </div>
      </div>
    </div>
  );
};

export default GhostMannequinOld;
