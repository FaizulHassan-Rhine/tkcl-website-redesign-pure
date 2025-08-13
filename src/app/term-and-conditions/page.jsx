import FooterGrid from '@/components/FooterNew';
import React from 'react';

const page = () => {
    return (
       <>
        <div className='w-full pt-10 mb-20'>
            <div className='w-full h-[60vh] mt-20'>
                <img className='w-full' src="/images/terms-and-conditions.webp" alt="" />
            </div>
        </div>
        <FooterGrid/>
       </>
    );
};

export default page;