import Image from "next/image";
import shape_1 from "@/assets/img/about/details/shape.png";

const TermsArea = () => {
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
                <h5 className="tg-section-subtitle mb-10 text-center">
                  Terms & Conditions – Grab That Trip
                </h5>

                <h2 className="mb-35 text-center">
                  Welcome to Grab That Trip!
                </h2>

                <p className="mb-10">
                  By accessing or using our website, mobile app, or booking any
                  travel service with us (“Platform”), you agree to these Terms
                  & Conditions (“Terms”). Please read them carefully as they
                  outline your rights, obligations, and the rules of engagement
                  when you travel with us.
                </p>

                <p className="mb-30">
                  If you do not agree with these Terms, please refrain from
                  using our Platform or making any bookings.
                </p>
              </div>

              {/* Section 1 */}
              <h4 className="mb-20">1. Definitions</h4>
              <p className="mb-10">
                • <strong>“Grab That Trip”, “We”, “Us”, “Our”</strong> refers to
                the company operating the brand Grab That Trip.
              </p>
              <p className="mb-10">
                • <strong>“User”, “You”, “Traveller”</strong> means any person
                accessing our Platform or making a booking.
              </p>
              <p className="mb-10">
                • <strong>“Supplier”</strong> refers to third-party service
                providers such as hotels, airlines, tour operators, or visa
                agencies.
              </p>
              <p className="mb-10">
                • <strong>“Services”</strong> include tours, activities,
                packages, transfers, and accommodations offered on the Platform.
              </p>

              <p className="mb-10">
                • <strong>“Quotation”</strong> refers to a customized travel
                proposal or package shared with you, specifying inclusions,
                exclusions, prices, and cancellation rules.
              </p>

              <p className="mb-10">
                • <strong>“Force Majeure”</strong> means events beyond
                reasonable control (natural disasters, pandemics, strikes,
                political unrest, government actions, etc.).
              </p>

              {/* Section 2 */}
              <h4 className="mt-30 mb-20">2. Scope of Services</h4>
              <p className="mb-10">
                • Grab That Trip acts as an aggregator and facilitator of travel
                services. We do not own or operate airlines, hotels, or activity
                providers unless explicitly stated.
              </p>
              <p className="mb-10">
                • Your booking represents an agreement between you and the
                respective supplier, and we facilitate this process on your
                behalf.
              </p>

              {/* Section 3 */}
              <h4 className="mt-30 mb-20">3. Eligibility</h4>
              <p className="mb-10">
                • You must be at least 18 years old and legally capable of
                entering a binding agreement.
              </p>
              <p className="mb-10">
                • If booking for others, you confirm you have authorization to
                do so and accept these Terms on their behalf.
              </p>
              <p className="mb-10">
                • You are responsible for providing accurate personal and travel
                details during the booking process.
              </p>

              {/* Section 4 */}
              <h4 className="mt-30 mb-20">4. Booking Process</h4>
              <p className="mb-10">
                • Bookings are confirmed only after payment is successfully
                processed and a confirmation email/voucher is issued.
              </p>
              <p className="mb-10">
                • All prices are quoted in INR (₹) unless mentioned otherwise
                and are subject to change based on supplier availability.
              </p>
              <p className="mb-10">
                • The final confirmation may differ slightly from the initial
                quotation depending on hotel/flight availability at the time of
                booking.
              </p>

              {/* Section 5 */}
              <h4 className="mt-30 mb-20">
                5. Cancellations, Refunds & Modifications
              </h4>
              <h5 className="mt-20 mb-10">A. By Traveller</h5>
              <p className="mb-10">
                • Cancellation requests must be made via email or directly
                through our Platform.
              </p>
              <p className="mb-10">
                • The specific cancellation policy (including charges or refund
                eligibility) will be clearly mentioned in your quotation or
                activity listing.
              </p>
              <p className="mb-10">
                • Refunds, if applicable, are processed after deducting
                non-refundable charges (supplier fees, taxes, service fees).
              </p>
              <p className="mb-10">
                • Partial refunds or credit vouchers may be issued based on
                supplier policies.
              </p>

              <h5 className="mt-20 mb-10">B. By Grab That Trip or Supplier</h5>
              <p className="mb-10">
                • A booking may be cancelled due to weather conditions, safety
                concerns, insufficient participation, or Force Majeure events.
              </p>
              <p className="mb-10">• In such cases, we’ll try to offer:</p>
              <ul className="ml-40 mb-10">
                <li>o a full or partial refund, or</li>
                <li>o an alternate date or service of equal value.</li>
              </ul>

              <h5 className="mt-20 mb-10">B. By Grab That Trip or Supplier</h5>
              <p className="mb-10">
                • Changes (date, number of travellers, itinerary) are subject to
                supplier approval and applicable charges.
              </p>
              <p className="mb-10">
                • Price differences arising due to modifications must be borne
                by the traveller.
              </p>

              {/* Section 6 */}
              <h4 className="mt-30 mb-20">6. Payments</h4>
              <p className="mb-10">
                • Payments can be made online via debit/credit card, UPI, net
                banking, or other approved methods.
              </p>
              <p className="mb-10">
                • All bookings are considered confirmed only upon receipt of
                full payment or the required advance.
              </p>
              <p className="mb-10">
                • Outstanding balances must be paid as per the timeline
                mentioned in your quotation, failing which the booking may be
                cancelled without notice.
              </p>

              {/* Section 7 */}
              <h4 className="mt-30 mb-20">7. Pricing & Inclusions</h4>
              <p className="mb-10">
                • Prices are based on current exchange rates, fuel costs, taxes,
                and supplier tariffs at the time of quotation.
              </p>
              <p className="mb-10">
                • Grab That Trip reserves the right to revise prices in case of
                significant fluctuations in these factors.
              </p>
              <p className="mb-10">
                • Any item or service not explicitly mentioned under
                “Inclusions” in your quotation is treated as an exclusion.
              </p>

              {/* Section 8 */}
              <h4 className="mt-30 mb-20">
                8. Responsibility of the Traveller
              </h4>
              <p className="mb-10">You are responsible for:</p>
              <ul className="mb-10">
                <li>• Checking all booking details upon confirmation.</li>
                <li>
                  • Carrying valid passports, visas, travel insurance, and
                  identification.
                </li>
                <li>
                  • Complying with local laws, customs, and safety regulations.
                </li>
                <li>
                  • Being punctual at pickup points and respecting the itinerary
                  schedule.
                </li>
                <li>
                  • Maintaining respectful behaviour towards other travellers,
                  guides, and locals.
                </li>
              </ul>
              <p className="mb-10">
                Grab That Trip and its suppliers reserve the right to refuse
                service if a traveller behaves inappropriately or jeopardizes
                others’ safety.
              </p>

              {/* Section 9 */}
              <h4 className="mt-30 mb-20">9. Our Role & Limitations</h4>
              <p className="mb-10">
                • Grab That Trip serves as a booking intermediary between you
                and the supplier.
              </p>

              <p className="mb-10">• We cannot be held liable for:</p>
              <ul className="ml-40 mb-10">
                <li>
                  - Delays, cancellations, or operational issues by airlines,
                  hotels, or transport providers.
                </li>
                <li>
                  - Injuries, losses, damages, or expenses caused by third
                  parties or unforeseen events.
                </li>
                <li>
                  - Changes in itineraries due to weather, traffic, or safety
                  conditions.
                </li>
              </ul>
              <p className="mb-10">
                • Our total liability, in any case, shall not exceed the total
                amount paid by you for the booking.
              </p>

              {/* Section 10 */}
              <h4 className="mt-30 mb-20">10. Force Majeure</h4>
              <p className="mb-10">
                Grab That Trip shall not be held liable for any failure or delay
                in performance caused by events beyond our reasonable control
                including but not limited to natural calamities, strikes, wars,
                pandemics, or governmental restrictions. In such situations,
                refunds (if any) will depend solely on the respective supplier’s
                policies.
              </p>

              {/* Section 11 */}
              <h4 className="mt-30 mb-20">11. Intellectual Property</h4>
              <p className="mb-10">
                All content on the Grab That Trip Platform including logos,
                text, graphics, images, and software is owned or licensed by us.
                You may not reproduce, distribute, or modify any part of our
                Platform without prior written permission.
              </p>

              {/* Section 12 */}
              <h4 className="mt-30 mb-20">12. Reviews & User Content</h4>
              <p className="mb-10">
                By submitting photos, reviews, or testimonials to Grab That
                Trip, you grant us a non-exclusive, royalty-free license to use,
                reproduce, or display them for marketing and promotional
                purposes.
              </p>
              <p className="mb-10">
                We reserve the right to moderate or remove content that violates
                community guidelines, privacy, or legal standards.
              </p>

              {/* Section 13 */}
              <h4 className="mt-30 mb-20">13. Reviews & User Content</h4>
              <p className="mb-10">
                You agree to indemnify and hold harmless Grab That Trip, its
                directors, employees, and agents from any claims, damages, or
                losses arising from your:
              </p>
              <ul className="mb-10">
                <li>• breach of these Terms,</li>
                <li>• misuse of our Platform, or</li>
                <li>• violation of any law or third-party rights.</li>
              </ul>

              {/* Section 14 */}
              <h4 className="mt-30 mb-20">14. Reviews & User Content</h4>
              <p className="mb-10">
                These Terms are governed by the laws of India. All disputes
                shall be subject to the{" "}
                <strong>
                  {" "}
                  exclusive jurisdiction of the courts in [City, State — e.g.,
                  New Delhi, India].
                </strong>
              </p>

              {/* Section 15 */}
              <h4 className="mt-30 mb-20">15. Reviews & User Content</h4>
              <p className="mb-10">
                Grab That Trip reserves the right to modify these Terms at any
                time. Updated versions will be posted on our Platform, and your
                continued use constitutes acceptance of the revised Terms.
              </p>

              {/* section 16 */}
              <h4 className="mt-30 mb-20">Contact Us</h4>

              <p className="mb-10">
                For questions, cancellations, or complaints, reach out to:
              </p>

              <h5>Grab That Trip</h5>
              <p className="mb-10">
                📍 B-85, Third Floor, Defence Colony <br />
                📧 info@grabthattrip.com <br />
                🌐 www.grabthattrip.com
              </p>

              <h4 className="mt-30 mb-20">Traveller's Declaration</h4>
              <p className="mb-10">
                By confirming a booking or making any payment to Grab That Trip,
                you acknowledge that:
              </p>
              <ul className="mb-100">
                <li>
                  • You have read, understood, and accepted these Terms &
                  Conditions.
                </li>
                <li>
                  • You are aware of the cancellation, refund, and liability
                  clauses.
                </li>
                <li>
                  • You consent to communication via phone, email, or WhatsApp
                  regarding your booking.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsArea;
