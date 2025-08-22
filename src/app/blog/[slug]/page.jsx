

// import BlogDetails from './blogDetails';

// const BASE_URL = 'https://tkclbackendev.onrender.com';
// const HEADERS = {
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/json',
//     'x-api-key': process.env.NEXT_PUBLIC_API_SECRET_KEY
//   }
// };

// export async function generateMetadata({ params }) {
//   const [blog2DRes, blog3DRes] = await Promise.all([
//     fetch(`${BASE_URL}/api/blog2d/`, { ...HEADERS, next: { revalidate: 60 } }),
//     fetch(`${BASE_URL}/api/blog3d/`, { ...HEADERS, next: { revalidate: 60 } })
//   ]);

//   const blog2D = await blog2DRes.json();
//   const blog3D = await blog3DRes.json();
//   const allBlogs = [...blog2D, ...blog3D];

//   const blog = allBlogs.find((item) => item.slug === params.slug);

//   if (!blog) {
//     return {
//       title: 'Blog Not Found',
//       description: 'The requested blog could not be found.'
//     };
//   }

//   return {
//     title: blog.metaTitle,
//     description: blog.metaDescription || blog.description?.slice(0, 160),
//     openGraph: {
//       title: blog.title,
//       description: blog.metaDescription || blog.description?.slice(0, 160),
//       images: [blog.thumb]
//     },
//     alternates: {
//       canonical: `https://thekowcompany.com/blog/${blog.slug}`
//     }
//   };
// }

// export async function generateStaticParams() {
//   const [blog2DRes, blog3DRes] = await Promise.all([
//     fetch(`${BASE_URL}/api/blog2d/`, HEADERS),
//     fetch(`${BASE_URL}/api/blog3d/`, HEADERS)
//   ]);

//   const blog2D = await blog2DRes.json();
//   const blog3D = await blog3DRes.json();
//   const allBlogs = [...blog2D, ...blog3D];

//   return allBlogs.map((item) => ({
//     slug: item.slug
//   }));
// }

// export default async function Page({ params }) {
//   const [blog2DRes, blog3DRes] = await Promise.all([
//     fetch(`${BASE_URL}/api/blog2d/`, { ...HEADERS, cache: 'no-store' }),
//     fetch(`${BASE_URL}/api/blog3d/`, { ...HEADERS, cache: 'no-store' })
//   ]);

//   const blog2D = await blog2DRes.json();
//   const blog3D = await blog3DRes.json();
//   const allBlogs = [...blog2D, ...blog3D];

//   const blog = allBlogs.find((item) => item.slug === params.slug);

//   if (!blog) return <div>Blog Not Found</div>;

//   const is2D = blog2D.some((b) => b.slug === blog.slug);

//   // Related blogs logic
//   let relatedBlogs;
//   if (is2D) {
//     relatedBlogs = blog2D
//       .filter((b) => b.slug !== blog.slug)
//       .sort((a, b) => new Date(b.date) - new Date(a.date))
//       .slice(0, 3);
//   } else {
//     relatedBlogs = blog3D
//       .filter((b) => b.slug !== blog.slug)
//       .sort((a, b) => new Date(b.date) - new Date(a.date))
//       .slice(0, 3);
//   }

//   return <BlogDetails blog={blog} is2D={is2D} relatedBlogs={relatedBlogs} />;
// }


// app/blog/[slug]/page.jsx (or .tsx)

export const revalidate = 60;           // Rebuild each slug page at most once per minute
export const dynamicParams = false;     // Optional: 404 unknown slugs when using generateStaticParams

import BlogDetails from './blogDetails';

const BASE_URL = 'https://tkclbackendev.onrender.com';
const HEADERS = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.NEXT_PUBLIC_API_SECRET_KEY
  }
};

export async function generateMetadata({ params }) {
  const [blog2DRes, blog3DRes] = await Promise.all([
    fetch(`${BASE_URL}/api/blog2d/`, { ...HEADERS, next: { revalidate: 60 } }),
    fetch(`${BASE_URL}/api/blog3d/`, { ...HEADERS, next: { revalidate: 60 } })
  ]);

  const blog2D = await blog2DRes.json();
  const blog3D = await blog3DRes.json();
  const allBlogs = [...blog2D, ...blog3D];
  const blog = allBlogs.find((item) => item.slug === params.slug);

  if (!blog) {
    return {
      title: 'Blog Not Found',
      description: 'The requested blog could not be found.'
    };
  }

  return {
    title: blog.metaTitle,
    description: blog.metaDescription || blog.description?.slice(0, 160),
    openGraph: {
      title: blog.title,
      description: blog.metaDescription || blog.description?.slice(0, 160),
      images: [blog.thumb]
    },
    alternates: {
      canonical: `https://thekowcompany.com/blog/${blog.slug}`
    }
  };
}

export async function generateStaticParams() {
  const [blog2DRes, blog3DRes] = await Promise.all([
    fetch(`${BASE_URL}/api/blog2d/`, { ...HEADERS, next: { revalidate: 60 } }),
    fetch(`${BASE_URL}/api/blog3d/`, { ...HEADERS, next: { revalidate: 60 } })
  ]);

  const blog2D = await blog2DRes.json();
  const blog3D = await blog3DRes.json();
  const allBlogs = [...blog2D, ...blog3D];

  return allBlogs.map((item) => ({ slug: item.slug }));
}

export default async function Page({ params }) {
  // IMPORTANT: no `cache: 'no-store'` here; use ISR
  const [blog2DRes, blog3DRes] = await Promise.all([
    fetch(`${BASE_URL}/api/blog2d/`, { ...HEADERS, next: { revalidate: 60 } }),
    fetch(`${BASE_URL}/api/blog3d/`, { ...HEADERS, next: { revalidate: 60 } })
  ]);

  const blog2D = await blog2DRes.json();
  const blog3D = await blog3DRes.json();
  const allBlogs = [...blog2D, ...blog3D];

  const blog = allBlogs.find((item) => item.slug === params.slug);
  if (!blog) return <div>Blog Not Found</div>;

  const is2D = blog2D.some((b) => b.slug === blog.slug);

  const pool = is2D ? blog2D : blog3D;
  const relatedBlogs = pool
    .filter((b) => b.slug !== blog.slug)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return <BlogDetails blog={blog} is2D={is2D} relatedBlogs={relatedBlogs} />;
}
