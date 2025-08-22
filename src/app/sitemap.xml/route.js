// // src/app/sitemap.xml/route.js

// import { metadata } from '@/seo/metadatas';
// import fs from 'fs';



// export async function GET() {
//   const baseUrl = 'https://thekowcompany.com';

//   // Read blog JSON files
//   const blog2D = JSON.parse(fs.readFileSync('public/data/blog2D.json'));
//   const blog3D = JSON.parse(fs.readFileSync('public/data/blog3D.json'));
//   const allBlogs = [...blog2D, ...blog3D];

//   // Slugify like in [slug]/page.js
//   const blogPages = allBlogs.map((item) => {
//     const slug = item.slug;
//     return {
//       loc: `${baseUrl}/blog/${slug}`,
//       lastmod: new Date().toISOString().split('T')[0],
//     };
//   });

//   // Static pages from metadata
//   const staticPages = Object.values(metadata).map((page) => ({
//     loc: page.link,
//     lastmod: new Date().toISOString().split('T')[0],
//   }));

//   const urls = [...staticPages, ...blogPages];

//   // Build XML
//   const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
// <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
// ${urls
//   .map(
//     (url) => `
//   <url>
//     <loc>${url.loc}</loc>
//     <lastmod>${url.lastmod}</lastmod>
//   </url>`
//   )
//   .join('')}
// </urlset>`;

//   return new Response(sitemap, {
//     headers: {
//       'Content-Type': 'application/xml',
//     },
//   });
// }


// src/app/sitemap.xml/route.js

import { metadata } from '@/seo/metadatas';

const BASE_URL = 'https://thekowcompany.com';
const API_URL = 'https://tkclbackendev.onrender.com';
const API_KEY = process.env.NEXT_PUBLIC_API_SECRET_KEY;

export async function GET() {
  try {
    // Fetch 2D and 3D blogs from secured backend API
    const [res2D, res3D] = await Promise.all([
      fetch(`${API_URL}/api/blog2d`, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        cache: 'no-store'
      }),
      fetch(`${API_URL}/api/blog3d`, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        cache: 'no-store'
      }),
    ]);

    const blog2D = await res2D.json();
    const blog3D = await res3D.json();
    const allBlogs = [...blog2D, ...blog3D];

    // Slugs for blogs
    const blogPages = allBlogs.map((item) => ({
      loc: `${BASE_URL}/blogs/${item.slug}`,
      lastmod: new Date().toISOString().split('T')[0],
    }));

    // Static pages
    const staticPages = Object.values(metadata).map((page) => ({
      loc: page.link,
      lastmod: new Date().toISOString().split('T')[0],
    }));

    const urls = [...staticPages, ...blogPages];

    // Build XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
  </url>`
  )
  .join('')}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response('Failed to generate sitemap', { status: 500 });
  }
}
