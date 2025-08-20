'use client'
export default function Retouched() {
    return (
     <>
      <style jsx>{`
    .font-tartuffo-bold-italic {
          font-family: 'Tartuffo', serif;
          font-weight: 700;
          font-style: italic;
        }
  `}</style> 
     <div className="container mx-auto h-screen ">
       <h1 className='text-[40px] md:text-[50px] py-20 xl:text-[60px] text-center title font-tartuffo-bold-italic leading-[100%]'>Our AI Tools</h1>
       <section className="flex flex-col md:flex-row items-center justify-between mx-auto  py-12">
        {/* Left side - Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/images/Silver.png"
            alt="Description"
            className="w-[90%]  "
          />
        </div>
  
        {/* Right side - Text & Button */}
        <div className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-12 ">
          <h2 className="text-3xl md:text-4xl font-bold text-black font-sans">
            Retouched AI
          </h2>
          <p className="mt-4 text-lg text-black font-sans max-w-xl">
          Retouched.ai is the perfect tool for effortlessly and freely removing backgrounds from images using artificial intelligence. This tool is specifically designed for photographers, graphic designers, e-commerce businesses, and content creators. It delivers precise, high-quality results in seconds. You don't have to labor over unzipping files and moving them from one place to another to get a painfully neutral result. Retouched.ai gives you a comfortable workspace and makes it look like you're a Photoshop pro, even if you're not.
 
          </p>
         <a href="https://holosnap.ai" target="_blank" rel="noopener noreferrer">
           <button className="mt-6 px-6 py-3 bg-[#4FA59B] hover:bg-[#3d8a82] text-white rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            Try retouched.ai
          </button>
         </a>
        </div>
      </section>
     </div>
     </>
    );
  }
  