// src/components/TourCard.tsx
"use client";

import Image from "next/image";

type Props = {
  image: string;
  days?: string;
  title: string;
  location?: string;
  price?: string;
  featured?: boolean;
  rating?: string;
  large?: boolean;
};

export default function TourCard({
  image,
  days,
  title,
  location,
  price,
  featured,
  rating,
  large,
}: Props) {
  return (
    <div
      className={`
        relative overflow-hidden rounded-3xl group cursor-pointer
        ${large ? "h-[430px]" : "h-[210px]"}
      `}
    >
      {/* BG IMAGE */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-all duration-500 group-hover:scale-105"
        sizes="100vw"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

      {/* FEATURED TAG */}
      {featured && (
        <div className="absolute top-4 left-4">
          <span className="bg-emerald-600 text-white text-xs px-4 py-1 rounded-full shadow-md">
            Featured
          </span>
        </div>
      )}

      {/* RATING BUBBLE */}
      {rating && (
        <div className="absolute bottom-4 right-4 bg-white text-black text-xs px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#FFD166">
            <path d="M12 .587l3.668 7.431L23.6 9.75l-5.4 5.267L19.335 24 12 19.897 4.665 24 5.8 15.017 0.4 9.75l7.932-1.732z"/>
          </svg>
          {rating}
        </div>
      )}

      {/* CARD CONTENT */}
      <div className="absolute bottom-4 left-5 right-5 text-white">

        {/* Duration */}
        {days && (
          <p className="flex items-center gap-2 text-sm mb-1 opacity-90">
            <svg width="14" height="14" viewBox="0 0 24 24" className="inline-block">
              <path
                fill="currentColor"
                d="M12 1a11 11 0 1 0 .001 22.001A11 11 0 0 0 12 1zm1 12.586V6h-2v7.586l5.293 5.293 1.414-1.414L13 13.586z"
              />
            </svg>
            {days}
          </p>
        )}

        {/* TITLE */}
        <h3
          className={`
            font-semibold leading-snug
            ${large ? "text-2xl" : "text-lg"}
          `}
        >
          {title}
        </h3>

        {/* LOCATION */}
        {location && (
          <p className="flex items-center gap-2 text-sm mt-1 opacity-95">
            <svg width="15" height="15" viewBox="0 0 24 24" className="inline-block">
              <path
                fill="currentColor"
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"
              />
            </svg>
            {location}
          </p>
        )}

        {/* PRICE */}
        {price && (
          <div className="mt-3">
            <h4 className={`${large ? "text-3xl" : "text-xl"} font-bold`}>
              INR {price}
            </h4>
            <p className="text-xs opacity-80">Per Person</p>
          </div>
        )}
      </div>
    </div>
  );
}
