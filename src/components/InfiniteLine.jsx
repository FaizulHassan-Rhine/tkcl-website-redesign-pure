"use client";

import React from "react";

/**
 * Infinite Running Text Train (Marquee) – Next.js + TailwindCSS
 * Smooth, seamless, hover-to-pause, accessible.
 *
 * Usage:
 * <TextTrain />
 * ...or customize via props.
 */
export default function TextTrain({
  items = [
    "Texturing",
    "Modelling",
    "Rendering",
    "Architectural Visualization",
    "Product Visualization",
    "2D Postproduction",
    "Shadow Addition",
    "Background Replacement",
    "Image Manipulation",
    "Ghost Mannequin",
    "Photo Masking",
    "Photo Retouch",
    "Video Editing",
  ],
  speed = 40, // seconds per loop; higher = slower
  pauseOnHover = true,
  className = "",
}) {
  // Duplicate the items to create a seamless loop
  const doubled = [...items, ...items];

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      aria-label="Scrolling list of services"
    >
      {/* Left & right fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 " />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 " />

      {/* Track */}
      <div
        className={`marquee-track ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""}`}
        style={{
          // @ts-ignore – CSS var used in styled-jsx below
          "--duration": `${speed}s`,
        }}
        role="list"
        aria-live="off"
      >
        {doubled.map((label, idx) => (
          <React.Fragment key={`${label}-${idx}`}>
            <span
              role="listitem"
              className="mx-[1.15rem] inline-flex  items-center gap-2 rounded-2xl px-4 py-6 text-sm md:text-[40px]  whitespace-nowrap"
            >
              {label}
            </span>
            {/* Dot separator - only show if not the last item */}
            {idx < doubled.length - 1 && (
              <span className="h-3 w-3 shrink-0 rounded-full bg-black" aria-hidden="true" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Styles scoped to this component */}
      <style jsx>{`
        /* Make the train take only as much width as needed */
        .marquee-track {
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
          width: max-content; /* shrink to content */
          animation: marquee var(--duration, 28s) linear infinite;
        }

        @keyframes marquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0); /* shift by the width of the first list */
          }
        }
      `}</style>
    </div>
  );
}