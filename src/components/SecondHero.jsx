import React from 'react';

const SecondHero = () => {
    return (
      <div className='container mx-auto mt-9 '>
          <div className=' pb-9 pt-12 md:pt-[72px] rounded-xl'>
            <div className='flex flex-row justify-center items-end gap-2 md:gap-4 lg:gap-7  px-2 lg:px-0'>
                <div>
                    <img src='/images/first.webp'/>
                </div>
                <div>
                    <img src='/images/second.webp'/>
                </div>
                <div>
                    <img src='/images/third.webp'/>
                </div>
            </div>
            <div className='flex  flex-col-reverse lg:flex-row justify-center items-center gap-4  lg:gap-12 mt-6 lg:mt-12'>
                <div className='w-full lg:w-[696px] flex flex-col gap-4 lg:gap-7 px-2 '>
                    <h1 className='text-[20px] lg:text-[36px] font-bold leading-10 text-[#737373] font-tartuffo'>About Us</h1>
                    <p className='text-[12px] lg:text-[20px] font-medium lg:leading-7 text-[#737373]'>The KOW Company is revolutionizing the world of content every second. Image retouching has become more accessible
              with our extraordinary pool of retouchers and AI software built in-house. We have not stopped there; we are producing
              3D models at scale with software-driven solutions that save your time and provide top-notch experiences. We are scaling
              up every day, as we are trusted by big brands, studios, and retailers worldwide. We ensure the visibility of your assets
              by meticulously crafting each piece of content the right way.</p>
                </div>
                <div>
                    <img src='/images/Gallery-2.webp'/>
                </div>
            </div>
        </div>
      </div>
    );
};

export default SecondHero;