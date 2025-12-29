import BreadCrumb from "@/components/common/BreadCrumb"
import HeaderOne from "@/layouts/headers/HeaderOne"
import FooterOne from "@/layouts/footers/FooterOne"
import PrivacyPolicy from "@/components/pages/policy/privacyPolicy"

const Policy = () => {
   return (
      <>
         <HeaderOne />
         <main>
            <BreadCrumb title="Privacy Policy" sub_title="Privacy Policy" />
            <PrivacyPolicy />
         </main>
         <FooterOne />
      </>
   )
}

export default Policy
