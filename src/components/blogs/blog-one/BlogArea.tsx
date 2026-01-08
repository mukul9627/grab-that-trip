"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import BlogSidebar from "../blog-sidebar";
import Button from "@/components/common/Button";
import { useBlogDetails } from "@/hooks/useBlogDetails";

const ITEMS_PER_PAGE = 8;


const BlogArea = () => {
  const { blogList = [], loading, error } = useBlogDetails();

  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + ITEMS_PER_PAGE;
  const currentItems = blogList.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(blogList.length / ITEMS_PER_PAGE);

  const imageBase = process.env.NEXT_PUBLIC_IMAGE_URL;

  const handlePageClick = (event: { selected: number }) => {
    setItemOffset(event.selected * ITEMS_PER_PAGE);
  };

  if (loading) return <p className="text-center">Loading blogs...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;
  if (!blogList.length)
    return <p className="text-center">No blogs found</p>;

  return (
    <div className="tg-blog-grid-area pt-130 pb-100">
      <div className="container">
        <div className="row">
          <div className="col-xl-9 col-lg-8">
            <div className="tg-blog-grid-wrap mr-50">
              <div className="row">
                {currentItems.map((item) => (
                  <div
                    key={item.blog_id}
                    className="col-xl-6 col-lg-12 col-md-6"
                  >
                    <div className="tg-blog-grid-item mb-30">
                      <Link href={`/blog-details/${item.slug}`}>
                        <Image
                          src={`${imageBase}/blog/${item.featured_image}`}
                        //   src={`${imageBase}/package/bg/${item.bg_image}`}
                          alt={item.title}
                          width={400}
                          height={250}
                          className="w-100"
                        />
                      </Link>
{item.slug}
                      <h2 className="tg-blog-standard-title mt-15">
                        <Link href={`/blog-details/${item.slug}`}>
                          {item.title}
                        </Link>
                      </h2>

                      <p>{item.short_description}</p>

                      <Link
                        href={`/blog-details/${item.slug}`}
                        className="tg-btn"
                      >
                        <Button text="Read More" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
                <div className="tg-pagenation-wrap text-center mt-50 mb-30">
                      <nav>
                         <ReactPaginate
                          breakLabel="..."
                          nextLabel={<i className="p-btn">Next Page</i>}
                          previousLabel={<i className="p-btn">Previous Page</i>}
                          onPageChange={handlePageClick}
                          pageRangeDisplayed={3}
                          pageCount={pageCount}
                        />
                      </nav>
                      </div>

              {/* <ReactPaginate
                pageCount={pageCount}
                onPageChange={handlePageClick}
                nextLabel="Next"
                previousLabel="Prev"
              /> */}
            </div>
          </div>

          <div className="col-xl-3 col-lg-4">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogArea;
