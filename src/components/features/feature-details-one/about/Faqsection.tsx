"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import blog_1 from "@/assets/img/blog/blog-1.jpg";

/* ------------------ TYPES ------------------ */
type TourPlan = {
  tourplan_id: number;
  day_no: number;
  activity: string;
  description: string;
};

type FaqItem = TourPlan & {
  showAnswer: boolean;
};

/* ------------------ DUMMY FAQ JSON ------------------ */
const tourplansData: TourPlan[] = [
  {
    tourplan_id: 1,
    day_no: 1,
    activity: "Arrival & Welcome Briefing",
    description:
      "Arrive at your destination and meet our representative. Get a complete tour briefing, hotel check-in assistance, and trip overview."
  },
  {
    tourplan_id: 2,
    day_no: 2,
    activity: "City Sightseeing Tour",
    description:
      "Explore famous landmarks, cultural attractions, and local markets with a professional guide."
  },
  {
    tourplan_id: 3,
    day_no: 3,
    activity: "Adventure & Outdoor Activities",
    description:
      "Enjoy adventure activities like trekking, boating, or nature exploration based on your destination."
  },
  {
    tourplan_id: 4,
    day_no: 4,
    activity: "Leisure Day / Optional Excursion",
    description:
      "Relax at the hotel or choose from optional sightseeing tours curated by our travel experts."
  },
  {
    tourplan_id: 5,
    day_no: 5,
    activity: "Departure & Tour Completion",
    description:
      "After breakfast, check out from the hotel and transfer to the airport or railway station with beautiful memories."
  }
];

/* ------------------ COMPONENT ------------------ */
const faqsection = () => {
  const [faqData, setFaqData] = useState<FaqItem[]>([]);

  useEffect(() => {
    setFaqData(
      tourplansData.map((item, index) => ({
        ...item,
        showAnswer: index === 0, // open first accordion
      }))
    );
  }, []);

  const toggleAnswer = (id: number) => {
    setFaqData(prev =>
      prev.map(item => ({
        ...item,
        showAnswer: item.tourplan_id === id,
      }))
    );
  };

  return (
   
<>
 <div className="tg-blog-area pt-13 pb-200">
      <div className="container">
        <div className="row">

          {/* Title */}
          <div className="col-lg-12">
            <div className="tg-location-section-title text-center mb-30">
              {/* <h5 className="tg-section-subtitle mb-15">FAQ</h5> */}
               <h2 className="mb-15 text-capitalize wow fadeInUp text-start" data-wow-delay=".4s" data-wow-duration=".9s">FAQ's</h2>
            </div>
          </div>

          

          {/* FAQ Accordion */}
          <div className="col-lg-12">
            <div className="tg-tour-about-faq-inner">
              <div className="tg-tour-about-faq">

              {faqData.map((item) => (
  <div key={item.tourplan_id} className="accordion-item">
    <h2 className="accordion-header">
      <button
        type="button"
        className={`accordion-button ${
          item.showAnswer ? "" : "collapsed"
        }`}
        onClick={() => toggleAnswer(item.tourplan_id)}
      >
        {item.activity}
      </button>
    </h2>

    <div className={`faq-content ${item.showAnswer ? "open" : ""}`}>
      <div className="accordion-body">
        <p>{item.description}</p>
      </div>
    </div>
  </div>
))}


              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

  <style jsx>{`
.faq-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.45s ease, opacity 0.3s ease;
  opacity: 0;
}

.faq-content.open {
  max-height: 500px; /* adjust if content is longer */
  opacity: 1;
}

     `}</style>
</>
  );
};

export default faqsection;
