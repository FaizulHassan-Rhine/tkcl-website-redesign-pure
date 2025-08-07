'use client';

import Footer from "@/components/Footer";

const AiProductsSection = () => {
  return (
   <div>
     <section className=" py-20 px-4 md:px-12">
      {/* Main Title */}
      <h2 className=" text-[200px] title font-extrabold text-center py-5">
        AI PRODUCTS
      </h2>

      {/* Image Layout */}
      <div className="flex flex-col lg:flex-row items-center justify-center ">
        {/* Left - Phones */}
        <div className="flex flex-col p-20 border-gray-200 dark:border-gray-800 border items-center w-full ">
          <p className="text-white text-[32px] sub-title font-semibold mb-4 text-center">
            Holosnap
          </p>
          <img
            src="https://tkcl-redesigned.vercel.app/assets/imgs/project/image-69.webp"
            alt="Phone Image"
            width={300}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right - Desktop */}
        <div className="flex border-gray-200 p-20 border dark:border-gray-800 flex-col items-center w-full ">
          <p className="text-white text-lg text-[32px] sub-title font-semibold mb-4 text-center">
            Retouched.ai
          </p>
          <img
            src="https://tkcl-redesigned.vercel.app/assets/imgs/project/image-70.webp"
            alt="Desktop Image"
            width={800}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
    <Footer/>
   </div>
  );
};

export default AiProductsSection;
