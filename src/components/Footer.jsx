import { FaFacebook, FaTwitter, FaTelegramPlane } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className=" px-2 py-10 m-0">
      <div className="w-full mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 border-b border-gray-800 pb-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 w-full">
            <img
              className="w-[400px]"
              src="https://thekowcompany.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo2.60f47440.webp&w=640&q=75&dpl=dpl_CkEYops9HRVi48wwLma1szyfnsWZ"
              alt="The KOW Company Logo"
            />

            <div className=" text-[24px] max-w-lg">
              <p>
                TKCL is a one stop solution for all your digital needs. We do
                image and video editing, 3D modelling and CGI content rendering
                that boost conversions.
              </p>
              <a
                href="mailto:info@thekowcompany.com"
                className="text-gray-400 underline block mt-2"
              >
                info@thekowcompany.com
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mt-10">
          {/* Newsletter */}
          <div className="flex w-[450px] flex-col md:flex-row justify-between items-center mt-10 gap-6">
            <div className="flex-1 w-full">
              <form className="flex items-center w-full ">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow bg-gray-300 dark:bg-[#0a0a0a] text-black dark:text-white px-10 py-7 rounded-l-full focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-gray-300  dark:bg-[#0a0a0a] text-black dark:text-white p-8 rounded-r-full hover:bg-gray-400 dark:hover:bg-gray-800"
                >
                  <FaTelegramPlane className="text-white" />
                </button>
              </form>
              <p className="text-[20px]  mt-2">
                By subscribing you agree with our{" "}
              </p>
              <a href="#" className="underline text-[20px] ">
                Privacy Policy
              </a>
            </div>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-20  mt-10 text-[24px]">
            <div>
              <h4 className="text-gray-400 mb-2">Company</h4>
              <ul className="space-y-1 ">
                <li>
                  <a href="#">Solutions</a>
                </li>
                <li>
                  <a href="#">Newsletter</a>
                </li>
                <li>
                  <a href="#">Work</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-400 mb-2">Social</h4>
              <ul className="space-y-1 ">
                <li>
                  <a href="#">Facebook</a>
                </li>
                <li>
                  <a href="#">Twitter</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-400 mb-2">Office</h4>
              <ul className="space-y-1 ">
                <li>Dhaka</li>
                <li>Dubai</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 text-[24px] text-gray-500 border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-center items-center">
          <span>
            © 2025 <strong className="">The Kow Company Ltd</strong>. All rights
            reserved
          </span>
        </div>
      </div>
    </footer>
  );
}
