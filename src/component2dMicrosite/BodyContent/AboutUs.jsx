import React from 'react';

const AboutUs = () => {
    return (
      <div className='container mx-auto mt-9 '>
          <div className='bg-white pb-9 pt-12 md:pt-[72px] rounded-xl'>
            <div className='flex flex-row justify-center items-end gap-2 md:gap-4 lg:gap-7  px-2 lg:px-0'>
                <div>
                    <img src='/images/2D-Microsite/images/Image 1.webp'/>
                </div>
                <div>
                    <img src='/images/2D-Microsite/images/Image 2.webp'/>
                </div>
                <div>
                    <img src='/images/2D-Microsite/images/Image 3.webp'/>
                </div>
            </div>
            <div className='flex  flex-col-reverse lg:flex-row justify-center items-center gap-4  lg:gap-12 mt-6 lg:mt-12'>
                <div className='w-full lg:w-[696px] flex flex-col gap-4 lg:gap-7 px-2 '>
                    <h1 className='text-[20px] lg:text-[36px] font-bold leading-10 text-[#737373]'>About Us</h1>
                    <p className='text-[12px] lg:text-[20px] font-medium lg:leading-7 text-[#737373]'>At The KOW Company, we excel in E-commerce and Studio Image Post-Production, transforming visual concepts into captivating realities. With a keen eye for detail and creativity, our talented team elevates product images through precise editing and enhancement. From background removal to sophisticated retouching, we deliver impeccable visuals that make your products shine. We don’t just meet expectations – we surpass them, empowering your brand to stand out in the competitive market.</p>
                </div>
                <div>
                    <img src='/images/2D-Microsite/images/Gallery 2.webp'/>
                </div>
            </div>
        </div>
      </div>
    );
};

export default AboutUs;