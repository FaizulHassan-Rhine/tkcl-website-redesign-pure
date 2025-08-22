import FooterGrid from "@/components/FooterNew";
import React from "react";
import { metadata as pageMeta } from '@/seo/metadatas';
import schema3D from "@/seo/shcema3d"
import Script from "next/script"

export const metadata = {
  title: pageMeta.threeMR.title,
  description: pageMeta.threeMR.description,
  alternates: {
    canonical: pageMeta.threeMR.link,
  },
};

const models = [
  {
    title: "Interior Visualization",
    src: "https://sketchfab.com/models/7a568cc0d0ca4c848103cf42b0a6a525/embed",
  },
  {
    title: "Exterior Visualization",
    src: "https://sketchfab.com/models/432e1295065b487590d6851a52634181/embed",
  },

  {
    title: "Packaging",
    src: "https://sketchfab.com/models/4d1a1935d61246fd98b58e24c0536746/embed",
  },
  {
    title: "Tech Accessories",
    src: "https://sketchfab.com/models/ab22ab43125e432cade21bb10f1ea24f/embed",
  },
  {
    title: "Furniture",
    src: "https://sketchfab.com/models/ff101cef30c140eb8f6893898aa5ca2f/embed",
  },
  // {
  //   title: "Fashion Accessories",
  //   src: "https://sketchfab.com/models/f30ed2d5db0c43a9a54d6d39f7a35358/embed",
  // },
  {
    title: "Fashion Accessories",
    src: "https://sketchfab.com/models/258b85f028f84d25a672d44cf4cacfb5/embed",
  },
  {
    title: "Tech Equipment ",
    src: "https://sketchfab.com/models/901e0858c5dc4924b572728f008bf68d/embed",
  },
    {
    title: "Cosmetics",
    src: "https://sketchfab.com/models/e5c03e987c5a4542b6ff73332ff980e3/embed",
  },
];

function ModelCard({ title, src }) {
  return (
    <div className="flex flex-col items-start">
      <div className="rounded-2xl overflow-hidden w-full shadow-sm ring-1 ring-black/5">
        <div className="aspect-[16/9]">
          <iframe
            title={title}
            src={src}
            frameBorder="0"
            allow="autoplay; fullscreen; xr-spatial-tracking"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </div>
      <div className="mt-3 font-semibold text-[20px] sub-title md:text-[32px] text-left">
        {title}
      </div>
    </div>
  );
}

function ShowcaseSection({ heading, items, subtitle }) {
  return (
    <section className="container mx-auto py-12 sm:py-16">
      <h3 className="text-2xl title sm:text-3xl md:text-[40px] font-bold tracking-tight text-left mb-8">
        {heading}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-20  mx-auto">
        {items.map((m, i) => (
          <ModelCard key={`${m.title}-${i}`} title={m.title} src={m.src} />
        ))}
      </div>

      <p className="mt-6 text-center text-sm   max-w-3xl mx-auto">
        {subtitle}
      </p>
    </section>
  );
}

export default function ThreeDShowcase() {
  const firstTwo = models.slice(0, 2);
  const lastFour = models.slice(2, 9);

  return (
    <>
      <section className=" py-16 sm:py-20 px-4">
        <h2 className="text-[40px] sm:text-[60px] md:text-[80px] lg:text-[100px] title py-4 font-bold text-center">
          3D & CGI
        </h2>

        <ShowcaseSection
          heading="Architectural Visualization"
          items={firstTwo}
          
        />

        <ShowcaseSection
          heading="Product Visualization"
          items={lastFour}
          
        />
      </section>

      <FooterGrid />
       <Script id="3d-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(schema3D)}
    </Script>
    </>
  );
}
