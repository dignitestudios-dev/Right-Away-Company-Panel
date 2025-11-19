import React from "react";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router";
import ProductReviewsData from "../../components/app/ProductReview/ProductReviewsData";

export default function ProductReviews() {
  return (
    <div>
      <ProductReviewsData />
    </div>
  );
}
