/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import FeatureTop from "./FeatureTop";
import FeatureSidebar from "./FeatureSidebar";
// import BookingModal from "@/components/homes/home-one/BookingModal";
import {
  useDestinationsList,
  Destination,
} from "@/hooks/UseDestination";

export default function FeatureArea() {
  /** ================= API ================= */
  const { destinationsList, loading, error } = useDestinationsList();

  console.log("API DATA 👉", destinationsList);

  /** ================= STATE ================= */
  const [filteredData, setFilteredData] = useState<Destination[]>([]);
  // const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState<Destination | null>(null);
  const [isListView, setIsListView] = useState(false);

  /** ================= PAGINATION ================= */
  const itemsPerPage = 9;
  const [itemOffset, setItemOffset] = useState(0);

  const currentItems = filteredData.slice(
    itemOffset,
    itemOffset + itemsPerPage
  );

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const startOffset = itemOffset + 1;
  const endOffset = Math.min(itemOffset + itemsPerPage, filteredData.length);

  /** ================= EFFECT ================= */
  useEffect(() => {
    if (Array.isArray(destinationsList)) {
      setFilteredData(destinationsList);
      setItemOffset(0);
    }
  }, [destinationsList]);

  /** ================= HANDLERS ================= */
  const handlePageClick = ({ selected }: { selected: number }) => {
    setItemOffset(selected * itemsPerPage);
  };

  const imgBase = process.env.NEXT_PUBLIC_IMAGE_URL || "";

  /** ================= UI ================= */
  return (
    <>
      {/* {openModal && selected && (
        <BookingModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          package_id={selected.feature_id}
          package_name={selected.name}
          base_price={0}
          offer_price={0}
        />
      )} */}

      <div className="tg-listing-grid-area mt-85 mb-85">
        <div className="container">
          <div className="row" style={{justifyContent: 'center'}}>
            {/* SIDEBAR */}
            <FeatureSidebar
              fullData={destinationsList}
              setProducts={setFilteredData}
              resetPage={() => setItemOffset(0)}
            />

            {/* CONTENT */}
            <div className="col-xl-9 col-lg-8">
              <FeatureTop
                startOffset={startOffset}
                endOffset={endOffset}
                totalItems={filteredData.length}
                setProducts={() => {}}
                isListView={isListView}
                handleListViewClick={() => setIsListView(true)}
                handleGridViewClick={() => setIsListView(false)}
              />

              {/* LOADING */}
              {loading && (
                <div className="text-center py-5 fs-5">Loading...</div>
              )}

              {/* ERROR */}
              {error && (
                <div className="text-center py-5 text-danger">{error}</div>
              )}

              {/* NO DATA */}
              {!loading && filteredData.length === 0 && (
                <div className="text-center py-5 fs-5">
                  No activities found.
                </div>
              )}

              {/* DATA */}
              {!loading && filteredData.length > 0 && (
                <>
                  <div className={`row ${isListView ? "list-card-open" : ""}`}>
                    {currentItems.map((item) => (
                      <div
                        key={item.destination_id}
                        className="col-xxl-4 col-xl-6 col-lg-6 col-md-6"
                      >
                        <div className="tg-listing-card-item mb-30" style={{boxShadow: '0 0 9px 7px lightgray'}}>
                         <Link href={`/holidays/${item.slug}`}>  <div className="tg-listing-card-thumb">
                           
                              <Image
                                src={`${imgBase}/bg/${item.hero_image_url}`}
                                alt={item.name}
                                width={300}
                                height={240}
                                className="w-100"
                              />
                           
                          </div> </Link>

                          <div className="tg-listing-main-content" style={{padding: '17px'}}>
                            <h4 className="mb-1 ml-12 tg-location-time" style={{position: "relative", left: '4rem',top: '-19px' ,fontSize: '22px'}}>
                              <Link href={`/holidays/${item.slug}`}>
                                {item.name}
                              </Link>
                            </h4>

                            <h4 className="tg-listing-card-title mb-0" style={{textAlign: 'center', fontWeight: '500'}}>
                              {item.short_description}
                            </h4>

                            {/* <button
                              className="btn btn-primary w-100"
                              onClick={() => {
                                setSelected(item);
                                setOpenModal(true);
                              }}
                            >
                              View Details
                            </button> */}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>


  {!loading && filteredData.length > 0 && (
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
                  )}
                  {/* PAGINATION */}
                  {/* <div className="tg-pagenation-wrap text-center mt-40">
                    <ReactPaginate
                      breakLabel="..."
                      nextLabel="Next"
                      previousLabel="Prev"
                      pageRangeDisplayed={3}
                      pageCount={pageCount}
                      onPageChange={handlePageClick}
                    />
                  </div> */}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
