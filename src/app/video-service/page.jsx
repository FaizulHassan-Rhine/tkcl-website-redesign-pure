// components/VideoGrid.jsx
"use client";
import React from "react";

const videos = [
  { srcWebm: "/videos/audio-level.webm", title: "Lookbook — Summer Drop" },
  { srcWebm: "/videos/crop.webm",        title: "Behind the Scenes — Edit 01" },
  { srcWebm: "/videos/subtitle.webm",    title: "Behind the Scenes — Edit 01" },
  { srcWebm: "/videos/title.webm",       title: "Behind the Scenes — Edit 01" },
];

export default function VideoGrid() {
  return (
    <>
   <div className="py-20">
     <h1 className="text-[128px] title text-center">Video Editing Services</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {videos.map((item, idx) => (
        <div key={`${item.title}-${idx}`} className="space-y-2">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            controls={false}
            className="block w-full rounded-lg shadow-sm ring-1 ring-black/5 object-cover"
          >
            <source src={item.srcWebm} type="video/webm" />
          </video>

          <p className="text-sm md:text-base font-medium text-gray-900">
            {item.title}
          </p>
        </div>
      ))}
    </div>
   </div>
    </>
  );
}
