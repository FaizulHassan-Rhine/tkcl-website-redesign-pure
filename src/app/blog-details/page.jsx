'use client';

import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import Footer from '@/components/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaTelegramPlane } from 'react-icons/fa';
import FooterGrid from '@/components/FooterNew';

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  useEffect(() => {
    const ctx = gsap.context(() => {
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
              scrub: 1.5,
            },
          }
        );
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const images = [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1000&q=80',
    'https://images.unsplash.com/photo-1569596082827-c5e8990496cb?w=1000&q=80',
    'https://images.unsplash.com/photo-1587932775991-708a20af2cc2?w=1000&q=80',
    'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=1000&q=80',
    'https://images.unsplash.com/photo-1623166200209-6bd48520d6cb?w=1000&q=80',
    'https://images.unsplash.com/photo-1532587459811-f057563d1936?w=1000&q=80',
  ];

  const tags = ['3D', 'Modeling', 'CAD'];

  const related = [
    {
      id: 1,
      tag: '3D RENDERING',
      title: 'What Is 3D Rendering? Explore Benefits And...',
      excerpt:
        'Discover how 3D rendering transforms ideas into compelling visuals.',
      date: '11 June, 2025',
      img: 'https://placehold.co/780x550/0B0B0B/AAAAAA?text=780X550&font=montserrat',
    },
    {
      id: 2,
      tag: 'PHOTO EDITING',
      title: 'What Is Photo Editing? Everything You Need To...',
      excerpt: 'Learn the fundamentals of photo editing and essential workflows.',
      date: '4 June, 2025',
      img: 'https://placehold.co/780x550/0B0B0B/AAAAAA?text=780X550&font=montserrat',
    },
    {
      id: 3,
      tag: 'CGI',
      title: 'CGI vs Traditional Photography: When To Use Which',
      excerpt: 'A practical guide to choosing CGI over on-set photo shoots.',
      date: '28 May, 2025',
      img: 'https://placehold.co/780x550/0B0B0B/AAAAAA?text=780X550&font=montserrat',
    },
  ];

  return (
    <div className="m-0 py-20 overflow-x-hidden">
      {/* Title */}
      <section className="w-full py-20 px-6 text-left">
        <h1 className="title font-bold text-4xl lg:text-[100px]">
          Why and How 3D Rendering Enhances Product Marketing
        </h1>
      </section>

      {/* Meta Row */}
      <div className="flex flex-wrap items-center gap-4 px-6">
        <img
          src="/image/image-1.webp"
          alt="Author Avatar"
          className="w-12 h-12 rounded-full border border-gray-700"
        />
        <div className="flex items-center gap-2">
          <span className="text-sm">By Nabiha Shreya</span>
          <a href="#" className="flex items-center" aria-label="LinkedIn">
            <img src="/linkedin-icon.svg" alt="LinkedIn" className="w-5 h-5" />
          </a>
        </div>
        <span className="bg-green-600 text-xs px-4 py-1 rounded-full shadow-lg">
          3D MODELING
        </span>
        <span className="text-sm text-gray-300">15/01/2025</span>
      </div>

      {/* Fullscreen Image */}
      <section className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden mb-8 mt-8">
        <img
          src={images[0]}
          alt="Fullscreen Visual"
          className="absolute top-0 left-0 w-full h-full object-cover parallax-img will-change-transform"
        />
      </section>

      {/* ===== Content + Right Sidebar (Related) ===== */}
      <section className="px-6">
        <div className="mx-auto grid max-w-7xl grid-cols-12 gap-8">
          {/* LEFT: Article body */}
          <article className="col-span-12 lg:col-span-8 space-y-10">
            {/* Intro paragraph */}
            <section className="w-full">
              <div className="max-w-2xl">
                <p className="text-lg md:text-xl leading-relaxed">
                  3D modeling changed the way we can see and interact with
                  digital data. It allows designers to create photo-realistic,
                  textured models of objects from the real or imaginary world
                  for contact, design, and storytelling purposes across various
                  industries. From high-fidelity product visualization to
                  interactive scenes in animation, video games, and
                  architecture, 3D models offer outstanding flexibility and
                  depth.
                </p>
              </div>
            </section>

            {/* Split section */}
            <section className="w-full flex flex-col md:flex-row gap-5 h-auto">
              <div className="w-full md:w-1/2 relative overflow-hidden h-[40vh] md:h-[50vh]">
                <img
                  src={images[1]}
                  alt="Wide"
                  className="absolute inset-0 w-full h-full object-cover parallax-img will-change-transform"
                />
              </div>
              <div className="w-full md:w-1/2">
                <p className="text-lg md:text-xl leading-relaxed">
                  With the dawn of augmented reality (AR), virtual reality (VR),
                  and emerging digital manufacturing technology such as 3D
                  printing, the use of 3D modeling has surpassed mere design.
                  Whether you're creating assets for a VR simulation, creating a
                  mechanical model, or setting up realistic characters for a
                  movie, embracing the right approach to 3D modeling is the key
                  to productivity, precision, and elegance. This article covers
                  all types of 3D modeling, their applications, benefits, and
                  tips for choosing the best technique for your needs. We'll
                  explore traditional polygonal modeling and AI-assisted design,
                  equipping you with the knowledge to make informed decisions in
                  your 3D modeling projects for your needs.
                </p>
              </div>
            </section>

            {/* Subsection */}
            <section className="w-full">
              <div className="max-w-2xl">
                <h2 className="sub-title text-3xl md:text-4xl mb-4">
                  How Does 3D Modeling Work?
                </h2>
                <p className="text-lg md:text-xl leading-relaxed">
                  With the dawn of augmented reality (AR), virtual reality (VR),
                  and emerging digital manufacturing technology such as 3D
                  printing, the use of 3D modeling has surpassed mere design.
                  Whether you're creating assets for a VR simulation, creating a
                  mechanical model, or setting up realistic characters for a
                  movie, embracing the right approach to 3D modeling is the key
                  to productivity, precision, and elegance.
                </p>
                <p className="text-lg md:text-xl leading-relaxed mt-4">
                  This article covers all types of 3D modeling, their
                  applications, benefits, and tips for choosing the best
                  technique for your needs. We'll explore traditional polygonal
                  modeling and AI-assisted design, equipping you with the
                  knowledge to make informed decisions in your 3D modeling
                  projects for your needs.
                </p>
                <p className="text-lg md:text-xl leading-relaxed mt-4">
                  3D modeling changed the way we can see and interact with
                  digital data. It allows designers to create photo-realistic,
                  textured models of objects from the real or imaginary world
                  for contact, design, and storytelling purposes across various
                  industries. From high-fidelity product visualization to
                  interactive scenes in animation, video games, and
                  architecture, 3D models offer outstanding flexibility and
                  depth.
                </p>

                <h3 className="sub-title text-3xl md:text-4xl mt-10 mb-4">
                  Core Implementation Techniques
                </h3>
                <div className="space-y-4 text-base md:text-lg leading-relaxed">
                  <p>
                    <strong>Polygonal Modeling:</strong> The most widely used 3D
                    technique, building objects from interconnected polygons
                    (triangles/quads). Great for games and archviz.
                  </p>
                  <p>
                    <strong>NURBS Modeling:</strong> Uses mathematical curves
                    for smooth, precise geometry—perfect for soft, flowing
                    surfaces and exact definitions.
                  </p>
                  <p>
                    <strong>Parametric/CAD Modeling:</strong> Feature-based and
                    constraint-driven; edits to parameters update the model
                    automatically—ideal for engineering precision.
                  </p>
                  <p>
                    <strong>Implicit Surface Modeling:</strong> Defines surfaces
                    with fields and equations to create smooth organic forms.
                  </p>
                  <p>
                    <strong>Metaball/Blobby Modeling:</strong> Blending
                    spherical influence fields to form fluid, continuous shapes
                    suited to organic assets.
                  </p>
                </div>
              </div>
            </section>

            {/* Two images row */}
            <section className="w-full flex flex-col md:flex-row gap-5">
              {[images[1], images[2]].map((img, i) => (
                <div
                  key={i}
                  className="w-full md:w-1/2 relative overflow-hidden h-[40vh] md:h-[50vh]"
                >
                  <img
                    src={img}
                    alt={`Three Col ${i + 1}`}
                    className="absolute inset-0 w-full h-full object-cover parallax-img will-change-transform"
                  />
                </div>
              ))}
            </section>

            {/* Outro paragraph */}
            <section className="w-full">
              <div className="max-w-2xl">
                <p className="text-lg md:text-xl leading-relaxed">
                  Grasping the various types of 3D modeling is crucial for
                  technical precision, enhancing creativity, optimizing
                  workflows, and meeting modern standards. From low-poly assets
                  optimized for gaming to high-precision CAD models used in
                  engineering, the modeling technique you choose directly
                  impacts the functionality, appearance, and efficiency of your
                  project. Whether you're a startup launching a new product, an
                  architect pitching a concept, or a marketer looking to stand
                  out with photorealistic 3D content, there's a KOW solution
                  tailored just for you.
                </p>
              </div>
            </section>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 text-white">
              <span className="font-semibold">Tags:</span>
              <div className="flex gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm rounded-full border border-gray-600 text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-10">
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
            </div>
          </article>

          {/* RIGHT: Related Blogs */}
          <aside className="col-span-12 lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <h3 className="text-2xl font-semibold">Related Blogs</h3>
              <div className="mt-3 h-0.5 w-24 bg-gray-500/60" />

              <div className="mt-6 space-y-6">
                {related.map((post) => (
                  <a
                    key={post.id}
                    href="#"
                    className="block rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition"
                  >
                    <div className="relative h-48 bg-neutral-900">
                      <img
                        src={post.img}
                        alt={post.title}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>

                    <div className="p-4 bg-black">
                      <span className="inline-block bg-green-600 text-xs px-3 py-1 rounded-full">
                        {post.tag}
                      </span>

                      <h4 className="mt-3 text-lg font-semibold leading-snug">
                        {post.title}
                      </h4>

                      <p className="mt-1 text-sm text-gray-400 line-clamp-2">
                        {post.excerpt}
                      </p>

                      <p className="mt-3 text-xs text-gray-400">{post.date}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* <Footer /> */}
      <FooterGrid/>
    </div>
  );
}
