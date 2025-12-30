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

// const [data, setData] = useState<PackageDetail | null>(null);
// const [reviews, setReviews] = useState<ReviewItem[]>([]);

// At the top of the file
/// <reference types="@types/google.maps" />

// type TourPlanMap = {
//   day_no: number;
//   activity: string;
//   location_coordinates: string;
// };

// type MapProps = {
//   tourplans: TourPlanMap[];
// };

// const MapMultipleLocations = ({ tourplans }: MapProps) => {
//   useEffect(() => {
//     if (!window.google) {
//       const script = document.createElement("script");
//       script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY`;
//       script.async = true;
//       script.defer = true;
//       script.onload = initMap;
//       document.head.appendChild(script);
//     } else {
//       initMap();
//     }

//     function initMap() {
//       if (!tourplans || tourplans.length === 0) return;

//       const bounds = new google.maps.LatLngBounds();

//       const map = new google.maps.Map(
//         document.getElementById("map") as HTMLElement,
//         {
//           zoom: 10,
//           center: { lat: 0, lng: 0 },
//         }
//       );

//       tourplans.forEach((plan) => {
//         const [lat, lng] = plan.location_coordinates.split(",").map(Number);

//         const marker = new google.maps.Marker({
//           position: { lat, lng },
//           map,
//           title: plan.activity,
//         });

//         bounds.extend(marker.getPosition()!);
//       });

//       map.fitBounds(bounds);
//     }
//   }, [tourplans]);

//   return <div id="map" style={{ width: "100%", height: "450px" }}></div>;
// };

const FeatureDetailsArea = () => {
  const searchParams = useSearchParams();
  const encryptedId = searchParams.get("pid");

  const [data, setData] = useState<PackageDetail | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const imageBase = process.env.NEXT_PUBLIC_IMAGE_URL;

  useEffect(() => {
    if (!data) return;

    const packageId = data.package_id; // ✅ TS now knows data is NOT null

    async function fetchReviews() {
      try {
        const res = await fetch(
          `https://gtt.dbbworldwide.com/Home/GetReview?package_id=${packageId}`,
          { cache: "no-store" }
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
    if (!encryptedId) return;

    const packageId = decryptId(encryptedId);

    async function fetchDetail() {
      try {
        const res = await fetch(
          `https://gtt.dbbworldwide.com/Home/GetPackageDetail?package_id=${packageId}`,
          { cache: "no-store" }
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
  }, [encryptedId]);

  if (loading) {
    return <div className="text-center py-10">Loading package details...</div>;
  }

  if (!data) {
    return <div className="text-center py-10">No package found</div>;
  }

  return (
    <>
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
                    <Link href="/tour-grid-1">Tour Grid</Link>
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
                    <i className="fa-regular fa-location-dot"></i> Street
                    Bintage,Veins City, italy
                  </span>
                  <div className="tg-tour-details-video-ratings">
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
                  </div>
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
          <div className="row gx-15 mb-25">
            {/* LEFT BIG IMAGE */}
            <div className="col-lg-7">
              {data.images?.[0] && (
                <div className="tg-tour-details-video-thumb mb-15">
                  <Image
                    className="w-100 object-cover"
                    src={`${imageBase}/package/bg/${data.images[0].image}`}
                    alt="Gallery Big"
                    width={706}
                    height={500}
                  />
                </div>
              )}
            </div>

            {/* RIGHT SIDE */}
            <div className="col-lg-5">
              <div className="row gx-15">
                {/* TOP IMAGE */}
                <div className="col-12">
                  {data.images?.[1] && (
                    <div className="tg-tour-details-video-thumb p-relative mb-15">
                      <Image
                        className="w-100 object-cover"
                        src={`${imageBase}/package/bg/${data.images[1].image}`}
                        alt="Gallery Medium"
                        width={503}
                        height={250}
                      />
                    </div>
                  )}
                </div>

                {/* BOTTOM LEFT */}
                <div className="col-lg-6 col-md-6">
                  {data.images?.[2] && (
                    <div className="tg-tour-details-video-thumb mb-15">
                      <Image
                        className="w-100 object-cover"
                        src={`${imageBase}/package/bg/${data.images[2].image}`}
                        alt="Gallery Small 1"
                        width={244}
                        height={238}
                      />
                    </div>
                  )}
                </div>

                {/* BOTTOM RIGHT */}
                <div className="col-lg-6 col-md-6">
                  {data.images?.[3] && (
                    <div className="tg-tour-details-video-thumb mb-15">
                      <Image
                        className="w-100 object-cover"
                        src={`${imageBase}/package/bg/${data.images[3].image}`}
                        alt="Gallery Small 2"
                        width={244}
                        height={238}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

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
                    From <span>₹{data.offer_price}</span> / Person
                  </p>
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
                  {data && <Faq tourplans={data.tourplans} />}
                  <div className="tg-tour-about-border mb-45"></div>
                  {/* ---------- MULTIPLE LOCATIONS MAP ---------- */}
                  <div className="tg-tour-about-map mb-40">
                    <h4 className="tg-tour-about-title mb-15">Location</h4>
                    {/* <MapMultipleLocations tourplans={data.tourplans} /> */}
                  </div>
                  <div className="tg-tour-about-border mb-45"></div>
                  <Review />
                  <div className="tg-tour-about-border mb-35"></div>
                  <ReviewDetails reviews={reviews} />
                  <div className="tg-tour-about-border mb-45"></div>
                  {/* <ReviewFormArea /> */}
                </div>
              </div>
<Faqsection />
            </div>
            <div className="col-xl-4 col-lg-4">
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
    </>
  );
};

export default FeatureDetailsArea;
