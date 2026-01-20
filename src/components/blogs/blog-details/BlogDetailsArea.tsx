"use client";
import Image from "next/image";
import Link from "next/link";
import Comment from "./Comment";
import { useParams } from "next/navigation";
// import BlogForm from "@/components/forms/BlogForm";
import BlogSidebar from "../blog-sidebar";
import Faq from "@/components/homes/home-one/faq";
import { useBlogDetails } from "@/hooks/useBlogDetails";

import img_1 from "@/assets/img/blog/sidebar/standard-3.jpg";
import img_2 from "@/assets/img/blog/details/video.jpg";

const BlogDetailsArea = () => {
  const imageBase = process.env.NEXT_PUBLIC_IMAGE_URL;

  const { slug } = useParams<{ slug: string }>();
  console.log("Slug:", slug);
  const { blogDetails, faqData, blogTag, loading, error } = useBlogDetails(
    slug as string
  );

  if (loading) return <p className="text-center">Loading blog...</p>;
  if (error) return <p className="text-danger text-center">{error}</p>;
  if (!blogDetails) return null;
  return (
    <>
      <div className="tg-blog-grid-area pt-130 pb-80">
        <div className="container">
          <div className="row">
            <div className="col-xl-9 col-lg-8 pb-12">
              <div className="tg-blog-details-wrap tg-blog-lg-spacing mr-50 mb-50">
                <div className="tg-blog-standard-item mb-35">
                  <div className="tg-blog-standard-thumb mb-15 main-img-ms">
                    <Image
                      src={`${imageBase}/blog/${blogDetails.banner_image}`}
                      alt={blogDetails.title || "Blog banner image"}
                      width={900}
                      height={475}
                      className="w-100"
                    />
                  </div>
                  {/* Blog Body */}
                  <div className="tg-blog-standard-content">
                    <h1 className="tg-blog-standard-title">
                      {blogDetails.title}
                    </h1>
                    <div
                      className="blog-content"
                      dangerouslySetInnerHTML={{ __html: blogDetails.content }}
                    />
                  </div>
                  {/* End Blog Body */}
                </div>
                <div className="tg-blog-details-tag mb-40 d-flex flex-wrap justify-content-between align-items-center">
                  <div className="tg-blog-sidebar-tag-list d-flex flex-wrap align-items-center">
                    <h5 className="tg-blog-sidebar-title mr-10">Tags:</h5>
                    <ul>
                      {" "}
                      {blogTag.map((Tag, i) => (
                        <li key={i}>
                          {/* <Link href="#">{Tag.tag_name}</Link> */}
                          <span className="tag-name-ms">{Tag.tag_name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="tg-tour-about-review-form tg-blog-details-review-form pb-120 ">
                  <h4 className="tg-tour-about-title mb-10">FAQ</h4>
                  {loading && <p>Loading FAQs...</p>}
                  <Faq data={faqData} showImage={false} />
                </div>
                <br></br>
                <div className="tg-tour-about-cus-review-wrap tg-blog-details-review mb-25">
                  <ul>
                    <li className="mb-40">
                      <div className="tg-tour-about-cus-review d-flex">
                        <div className="tg-tour-about-cus-review-thumb">
                          <Image
                            src={`${imageBase}/profile/${blogDetails.profile_image}`}
                            alt="avatar"
                            width={60}
                            height={60}
                            className="rounded-circle"
                          />
                        </div>
                        <div>
                          <div className="tg-tour-about-cus-name">
                            <span>Author</span>
                            <h6>{blogDetails.author_name}</h6>
                          </div>
                          <p className="text-capitalize lh-28 mb-10">
                            {blogDetails.bio}
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 pb-35">
              <BlogSidebar />
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
      
        /* Only affects blog content inside BlogDetailsArea */

        .tg-blog-details-wrap :global(.blog-content img) {
          margin-bottom: 15px;
        }

        .tg-blog-details-wrap :global(.blog-content p) {
          margin-bottom: 12px;
          text-transform: none;
          text-align: justify;
          line-hieght: 24px;
        }
        .main-img-ms {
          margin-bottom: 32px;
        }
        .tg-blog-standard-title {
          font-weight: 600;
          font-size: 36px;
          line-height: 1.2;
          text-transform: none;
          margin-bottom: 20px;
        }
        .tg-blog-details-wrap :global(.blog-content h4) {
          padding-top: 12px;
          margin-bottom: 12px;
        }
        .tg-blog-details-wrap :global(.blog-content h3) {
          padding-top: 8px;
          margin-bottom: 16px;
        }
        .tg-blog-details-wrap :global(.blog-content h2) {
          padding-top: 8px;
          margin-bottom: 16px;
          font-weight: 600;
          font-size: 28px;
        }
        .tg-blog-details-wrap :global(.blog-content h3) {
          font-weight: 600;
          font-size: 24px;
        }
        .tg-blog-details-wrap :global(.blog-content h4) {
          font-weight: 600;
          font-size: 20px;
        }
        .tg-blog-details-wrap :global(.blog-content ul li) {
          margin-bottom: 6px;
          line-height: 1.6;
          list-style: disc !important;
        }

        .tg-blog-details-wrap :global(.blog-content ul li::marker) {
          // color: #0a6a67;
          color: Black;
          font-size: 1.1em;
        }

        .tg-blog-details-wrap :global(.blog-content img) {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
        }
        .tg-blog-details-wrap :global(.blog-content ul) {
          list-style-type: disc; /* FORCE bullets */
          list-style-position: inside;
          margin-bottom: 12px;
          padding-left: 44px;
        }

        .tg-blog-details-wrap :global(.blog-content ul li) {
          display: list-item;
          unicode-bidi: isolate;
          display: list-item; /* IMPORTANT */
          margin-bottom: 6px;
          line-height: 1.6;
        }

        .tg-blog-sidebar-tag-list ul li .tag-name-ms {
          font-weight: 400;
          font-size: 14px;
          text-transform: capitalize;
          color: var(--tg-theme-primary);
          background: #e6fffe;
          border-radius: 5px;
          padding: 4px 12px;
          display: inline-block;
          margin-bottom: 10px;
          margin-right: 7px;
        }

       /* Table wrapper */
 .tg-blog-details-wrap :global(.blog-content table)  {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #444; /* OUTER BORDER */
  margin: 20px 0;
  font-size: 15px;
}

/* Header cells */
.tg-blog-details-wrap :global(.blog-content table thead th){
  border: 1px solid #444;
  padding: 12px;
  font-weight: 600;
  text-align: left;
  background-color: #f3f3f3;
}

/* Body cells */
.tg-blog-details-wrap :global(.blog-content  table tbody td) {
  border: 1px solid #444; /* CELL BORDERS */
  padding: 12px;
}

/* Optional: first column bold */
.tg-blog-details-wrap :global(.blog-content  table tbody td:first-child) {
  font-weight: 600;
}
.blog-content table,
.blog-content table th,
.blog-content table td {
  border: 1px solid #444 !important;
}


      `}</style>
    </>
  );
};

export default BlogDetailsArea;
