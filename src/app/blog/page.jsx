'use client';

import React, { useState } from 'react';
import clsx from 'clsx';

const tabs = ['All', '3D', 'Photo', 'Ecom'];

const blogs = [
  {
    id: 1,
    title: "Why and How 3D Rendering Enhances Product Marketing",
    category: "3D",
    date: "7th Aug, 2025",
    image: "/images/image-1.webp"
  },
  {
    id: 2,
    title: "Why 3D Modeling and Rendering Are the Future of Online Shopping",
    category: "3D",
    date: "7th Aug, 2025",
    image: "/images/image-2.webp"
  },
  {
    id: 3,
    title: "Different Types of 3D Modeling: Benefits and Uses",
    category: "3D",
    date: "7th Aug, 2025",
    image: "/images/image-3.webp"
  },
  {
    id: 4,
    title: "How to Choose the Best 3D Modeling Services Provider",
    category: "3D",
    date: "7th Aug, 2025",
    image: "/images/image-4.webp"
  },
  {
    id: 5,
    title: "How to Create a 3D Model from a Picture",
    category: "3D",
    date: "7th Aug, 2025",
    image: "/images/image-5.webp"
  },
  {
    id: 6,
    title: "What is 3D Rendering? Complete Guide",
    category: "3D",
    date: "6th Aug, 2025",
    image: "/images/image-6.webp"
  },
  {
    id: 7,
    title: "What is Image Retouching and Why it Matters",
    category: "Photo",
    date: "6th Aug, 2025",
    image: "/images/image-7.webp"
  },
  {
    id: 8,
    title: "What is Photo Editing? Everything You Need to Know",
    category: "Photo",
    date: "6th Aug, 2025",
    image: "/images/image-8.webp"
  },
  {
    id: 9,
    title: "Complete Guide to Commercial Product Photography",
    category: "Photo",
    date: "6th Aug, 2025",
    image: "/images/image-9.webp"
  },
  {
    id: 10,
    title: "Industry Adaptations & Technology Trends",
    category: "Ecom",
    date: "5th Aug, 2025",
    image: "/images/image-10.webp"
  }
];

const BlogSection = () => {
  const [selectedTab, setSelectedTab] = useState('All');

  const filteredBlogs = selectedTab === 'All'
    ? blogs
    : blogs.filter(blog => blog.category === selectedTab);

  return (
    <div className="bg-white text-black dark:bg-black dark:text-white min-h-screen py-20 px-4">
      <h1 className="text-[150px] font-bold text-center mb-10">NEWSLETTER</h1>

      {/* Toggle Buttons */}
      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={clsx(
              "relative px-6 py-2 text-black dark:text-white font-semibold border border-green-500 overflow-hidden transition-all duration-300",
              selectedTab === tab ? "bg-green-500" : "bg-transparent",
              "group"
            )}
          >
            <span className="relative z-10">{tab}</span>
            <span
              className={clsx(
                "absolute inset-0 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-0",
                selectedTab === tab && "scale-x-100"
              )}
            />
          </button>
        ))}
      </div>

      {/* Blog Layout */}
      <div className="w-full mx-auto space-y-8">
        {/* Row 1: 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.slice(0, 3).map((blog) => (
            <div key={blog.id} className=" p-4 rounded-lg ">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-40 lg:h-[350px] object-cover rounded mb-4"
              />
              <h2 className="text-lg font-semibold">{blog.title}</h2>
              <p className="text-sm text-gray-400 mt-1">{blog.date}</p>
            </div>
          ))}
        </div>

        {/* Row 2: 2 wide cards */}
       {/* Row 2: 2 wide cards */}
<div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-8">
  {filteredBlogs.slice(3, 5).map((blog) => (
    <div
      key={blog.id}
      className=" rounded-lg  flex flex-col lg:flex-col overflow-hidden"
    >
      <div className="w-full">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 p-4">
        <h2 className="text-lg font-semibold">{blog.title}</h2>
        <p className="text-sm text-gray-400 mt-1">{blog.date}</p>
      </div>
    </div>
  ))}
</div>


        {/* Remaining cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.slice(5).map((blog) => (
            <div key={blog.id} className=" p-4 rounded-lg ">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-40 lg:h-[350px] object-cover rounded mb-4"
              />
              <h2 className="text-lg font-semibold">{blog.title}</h2>
              <p className="text-sm text-gray-400 mt-1">{blog.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
