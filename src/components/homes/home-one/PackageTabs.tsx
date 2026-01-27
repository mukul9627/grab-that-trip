"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import CryptoJS from "crypto-js";
import { useDispatch } from "react-redux";
import { getFeatureTabTow } from "@/hooks/getFeatureTabTow";
import { addToWishlist } from "@/redux/features/wishlistSlice";
import { getPackagesByFeatureId } from "@/hooks/getPackagesByFeatureId";
import BookingModal from "./BookingModal";
import WhatsApp from "@/assets/img/cart/whatsapp_1.svg";

type FeatureTab = {
  feature_id: number;
  feature_type_id: number;
  name: string;
  package_code: string;
  slug: string; // 👈 REQUIRED
};

type PackageItem = {
  package_id: number;
  package_name: string;
  destination_name: string;
  days: number;
  base_price: number;
  offer_price: number;
  average_rating: number;
  total_reviews: number;
  bg_image: string;
  short_description: string;
  long_description: string;
  package_code: string;
  slug: string;
};
export default function PackageTabs() {
  const [tabs, setTabs] = useState<FeatureTab[]>([]);
  // const [activeTab, setActiveTab] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<FeatureTab | null>(null);

  const [items, setItems] = useState<PackageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const imageBase = process.env.NEXT_PUBLIC_IMAGE_URL;
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const openBookingPopup = (item: any) => {
    setSelected(item);
    setOpenModal(true);
  };

  // -------------------------------
  // 1️⃣ GET TABS FROM API
  // -------------------------------
  const [encryptedActiveTab, setEncryptedActiveTab] = useState("");
  const activeFeatureId = activeTab?.feature_id ?? 0;

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (activeFeatureId === null) return;

    const enc = encodeURIComponent(encryptId(activeFeatureId));
    setEncryptedActiveTab(enc);
  }, [activeFeatureId]);

  useEffect(() => {
    async function fetchTabs() {
      const res = await getFeatureTabTow();
      if (res?.data?.length) {
        setTabs(res.data);
        setActiveTab(res.data[0]);
      }
    }
    fetchTabs();
  }, []);

  // -------------------------------
  // 2️⃣ GET PACKAGES WHEN TAB CHANGES
  // -------------------------------
  useEffect(() => {
    if (activeFeatureId === null) return;

    async function loadPackages() {
      setLoading(true);
      const pkg = await getPackagesByFeatureId(activeFeatureId);
      setItems(pkg);
      setLoading(false);
    }

    loadPackages();
  }, [activeFeatureId]);

  const secretKey = "MY_PRIVATE_KEY"; // change this
  const encryptId = (id: number | string) => {
    return CryptoJS.AES.encrypt(id.toString(), secretKey).toString();
  };
  const dispatch = useDispatch();
  const handleAddToWishlist = (item: any) => dispatch(addToWishlist(item));

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

      <section className="tab-Pakage-s">
        <div className="container py-12">
          {/* HEADER */}
          <div className="text-center mb-20 mt-140">
            <h2 className="text-3xl font-bold lh-3">
              Find Your Perfect Getaway,
              <br />
              Whatever Your Budget
            </h2>
          </div>

          {/* TAB BUTTONS */}
          <div className="tab-wrapper mb-30">
            <div
              className="tabs"
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                margin: "20px auto",
                paddingBottom: "6px",
                borderBottom: "2px solid #ddd", // <-- FULL BOTTOM BORDER
                width: "fit-content",
              }}
            >
              {tabs.map((t) => (
                <button
                  key={t.feature_id}
                  onClick={() => setActiveTab(t)}
                  style={{
                    background: "none",
                    border: "none",
                    padding: "10px 20px",
                    fontSize: "16px",
                    cursor: "pointer",
                    position: "relative",
                    fontWeight:
                      activeFeatureId === t.feature_id ? "bold" : "normal",
                    color:
                      activeFeatureId === t.feature_id ? "#0A6A67" : "#333",
                    width: "120px", // <-- IMPORTANT: fixed tab width
                    textAlign: "center",
                  }}
                >
                  {t.name}
                </button>
              ))}

              {/* SLIDER (Underline that moves under the active tab) */}
              <div
                style={{
                  position: "absolute",
                  bottom: "-2px", // <-- sits exactly on border
                  left: "0",
                  width: "120px", // same as tab width
                  height: "3px",
                  background: "#0A6A67",
                  transition: "transform 0.3s ease",
                  transform: `translateX(${
                    tabs.findIndex(
                      (x) => x.feature_id === activeTab?.feature_id
                    ) * 140
                  }px)`, // 120px width + 20px gap = 140px
                }}
              ></div>
            </div>
          </div>

          {/* LOADING */}
          {loading && <p className="text-center">Loading packages...</p>}

          {/*  SHOW PACKAGES  */}
          {!loading && items.length > 0 && (
            <div className="row gx-15 mb-25">
              <div className="col-12 mb-40">
                <div className="row gx-15">
                  {(() => {
                    // 🔥 Identify current active tab index
                    const tabIndex = tabs.findIndex(
                      (t) => t.feature_id === activeTab?.feature_id
                    );

                    // 🔥 RULE: Decide layout for current tab
                    const isBigLeft =
                      tabIndex === 0 || // First tab → Big Left
                      tabIndex === 2 // Third tab → Big Left
                        ? true
                        : tabIndex === tabs.length - 1 // Last tab → Big Right
                        ? false
                        : false; // Second tab → Big Right

                    return items.map((item, index) => {
                      // --------------------------------------------
                      // CASE 1: BIG IMAGE LEFT
                      // --------------------------------------------
                      if (isBigLeft && index === 0) {
                        return (
                          <div key={index} className="col-lg-6 order-lg-1">
                            <div className="tg-tour-details-video-thumb mb-15 leftimg-cardpackage">
                              {/* <Link
                                href={`/packages/${item.slug}`}
                                rel="noopener noreferrer"
                              > */}{" "}
                              <Image
                                // src={`${imageBase}/package/bg/${item.bg_image}`}
                                src={`${imageBase}/package/${item.package_code}/${item.bg_image}`}
                                alt={item.package_name}
                                fill
                                className="object-cover"
                              />
                              {/* </Link> */}
                              <div className="cardpackage-ms" />
                              <div className="cardpackage-ms1">
                                <Link
                                  href={`/packages/${item.slug}`}
                                  rel="noopener noreferrer"
                                >
                                  {/* {item.package_id} */}
                                  <div>
                                    <p className="fw-semibold small mb-1 text-end">
                                      {item.days > 1 &&
                                        `${item.days - 1} Nights`}{" "}
                                      - {item.days} Days
                                    </p>

                                    <h1 className="cardpackage-ms-h1">
                                      {item.destination_name}
                                    </h1>

                                    <p
                                      className="mt-1"
                                      style={{ fontSize: "16px" }}
                                    >
                                      {item.short_description}
                                    </p>
                                  </div>
                                </Link>

                                <div className="d-flex align-items-center justify-content-between">
                                  <Link
                                    href={`/packages/${item.slug}`}
                                    rel="noopener noreferrer"
                                  >
                                    {" "}
                                    <div>
                                      <h3 className="fw-bold mb-0 text-white cardpackage-ms-h3">
                                        INR {item.offer_price}
                                      </h3>
                                      <p className="small mt-1">
                                       PER PERSON
                                      </p>
                                    </div>
                                  </Link>

                                  <div className="d-flex flex-column">
                                    <Link
                                      href={`https://wa.me/918929919292?text=${encodeURIComponent(
                                        `Hey! I came across the *${item.package_name}* on your website and would love to know more details.`
                                      )}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="d-flex"
                                    >
                                      <div className="tg-listing-card-review-mukul space whatsapp-icon-custom-css">
                                        <span
                                          className="tg-listing-rating-icon-mukul"
                                          style={{
                                            cursor: "pointer",
                                            position: "relative",
                                            width: "43px",
                                            height: "28px",
                                          }}
                                        >
                                          <Image
                                            src={WhatsApp}
                                            alt={
                                              item?.package_name || "WhatsApp"
                                            }
                                            fill
                                            sizes="28px"
                                            className="object-cover"
                                          />
                                        </span>
                                      </div>
                                    </Link>
                                    <button
                                      onClick={() => openBookingPopup(item)}
                                      className="btn btn-light fw-semibold"
                                      style={{
                                        borderRadius: "10px",
                                        padding: "10px 25px",
                                        backgroundColor: "#0A6A67",
                                        color: "white",
                                      }}
                                    >
                                      BOOK NOW
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }

                      // --------------------------------------------
                      // CASE 2: BIG IMAGE RIGHT
                      // --------------------------------------------
                      if (!isBigLeft && index === 0) {
                        return (
                          <div key={index} className="col-lg-6 order-lg-2">
                            <div className="tg-tour-details-video-thumb mb-15 leftimg-cardpackage">
                              <Link
                                href={`/packages/${item.slug}`}
                                rel="noopener noreferrer"
                              >
                                <Image
                                  src={`${imageBase}/package/${item.package_code}/${item.bg_image}`}
                                  alt={item.package_name}
                                  fill
                                  className="object-cover"
                                />
                              </Link>

                              <div className="cardpackage-ms" />

                              <div className="cardpackage-ms1">
                                <Link
                                  href={`/packages/${item.slug}`}
                                  rel="noopener noreferrer"
                                >
                                  <div>
                                    <p className="fw-semibold small mb-1 text-end">
                                      {item.days > 1 &&
                                        `${item.days - 1} Nights`}{" "}
                                      - {item.days} Days
                                    </p>

                                    <h1 className="cardpackage-ms-h1">
                                      {item.destination_name}
                                    </h1>

                                    <p
                                      className="mt-1"
                                      style={{ fontSize: "16px" }}
                                    >
                                      {item.short_description}
                                    </p>
                                  </div>
                                </Link>

                                <div className="d-flex align-items-center justify-content-between">
                                  <Link
                                    href={`/packages/${item.slug}`}
                                    rel="noopener noreferrer"
                                  >
                                    {" "}
                                    <div>
                                      <h3 className="fw-bold mb-0 text-white cardpackage-ms-h3">
                                        INR {item.offer_price}
                                      </h3>
                                      <p className="small mt-1">
                                        PER PERSON
                                      </p>
                                    </div>
                                  </Link>

                                  <div className="d-flex flex-column">
                                    {" "}
                                    <Link
                                      href={`https://wa.me/918929919292?text=${encodeURIComponent(
                                        `Hey! I came across the *${item.package_name}* on your website and would love to know more details.`
                                      )}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="d-flex"
                                    >
                                      <div className="tg-listing-card-review-mukul space whatsapp-icon-custom-css">
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
                                            alt={
                                              item?.package_name || "WhatsApp"
                                            }
                                            fill
                                            sizes="28px"
                                            className="object-cover"
                                          />
                                        </span>
                                      </div>
                                    </Link>
                                    <button
                                      onClick={() => openBookingPopup(item)}
                                      className="btn btn-light fw-semibold"
                                      style={{
                                        borderRadius: "10px",
                                        padding: "10px 25px",
                                        backgroundColor: "#0A6A67",
                                        color: "white",
                                      }}
                                    >
                                      BOOK NOW
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }

                      // --------------------------------------------
                      // CASE 3: SMALL CARDS (BOTH SIDES)
                      // --------------------------------------------
                      return (
                        <div
                          key={index}
                          className={`col-lg-3 col-md-6 col-12 mb-3 ${
                            isBigLeft ? "order-lg-2" : "order-lg-1"
                          }`}
                        >
                          <div className="card shadow-sm border-0 rightimg-cardpackage d-flex flex-column h-100">
                            {/* IMAGE */}
                            <div
                              className="position-relative"
                              style={{ height: "223px" }}
                            >
                              <Link
                                href={`/packages/${item.slug}`}
                                rel="noopener noreferrer"
                              >
                                <Image
                                  src={`${imageBase}/package/${item.package_code}/${item.bg_image}`}
                                  alt={item.package_name}
                                  fill
                                  className="object-cover"
                                />
                              </Link>

                              <span
                                style={{
                                  position: "absolute",
                                  top: "12px",
                                  left: "12px",
                                  background: "#4b5563",
                                  color: "white",
                                  padding: "4px 10px",
                                  borderRadius: "8px",
                                  fontSize: "12px",
                                }}
                              >
                                Featured
                              </span>
                            </div>

                            {/* CARD BODY */}
                            <div className="p-2 d-flex flex-column flex-grow-1">
                              <div className="d-flex justify-content-between small text-muted mb-1">
                                <span>
                                  {item.days > 1 && `${item.days - 1} Nights`} -{" "}
                                  {item.days} Days
                                </span>
                                <span>
                                  ⭐ {Number(item.average_rating).toFixed(1)} (
                                  {item.total_reviews})
                                </span>
                              </div>

                              <h6 className="mb-1 tab-section-mukul">
                                {item.package_name}
                              </h6>

                              <p className="text-muted small mb-2">
                                {item.destination_name}
                              </p>
                                <h6 className="fw-bold mb-0">
                                  INR {item.offer_price}/<span className="small text-muted under-h6-span">PERSON</span>
                                </h6>

                              {/* PRICE — FIXED AT BOTTOM */}
                              <div className="py-3 px-1 d-flex justify-content-between align-items-center tab-ms-cad mt-auto">
                              

                               <div className="tg-listing-card-price-mukul d-flex align-items-end justify-content-between button-width-change-ms">
                      {/* BOOK NOW */}
                      <div
                        className="tg-listing-card-price-wrap-mukul price-bg d-flex align-items-center justify-content-center"
                        onClick={() => openBookingPopup(item)}
                        style={{ cursor: "pointer" }}
                      >
                        <span className="tg-listing-card-currency-amount mr-5 fw-medium fs-6">
                          Book Now
                        </span>
                      </div>

                      {/* WHATSAPP */}

                      <Link
                        href={`https://wa.me/918929919292?text=${encodeURIComponent(
                          `Hey! I came across the *${item.package_name}* on your website and would love to know more details.`,
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
                              alt={item?.package_name || "WhatsApp"}
                              fill
                              sizes="28px"
                              className="object-cover"
                            />
                          </span>
                        </div>
                      </Link>
                    </div>
                                {/* <Link
                                  href={`https://wa.me/918929919292?text=${encodeURIComponent(
                                    `Hey! I came across the *${item.package_name}* on your website and would love to know more details.`
                                  )}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="d-flex"
                                >
                                  <span className="small text-muted">
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
                                          alt={item?.package_name || "WhatsApp"}
                                          fill
                                          sizes="28px"
                                          className="object-cover"
                                        />
                                      </span>
                                    </div>
                                  </span>
                                </Link> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
            </div>
          )}

          <div className="col-12">
            <div className="text-center mt-15">
              {activeTab?.slug && (
                <Link
                  href={`/holidays/${activeTab.slug}`}
                  rel="noopener noreferrer"
                  className="tg-btn tg-btn-transparent tg-btn-su-transparent"
                >
                  See More Tours
                </Link>
              )}
            </div>
          </div>

          {/* CSS */}
          <style jsx>{`
          .button-width-change-ms{
          width: 17rem
          }
          .under-h6-span{
          font-size: 12px;
          }
            Link:hover {
              color: #fff !important;
            }

            .whatsapp-icon-custom-css {
              position: relative;
              top: 0rem;
              left: 5.5rem;
            }
            h6 {
              font-size: 18px;
            }
            .tab-section-mukul {
              font-weight: 600; /* semi-bold */
            }
            .tab-ms-cad {
              position: relative;
              top: 12px;
            }
            .leftimg-cardpackage {
              position: relative;
              border-radius: 20px;
              overflow: hidden;
              height: 400px;
              color: white;
            }
            .cardpackage-ms {
              position: absolute;
              inset: 0;
              // background: linear-gradient(
              //   to bottom,
              //   rgba(0, 0, 0, 0.1),
              //   rgba(0, 0, 0, 0.7)
              // );
            }
            .cardpackage-ms1 {
              position: absolute;
              inset: 0;
              padding: 25px;
              color: white;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            }
            .cardpackage-ms-h1 {
              font-size: 42px;
              font-weight: 700;
              line-height: 1.1;
              color: white;
            }
            .cardpackage-ms-h3 {
              font-size: 30px;
            }
            .rightimg-cardpackage {
              borderradius: 15px;
              overflow: hidden;
              height: 400px;
            }
            .tabs {
              position: relative;
              display: flex;
              gap: 40px;
              padding-bottom: 10px;
              border-bottom: 2px solid #d1d5db;
            }
            .tab-btn {
              background: transparent;
              border: none;
              font-size: 18px;
              cursor: pointer;
              color: #6b7280;
              padding-bottom: 6px;
            }
            .tab-btn.active {
              color: #000;
            }
            .slider {
              position: absolute;
              bottom: -2px;
              left: 0;
              width: 120px;
              height: 3px;
              background: #22c55e;
              border-radius: 2px;
              transition: transform 0.4s ease-in-out;
            }
                 @media (max-width: 575px) {
   .button-width-change-ms{
          width: revert;
          }
          }
          `}</style>
        </div>
      </section>
    </>
  );
}
