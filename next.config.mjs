import withBundleAnalyzer from '@next/bundle-analyzer'
 
const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
     serverActions: true,
    // কোনো legacyBrowsers বা browsersListForSwc এখানে থাকবে ন
  },
  //  images: {
  //   domains: ['https://tkclbackend.fly.dev'], //
  // },
async rewrites() {
    return [
   {
  source: '/images/thumbnail/:path*',
  destination: 'https://res.cloudinary.com/ddxclmrfh/image/upload/tkcl-backend/thumbnail/:path*',
},
{
  source: '/images/blog/:path*',
  destination: 'https://res.cloudinary.com/ddxclmrfh/image/upload/tkcl-backend/blog/:path*',
},
{
      source: '/2D_Portfolio.pdf',  // <-- only the path on your site
      destination: 'https://demo.thekowcompany.com/2D_Portfolio.pdf', // backend file URL
    },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'thekowcompany.com',
        pathname: '/images/**',
      },
      {
      protocol: 'https',
      hostname: 'res.cloudinary.com',
      pathname: '/**',   // ✅ Cloudinary এর সব ইমেজ
    },
    ],
  },
  async redirects() {
    return [
     
      {
        source: '/2d',
        destination: '/2d-photo-editing',
        permanent: true,
      },
      {
        source: '/3d',
        destination: '/3d-modeling-and-rendering',
        permanent: true,
      },
      {
        source: '/integrations',
        destination: '/integrations-and-partnership',
        permanent: true,
      },
      {
        source: '/landing-contact-us-2',
        destination: '/contact-us',
        permanent: true,
      },
      {
        source: '/landing-contact-us-3',
        destination: '/contact-us',
        permanent: true,
      },
      {
        source: '/landing-contact-us-4',
        destination: '/contact-us',
        permanent: true,
      },
      {
        source: '/3d/industry-trends',
         destination: '/blog/3d',
        permanent: true,
      },
       {
        source: '/3d/industry-trends-details/1',
         destination: '/blog/ecommerce-ai-3d-design-trends',
        permanent: true,
      },
       {
        source: '/3d/industry-trends-details/2',
         destination: '/blog/ecommerce-ai-3d-market-trends',
        permanent: true,
      },
       {
        source: '/3d/industry-trends-details/3',
         destination: '/blog/ai-retail-revolution-personalization-bi-3d',
        permanent: true,
      },
       {
        source: '/3d/industry-trends-details/4',
         destination: '/blog/ai-retail-revolution-personalization-bi',
        permanent: true,
      },
       {
        source: '/3d/industry-trends-details/5',
         destination: '/blog/deep-learning-3d-model-creation',
        permanent: true,
      },
      {
        source: '/3d/industry-trends-details/6',
         destination: '/blog/holosnap-3d-generative-modeling',
        permanent: true,
      },
      {
        source: '/3d/industry-trends-details/7',
         destination: '/blog/acceptance-of-3d-content-retail',
        permanent: true,
      },
      {
        source: '/3d/industry-trends-details/8',
         destination: '/blog/adaptation-with-3d-content-retail',
        permanent: true,
      },
      {
        source: '/3d/industry-trends-details/9',
         destination: '/blog/2d-3d-ai-creativity-retail-innovation',
        permanent: true,
      },
      {
        source: '/3d/industry-trends-details/10',
         destination: '/blog/3d-marketing-how-brands-captivate-customers',
        permanent: true,
      },
      {
        source: '/3d/industry-trends-details/11',
         destination: '/blog/top-3d-design-software-picks',
        permanent: true,
      },
       {
        source: '/2d/industry-trends',
         destination: '/blog/2d',
        permanent: true,
      },
       {
        source: '/2d/industry-trends-details/1',
         destination: '/blog/ai-automation-image-processing-trends',
        permanent: true,
      },
       {
        source: '/2d/industry-trends-details/2',
         destination: '/blog/retouched-ai-high-end-background-removal',
        permanent: true,
      },
       {
        source: '/2d/industry-trends-details/3',
         destination: '/blog/importance-of-background-removal-for-ecommerce',
        permanent: true,
      },
       {
        source: '/2d/industry-trends-details/4',
         destination: '/blog/visual-storytelling-2d-revolution-marketing',
        permanent: true,
      },
       {
        source: '/2d/industry-trends-details/5',
         destination: '/blog/easy-product-photography-for-small-business',
        permanent: true,
      },
      {
        source: '/blog/easy-product-photography-for-small-business',
         destination: '/blog/commercial-product-photography-guide',
        permanent: true,
      }
     
     
    ]
  },
}
 
export default bundleAnalyzer(nextConfig)