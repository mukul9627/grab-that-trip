/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import PriceRange from "./PriceRange";

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

  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [priceValue, setPriceValue] = useState<number[]>([0, 0]);

  /* ===== FILTER OPTIONS ===== */
  const destinations = [
  "All Destination",
  ...Array.from(
    new Set(
      fullData
        .map(i => i.destination_name?.trim())
        .filter(Boolean)
    )
  ),
];


  const durations = [
    "All Duration",
    ...new Set(fullData.map(i => `${i.days} Days`)),
  ];

  const maxPrice =
    fullData.length > 0
      ? Math.max(...fullData.map(i => i.offer_price || i.base_price || 0))
      : 0;

  useEffect(() => {
    if (maxPrice > 0) setPriceValue([0, maxPrice]);
  }, [maxPrice]);

  /* ===== APPLY FILTERS ===== */
  useEffect(() => {
    let data = [...fullData];

    if (destination && destination !== "All Destination") {
      data = data.filter(i => i.destination_name === destination);
    }

    if (duration && duration !== "All Duration") {
      const d = parseInt(duration);
      data = data.filter(i => i.days === d);
    }

    if (rating !== null) {
      data = data.filter(
        i => Math.round(i.average_rating) === rating
      );
    }

    data = data.filter(i => {
      const price = i.offer_price || i.base_price;
      return price >= priceValue[0] && price <= priceValue[1];
    });

    setProducts(data);
    resetPage();
  }, [destination, duration, rating, priceValue]);

  /* ===== UI ===== */
  return (
    <div className="col-xl-3 col-lg-4 order-last order-lg-first">
      <div className="tg-filter-sidebar mb-40 top-sticky">
        <div className="tg-filter-item">

          {/* Destination */}
          <h4 className="tg-filter-title mb-15">Destination</h4>
          <div className="tg-filter-list">
            <ul>
              {destinations.map((d, i) => (
                <li key={i}>
                  <div className="checkbox d-flex">
                    <input
                      className="tg-checkbox"
                      type="checkbox"
                      checked={destination === d}
                      onChange={() => setDestination(prev => (prev === d  ?  "" : d))}
                      id={`dest_${i}`}
                    />
                    <label htmlFor={`dest_${i}`} className="tg-label">
                      {d}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <span className="tg-filter-border mt-25 mb-25"></span>

          {/* Price */}
          <h4 className="tg-filter-title mb-20">Price By Filter</h4>
          {maxPrice > 0 && (
            <>
              <PriceRange
                MIN={0}
                MAX={maxPrice}
                STEP={1}
                values={priceValue}
                handleChanges={setPriceValue}
              />
              <div className="d-flex align-items-center mt-15">
                <span className="input-range">
                  ₹{priceValue[0]} - ₹{priceValue[1]}
                </span>
              </div>
            </>
          )}

          <span className="tg-filter-border mt-25 mb-25"></span>

         {/* Duration */}
<h4 className="tg-filter-title mb-15">Duration</h4>
<div className="tg-filter-list">
  <ul>
    {durations.map((d, i) => (
      <li key={i}>
        <div className="checkbox d-flex">
          <input
            className="tg-checkbox"
            type="checkbox"
            checked={duration === d}
            onChange={() =>
              setDuration(prev =>
                prev === d ? "" : d
              )
            }
            id={`duration_${i}`}
          />
          <label htmlFor={`duration_${i}`} className="tg-label">
            {d}
          </label>
        </div>
      </li>
    ))}
  </ul>
</div>

          <span className="tg-filter-border mt-25 mb-25"></span>

          {/* Rating */}
          <h4 className="tg-filter-title mb-15">Top Reviews</h4>
          <div className="tg-filter-list">
            <ul>
              {[5, 4, 3, 2, 1].map((r, i) => (
                <li key={i}>
                  <div className="checkbox d-flex">
                    <input
                      className="tg-checkbox"
                      type="checkbox"
                      checked={rating === r}
                      onChange={() => setRating(prev => (prev === r ?  null  : r))}
                      id={`rating_${i}`}
                    />
                    <label htmlFor={`rating_${i}`}>
                      <div className="tg-filter-review">
                        <Rating initialValue={r} size={18} readonly />
                      </div>
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
