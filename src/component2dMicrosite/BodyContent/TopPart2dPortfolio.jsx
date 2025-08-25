import React from "react";

const TopPart2dPortfolio = () => {
  return (
    <div className="container mx-auto ">
      <div className="bg-white py-8 px-9 rounded-xl">
        <div className="flex flex-col gap-[100px] lg:gap-[220px] 2xl:gap-[300px]">
          <div>
            <div className="text-left text-[48px] md:text-[50px] lg:text-[100px] 2xl:text-[160px] text-[#737373] leading-[52px] lg:leading-[100px] 2xl:leading-[176px] font-bold">
              <h1>2D Services</h1>
              <h1>Portfolio</h1>
            </div>
            <div className="flex flex-col items-start gap-5 md:gap-10 pt-5">
              <h1 className="text-[12px] md:text-[20px] 2xl:text-[36px] font-bold leading-[111%] text-[#155331]">
                Industry-Leading Image Editing for Unparalleled Brand Impact
              </h1>
              <a
                href="/2D_Portfolio.pdf"
                target="_blank"
              >
                
                <button className="bg-[#1E1E1E] hover:bg-[#FFFED3] text-white hover:text-black py-2  md:px-4 w-[134px] h-[36px] md:w-[280px] md:h-[64px] font-medium  md:font-semibold text-[12px] md:text-[24px] rounded-lg md:rounded-xl border-[2px] border-black">
                  Explore Full Portfolio
                </button>
              </a>
            </div>
          </div>

          <div className="text-[16px] md:text-2xl lg:text-4xl 2xl:text-5xl text-right font-bold text-[#737373]">
            <p>Offered by The KOW Company Ltd.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPart2dPortfolio;
