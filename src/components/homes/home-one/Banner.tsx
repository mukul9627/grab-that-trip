"use client";

import { useState } from "react";
import MoodSelector from "@/components/common/banner-form/MoodSelector";

const bgImage = process.env.NEXT_PUBLIC_IMAGE_URL;

const moodApiImages: Record<string, string> = {
  romantic: `${bgImage}/bg/romantic.jpg`,
  adventurous: `${bgImage}/bg/adventurous.jpg`,
  peaceful: `${bgImage}/bg/peaceful.jpg`,
  cultural: `${bgImage}/bg/cultural.jpg`,
  "instagram-worthy": `${bgImage}/bg/instagram-worthy.jpg`,
  relaxing: `${bgImage}/bg/relaxing.jpg`,
};

const Banner = () => {
  const [bannerImage, setBannerImage] = useState(
    process.env.NEXT_PUBLIC_BANNER_DEFAULT || "/assets/img/hero/tu/banner.jpg"
  );

  const [isFading, setIsFading] = useState(false);

  const handleMoodChange = (slug: string) => {
    const newImg =
      moodApiImages[slug] || process.env.NEXT_PUBLIC_BANNER_DEFAULT;

    setIsFading(true);

    setTimeout(() => {
      setBannerImage(newImg!);
      setIsFading(false);
    }, 200);
  };

  return (
    <div
      className={`tg-hero-area tg-hero-tu-wrapper include-bg home-banner-mukul ${
        isFading ? "fade-banner" : ""
      }`}
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <div className="container">
        <div className="tg-hero-content text-center">
          <div className="tg-hero-title-box mb-30">
            <h2 className="tg-hero-title">Plan Your Trip Based on Mood</h2>
            <p className="home-second-p-color mb-10 text-white">
              Tell us how you're feeling, and we'll find the perfect destination
            </p>
          </div>

          <MoodSelector onMoodChange={handleMoodChange} />
        </div>
      </div>

      <style jsx>{`
        .fade-banner {
          opacity: 0;
          transition: opacity 1.2s ease-in-out;
        }
        .home-banner-mukul {
          transition: opacity 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Banner;
