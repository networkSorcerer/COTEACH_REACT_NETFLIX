import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMovieReviewQuery } from "../../../../hooks/useMovieReviews";

const Reviews = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useMovieReviewQuery(id);
  const [viewAll, setViewAll] = useState(false);
  console.log("vvvv", data);
  if (isLoading)
    return <div className="text-center text-light mt-5">Loading...</div>;
  if (isError)
    return (
      <div className="text-center text-danger mt-5">Error: {error.message}</div>
    );

  const reviews = data?.results || [];

  if (reviews.length === 0)
    return <div className="text-center text-light mt-5">No reviews found.</div>;

  const displayedReviews = viewAll ? reviews : [reviews[0]];

  return (
    <div className="text-light mt-4">
      <h4 className="mb-3 border-bottom pb-2">User Reviews</h4>

      {displayedReviews.map((review, index) => (
        <div
          key={index}
          className="mb-4 p-3 rounded"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <p className="fw-bold mb-1">
            <i className="bi bi-person-circle me-2"></i>
            {review.author}
          </p>
          <p
            style={{
              whiteSpace: "pre-wrap",
              lineHeight: "1.6",
              opacity: 0.9,
            }}
          >
            {review.content.length > 600 && !viewAll
              ? review.content.slice(0, 600) + "..."
              : review.content}
          </p>
        </div>
      ))}

      {/* Toggle button */}
      {reviews.length > 1 && (
        <div className="text-center">
          <button
            className="btn btn-outline-light btn-sm mt-2"
            onClick={() => setViewAll((prev) => !prev)}
          >
            {viewAll ? "리뷰 접기" : `리뷰 전체 보기 (${reviews.length})`}
          </button>
        </div>
      )}
    </div>
  );
};

export default Reviews;
