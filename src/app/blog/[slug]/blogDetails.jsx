
'use client';

import { useEffect, useRef } from 'react';
import Footer from '@/components/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaTelegramPlane } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const BlogDetails = ({ blog, is2D, relatedBlogs }) => {
  const contentRef = useRef(null);
  const imagerealDomain = 'https://tkcl-website-redesign-pure.vercel.app';
  const thumbPath = blog.thumb.trim();

  // Inject JSON-LD schema
  useEffect(() => {
    if (blog?.schema) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';

      try {
        const parsedSchema =
          typeof blog.schema === 'string'
            ? JSON.parse(blog.schema)
            : blog.schema;

        script.textContent = JSON.stringify(parsedSchema);
        document.head.appendChild(script);

        return () => {
          document.head.removeChild(script);
        };
      } catch (err) {
        console.error('Invalid JSON-LD schema:', err);
      }
    }
  }, [blog?.schema]);

  // GSAP parallax effect
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Add class to all images inside blog content
      if (contentRef.current) {
        contentRef.current.querySelectorAll('img').forEach((img) => {
          img.classList.add('parallax-img');
        });
      }

      gsap.utils.toArray('.parallax-img').forEach((img) => {
        gsap.fromTo(
          img,
          { y: '-30%', scale: 1 },
          {
            y: '30%',
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: img.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5
            }
          }
        );
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
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

  const thumbFileName = thumbPath.startsWith('http')
    ? getFileNameFromCloudinaryUrl(thumbPath)
    : thumbPath;

  // Replace Cloudinary URLs in HTML content
  const fixedHtml = blog.description
    ? blog.description
        .replace(
          /src="https:\/\/res\.cloudinary\.com[^"]*\/tkcl-backend\/blog\/([^"]+)"/g,
          `src="${imagerealDomain}/images/blog/$1"`
        )
        .replace(
          /src="https:\/\/res\.cloudinary\.com[^"]*\/tkcl-backend\/thumbnail\/([^"]+)"/g,
          `src="${imagerealDomain}/images/thumbnail/$1"`
        )
    : '';
useEffect(() => {
  const contentEl = document.querySelector('.blog-content');
  if (contentEl) {
    contentEl.querySelectorAll('img').forEach((img) => {
      if (!img.closest('.parallax-container')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'relative overflow-hidden parallax-container';
        img.parentNode.insertBefore(wrapper, img);
        wrapper.appendChild(img);

        img.classList.add(
          'parallax-img',
          'absolute',
          'inset-0',
          'w-full',
          'h-full',
          'object-cover',
          'will-change-transform'
        );
      }
    });
  }
}, [fixedHtml]);
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.utils.toArray('.parallax-container').forEach((container) => {
      const img = container.querySelector('.parallax-img');
      if (img) {
        gsap.fromTo(
          img,
          { y: '-15%', scale: 1.1 },
          {
            y: '15%',
            scale: 1.1,
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5
            }
          }
        );
      }
    });
  });

  return () => {
    ctx.revert();
    ScrollTrigger.getAll().forEach((t) => t.kill());
  };
}, [fixedHtml]);

  return (
    <div className="m-0 py-20 overflow-x-hidden ">
      {/* Title */}
      <section className="w-full py-20 px-6 text-left">
        <h1 className="title font-bold text-4xl lg:text-[100px] leading-none">{blog.title}</h1>
      </section>

     {blog.categoryBlog? (
        <div className="flex flex-wrap items-center gap-4 px-6">
        <img
          src={blog.blogerThumbnail}
          alt="Author Avatar"
          className="w-12 h-12 rounded-full border border-gray-700"
        />
        <div className="flex items-center gap-2">
          <span className="text-sm">{blog.blogerName}</span>
          <a href={blog.blogerLinkedin} className="flex items-center" aria-label="LinkedIn">
            <img src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg" alt="LinkedIn" className="w-5 h-5" />
          </a>
        </div>
        <span className="bg-green-600 text-xs px-4 py-1 rounded-full shadow-lg">
          {blog.categoryBlog}
        </span>
        <span className="text-sm text-gray-300">{blog.blogDate}</span>
      </div>
     ) : ('')}
     

      {/* Fullscreen Thumbnail */}
      <section className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden mb-8 mt-8">
        <img
          src={`${imagerealDomain}/images/thumbnail/${thumbFileName}`}
          alt={blog.title}
          className="absolute top-0 left-0 w-full h-full object-cover parallax-img will-change-transform"
        />
      </section>

      {/* ===== Content + Right Sidebar ===== */}
      <section className="px-6 blogDetail">
        <div className="mx-auto grid max-w-7xl grid-cols-12 gap-8">
          {/* LEFT: Blog content */}
          <article  ref={contentRef} 
            className="col-span-12 lg:col-span-8 space-y-10 blogcomefromAdmin"
            dangerouslySetInnerHTML={{ __html: fixedHtml }}
          />

          {/* RIGHT: Related Blogs */}
          <aside className="col-span-12 lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <h3 className="text-2xl font-semibold">
                {is2D ? 'Related 2D Blogs' : 'Related 3D Blogs'}
              </h3>
              <div className="mt-3 h-0.5 w-24 bg-gray-500/60" />
              <div className="mt-6 space-y-6">
                {relatedBlogs.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="block rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition"
                  >
                    <div className="relative h-48 bg-neutral-900">
                      <img
                        src={`${imagerealDomain}/images/thumbnail/${getFileNameFromCloudinaryUrl(
                          post.thumb
                        )}`}
                        alt={post.title}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      {post.category && (
                        <span className="inline-block bg-green-600 text-xs px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                      )}
                      <h4 className="mt-3 text-lg font-semibold leading-snug">
                        {post.title}
                      </h4>
                      <p className="mt-1 text-sm text-gray-400 line-clamp-2">
                        {post.metaDescription}
                      </p>
                      <p className="mt-3 text-xs text-gray-400">{post.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
     {
      blog.tags ?  (
        <div className="flex flex-nowrap items-center gap-2 ">
          <span className="font-semibold">Tags:</span>
          <div className="flex gap-2">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm rounded-full border border-gray-600 "
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ) : ('')
     }
        
        </div>
       
      </section>

       
      {/* Newsletter */}
      <section className="px-6 mt-10">
        <h2 className="sub-title text-3xl md:text-4xl">Newsletter Signup</h2>
        <form className="mt-4 flex w-full max-w-xl">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-grow bg-gray-300 dark:bg-[#0a0a0a] text-black dark:text-white px-5 py-4 md:px-10 md:py-7 rounded-l-full focus:outline-none"
          />
          <button
            type="submit"
            className="bg-gray-300 dark:bg-[#0a0a0a] text-black dark:text-white px-6 md:px-8 rounded-r-full hover:bg-gray-400 dark:hover:bg-gray-800 flex items-center justify-center"
          >
            <FaTelegramPlane className="text-white" />
          </button>
        </form>
      </section>

      <Footer />
    </div>
  );
};

export default BlogDetails;
