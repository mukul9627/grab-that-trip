import Breadcrumb from "./Breadcrumb";
import FeatureDetailsArea from "./FeatureDetailsArea";
import FooterSix from "@/layouts/footers/FooterSix";
import HeaderOne from "@/layouts/headers/HeaderOne";

const FeatureDetailsOne = () => {
  return (
    <>
      <HeaderOne />
      <main>
        <Breadcrumb />
        <FeatureDetailsArea />
      </main>
      <FooterSix />
    </>
  );
};

export default FeatureDetailsOne;
