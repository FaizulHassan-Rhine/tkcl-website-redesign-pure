'use client';
 
import BlogHeader from './BlogHeader';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Footer from '../Footer';
import { useRouter } from 'next/navigation';
const Blog3D = () => {
  const blog3dApidomain = 'https://tkclbackendev.onrender.com';
  const imagerealDomaina3d = 'https://tkcl-website-redesign-pure.vercel.app';
  const [blogs3D, setBlogs3D] = useState([]);
const router = useRouter();
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const [res2D, res3D] = await Promise.all([
          fetch(`${blog3dApidomain}/api/blog2d`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': process.env.NEXT_PUBLIC_API_SECRET_KEY,
            },
          }),
          fetch(`${blog3dApidomain}/api/blog3d`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': process.env.NEXT_PUBLIC_API_SECRET_KEY,
            },
          }),
        ]);
 
        const data2D = await res2D.json();
        const data3D = await res3D.json();
 
        // Include only 2D blogs with toggle = true
        const toggled2D = data2D.filter((item) => item.toggle);
 
        const final3D = [...data3D, ...toggled2D]
          .map((item) => ({ ...item }))
          .sort((a, b) => new Date(b.date) - new Date(a.date));
 
        setBlogs3D(final3D);
      } catch (err) {
        console.error('Failed to fetch blog2d or blog3d:', err);
      }
    };
 
    fetchBlogs();
  }, []);
 
  const getFileNameFromCloudinaryUrl = (url) => {
    if (!url) return '';
    try {
      const parts = url.split('/');
      return parts[parts.length - 1];
    } catch {
      return url;
    }
  };
 
  return (
    <>
     <div className="bg-white text-black dark:bg-black dark:text-white min-h-screen py-20 px-4">
      <BlogHeader btnColor3d={true} />
      <div className="container mx-auto space-y-8">
        {/* Row 1: 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs3D.slice(0, 3).map((items, index) => (
            <Link href={`/blog/${items.slug}`} key={`top-${index}`} prefetch // ⬅️ be explicit
              onMouseEnter={() => router.prefetch(`/blog/${items.slug}`)} aria-label="blog post">
              <div className="card_of_blog justify-center border-0 p-0 rounded-lg">
                <div className="cardImage">
                  <div className="relative w-full aspect-[16/9]">
                    <img
                      src={`https://thekowcompany.com/images/thumbnail/${getFileNameFromCloudinaryUrl(items.thumb)}`}
                      alt={items.title}
                      className="w-full h-[300px] object-fill"
                    />
                  </div>
                </div>
                <div className="cardCaption ps-4 pt-2 pb-5 pe-5">
                  <h2 className="text-lg font-semibold line-clamp-2">{items.title}</h2>
                  <p className="text-sm text-gray-400 mt-1">{items.date}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
 
        {/* Row 2: 2 wide cards */}
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-8">
          {blogs3D.slice(3, 5).map((items, index) => (
            <Link href={`/blog/${items.slug}`} key={`wide-${index}`} prefetch // ⬅️ be explicit
              onMouseEnter={() => router.prefetch(`/blog/${items.slug}`)} aria-label="blog post">
              <div className="card_of_blog justify-center border-0 p-0 rounded-lg flex flex-col lg:flex-col overflow-hidden">
                <div className="cardImage">
                  <div className="relative w-full aspect-[16/9]">
                    <img
                      src={`https://thekowcompany.com/images/thumbnail/${getFileNameFromCloudinaryUrl(items.thumb)}`}
                      alt={items.title}
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="cardCaption ps-4 pt-3 pb-5 pe-5">
                  <h2 className="text-lg font-semibold line-clamp-2">{items.title}</h2>
                  <p className="text-sm text-gray-400 mt-1">{items.date}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
 
        {/* Remaining cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs3D.slice(5).map((items, index) => (
            <Link href={`/blog/${items.slug}`} key={`rest-${index}`} prefetch // ⬅️ be explicit
              onMouseEnter={() => router.prefetch(`/blog/${items.slug}`)} aria-label="blog post">
              <div className="card_of_blog justify-center border-0 p-0 rounded-lg">
                <div className="cardImage">
                  <div className="relative w-full aspect-[16/9]">
                    <img
                      src={`https://thekowcompany.com/images/thumbnail/${getFileNameFromCloudinaryUrl(items.thumb)}`}
                      alt={items.title}
                      className="w-full h-[300px] object-fill"
                    />
                  </div>
                </div>
                <div className="cardCaption ps-4 pt-2 pb-5 pe-5">
                  <h2 className="text-lg font-semibold line-clamp-2">{items.title}</h2>
                  <p className="text-sm text-gray-400 mt-1">{items.date}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
    <Footer />
    </>
   
  );
};
 
export default Blog3D;