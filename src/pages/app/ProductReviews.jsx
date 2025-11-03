import React from "react";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router";
import Filter from "../../components/global/Filter";
import ProductReviewsData from "../../components/app/ProductReview/ProductReviewsData";

export default function ProductReviews() {
  const navigate = useNavigate("");
  return (
    <div>
      <div className="flex justify-between ">
        <h3 className="font-[600] text-[32px] flex items-center gap-2">
          {" "}
          <GoArrowLeft
            onClick={() => navigate(-1)}
            className="text-[#03958A] cursor-pointer "
            size={21}
          />{" "}
          Product Reviews
        </h3>
        <div className="flex items-center gap-4">
          <Filter hide={true} />
        </div>
      </div>
      <ProductReviewsData />
    </div>
  );
}
