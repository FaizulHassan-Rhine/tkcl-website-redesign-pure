// 'use client';

// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import Footer from '@/components/Footer';



// export default function FAQ({faqs}) {
//   const [openIndex, setOpenIndex] = useState(null);

//   const toggleFAQ = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
 
       
//         <div className="mt-16 max-w-4xl mx-auto divide-y divide-black dark:divide-white/10">
//           {faqs.map((faq, index) => (
//             <div key={index} className="py-6">
//               <button
//                 onClick={() => toggleFAQ(index)}
//                 className="flex justify-between items-center w-full text-left group"
//               >
//                 <span className=" font-medium text-base sm:text-xl">
//                   {String(index + 1).padStart(2, '0')} {faq.question}
//                 </span>
//                 <span className="text-2xl font-bold  group-hover:text-gray-300 transition">
//                   {openIndex === index ? '–' : '+'}
//                 </span>
//               </button>

//               <AnimatePresence>
//                 {openIndex === index && (
//                   <motion.div
//                     key="content"
//                     initial={{ opacity: 0, height: 0 }}
//                     animate={{ opacity: 1, height: 'auto' }}
//                     exit={{ opacity: 0, height: 0 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <div className="mt-4 text-sm sm:text-base  leading-relaxed pr-2 sm:pr-10">
//                       {faq.answer}
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           ))}
//         </div>
      
//   );
// }
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DOMPurify from 'dompurify';

export default function FAQ({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>

      {faqs.map((faq, index) => {
        const cleanHtml = DOMPurify.sanitize(faq.answer || '');
        return (
          <div key={faq._id || index} className="py-6">
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full text-left group"
            >
              <span className="font-medium text-base sm:text-xl">
                {/* Q{String(index + 1).padStart(2, '0')}: {faq.question} */}
                {faq.question}
              </span>
              <span className="text-2xl font-bold group-hover:text-gray-300 transition">
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
                  <div
                    className="mt-4 text-sm sm:text-base leading-relaxed pr-2 sm:pr-10 prose prose-sm dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: cleanHtml }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
   
    </>
   
  );
}
