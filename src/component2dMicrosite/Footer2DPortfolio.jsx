import React from "react";
import  Link  from "next/link";
// ff
const Footer2DPortfolio = () => {
  return (
    <div className="bg-[#4AD991] px-16 py-[26px] rounded-t-xl">
      <div className="2xl:container 2xl:mx-auto">
        <div className="flex justify-between items-center">
          <Link 
            href="/contact-us"
            className="text-xl lg:text-4xl font-bold text-black"
          >
            Contact Us
          </Link>
          <div className="flex justify-center items-center gap-3 md:gap-7">
            <Link
              href="https://www.linkedin.com/company/the-kow-company/"
              target="_blank"
              className="cursor-pointer group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
               
                viewBox="0 0 33 33"
                fill="none"
                className="fill-black group-hover:fill-white w-[20px] h-[20px] md:w-[35px] md:h-[35px]  transition-colors duration-300"
              >
                <path
                  d="M9.75338 7.16702C9.75302 7.87427 9.47173 8.5524 8.97139 9.05225C8.47104 9.5521 7.79262 9.83271 7.08538 9.83236C6.37813 9.832 5.7 9.55071 5.20015 9.05037C4.7003 8.55002 4.41969 7.8716 4.42004 7.16436C4.4204 6.45711 4.70169 5.77898 5.20204 5.27913C5.70238 4.77928 6.3808 4.49867 7.08804 4.49902C7.79529 4.49938 8.47342 4.78067 8.97327 5.28102C9.47312 5.78136 9.75373 6.45978 9.75338 7.16702ZM9.83338 11.807H4.50004V28.5004H9.83338V11.807ZM18.26 11.807H12.9534V28.5004H18.2067V19.7404C18.2067 14.8604 24.5667 14.407 24.5667 19.7404V28.5004H29.8334V17.927C29.8334 9.70036 20.42 10.007 18.2067 14.047L18.26 11.807Z"
                />
              </svg>
            </Link>
            <Link
              href="https://thekowcompany.com/book-a-call"
              target="_blank"
              className="cursor-pointer group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
              
                viewBox="0 0 22 21"
                fill="none"
                className="fill-black group-hover:fill-white w-[14px] mt-[2px] md:mt-0 h-[14px] md:w-[25px] md:h-[25px] transition-colors duration-300"
              >
                <path
                  d="M20.345 14.4433C18.91 14.4433 17.5217 14.21 16.2267 13.79C16.0237 13.7216 15.8057 13.7117 15.5974 13.7612C15.3891 13.8107 15.1988 13.9177 15.0483 14.07L13.2167 16.3683C9.915 14.7933 6.82333 11.8183 5.17833 8.4L7.45333 6.46333C7.76833 6.13667 7.86167 5.68167 7.73333 5.27333C7.30167 3.97833 7.08 2.59 7.08 1.155C7.08 0.525 6.555 0 5.925 0H1.88833C1.25833 0 0.5 0.28 0.5 1.155C0.5 11.9933 9.51833 21 20.345 21C21.1733 21 21.5 20.265 21.5 19.6233V15.5983C21.5 14.9683 20.975 14.4433 20.345 14.4433Z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer2DPortfolio;
