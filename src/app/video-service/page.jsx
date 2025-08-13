// components/VideoGrid.jsx
"use client";
import FooterGrid from "@/components/FooterNew";
import React from "react";

const videos = [
  { srcWebm: "/videos/audio-level.webm", title: "Audio Editing Service ", subtitle: "Our Audio Editing Service elevates the quality of sound to the professional standard of your photographs. We normalize audio, remove distracting noise, and add music or effects to create a clear, compelling listening experience for your audience. " },

  { srcWebm: "/videos/crop.webm", title: "Video Cropping Service", subtitle: "Our Video Cropping Service sizes your video to suit any screen or platform without losing important visual information. We crop aspect ratios for Facebook, websites, and presentations while keeping your images professional and clear." },
  { srcWebm: "/videos/subtitle.webm", title: "Subtitle Addition Service ", subtitle: "Our Subtitle Addition Service enhances your visibility and access for your video with the addition of proper, up-to-date subtitles. We use subtitles to preserve your brand tone, improve your audience comprehension, and meet accessibility needs for international viewers." },
  { srcWebm: "/videos/title.webm", title: "Title Addition Service", subtitle: "With our Title Addition Service, we design impactful titles, openings, and lower-thirds that grab your viewer's attention right away. From compelling opening sequences to crisp lower-thirds, we design titles that have an effect and boost your brand recognition." },
];

export default function VideoGrid() {
  return (
    <>
      <div className="py-20">
        <h1 className="text-[100px] mb-20 font-semibold title text-center">
          Video Editing Services
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
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

              <h1 className="text-[32px] font-semibold sub-title">
                {item.title}
              </h1>
              <p className="text-body">{item.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
      <FooterGrid />
    </>
  );
}
