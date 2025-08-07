import Footer from "@/components/Footer";
import React from "react";

const models = [
  {
    title: "Modelling",
    src: "https://sketchfab.com/models/c00345fd64414c4e8895c6aaa262e4d5/embed", // Nike Shoe Demo
  },
  {
    title: "Texturing",
    src: "https://sketchfab.com/models/7d6938c0c0b54b06a0210a982a73023e/embed", // Architecture Interior Demo
  },
  {
    title: "Data Cleanup",
    src: "https://sketchfab.com/models/20a01f39619f47a6a656778239db3ff8/embed", // Vase
  },
  {
    title: "Modelling",
    src: "https://sketchfab.com/models/c00345fd64414c4e8895c6aaa262e4d5/embed", // Nike Shoe Demo
  },
  {
    title: "Texturing",
    src: "https://sketchfab.com/models/7d6938c0c0b54b06a0210a982a73023e/embed", // Architecture Interior Demo
  },
  {
    title: "Data Cleanup",
    src: "https://sketchfab.com/models/20a01f39619f47a6a656778239db3ff8/embed", // Vase
  }
 
];

export default function ThreeDShowcase() {
  return (
    <>
    <section className="bg-white dark:bg-black py-20 px-4">

      <h2 className=" text-[40px] sm:text-[60px] md:text-[80px] lg:text-[200px] title py-4 font-bold text-center ">3D & CGI</h2>
     <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mx-auto">
  {models.map((model, index) => (
    <div key={index} className="flex flex-col items-start">
      {/* Card box only */}
      <div className=" rounded-lg overflow-hidden w-full">
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            title={model.title}
            src={model.src}
            frameBorder="0"
            allow="autoplay; fullscreen; xr-spatial-tracking"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </div>

      {/* Title outside card */}
      <div className="mt-2 text-white font-semibold text-[32px] text-left">
        {model.title}
      </div>
    </div>
  ))}
</div>

    </section>
    <Footer/>
    </>
  );
}
