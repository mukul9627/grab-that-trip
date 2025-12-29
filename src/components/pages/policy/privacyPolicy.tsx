import Image from "next/image";
import shape_1 from "@/assets/img/about/details/shape.png";

const privacyPolicy = () => {
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
                {/* <h5 className="tg-section-subtitle mb-10 text-center">
                  Terms & Conditions – Grab That Trip
                </h5> */}

                <h2 className="mb-35 text-center">
                  Privacy Policy Grab That Trip
                </h2>

                <p className="mb-10">
                  Welcome to Grab That Trip (“Company”, “we”, “us”, “our”).
                  We’re a travel brand operating in Dubai, UAE and India,
                  committed to protecting your privacy and personal information.
                </p>
                <p className="mb-10">
                  This Privacy Policy describes how we collect, use, share, and
                  protect your information when you use our website, mobile
                  application, or any of our travel services.
                </p>

                <p className="mb-30">
                  By accessing or using our services, you agree to this Privacy
                  Policy. If you do not agree, please refrain from using our
                  website or services.
                </p>
              </div>

              {/* Section 1 */}

              {/* Section 5 */}
              <h4 className="mb-20">1. Information We Collect</h4>
              <p className="mb-10">
                • We collect the following types of information to deliver
                smooth, customized, and secure travel experiences:
              </p>
              <h5 className="mt-20 mb-10">A. Personal Information</h5>
              <ul className="mb-10">
                <li>• Full name</li>
                <li>• Email address and phone number</li>
                <li>• Date of birth, gender, and nationality (where needed)</li>
                <li>
                  • Passport or ID details (for bookings requiring government
                  documentation)
                </li>
                <li>
                  • Billing address and payment details (handled via secure
                  payment gateways; we do not store full card details)
                </li>
                <li>• Travel history, preferences, and itinerary details</li>
              </ul>

              <h5 className="mt-20 mb-10">B. Technical and Usage Data</h5>
              <ul className="mb-10">
                <li>
                  • IP address, browser type, operating system, and device
                  information
                </li>
                <li>
                  • Website navigation patterns, time spent, and interactions
                </li>
                <li>• Location data (when permission is granted)</li>
              </ul>

              <h5 className="mt-20 mb-10">C. Cookies and Tracking</h5>
              <p className="mb-10">We use cookies and similar tools to:</p>
              <ul className="mb-10">
                <li>• Improve website functionality</li>
                <li>• Remember preferences</li>
                <li>• Analyze performance</li>
                <li>• Serve personalized recommendations and offers</li>
              </ul>
              <p className="mb-10">
                You can manage cookie preferences via your browser settings.
              </p>

              {/* Section 2 */}
              <h4 className="mt-30 mb-20">2. Scope of Services</h4>
              <p className="mb-10">We use your data to:</p>
              <ul className="mb-10">
                <li>
                  • Process bookings, reservations, and travel-related
                  transactions
                </li>
                <li>
                  • Send confirmations, updates, and support communications
                </li>
                <li>
                  • Improve our website, services, and customer experience
                </li>
                <li>• Send promotional offers (only if you’ve opted in)</li>
                <li>• Conduct analytics, audits, and fraud prevention</li>
                <li>• Comply with legal obligations in India and the UAE</li>
              </ul>
              <p className="mb-10">We never sell your personal information.</p>

              {/* Section 3 */}
              <h4 className="mt-30 mb-20">3. Legal Basis for Processing</h4>
              <p className="mb-10">
                Depending on your location, we process your personal data under
                one or more of the following bases:
              </p>
              <ul className="mb-10">
                <li>
                  • Consent: When you voluntarily provide information or opt-in
                  for marketing.
                </li>
                <li>
                  • Contractual Necessity: To fulfil travel bookings and provide
                  related services.
                </li>
                <li>
                  • Legitimate Interests: For improving our platform, analytics,
                  or ensuring security.
                </li>
                <li>
                  • Legal Obligation: To comply with UAE or Indian government
                  regulations, tax, or immigration laws.
                </li>
              </ul>

              {/* Section 4 */}
              <h4 className="mt-30 mb-20">4. Sharing and Disclosure</h4>
              <p className="mb-10">We may share your data with:</p>
              <ul className="mb-10">
                <li>
                  • Travel partners and suppliers: Airlines, hotels, tour
                  operators, and ground service providers.
                </li>
                <li>• Payment processors: For secure transaction handling.</li>
                <li>
                  • Technology vendors: Cloud storage, analytics, and CRM
                  providers.
                </li>
                <li>
                  • Government authorities: As required by law in UAE or India
                  (e.g., customs, immigration).
                </li>
                <li>
                  • Business transfers: In case of merger, acquisition, or
                  restructuring.
                </li>
              </ul>
              <p className="mb-10">
                All third parties are bound by confidentiality and data
                protection agreements.
              </p>

              {/* Section 5 */}
              <h4 className="mt-30 mb-20">
                5. Cancellations, Refunds & Modifications
              </h4>
              <p className="mb-10">
                Your data is retained only as long as necessary to:
              </p>
              <ul className="mb-10">
                <li>• Complete your travel bookings</li>
                <li>• Fulfil legal, accounting, or tax requirements</li>
                <li>• Resolve disputes or enforce agreements</li>
              </ul>
              <p className="mb-10">
                Once data is no longer required, it is securely deleted or
                anonymized.
              </p>

              {/* Section 6 */}
              <h4 className="mt-30 mb-20">6. International Data Transfers</h4>
              <p className="mb-10">
                As we operate in both Dubai and India, your data may be stored
                or processed in either location or on secure servers abroad.
              </p>
              <p className="mb-10">
                We ensure that any cross-border transfer of data complies with:
              </p>
              <ul className="mb-10">
                <li>• UAE Federal Decree-Law No. 45 of 2021 (PDPL)</li>
                <li>• India’s Digital Personal Data Protection Act, 2023</li>
                <li>
                  • Appropriate security safeguards such as contractual clauses
                  or encryption
                </li>
              </ul>

              {/* Section 7 */}
              <h4 className="mt-30 mb-20">7. Pricing & Inclusions</h4>
              <p className="mb-10">
                Depending on your jurisdiction (UAE or India), you have the
                right to:
              </p>
              <ul className="mb-10">
                <li>• Access your personal data</li>
                <li>• Request correction of inaccurate information</li>
                <li>
                  • Withdraw consent (for marketing or optional data collection)
                </li>
                <li>• Request deletion of data (where permissible)</li>
                <li>• Restrict processing under certain conditions</li>
                <li>• Data portability (receive a copy of your information)</li>
              </ul>
              <p className="mb-10">
                You can exercise these rights by emailing us at [insert your
                email address]. We may verify your identity before fulfilling
                requests.
              </p>

              {/* Section 8 */}
              <h4 className="mt-30 mb-20">
                8. Date Security
              </h4>
              <p className="mb-10">We take your privacy seriously.
Grab That Trip uses industry-standard security practices including:
</p>
              <ul className="mb-10">
                <li>•	SSL encryption for website and transactions</li>
                <li>
                  •	Secure, access-controlled databases
                </li>
                <li>
                 •	Regular vulnerability testing
                </li>
                <li>
                 •	Staff confidentiality agreements
                </li>
              </ul>
              <p className="mb-10">
                While we do our best, no online platform is 100% risk-free. In case of a data breach, we’ll notify affected users and relevant authorities as required by law.
              </p>

              {/* Section 9 */}
              <h4 className="mt-30 mb-20">9. Children’s Privacy</h4>
              <p className="mb-10">
                Our services are not directed at individuals under 18 years of age.
We do not knowingly collect personal data from minors. If such data is discovered, it will be deleted immediately.

              </p>

              

              {/* Section 10 */}
              <h4 className="mt-30 mb-20">10. Marketing and Communication</h4>
              <p className="mb-10">
               •	You may receive promotional content from us via email, SMS, or WhatsApp only after opting in.
              </p>
               <p className="mb-10">
               •	You can unsubscribe anytime by clicking “unsubscribe” in our emails or contacting us directly.
              </p>
               <p className="mb-10">
               •	We may occasionally send service-related messages (such as booking confirmations or travel alerts), which cannot be opted out of.
              </p>

              {/* Section 11 */}
              <h4 className="mt-30 mb-20">11. Links to Third-Party Websites</h4>
              <p className="mb-10">
               Our website may contain links to third-party sites (e.g., hotels, airlines, travel partners).
We are not responsible for their privacy practices. Please review their policies before sharing information.

              </p>

              {/* Section 12 */}
              <h4 className="mt-30 mb-20">12. Policy Updates</h4>
              <p className="mb-10">
                We may update this policy occasionally to reflect legal or operational changes.
If changes are significant, we’ll notify you via email or website notice.
Continued use of our services after such updates constitutes acceptance of the revised policy.

              </p>
              <p className="mb-10">
                We reserve the right to moderate or remove content that violates
                community guidelines, privacy, or legal standards.
              </p>

              {/* Section 13 */}
              <h4 className="mt-30 mb-20">13. Contact Us</h4>
              <p className="mb-10">
                If you have questions, complaints, or want to exercise your rights, reach out to:
              </p>
                    

              <h5>Grab That Trip</h5>
              <p className="mb-100">
                📧 privacy@grabthattrip.com <br />
                📞 [+91 89299 19292]
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default privacyPolicy;
