"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CryptoJS from "crypto-js";
import Image from "next/image";
import Link from "next/link";
import VideoPopup from "@/modals/VideoPopup";
import FeatureList from "./FeatureList";
import AboutText from "./about/AboutText";
import Faq from "./about/Faq";
import Included from "./about/Included";
import Review from "./about/Review";
import ReviewDetails from "./about/ReviewDetails";
import FeatureSidebar from "./FeatureSidebar";
import Faqsection from "./about/Faqsection";
import Cat1 from "@/components/homes/home-one/Cta";
import BookingModal from "@/components/homes/home-one/BookingModal";
import WhatsApp from "@/assets/img/cart/whatsapp_1.svg";

const secretKey = "MY_PRIVATE_KEY";

const decryptId = (encrypted: string) => {
  const bytes = CryptoJS.AES.decrypt(encrypted, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

type PackageDetail = {
  package_id: number;
  name: string;
  short_description: string;
  long_description: string;
  base_price: number;
  offer_price: number;
  duration_days: number;
  bg_image: string;
  highlights: any[];
  inclusions: any[];
  tourplans: any[];
  images: any[];
  package_code: any[];
};

type Review = {
  review_id: number;
  package_id: number;
  user_id: string;
  review_title: string;
  review_text: string;
  rating_overall: number;
  rating_service: number;
  rating_comfort: number;
  rating_value_for_money: number;
  is_verified_booking: boolean;
  is_approved: boolean; // ❗ REQUIRED
  created_at: string;
};

/// <reference types="@types/google.maps" />

interface FeatureDetailsAreaProps {
  slug: string;
}

const FeatureDetailsArea = ({ slug }: FeatureDetailsAreaProps) => {
  const searchParams = useSearchParams();
  const encryptedId = searchParams.get("pid");
  const [openGallery, setOpenGallery] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const [data, setData] = useState<PackageDetail | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const imageBase = process.env.NEXT_PUBLIC_IMAGE_URL;

  const BaseUrl = process.env.NEXT_PUBLIC_API_URL;

  const openBookingPopup = (item: any) => {
    setSelected(item);
    setOpenModal(true);
  };

  useEffect(() => {
    if (!data) return;

    const packageId = data.package_id; // ✅ TS now knows data is NOT null

    async function fetchReviews() {
      try {
        const res = await fetch(
          `https://gtt.dbbworldwide.com/Home/GetReview?package_id=${packageId}`,
          { cache: "no-store" },
        );
        const json = await res.json();
        setReviews(json.data || []);
      } catch (err) {
        console.error("Review API error:", err);
      }
    }

    fetchReviews();
  }, [data]);

  useEffect(() => {
    if (!slug) return;

    async function fetchDetail() {
      try {
        const res = await fetch(
          `https://gtt.dbbworldwide.com/Home/GetPackageDetailBySlug?slug=${slug}`,
          { cache: "no-store" },
        );
        const json = await res.json();
        setData(json.data?.[0] || null);
      } catch (err) {
        console.error("Detail API error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDetail();
  }, [slug]);

  if (loading) {
    return <div className="text-center py-10">Loading package details...</div>;
  }

  if (!data) {
    return <div className="text-center py-10">No package found</div>;
  }

  /* ✅ MOVE THIS BELOW THE GUARD */
  const images = data.images || [];
  const visibleImages = images.slice(0, 8);
  const extraCount = images.length - 4;
  // console.log(visibleImages)
  return (
    <>
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
      <div
        className="tg-breadcrumb-spacing-3 include-bg p-relative fix"
        style={{
          backgroundImage: `url(/assets/img/breadcrumb/breadcrumb-2.jpg)`,
        }}
      >
        <div className="tg-hero-top-shadow"></div>
      </div>
      <div className="tg-breadcrumb-list-2-wrap">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="tg-breadcrumb-list-2">
                <ul>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <i className="fa-sharp fa-solid fa-angle-right"></i>
                  </li>
                  <li>
                    <Link href="#">Packages</Link>
                  </li>
                  <li>
                    <i className="fa-sharp fa-solid fa-angle-right"></i>
                  </li>
                  <li>
                    <span>{data.name}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="tg-tour-details-area pt-35 pb-25">
        <div className="container">
          <div className="row align-items-end mb-35">
            <div className="col-xl-9 col-lg-8">
              <div className="tg-tour-details-video-title-wrap">
                <h2 className="mb-10">{data.name}</h2>
                <div className="tg-tour-details-video-location d-flex flex-wrap">
                  <span className="mr-25">
                    <i className="fa-regular fa-location-dot"></i>{" "}
                    {data.short_description}
                  </span>
                  {/* <div className="tg-tour-details-video-ratings">
                    <span>
                      <i className="fa-sharp fa-solid fa-star"></i>
                    </span>
                    <span>
                      <i className="fa-sharp fa-solid fa-star"></i>
                    </span>
                    <span>
                      <i className="fa-sharp fa-solid fa-star"></i>
                    </span>
                    <span>
                      <i className="fa-sharp fa-solid fa-star"></i>
                    </span>
                    <span>
                      <i className="fa-sharp fa-solid fa-star"></i>
                    </span>
                    <span className="review">(5 Reviews)</span>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4">
              <div className="tg-tour-details-video-share text-end">
                <Link href="#">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.87746 9.03227L10.7343 11.8625M10.7272 4.05449L5.87746 6.88471M14.7023 2.98071C14.7023 4.15892 13.7472 5.11405 12.569 5.11405C11.3908 5.11405 10.4357 4.15892 10.4357 2.98071C10.4357 1.80251 11.3908 0.847382 12.569 0.847382C13.7472 0.847382 14.7023 1.80251 14.7023 2.98071ZM6.16901 7.95849C6.16901 9.1367 5.21388 10.0918 4.03568 10.0918C2.85747 10.0918 1.90234 9.1367 1.90234 7.95849C1.90234 6.78029 2.85747 5.82516 4.03568 5.82516C5.21388 5.82516 6.16901 6.78029 6.16901 7.95849ZM14.7023 12.9363C14.7023 14.1145 13.7472 15.0696 12.569 15.0696C11.3908 15.0696 10.4357 14.1145 10.4357 12.9363C10.4357 11.7581 11.3908 10.8029 12.569 10.8029C13.7472 10.8029 14.7023 11.7581 14.7023 12.9363Z"
                      stroke="currentColor"
                      strokeWidth="0.977778"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Share
                </Link>
                <Link href="#" className="ml-25">
                  <svg
                    width="16"
                    height="14"
                    viewBox="0 0 16 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.2606 10.7831L10.2878 10.8183L10.2606 10.7831L10.2482 10.7928C10.0554 10.9422 9.86349 11.0909 9.67488 11.2404C9.32643 11.5165 9.01846 11.7565 8.72239 11.9304C8.42614 12.1044 8.19324 12.1804 7.99978 12.1804C7.80633 12.1804 7.57342 12.1044 7.27718 11.9304C6.9811 11.7565 6.67312 11.5165 6.32472 11.2404C6.13618 11.091 5.94436 10.9423 5.75159 10.7929L5.73897 10.7831C4.90868 10.1397 4.06133 9.48294 3.36178 8.6911C2.51401 7.73157 1.92536 6.61544 1.92536 5.16811C1.92536 3.75448 2.71997 2.57143 3.80086 2.07481C4.84765 1.59384 6.26028 1.71692 7.61021 3.12673L7.64151 3.09675L7.61021 3.12673C7.7121 3.23312 7.85274 3.2933 7.99978 3.2933C8.14682 3.2933 8.28746 3.23312 8.38936 3.12673L8.35868 3.09736L8.38936 3.12673C9.73926 1.71692 11.1519 1.59384 12.1987 2.07481C13.2796 2.57143 14.0742 3.75448 14.0742 5.16811C14.0742 6.61544 13.4856 7.73157 12.6378 8.69109L12.668 8.71776L12.6378 8.6911C11.9382 9.48294 11.0909 10.1397 10.2606 10.7831ZM5.10884 11.6673L5.13604 11.6321L5.10884 11.6673L5.10901 11.6674C5.29802 11.8137 5.48112 11.9554 5.65523 12.0933C5.99368 12.3616 6.35981 12.6498 6.73154 12.8682L6.75405 12.8298L6.73154 12.8682C7.10315 13.0864 7.53174 13.2667 7.99978 13.2667C8.46782 13.2667 8.89641 13.0864 9.26802 12.8682L9.24552 12.8298L9.26803 12.8682C9.63979 12.6498 10.0059 12.3615 10.3443 12.0933C10.5185 11.9553 10.7016 11.8136 10.8907 11.6673L10.8907 11.6673L10.8926 11.6659C11.7255 11.0212 12.6722 10.2884 13.4463 9.41228L13.413 9.38285L13.4463 9.41227C14.4145 8.31636 15.1553 6.95427 15.1553 5.16811C15.1553 3.34832 14.1308 1.76808 12.6483 1.08693C11.2517 0.445248 9.53362 0.635775 7.99979 1.99784C6.46598 0.635775 4.74782 0.445248 3.35124 1.08693C1.86877 1.76808 0.844227 3.34832 0.844227 5.16811C0.844227 6.95427 1.58502 8.31636 2.55325 9.41227C3.32727 10.2883 4.27395 11.0211 5.10682 11.6657L5.10884 11.6673Z"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="0.0888889"
                    />
                  </svg>
                  Add to Wishlist
                </Link>
              </div>
            </div>
          </div>
          <div className="mb-25">
            {/* MOBILE SCROLL GALLERY */}
            <div className="d-lg-none d-block">
              <div className="mobile-gallery">
                {images.map((img, i) => (
                  <div
                    key={i}
                    className="mobile-gallery-item"
                    onClick={() => setActiveIndex(i)} // ✅ open big view
                  >
                    <Image
                      src={`${imageBase}/package/${data.package_code}/${img.image}`}
                      alt={`Gallery ${i + 1}`}
                      width={800}
                      height={300}
                      className="mobile-gallery-img"
                    />
                  </div>
                ))}
              </div>
            </div>

            {activeIndex !== null && (
              <div className="mobile-lightbox">
                <div
                  className="mobile-lightbox-backdrop"
                  onClick={() => setActiveIndex(null)}
                />

                <div className="mobile-lightbox-content">
                  {/* CLOSE */}
                  <button
                    className="mobile-lightbox-close"
                    onClick={() => setActiveIndex(null)}
                  >
                    ✕
                  </button>

                  {/* PREV */}
                  {activeIndex > 0 && (
                    <button
                      className="mobile-lightbox-nav left"
                      style={{ zIndex: "1" }}
                      onClick={() => setActiveIndex(activeIndex - 1)}
                    >
                      <span>
                        <i className="fa-solid fa-angle-left mukul-angle-icon1"></i>
                      </span>
                    </button>
                  )}

                  {/* IMAGE */}
                  <Image
                    src={`${imageBase}/package/${data.package_code}/${images[activeIndex].image}`}
                    alt="Big View"
                    width={500}
                    height={400}
                    sizes="100vw"
                    priority
                    className="mobile-lightbox-image"
                  />

                  {/* NEXT */}
                  {activeIndex < images.length - 1 && (
                    <button
                      className="mobile-lightbox-nav right"
                      onClick={() => setActiveIndex(activeIndex + 1)}
                    >
                      <span>
                        <i className="fa-solid fa-angle-right mukul-angle-icon"></i>
                      </span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* DESKTOP GRID (your original layout) */}
            {/* DESKTOP GRID */}
            <div className="row gx-15 d-none d-lg-flex">
              <div className="col-lg-7">
                {visibleImages[0] && (
                  <Image
                    src={`${imageBase}/package/${data.package_code}/${visibleImages[0].image}`}
                    alt="Gallery Big"
                    width={706}
                    height={500}
                    className="w-100 object-cover"
                  />
                )}
              </div>

              <div className="col-lg-5">
                <div className="row gx-15">
                  <div className="col-12">
                    {visibleImages[1] && (
                      <Image
                        src={`${imageBase}/package/${data.package_code}/${visibleImages[1].image}`}
                        alt="Gallery Medium"
                        width={503}
                        height={250}
                        className="w-100 object-cover mb-15"
                      />
                    )}
                  </div>

                  <div className="col-lg-6">
                    {visibleImages[2] && (
                      <Image
                        src={`${imageBase}/package/${data.package_code}/${visibleImages[2].image}`}
                        alt="Gallery Small 1"
                        width={244}
                        height={238}
                        className="w-100 object-cover mb-15"
                      />
                    )}
                  </div>

                  <div className="col-lg-6">
                    {visibleImages[3] && (
                      <div
                        className="position-relative cursor-pointer"
                        onClick={() => setOpenGallery(true)}
                      >
                        <Image
                          src={`${imageBase}/package/${data.package_code}/${visibleImages[3].image}`}
                          alt="Gallery Small 2"
                          width={244}
                          height={238}
                          className="w-100 object-cover mb-15"
                        />
                        {extraCount > 0 && (
                          <div className="gallery-overlay">+{extraCount}</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ================= GALLERY MODAL ================= */}
          {openGallery && (
            <div className="gallery-modal">
              <div
                className="gallery-backdrop"
                onClick={() => setOpenGallery(false)}
              />
              <div className="gallery-content">
                <button
                  className="gallery-close"
                  onClick={() => setOpenGallery(false)}
                >
                  ✕
                </button>

                <div className="gallery-grid">
                  {images.map((img, i) => (
                    <div
                      key={i}
                      className="gallery-item cursor-pointer"
                      onClick={() => setActiveIndex(i)} // 🔥 open clicked image
                    >
                      <Image
                        src={`${imageBase}/package/${data.package_code}/${img.image}`}
                        alt={`Gallery ${i + 1}`}
                        width={400}
                        height={300}
                        className="w-100 object-cover"
                      />
                    </div>
                  ))}
                </div>
                {activeIndex !== null && (
                  <div className="lightbox">
                    <div
                      className="lightbox-backdrop"
                      onClick={() => setActiveIndex(null)}
                    />

                    <div className="lightbox-content">
                      {/* CLOSE */}
                      <button
                        className="lightbox-close"
                        onClick={() => setActiveIndex(null)}
                      >
                        ✕
                      </button>

                      {/* PREV */}
                      {activeIndex > 0 && (
                        <button
                          className="lightbox-nav left"
                          onClick={() => setActiveIndex(activeIndex - 1)}
                        >
                          ‹
                        </button>
                      )}

                      {/* IMAGE */}
                      <Image
                        src={`${imageBase}/package/${data.package_code}/${images[activeIndex].image}`}
                        alt="Big View"
                        width={1200}
                        height={800}
                        className="lightbox-image"
                      />

                      {/* NEXT */}
                      {activeIndex < images.length - 1 && (
                        <button
                          className="lightbox-nav right"
                          onClick={() => setActiveIndex(activeIndex + 1)}
                        >
                          ›
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="tg-tour-details-feature-list-wrap">
            <div className="row align-items-center">
              <div className="col-lg-8">
                <div className="tg-tour-details-video-feature-list">
                  <FeatureList data={data} />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="tg-tour-details-video-feature-price mb-15">
                  <p>
                    From <span>INR {data.offer_price}</span> / Person
                  </p>
                </div>
                <div className="tg-listing-card-price-mukul d-flex align-items-end justify-content-between button-width-ms">
                  {/* BOOK NOW */}
                  <div
                    className="tg-listing-card-price-wrap-mukul price-bg d-flex align-items-center justify-content-center"
                    onClick={() => openBookingPopup(data)}
                    style={{ cursor: "pointer" }}
                  >
                    <span className="tg-listing-card-currency-amount mr-5 fw-medium fs-6">
                      Book Now
                    </span>
                  </div>

                  {/* WHATSAPP */}

                  <Link
                    href={`https://wa.me/918929919292?text=${encodeURIComponent(
                      `Hey! I came across the *${data.name}* on your website and would love to know more details.`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="d-flex"
                  >
                    <div className="tg-listing-card-review-mukul space">
                      <span
                        className="tg-listing-rating-icon-mukul"
                        style={{
                          cursor: "pointer",
                          position: "relative",
                          width: "28px",
                          height: "28px",
                        }}
                      >
                        <Image
                          src={WhatsApp}
                          alt={data?.name || "WhatsApp"}
                          fill
                          sizes="28px"
                          className="object-cover"
                        />
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <VideoPopup
        isVideoOpen={isVideoOpen}
        setIsVideoOpen={setIsVideoOpen}
        videoId="eEzD-Y97ges"
      />

      <div className="tg-tour-about-area tg-tour-about-border pt-40">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-8">
              <div className="tg-tour-about-wrap mr-55">
                <div className="tg-tour-about-content">
                  <AboutText data={data} />
                  <div className="tg-tour-about-border mb-40"></div>
                  {data && <Included inclusions={data.inclusions} />}

                  <div className="tg-tour-about-border mb-40"></div>
                  {/* Tour Plan */}
                  {data && <Faq tourplans={data.tourplans} />}
                  <div className="tg-tour-about-border mb-45"></div>
                  {/* ---------- MULTIPLE LOCATIONS MAP ---------- */}
                  <div className="tg-tour-about-map mb-40">
                    <h4 className="tg-tour-about-title mb-15">Location</h4>
                    {/* <MapMultipleLocations tourplans={data.tourplans} /> */}
                  </div>
                  {/* <div className="tg-tour-about-border mb-45"></div>
                  <Review /> */}
                  <div className="tg-tour-about-border mb-35"></div>
                  {/* ReviewDetails */}
                  <ReviewDetails reviews={reviews} />
                  <div className="tg-tour-about-border mb-45"></div>
                  {/* <ReviewFormArea /> */}
                </div>
              </div>
              {/* <Faqsection /> */}
            </div>
            <div className="col-xl-4 col-lg-4 side-form-dnone">
              <div className="tg-tour-about-sidebar tg-tour-about-sidebar-ms top-sticky mb-200">
                <FeatureSidebar
                  package_id={data.package_id}
                  package_name={data.name}
                  base_price={data.base_price}
                  offer_price={data.offer_price}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-120">
        <Cat1 />
      </div>

      <style jsx>{`
        .mukul-angle-icon {
          color: white;
          margin-left: -3rem;
          font-size: 23px;
        }
        .mukul-angle-icon1 {
          color: white;
          margin-right: -2rem;
          font-size: 23px;
        }

        /* ===== MOBILE SCROLL ===== */
        .mobile-gallery {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
        }

        .mobile-gallery-item {
          min-width: 100%;
          scroll-snap-align: center;
          border-radius: 8px;
          overflow: hidden;
        }

        .mobile-gallery-img {
          width: 100%;
          height: auto;
          cursor: pointer;
        }

        /* ===== LIGHTBOX ===== */
        .mobile-lightbox {
          position: fixed;
          inset: 0;
          z-index: 9999;
        }

        .mobile-lightbox-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.95);
        }

        .mobile-lightbox-content {
          position: relative;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* 🔥 PINCH ZOOM ENABLED */
        .mobile-lightbox-image {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          touch-action: pan-x pan-y pinch-zoom;
        }

        /* CLOSE BUTTON */
        .mobile-lightbox-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: transparent;
          border: none;
          color: #fff;
          font-size: 28px;
          z-index: 10;
        }

        img {
          touch-action: manipulation;
        }

        .lightbox {
          position: fixed;
          inset: 0;
          z-index: 10000;
        }

        .lightbox-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.9);
        }

        .lightbox-content {
          position: relative;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lightbox-image {
          max-width: 90%;
          max-height: 90%;
          object-fit: contain;
          border-radius: 6px;
        }

        .lightbox-close {
          position: absolute;
          top: 20px;
          right: 30px;
          background: transparent;
          border: none;
          color: #fff;
          font-size: 30px;
          cursor: pointer;
        }

        .lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.5);
          border: none;
          color: #fff;
          font-size: 50px;
          cursor: pointer;
          padding: 0 15px;
        }

        .lightbox-nav.left {
          left: 20px;
        }

        .lightbox-nav.right {
          right: 20px;
        }

        .gallery-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.65);
          color: #fff;
          font-size: 32px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .gallery-modal {
          position: fixed;
          inset: 0;
          z-index: 9999;
        }

        .gallery-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
        }

        .gallery-content {
          position: relative;
          max-width: 1100px;
          margin: 60px auto;
          background: #000;
          padding: 20px;
        }

        .gallery-close {
          position: absolute;
          top: 10px;
          right: 15px;
          background: none;
          border: none;
          color: #fff;
          font-size: 26px;
          cursor: pointer;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 15px;
        }

        .button-width-ms {
          position: relative;
          width: 17rem;
          left: 8rem;
        }
        @media (max-width: 575px) {
.side-form-dnone{
display: none;
}
          .button-width-ms {
            position: relative;
            width: revet;
            left: 0;
          }
        }
      `}</style>
    </>
  );
};

export default FeatureDetailsArea;
