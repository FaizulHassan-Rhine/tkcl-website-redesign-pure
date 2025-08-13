

// 'use client';

// import { useEffect, useState, useMemo } from 'react';
// import Link from 'next/link';
// import BlogHeader from './BlogHeader';
// import { BsCalendar3 } from 'react-icons/bs';
// import Image from 'next/image';
// import Footer from '../Footer';

// const AllBlog = () => {
//   const apidomain = 'https://tkclbackendev.onrender.com';
//   const imagerealDomainallblogs = 'https://tkcl-website-redesign-pure.vercel.app';
//   const [blogs2D, setBlogs2D] = useState([]);
//   const [blogs3D, setBlogs3D] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [res2D, res3D] = await Promise.all([
//           fetch(`${apidomain}/api/blog2d/`, {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//               'x-api-key': process.env.NEXT_PUBLIC_API_SECRET_KEY,
//             },
//           }),
//           fetch(`${apidomain}/api/blog3d/`, {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//               'x-api-key': process.env.NEXT_PUBLIC_API_SECRET_KEY,
//             },
//           }),
//         ]);

//         const data2D = await res2D.json();
//         const data3D = await res3D.json();

//         setBlogs2D(data2D);
//         setBlogs3D(data3D);
//       } catch (error) {
//         console.error('Error fetching blogs:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const filteredBlogs = useMemo(() => {
//     const combined = [...blogs2D, ...blogs3D];
//     return combined
//       .map((item) => ({
//         ...item,
//         slug: item.slug,
//       }))
//       .sort((a, b) => new Date(b.date) - new Date(a.date));
//   }, [blogs2D, blogs3D]);

//   const getFileNameFromCloudinaryUrl = (url) => {
//     if (!url) return '';
//     try {
//       const parts = url.split('/');
//       return parts[parts.length - 1];
//     } catch {
//       return url;
//     }
//   };

//   return (
//     <>
//       <div className="bg-white text-black dark:bg-black dark:text-white min-h-screen py-20 px-4">
//         <BlogHeader btnColor={true} />
      
//           <div className="container mx-auto space-y-8">
//             {/* Row 1: 3 cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//               {filteredBlogs.slice(0, 3).map((items, index) => (
//                 <Link
//                   href={`/blog/${items.slug}`}
//                   key={`top-${index}`}
//                   aria-label="industry trends details"
//                 >
//                   <div className="card_of_blog justify-center border-0 p-0 rounded-lg">
//                     <div className="cardImage">
//                       <div className="relative w-full aspect-[16/9]">
//                         <img
//                           src={`https://thekowcompany.com/images/thumbnail/${getFileNameFromCloudinaryUrl(items.thumb)}`}
//                           alt={items.title}
//                           className="w-full h-[300px] object-fill"
//                         />
//                       </div>
//                     </div>
//                     <div className="cardCaption ps-4 pt-2 pb-5 pe-5">
                      
//                       <h2 className="text-lg font-semibold line-clamp-2">{items.title}</h2>
                    
//                       <div className="readAndDate">
                        
//                         <div className="date">
//                           {/* <BsCalendar3 className="inline mr-1" /> */}
//                          <p className="text-sm text-gray-400 mt-1">{items.date}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>

//             {/* Row 2: 2 wide cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-8">
//               {filteredBlogs.slice(3, 5).map((items, index) => (
//                 <Link
//                   href={`/blog/${items.slug}`}
//                   key={`wide-${index}`}
//                   aria-label="industry trends details"
//                 >
//                   <div className="card_of_blog justify-center border-0 p-0 rounded-lg flex flex-col lg:flex-col overflow-hidden">
//                     <div className="cardImage">
//                       {/* keep same image construction, just let it fill width */}
//                       <div className="relative w-full aspect-[16/9]">
//                         <img
//                           src={`https://thekowcompany.com/images/thumbnail/${getFileNameFromCloudinaryUrl(items.thumb)}`}
//                           alt={items.title}
//                           className="object-cover"
//                         />
//                       </div>
//                     </div>
//                     <div className="cardCaption ps-4 pt-3 pb-5 pe-5">
//                      <h2 className="text-lg font-semibold line-clamp-2">{items.title}</h2>
                      
