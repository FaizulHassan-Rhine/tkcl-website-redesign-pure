// components/FooterGrid.jsx
"use client";

import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa";

export default function FooterGrid() {
  return (
    <footer className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-14">
        {/* 1 / 2 / 4 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand / Intro */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-white font-bold">
                3D
              </span>
              <span className="text-xl font-semibold tracking-wide">ACE</span>
            </div>
            <p className="text-sm leading-6 text-gray-600">
              3D-Ace is a 2D/3D content production division of Program-Ace.
              Since 2009 we’ve delivered 2D/3D art and AR/VR-ready assets for
              Unity and Unreal Engine.
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
            <h3 className="text-lg font-semibold">Our Services</h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li><Link href="#" className="hover:text-black">Image Editing</Link></li>
              <li><Link href="#" className="hover:text-black">Video Editing</Link></li>
              <li><Link href="#" className="hover:text-black">3D Modeling & Rendering</Link></li>
            </ul>
          </div>

          {/* About Company */}
          <div>
            <h3 className="text-lg font-semibold">About Company</h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li><Link href="#" className="hover:text-black">API Resources</Link></li>
              <li><Link href="#" className="hover:text-black">Career</Link></li>
              <li><Link href="#" className="hover:text-black">Blogs</Link></li>
              <li><Link href="#" className="hover:text-black">Contact us</Link></li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <h3 className="text-lg font-semibold">Get in touch</h3>
            <div className="mt-4 space-y-4 text-sm text-gray-600">
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
            © 1992–2025 All Rights Reserved by 3D-Ace.
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
