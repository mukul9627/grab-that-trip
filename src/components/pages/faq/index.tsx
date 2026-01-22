import BreadCrumb from "@/components/common/BreadCrumb"
import FaqArea from "./FaqArea"
import Cta from "../pricing/Cta"
import HeaderOne from "@/layouts/headers/HeaderOne"
import FooterOne from "@/layouts/footers/FooterOne"

const Faq = () => {
   return (
      <>
         <HeaderOne />
         <main>
            <BreadCrumb title="Frequently Asked Question" sub_title="Faq’s" />
            <FaqArea />
            <Cta />
         </main>
         <FooterOne />
      </>
   )
}

export default Faq
