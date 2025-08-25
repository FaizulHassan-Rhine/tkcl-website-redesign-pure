import React from 'react';

const Navbar2DPortfolio = () => {

   
    return (
        <div className='bg-[#155331] py-4 px-6 rounded-b-xl'>
            <div className='container mx-auto'>
                <div className='flex justify-between items-center text-white'>
                    <img className='w-[65px] h-[30px] md:w-[109px] md:h-[51px]' src='/img/2D-Microsite/logo_kow_white.png'/>
                    <a href='https://thekowcompany.com' target='_blank'>
                    <h3 className='text-[16px] lg:text-[30px]  font-medium hidden md:block'>The KOW Company</h3>
                    </a>
                    <a href='https://thekowcompany.com/book-a-call' target='_blank'>
                    <button className='text-[12px] lg:text-base font-normal py-1 hover:bg-[#FFFED3] hover:text-black lg:py-2 px-4 border-white border-[2px] border-solid rounded'>Book a Call</button>
                    </a>
                </div>
            </div>
        </div>

    );
};

export default Navbar2DPortfolio;