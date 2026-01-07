"use client";
import { useState } from "react";

type Review = {
  review_id: number;
  package_id: number;
  user_id: string;
  review_title: string;
  review_text: string;
  rating_overall: number;
  rating_service: number;
  rating_comfort: number;
  rating_value_for_money: number;
  is_verified_booking: boolean;
  is_approved: boolean;
  created_at: string;
};

type ReviewDetailsProps = {
  reviews: Review[];
};

const ReviewDetails = ({ reviews }: ReviewDetailsProps) => {
  const [openReviewId, setOpenReviewId] = useState<number | null>(null);

  const toggleReview = (id: number) => {
    setOpenReviewId((prev) => (prev === id ? null : id));
  };

  const ratingToPercent = (rating: number) => `${(rating / 5) * 100}%`;

  /* ⭐ STAR RENDER FUNCTION */
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <>
        {/* Full */}
        {[...Array(fullStars)].map((_, i) => (
          <i
            key={`full-${i}`}
            className="fa-sharp fa-solid fa-star"
            style={{ color: "#FFA500" }}
          ></i>
        ))}

        {/* Half */}
        {hasHalfStar && (
          <i
            className="fa-sharp fa-solid fa-star-half-stroke"
            style={{ color: "#FFA500" }}
          ></i>
        )}

        {/* Empty */}
        {[...Array(emptyStars)].map((_, i) => (
          <i
            key={`empty-${i}`}
            className="fa-sharp fa-regular fa-star"
            style={{ color: "#ccc" }}
          ></i>
        ))}
      </>
    );
  };

  if (!reviews || reviews.length === 0) {
    return <p>No reviews available.</p>;
  }

  return (
    <div className="tg-tour-about-cus-review-wrap mb-25">
      <h4 className="tg-tour-about-title mb-40">{reviews.length} Reviews</h4>

      <ul>
        {reviews.map((review) => {
          const isOpen = openReviewId === review.review_id;

          return (
            <li key={review.review_id}>
              <div className="tg-tour-about-cus-review d-flex mb-40">
                <div className="tg-tour-about-cus-review-thumb tg-tour-about-cus-review-thumb-ms">
                <span>{review.user_id?.charAt(0).toUpperCase()}</span>
                {/* <span>{review.user_id}</span> */}
                </div>

                <div>
                  <div className="tg-tour-about-cus-name mb-5 d-flex align-items-center justify-content-between flex-wrap">
                    {/* TITLE + DATE */}
                    <h6 className="mr-10 mb-10 d-inline-block">
                      {review.review_title}{" "}
                      <span style={{ fontSize: "12px" }}>
                        {new Date(review.created_at).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}{" "}
                        ·{" "}
                        {new Date(review.created_at).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          }
                        )}
                      </span>
                    </h6>

                    {/* ⭐ DYNAMIC STARS */}
                    <span className="tg-tour-about-cus-review-star mb-10 d-inline-block">
                      {renderStars(review.rating_overall)}
                    </span>

                    {/* REVIEW TEXT */}
                    <p className="text-capitalize lh-28 mb-20">
                      {review.review_text}
                    </p>

                    {/* ACCORDION */}
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className={`accordion-button ${
                            isOpen ? "" : "collapsed"
                          }`}
                          onClick={() => toggleReview(review.review_id)}
                          type="button"
                        >
                          Rating Details
                        </button>
                      </h2>

                      <div
                        className={`accordion-collapse collapse ${
                          isOpen ? "show" : ""
                        }`}
                      >
                        <div className="accordion-body Review-according-ms">
                          <div className="tg-tour-about-review">
                            <div className="head-reviews">
                              {/* LEFT */}
                              <div className="review-left">
                                <div className="review-info-inner">
                                  <h2>{review.rating_overall.toFixed(1)}</h2>
                                  <span>Excellent</span>
                                  <p>Based On {reviews.length} Reviews</p>
                                </div>
                              </div>

                              {/* RIGHT */}
                              <div className="review-right">
                                <div className="review-progress">
                                  {[
                                    {
                                      name: "Service",
                                      rating: review.rating_service,
                                    },
                                    {
                                      name: "Comfort",
                                      rating: review.rating_comfort,
                                    },
                                    {
                                      name: "Value for Money",
                                      rating: review.rating_value_for_money,
                                    },
                                  ].map((item, i) => (
                                    <div
                                      key={i}
                                      className="item-review-progress"
                                    >
                                      <div className="text-rv-progress">
                                        <p>{item.name}</p>
                                      </div>

                                      <div className="bar-rv-progress">
                                        <div className="progress">
                                          <div
                                            className="progress-bar"
                                            style={{
                                              width: ratingToPercent(
                                                item.rating
                                              ),
                                            }}
                                          />
                                        </div>
                                      </div>

                                      <div className="text-avarage">
                                        <p>{item.rating.toFixed(1)}/5</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* END ACCORDION */}
                  </div>
                </div>
              </div>

              <div className="tg-tour-about-border mb-40"></div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ReviewDetails;
