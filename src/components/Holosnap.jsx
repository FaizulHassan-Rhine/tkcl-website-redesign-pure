'use client'
export default function HoloSnap() {
    return (
     <div className="container mx-auto ">
       <section className="flex flex-col md:flex-row items-center justify-between mx-auto  py-12">
        {/* Left side - Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="https://tkcl-redesigned.vercel.app/assets/imgs/project/image-65.webp"
            alt="Description"
            className="w-full  "
          />
        </div>
  
        {/* Right side - Text & Button */}
        <div className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-12 ">
          <h2 className="text-3xl md:text-4xl font-bold text-black font-sans">
            Holosnap
          </h2>
          <p className="mt-4 text-lg text-black font-sans">
          Turning ordinary images into detailed 3D models is no longer a thing of the past, it is the future! Holosnap allows users to create lifelike 3D representations without needing any complex modeling skills by using advanced AI, and computer vision enhanced with professional touch. The process of turning 2D visuals into immersive, interactive 3D models can be streamlined with Holosnap. Find a powerful and user-friendly solution for 3D modeling from images for various content creation ranging from Virtual/Augmented Reality to campaign ready solutions.
 
          </p>
         <a href="https://holosnap.ai" target="_blank" rel="noopener noreferrer">
           <button className="mt-6 px-6 py-3 bg-[#4FA59B] hover:bg-[#3d8a82] text-white rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            Try it Now
          </button>
         </a>
        </div>
      </section>
     </div>
    );
  }
  