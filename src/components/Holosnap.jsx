'use client'
export default function HoloSnap() {
    return (
     <>
      <style jsx>{`
    .font-tartuffo-bold-italic {
          font-family: 'Tartuffo', serif;
          font-weight: 700;
          font-style: italic;
        }
  `}</style> 
     <div id="holosnap" className="container mx-auto ">
      
       <section className="flex flex-col md:flex-row items-center justify-between mx-auto py-5 sm:py-12">
        {/* Left side - Image */}
        {/* Right side - Text & Button */}
        <div className="w-full md:w-1/2 mt-0  md:mt-0 md:pl-20 ">
          <h2 className="text-2xl md:text-4xl font-bold text-black font-sans">
            Holosnap (Beta)
          </h2>
          <p className="mt-4 text-lg text-black font-sans  text-justify">
          Turning ordinary images into detailed 3D models is no longer a thing of the past, it is the future! Holosnap allows users to create lifelike 3D representations without needing any complex modeling skills by using advanced AI, and computer vision enhanced with professional touch. The process of turning 2D visuals into immersive, interactive 3D models can be streamlined with Holosnap. Find a powerful and user-friendly solution for 3D modeling from images for various content creation ranging from Virtual/Augmented Reality to campaign ready solutions.
 
          </p>
         <a href="https://holosnap.ai" target="_blank" rel="noopener noreferrer">
           <button className="mt-6 px-6 py-3 bg-[#4FA59B] hover:bg-[#3d8a82] text-white rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            Try Beta
          </button>
         </a>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/images/Black-Titanium.png"
            alt="Description"
            className="w-[60%] mt-5 sm:mt-0"
          />
        </div>
  
       
      </section>
     </div>
     </>
    );
  }
  