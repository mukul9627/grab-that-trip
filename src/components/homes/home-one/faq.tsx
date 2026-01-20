"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import defaultFaqImage from "@/assets/img/blog/FAQ.jpg";

export type FAQ = {
  tourplan_id: number;
  day_no: number;
  activity: string;
  description: string;
};

type FAQItem = FAQ & {
  open: boolean;
};

type Props = {
  data: FAQ[];
  showImage?: boolean;
  image?: StaticImageData;
  isHome?: boolean; // 👈 new
};

export default function FAQSection({ data, showImage = true, image,isHome }: Props) {
  const [faqList, setFaqList] = useState<FAQItem[]>([]);

  // First item open by default
  useEffect(() => {
    setFaqList(
      data.map((item, index) => ({
        ...item,
        open: index === 0,
      }))
    );
  }, [data]);

  // Open only one accordion at a time
  const toggle = (id: number) => {
    setFaqList((prev) =>
      prev.map((item) => ({
        ...item,
        open: item.tourplan_id === id,
      }))
    );
  };

  return (
    <>
     <div
  className={`tg-blog-area ${isHome ? "mukul-padding" : ""}`}
>
        <div className="container">
          <div className="row">
            {showImage && (
              <>
                <div className="col-lg-12">
                  <div className="tg-location-section-title text-center mb-30">
                    <h2 className="mb-15 text-capitalize">FAQ</h2>
                    <p className="text-capitalize">
                      Are you tired of the typical tourist destinations and
                      <br />
                      looking to step out of your comfort zone
                    </p>
                  </div>
                </div>

                <div className="col-lg-4 d-none d-lg-block">
                  <div className="tg-blog-item mb-25 p-0">
                    <div className="tg-blog-thumb fix">
                      <Link href="#">
                        <Image
                          className="w-100"
                          src={image ?? defaultFaqImage}
                          alt="faq"
                          style={{ height: "19.5rem", objectFit: "cover" }}
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* FAQ ACCORDION */}
            <div className={showImage ? "col-lg-8" : "col-lg-12"}>
              <div className="tg-tour-about-faq-inner">
                <div className="tg-tour-about-faq">
                  {faqList.map((item) => (
                    <div key={item.tourplan_id} className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          type="button"
                          className={`accordion-button ${
                            item.open ? "" : "collapsed"
                          }`}
                          onClick={() => toggle(item.tourplan_id)}
                        >
                          {item.activity}
                        </button>
                      </h2>

                      <div className={`faq-content ${item.open ? "open" : ""}`}>
                        <div className="accordion-body accordion-body-body-ms ">
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

      {/* STYLES */}
      <style jsx>{`
      .accordion-body-body-ms p{
      text-transform: none;
      }
      .mukul-padding{
      padding-top: 135px;
      padding-bottom: 200px;
      }
        .faq-content {
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: max-height 0.45s ease, opacity 0.3s ease;
        }

        .faq-content.open {
          max-height: 500px;
          opacity: 1;
        }

        @media (max-width: 575px) {
          .tg-blog-thumb {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
