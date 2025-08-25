import React, { useState } from 'react';
import ImageTransition from './ImageTransition';

const AmbienceEnhance = () => {
    const [activeDivSection, setActiveDivSection] = useState(1); // Default to the first div

    return (
        <div id="ambience" className="container mx-auto">
            <div className="flex flex-col lg:flex-row justify-center items-center bg-white rounded-lg border-2 border-[#155331] mt-9 lg:mb-9 py-[23px]">
                <h1 className="lg:w-[440px] text-[22px] lg:text-[36px] font-bold leading-10 text-[#737373]">
                    Ambience Enhance
                </h1>
                <p className="w-full lg:w-[730px] text-[16px] lg:text-[24px] text-center lg:text-left font-medium lg:leading-8 text-[#737373] px-2 lg:px-0">
                    Through seamless background plate addition, soft shadow enhancement, and meticulous tag number and imperfection removal, we create an inviting atmosphere that enhances every detail beautifully.
                </p>
            </div>

            <h1 className="text-right text-[12px] lg:text-[20px]  font-medium leading-9 mt-5 md:pt-2 md:pb-4 text-[#afacac] italic">
                    *Press & Hold to compare
                </h1>

            <div>
                <div className="overflow-hidden relative w-full h-full pt-5">
                    {/* Slider Container */}
                    <div
                        className="flex transition-transform duration-1000 ease-in-out"
                        style={{ transform: `translateX(-${(activeDivSection - 1) * 100}%)` }}
                    >
                        {/* Slides with Before-After Images */}
                        <div className="flex-shrink-0 w-full h-full flex items-center justify-center">
                            <ImageTransition
                                afterimg="./images/2D-Microsite/images/test1.webp"
                                beforeimg="./images/2D-Microsite/images/test2.webp"
                            />
                        </div>
                        <div className="flex-shrink-0 w-full h-full flex items-center justify-center">
                            <ImageTransition
                                afterimg="./images/2D-Microsite/images/test3.webp"
                                beforeimg="./images/2D-Microsite/images/test4.webp"
                            />
                        </div>
                        <div className="flex-shrink-0 w-full h-full flex items-center justify-center">
                            <ImageTransition
                                afterimg="./images/2D-Microsite/images/test5.webp"
                                beforeimg="./images/2D-Microsite/images/test6.webp"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-center items-center gap-[18px] px-6 pt-10 pb-5">
                    <button
                        className={`rounded-2xl transition-all duration-300 ${
                            activeDivSection === 1
                                ? 'bg-[#15803D] h-[6px] w-[40px]'
                                : 'bg-[#9EA1A1] h-[6px] w-[20px]'
                        }`}
                        onClick={() => setActiveDivSection(1)}
                    ></button>
                    <button
                        className={`rounded-2xl transition-all duration-300 ${
                            activeDivSection === 2
                                ? 'bg-[#15803D] h-[6px] w-[40px]'
                                : 'bg-[#9EA1A1] h-[6px] w-[20px]'
                        }`}
                        onClick={() => setActiveDivSection(2)}
                    ></button>
                    <button
                        className={`rounded-2xl transition-all duration-300 ${
                            activeDivSection === 3
                                ? 'bg-[#15803D] h-[6px] w-[40px]'
                                : 'bg-[#9EA1A1] h-[6px] w-[20px]'
                        }`}
                        onClick={() => setActiveDivSection(3)}
                    ></button>
                </div>
               
            </div>

            <div className='w-full pr-2 md:pr-0'>
            <a href='https://demo.thekowcompany.com/2D_Portfolio.pdf' target='_blank' className="flex justify-end text-[12px] lg:text-[20px] font-medium leading-9 cursor-pointer underline ">
                    Download for more
                </a>
            </div>
        </div>
    );
};

export default AmbienceEnhance;
