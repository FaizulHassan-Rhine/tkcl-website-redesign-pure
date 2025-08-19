import React from 'react';

const Retouched = () => {
  return (
    <div className='container mx-auto bg-white mt-9 rounded-xl'>
      <div className="  bg-white py-[20px] md:py-[36px]  rounded-t-xl">
        <h1 className="w-full text-center text-[16px] lg:text-[36px] font-bold lg:leading-10 text-[#000] py-[23px] ">
          Your one stop Ai-powered image editing solution is here with <a href='https://retouched.ai/' target='_blank' className='cursor-pointer hover:text-gray-400'>Retouched.ai</a>. Try it now!
        </h1>

      </div>

      <div className='w-full'>
        <div className="pb-10">

          <div className="w-full flex justify-center items-center ">
            <iframe
              className="bg-white h-[400px] md:h-[700px] 2xl:h-[800px] w-full border-[3px] lg:border-[1px] border-[#255646] rounded-xl overflow-hidden"
              src="https://www.retouched.ai"
              title="Embedded Website"
              frameBorder="0"
              scrolling="no"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Retouched;