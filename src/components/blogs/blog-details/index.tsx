import BreadCrumb from "@/components/common/BreadCrumb"
import HeaderThree from "@/layouts/headers/HeaderThree"
import BlogDetailsArea from "./BlogDetailsArea"
import FooterFive from "@/layouts/footers/FooterFive"
import HeaderOne from "@/layouts/headers/HeaderOne"
import FooterOne from "@/layouts/footers/FooterOne"

const BlogDetails = () => {
  return (
    <>
      <HeaderOne />
      <main>
        <BreadCrumb title="Blog" sub_title="Blog" />
        <BlogDetailsArea />
      </main>
      <FooterOne />
    </>
  )
}

export default BlogDetails
