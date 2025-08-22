'use client';

import FeaturedWork from '@/components/FeatureWork';
import Hero from '@/components/Hero';
import InfiniteLine from '@/components/InfiniteLine';
import ParallaxImageSection from '@/components/ParallaxImageSection';
import ScrollTitle from '@/components/ScrollTitle';
import OurClient from '@/components/OurClient';
import FooterGrid from '@/components/FooterNew';
import NoteSectionNew from '@/components/NoteSectionNew';
import ServicesSectionNew from '@/components/ServiceSectionNew';
import AnimatedHeadline from '@/components/Headline';
import HeroNew from '@/components/HeroNew';
import SecondHero from '@/components/SecondHero';
import ClientBrand from '@/components/ClientBrand';
import Retouched from '@/components/Retouched';
import HoloSnap from '@/components/Holosnap';
import HeroSection from '@/components/HeroText';
import OurClientNew from '@/components/OurClientNew';
import homePageSchema from '@/seo/homePageSchema'
import Script from 'next/script';
export default function Page() {
  return (
    <main className="pt-20 space-y-20 transition-colors duration-500">
      {/* Hero Section */}
      <section>
        <div className="flex flex-col  md:flex-row justify-between gap-6 lg:gap-20 items-start ">
          
          {/* <AnimatedHeadline/> */}
          <HeroSection/>

         {/* <div className='flex flex-col items-center md:pt-20 md:items-start'>
           <div className="flex justify-center gap-10 items-center">
            <div className='leading-[280%]'>
              <h1 className="text-[32px] sm:text-[48px] md:text-[40px] lg:text-[50px] 2xl:text-[70px] title ">24/7</h1>
              <p className="text-[12px] leading-4 sm:leading-5 lg:leading-7 2xl:leading-10  text-body sm:text-[16px] md:text-[12px] lg:text-[16px]">Ready for you every second.</p>
            </div>
            <div className='leading-[280%]'>
              <h1 className="text-[32px] sm:text-[48px] md:text-[40px] lg:text-[50px] 2xl:text-[70px] title">30,000+</h1>
              <p className="text-[12px] leading-4 lg:leading-7 2xl:leading-10 text-body sm:text-[16px] md:text-[12px] lg:text-[16px]">Processing over 30,000 assets every day.</p>
            </div>
          </div>

          <div className="mt-5 max-w-xl">
            <p className="text-[12px] lg:text-[14px] 2xl:text-[20px] text-body ">
              The KOW Company is revolutionizing the world of content every second. Image retouching has become more accessible
              with our extraordinary pool of retouchers and AI software built in-house. We have not stopped there; we are producing
              3D models at scale with software-driven solutions that save your time and provide top-notch experiences. We are scaling
              up every day, as we are trusted by big brands, studios, and retailers worldwide. We ensure the visibility of your assets
              by meticulously crafting each piece of content the right way.
            </p>
          </div>
         </div> */}
        </div>
      </section>

      {/* <Hero /> */}
      {/* <HeroNew/> */}
      {/* <InfiniteLine /> */}
      <SecondHero/>
      <FeaturedWork />
      <Retouched/>
      <HoloSnap/>
      {/* <ServicesSectionNew /> */}
      {/* <OurClient /> */}
      <OurClientNew/>
      {/* <ClientBrand/> */}
      <ScrollTitle />
      <NoteSectionNew />
      <ParallaxImageSection />
      <FooterGrid />
      <Script id="homePage-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(homePageSchema)}
    </Script>
    </main>
  );
}
