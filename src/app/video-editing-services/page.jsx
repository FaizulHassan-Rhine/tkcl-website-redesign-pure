// components/VideoGrid.jsx
"use client";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/Faq";
import FooterGrid from "@/components/FooterNew";
import React, { useEffect, useState } from "react";

const videos = [
  { srcWebm: "/videos/audio-level.webm", title: "Audio Editing Service ", subtitle: "Our Audio Editing Service elevates the quality of sound to the professional standard of your photographs. We normalize audio, remove distracting noise, and add music or effects to create a clear, compelling listening experience for your audience. " },

  { srcWebm: "/videos/crop.webm", title: "Video Cropping Service", subtitle: "Our Video Cropping Service sizes your video to suit any screen or platform without losing important visual information. We crop aspect ratios for Facebook, websites, and presentations while keeping your images professional and clear." },
  { srcWebm: "/videos/subtitle.webm", title: "Subtitle Addition Service ", subtitle: "Our Subtitle Addition Service enhances your visibility and access for your video with the addition of proper, up-to-date subtitles. We use subtitles to preserve your brand tone, improve your audience comprehension, and meet accessibility needs for international viewers." },
  { srcWebm: "/videos/title.webm", title: "Title Addition Service", subtitle: "With our Title Addition Service, we design impactful titles, openings, and lower-thirds that grab your viewer's attention right away. From compelling opening sequences to crisp lower-thirds, we design titles that have an effect and boost your brand recognition." },
];

export default function VideoGrid() {
 
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [faqLoading, setFaqLoading] = useState(false);
      const [service, setService] = useState(null);
   
    // IMPORTANT: Next.js only inlines env vars with direct property access.
    // Do NOT access via dynamic key like process.env[service.faqApi.env] on the client.
    const API_KEY = process.env.NEXT_PUBLIC_API_SECRET_KEY;
    useEffect(() => {
      if (!service || !service.faqApi) return;
      const loadFaqs = async () => {
        try {
          setFaqLoading(true);
          const headers = { Accept: 'application/json' };
          if (service.faqApi?.headerKey && API_KEY) {
            headers[service.faqApi.headerKey] = API_KEY;
          }
          const res = await fetch(service.faqApi.url, { headers });
          if (!res.ok) throw new Error('FAQ HTTP ' + res.status);
          const data = await res.json();
          setFaqs(data);
        } catch (e) {
          // Silently ignore but render fallback (no FAQs)
        } finally {
          setFaqLoading(false);
        }
      };
      loadFaqs();
    }, [service]);
  
  
  return (
    <>
      <div className="container mx-auto py-20">
        <h1 className="text-[32px] md:text-[48px] xl:text-[100px] mb-6 lg:mb-20 font-semibold title text-center">
          Video Editing Services
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16  md:mx-10">
          {videos.map((item, idx) => (
            <div key={`${item.title}-${idx}`} className="space-y-2">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                controls={false}
                className="block w-full rounded-lg shadow-sm ring-1 ring-black/5 object-cover"
              >
                <source src={item.srcWebm} type="video/webm" />
              </video>

              <h1 className="text-[24px] lg:text-[32px] font-semibold sub-title">
                {item.title}
              </h1>
              <p className="text-body">{item.subtitle}</p>
            </div>
          ))}
        </div>
        <section className="w-full h-full md:px-20 py-10 mx-auto ">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-40">
                <div className="flex flex-col space-y-2">
                  <h2 className="text-[32px] md:text-[40px] lg:text-[60px] title font-bold text-left">FAQ</h2>
                  {faqLoading && <p className="mt-6 opacity-70">Loading FAQs…</p>}
                  <div className="mt-10 w-full mx-auto divide-y divide-black dark:divide-white/10">
                    {!faqLoading && faqs?.length > 0 && <FAQ faqs={faqs} />}
                    {!faqLoading && (!faqs || faqs.length === 0) && <p className="opacity-70">No FAQs available.</p>}
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <h2 className="text-[32px] md:text-[40px] lg:text-[60px] title font-bold text-left">CONTACT US</h2>
                  <ContactForm />
                </div>
              </div>
            </section>
      </div>
      
      <FooterGrid />
    </>
  );
}
