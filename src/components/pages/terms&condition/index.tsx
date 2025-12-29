import BreadCrumb from "@/components/common/BreadCrumb"
import HeaderOne from "@/layouts/headers/HeaderOne"
import FooterOne from "@/layouts/footers/FooterOne"
import TearmArea from "@/components/pages/terms&condition/tearmArea"

const About = () => {
   return (
      <>
         <HeaderOne />
         <main>
            <BreadCrumb title="Terms & Condition" sub_title="Terms & Condition" />
            <TearmArea />
         </main>
         <FooterOne />
      </>
   )
}

export default About
