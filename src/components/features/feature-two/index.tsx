import HeaderOne from "@/layouts/headers/HeaderOne";
import FeatureArea from "./FeatureArea"
import BreadCrumb from "./BreadCrumb"
import BannerForm from "./BannerForm"

const FeatureTwo = () => {
   return (
      <>
         <HeaderOne />
         <main>
            <BreadCrumb />
            {/* <BannerForm /> */}
            <FeatureArea />
         </main>
      </>
   )
}

export default FeatureTwo
