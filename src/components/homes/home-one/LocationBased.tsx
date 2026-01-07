"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperOptions } from "swiper/types";
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import CryptoJS from "crypto-js";
import { usePackageForActivities } from "@/hooks/usePackageForActivities";

import location_bg from "@/assets/img/destination/tu/bg.png";

const setting: SwiperOptions = {
  slidesPerView: 4,
  loop: true,
  spaceBetween: 30,

  autoplay: {
    delay: 300000,
    disableOnInteraction: false,
  },

  navigation: {
    prevEl: ".tg-listing-5-slide-prev",
    nextEl: ".tg-listing-5-slide-next",
  },

  breakpoints: {
    1400: { slidesPerView: 4 },
    1200: { slidesPerView: 3 },
    768: { slidesPerView: 2 },
    0: { slidesPerView: "auto" }, // now valid
  },
};

const secretKey = "MY_PRIVATE_KEY";

const encryptId = (id: number | string) =>
  CryptoJS.AES.encrypt(id.toString(), secretKey).toString();

const LocationBased = () => {
  const { destinations, loading, error } = usePackageForActivities();
    const [openId, setOpenId] = useState<number | null>(null);
  const imageBase = process.env.NEXT_PUBLIC_IMAGE_URL;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading destinations.</p>;

  const featureType = destinations[0]?.feature_id;


  return (
    <>
      <div className="tg-location-area p-relative z-index-1 pb-140 pt-120">
        <div className="tg-location-su-bg">
          <Image src={location_bg} alt="location background" />
        </div>

        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-9 col-8">
              <div className="tg-location-section-title mb-30">
                <h2>Location Based On Activities</h2>
                <p>Discover activities unique to every destination…</p>
              </div>
            </div>

            <div className="col-lg-3 col-4">
              <div
                className="tg-listing-5-slider-navigation tg-location-su-slider-navigation text-end mb-30 wow fadeInUp"
                data-wow-delay=".4s"
                data-wow-duration="1s"
              >
                <button className="tg-listing-5-slide-prev mr-10">
                  <i className="fa-solid fa-arrow-left-long"></i>
                </button>
                <button className="tg-listing-5-slide-next">
                  <i className="fa-solid fa-arrow-right-long"></i>
                </button>
              </div>
            </div>
          </div>

          <Swiper
            {...setting}
            modules={[Autoplay, Navigation]}
            className="tg-location-su-slider custom-mobile-slider"
          >
            {destinations.map((item) => (
              <SwiperSlide key={item.package_id}>
                <div className="tg-location-wrap">
                  <div className="tg-location-thumb">
                    <Link
                      href={`/tour-details?pid=${encodeURIComponent(
                        encryptId(item.package_id)
                      )}`}
                    >
                      <Image
                        src={`${imageBase}/package/bg/${item.bg_image}`}
                        alt={item.package_name}
                        width={234}
                        height={234}
                        className="tg-round-25"
                      />
                    </Link>
                  </div>
                  <div className="tg-location-content tg-location-su-content">
                    <div className="tg-location-content text-center">
                      <span className="tg-location-time location-based-mukul">
                        {item.destination_name}
                      </span>

                     <h3
  onClick={() =>
    setOpenId(openId === item.package_id ? null : item.package_id)
  }
  className={`package-title ${
    openId === item.package_id ? "expanded" : ""
  }`}
>
  <span>{item.package_name}</span>
</h3>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}

 <div className="col-12">
            <div className="text-center mt-15">
             
                <Link
                   href={`activities?pid=${encodeURIComponent(
                  encryptId(featureType)
                )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tg-btn tg-btn-transparent tg-btn-su-transparent"
                >
                  See More Tours
                </Link>
            </div>
          </div>
           </Swiper>
        </div>
      </div>

      {/* GLOBAL CSS APPLIED LOCALLY */}
     <style jsx global>{`
  @media (max-width: 768px) {
    .custom-mobile-slider .swiper-slide {
      width: 298px !important;
    }

    .custom-mobile-slider .swiper-wrapper {
      display: flex;
    }

    .tg-location-thumb img {
      width: 100% !important;
      height: auto !important;
      object-fit: cover;
      border-radius: 12px;
    }
  }

  .package-title span {
  display: -webkit-box;
  -webkit-line-clamp: 2;      /* collapsed height */
  -webkit-box-orient: vertical;
  overflow: hidden;
  position: relative;
  cursor: pointer;
}

/* show … */
.package-title span:after {
  content: '...';
  position: absolute;
  bottom: 0;
  right: 0;
  background: #fff;
}

/* When Expanded → show full text */
.package-title.expanded span {
  -webkit-line-clamp: unset;
  overflow: visible;
}

.package-title.expanded span:after {
  content: '';
}

`}
</style>

    </>
  );
};

export default LocationBased;
