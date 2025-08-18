// 'use client';

// import Link from 'next/link'
// import { useEffect, useState } from "react";


// import { IoLanguage } from "react-icons/io5";
// import { IoMdArrowDropdown } from "react-icons/io";


// import "@/styles/navbar.css";
// import GoogleTranslate from "../googleTranslate/googleTranslate";

// import Image from "next/image";

// const Language = ({screenLeft,carearmenu,navbar2d3dColor}) => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const { handleTranslate } = GoogleTranslate();
 

//   const selectLanguage = (lang) => {
//     handleTranslate(lang);
//     setDropdownOpen(false);
//     setTimeout(() => {
//       window.location.reload();
//     }, 1000); // Adjust the delay to ensure the language change is fully applied
//   };
 



//   return (
//     <>
      
//             <div
//               id="google_translate_element"
//               style={{ display: "none" }}
//             ></div>
//             <div className="relative inline-block text-center notranslate mobileresponsiveLanguage">
//               <div>
//                 <button
//                   type="button"
//                   className={`flex justify-center text-base ${
//                     screenLeft || carearmenu || navbar2d3dColor
//                       ? "text-gray-800 border-b-2 border-[#7C9C30]"
//                       : "text-white border-b-2 border-[#7C9C30]"
//                   } items-center gap-2 w-40 rounded-3xl border shadow-sm px-2 py-1 font-medium focus:outline-none`}
//                   id="options-menu"
//                   aria-expanded="true"
//                   aria-haspopup="true"
//                   onClick={() => setDropdownOpen(!dropdownOpen)}
//                 >
//                   <IoLanguage className="text-xl" />
//                   Language
//                   <IoMdArrowDropdown className="text-xl" />
//                 </button>
//               </div>

//               {dropdownOpen && (
//                 <div
//                   className="origin-top-right absolute bg-white right-0 mt-2 w-40 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
//                   role="menu"
//                   aria-orientation="vertical"
//                   aria-labelledby="options-menu"
//                 >
//                   <div className="py-1" role="none">
//                     <button
//                       onClick={() => selectLanguage("en")}
//                       className="flex justify-start items-center gap-3 px-4 py-1 text-base text-gray-700 hover:bg-gray-100 w-full text-center"
//                       role="menuitem"
//                     >
//                       {/* <img
//                         className="h-7 w-7"
//                         src="/img/flags/united-kingdom.png"
//                         alt="English"
//                       /> */}
//                       <Image
//   src="/img/flags/united-kingdom.png"
//   alt="english"
//   width={28} // Equivalent to Tailwind h-7/w-7
//   height={28}
//   className="h-7 w-7"
// />
//                       English
//                     </button>
//                     <button
//                       onClick={() => selectLanguage("es")}
//                       className="flex justify-start items-center gap-3 px-4 py-1 text-base text-gray-700 hover:bg-gray-100 w-full text-center"
//                       role="menuitem"
//                     >
//                        <Image
//   src="/img/flags/spain.png"
//   alt="spain"
//   width={28} // Equivalent to Tailwind h-7/w-7
//   height={28}
//   className="h-7 w-7"
// />
//                       {/* <img
//                         className="h-7 w-7"
//                         src="/img/flags/spain.png"
//                         alt="Spanish"
//                       /> */}
//                       Spanish
//                     </button>
//                     <button
//                       onClick={() => selectLanguage("fr")}
//                       className="flex justify-start items-center gap-3 px-4 py-1 text-base text-gray-700 hover:bg-gray-100 w-full text-center"
//                       role="menuitem"
//                     >
//                                              <Image
//   src="/img/flags/france.png"
//   alt="france"
//   width={28} // Equivalent to Tailwind h-7/w-7
//   height={28}
//   className="h-7 w-7"
// />
                      
//                       French
//                     </button>
//                     <button
//                       onClick={() => selectLanguage("de")}
//                       className="flex justify-start items-center gap-3 px-4 py-1 text-base text-gray-700 hover:bg-gray-100 w-full text-center"
//                       role="menuitem"
//                     >
//                        <Image
//   src="/img/flags/germany.png"
//   alt="germany"
//   width={28} // Equivalent to Tailwind h-7/w-7
//   height={28}
//   className="h-7 w-7"
// />
                    
