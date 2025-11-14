import React, { useEffect, useState } from "react";
import { RatingIcon } from "../../../assets/export";
import GlobalTable from "../../global/Table";
import Pagination from "../../global/Pagination";
import ProductRatingReviewModal from "./ProductRatingReviewModal";
import { useDispatch, useSelector } from "react-redux";
import { getProductReview } from "../../../redux/slices/AppSlice";

export default function ProductReviewsData() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { ProductReview } = useSelector((state) => state?.app);

  const columns = [
    "Customer Name",
    "Product",
    "Description",
    "Rating",
    "Date",
    "Action",
  ];

  // Fetch Product Reviews
  const fetchProductReview = async () => {
    await dispatch(getProductReview()).unwrap();
  };

  useEffect(() => {
    fetchProductReview();
  }, []);

  // ✅ Format the reviews for GlobalTable
  const data =
    ProductReview?.map((item, index) => ({
      _id: item._id,
      cells: [
        // 🧍 Customer Name + Avatar
        <div key={`user-${index}`} className="flex items-center gap-3">
          <img
            src={item?.userRecord?.profilePicture}
            alt={item?.userRecord?.name}
            className="w-10 h-10 rounded-full border border-[#00C49A] object-cover"
          />
          <p className="font-medium text-[14px]">
            {item?.userRecord?.name || "N/A"}
          </p>
        </div>,

        // 🛒 Product Name + Image
        <div key={`product-${index}`} className="flex items-center gap-3">
          <img
            src={item?.productRecord?.images?.[0]}
            alt={item?.productRecord?.name}
            className="w-10 h-10 rounded object-cover"
          />
          <p className="text-[14px] text-[#181818]">
            {item?.productRecord?.name || "N/A"}
          </p>
        </div>,

        // 📝 Description
        <p
          key={`desc-${index}`}
          className="text-[#181818] text-[14px] font-[400]"
        >
          {item?.productRecord?.description || "No description"}
        </p>,

        // ⭐ Rating
        <div key={`rating-${index}`} className="flex items-center gap-1">
          <img src={RatingIcon} alt="rating" className="w-[16px] h-[15px]" />
          <p className="text-[#181818] text-[14px] font-[400]">
            {item?.rating || 0}
          </p>
        </div>,

        // 📅 Date
        <p
          key={`date-${index}`}
          className="text-[#181818] text-[14px] font-[400]"
        >
          {new Date(item?.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>,

        // 🔍 Action
        <button
          key={`action-${index}`}
          onClick={() => setIsOpen(true)}
          className="text-[#00C49A] font-[500] border-b border-[#00C49A]"
        >
          View Details
        </button>,
      ],
    })) || [];

  return (
    <>
      <div className="mt-4 rounded-2xl shadow-sm border-t p-2 border-[#B9B9B9] bg-[#FFFFFF]">
        <GlobalTable data={data} columns={columns} />
      </div>
      <Pagination />
      <ProductRatingReviewModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
