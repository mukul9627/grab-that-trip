import BreadCrumb from "@/components/common/BreadCrumb"
import HeaderOne from "@/layouts/headers/HeaderOne"
import FooterOne from "@/layouts/footers/FooterOne"
import Support from "@/components/pages/support/supportpolicy"

const Supportp = () => {
   return (
      <>
         <HeaderOne />
         <main>
            <BreadCrumb title="Support Policy" sub_title="Support Policy" />
            <Support />
         </main>
         <FooterOne />
      </>
   )
}

export default Supportp
