import FooterGrid from "@/components/FooterNew";
import React from "react";

const page = () => {
  return (
    <>
      <div className="w-full pt-10 mb-20">
        <div className="w-full h-[30vh] md:h-[50vh] lg:h-[60vh] mt-20">
          <img
            className="w-full h-full"
            src="/images/terms-and-conditions.webp"
            alt=""
          />
        </div>
        <div>
          <h1 className="text-center text-[32px] md:text-[40px] lg:text-[50px] font-semibold title py-10">
            TERMS AND CONDITIONS
          </h1>
        </div>
        <div className="flex flex-col gap-5 md:gap-10 ">
          <div>
            <h1 className="text-[24px] md:text-[32px] sub-title">
              Order Cancellation Policy
            </h1>
            <ul className="list-disc pl-5 text-body">
              <li>
                Order is needed to be cancelled before we process 10 images from
                the images you provide us. If you cancel within this limit you
                will get back the amount you have paid as advance.
              </li>
              <li>
                If you cancel your order after processing 10 images then you
                will not get any payback for your advance payment.
              </li>
              <li>
                If you cancel order after work in progress than you need to pay
                the 60% of the total payment.
              </li>
              <li>
                Once you receive the final product there will be no order
                cancellation policy.
              </li>
            </ul>
          </div>
          <div>
            <h1 className="text-[24px] md:text-[32px] sub-title">
              Payment Method
            </h1>
            <h2>Payment Terms:</h2>
            <ul className="list-disc pl-5 text-body">
              <li>
                30% Advance Payment: A payment of 30% is required upfront upon
                placing the order.s then you will not get any payback for your
                advance payment.
              </li>
              <li>
                30% Upon Work in Progress: An additional 30% is to be paid upon
                delivery of the Work in Progress (processed images as per the
                SOP).
              </li>
              <li>
                40% Upon Completion: The remaining 40% must be paid within 7
                days of receiving the final processed images (after all
                corrections are completed).
              </li>
            </ul>
            <p>
              Payments can be made via Visa, MasterCard, or American Express. By
              making a payment, you confirm that you are an authorized user of
              the credit card or account used.
            </p>
          </div>
          <div>
            <h1 className="text-[24px] md:text-[32px] sub-title">
              Placing an Order
            </h1>
            <ul className="list-disc pl-5 text-body">
              <li>
                Via Your FTP Server: Upload your images to your own FTP server
                and send us the download link.
              </li>
              <li>
                Via Our FTP Server: Upload your images to our FTP server using
                the link we provide, and notify us once the upload is complete.
              </li>
              <li>
                Via Our Web or Shopify App: Upload images directly from your
                local device (e.g., laptop or personal computer) through our Web
                App or Shopify App.
              </li>
            </ul>
          </div>
          <div>
            <h1 className="text-[24px] md:text-[32px] sub-title">
              Fault Handling Policy
            </h1>
            <p>
              We are committed to delivering work of the highest quality. To
              ensure your satisfaction, we include a Work in Progress (WIP)
              stage for your review before final delivery.
            </p>
            <ul className="list-disc pl-5 text-body">
              <li>
                You will have 48 hours to review the Work in Progress and
                provide your feedback.
              </li>
              <li>
                If any faults or issues are identified, we will correct them
                based on your observations.
              </li>
              <li>
                After corrections are made, you will receive a second version
                for final review and feedback.
              </li>
              <li>
                Once the second feedback is submitted, no further changes,
                cancellations, or additional observations will be accepted.
              </li>
              <li>
                Final delivery (Finished Goods) will follow your second review.
              </li>
            </ul>
            <p>
              This process ensures transparency and quality at every stage of
              your order.
            </p>
          </div>
          <div>
            <h1 className="text-[24px] md:text-[32px] sub-title">
              Data Security
            </h1>
            <p>
              We take all reasonable measures to safeguard your order and
              payment information. While we are committed to maintaining the
              highest security standards, we cannot be held liable for any loss
              or damage resulting from unauthorized access to your data during
              website use or order placement, unless it is proven to have
              occurred due to our negligence.
            </p>
          </div>
          <div>
            <h1 className="text-[24px] md:text-[32px] sub-title">
              Notice and Communication
            </h1>
            <p>
              All communications shall be conducted through the registered email
              addresses of the authorized representatives of both parties. Upon
              request by the sending party, the receiving party shall
              acknowledge receipt of any correspondence without undue delay
            </p>
          </div>
          <div>
            <h1 className="text-[24px] md:text-[32px] sub-title">
              Settlement of Dispute
            </h1>
            <p>
              Both parties shall make their best efforts to amicably resolve any
              disputes arising in connection with clients. Either party may
              initiate the dispute resolution process by issuing a written
              notice, upon which a period of fifteen (15) days will be provided
              to attempt settlement. If the parties fail to reach an amicable
              resolution within fifteen (15) days from the date of the first
              written notice, the dispute shall be referred to a competent court
              within the applicable jurisdiction.
            </p>
          </div>
          <div>
            <h1 className="text-[24px] md:text-[32px] sub-title">
              Governing Law
            </h1>
            <p>
              The whole process shall be governed and construed in accordance
              with the laws of Bangladesh.
            </p>
          </div>
          <div>
            <h1 className="text-[24px] md:text-[32px] sub-title">
              Severability
            </h1>
            <p>
              If any provision of the order is determined to be unenforceable,
              the remaining provisions shall continue in full force and effect.
              The parties may renegotiate the terms affected by such severance.
            </p>
          </div>
          <div>
            <h1 className="text-[24px] md:text-[32px] sub-title">
              Confidentiality
            </h1>
            <p>
              The KOW Company may disclose certain "Confidential Information" to
              its sister concerns to the extent necessary. "Confidential
              Information" shall refer to any information, whether oral or
              written, disclosed by one party to another in connection with this
              Contract.
            </p>
          </div>
          <div>
            <h1 className="text-[24px] md:text-[32px] sub-title">Assignment</h1>
            <p>
              The KOW Company cannot use a third party without taking the
              consent of the client.
            </p>
          </div>
          <div>
            <h1 className="text-[24px] md:text-[32px] sub-title">
              Intellectual Property Rights (IPR)
            </h1>
            <p>
              The KOW Company warrants that it has not infringed, does not
              infringe, and shall not infringe the intellectual property rights
              of any third party in relation to the services provided. The KOW
              Company shall indemnify and hold its clients harmless from any
              costs, claims, or consequences arising from such infringement.
            </p>
            <p>
              Each party agrees to hold all Confidential Information of the
              other party in trust and confidence and to protect it with at
              least the same level of care as it uses to protect its own
              Confidential Information, which shall, in any case, be a
              reasonable standard of protection. Confidential Information shall
              not be used for any purpose other than as necessary to fulfill the
              obligations or exercise the rights under this Agreement.
            </p>
            <p>
              Unless required by a valid order of a court of competent
              jurisdiction, a law enforcement agency, a relevant regulatory
              body, or otherwise required by law, neither party shall disclose
              the other party's Confidential Information to any third party
              without prior written consent. Disclosure shall be limited to
              those employees or contractors who are bound by confidentiality
              obligations no less restrictive than those contained herein and
              who have a legitimate need to know such information for the
              purposes of this Agreement.
            </p>
          </div>
        </div>
      </div>
      <FooterGrid />
    </>
  );
};

export default page;
