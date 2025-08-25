import React from 'react';

const OurService2DPortfolio = () => {
    return (
        <div className='container mx-auto my-10 lg:mt-9 '>
            <div className='bg-white px-7 lg:px-12 py-20 flex flex-col gap-8 items-center rounded-xl'>
                <h2 className='text-[24px] lg:text-5xl font-bold text-[#737373]'>2D Services</h2>
                <div className='flex flex-col  md:flex-row   gap-4 md:gap-[38px]'>
                    <a href='#retouching' className='group relative rounded-lg flex justify-center items-center h-[200px]  overflow-hidden  md:h-auto'>
                        <img src="./images/2D-Microsite/ourservices/ourservices.webp"/>
                        <div className='transition-all duration-500 bg-white opacity-0 group-hover:opacity-50 absolute w-full h-full'></div>
                        <h3 className='transition-all duration-500 absolute text-[24px] lg:text-5xl xl:text-6xl font-bold text-white group-hover:text-black w-[180px]  lg:w-full text-center'>Retouching Services</h3>
                    </a>
                
                    <a href='#ambience' className='group relative rounded-lg flex justify-center items-center h-[200px]   overflow-hidden  md:h-auto'>
                        <img src="./images/2D-Microsite/ourservices/ourservices2.webp"/>
                        <div className='transition-all duration-500 bg-white opacity-0 group-hover:opacity-50 absolute w-full h-full'></div>
                        <h3 className='transition-all duration-500 absolute text-[24px] lg:text-5xl xl:text-6xl font-bold text-white group-hover:text-black w-[180px] lg:w-full text-center'>Ambience
                        Enhance</h3>
                    </a>
                    
                    <a href='#mannequin' className='group relative rounded-lg flex justify-center items-center h-[200px]   overflow-hidden  md:h-auto'>
                        <img src="./images/2D-Microsite/ourservices/ourservices3.webp"/>
                        <div className='transition-all duration-500 bg-white opacity-0 group-hover:opacity-50 absolute w-full h-full'></div>
                        <h3 className='transition-all duration-500 absolute text-[24px] lg:text-5xl xl:text-6xl font-bold text-white group-hover:text-black w-[180px] lg:w-full text-center'>Ghost
                        Mannequin</h3>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default OurService2DPortfolio;