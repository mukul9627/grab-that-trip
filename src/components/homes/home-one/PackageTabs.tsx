"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type TabId = "economy" | "comfort" | "luxury";

type PackageData = {
  title: string;
  price: string;
  nights: string;
  description: string;
  rating: string;
  reviews: number;
  img: string;
  sideImgs?: string[];
};

const tabs: { id: TabId; label: string }[] = [
  { id: "economy", label: "Economy" },
  { id: "comfort", label: "Comfort" },
  { id: "luxury", label: "Luxury" },
];

const data: Record<TabId, PackageData[]> = {
  economy: [
    {
      title: "France",
      price: "₹ 50,999",
      nights: "9 Nights - 10 Days",
      description:
        "4 star hotel stay | Daily breakfast | Paris to Loire Valley | Departure from Nice",
      rating: "4.8",
      reviews: 976,
     img: "/assets/img/blog/grid/grid-3.jpg",
      sideImgs: ["/images/france2.jpg", "/images/france3.jpg"],
    },
    {
      title: "New York City, USA",
      price: "₹ 60,999",
      nights: "9 Nights - 10 Days",
      description: "Iconic cityscapes to breathtaking natural wonders",
      rating: "4.9",
      reviews: 876,
      img: "/assets/img/blog/grid/grid-2.jpg",
      sideImgs: ["/images/ny2.jpg", "/images/ny3.jpg"],
    },
    {
      title: "Dubai, UAE",
      price: "₹ 35,999",
      nights: "9 Nights - 10 Days",
      description: "Dazzling blend of tradition, luxury, adventure",
      rating: "4.9",
      reviews: 876,
     img: "/assets/img/blog/grid/grid.jpg",
      sideImgs: ["/images/dubai2.jpg", "/images/dubai3.jpg"],
    },
  ],
  comfort: [
    {
      title: "Maldives",
      price: "₹ 85,999",
      nights: "6 Nights - 7 Days",
      description: "Beach villas | All meals | Water activities",
      rating: "4.9",
      reviews: 450,
      img: "/images/maldives.jpg",
      sideImgs: ["/images/maldives2.jpg", "/images/maldives3.jpg"],
    },
    {
      title: "Dubai, UAE",
      price: "₹ 35,999",
      nights: "9 Nights - 10 Days",
      description: "Dazzling blend of tradition, luxury, adventure",
      rating: "4.9",
      reviews: 876,
      img: "/images/dubai.jpg",
      sideImgs: ["/images/dubai2.jpg", "/images/dubai3.jpg"],
    },
  ],
  luxury: [
    {
      title: "Switzerland",
      price: "₹ 1,20,999",
      nights: "7 Nights - 8 Days",
      description: "5★ hotels | Lake tours | Glacier Express",
      rating: "5.0",
      reviews: 320,
      img: "/images/switzerland.jpg",
      sideImgs: ["/images/switzerland2.jpg", "/images/switzerland3.jpg"],
    },
  ],
};

export default function PackageTabs() {
  const [activeTab, setActiveTab] = useState<TabId>("economy");
  const items = data[activeTab];

  return (
    <div className="container py-12">
      {/* Header */}
      <div className="text-center mb-20 mt-100">
        <h3 className="text-3xl font-bold lh-3">
          Find Your Perfect Getaway,<br />Whatever Your Budget
        </h3>
      </div>

      {/* Tabs */}
     {/* TABS */}
      <div className="tab-wrapper mb-30">
        <div className="tabs">
          {tabs.map((t, index) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`tab-btn ${activeTab === t.id ? "active" : ""}`}
            >
              {t.label}
            </button>
          ))}

          {/* SLIDER */}
          <div
            className="slider"
            style={{
              transform: `translateX(${tabs.findIndex(
                (t) => t.id === activeTab
              ) * 120}px)`,
            }}
          ></div>
        </div>
      </div>
      {/* Cards Row */}
      <div className="row">
        {items.map((item) => (
          <div key={item.title} className="col-xl-4 col-lg-6 col-md-6 mb-4">
            <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
              {/* Big Image */}
              <div className="position-relative" style={{ height: "250px" }}>
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-3">
                <h4 className="fw-semibold">{item.title}</h4>
                <p className="text-muted small">{item.description}</p>

                <div className="d-flex justify-content-between">
                  <span>⭐ {item.rating} ({item.reviews})</span>
                  <span className="fw-bold text-success">{item.price}</span>
                </div>

                <p className="text-secondary small mt-1">{item.nights}</p>

                <Link href="#" className="text-primary fw-semibold">
                  View Details →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CSS */}
      <style jsx>{`
        .tab-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-bottom: 40px;
        }

        .tabs {
          position: relative;
          display: flex;
          gap: 40px;
          padding-bottom: 10px;
          border-bottom: 2px solid #d1d5db; /* GRAY LINE */
        }

        .tab-btn {
          background: transparent;
          border: none;
          font-size: 18px;
          cursor: pointer;
          color: #6b7280;
          transition: color 0.3s ease;
          position: relative;
          padding-bottom: 6px;
        }

        .tab-btn.active {
          color: #000;
        }

        /* GREEN SLIDER */
        .slider {
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 120px;          /* width = tab width */
          height: 3px;
          background: #22c55e;   /* green */
          border-radius: 2px;
          transition: transform 0.45s ease-in-out; /* smooth slow move */
        }
      `}</style>
    </div>
  );
}
