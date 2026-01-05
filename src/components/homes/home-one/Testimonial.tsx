/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Controller } from "swiper/modules";
import { useTestimonial } from "@/hooks/useTestimonial";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

import avatar from "@/assets/img/testimonial/avatar.png";

export default function Testimonial() {
  const { destinations, loading, error } = useTestimonial();
  const [imgSwiper, setImgSwiper] = useState<SwiperType | null>(null);
  const [textSwiper, setTextSwiper] = useState<SwiperType | null>(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading testimonials.</p>;

  return (
    <section className="testimonial-section">

<div className="container">
      {/* ROW */}
      <div className="row align-items-center">

        {/* LEFT — IMAGES */}
        <div className="col-lg-5">

          <Swiper
            modules={[Controller]}
            onSwiper={setImgSwiper}
            controller={{ control: textSwiper }}
            slidesPerView={1}
            loop
            className="left-swiper"
          >
            {destinations.map((item, i) => (
              <SwiperSlide key={i}>
                <div className="images-column">

                  <div className="img-row">

                    <div className="img-box img-large">
                      {item.images?.[0] && (
                        <Image
                          src={item.images[0]}
                          alt="testimonial-img-1"
                          width={290}
                          height={330}
                        />
                      )}
                    </div>

                    <div className="img-box img-small img-small1">
                      {item.images?.[1] && (
                        <Image
                          src={item.images[1]}
                          alt="testimonial-img-2"
                          width={230}
                          height={170}
                        />
                      )}
                    </div>
                  </div>

                  <div className="img-row">
                    <div className="img-box img-small img-small2">
                      {item.images?.[2] && (
                        <Image
                          src={item.images[2]}
                          alt="testimonial-img-3"
                          width={230}
                          height={170}
                        />
                      )}
                    </div>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* RIGHT — CONTENT */}
        <div className="col-lg-5">

          <div className="text-end mb-3">
            <button className="tg-listing-5-slide-prev2 swiper-prev mr-10">
              <i className="fa-solid fa-arrow-left-long"></i>
            </button>
            <button className="tg-listing-5-slide-next2 swiper-next">
              <i className="fa-solid fa-arrow-right-long"></i>
            </button>
          </div>

          <Swiper
            modules={[Navigation, Controller]}
            onSwiper={setTextSwiper}
            controller={{ control: imgSwiper }}
            navigation={{
              prevEl: ".swiper-prev",
              nextEl: ".swiper-next",
            }}
            slidesPerView={1}
            loop
            spaceBetween={20}
            className="testimonial-swiper"
          >
            {destinations.map((item, i) => (
              <SwiperSlide key={i}>

                <h2 className="text-white">{item.title}</h2>

                <p className="desc text-white">{item.heading}</p>
                <p className="desc text-white">{item.description}</p>

                <div className="author-block">
                  <div className="author-avatar">
                    <Image src={avatar} alt="author" />
                  </div>

                  <div>
                    <h4 className="author-name text-white">{item.added_by}</h4>
                    <span className="designation">{item.city}</span>
                  </div>
                </div>

              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
</div>

      <style jsx>{`
        .testimonial-section {
          padding: 80px 0;
          background: #0a6a67;
        }

        .images-column {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .img-row {
          display: flex;
          gap: 20px;
        }

        .img-box {
          border-radius: 15px;
          overflow: hidden;
        }

        .img-large {
          width: 290px;
          height: 330px;
        }

        .img-small {
          width: 230px;
          height: 170px;
        }

        .img-small1 {
          margin-top: 14rem;
        }

        .img-small2 {
          margin-top: -68px;
        }

        .desc {
          max-width: 34rem;
          line-height: 1.6;
        }

        .author-block {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-top: 20px;
        }

        .author-avatar {
          width: 55px;
          height: 55px;
          border-radius: 50%;
          overflow: hidden;
        }
      `}</style>

    </section>
  );
}
