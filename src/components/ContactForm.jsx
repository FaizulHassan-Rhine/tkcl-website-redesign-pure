'use client';

import Footer from "@/components/Footer";
import React, { useState } from "react";


export default function ContactForm() {
   const [isOpen, setIsOpen] = useState(false);
  return (
    <>
 
          <form className="w-full grid grid-cols-1 md:grid-cols-2 text-body gap-6">
            <input
              type="text"
              placeholder="Name*"
              className="bg-transparent border-b dark:border-white border-gray-700 focus:outline-none py-2"
              required
            />
            <input
              type="email"
              placeholder="Email*"
              className="bg-transparent border-b dark:border-white border-gray-700 focus:outline-none py-2"
              required
            />

            <input
              type="text"
              placeholder="Phone*"
              className="bg-transparent border-b dark:border-white border-gray-700 focus:outline-none py-2"
              required
            />
          

            <div className="relative">
      <select
        className=" dark:bg-black dark:text-white border-b dark:border-white border-gray-700 focus:outline-none py-2 pr-8 appearance-none w-full"
        required
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
      >
        {!isOpen && <option value="">Solution</option>}
        <option value="5000-10000">Image Editing</option>
        <option value="10000-15000">Video Editing</option>
        <option value="15000-20000">3D Modelling & Rendering</option>
        <option value="20000-25000">AI Services</option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg
          className="w-4 h-4 text-black dark:text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>

            <textarea
              placeholder="Message*"
              className="bg-transparent border-b dark:border-white border-gray-700 focus:outline-none py-2 md:col-span-2"
              rows={4}
              required
            ></textarea>

            <button
              type="submit"
              className="group relative mt-4 md:col-span-2 overflow-hidden bg-black text-white dark:bg-white dark:text-black font-semibold px-6 lg:px-12 py-3 lg:py-6 rounded-full w-fit"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white dark:group-hover:text-white">
                Send Message
              </span>
              <span className="absolute inset-0 bg-green-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></span>
            </button>
          </form>
        
    </>
  );
}
