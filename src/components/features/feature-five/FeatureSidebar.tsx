/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

interface FeatureSidebarProps {
  fullData: any[];
  setProducts: (data: any[]) => void;
  resetPage: () => void;
}

export default function FeatureSidebar({
  fullData,
  setProducts,
  resetPage,
}: FeatureSidebarProps) {
  const [destination, setDestination] = useState<string>("");

  /* ================= DESTINATION LIST ================= */
  const destinations = [
    "All Activities",
    ...Array.from(
      new Set(
        fullData
          .map((item) => item.name?.trim())
          .filter(Boolean)
      )
    ),
  ];

  /* ================= APPLY FILTER ================= */
  useEffect(() => {
    let data = [...fullData];

    if (destination && destination !== "All Activities") {
      data = data.filter((item) => item.name === destination);
    }

    setProducts(data);
    resetPage();
  }, [destination, fullData]);

  /* ================= UI ================= */
  return (
    <div className="col-xl-3 col-lg-4 order-last order-lg-first">
      <div className="tg-filter-sidebar mb-40 top-sticky">
        <div className="tg-filter-item">
          <h4 className="tg-filter-title mb-15">Activities</h4>

          <div className="tg-filter-list">
            <ul>
              {destinations.map((d, i) => (
                <li key={i}>
                  <div className="checkbox d-flex">
                    <input
                      className="tg-checkbox"
                      type="checkbox"
                      id={`dest_${i}`}
                      checked={destination === d}
                      onChange={() =>
                        setDestination((prev) => (prev === d ? "" : d))
                      }
                    />
                    <label htmlFor={`dest_${i}`} className="tg-label">
                      {d}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
