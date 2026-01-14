import FooterOne from "@/layouts/footers/FooterOne";
import FeatureDetailsArea from "./FeatureDetailsArea";
import HeaderOne from "@/layouts/headers/HeaderOne";

interface FeatureDetailsOneProps {
  slug: string;
}

const FeatureDetailsOne = ({ slug }: FeatureDetailsOneProps) => {
  return (
    <>
      <HeaderOne />
      <main>
        <FeatureDetailsArea slug={slug} />
      </main>
      <FooterOne />
    </>
  );
};

export default FeatureDetailsOne;
