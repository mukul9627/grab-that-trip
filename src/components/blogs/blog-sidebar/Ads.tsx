import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/common/Button";
import AboutBookingModal from "@/components/features/feature-details-one/about/AboutBookingModal";

import ads from "@/assets/img/blog/sidebar/ads.jpg";

const Ads = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      {openModal && (
        <AboutBookingModal
          open={openModal}
          onClose={() => setOpenModal(false)}
        />
      )}

      <div className="tg-blog-ads p-relative mb-40">
        <Image className="w-100" src={ads} alt="ads" />
        <div className="tg-blog-ads-btn">
          {/* <Link href="/tour-details" className="tg-btn tg-btn-transparent tg-btn-switch-animation"> */}
          <button
            onClick={() => setOpenModal(true)}
            className="tg-btn tg-btn-switch-animation"
          >
            <Button text="Book Now" />
          </button>
          {/* </Link> */}
        </div>
      </div>
    </>
  );
};

export default Ads;
