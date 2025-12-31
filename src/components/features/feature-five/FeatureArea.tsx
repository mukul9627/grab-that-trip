/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { addToWishlist } from "@/redux/features/wishlistSlice";
import FeatureTop from "./FeatureTop";
import FeatureSidebar from "./FeatureSidebar";
import {
  getPackagesByFeatureId,
  getPackagesByFeatureType,
} from "@/hooks/packageDetails";

import CryptoJS from "crypto-js";

const secretKey = "MY_PRIVATE_KEY";

export default function FeatureArea() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const [isListView, setIsListView] = useState(false);

  // API DATA
  const [apiData, setApiData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
  //   const encrypted = searchParams.get("type");
  //   let featureId = "7";

  //   if (encrypted) {
  //     const decrypted = decryptId(encrypted);
  //     featureId = decrypted || "7";
  //   } else if (searchParams.get("feature_id")) {
  //     featureId = searchParams.get("feature_id")!;
  //   }

  //   async function loadData() {
  //     setLoading(true);
  //     const data = await getPackagesByFeatureId(featureId);

  //     setApiData(data);
  //     setFilteredData(data); // initial state
  //     setLoading(false);
  //     setItemOffset(0);
  //   }

  //   loadData();
  // }, [searchParams]);

  useEffect(() => {
    const encryptedDestination = searchParams.get("pid");
    const encryptedFeature = searchParams.get("type");

    let featureId = "7";
    let destinationId: string | null = null;

    if (encryptedDestination) {
      destinationId = decryptId(encryptedDestination);
    }

    if (encryptedFeature) {
      const decrypted = decryptId(encryptedFeature);
      featureId = decrypted || "7";
    } else if (searchParams.get("feature_id")) {
      featureId = searchParams.get("feature_id")!;
    }

    async function loadData() {
      setLoading(true);

      let data = [];

      if (destinationId) {
        // ✅ DESTINATION BASED API
        data = await getPackagesByFeatureType(destinationId);
      } else {
        // ✅ EXISTING FEATURE BASED API
        data = await getPackagesByFeatureId(featureId);
      }

      setApiData(data);
      setFilteredData(data);
      setItemOffset(0);
      setLoading(false);
    }

    loadData();
  }, [searchParams]);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setItemOffset(selected * itemsPerPage);
  };

  const handleAddToWishlist = useCallback(
    (item: any) => {
      dispatch(addToWishlist(item));
    },
    [dispatch]
  );

  const imgBase = process.env.NEXT_PUBLIC_IMAGE_URL;

  return (
    <div className="tg-listing-grid-area mb-85 mt-85">
      <div className="container">
        <div className="row">
          {/* SIDEBAR */}
          <FeatureSidebar
            fullData={apiData}
            setProducts={setFilteredData}
            resetPage={() => setItemOffset(0)}
          />

          {/* RIGHT CONTENT */}
          <div className="col-xl-9 col-lg-8">
            <div className="tg-listing-item-box-wrap ml-10">
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
                    {/* {currentItems.map((item: any) => (
                      <div
                        key={item.package_id}
                        className="col-xxl-4 col-xl-6 col-lg-6 col-md-6 tg-grid-full"
                      > */}
                    {currentItems.map((item: any, index: number) => (
                      <div
                        key={`${item.package_id}-${index}`}
                        className="col-xxl-4 col-xl-6 col-lg-6 col-md-6 tg-grid-full"
                      >
                        <div className="tg-listing-card-item mb-30">
                          {/* IMAGE */}
                          <div className="tg-listing-card-thumb fix mb-15 p-relative">
                            <Link href={`/tour-details?id=${item.package_id}`}>
                              <Image
                                className="tg-card-border w-100"
                                src={`${imgBase}/package/bg/${item.bg_image}`}
                                alt={item.package_name}
                                width={400}
                                height={300}
                              />
                            </Link>

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

                          {/* CONTENT */}
                          <div className="tg-listing-main-content">
                            <div className="tg-listing-card-content">
                              <h4 className="tg-listing-card-title">
                                <Link
                                  href={`/tour-details?id=${item.package_id}`}
                                >
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
                                      INR{item.base_price}
                                    </del>
                                  )}
                                </span>

                                <span>
                                  INR{item.offer_price}
                                  <span className="tg-listing-card-activity-person">
                                    /Person
                                  </span>
                                </span>
                              </div>
                            </div>

                            {/* BOOK NOW */}
                            <div
                              className="tg-listing-card-price-mukul d-flex align-items-end justify-content-between"
                              style={{ cursor: "pointer", background: "#fff", fontSize: "16px" }}
                            >
                              <div className="tg-listing-card-price-wrap-mukul price-bg d-flex align-items-center justify-content-center">
                                <span className="tg-listing-card-currency-amount mr-5" style={{ fontSize: "16px" }}>
                                 View Tours
                                </span>
                              </div>

                              {/* <div className="tg-listing-card-review-mukul space">
                                <span className="tg-listing-rating-icon-mukul ">
                                  <i className="fa-sharp fa-solid fa-phone"></i>
                                </span>
                              </div> */}
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
    </div>
  );
}
