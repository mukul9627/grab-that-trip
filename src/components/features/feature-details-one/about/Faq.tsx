"use client";
import { useEffect, useState } from "react";

type TourPlan = {
  tourplan_id: number;
  day_no: number;
  activity: string;
  description: string;
};

type FaqItem = TourPlan & {
  showAnswer: boolean;
};

type Props = {
  tourplans?: TourPlan[];
};

const Faq = ({ tourplans }: Props) => {
  const [faqData, setFaqData] = useState<FaqItem[]>([]);

  useEffect(() => {
    if (!tourplans || tourplans.length === 0) return;

    const formatted = tourplans.map((item, index) => ({
      ...item,
      showAnswer: index === 0, // open first by default
    }));

    setFaqData(formatted);
  }, [tourplans]);

  const toggleAnswer = (id: number) => {
    setFaqData(prev =>
      prev.map(item => ({
        ...item,
        showAnswer: item.tourplan_id === id,
      }))
    );
  };

  return (
    <div className="tg-tour-faq-wrap mb-70">
      <h4 className="tg-tour-about-title mb-15">Tour Plan</h4>

      <div className="tg-tour-about-faq-inner">
        <div className="tg-tour-about-faq">

          {faqData.map(item => (
            <div key={item.tourplan_id} className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className={`accordion-button ${
                    item.showAnswer ? "" : "collapsed"
                  }`}
                  onClick={() => toggleAnswer(item.tourplan_id)}
                  type="button"
                >
                  <span className="me-2">Day {item.day_no}</span>
                  {item.activity}
                </button>
              </h2>

              <div
                className={`accordion-collapse collapse ${
                  item.showAnswer ? "show" : ""
                }`}
              >
                <div className="accordion-body">
                  <p>{item.description}</p>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Faq;
