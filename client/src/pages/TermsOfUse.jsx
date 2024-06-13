import React from "react";
import Header from "../components/Header";
import "../styles/TermsOfUse.scss";
import { FaCircle } from "react-icons/fa";

const TermsOfUse = () => {
  return (
    <div>
      <Header />
      <div className="fixwidth">
        <div className="terms_top">
          <div className="title_top">Terms of Service</div>
          <strong>Terms of Use:</strong>
          <p>
            These Terms of Use apply to the use of the Platform of DTdoc
            (StudeerSnel B.V.). Please read these Terms of Use carefully in
            order to ensure that you are aware of your rights and obligations
            when using the Platform. You can download and print this document.
            These Terms of Use, inter alia, describe the following aspects of
            the relationship between you and DTdoc:
          </p>
          <ul>
            <li>
              The provision of Study Material (article 7) and creating a Profile
              (article 5);
            </li>
            <li>The use of the AI Q&A functionality (article 8);</li>
            <li>The notice and take down procedure (article 15);</li>
            <li>The limitation of liability of DTdoc (article 16)</li>
          </ul>
        </div>
        <div className="content_main">
          <strong>Article 1. Applicability</strong>
          <ol>
            <li>
              These Terms of Use govern every use of the Platform. By using the
              Platform, you accept these Terms of Use. The applicability of any
              other terms and conditions is excluded.{" "}
            </li>
            <li>
              DTdoc is entitled to amend or supplement these Terms of Use. The
              most up-to-date Terms of Use can be found on the Platform. In the
              event of an amendment or supplementation that significantly affect
              your rights or obligations, DTdoc will bring these changes to your
              attention during the use of the Platform.
            </li>
            <li>
              In the event that you continue the use of the Platform after these
              Terms of Use have been amended or supplemented, you thereby
              irrevocably accept the amended or supplemented Terms of Use. If
              you do not agree with the amended or supplemented Terms of Use,
              the only option you have is to no longer use the Platform and to
              terminate your Profile.
            </li>
          </ol>
          <strong>Article 2. Availability</strong>
          <ol>
            <li>
              You accept that the Platform contains only the functionalities and
              other characteristics as found on the Platform at the time of use
              ("as is basis"). DTdoc expressly excludes any explicit and tacit
              guarantees, undertakings and warranties of any nature whatsoever
              including, but not limited to, with regard to the quality, safety,
              lawfulness, integrity and accuracy of the Platform, unless
              explicitly stated otherwise in these Terms of Use.
            </li>
            <li>
              You accept that the functionalities of the Platform may change.
            </li>
            <li>
              DTdoc is entitled to put the Platform (temporarily) out of service
              and/or to reduce the use of it without any prior notification and
              without being obliged to pay compensation to you, if in the
              opinion of DTdoc this is necessary, for instance, for maintenance
              of the Platform.
            </li>
            <li>
              DTdoc does not guarantee that the Platform or any part thereof
              will be accessible at all times and without any interruptions or
              failures. Failures in the Platform can occur as a result of
              failures in the internet or phone connection or by viruses or
              faults/defects. DTdoc is not liable or obliged to Students to pay
              compensation in any way whatsoever for any damage resulting or
              arising from the website being (temporarily) unavailable.
            </li>
            <li>
              DTdoc is at any time entitled to change, alter or shut down the
              Platform without becoming liable to you in any way. If you do not
              agree with the changes and/or amendments made by DTdoc, your only
              remedy is to cease the use of the Platform and to delete your
              Profile.
            </li>
          </ol>

          <strong>Article 3. Premium Account</strong>
          <ol>
            <li>
              {" "}
              Students can obtain Premium access by either posting Study
              Material to the Platform or by taking out a quarterly or yearly
              subscription. The prices are communicated on the Platform.
            </li>
            <li>Payment is due in the manner described on the Platform.</li>
            <li>
              For every document that you post, you can earn days of full
              Premium access. The number of days will be communicated via the
              Platform.
            </li>
            <li>
              DTdoc offers a 30 days free trial subscription, which allows you
              to view Premium Material available on the Platform. However,
              additional features such as printing and downloading Study
              Materials, remain exclusive to the full Premium subscription.
              After 30 days, your trial subscription automatically extends into
              a quarterly full Premium subscription, unless you cancel the
              subscription prior to that date. You can unsubscribe at any time
              via your Profile and no deductions will be made. After
              unsubscribing, you will retain access for the remainder of the
              trial period.
            </li>
            <li>
              It is possible that DTdoc offers longer/shorter free trial
              subscriptions in specific circumstances, such as actions for study
              societies. The applicable conditions will then be communicated by
              DTdoc.
            </li>
            <li>
              DTdoc may introduce or change the subscription fees from time to
              time, for which we will give you advance notice. If your current
              subscription is still running, the price will remain in force for
              the fixed term. If you do not agree with the price change, you
              must cancel your subscription by the end of the then-current
              subscription term. If you do not cancel your subscription after
              the price change goes into effect, you agree to pay the changed
              price.
            </li>
            <li>
              DTdoc may suspend or cancel your Premium Account if a payment is
              not successfully settled.
            </li>
            <li>
              The subscription period will be renewed automatically for the
              selected subscription period, unless you have cancelled your
              subscription on time (before the last day of your subscription).
              In case your subscription is automatically renewed, you have the
              right to cancel the subscription at any time after such renewal
              with a cancellation term of one (1) month. In case of cancellation
              you may request reimbursement of part of the subscription fee.
              This means that you pay for the period until the cancellation
              enters into force, based on the standard monthly fee.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
