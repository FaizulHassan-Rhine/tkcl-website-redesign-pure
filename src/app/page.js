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
                  <h1 className='text-[90px] text-green-500'>24/7</h1>
                  <p>We’re here for you 24/7—anytime, anywhere.</p>
                </div>
                <div>
                  <h1 className='text-[90px] text-green-500'>100%</h1>
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

       <FeaturedWork/>

       <ServicesSection/>

       <ClientBrand/>

       <ScrollTitle/>

       


        <NoteSection/>

        <ParallaxImageSection/>
       
        <Footer/>
      </main>
    </>
  );
}
