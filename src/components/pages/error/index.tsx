
import ErrorArea from "./ErrorArea"
import FooterFive from "@/layouts/footers/FooterFive"
import BreadCrumb from "@/components/common/BreadCrumb"
import HeaderOne from "@/layouts/headers/HeaderOne"
import FooterOne from "@/layouts/footers/FooterOne"

const NotFound = () => {
  return (
    <>
      <HeaderOne />
      <main>
        <BreadCrumb title="404 Error Page" sub_title="404" />
        <ErrorArea />
      </main>
      <FooterOne />
    </>
  )
}

export default NotFound
