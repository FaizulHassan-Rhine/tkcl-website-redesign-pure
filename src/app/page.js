'use client';

import Hero from '@/components/Hero';

export default function HomePage() {
 

  return (
    <>
    <main className="pt-20 space-y-40 transition-colors duration-500">
      {/* Hero Section - Dark mode preview */}
      <Hero/>
      <section className="h-screen flex items-center justify-center bg-white text-black dark:bg-gray-700 dark:text-white transition-colors duration-500">
        <h1 className="text-4xl font-bold">🌗 Dark Mode Ready</h1>
      </section>
   
      <Hero/>

      {/* Info Section */}
      <section className="h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-zinc-800 text-black dark:text-white transition-colors duration-500">
        <h1 className="text-5xl font-bold">🪶 ScrollTrigger + Lenis</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
          Scroll down to animate elements
        </p>
      </section>

      {/* Animated Section 2 */}
      <section
      
        className="h-screen flex items-center justify-center bg-green-100 dark:bg-emerald-900 text-black dark:text-white transition-colors duration-500"
      >
        <h2 className="text-4xl font-semibold">✨ Fade + Slide Up</h2>
      </section>

      {/* Animated Section 3 */}
      <section
       
        className="h-screen flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-black dark:text-white transition-colors duration-500"
      >
        <h2 className="text-4xl font-semibold">🚀 Slide In From Left</h2>
      </section>
    </main>
    </>
  );
}
