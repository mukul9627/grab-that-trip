"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useMoods, MoodType } from "@/hooks/useMoods";
import Link from "next/link";
import CryptoJS from "crypto-js";

interface MoodSelectorProps {
  onMoodChange: (slug: string) => void;
}

export default function MoodSelector({ onMoodChange }: MoodSelectorProps) {
  const { moods, loading, error } = useMoods();
  const [activeMood, setActiveMood] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState("");

  // const handleMoodClick = (mood: MoodType) => {
  //   setActiveMood(mood.feature_id);
  //   onMoodChange(mood.slug);
  // };

  const handleMoodClick = (mood: MoodType) => {
  if (activeMood === mood.feature_id) {
    // clicked again → reload page
    window.location.reload();
    return;
  }

  // normal behavior
  setActiveMood(mood.feature_id);
  onMoodChange(mood.slug);
};

  const iconBase = process.env.NEXT_PUBLIC_IMAGE_URL;
  const isButtonActive = activeMood || inputValue.trim();
  const secretKey = "MY_PRIVATE_KEY"; // change this

  const encryptId = (id: number | string) => {
    return CryptoJS.AES.encrypt(id.toString(), secretKey).toString();
  };

  return (
    <section className="relative w-full h-[320px] moodSelector">
      <div className="absolute inset-0 bg-black/25"></div>

      {/* State feedback (optional UI) */}
      {loading && <p>Loading moods…</p>}
      {error && <p className="text-red-500">{error}</p>}
      {/* <h4 className="text-white text-2xl font-semibold mb-6 text-left">
        {" "}
        How are you feeling about your next trip?{" "}
      </h4> */}
      <div className="grid-container">
        {moods.map((mood) => (
          <div
            key={mood.feature_id}
            className={`card cursor-pointer ${
              activeMood === mood.feature_id ? "active-card" : ""
            }`}
            onClick={() => handleMoodClick(mood)}
          >
            {/* <Link
              href={`/holidays?pid=${encodeURIComponent(
                encryptId(mood.feature_id)
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            > */}
              <div className="card-left">
                <div className="title text-left">{mood.name}</div>
                <div className="content text-left">
                  {" "}
                  <p>{mood.description}</p>{" "}
                </div>
              </div>
            {/* </Link> */}

            <div className="card-right card-left-padding">
              <Image
                src={`${iconBase}/icon/${mood.icon_image}`}
                alt={mood.name}
                width={50}
                height={50}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Input section */}
      {/* <div className="p-10 rounded-2xl shadow-xl hoem-mood-input"> */}
      {/* <p className="font-medium mb-2 text-gray-700 text-lg text-left"> Or describe your mood in your own words: </p> */}
      {/* <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="I want somewhere warm…"
        /> */}
      {/* <input type="text" placeholder="e.g., I want somewhere warm where I can disconnect from work and enjoy nature…" className="w-full p-4 rounded-15 border border-gray-200 shadow-sm mb-6 " value={inputValue} onChange={(e) => setInputValue(e.target.value)} /> */}

      {/* <button
          disabled={!isButtonActive}
          className={`find-button ${isButtonActive ? "btn-active" : "btn-disabled"}`}
        >
          Find my Destination
        </button> */}
        {activeMood && (
          <>
          <div className="card-underline">.</div>
  <Link
    href={`/holidays/${moods.find(m => m.feature_id === activeMood)?.slug}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    <div className="flex  md:justify-end find-my-destination-button-div">
  <button className="find-my-destination-button btn-active">
   Search Package
  </button>
</div>
  </Link></>
          
)}
     
      {/* </div> */}

      <style jsx>{`
.card {
  cursor: grab;
}

.card:active {
  cursor: grabbing;
}

      .card-underline{
      background: white;
    height: 2px;
    margin: 18px 0 0 0;
      }
    .find-my-destination-button-div{
    text-align: end;
    }

        .find-my-destination-button {
          position: relative;
          width: 184px;
          height: 52px;
          top: 20px;
          left: 0rem;
          border-radius: 10px;
          transition: 0.3s ease;
        }

        .btn-disabled {
          background: #c8cdc9;
          color: gray;
          cursor: not-allowed;
          opacity: 0.7;
        }

        .btn-active {
          background: #0a6a67; /* Blue */
          color: white;
          cursor: pointer;
          opacity: 1;
        }

        .active-card {
          border: 3px solid #0a6a67;
          transform: scale(1.02);
        }
        .moodSelector {
              width: 79%;
    margin-left: 114px;
          background: rgba(228, 228, 228, 0.25);
          backdrop-filter: blur(3px);
          padding: 50px 50px 61px 50px;
          border-radius: 30px;
        }
        .grid-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          width: 100%;
        }
        .card-left-padding {
          padding-left: 13rem;
        }
        .card {
          padding: 1rem;
          border-radius: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0px;
          background-image: linear-gradient(to bottom left, #e0e4e5, #f2f6f9);
          // box-shadow: inset -2px 2px hsl(0 0 100% / 1),
          //   -15px 15px 35px rgba(0, 0, 0, 0.25);
          box-shadow: 0px 0px hsl(0 0 100% / 1),
            -15px 15px 35px rgba(0, 0, 0, 0.25);
          color: #444;
          transition: 0.25s ease;
          flex-direction: column-reverse;
          align-items: flex-start;
          background: rgba(239, 238, 239, 0.85);
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: inset -2px 2px hsl(0 0 100% / 1),
            -10px 10px 20px rgba(0, 0, 0, 0.25);
        }
        .title {
          font-size: 1rem;
          font-weight: 600;
          text-transform: uppercase;
        }
        .content p {
          font-size: 1rem;
          margin: 0;
          color: #666;
        }
        .emoji {
          padding-left: 13rem;
        }
        .hoem-mood-input {
          margin-top: 72px;
        }
        @media (max-width: 768px) {
          .grid-container {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 520px) {
          .grid-container {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
  .card {
    flex-direction: row;
    align-items: center;
    gap: 12px;
  }

  .card-left-padding {
    padding-left: 0;
  }

  .card-left {
    flex: 1;
  }

  .card-right {
    flex-shrink: 0;
  }

  .title {
    font-size: 1rem;
  }

  .content p {
    font-size: 0.9rem;
  }
}

      `}</style>
    </section>
  );
}
