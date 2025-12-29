"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/common/Button";
import BookingModal from "@/components/homes/home-one/BookingModal";

import shape_1 from "@/assets/img/about/details/shape.png";
import shape_2 from "@/assets/img/about/details/shape-2.png";
import shape_3 from "@/assets/img/chose/chose-3/circle-text.png";
import shape_4 from "@/assets/img/chose/chose-3/star.png";
import thumb_1 from "@/assets/img/about/details/thumb-1.jpg";
import thumb_2 from "@/assets/img/about/details/thumb-3.jpg";
import thumb_3 from "@/assets/img/about/details/thumb-2.jpg";

const AboutArea = () => {
  const [openModal, setOpenModal] = useState(false);

  // You can replace these with real API values later
  const selectedPackage = {
    package_id: 1,
    package_name: "Custom Travel Package",
    base_price: 25000,
    offer_price: 19999,
  };

  return (
    <>
      {/* ✅ BOOKING MODAL */}
      {openModal && (
        <BookingModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          package_id={selectedPackage.package_id}
          package_name={selectedPackage.package_name}
          base_price={selectedPackage.base_price}
          offer_price={selectedPackage.offer_price}
        />
      )}

      <div className="tg-about-area p-relative z-index-1 pt-140 pb-105">
        <Image
          className="tg-about-details-shape p-absolute d-none d-lg-block"
          src={shape_1}
          alt="shape"
        />

        <div className="container">
          <div className="row align-items-center">
            {/* LEFT IMAGES */}
            <div className="col-lg-6">
              <div className="tg-about-details-left p-relative mb-15">
                <Image
                  className="tg-about-details-map p-absolute"
                  src={shape_2}
                  alt="map"
                />
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="tg-about-details-thumb p-relative z-index-9">
                      <Image className="main-thumb tg-round-15 w-100 mb-20" src={thumb_1} alt="" />
                      <Image className="main-thumb tg-round-15 w-100 mb-20" src={thumb_2} alt="" />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="tg-about-details-thumb-2 p-relative">
                      <div className="tg-chose-3-rounded p-relative mb-30">
                        <Image className="rotate-infinite-2" src={shape_3} alt="" />
                        <Image className="tg-chose-3-star" src={shape_4} alt="" />
                      </div>
                      <Image className="w-100 tg-round-15" src={thumb_3} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="col-lg-6">
              <div className="tg-chose-content mb-35 ml-60">
                <div className="tg-chose-section-title mb-30">
                  <h5 className="tg-section-subtitle mb-15">
                    Explore the world with us
                  </h5>

                  <h2 className="mb-15 text-capitalize">About</h2>

                  <p className="text-capitalize mb-35">
                    How many times does this happen to you? In the middle of the
                    night you’re scrolling through your phone. Suddenly an
                    amazing trip flashes on your phone and by morning, it's gone.
                    Someone else grabbed what you only dreamed about.
                  </p>

                  {/* ✅ BUTTON OPENS MODAL */}
                  <div className="tg-chose-btn">
                    <button
                      onClick={() => setOpenModal(true)}
                      className="tg-btn tg-btn-switch-animation"
                    >
                      <Button text="Book Now" />
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutArea;
