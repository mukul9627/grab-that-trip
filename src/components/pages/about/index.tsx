import BreadCrumb from "@/components/common/BreadCrumb"
import FooterSix from "@/layouts/footers/FooterSix"
import AboutArea from "./AboutArea"
import Choose from "./Choose"
// import Cta from "./Cta"
import Vision from "./VisionArea"
import HeaderOne from "@/layouts/headers/HeaderOne"
import FooterOne from "@/layouts/footers/FooterOne"

const About = () => {
   return (
      <>
         <HeaderOne />
         <main>
            <BreadCrumb title="About Us" sub_title="About Us" />
            <AboutArea />
            <Choose />
            {/* <Cta /> */}
            <Vision />
         </main>
         <FooterOne />
      </>
   )
}

export default About
