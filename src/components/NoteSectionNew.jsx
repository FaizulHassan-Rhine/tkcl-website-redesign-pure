import React from 'react';

const NoteSectionNew = () => {
    return (
        <div>
            <p className='text-center text-body text-4xl md:text-[90px] font-semibold leading-[100%] max-w-4xl mx-auto py-20'>
            Count on us to help you create content <span className='text-sub-title text-green'>the right way.</span>
            </p>
            
            <div className='text-center pb-20'>
                <a href="/contact">
                    <button className="relative px-8 py-4 bg-[#4FA59B] text-white border border-[#4FA59B] rounded-full font-medium overflow-hidden group transition-all duration-300 hover:text-white">
                        <span className="absolute inset-0 bg-[#3B837B] transform translate-y-full group-hover:translate-y-0 border-[#3B837B] transition-transform duration-300 ease-out"></span>
                        <span className="relative z-10 text-[18px] md:text-[22px] lg:text-[26px]">Let's Talk</span>
                    </button>
                </a>
            </div>
        </div>
    );
};

export default NoteSectionNew;