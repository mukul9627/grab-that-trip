import BreadCrumb from "@/components/common/BreadCrumb"
import HeaderOne from "@/layouts/headers/HeaderOne"
import FooterOne from "@/layouts/footers/FooterOne"
import Bewareoffra from "@/components/pages/beware/bewareoffra"

const Beware = () => {
   return (
      <>
         <HeaderOne />
         <main>
            <BreadCrumb title="Beware of Frauds" sub_title="Beware of Frauds" />
            <Bewareoffra />
         </main>
         <FooterOne />
      </>
   )
}

export default Beware
