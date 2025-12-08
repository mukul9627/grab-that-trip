"use client";

import { useState,useEffect } from "react";
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
      320: { slidesPerView: 1 },
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
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <div
            className="tg-listing-menu-nav project__menu-nav mb-40 wow fadeInUp"
            data-wow-delay=".5s"
            data-wow-duration=".9s"
          >
            {/* <button
            className={selectedFilter === "*" ? "active" : ""}
            onClick={() => {
              setSelectedFilter("*");
              setFeatureId(0); // show all data
            }}
            data-filter="*"
          >
            <span className="borders"></span>
            <span className="icon"></span>
          </button> */}
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
            className="mukul"
          >
            {(listingData ?? [])
              .slice(0, 10) // limit 10
              .map((item) => (
                <SwiperSlide key={item.package_id} className="mukulsharma">
                  {/* MY code */}

                  <div className="card card-purpose">
                    <div
                      className="tg-listing-card-thumb fix mb-15 p-relative"
                      style={{ height: "270px", width: "284px" }}
                    >
                      <Link href="/tour-details">
                        <Image
                          src={`${imageBase}/package/bg/${item.bg_image}`}
                          alt={item.package_name}
                          fill
                          className="object-cover"
                        />
                      </Link>
                      <div className="tg-listing-item-wishlist">
                        <a
                          onClick={() => handleAddToWishlist(item)}
                          style={{ cursor: "pointer" }}
                        >
                          <svg
                            width="20"
                            height="18"
                            viewBox="0 0 20 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.5167 16.3416C10.2334 16.4416 9.76675 16.4416 9.48341 16.3416C7.06675 15.5166 1.66675 12.075 1.66675 6.24165C1.66675 3.66665 3.74175 1.58331 6.30008 1.58331C7.81675 1.58331 9.15841 2.31665 10.0001 3.44998C10.8417 2.31665 12.1917 1.58331 13.7001 1.58331C16.2584 1.58331 18.3334 3.66665 18.3334 6.24165C18.3334 12.075 12.9334 15.5166 10.5167 16.3416Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      </div>
                      <div className="p-4 border-t flex justify-between items-center">
                        <div>
                          <div className="text-gray-400 line-through text-sm">
                            ₹{item.base_price.toLocaleString()}
                          </div>
                          <div className="font-bold text-blue-600 text-lg">
                            ₹{item.offer_price.toLocaleString()}
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
                      className="tg-listing-card-content"
                      style={{ width: "284px" }}
                    >
                      <div className="tg-listing-card-review flex items-center justify-between space tg-listing-card-review-mukul">
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

                      <h4 className="tg-listing-card-title">
                        <Link href="/tour-details">{item.package_name}</Link>
                      </h4>
                      <span className="tg-listing-card-duration-time mb-3">
                        {item.destination_name}
                      </span>

                      {/* Price  */}
                      <div className="tg-listing-card-duration-tour pt-10">
                        <span className="tg-listing-card-currency-amount mr-5">
                          {item.base_price && (
                            <del className="tg-listing-card-currency-old">
                              ${item.base_price}
                            </del>
                          )}
                        </span>
                        <span>
                          <span className="currency-symbol">$</span>
                          {item.offer_price}
                          <span className="tg-listing-card-activity-person">
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
                        <span className="tg-listing-card-currency-amount mr-5">
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
            <Link
              href={`/tour-grid-1?type=${encodeURIComponent(
                encryptId(selectedFilter)
              )}`}
              className="tg-btn tg-btn-transparent tg-btn-su-transparent"
            >
              See More Tours
            </Link>{" "}
          </div>
        </div>
      </section>
    </>
  );
}
