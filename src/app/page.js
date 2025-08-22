
import Script from 'next/script';
import { metadata as pageMeta } from '@/seo/metadatas';
import HomePageClient from './homePageClient';

export const metadata = {
  title: pageMeta.home.title,
  description: pageMeta.home.description,
  alternates: {
    canonical: pageMeta.home.link,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "CreativeWork", "Organization"],
  "name": "The KOW Company",
  "image": "https://thekowcompany.com/assets/logo3-Bkc5zET8.png",
  "logo": "https://thekowcompany.com/assets/logo3-Bkc5zET8.png",
  "@id": "https://thekowcompany.com/",
  "url": "https://thekowcompany.com/",
  "telephone": "+88 02 55013583",
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "info@thekowcompany.com",
    "telephone": "+88 02 55013583",
    "contactType": "customer service",
    "areaServed": "Worldwide"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Plot:06, 2nd Floor, Navana, D. H. Tower, Panthapath",
    "addressLocality": "Dhaka",
    "postalCode": "1215",
    "addressCountry": "BD"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 23.7505078,
    "longitude": 90.3920982
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
    ],
    "opens": "00:00",
    "closes": "24:00"
  },
  "sameAs": [
    "https://www.facebook.com/KOWCompany",
    "https://twitter.com/the_kow_company",
    "https://www.youtube.com/channel/UCCXAA-Q_f0uuvG8RqW0HRYQ",
    "https://www.linkedin.com/company/the-kow-company/",
    "https://thekowcompany.com/"
  ],
  "description": "The KOW Company has etched its name as a leading E-commerce and Studio Image & 3D Post-Production player...",
  "hasPart": [
    {
      "@type": "WebPage",
      "name": "Professional 2D Photo Editing Services",
      "url": "https://thekowcompany.com/2d-photo-editing"
    },
    {
      "@type": "WebPage",
      "name": "Expert 3D Modeling and Rendering Services",
      "url": "https://thekowcompany.com/3d-modeling-and-rendering"
    },
    {
      "@type": "WebPage",
      "name": "Book A Call",
      "url": "https://thekowcompany.com/book-a-call"
    },
    {
      "@type": "WebPage",
      "name": "Partnership and Integration",
      "url": "https://thekowcompany.com/integrations-and-partnership"
    },
    {
      "@type": "WebPage",
      "name": "Onboarding",
      "url": "https://thekowcompany.com/onboarding"
    },
    {
      "@type": "WebPage",
      "name": "Career",
      "url": "https://thekowcompany.com/career/"
    },
    {
      "@type": "WebPage",
      "name": "Contact Us",
      "url": "https://thekowcompany.com/contact-us/"
    },
    {
      "@type": "WebPage",
      "name": "Blogs",
      "url": "https://thekowcompany.com/blog/"
    }
  ],
  "video": {
    "@type": "VideoObject",
    "name": "The KOW Company Main Intro Video",
    "description": "An introductory video about The KOW Company...",
    "thumbnailUrl": "https://thekowcompany.com/video/loading-image.webp",
    "uploadDate": "2025-03-28T04:00:00+06:00",
    "contentUrl": "https://thekowcompany.com/video/main_video.webm",
    "embedUrl": "https://thekowcompany.com/video/main_video.webm",
    "encodingFormat": "video/webm"
  }
};

export default function Page() {
  return (
    <>
      {/* Inject JSON-LD in <head> using next/script */}
      <Script
        id="structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <HomePageClient />
    </>
  );
}