//                       German
//                     </button>
//                     <button
//                       onClick={() => selectLanguage("nl")}
//                       className="flex justify-start items-center gap-3 px-4 py-1 text-base text-gray-700 hover:bg-gray-100 w-full text-center"
//                       role="menuitem"
//                     >
//                       <Image
//   src="/img/flags/netherlands.png"
//   alt="netherlands"
//   width={28} // Equivalent to Tailwind h-7/w-7
//   height={28}
//   className="h-7 w-7"
// />
                     
//                       Dutch
//                     </button>
//                   </div>
//                 </div>
//               )}
            
          
       
//         </div>
    
//     </>
//   );
// };

// export default Language;


'use client';

import { useState } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import { IoLanguage } from 'react-icons/io5';
import { IoMdArrowDropdown } from 'react-icons/io';

const Language = ({ screenLeft, carearmenu, navbar2d3dColor }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [translateReady, setTranslateReady] = useState(false);

  // যখন Dropdown প্রথমবার Open হবে, তখনই Google Translate স্ক্রিপ্ট লোড করব
  const onToggle = () => {
    if (!translateReady) {
      setTranslateReady(true);
    }
    setDropdownOpen(open => !open);
  };

  const selectLanguage = (lang) => {
    const combo = document.querySelector('.goog-te-combo');
    if (combo) {
      combo.value = lang;
      combo.dispatchEvent(new Event('change'));
      // পেজ রিলোড না করলেও Translate চলে যাবে
    } else {
      console.error('Google Translate element not found.');
    }
    setDropdownOpen(false);
  };

  return (
    <>
      {/* ১) স্ক্রিপ্ট lazyOnload স্ট্র্যাটেজি দিয়ে যোগ করছি */}
      {translateReady && (
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="lazyOnload"
          onError={() => console.error('Google Translate failed to load.')}
        />
      )}

      {/* ২) global init ফাংশন ডিক্লেয়ার (Translate স্ক্রিপ্ট কলব্যাক) */}
      {translateReady && (
        <Script id="gt-init">{`
          function googleTranslateElementInit() {
            new google.translate.TranslateElement({
              pageLanguage: 'en',
              autoDisplay: false
            }, 'google_translate_element');
          }
        `}</Script>
      )}

      <div id="google_translate_element" style={{ display: 'none' }} />

      <div className="relative inline-block notranslate mobileresponsiveLanguage">
        <button 
          type="button"
          onClick={onToggle}
          className={`flex items-center gap-2 w-full rounded-full bg-[#4FA59B]  px-4 py-5 font-medium shadow-sm focus:outline-none ${
            screenLeft || carearmenu || navbar2d3dColor
              ? 'text-gray-800 border-[#7C9C30]'
              : 'text-white border-[#7C9C30]'
          }`}
        >
          <IoLanguage className="text-[14px] xl:text-[20px]" />
         
          <IoMdArrowDropdown className="text-[14px] xl:text-[20px]" />
        </button>

        {dropdownOpen && (
          <div className="origin-top-right absolute bottom-[65px] lg:bottom-[-185px] right-0 mt-2 w-40 rounded-md bg-white shadow-lg ">
            {[
              { code: 'en', label: 'English', flag: '/images/flags/united-kingdom.png' },
              { code: 'es', label: 'Spanish', flag: '/images/flags/spain.png' },
              { code: 'fr', label: 'French',  flag: '/images/flags/france.png' },
              { code: 'de', label: 'German',  flag: '/images/flags/germany.png' },
              { code: 'nl', label: 'Dutch',   flag: '/images/flags/netherlands.png' },
            ].map(({ code, label, flag }) => (
              <button
                key={code}
                onClick={() => selectLanguage(code)}
                className="flex items-center gap-3 w-full px-4 py-1 text-base text-gray-700 hover:bg-gray-100"
              >
                <Image src={flag} alt={label} width={28} height={28} />
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Language;
