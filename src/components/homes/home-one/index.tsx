import HeaderOne from "@/layouts/headers/HeaderOne";
import Banner from "./Banner";
import FooterOne from "@/layouts/footers/FooterOne";
import Location from "./Location";
// import About from "./About";
import PurposeSection from "./PurposeSection";
import Listing from "./Listing";
import Ads from "./Ads";
import Process from "./Process";
import Testimonial from "./Testimonial";
import Blog from "./Blog";
import Cta from "./Cta";
import Cta2 from "./CtaTow";
import HeroSection1 from "./CardSection";
import LocationBased from "./LocationBased";
import PackageTabs from "./PackageTabs";

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
        {/* <About /> */}
        <Listing />
        <Ads />
        <Process />
        <Testimonial />
        <Blog style={false} />
        <Cta />
      </main>
      <FooterOne />
    </>
  );
};

export default HomeOne;
