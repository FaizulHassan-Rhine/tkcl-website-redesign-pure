import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import React from "react";

export default function Contact() {
  return (
    <>
      <div className="bg-white text-black dark:bg-black dark:text-white  px-6 md:px-20 py-32">
        {/* Header */}
        <h1 className="text-6xl lg:text-[250px] title  font-semibold text-center">
          CONTACT
        </h1>

        {/* Section Divider */}
        <div className="border-t border-gray-700 my-12"></div>

        <div className="mb-10 lg:mb-20">
          <h2 className="text-3xl lg:text-[100px] leading-[35px] lg:leading-[95px] max-w-4xl mx-auto  sub-title text-left mb-8">
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
            <div className="mt-8 space-y-2">
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
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
      <Footer />
    </>
  );
}
