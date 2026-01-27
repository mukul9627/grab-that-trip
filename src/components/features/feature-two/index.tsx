import HeaderOne from "@/layouts/headers/HeaderOne";
import FeatureArea from "./FeatureArea"
import BreadCrumb from "./BreadCrumb"
import BannerForm from "./BannerForm"

interface FeatureTwoProps {
  slug: string;
  bannerImage: string;
}

const FeatureTwo = ({ slug, bannerImage }: FeatureTwoProps) => {
   return (
      <>
         <HeaderOne />
         <main>
             <BreadCrumb bannerImage={bannerImage} />
            {/* <BannerForm /> */}
            <FeatureArea slug={slug} />
         </main>
      </>
   )
}

export default FeatureTwo
