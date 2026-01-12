"use client";
import Image from "next/image"
import Link from "next/link"
import { useBlogDetails } from "@/hooks/useBlogDetails";





const Blog = () => {
    const { blogRecentPostThree = [], loading, error } = useBlogDetails();
      const imageBase = process.env.NEXT_PUBLIC_IMAGE_URL;

      const getReadingTime = (html: string) => {
  const text = html.replace(/<[^>]+>/g, ""); // remove HTML tags
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} mins Read`;
};
   return (
      <div className="tg-blog-area pt-135 pb-170">
         <div className="container">
            <div className="row">
               <div className="col-lg-12">
                  <div className="tg-location-section-title text-center mb-30">
                     <h5 className="tg-section-subtitle mb-15 wow fadeInUp" data-wow-delay=".3s" data-wow-duration=".9s">Blog And Article</h5>
                     <h2 className="mb-15 text-capitalize wow fadeInUp" data-wow-delay=".4s" data-wow-duration=".9s">Latest News & Articles</h2>
                     <p className="text-capitalize wow fadeInUp" data-wow-delay=".5s" data-wow-duration=".9s">Are you tired of the typical tourist destinations and<br /> looking
                        to step out of your comfort zonetravel</p>
                  </div>
               </div>

              {blogRecentPostThree.length > 0 && (
  <div className="col-lg-5 wow fadeInLeft" data-wow-delay=".4s" data-wow-duration=".9s">
    <div className="tg-blog-item mb-2">
      <div className="tg-blog-thumb fix">
        {/* Example image */}
        <Link href={`/blog-details/${blogRecentPostThree[0].slug}`}>
          <Image
            src={`${imageBase}/blog/${blogRecentPostThree[0].featured_image}`}
            alt={blogRecentPostThree[0].title}
            width={600}
            height={320}
            className="w-100"
          />
        </Link>
      </div>
      <div className="tg-blog-content p-relative">
        <span className="tg-blog-tag p-absolute">Latest</span>

        <h3 className="tg-blog-title">
           <Link href={`/blog-details/${blogRecentPostThree[0].slug}`}>
            {blogRecentPostThree[0].title}
          </Link>
        </h3>

        <div className="tg-blog-date">
          <span className="mr-20">
            <i className="fa-light fa-calendar"></i>
            {new Date(blogRecentPostThree[0].created_at).toISOString().split("T")[0]}
          </span>

          <span>
            <i className="fa-regular fa-clock"></i>
            {getReadingTime(blogRecentPostThree[0].content)}
          </span>
        </div>
      </div>
    </div>
  </div>
)}


              <div className="col-lg-7">
  <div className="row">
    {blogRecentPostThree.slice(1).map((item) => (
      <div
        key={item.blog_id}
        className="col-12 wow fadeInRight"
        data-wow-delay=".4s"
        data-wow-duration=".9s"
      >
        <div className="tg-blog-item mb-20">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <div className="tg-blog-thumb fix">
                <Link href={`/blog-details/${item.slug}`}>
                  <Image
                    src={`${imageBase}/blog/${item.featured_image}`}
                    alt={item.title}
                    width={300}
                    height={200}
                    className="w-100"
                  />
                </Link>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="tg-blog-contents">
                <h3 className="tg-blog-title title-2 mb-0">
                <Link href={`/blog-details/${item.slug}`}>
                    {item.title}
                  </Link>
                </h3>

                <div className="tg-blog-date">
                  <span className="mr-20">
                    <i className="fa-light fa-calendar"></i>
                    {new Date(item.created_at).toISOString().split("T")[0]}
                  </span>

                  <span>
                    <i className="fa-regular fa-clock"></i>
                    {getReadingTime(item.content)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>


               <div className="col-lg-12 text-center">
                    <p className="text-capitalize wow fadeInUp" data-wow-delay=".5s" data-wow-duration=".9s">Want to see our recent News & Updates. 

                     <Link href="/blog-grid" className="hover:text-blue-500"> <strong style={{color: "#0a6a67"}}>Click Here to View More</strong></Link>
                    </p>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Blog
