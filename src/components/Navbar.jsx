'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/app/theme-provider';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileDropdowns, setMobileDropdowns] = useState({
    services: false,
    products: false,
    support: false
  });
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDropdownEnter = (dropdown) => {
    setActiveDropdown(dropdown);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  const toggleMobileDropdown = (dropdown) => {
    setMobileDropdowns(prev => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }));
  };

  // Don't render theme-dependent UI until mounted
  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 w-full">
        <div className="backdrop-blur-sm bg-white/90 border-b border-black/10 shadow-sm transition-all duration-300">
          <nav className="2xl:container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <a href="/" className="">
                <img
                  src="https://thekowcompany.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FThe-KOW-Company-Logo.18227de6.webp&w=640&q=75&dpl=dpl_5fM2KP2eYrzKNkUGTj5wiZnw7r6T"
                  alt="Logo"                
                  width={100}
                  height={100}
                />
              </a>
              
              {/* Placeholder for loading state */}
              <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2">
                <div className="h-6 w-96 bg-gray-200 rounded animate-pulse"></div>
              </div>
              
              <div className="hidden lg:flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="w-24 h-10 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
              
              <div className="lg:hidden flex items-center gap-2">
                <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </nav>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      <div className="backdrop-blur-sm bg-white/90 dark:bg-black/90 border-b border-black/10 dark:border-white/10 shadow-sm transition-all duration-300">
        <nav className="2xl:container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
           <a href="/" className="">
            
              <img
                src="https://thekowcompany.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FThe-KOW-Company-Logo.18227de6.webp&w=640&q=75&dpl=dpl_5fM2KP2eYrzKNkUGTj5wiZnw7r6T"
                alt="Logo"                
                width={100}
                height={100}
              />
           </a>
            

            {/* Desktop Navigation - Centered Routes */}
            <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2">
              <ul className="flex gap-8 text-black/80 dark:text-white/80">
                <li className="hover:text-green-500 transition-colors duration-200 cursor-pointer">
                  Home
                </li>
                
                {/* Services Dropdown */}
                <li
                  className="relative group"
                  onMouseEnter={() => handleDropdownEnter('services')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <span className="hover:text-black dark:hover:text-white transition-colors duration-200 cursor-pointer flex items-center gap-1">
                    Services
                    <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                  
                  {/* Services Dropdown Menu */}
                  <div className={`absolute top-full left-0 mt-2 w-64 bg-white/95 dark:bg-black/90 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-lg shadow-xl overflow-hidden transition-all duration-300 ${
                    activeDropdown === 'services' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                  }`}>
                    <div className="py-2">
                      <a
                        href="/image-editing-services"
                        className="block px-4 py-3 text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-200"
                      >
                        Image Editing
                      </a>
                    
                      <a
                        href="/video-service"
                        className="block px-4 py-3 text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-200"
                      >
                        Video Editing
                      </a>
                     
                      <a
                        href="/cgi-service"
                        className="block px-4 py-3 text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-200"
                      >
                        3D Modelling & Rendering
                      </a>
                     
                    </div>
                  </div>
                </li>

                {/* Products Dropdown */}
                <li
                  className="relative group"
                  onMouseEnter={() => handleDropdownEnter('products')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <span className="hover:text-black dark:hover:text-white transition-colors duration-200 cursor-pointer flex items-center gap-1">
                    Products
                    <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                  
                  {/* Products Dropdown Menu */}
                  <div className={`absolute top-full left-0 mt-2 w-64 bg-white/95 dark:bg-black/90 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-lg shadow-xl overflow-hidden transition-all duration-300 ${
                    activeDropdown === 'products' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                  }`}>
                    <div className="py-2">
                      <a
                        href="https://retouched.ai"
                        className="block px-4 py-3 text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-200"
                      >
                        Retouched.ai
                      </a>
                      <a
                        href="https://holosnap.ai"
                        className="block px-4 py-3 text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-200"
                      >
                        Holosnap
                      </a>
                      
                    </div>
                  </div>
                </li>

                <li className="hover:text-green-500 transition-colors duration-200 cursor-pointer">
                  Career
                </li>
                
                {/* Support Dropdown */}
                <li
                  className="relative group"
                  onMouseEnter={() => handleDropdownEnter('support')}
                  onMouseLeave={handleDropdownLeave}
                >
                  <span className="hover:text-black dark:hover:text-white transition-colors duration-200 cursor-pointer flex items-center gap-1">
                    Support
                    <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                  
                  {/* Support Dropdown Menu */}
                  <div className={`absolute top-full left-0 mt-2 w-64 bg-white/95 dark:bg-black/90 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-lg shadow-xl overflow-hidden transition-all duration-300 ${
                    activeDropdown === 'support' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                  }`}>
                    <div className="py-2">
                      <a
                        href="/contact"
                        className="block px-4 py-3 text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-200"
                      >
                        Contact Us
                      </a>
                      {/* <a
                        href="#"
                        className="block px-4 py-3 text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-200"
                      >
                        About Us
                      </a> */}
                      <a
                        href="faq"
                        className="block px-4 py-3 text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-200"
                      >
                        FAQ
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-3 text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-200"
                      >
                        Resources
                      </a>
                    </div>
                  </div>
                </li>

               <a href="/blog" >
                 <li className="hover:text-green-500 transition-colors duration-200 cursor-pointer">
                  Blogs
                </li>
               </a>
              </ul>
            </div>

            {/* Right Side - Dark Mode Toggle & Let's Talk Button */}
            <div className="hidden lg:flex items-center gap-4">
            
              {/* <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-all duration-200 text-black dark:text-white"
                aria-label="Toggle dark mode"
              >
                {theme === 'dark' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button> */}

              {/* Let's Talk Button */}
              <button className="relative px-8 py-4 bg-[#4FA59B] text-white border border-[#4FA59B] rounded-full font-medium overflow-hidden group transition-all duration-300 hover:text-white">
                <span className="absolute inset-0 bg-[#3B837B] transform translate-y-full group-hover:translate-y-0 border-[#3B837B] transition-transform duration-300 ease-out"></span>
                <span className="relative z-10">Let's Talk</span>
              </button>
            </div>

            {/* Mobile Menu Button & Dark Mode Toggle */}
            <div className="lg:hidden flex items-center gap-2">
              {/* Mobile Dark Mode Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-all duration-200 text-black dark:text-white"
                aria-label="Toggle dark mode"
              >
                {theme === 'dark' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="p-2 rounded-lg bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-all duration-200 text-black dark:text-white"
                aria-label="Toggle menu"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
                  <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                  <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <ul className="pt-4 pb-2 space-y-2 text-black/80 dark:text-white/80">
              <li className="py-2 px-2 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition-all duration-200 cursor-pointer">Home</li>
              
              {/* Services Mobile Dropdown */}
              <li>
                <div
                  onClick={() => toggleMobileDropdown('services')}
                  className="py-2 px-2 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-between"
                >
                  <span>Services</span>
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 ${mobileDropdowns.services ? 'rotate-45' : 'rotate-0'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${mobileDropdowns.services ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="ml-4 mt-2 space-y-1">
                    <a href="/image-video-services" className="block py-2 px-3 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition-all duration-200">
                      Image & Video Editing
                    </a>
                   
                    <a href="/cgi-service" className="block py-2 px-3 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition-all duration-200">
                      3D Modelling & CGI
                    </a>              
                  </div>
                </div>
              </li>

              {/* Products Mobile Dropdown */}
              <li>
                <div
                  onClick={() => toggleMobileDropdown('products')}
                  className="py-2 px-2 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-between"
                >
                  <span>Products</span>
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 ${mobileDropdowns.products ? 'rotate-45' : 'rotate-0'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${mobileDropdowns.products ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="ml-4 mt-2 space-y-1">
                    <a href="https://retouched.ai" target='_blank' className="block py-2 px-3 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition-all duration-200">
                      Retouched.ai
                    </a>
                    <a href="https://holosnap.ai" target='_blank' className="block py-2 px-3 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition-all duration-200">
                      Holosnap
                    </a>
                   
                  </div>
                </div>
              </li>

              <li className="py-2 px-2 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition-all duration-200 cursor-pointer">Career</li>
              
              {/* Support Mobile Dropdown */}
              <li>
                <div
                  onClick={() => toggleMobileDropdown('support')}
                  className="py-2 px-2 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-between"
                >
                  <span>Support</span>
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 ${mobileDropdowns.support ? 'rotate-45' : 'rotate-0'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${mobileDropdowns.support ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="ml-4 mt-2 space-y-1">
                    <a href="/contact" className="block py-2 px-3 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition-all duration-200">
                      Contact Us
                    </a>
                    <a href="#" className="block py-2 px-3 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition-all duration-200">
                      About Us
                    </a>
                    <a href="/faq" className="block py-2 px-3 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition-all duration-200">
                      FAQ
                    </a>
                    <a href="#" className="block py-2 px-3 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition-all duration-200">
                      Resources
                    </a>
                  </div>
                </div>
              </li>

            <a href="/blog">
                <li className="py-2 px-2 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition-all duration-200 cursor-pointer">Blogs</li>
            </a>
              
              <li className="py-2 px-2">
                <button className="relative w-full px-4 py-2 bg-white text-black rounded-full font-medium overflow-hidden group transition-all duration-300 hover:text-white">
                  <span className="absolute inset-0 bg-green-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
                  <span className="relative z-10">Let's Talk</span>
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}