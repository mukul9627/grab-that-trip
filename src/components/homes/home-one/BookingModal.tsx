"use client";

import { useState } from "react";
import { useBooking } from "@/hooks/useBooking";
import { countryCodes } from "@/data/countryCodes";

type BookingModalProps = {
  open: boolean;
  onClose: () => void;
  package_id: number;
  package_name: string;
  base_price: number;
  offer_price: number;
};

export default function BookingModal({
  open,
  onClose,
  package_id,
  package_name,
  base_price,
  offer_price,
}: BookingModalProps) {
  if (!open) return null;

  const { loading, sendEnquiry } = useBooking();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    country_code: "+91",
    phone: "",
    travel_date: "",
    travel_count: "",
    adult_count: "",
    child_count: "",
    infant_count: "",
    message: "",
  });

  const updateForm = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    const travelCountNum = Number(form.travel_count);
    const adultNum = Number(form.adult_count);
    const childNum = Number(form.child_count);
    const infantNum = Number(form.infant_count);

    if (adultNum + childNum + infantNum !== travelCountNum) {
      alert("Total travellers must equal Travel Count.");
// alert(
//       `Total travellers (Adults + Children + Infants) must equal Travel Count.\n\n` +
//       `Travel Count = ${travelCountNum}\n` +
//       `Adults + Children + Infants = ${adultNum + childNum + infantNum}`
//     );
      
      return;
    }
    const payload = {
      PackageId: package_id,
      FullName: form.full_name,
      Email: form.email,
      CountryCode: form.country_code,
      Phone: form.phone,
      TravelDate: form.travel_date,
      TravelCount: form.travel_count,
      AdultCount: form.adult_count,
      ChildCount: form.child_count,
      InfantCount: form.infant_count,
      Message: form.message,
    };

    const result = await sendEnquiry(payload);

    if (result.ok && result.data.status) {
      setIsSuccess(true); // 🔥 show thank-you message
      return;
    }

    alert(result.data?.message || "Failed to send enquiry.");
  };

  return (
    <>
      {/* OVERLAY */}
      <div className="modal-overlay" onClick={onClose}></div>

      {/* POPUP */}
      <div className="modal-wrapper" onClick={onClose}>
        <div className="modal-box" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>

          <h2 className="modal-title">{package_name}</h2>

          <p className="modal-price">
            <span className="old">₹{base_price}</span>
            <span className="new">₹{offer_price}</span>
          </p>

          <div className="modal-form">
            {/* Thank you  */}

            {!isSuccess ? (
              <>
                {/* ALL your input fields and submit button */}
                <input
                  name="full_name"
                  placeholder="Full Name"
                  value={form.full_name}
                  onChange={updateForm}
                />

                <input
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={updateForm}
                />

                <div className="row">
                  <div className="col-3">
                    <select
                      name="country_code"
                      value={form.country_code}
                      onChange={updateForm}
                    >
                      {countryCodes.map((c) => (
                        <option key={c.iso2} value={c.dial_code}>
                          {c.dial_code}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-9">
                    {" "}
                    <input
                      name="phone"
                      placeholder="Phone Number"
                      value={form.phone}
                      onChange={updateForm}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-6">
                    <input
                      type="date"
                      name="travel_date"
                      value={form.travel_date}
                      onChange={updateForm}
                    />
                  </div>
                  <div className="col-6">
                    {" "}
                    <input
                      name="travel_count"
                      placeholder="Travel Count"
                      value={form.travel_count}
                      onChange={updateForm}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-4">
                    {" "}
                    <input
                      name="adult_count"
                      placeholder="Adults"
                      value={form.adult_count}
                      onChange={updateForm}
                    />
                  </div>
                  <div className="col-4">
                    {" "}
                    <input
                      name="child_count"
                      placeholder="Children"
                      value={form.child_count}
                      onChange={updateForm}
                    />
                  </div>
                  <div className="col-4">
                    {" "}
                    <input
                      name="infant_count"
                      placeholder="Infants"
                      value={form.infant_count}
                      onChange={updateForm}
                    />
                  </div>
                </div>

                <textarea
                  name="message"
                  placeholder="Message"
                  value={form.message}
                  onChange={updateForm}
                ></textarea>

                <button className="submit-btn" onClick={handleSubmit}>
                  {loading ? "Sending..." : "Send Enquiry"}
                </button>
              </>
            ) : (
              <div
                className="thank-box"
                style={{ textAlign: "center", padding: "20px" }}
              >
                <h2 style={{ color: "#007b73" }}>🎉 Thank You!</h2>
                <p>Your enquiry has been submitted successfully.</p>
                <p>We will contact you shortly.</p>

                <button className="submit-btn" onClick={onClose}>
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CSS INSIDE THIS FILE */}
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          z-index: 9998;
        }

        .modal-wrapper {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
        }

        .modal-box {
          width: 100%;
          max-width: 480px;
          background: #fff;
          padding: 25px;
          border-radius: 12px;
          position: relative;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
          animation: fadeIn 0.25s ease-in-out;
        }

        .modal-close {
          position: absolute;
          top: 10px;
          right: 15px;
          font-size: 28px;
          cursor: pointer;
          border: none;
          background: none;
        }

        .modal-title {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .modal-price .old {
          text-decoration: line-through;
          color: #777;
          margin-right: 8px;
        }
        .modal-price .new {
          color: #00994d;
          font-size: 20px;
          font-weight: bold;
        }

        .modal-form input,
        .modal-form select,
        .modal-form textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 8px;
          margin-bottom: 12px;
          font-size: 15px;
        }

        .row {
          display: flex;
          //   gap: 10px;
        }

        .submit-btn {
          width: 100%;
          padding: 14px;
          background: #007b73;
          color: #fff;
          font-size: 16px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }

        .submit-btn:hover {
          background: #00665d;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.92);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}
