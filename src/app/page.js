'use client';

import Hero from '@/components/Hero';
import InfiniteLine from '@/components/InfiniteLine';

export default function HomePage() {


  return (
    <>
      <main className="pt-20 space-y-40 transition-colors duration-500">
        {/* Hero Section - Dark mode preview */}
       
        <section >
          <div className='flex justify-center gap-20 items-center '>
            <div>
              <h1 className='text-[70px] leading-[120%]'>Bring your visuals to life with expert 2D Image Editing Stunning 3D Post-Production</h1>
            </div>
            <div>
              <div className='flex justify-center gap-10 items-center'>
                <div>
                  <h1 className='text-[90px]'>24/7</h1>
                  <p>We’re here for you 24/7—anytime, anywhere.</p>
                </div>
                <div>
                  <h1 className='text-[90px]'>100%</h1>
                  <p>Guaranteed 100% on-time delivery, every time.</p>
                </div>
              </div>
              <div className = "mt-10">
                <h1>Attention : This section is temporary.</h1>
                <p>We updated the Next.js library to follow Google’s new rules. It can now check if content (like text or blogs) is made by AI with about 99% accuracy for text and 70% for images. Before uploading any text or blog, please check it with QuillBot and Grammarly to avoid being flagged as 0% AI-generated. Otherwise, thekowcompany.com could lose SEO ranking.</p>
              </div>
            </div>
          </div>
        </section>


        <Hero />

        <InfiniteLine/>

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
