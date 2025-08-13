"use client";
 
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/Footer";
import FAQ from "@/components/Faq";
import FooterGrid from "@/components/FooterNew";
 
export default function FAQPage() {
  const blog3dApidomain = "https://tkclbackendev.onrender.com";
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
 
  useEffect(() => {
    const controller = new AbortController();
 
    const load = async () => {
      try {
        setLoading(true);
        setErrorMsg("");
 
        const res = await fetch(`${blog3dApidomain}/api/faqs-common`, {
          headers: {
            Accept: "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_SECRET_KEY, // client env var
          },
        });
 
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
 
        const data = await res.json();
        setFaqs(data);
      } catch (err) {
        setErrorMsg("Could not load FAQs.");
      } finally {
        setLoading(false);
      }
    };
 
    load();
    return () => controller.abort();
  }, []);
  return (
    <div>
      <div className=" bg-white text-black dark:bg-black dark:text-white px-4 sm:px-10 py-20 font-sans">
        <div className=" mx-auto">
          <h1 className=" text-[200px] title font-extrabold text-center">
            FAQ
          </h1>
          <div className="h-[1px] bg-gray-800"></div>
          <h2 className="text-[90px] leading-[80px] title font-medium text-center mt-6">
            Learn some common <br />
            answers about <span className="font-semibold">TKCL</span>
          </h2>
 
          {loading && (
            <p className="text-center mt-6 opacity-70">Loading FAQs…</p>
          )}
          {!loading && errorMsg && (
            <p className="text-center mt-3 text-sm opacity-60">{errorMsg}</p>
          )}
          <div className="mt-16 max-w-4xl mx-auto divide-y divide-black dark:divide-white/10">
            {!loading && !errorMsg && faqs.length > 0 && <FAQ faqs={faqs} />}
          </div>
        </div>
      </div>
      <FooterGrid/>
    </div>
  );
}
 