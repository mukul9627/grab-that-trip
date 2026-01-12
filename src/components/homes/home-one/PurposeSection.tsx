"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { useDispatch } from "react-redux";
import { addToWishlist } from "@/redux/features/wishlistSlice";
import BookingModal from "./BookingModal";
import { usePurposeSection } from "@/hooks/usePurposeSection";
import "swiper/css";
import "swiper/css/navigation";
import CryptoJS from "crypto-js";
import { getFeatureTabs } from "@/hooks/getFeatureTabs";

const secretKey = "MY_PRIVATE_KEY";
const encryptId = (id: number | string) => {
  return CryptoJS.AES.encrypt(id.toString(), secretKey).toString();
};
export default function PurposeSection() {
  const [featureId, setFeatureId] = useState<number>(7);
  const [selectedFilter, setSelectedFilter] = useState<number | string>("7");
  const [tabs, setTabs] = useState<any[]>([]);
  const [encryptedParam, setEncryptedParam] = useState<string>("");
  const [openId, setOpenId] = useState<number | null>(null);

  // ⬅️ Reusable HOOK
  const { listingData, loading } = usePurposeSection(featureId);

  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const imageBase = process.env.NEXT_PUBLIC_IMAGE_URL;

  const openBookingPopup = (item: any) => {
    setSelected(item);
    setOpenModal(true);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setEncryptedParam(encodeURIComponent(encryptId(selectedFilter)));
    }
  }, [selectedFilter]);

  useEffect(() => {
    async function loadTabs() {
      const list = await getFeatureTabs();
      setTabs(list);

      if (list.length > 0) {
        setSelectedFilter(list[0].id);
        setFeatureId(list[0].id);
      }
    }

    loadTabs();
  }, []);
  const secretKey = "MY_PRIVATE_KEY"; // change this

  const encryptId = (id: number | string) => {
    return CryptoJS.AES.encrypt(id.toString(), secretKey).toString();
  };
  const dispatch = useDispatch();
  const handleAddToWishlist = (item: any) => dispatch(addToWishlist(item));

  const slider = {
    slidesPerView: 4,
    spaceBetween: 24,
    autoplay: { delay: 30000000, disableOnInteraction: false },
    navigation: true,
    breakpoints: {
      0: {
        slidesPerView: 1,
        centeredSlides: true, // ⭐ MOBILE SINGLE FULL SLIDE
      },
      576: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1200: { slidesPerView: 4 },
    },
  };

  return (
    <>
      {/* 🔥 SHOW MODAL OUTSIDE THE SECTION */}
      {openModal && selected && (
        <BookingModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          package_id={selected.package_id}
          package_name={selected.package_name}
          base_price={selected.base_price}
          offer_price={selected.offer_price}
        />
      )}
      <section className="container mx-auto py-10">
        {/* ================= SECTION HEADER ================= */}
        <div className="row">
          {" "}
          <div className="col-12">
            {" "}
            <div className="tg-listing-section-title text-center mb-35">
              {" "}
              <h2
                className="mb-15 wow fadeInUp"
                data-wow-delay=".4s"
                data-wow-duration=".6s"
              >
                {" "}
                Find Your Perfect Journey, Whatever Your Purpose{" "}
              </h2>{" "}
              <p
                className="tect-gray"
                data-wow-delay=".3s"
                data-wow-duration=".5s"
              >
                {" "}
                Whether you’re traveling with family, celebrating love, seeking
                adventure, or on a spiritual quest. <br></br> We have the
                perfect package for every purpose{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
        </div>

        {/* ===================== TABS ===================== */}
        <div className="flex flex-wrap justify-center gap-3 mb-5">
          <div
            className="tg-listing-menu-nav project__menu-nav mb-5 wow fadeInUp"
            data-wow-delay=".5s"
            data-wow-duration=".9s"
          >
            {tabs.map((tab: any) => (
              <button
                key={tab.id}
                className={selectedFilter === tab.id ? "active" : ""}
                onClick={() => {
                  setSelectedFilter(tab.id);
                  setFeatureId(tab.id);
                }}
              >
                <span className="borders"></span>
                <span>{tab.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ================= CUSTOM SWIPER NAVIGATION BUTTONS ================= */}
        <div className="row mb-3">
          <div className="col-lg-12 tg-location-su-slider-navigation1 d-flex justify-content-between align-items-center mobile-view-code">
            {/* LEFT ARROW */}
            <button className="tg-listing-5-slide-prev1">
              <i className="fa-solid fa-arrow-left-long"></i>
            </button>

            {/* RIGHT ARROW */}
            <button className="tg-listing-5-slide-next1">
              <i className="fa-solid fa-arrow-right-long"></i>
            </button>
          </div>
        </div>

        {/* ===================== LOADING ===================== */}
        {loading && (
          <div className="py-6 text-center text-gray-500">
            Loading packages...
          </div>
        )}

        {/* ===================== SLIDER ===================== */}
        {!loading && listingData.length > 0 && (
          <Swiper
            {...slider}
            modules={[Autoplay, Navigation]}
            navigation={{
              nextEl: ".tg-listing-5-slide-next1",
              prevEl: ".tg-listing-5-slide-prev1",
            }}
            className="mukul"
          >
            {(listingData ?? [])
              .slice(0, 10) // limit 10
              .map((item) => (
                <SwiperSlide key={item.package_id} className="mukulsharma">
                  {/* MY code */}

                  <div className="card card-purpose">
                    <div className="tg-listing-card-thumb fix mb-13 p-relative ms-desktop-view ms-mobile-view">
                      <Link
                        href={`/tour-details?pid=${encodeURIComponent(
                          encryptId(item.package_id)
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          // src={`${imageBase}/package/bg/${item.bg_image}`}
                          src={`${imageBase}/package/${item.package_code}/${item.bg_image}`}
                          alt={item.package_name}
                          fill
                          className="object-cover"
                        />
                      </Link>
                      <div className="p-4 border-t flex justify-between items-center">
                        <div>
                          <div className="text-gray-400 line-through text-sm">
                            INR{item.base_price.toLocaleString()}
                          </div>
                          <div className="font-bold text-blue-600 text-lg">
                            INR{item.offer_price.toLocaleString()}
                            <span className="text-gray-600 text-sm ml-1">
                              /person
                            </span>
                          </div>
                        </div>

                        <div className="text-blue-600">
                          <i className="fa-sharp fa-solid fa-phone text-xl"></i>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tg-listing-card-content ms-mobile-title">
                      <div className="tg-listing-card-review flex items-center justify-between space tg-listing-card-review-mukul pb-1">
                        <span className="tg-listing-card-duration-time">
                          {item.days} Days
                        </span>

                        <div className="flex items-center gap-1">
                          <span className="tg-listing-rating-icon">
                            <i className="fa-sharp fa-solid fa-star"></i>
                          </span>
                          <span className="tg-listing-rating-percent">
                            {Number(item.average_rating).toFixed(1)} (
                            {item.total_reviews})
                          </span>
                        </div>
                      </div>

                      <h4
                        onClick={() =>
                          setOpenId(
                            openId === item.package_id ? null : item.package_id
                          )
                        }
                        className={`tg-listing-card-title mb-0 ${
                          openId === item.package_id ? "expanded" : ""
                        }`}
                      >
                        <span>
                          {item.package_name}
                          {/* <Link href="/tour-details"></Link> */}
                        </span>
                      </h4>
                      <span className="tg-listing-card-duration-time mb-10">
                        {item.destination_name}
                      </span>

                      {/* Price  */}
                      <div className="tg-listing-card-duration-tour pt-25">
                        <span className="tg-listing-card-currency-amount mr-5 fs-22">
                          {item.base_price && (
                            <del
                              className="tg-listing-card-currency-old"
                              style={{ color: "#bfbfbf" }}
                            >
                              INR {item.base_price}
                            </del>
                          )}
                        </span>
                        <span style={{ fontSize: "22px" }}>
                          <span
                            className="currency-symbol"
                            style={{ fontSize: "22px", paddingRight: "2px" }}
                          >
                            <strong>INR</strong>
                          </span>
                          <strong>{item.offer_price}</strong>
                          <span
                            className="tg-listing-card-activity-person mt-2"
                            style={{ fontSize: "14px" }}
                          >
                            /Person
                          </span>
                        </span>
                      </div>
                    </div>

                    <div
                      className="tg-listing-card-price-mukul d-flex align-items-end justify-content-between"
                      onClick={() => openBookingPopup(item)}
                      style={{ cursor: "pointer", background: "#fff" }}
                    >
                      <div className="tg-listing-card-price-wrap-mukul price-bg d-flex align-items-center justify-content-center">
                        <span className="tg-listing-card-currency-amount  mr-5 fw-medium fs-6">
                          Book Now
                        </span>
                      </div>
                      <div className="tg-listing-card-review-mukul space">
                        <span className="tg-listing-rating-icon-mukul ">
                          <i className="fa-sharp fa-solid fa-phone"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* MY code end */}
                </SwiperSlide>
              ))}
          </Swiper>
        )}

        {/* ===================== NO DATA ===================== */}
        {!loading && listingData.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No packages found.
          </div>
        )}

        <div className="col-12">
          <div className="text-center mt-15">
            {encryptedParam && (
              <Link
                href={`/holidays?type=${encryptedParam}`}
                target="_blank"
                rel="noopener noreferrer"
                className="tg-btn tg-btn-transparent tg-btn-su-transparent tg-btn-su-transparent-ms"
              >
                See More Tours
              </Link>
            )}{" "}
          </div>
        </div>
      </section>

      <style jsx>{`
        // .tg-listing-card-duration-tour span{
        // font-size: 22px;
        // font-weight: bolder;
        // }
        @media (max-width: 991px) {
          .mobile-view-code .tg-listing-5-slide-prev1,
          .tg-listing-5-slide-next1 {
            display: none;
          }
        }

        @media (max-width: 575px) {
          .ms-mobile-view {
    width: 406px;
    height: 284px;
  }

  .ms-mobile-title {
    width: 403px;
  }
          .card-purpose {
            width: 100%;
          }

          .tg-listing-card-content {
            width: 100%;
          }
        }
        //            .package-title span {
        //   display: -webkit-box;
        //   -webkit-line-clamp: 1;      /* collapsed height */
        //   -webkit-box-orient: vertical;
        //   overflow: hidden;
        //   position: relative;
        //   cursor: pointer;
        // }

        // /* show … */
        // // .package-title span:after {
        // //   content: '...';
        // //   position: absolute;
        // //   bottom: 0;
        // //   right: 0;
        // //   background: #fff;
        // // }

        // /* When Expanded → show full text */
        // .package-title.expanded span {
        //   -webkit-line-clamp: unset;
        //   overflow: visible;
        // }

        // .package-title.expanded span:after {
        //   content: '';
        // }
      `}</style>
    </>
  );
}
