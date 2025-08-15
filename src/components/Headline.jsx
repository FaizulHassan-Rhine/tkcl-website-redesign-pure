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

  const words = [
    "Bring", "Your", "Visuals", "to", "Life", "with",
    <span key="ai" className="text-[#4FA59B]">AI-Powered</span>, ",",
    "Human", "Perfection", "on", "Stunning",
    <span key="2d" className="text-[#4FA59B]">2D Image Editing</span>, "and",
    <span key="3d" className="text-[#4FA59B]">3D Visualization</span>
  ];

  return (
    <motion.h1
      className="text-[28px] mt-3 md:pt-20 font-bold text-body sm:text-[40px] md:text-[44px] xl:text-[60px] leading-[100%] lg:max-w-3xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={wordVariants} className="inline-block mr-1">
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}
