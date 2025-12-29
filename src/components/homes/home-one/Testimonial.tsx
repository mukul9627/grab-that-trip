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
  // HOOKS — MUST BE FIRST
  const { destinations, loading, error } = useTestimonial()
  const [imgSwiper, setImgSwiper] = useState<SwiperType | null>(null);
  const [textSwiper, setTextSwiper] = useState<SwiperType | null>(null);

  // CONDITIONAL RETURNS — AFTER HOOKS (IMPORTANT)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading testimonials.</p>;
const imageBase = process.env.NEXT_PUBLIC_IMAGE_URL;

  return (
    <section className="struggles-container">

      {/* LEFT IMAGE SWIPER */}
      <Swiper
        modules={[Controller]}
        onSwiper={setImgSwiper}
        controller={{ control: textSwiper }}
        slidesPerView={1}
        loop={true}
        className="left-swiper"
      >
        {destinations.map((item, i) => (
          <SwiperSlide key={i}>
            <div className="images-column">

              <div className="img-row">

                {/* LARGE IMAGE */}
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

                {/* SMALL IMAGE 1 */}
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
                {/* SMALL IMAGE 2 */}
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

      {/* RIGHT SIDE CONTENT */}
      <div className="content-column">

        <div className="col-lg-10">
          
         <div
              className="tg-listing-5-slider-navigation tg-location-su-slider-navigation text-end mb-30 wow fadeInUp"
              data-wow-delay=".4s"
              data-wow-duration="1s"
            >
            <button className="tg-listing-5-slide-prev2 swiper-prev">
              <i className="fa-solid fa-arrow-left-long"></i>
            </button>
            <button className="tg-listing-5-slide-next2 swiper-next">
              <i className="fa-solid fa-arrow-right-long"></i>
            </button>
          </div>
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
          loop={true}
          spaceBetween={20}
          className="testimonial-swiper"
        >
          {destinations.map((item, i) => (
            <SwiperSlide key={i}>

              <div className="content-header">
                <h2 className="text-white">{item.title}</h2>
              </div>

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

      {/* INLINE CSS (CAN MOVE TO FILE) */}
      <style jsx>{`
        .img-small1 {
          margin-top: 14rem !important;
          margin-left: 12px;
        }
        .img-small2 {
          width: 18rem !important;
          margin-left: 12px;
          margin-top: -68px;
        }

        .struggles-container {
          display: flex;
          gap: 70px;
          padding: 80px 0;
          align-items: center;
          background: #0a6a67;
        }

        .left-swiper {
          width: 350px;
        }

        .images-column {
          display: flex;
          flex-direction: column;
          gap: 25px;
          position: relative;
          left: 15rem;
        }

        .img-box {
          overflow: hidden;
          border-radius: 15px;
        }

        .img-large {
          width: 290px;
          height: 330px;
        }

        .img-small {
          width: 230px;
          height: 170px;
        }

        .img-row {
          display: flex;
          gap: 20px;
        }

        .content-column {
          width: 45%;
          color: #fff;
        }

        .content-header h2 {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .desc {
          font-size: 17px;
          margin: 15px 0;
          line-height: 1.6;
          max-width: 34rem;
        }

        .author-block {
          margin-top: 20px;
          display: flex;
          gap: 15px;
          align-items: center;
        }

        .author-avatar {
          width: 55px;
          height: 55px;
          overflow: hidden;
          border-radius: 50%;
        }

        .author-name {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
        }

        .designation {
          font-size: 14px;
          opacity: 0.8;
        }
      `}</style>

    </section>
  );
}
