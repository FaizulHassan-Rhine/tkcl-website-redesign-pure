'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '@/components/Footer';
import FooterGrid from '@/components/FooterNew';

const faqs = [
  {
    question: 'Bring their individual experience and creative?',
    answer:
      'We value every individual’s unique background and creativity. Our team members bring diverse experiences that shape compelling, effective design solutions for real-world problems.',
  },
  {
    question: 'Design should enrich our day?',
    answer:
      "People know what an FAQ is, so make that your page title. Don’t overcomplicate things by calling it “Good to Know” or “More Info”. Sometimes people put the frequently asked questions section on their Contact page, but you can create your own page and put it right in your website navigation menu",
  },
  {
    question: 'Human centered design to challenges design theory?',
    answer:
      'Human-centered design challenges traditional design theory by shifting the focus from aesthetics and trends to real human needs, behavior, and context.',
  },
  {
    question: 'Align with your brand look and feel?',
    answer:
      'Absolutely. Every design we deliver is tailored to align with your brand’s identity—from typography and color palette to tone and visual hierarchy.',
  },
  {
    question: 'How to become an Agile productive manager?',
    answer:
      'To become an Agile productive manager, focus on collaboration, prioritize transparency, embrace feedback, and adapt quickly to change while guiding your team with clear goals.',
  },
  {
    question: 'Why we create the best Webflow websites in Figma?',
    answer:
      'Figma allows us to rapidly prototype, iterate, and collaborate on designs before development. This ensures pixel-perfect execution when building Webflow websites.',
  },
  {
    question: 'How to manage Agile project teams?',
    answer:
      'Effective Agile team management involves regular stand-ups, sprint planning, retrospectives, and fostering an environment of trust and autonomy.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
        <div className=" bg-white text-black dark:bg-black dark:text-white px-4 sm:px-10 py-20 font-sans">
      <div className=" mx-auto">
        <h1 className=" text-[100px] title font-extrabold text-center">FAQ</h1>
        <div className='h-[1px] bg-gray-800'></div>
        <h2 className="text-[60px] leading-[55px] title font-medium text-center mt-6">
          Learn some common <br />
          answers about <span className="font-semibold">TKCL</span>
        </h2>

        <div className="mt-16 max-w-4xl mx-auto divide-y divide-black dark:divide-white/10">
          {faqs.map((faq, index) => (
            <div key={index} className="py-6">
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full text-left group"
              >
                <span className=" font-medium text-base sm:text-xl">
                  {String(index + 1).padStart(2, '0')} {faq.question}
                </span>
                <span className="text-2xl font-bold  group-hover:text-gray-300 transition">
                  {openIndex === index ? '–' : '+'}
                </span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mt-4 text-sm sm:text-base  leading-relaxed pr-2 sm:pr-10">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
    <FooterGrid/>
    </div>
  );
}
