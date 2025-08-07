'use client';

import ClientBrand from '@/components/ClientBrand';
import FeaturedWork from '@/components/FeatureWork';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import InfiniteLine from '@/components/InfiniteLine';
import NoteSection from '@/components/NoteSection';
import ParallaxImageSection from '@/components/ParallaxImageSection';
import ScrollTitle from '@/components/ScrollTitle';
import ServicesSection from '@/components/ServicesSection';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Animated Text Component
const AnimatedText = ({ text, className, delay = 0 }) => {
  const words = text.split(' ');
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: 0.12,
        delayChildren: delay * 0.1,
      },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: -20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.h1
      style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap' }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ marginRight: '8px', display: 'inline-block' }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
};

// Animated Span Component for colored text
const AnimatedSpan = ({ text, className, delay = 0 }) => {
  const words = text.split(' ');
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: 0.12,
        delayChildren: delay * 0.1,
      },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: -20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      style={{ overflow: 'hidden', display: 'inline-flex', flexWrap: 'wrap' }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ marginRight: '8px', display: 'inline-block' }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default function HomePage() {
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    // Wait for page to fully load
    const timer = setTimeout(() => {
      setPageLoaded(true);
    }, 1000); // Adjust delay as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <main className="pt-20 space-y-40 transition-colors duration-500">
        {/* Hero Section - Animated Text */}
        <section className='px-4 md:px-6'>
          <div className='flex flex-col md:flex-row justify-between gap-20 items-center'>
            {pageLoaded ? (
              <div className="text-[32px] sm:text-[48px] md:text-[40px] lg:text-[60px] leading-[100%] lg:max-w-2xl">
                <AnimatedSpan 
                  text="Bring your visuals to life with expert" 
                  className="text-[#6C6C6C]"
                  delay={0}
                />
                <AnimatedText 
                  text=" 2D Image Editing Stunning 3D Post-Production" 
                  className="text-current"
                  delay={6} // Start after the first part
                />
              </div>
            ) : (
              <h1 className="text-[32px] sm:text-[48px] md:text-[40px] lg:text-[70px] leading-[100%] lg:max-w-3xl opacity-0">
                <span className='text-[#6C6C6C]'>Bring your visuals to life with expert</span> 2D Image Editing Stunning 3D Post-Production
              </h1>
            )}
            
            <motion.div 
              className='lg:max-w-2xl mt-10'
              initial={{ opacity: 0, y: 30 }}
              animate={pageLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <div className='flex justify-center gap-10 items-center'>
                <div>
                  <h1 className='text-[32px] sm:text-[48px] md:text-[40px] lg:text-[70px] font-sans text-green-500'>24/7</h1>
                  <p className='text-[12px] sm:text-[16px] md:text-[12px] lg:text-[16px]'>We're here for you 24/7—anytime, anywhere.</p>
                </div>
                <div>
                  <h1 className='text-[32px] sm:text-[48px] md:text-[40px] lg:text-[70px] text-green-500'>100%</h1>
                  <p className='text-[12px] sm:text-[16px] md:text-[12px] lg:text-[16px]'>Guaranteed 100% on-time delivery, every time.</p>
                </div>
              </div>
              <div className="mt-5">
                <h1 className='text-red-500 font-semibold text-[12px] lg:text-[32px]'>Attention : This section is temporary.</h1>
                <p className='text-[12px] lg:text-[16px]'>We updated the Next.js library to follow Google's new rules. It can now check if content (like text or blogs) is made by AI with about 99% accuracy for text and 70% for images. Before uploading any text or blog, please check it with QuillBot and Grammarly to avoid being flagged as 0% AI-generated. Otherwise, thekowcompany.com could lose SEO ranking.</p>
              </div>
            </motion.div>
          </div>
        </section>

        <Hero />
        <InfiniteLine />
        <FeaturedWork />
        <ServicesSection />
        <ClientBrand />
        <ScrollTitle />
        <NoteSection />
        <ParallaxImageSection />
        <Footer />
      </main>
    </>
  );
}