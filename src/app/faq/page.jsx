"use client";

import { useState, useEffect } from "react";
import FooterGrid from "@/components/FooterNew";

export default function FAQPage() {
  const blog3dApidomain = "https://tkclbackendev.onrender.com";
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        setLoading(true);
        setErrorMsg("");

        const res = await fetch(`${blog3dApidomain}/api/faqs-common`, {
          headers: {
            Accept: "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_SECRET_KEY,
          },
          signal: controller.signal,
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

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
    <div className="bg-white text-black dark:bg-black dark:text-white font-sans">
      <div className="px-4 sm:px-10 py-20 mx-auto">
        {/* Page Header */}
        <h1 className="text-[100px] title font-extrabold text-center">FAQ</h1>
        <div className="h-[1px] bg-gray-800"></div>
        <h2 className="text-[60px] leading-[55px] title font-medium text-center mt-6">
          Learn some common <br />
          answers about <span className="font-semibold">TKCL</span>
        </h2>

        {/* Loading/Error States */}
        {loading && (
          <p className="text-center mt-6 opacity-70">Loading FAQs…</p>
        )}
        {!loading && errorMsg && (
          <p className="text-center mt-3 text-sm opacity-60">{errorMsg}</p>
        )}

        {/* FAQ List */}
        {!loading && !errorMsg && faqs.length > 0 && (
          <div className="mt-16 max-w-4xl mx-auto divide-y divide-black dark:divide-white/10">
            {faqs.map((faq, index) => (
              <div key={index} className="py-6">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex justify-between items-center w-full text-left group"
                >
                  <span className="font-medium text-base sm:text-xl">
                    {String(index + 1).padStart(2, "0")} {faq.question}
                  </span>
                  <span className="text-2xl font-bold group-hover:text-gray-300 transition">
                    {openIndex === index ? "–" : "+"}
                  </span>
                </button>
                {openIndex === index && (
                  <p className="mt-3 text-sm opacity-80">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <FooterGrid />
    </div>
  );
}
