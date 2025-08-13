// components/FooterGrid.jsx
"use client";

import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa";

export default function FooterGrid() {
  return (
    <footer className="bg-gray-100">
      <div className="mx-auto  px-4 py-14">
        {/* 1 / 2 / 4 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
          {/* Brand / Intro */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                className="w-24"
                src="https://thekowcompany.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FThe-KOW-Company-Logo.18227de6.webp&w=640&q=75&dpl=dpl_5fM2KP2eYrzKNkUGTj5wiZnw7r6T"
                alt="The KOW Company Logo"
              />
            </div>
            <p className="text-[16px] max-w-[320px] leading-6  footer-text-body">
             The powerhouse of all your content-related needs. Refer to our image and video editing services to get the best content that meets your desire. Do not miss out on the exciting 3D services that we are ready to offer along with AI-driven solutions. 
            </p>

            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wide text-gray-500">Our AI Tools</p>
              <div className="flex gap-3">
                <Link
                  href="#"
                  className="inline-flex items-center rounded-lg border border-gray-300 px-3 py-2 text-sm hover:border-gray-500 hover:bg-gray-100"
                >
                  Holosnap
                </Link>
                <Link
                  href="#"
                  className="inline-flex items-center rounded-lg border border-gray-300 px-3 py-2 text-sm hover:border-gray-500 hover:bg-gray-100"
                >
                  Retouched.ai
                </Link>
              </div>
             
            </div>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-2xl font-semibold sub-title">Our Services</h3>
            <ul className="mt-4 space-y-2 text-[16px] footer-text-body">
              <li><Link href="#" className="hover:text-black">Image Editing</Link></li>
              <li><Link href="#" className="hover:text-black">Video Editing</Link></li>
              <li><Link href="#" className="hover:text-black">3D Modeling & Rendering</Link></li>
            </ul>
          </div>

          {/* About Company */}
          <div>
            <h3 className="text-2xl font-semibold sub-title">About Company</h3>
            <ul className="mt-4 space-y-2 text-[16px] footer-text-body">
              <li><Link href="#" className="hover:text-black">API Resources</Link></li>
              <li><Link href="#" className="hover:text-black">Career</Link></li>
              <li><Link href="#" className="hover:text-black">Blogs</Link></li>
              <li><Link href="#" className="hover:text-black">Contact us</Link></li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <h3 className="text-2xl font-semibold sub-title">Get in touch</h3>
            <div className="mt-4 space-y-2 text-[16px] footer-text-body">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">Address</p>
                <p>Plot:06, 2nd Floor, Navana, D. H. Tower, Panthapath, Dhaka 1215</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">Phones</p>
                <p>+880 02-55013583</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">Email</p>
                <Link href="mailto:info@thekowcompany.com" className="hover:text-black">
                  info@thekowcompany.com
                </Link>
              </div>

              <div className="pt-2">
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Stay connected</p>
                <div className="flex items-center gap-3">
                  <Link href="#" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 hover:border-gray-500 hover:bg-gray-100">
                    <FaFacebookF size={14} />
                  </Link>
                  <Link href="#" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 hover:border-gray-500 hover:bg-gray-100">
                    <FaTwitter size={14} />
                  </Link>
                  <Link href="#" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 hover:border-gray-500 hover:bg-gray-100">
                    <FaLinkedinIn size={14} />
                  </Link>
                  <Link href="#" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 hover:border-gray-500 hover:bg-gray-100">
                    <FaInstagram size={14} />
                  </Link>
                  <Link href="#" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 hover:border-gray-500 hover:bg-gray-100">
                    <FaYoutube size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider & bottom bar */}
        <div className="mt-10 border-t border-gray-300 pt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-gray-500">
            © 2025 All Rights Reserved by The KOW Company.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-600">
            <Link href="#" className="hover:text-black">Privacy Policy</Link>
            <Link href="#" className="hover:text-black">Cookie Policy</Link>
            <Link href="#" className="hover:text-black">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
