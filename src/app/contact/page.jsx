import Footer from "@/components/Footer";
import FooterGrid from "@/components/FooterNew";
import React from "react";

export default function Contact() {
  return (
    <>
      <div className="bg-white text-black dark:bg-black dark:text-white  px-6 md:px-20 py-32">
        {/* Header */}
        <h1 className="text-6xl lg:text-[100px] title  font-semibold text-center">
          CONTACT
        </h1>

        {/* Section Divider */}
        <div className="border-t border-gray-700 my-12"></div>

        <div className="mb-10 lg:mb-20">
          <h2 className="text-3xl lg:text-[60px] leading-[35px] lg:leading-[65px] max-w-4xl mx-auto  sub-title text-left mb-8">
            Let’s drop us a line and get the project started.
          </h2>
        </div>

        {/* Main Content */}
        <div className="md:flex md:justify-between md:gap-24">
          {/* Left Column */}
          <div className="md:w-1/3 mb-12 md:mb-0">
            <h2 className="uppercase text-sm text-gray-400 tracking-widest mb-4">
              Contact
            </h2>
            <p className="text-[16px] lg:text-[32px] leading-[20px] lg:leading-[33px] sub-title mb-4">
              We’re excited to hear from you and let’s start something special
              together
            </p>
            <a
              href="mailto:hello@thekowcompany.com"
              className="underline text-[16px] lg:text-[32px] sub-title "
            >
              hello@thekowcompany.com
            </a>
            {/* <div className="mt-8 space-y-2">
              <p className="text-sm text-gray-400">Follow</p>
              <div className="flex flex-col">
                <a href="#" className="underline text-[16px] lg:text-[32px] sub-title">
                  Facebook
                </a>
                <a href="#" className="underline text-[16px] lg:text-[32px] sub-title">
                  LinkedIn
                </a>
                <a href="#" className="underline text-[16px] lg:text-[32px] sub-title">
                  Twitter
                </a>
              </div>
            </div> */}
          </div>

          {/* Right Column - Form */}
          <form className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <input
              type="text"
              placeholder="Company"
              className="bg-transparent border-b dark:border-white border-gray-700 focus:outline-none py-2"
            />

            <div className="relative">
              <select
                className="bg-white text-black dark:bg-black dark:text-white border-b dark:border-white border-gray-700 focus:outline-none py-2  pr-8 appearance-none w-full"
                required
              >
                <option value="">Budget*</option>
                <option value="5000-10000">5,000 – 10,000</option>
                <option value="10000-15000">10,000 – 15,000</option>
                <option value="15000-20000">15,000 – 20,000</option>
                <option value="20000-25000">20,000 – 25,000</option>
                <option value="25000+">25,000 – Above</option>
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
        </div>
      </div>
      <FooterGrid/>
    </>
  );
}
