/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState } from "react";
import { Rating } from "react-simple-star-rating";
import PriceRange from "./PriceRange";

/* ================= TYPES ================= */
interface FeatureSidebarProps {
  fullData: any[];
  setProducts: (data: any[]) => void;
  resetPage: () => void;
}

interface FeatureSidebarModalProps extends FeatureSidebarProps {
  onClose: () => void;
}

/* ================= SHARED HOOK ================= */
function useFeatureFilters(
  fullData: any[],
  setProducts: (data: any[]) => void,
  resetPage: () => void
) {
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [priceValue, setPriceValue] = useState<number[]>([0, 0]);

  const destinations = useMemo(
    () => [
      "All Destination",
      ...Array.from(
        new Set(fullData.map((i) => i.destination_name?.trim()).filter(Boolean))
      ),
    ],
    [fullData]
  );

  const durations = useMemo(
    () => ["All Duration", ...new Set(fullData.map((i) => `${i.days} Days`))],
    [fullData]
  );

  const maxPrice = useMemo(() => {
    if (!fullData.length) return 0;
    return Math.max(...fullData.map((i) => i.offer_price || i.base_price || 0));
  }, [fullData]);

  useEffect(() => {
    if (maxPrice > 0) setPriceValue([0, maxPrice]);
  }, [maxPrice]);

  /* ===== APPLY FILTERS ===== */
  useEffect(() => {
    let data = [...fullData];

    if (destination && destination !== "All Destination") {
      data = data.filter((i) => i.destination_name === destination);
    }

    if (duration && duration !== "All Duration") {
      const d = parseInt(duration);
      data = data.filter((i) => i.days === d);
    }

    if (rating !== null) {
      data = data.filter((i) => Math.round(i.average_rating) === rating);
    }

    data = data.filter((i) => {
      const price = i.offer_price || i.base_price;
      return price >= priceValue[0] && price <= priceValue[1];
    });

    setProducts(data);
    resetPage();
  }, [destination, duration, rating, priceValue, fullData]);

  return {
    destination,
    setDestination,
    duration,
    setDuration,
    rating,
    setRating,
    priceValue,
    setPriceValue,
    destinations,
    durations,
    maxPrice,
  };
}

/* ================= DESKTOP SIDEBAR ================= */
export default function FeatureSidebar({
  fullData,
  setProducts,
  resetPage,
}: FeatureSidebarProps) {
  const filters = useFeatureFilters(fullData, setProducts, resetPage);

  return (
    <>
      <div className="col-xl-3 col-lg-4 order-last order-lg-first desktop-view-ms">
        <div className="tg-filter-sidebar mb-40 top-sticky">
          <FilterContent {...filters} />
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 575px) {
          .desktop-view-ms {
            display: none;
          }
        }
      `}</style>
    </>
  );
}

/* ================= MOBILE MODAL ================= */
export function FeatureSidebarTow({
  fullData,
  setProducts,
  resetPage,
  onClose,
}: FeatureSidebarModalProps) {
  const filters = useFeatureFilters(fullData, setProducts, resetPage);

  return (
    <>
      <div className="filter-modal-overlay">
        <div className="filter-modal">
          <div className="filter-modal-header">
            <h4>Filters</h4>
            <button onClick={onClose} className="close-btn">
              ✕
            </button>
          </div>

          <div className="filter-modal-body">
            <div className="tg-filter-sidebar">
              <FilterContent {...filters} />
            </div>
          </div>

          <div className="filter-modal-footer">
            <button className="apply-btn" onClick={onClose}>
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .filter-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          z-index: 9999;
          display: flex;
          justify-content: flex-end;
        }
        .filter-modal {
          width: 360px;
          height: 100vh;
          background: #fff;
          display: flex;
          flex-direction: column;
        }
        .filter-modal-header,
        .filter-modal-footer {
          padding: 15px;
          border-bottom: 1px solid #eee;
        }
        .filter-modal-body {
          padding: 15px;
          overflow-y: auto;
          flex: 1;
        }
        .close-btn {
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
        }
        .apply-btn {
          width: 100%;
          padding: 10px;
          background: #ff6b00;
          color: #fff;
          border: none;
          border-radius: 6px;
        }
      `}</style>
    </>
  );
}

/* ================= REUSABLE FILTER UI ================= */
function FilterContent({
  destination,
  setDestination,
  duration,
  setDuration,
  rating,
  setRating,
  priceValue,
  setPriceValue,
  destinations,
  durations,
  maxPrice,
}: any) {
  return (
    <>
      {/* Destination */}
      <h4 className="tg-filter-title mb-15">Destination</h4>
      <ul>
        {destinations.map((d: string, i: number) => (
          <li key={i}>
            <input
              type="checkbox"
              checked={destination === d}
              onChange={() => setDestination((p: string) => (p === d ? "" : d))}
            />{" "}
            {d}
          </li>
        ))}
      </ul>

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
          <div className="mt-15">
            INR {priceValue[0]} - INR {priceValue[1]}
          </div>
        </>
      )}

      <span className="tg-filter-border mt-25 mb-25"></span>

      {/* Duration */}
      <h4 className="tg-filter-title mb-15">Duration</h4>
      <ul>
        {durations.map((d: string, i: number) => (
          <li key={i}>
            <input
              type="checkbox"
              checked={duration === d}
              onChange={() => setDuration((p: string) => (p === d ? "" : d))}
            />{" "}
            {d}
          </li>
        ))}
      </ul>

      <span className="tg-filter-border mt-25 mb-25"></span>

      {/* Rating */}
      <h4 className="tg-filter-title mb-15">Top Reviews</h4>
      {[5, 4, 3, 2, 1].map((r) => (
        <div key={r}>
          <input
            type="checkbox"
            checked={rating === r}
            onChange={() =>
              setRating((p: number | null) => (p === r ? null : r))
            }
          />
          <Rating initialValue={r} size={18} readonly />
        </div>
      ))}
    </>
  );
}
