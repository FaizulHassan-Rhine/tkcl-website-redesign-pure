import FooterGrid from "@/components/FooterNew";
import React from "react";
import { metadata as pageMeta } from '@/seo/metadatas';


export const metadata = {
  title: pageMeta.privacyPolicy.title,
  description: pageMeta.privacyPolicy.description,
  alternates: {
    canonical: pageMeta.privacyPolicy.link,
  },
};

const page = () => {
  return (
    <>
    <div className="w-full pt-10 mb-20">
      <div className="w-full h-[30vh] md:h-[60vh] mt-20">
        <img className="w-full h-full" src="/images/privacy-policy.webp" alt="" />
      </div>
      <div>
        <h1 className="text-center text-[32px] md:text-[40px] lg:text-[50px] font-semibold title py-10">
          PRIVACY POLICY
        </h1>
      </div>
      {/* section one ----------- */}
      <div className="flex flex-col md:flex-row justify-center items-center  gap-40 p-4 md:p-6 lg:p-8">
        <div className="w-full md:w-[40%]">
          <h1 className="text-[24px] md:text-[32px] sub-title">Brief Introduction</h1>
          <p className="text-body">
            We know that you care how information about you is used and shared,
            and we appreciate your trust. This Privacy Policy explains how The
            KOW Company collects, uses and shares information about you when you
            use our websites and online services (“Services”) or otherwise
            interact with us. Please read this Privacy Policy carefully and
            contact us if you have any questions.
          </p>
          <p className="text-body">
            If you provide us with your personal information then this indicates
            that you have had sufficient opportunity to access, and have read
            and accepted, this Privacy Policy. If you do not wish to provide
            personal information to us, then you do not have to do so, however
            it may affect your use of this website or any products and services
            offered on it.
          </p>
        </div>
        <div className="w-full  md:w-[40%]">
          <h1 className="text-[24px] md:text-[32px] sub-title">
            What Information Are We Collecting From You?
          </h1>
          <ul className="list-disc pl-5 text-body">
            <li>
              Contact details including name, email address, address, and
              telephone number
            </li>
            <li>
              Demographic information such as job title, gender, postcode,
              company name, and company type
            </li>
            <li>
              Payment details like credit card information, account information,
              and billing address (if you are purchasing a product from us)
            </li>
            <li>Raw images provided by you to us</li>
            <li>SOP for image processing</li>
            <li>Your computer's IP address</li>
            <li>Browser type</li>
          </ul>
        </div>
      </div>
      {/* section two ----------- */}
      <div className="flex flex-col md:flex-row justify-center items-center  gap-40 p-4 md:p-6 lg:p-8">
        <div className="w-full md:w-[40%]">
          <h1 className="text-[24px] md:text-[32px] sub-title leading-9">
            Disclosure of Personal Information to Third Parties?
          </h1>
          <h2 className="text-body">
            {" "}
            We may disclose your personal information to:
          </h2>
          <ul className="list-disc pl-10 text-body">
            <li>
              Credit reporting agencies and courts, tribunals and regulatory authorities where customers fail to pay for goods or services provided by us to them.
            </li>
            <li>
             Courts, tribunals, regulatory authorities and law enforcement offices as required by law, in connection with any actual or prospective legal proceedings, or in order to establish, exercise or defend our legal rights.
            </li>
            <li>
              Payment details like credit card information, account information,
              and billing address (if you are purchasing a product from us)
            </li>
            <li>Conducting market research and marketing strategy analysis.</li>
            
          </ul>
          <p className="text-body">
           Where we disclose your personal information to third parties for these purposes, we will request that they follow this Privacy Policy when handling your personal information. If there is a change of control of our business or a sale or transfer of business assets, we reserve the right to transfer to the extent permitted by law our user databases, together with any personal information and non-personal information contained in those databases.
          </p>
        </div>
        <div className="w-full md:w-[40%]">
          <h1 className="text-[24px] md:text-[32px] sub-title">
           How May We Use Your Personal Information?
          </h1>
          <ul className="list-disc pl-5 text-body">
            <li>
              To create and manage orders
            </li>
            <li>
              To establish agreements for the sale of products or services
            </li>
            <li>
             To maintain transaction records, including accounts, tax invoices, and receipts
            </li>
            <li>To communicate with you regarding products, services, special offers, and events that may be of interest</li>
            <li>To conduct research and analysis to improve product and service quality, ensuring we meet your specific needs</li>
            <li>To deliver personalized or customized content</li>
            <li>For direct marketing purposes</li>
            <li>To provide additional benefits and exclusive offers</li>
            <li>To send promotional materials and information</li>
            <li>To comply with applicable laws, regulations, and directives issued by regulatory authorities</li>
          </ul>
        </div>
      </div>
      {/* section three ----------- */}
      <div className="flex flex-col md:flex-row justify-center items-center  gap-40 p-4 md:p-6 lg:p-8">
        <div className="w-full md:w-[40%]">
          <h1 className="text-[24px] md:text-[32px] sub-title leading-9">
            How to Make a Complaint About a Privacy Breach?
          </h1>
        
          <p className="text-body">
           If you have any questions, comments or complaints regarding our practices, or if you are of the view that we have not adhered to this privacy policy, you can contact us by email
to info@thekowcompany.com.

          </p>
        </div>
        <div className="w-full md:w-[40%]">
          <h1 className="text-[24px] md:text-[32px] sub-title">
          
Changes/Amendments to this Policy

          </h1>
          <p>This Privacy Policy may be amended, including with changes, additions and deletions, from time to time in our sole discretion. Your continued use of our website following any amendments indicates that you accept the amendments. We recommend that you check this Privacy Policy regularly, prior to providing personal information, to ensure you are aware of any changes, and only proceed to provide personal information if you accept the new Privacy Policy.</p>
        </div>
      </div>
    </div>
    <FooterGrid/>
    </>
  );
};

export default page;
