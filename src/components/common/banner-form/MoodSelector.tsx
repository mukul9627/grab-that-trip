"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useMoods, MoodType } from "@/hooks/useMoods";

interface MoodSelectorProps {
  onMoodChange: (slug: string) => void;
}

export default function MoodSelector({ onMoodChange }: MoodSelectorProps) {
  const { moods, loading, error } = useMoods();
  const [activeMood, setActiveMood] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState("");

  const handleMoodClick = (mood: MoodType) => {
    setActiveMood(mood.feature_id);
    onMoodChange(mood.slug);
  };

  const iconBase = process.env.NEXT_PUBLIC_IMAGE_URL;
  const isButtonActive = activeMood || inputValue.trim();

  return (
   <section className="relative w-full h-[320px] moodSelector"> 
   <div className="absolute inset-0 bg-black/25"></div>

      {/* State feedback (optional UI) */}
      {loading && <p>Loading moods…</p>}
      {error && <p className="text-red-500">{error}</p>}
<h4 className="text-white text-2xl font-semibold mb-6 text-left"> How are you feeling about your next trip? </h4>
      <div className="grid-container">
        {moods.map((mood) => (
          <div
            key={mood.feature_id}
            className={`card cursor-pointer ${
              activeMood === mood.feature_id ? "active-card" : ""
            }`}
            onClick={() => handleMoodClick(mood)}
          >
            <div className="card-left">
              <div className="title text-left">{mood.name}</div>
              <div className="content text-left"> <p>{mood.description}</p> </div>
            </div>

            <div className="card-right card-left-padding">
              <Image
                src={`${iconBase}icon/${mood.icon_image}`}
                alt={mood.name}
                width={50}
                height={50}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Input section */}
      <div className="p-10 rounded-2xl shadow-xl hoem-mood-input">
       <p className="font-medium mb-2 text-gray-700 text-lg text-left"> Or describe your mood in your own words: </p>
        {/* <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="I want somewhere warm…"
        /> */}
        <input type="text" placeholder="e.g., I want somewhere warm where I can disconnect from work and enjoy nature…" className="w-full p-4 rounded-15 border border-gray-200 shadow-sm mb-6 " value={inputValue} onChange={(e) => setInputValue(e.target.value)} />

        {/* <button
          disabled={!isButtonActive}
          className={`find-button ${isButtonActive ? "btn-active" : "btn-disabled"}`}
        >
          Find my Destination
        </button> */}
<div className="flex justify-end">
        <button
         className={`find-my-destination-button ${ isButtonActive ? "btn-active" : "btn-disabled"}`} > Find my Destination </button>
      </div>
      </div>

      <style jsx>{`
        .find-my-destination-button {
          position: relative;
          width: 184px;
          height: 52px;
          top: 20px;
          left: 29rem;
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
          // max-width: 64pc;
          height: 43rem;
          background: rgba(228, 228, 228, 0.25);
          backdrop-filter: blur(3px);
          padding: 52px 50px 27px 50px;
          border-radius: 30px;
        }
        .grid-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          width: 100%;
        }
        .card-left-padding {
          padding-left: 15rem;
        }
        .card {
          padding: 1.5rem;
          border-radius: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
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
          font-size: 1.2rem;
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
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 520px) {
          .grid-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
