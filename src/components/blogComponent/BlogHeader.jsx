"use client";
import { useState } from "react";
import Link from "next/link";

// import './blog.cssff'
import clsx from "clsx";
const BlogHeader = ({ btnColor, btnColor2d, btnColor3d, btnColorevents }) => {
  return (
    <>
     
        <h1 className="text-[32px] md:text-[40px] lg:text-[100px]  font-bold title text-center mb-10">
          BLOGS
        </h1>

        {/* Toggle Buttons */}
        <div className="flex justify-center gap-4 mb-12 md:flex-wrap">
          <Link
            href="/blog"
            className={clsx(
              "relative px-6 py-2 text-black dark:text-white font-semibold border border-green-500 overflow-hidden transition-all duration-300",
              btnColor ? "bg-green-500" : "bg-transparent",
              "group"
            )}
          >
            <span className="relative z-10">All</span>
            <span
              className={clsx(
                "absolute inset-0 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-0",
                btnColor && "scale-x-100"
              )}
            />
          </Link>
          <Link
            href="/blog/3d"
            className={clsx(
              "relative px-6 py-2 text-black dark:text-white font-semibold border border-green-500 overflow-hidden transition-all duration-300",
              btnColor3d ? "bg-green-500" : "bg-transparent",
              "group"
            )}
          >
            <span className="relative z-10">3D</span>
            <span
              className={clsx(
                "absolute inset-0 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-0",
                btnColor3d && "scale-x-100"
              )}
            />
          </Link>
          <Link
            href="/blog/2d"
            className={clsx(
              "relative px-6 py-2 text-black dark:text-white font-semibold border border-green-500 overflow-hidden transition-all duration-300",
              btnColor2d ? "bg-green-500" : "bg-transparent",
              "group"
            )}
          >
            <span className="relative z-10">2D</span>
            <span
              className={clsx(
                "absolute inset-0 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-0",
                btnColor2d && "scale-x-100"
              )}
            />
          </Link>
          <Link
            href="/blog/events"
            className={clsx(
              "relative px-6 py-2 text-black dark:text-white font-semibold border border-green-500 overflow-hidden transition-all duration-300",
              btnColorevents ? "bg-green-500" : "bg-transparent",
              "group"
            )}
          >
            <span className="relative z-10">Events</span>
            <span
              className={clsx(
                "absolute inset-0 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-0",
                btnColorevents && "scale-x-100"
              )}
            />
          </Link>
        </div>
      
    </>
  );
};

export default BlogHeader;
