import React from "react";

const VideoSection = () => {
  return (
    <div className="container mx-auto mt-12">
      <div className="bg-white rounded-xl p-8">
        <h2 className="text-[18px] lg:text-5xl text-center pt-2 md:pt-6 pb-10 font-bold text-[#737373]">
          Video Editing Services
        </h2>

        {/* First Row */}
        <div className="flex flex-col md:flex-row gap-4 mb-4 ">
          <div className="w-full md:w-[550px] relative">
            <video
              className="h-[200px] md:h-[540px] object-cover rounded-lg relative"
              playsInline
              autoPlay
              muted
              loop
              preload="auto"
            >
              <source
                src="/videos/audio-level.webm"
                type="video/webm"
              />
              Your browser does not support the video tag.
            </video>
            <h1
              style={{ transform: "translate(-50%, 0)" }}
              className="absolute top-1 md:top-5 left-[50%] text-center text-[20px] md:text-[48px] font-bold text-white w-[250px] md:w-[445px] leading-[48px]"
            >
              Audio Editing Service
            </h1>
          </div>

          <div className="relative">
            <video
              className="h-[200px] md:h-[540px] object-cover rounded-lg"
              playsInline
              autoPlay
              muted
              loop
              preload="auto"
            >
              <source
                src="/videos/subtitle.webm"
                 type="video/webm"
              />
              Your browser does not support the video tag.
            </video>
            <h1
              style={{ transform: "translate(-50%, 0)" }}
              className="absolute top-1 md:top-5 left-[50%] text-center text-[20px] md:text-[48px] w-[250px] md:w-full font-bold text-white  leading-[48px]"
            >
              Subtitle Addition Service
            </h1>
          </div>
        </div>

        {/* Second Row */}
        <div className="flex flex-col md:flex-row gap-4 h-1/2">
          <div className="relative">
          <video
            className=" h-[200px] md:h-[540px] object-cover rounded-lg"
            playsInline
            autoPlay
            muted
            loop
            preload="auto"
          >
            <source src="/videos/crop.webm"  type="video/webm" />
            Your browser does not support the video tag.
          </video>
          <h1
            style={{ transform: "translate(-50%, 0)" }}
            className="absolute top-1 md:top-5 left-[50%] text-center text-[20px] md:text-[48px] font-bold text-white w-[250px] md:w-full leading-[48px]"
          >
            Video Cropping Service
          </h1>
          </div>
         <div className="w-full md:w-[550px] relative">
         <video
            className=" h-[200px] md:h-[540px] object-cover rounded-lg"
            playsInline
            autoPlay
            muted
            loop
            preload="auto"
          >
            <source src="/videos/title.webm"  type="video/webm" />
            Your browser does not support the video tag.
          </video>
          <h1
            style={{ transform: "translate(-50%, 0)" }}
            className="absolute top-1 md:top-5 left-[50%] text-center text-[20px] md:text-[48px] font-bold text-white w-[250px] md:w-[445px] leading-[48px]"
          >
            Title Addition Service
          </h1>
         </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
