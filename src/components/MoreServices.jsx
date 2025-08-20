'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function MoreServices({ currentServiceId, services = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleServices, setVisibleServices] = useState([]);

  useEffect(() => {
    // Filter out the current service and get other services
    const otherServices = services.filter(service => service.id !== currentServiceId);
    setVisibleServices(otherServices);
  }, [currentServiceId, services]);

  const nextServices = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, visibleServices.length - 2));
  };

  const prevServices = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, visibleServices.length - 3) : prev - 1
    );
  };

  const getVisibleServices = () => {
    if (visibleServices.length <= 2) return visibleServices;
    return visibleServices.slice(currentIndex, currentIndex + 2);
  };

  if (visibleServices.length === 0) return null;

  return (
    <section className="w-full py-20 px-6 ">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-[60px] title font-semibold mb-6">
            Explore More Services
          </h2>
          <p className="text-xl lg:text-2xl sub-title max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
            Discover our complete range of image editing solutions
          </p>
        </div>

        {/* Services Grid with Navigation */}
        <div className="relative">
          {/* Navigation Arrows */}
          {visibleServices.length > 2 && (
            <>
              <button
                onClick={prevServices}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 group"
                aria-label="Previous services"
              >
                <svg 
                  className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-[#4FA59B] transition-colors" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextServices}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 group"
                aria-label="Next services"
              >
                <svg 
                  className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-[#4FA59B] transition-colors" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {getVisibleServices().map((service, index) => (
              <Link 
                key={service.id} 
                href={service.href || `/image-editing-service/${service.slug}`}
                className="group block"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  {/* Service Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={service.hero}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                  
                  {/* Service Info */}
                  <div className="p-6">
                    <h3 className="text-2xl lg:text-3xl title font-semibold mb-3 group-hover:text-[#4FA59B] transition-colors">
                      {service.title}
                    </h3>
                    {/* <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-4">
                      {service.intro?.summary || service.intro?.long || 'Professional image editing service'}
                    </p> */}
                    
                    {/* Learn More Button */}
                    <div className="flex items-center text-[#4FA59B] font-semibold group-hover:text-[#206035] transition-colors">
                      <span>Learn More</span>
                      <svg 
                        className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Dots Indicator */}
          {visibleServices.length > 2 && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: Math.ceil(visibleServices.length / 2) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-[#4FA59B] scale-125' 
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
