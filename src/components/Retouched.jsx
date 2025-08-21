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
     <div id="retouched" className="container mx-auto h-full md:h-screen ">
       <h1 className='text-[40px] md:text-[50px] py-20 xl:text-[60px] text-center title font-tartuffo-bold-italic leading-[100%]'>Our AI Tools</h1>
       <section className="flex flex-col md:flex-row items-center justify-between mx-auto  py-12">
        {/* Left side - Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/images/Silver.png"
            alt="Description"
            className="w-[90%] "
          />
        </div>
  
        {/* Right side - Text & Button */}
        <div className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-12 ">
          <h2 className="text-3xl md:text-4xl font-bold text-black font-sans">
            Retouched AI
          </h2>
          <p className="mt-4 text-lg text-black font-sans max-w-xl text-justify">
          Removing backgrounds is no longer a part of tedious photo editing task, it is just one tap away with Retouched.ai. With the help of artificial intelligence, Retouched.ai is the perfect solution for background knockoffs, replacement with presets and prompt generated backdrop. Wasting hours on unzipping files and dragging them to get a very basic output is not a smart choice when you have Retouched.ai to give a pro level output. Need an output ready to be uploaded on Facebook, Shopify, or Amazon? The smart resizing option on retouched.ai will allow you to get the most suitable output for all platforms. Flexibility and usability are guaranteed by Retouched.ai, which allows for output in several formats: JPG, PNG, and PSD. This format can easily fit into whatever you're doing because it supports the everyday output needs of most working creatives, regardless of their end goal. Say goodbye to tedious manual editing and welcome a fast, more efficient method for achieving professional and visually compelling results. Retouched.ai makes it easy to creatively accomplish the otherwise daunting task of background removal.
 
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
  