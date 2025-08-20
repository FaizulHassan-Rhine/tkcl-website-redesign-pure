'use client';

import { motion } from 'framer-motion';

export default function AnimatedHeadline() {
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: `0.25em` },
    visible: {
      opacity: 1,
      y: `0em`,
      transition: { duration: 0.9, ease: 'easeOut' },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut', delay: 1.2 },
    },
  };

  const words = [
    "Bring", "Your", "Visuals", "to", "Life", "with",
    <span key="ai" className="text-white">AI-Powered</span>, ",",
    "Human", "Perfection", "on", "Stunning",
    <span key="2d" className="text-white">2D Image Editing</span>, "and",
    <span key="3d" className="text-white">3D Visualization</span>
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/Alnature-animation-for-website.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Dark Overlay for Better Text Readability */}
      <div className="absolute inset-0 bg-black bg-opacity-0 z-10"></div>
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <motion.h1
          className="text-[28px] font-bold sm:text-[40px] md:text-[44px]  2xl:text-[60px]  leading-[100%] mb-8 text-white drop-shadow-lg max-w-6xl mx-auto text-center mt-[-250px]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {words.map((word, i) => (
            <motion.span key={i} variants={wordVariants} className="inline-block mr-1 ">
              {word}
            </motion.span>
          ))}
        </motion.h1>
        
        <motion.button
          className="bg-[#4FA59B] hover:bg-[#3d8a82] text-white font-bold py-4 px-8 rounded-lg text-lg sm:text-xl md:text-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg drop-shadow-lg"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Let's Talk
        </motion.button>
      </div>
    </div>
  );
}
