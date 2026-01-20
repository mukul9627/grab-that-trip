import HeaderOne from "@/layouts/headers/HeaderOne";
import Banner from "./Banner";
import FooterOne from "@/layouts/footers/FooterOne";
import Location from "./Location";
import PurposeSection from "./PurposeSection";
import Testimonial from "./Testimonial";
import Blog from "./Blog";
import Cta2 from "./CtaTow";
import Cta1 from "./Cta";
import HeroSection1 from "./CardSection";
import LocationBased from "./LocationBased";
import PackageTabs from "./PackageTabs";
import Faq from "./faq";
import { homeFaqData } from "@/data/FaqData";

const HomeOne = () => {
  return (
    <>
      <HeaderOne />
      <main>
        <Banner />
        <Location />
        <PurposeSection />
        <Cta2 />
        <HeroSection1 />
        <PackageTabs />
        <LocationBased />
        <Testimonial />
        <Blog />
        <Cta1 />
        <Faq data={homeFaqData} showImage={true} isHome />
      </main>
      <FooterOne />
    </>
  );
};

export default HomeOne;
