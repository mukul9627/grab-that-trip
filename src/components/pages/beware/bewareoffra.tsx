import Image from "next/image";
import shape_1 from "@/assets/img/about/details/shape.png";

const BewareOfFraud = () => {
  return (
    <div className="tg-about-area p-relative z-index-1 pt-140 pb-140">
      <Image
        className="tg-about-details-shape p-absolute d-none d-lg-block"
        src={shape_1}
        alt="shape"
      />

      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="tg-chose-content ml-60">
              {/* Header */}
              <div className="tg-chose-section-title mb-50">
                <h2 className="mb-35 text-center">
                  Beware of Frauds – Grab That Trip
                </h2>

                <p className="mb-10">
                  Welcome to Grab That Trip We are a travel brand operating in
                  India and Dubai, UAE, committed to protecting our customers
                  from fraudulent activities, impersonation, and online travel
                  scams.
                </p>

                <p className="mb-30">
                  This page is intended to help you identify fraud, understand
                  our official communication channels, and take appropriate
                  action if you suspect any fraudulent activity related to Grab
                  That Trip.
                </p>
              </div>

              {/* Section 1 */}
              <h4 className="mb-20">1. Official Communication Channels</h4>
              <p className="mb-10">
                Please note that Grab That Trip communicates with customers only
                through the following official channels:
              </p>
              <ul className="mb-10">
                <li>🌐 Website: https://www.grabthattrip.com/</li>
                <li>📞 Phone: +91 89299 19292</li>
                <li>📧 Email: info@grabthattrip.com</li>
              </ul>
              <p className="mb-10">
                We do not authorize bookings, payments, or offers through
                unofficial phone numbers, personal email IDs, or fake social
                media profiles.
              </p>

              {/* Section 2 */}
              <h4 className="mt-30 mb-20">2. Common Types of Travel Fraud</h4>
              <p className="mb-10">
                Customers should remain cautious of the following fraudulent
                practices:
              </p>
              <ul className="mb-10">
                <li>
                  • Fake websites or lookalike domains claiming to represent
                  Grab That Trip
                </li>
                <li>
                  • Individuals posing as our agents on WhatsApp, Telegram, or
                  social media
                </li>
                <li>
                  • Unrealistic travel deals or “limited-time offers” at
                  extremely low prices
                </li>
                <li>
                  • Requests for payment to personal bank accounts or wallets
                </li>
                <li>
                  • Fraudulent calls or emails asking for OTPs, passwords, or
                  card details
                </li>
                <li>
                  • Fake refund or prize-winning messages using our brand name
                </li>
              </ul>
              <p className="mb-10">
                Grab That Trip never asks for sensitive information such as
                OTPs, CVV numbers, or passwords.
              </p>

              {/* Section 3 */}
              <h4 className="mt-30 mb-20">3. Payment Safety Guidelines</h4>
              <p className="mb-10">To stay protected:</p>
              <ul className="mb-10">
                <li>
                  • Make payments only via secure payment links or gateways
                  shared from our official email or website
                </li>
                <li>
                  • Avoid transferring money to personal or unverified bank
                  accounts
                </li>
                <li>
                  • Always verify payment confirmation and booking details
                  received from us
                </li>
                <li>• Keep records of all transactions and communications</li>
              </ul>
              <p className="mb-10">
                If in doubt, contact our support team before making any payment.
              </p>

              {/* Section 4 */}
              <h4 className="mt-30 mb-20">
                4. Social Media & Messaging Apps Disclaimer
              </h4>
              <p className="mb-10">
                While we may have an online presence, Grab That Trip does not
                confirm bookings or collect payments solely via social media DMs
                or messaging apps without official email confirmation.
              </p>
              <p className="mb-10">
                Any account claiming to offer deals or request payments outside
                our official channels should be treated as suspicious.
              </p>

              {/* Section 5 */}
              <h4 className="mt-30 mb-20">
                5. What to Do If You Suspect Fraud
              </h4>
              <p className="mb-10">
                If you believe you have encountered a fraudulent activity
                involving our brand:
              </p>
              <ul className="mb-10">
                <li>1. Do not make any payment or share personal details</li>
                <li>2. Take screenshots or save all communication</li>
                <li>
                  3. Contact Grab That Trip immediately using the details below
                </li>
                <li>
                  4. Report the incident to your local cybercrime authority
                  (India or UAE), if necessary
                </li>
              </ul>
              <p className="mb-10">
                We will assist you with verification and guidance to the best of
                our ability.
              </p>
              {/* Section 6 */}
              <h4 className="mt-30 mb-20">6. Limitation of Liability</h4>
              <p className="mb-10">Grab That Trip is not responsible for:</p>
              <ul className="mb-10">
                <li>
                  • Losses arising from dealings with unauthorized third parties
                </li>
                <li>• Payments made outside our official channels</li>
                <li>
                  • Fraudulent activities conducted by individuals falsely
                  claiming association with us
                </li>
              </ul>
              <p className="mb-10">
                Customers are advised to exercise due diligence before making
                travel-related payments.
              </p>

              {/* Section 7 */}
              <h4 className="mt-30 mb-20">7. Policy Updates</h4>
              <p className="mb-10">
                This policy may be updated periodically to address emerging
                fraud risks or operational changes.
              </p>
              <p className="mb-10">
                Any updates will be published on our website. Continued use of
                our services constitutes acceptance of the updated policy.{" "}
              </p>

              {/* Section 8 */}
              <h4 className="mt-30 mb-20">8. Contact Us</h4>
              <p className="mb-10">
                For verification, support, or to report suspected fraud:
              </p>

              <h5>Grab That Trip</h5>
              <p className="mb-10">
                For verification, support, or to report suspected fraud, please
                contact:
              </p>
              <p className="mb-10">
                🌐 Website: https://www.grabthattrip.com/ <br />
                📞 Phone: +91 89299 19292 <br />
                📧 Email: info@grabthattrip.com
              </p>
              <p className="mb-100">
                Your safety is important to us. Always verify before you book.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BewareOfFraud;