//                       <div className="readAndDate">
                        
//                         <div className="date">
//                           {/* <BsCalendar3 className="inline mr-1" /> */}
//                          <p className="text-sm text-gray-400 mt-1">{items.date}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>

//             {/* Remaining cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//               {filteredBlogs.slice(5).map((items, index) => (
//                 <Link
//                   href={`/blog/${items.slug}`}
//                   key={`rest-${index}`}
//                   aria-label="industry trends details"
//                 >
//                   <div className="card_of_blog justify-center border-0 p-0 rounded-lg">
//                     <div className="cardImage">
//                       <div className="relative w-full aspect-[16/9]">
//                         <img
//                           src={`https://thekowcompany.com/images/thumbnail/${getFileNameFromCloudinaryUrl(items.thumb)}`}
//                           alt={items.title}
//                           className="w-full h-[300px] object-fill"
//                         />
//                       </div>
//                     </div>
//                     <div className="cardCaption ps-4 pt-2 pb-5 pe-5">
//                      <h2 className="text-lg font-semibold line-clamp-2">{items.title}</h2>
                      
//                       <div className="readAndDate">
                        
//                         <div className="date">
//                           {/* <BsCalendar3 className="inline mr-1" /> */}
//                          <p className="text-sm text-gray-400 mt-1">{items.date}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>
//       <Footer />
//     </>
//   );
// };

// export default AllBlog;




'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import BlogHeader from './BlogHeader';
import { BsCalendar3 } from 'react-icons/bs';
import Image from 'next/image';
import Footer from '../Footer';

const AllBlog = () => {
  const apidomain = 'https://tkclbackendev.onrender.com';
  const imagerealDomainallblogs = 'https://tkcl-website-redesign-pure.vercel.app';
  const [blogs2D, setBlogs2D] = useState([]);
  const [blogs3D, setBlogs3D] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res2D, res3D] = await Promise.all([
          fetch(`${apidomain}/api/blog2d/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': process.env.NEXT_PUBLIC_API_SECRET_KEY,
            },
          }),
          fetch(`${apidomain}/api/blog3d/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': process.env.NEXT_PUBLIC_API_SECRET_KEY,
            },
          }),
        ]);

        const data2D = await res2D.json();
        const data3D = await res3D.json();

        setBlogs2D(data2D);
        setBlogs3D(data3D);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchData();
  }, []);

  const filteredBlogs = useMemo(() => {
    const combined = [...blogs2D, ...blogs3D];
    return combined
      .map((item) => ({
        ...item,
        slug: item.slug,
      }))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [blogs2D, blogs3D]);

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
        <BlogHeader btnColor={true} />
      
          <div className="container mx-auto space-y-8">
            {/* Row 1: 3 cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.slice(0, 3).map((items, index) => (
                <Link
                  href={`/blog/${items.slug}`}
                  key={`top-${index}`}
                  aria-label="industry trends details"
                >
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
                    
                      <div className="readAndDate">
                        
                        <div className="date">
                          {/* <BsCalendar3 className="inline mr-1" /> */}
                         <p className="text-sm text-gray-400 mt-1">{items.date}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Row 2: 2 wide cards */}
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredBlogs.slice(3, 5).map((items, index) => (
                <Link
                  href={`/blog/${items.slug}`}
                  key={`wide-${index}`}
                  aria-label="industry trends details"
                >
                  <div className="card_of_blog justify-center border-0 p-0 rounded-lg flex flex-col lg:flex-col overflow-hidden">
                    <div className="cardImage">
                      {/* keep same image construction, just let it fill width */}
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
                      
                      <div className="readAndDate">
                        
                        <div className="date">
                          {/* <BsCalendar3 className="inline mr-1" /> */}
                         <p className="text-sm text-gray-400 mt-1">{items.date}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Remaining cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.slice(5).map((items, index) => (
                <Link
                  href={`/blog/${items.slug}`}
                  key={`rest-${index}`}
                  aria-label="industry trends details"
                >
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
                      
                      <div className="readAndDate">
                        
                        <div className="date">
                          {/* <BsCalendar3 className="inline mr-1" /> */}
                         <p className="text-sm text-gray-400 mt-1">{items.date}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
    
    </>
  );
};

export default AllBlog;


