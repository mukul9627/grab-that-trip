/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import type { ReactElement } from "react";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { addToWishlist } from "@/redux/features/wishlistSlice";
import FeatureTop from "./FeatureTop";
import Whatsapp from "@/svg/Whatsapp";
// import FeatureSidebar from "./FeatureSidebar";
import FeatureSidebar, { FeatureSidebarTow } from "./FeatureSidebar";

import BookingModal from "@/components/homes/home-one/BookingModal";
import { getPackagesBySlug } from "@/hooks/packageDetails";
import CryptoJS from "crypto-js";
import WhatsApp from "@/assets/img/cart/whatsapp_1.svg";

const secretKey = "MY_PRIVATE_KEY";
interface FeatureAreaProps {
  slug: string;
}

export default function FeatureArea({ slug }: FeatureAreaProps): ReactElement {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const [isListView, setIsListView] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // API DATA
  const [apiData, setApiData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  // Pagination
  const itemsPerPage = 9;
  const [itemOffset, setItemOffset] = useState(0);

  const currentItems = filteredData.slice(
    itemOffset,
    itemOffset + itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const startOffset = itemOffset + 1;
  const endOffset = Math.min(itemOffset + itemsPerPage, filteredData.length);
  const totalItems = filteredData.length;

  // 🔐 ADD THIS FUNCTION (no other changes)
  const encryptId = (value: string | number) => {
    return CryptoJS.AES.encrypt(String(value), secretKey).toString();
  };

  const decryptId = (encrypted: string) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encrypted, secretKey);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return decrypted || null;
    } catch {
      return null;
    }
  };
  // useEffect(() => {
  //   const encryptedDestination = searchParams.get("pid");
  //   const encryptedFeature = searchParams.get("type");

  //   let featureId = "7";
  //   let destinationId: string | null = null;

  //   if (encryptedDestination) {
  //     destinationId = decryptId(encryptedDestination);
  //   }

  //   if (encryptedFeature) {
  //     const decrypted = decryptId(encryptedFeature);
  //     featureId = decrypted || "7";
  //   } else if (searchParams.get("feature_id")) {
  //     featureId = searchParams.get("feature_id")!;
  //   }

  //   async function loadData() {
  //     setLoading(true);

  //     let data = [];

  //     if (destinationId && Number(destinationId) > 0) {
  //       // ✅ DESTINATION BASED API
  //       data = await getPackagesByFeatureType(destinationId,featureId);
  //     } else {
  //       // ✅ EXISTING FEATURE BASED API
  //       data = await getPackagesByFeatureId(featureId);
  //     }

  //     setApiData(data);
  //     setFilteredData(data);
  //     setItemOffset(0);
  //     setLoading(false);
  //   }

  //   loadData();
  // }, [searchParams]);

  //   useEffect(() => {
  //   const encryptedDid = searchParams.get("did");   // destination_id
  //   const encryptedType = searchParams.get("type"); // feature_id

  //   let destinationId = 0;
  //   let featureId = 0;

  //   // 🔓 decrypt destination
  //   if (encryptedDid) {
  //     const decrypted = decryptId(encryptedDid);
  //     destinationId = Number(decrypted) || 0;
  //   }

  //   // 🔓 decrypt feature
  //   if (encryptedType) {
  //     const decrypted = decryptId(encryptedType);
  //     featureId = Number(decrypted) || 0;
  //   }

  //   // ✅ CRITICAL FIX:
  //   // If destination exists → DO NOT force feature 7
  //   if (destinationId > 0) {
  //     featureId = 0;
  //   }

  //   // ✅ Default ONLY when nothing exists
  //   if (destinationId === 0 && featureId === 0) {
  //     featureId = 7;
  //   }

  //   async function loadData() {
  //     setLoading(true);

  //     // 🔥 ALWAYS use GetPackage
  //     const data = await getPackagesByFeatureId(
  //       featureId,
  //       destinationId
  //     );

  //     setApiData(data);
  //     setFilteredData(data);
  //     setItemOffset(0);
  //     setLoading(false);
  //   }

  //   loadData();
  // }, [searchParams]);

  // 🔥 LOAD DATA BY SLUG
  useEffect(() => {
    if (!slug) return;

    async function loadData() {
      setLoading(true);

      let data = await getPackagesBySlug(slug, "feature");

      if (data.length === 0) {
        data = await getPackagesBySlug(slug, "destination");
      }

      setApiData(data);
      setFilteredData(data);
      setItemOffset(0);
      setLoading(false);
    }

    loadData();
  }, [slug]);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setItemOffset(selected * itemsPerPage);
  };

  const handleAddToWishlist = useCallback(
    (item: any) => {
      dispatch(addToWishlist(item));
    },
    [dispatch]
  );
  const openBookingPopup = (item: any) => {
    setSelected(item);
    setOpenModal(true);
  };
  const imgBase = process.env.NEXT_PUBLIC_IMAGE_URL;

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
      <div className="tg-listing-grid-area mb-85 mt-85">
        <div className="container">
          <div className="row">
            {/* SIDEBAR */}
            {/* DESKTOP SIDEBAR */}

            <FeatureSidebar
              fullData={apiData}
              setProducts={setFilteredData}
              resetPage={() => setItemOffset(0)}
            />

            {/* RIGHT CONTENT */}
            <div className="col-xl-9 col-lg-8">
              <div className="tg-listing-item-box-wrap ml-10">
                {/* MOBILE FILTER & CLOSE BUTTON */}
                <div className="d-block d-lg-none mb-20 filter-btn-bar">
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-outline-primary w-50"
                      onClick={() => {
                        // alert("Filter clicked"); // THIS WILL FIRE
                        setIsFilterOpen(true);
                      }}
                    >
                      <i className="fa-solid fa-filter mr-5"></i> Filter
                    </button>

                    {/* <button
                      className="btn btn-outline-danger flex-fill"
                      onClick={() => setIsFilterOpen(false)}
                    >
                      <i className="fa-solid fa-xmark mr-5"></i> Close
                    </button> */}
                  </div>
                </div>

                {/* TOP BAR */}
                <FeatureTop
                  startOffset={startOffset}
                  endOffset={endOffset}
                  totalItems={totalItems}
                  setProducts={() => {}}
                  isListView={isListView}
                  handleListViewClick={() => setIsListView(true)}
                  handleGridViewClick={() => setIsListView(false)}
                />

                {/* GRID START */}
                <div className="tg-listing-grid-item">
                  {/* LOADING */}
                  {loading && (
                    <div className="text-center py-5 text-gray-500 text-lg">
                      Loading...
                    </div>
                  )}

                  {/* NO DATA */}
                  {!loading && apiData.length === 0 && (
                    <div className="text-center py-5 text-gray-500 text-lg">
                      No tours found.
                    </div>
                  )}

                  {/* TOUR CARDS */}
                  {!loading && apiData.length > 0 && (
                    <div
                      className={`row list-card ${
                        isListView ? "list-card-open" : ""
                      }`}
                    >
                      {currentItems.map((item: any) => (
                        <div
                          key={item.package_id}
                          className="col-xxl-4 col-xl-6 col-lg-6 col-md-6 tg-grid-full"
                        >
                          <div className="tg-listing-card-item mb-30">
                            {/* IMAGE */}
                            <div className="tg-listing-card-thumb fix p-relative">
                              <Link href={`/packages/${item.slug}`}>
                                <Image
                                  className="tg-card-border w-100"
                                  src={`${imgBase}/package/${item.package_code}/${item.bg_image}`}
                                  alt={item.package_name}
                                  width={284}
                                  height={244}
                                />
                              </Link>
                              {/* <span>{item.package_id}</span> */}

                              {/* WISHLIST BUTTON */}
                              {/* <div className="tg-listing-item-wishlist">
                              <a
                                onClick={() => handleAddToWishlist(item)}
                                style={{ cursor: "pointer" }}
                              >
                                <svg width="20" height="18" viewBox="0 0 20 18">
                                  <path
                                    d="M10.5167 16.3416C10.2334 16.4416 9.76675 16.4416 9.48341 16.3416C7.06675 15.5166 1.66675 12.075 1.66675 6.24165C1.66675 3.66665 3.74175 1.58331 6.30008 1.58331C7.81675 1.58331 9.15841 2.31665 10.0001 3.44998C10.8417 2.31665 12.1917 1.58331 13.7001 1.58331C16.2584 1.58331 18.3334 3.66665 18.3334 6.24165C18.3334 12.075 12.9334 15.5166 10.5167 16.3416Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                  />
                                </svg>
                              </a>
                            </div> */}
                            </div>

                            {/* RATING */}
                            <div className="tg-listing-card-review flex items-center justify-between space tg-listing-card-review-mukul pr-17 pt-10 pb-0">
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

                            {/* CONTENT */}
                            <div className="tg-listing-main-content">
                              <div className="tg-listing-card-content">
                                <h4 className="tg-listing-card-title mb-0">
                                  <Link href={`/packages/${item.slug}`}>
                                    {item.package_name}
                                  </Link>
                                </h4>

                                <span className="tg-listing-card-duration-time mb-3">
                                  {item.destination_name}
                                </span>

                                <div className="tg-listing-card-duration-tour pt-10">
                                  <span className="tg-listing-card-currency-amount mr-5">
                                    {item.base_price && (
                                      <del className="tg-listing-card-currency-old">
                                        INR {item.base_price}
                                      </del>
                                    )}
                                  </span>

                                  <span
                                    style={{
                                      fontSize: "22px",
                                      paddingRight: "2px",
                                    }}
                                  >
                                    {/* {item.package_id} */}
                                    <strong>INR {item.offer_price}</strong>
                                    <span
                                      className="tg-listing-card-activity-person"
                                      style={{ marginTop: "4px" }}
                                    >
                                      /Person
                                    </span>
                                  </span>
                                </div>
                              </div>

                              {/* BOOK NOW */}
                              <div
                                className="tg-listing-card-price-mukul d-flex align-items-end justify-content-between"
                                style={{
                                  cursor: "pointer",
                                  background: "#fff",
                                }}
                              >
                                <div
                                  className="tg-listing-card-price-wrap-mukul price-bg d-flex align-items-center justify-content-center"
                                  onClick={() => openBookingPopup(item)}
                                >
                                  <span className="tg-listing-card-currency-amount mr-5 fw-medium fs-6">
                                    Book Now
                                  </span>
                                </div>
                                <Link
                                  href={`https://wa.me/918929919292?text=${encodeURIComponent(
                                    `Hey! I came across the *${item.package_name}* on your website and would love to know more details.`
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
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* PAGINATION */}
                  {!loading && apiData.length > 0 && (
                    <div className="tg-pagenation-wrap text-center mt-50 mb-30">
                      <nav>
                        <ReactPaginate
                          breakLabel="..."
                          nextLabel={<i className="p-btn">Next Page</i>}
                          previousLabel={<i className="p-btn">Previous Page</i>}
                          onPageChange={handlePageClick}
                          pageRangeDisplayed={3}
                          pageCount={totalPages}
                        />
                      </nav>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {isFilterOpen && (
          <FeatureSidebarTow
            fullData={apiData}
            setProducts={(data) => {
              setFilteredData(data);
            }}
            resetPage={() => setItemOffset(0)}
            onClose={() => setIsFilterOpen(false)}
          />
        )}
      </div>

      <style jsx>{`
        .filter-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 9999;
        }

        .filter-modal {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 90%;
          background: #fff;
          border-radius: 20px 20px 0 0;
          overflow-y: auto;
          padding: 15px;
          animation: slideUp 0.3s ease;
        }

        .filter-modal-header {
          position: sticky;
          top: 0;
          background: #fff;
          z-index: 10000;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
          margin-bottom: 15px;
        }

        .filter-close-btn {
          background: transparent;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #000;
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
