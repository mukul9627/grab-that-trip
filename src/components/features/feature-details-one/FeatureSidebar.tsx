"use client";

import { useState } from "react";
import { useBooking } from "@/hooks/useBooking";

type FeatureSidebarProps = {
  package_id: number;
  package_name: string;
  base_price: number;
  offer_price: number;
};

const FeatureSidebar = ({
  package_id,
  package_name,
  base_price,
  offer_price,
}: FeatureSidebarProps) => {
  const { loading, sendEnquiry } = useBooking();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    travel_date: "",
    travel_count: "",
    adult_count: "",
    child_count: "",
    infant_count: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (loading) return;

  const payload = {
    PackageId: package_id,
    FullName: formData.full_name,
    Email: formData.email,
    CountryCode: "+91",
    Phone: formData.phone,
    TravelDate: formData.travel_date,
    TravelCount: Number(formData.travel_count || 0),
    AdultCount: Number(formData.adult_count || 0),
    ChildCount: Number(formData.child_count || 0),
    InfantCount: Number(formData.infant_count || 0),
    Message: formData.message,
  };

  const response = await sendEnquiry(payload);

  if (response.ok && response.data?.status) {
    alert("Enquiry sent successfully ✅");
    setFormData({
      full_name: "",
      email: "",
      phone: "",
      travel_date: "",
      travel_count: "",
      adult_count: "",
      child_count: "",
      infant_count: "",
      message: "",
    });
  } else {
    console.error("API Error:", response.data || response.error);
    alert(response.data?.message || "Failed to send enquiry ❌");
  }
};


  return (
    <div className="booking-card">
      <div className="booking-header">
        <div className="thumb" />
        <div>
          <h5>{package_name}</h5>
          <p className="price">
            ₹{offer_price} <span>₹{base_price}</span>
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <div className="row">
          <div className="col-3">
            <input className="code" value="+91" readOnly />
          </div>
          <div className="col-9">
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <input
          type="date"
          name="travel_date"
          value={formData.travel_date}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="travel_count"
          placeholder="Total Travellers"
          value={formData.travel_count}
          onChange={handleChange}
        />

        <div className="row">
          <div className="col-4">
            <input
              type="number"
              name="adult_count"
              placeholder="Adults"
              value={formData.adult_count}
              onChange={handleChange}
            />
          </div>
          <div className="col-4">
            <input
              type="number"
              name="child_count"
              placeholder="Children"
              value={formData.child_count}
              onChange={handleChange}
            />
          </div>
          <div className="col-4">
            <input
              type="number"
              name="infant_count"
              placeholder="Infants"
              value={formData.infant_count}
              onChange={handleChange}
            />
          </div>
        </div>

        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Enquiry"}
        </button>
      </form>

      {/* ✅ INTERNAL CSS */}
      <style jsx>{`
        .booking-card {
          background: #fff;
          padding: 18px;
          border-radius: 14px;
          box-shadow: 0 0 0 1px #e5e5e5;
        }

        .booking-header {
          display: flex;
          gap: 12px;
          margin-bottom: 18px;
          align-items: center;
        }

        .thumb {
          width: 42px;
          height: 42px;
          background: #e0e0e0;
          border-radius: 8px;
        }

        h5 {
          font-size: 14px;
          font-weight: 600;
          margin: 0 0 4px;
        }

        .price {
          font-size: 16px;
          font-weight: 700;
        }

        .price span {
          font-size: 13px;
          color: #888;
          text-decoration: line-through;
          margin-left: 6px;
        }

        input,
        textarea {
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          border: 1px solid #cfcfcf;
          font-size: 14px;
          margin-bottom: 12px;
          outline: none;
        }

        textarea {
          height: 90px;
          resize: none;
        }

        .row {
          display: flex;
          gap: 0px;
        }

        .code {
          width: 70px;
          text-align: center;
          font-weight: 600;
        }

        button {
          width: 100%;
          padding: 16px;
          background: #0a6a63;
          color: #fff;
          border: none;
          border-radius: 14px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
        }

        button:hover {
          background: #085c56;
        }
      `}</style>
    </div>
  );
};

export default FeatureSidebar;
