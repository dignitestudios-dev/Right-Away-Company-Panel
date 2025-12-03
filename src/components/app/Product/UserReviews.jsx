import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Button from "../../global/Button";
import ReplyReviewModal from "./ReplyReviewModal";
import { useDispatch, useSelector } from "react-redux";
import { getProductReviewByID } from "../../../redux/slices/AppSlice";
import { ReplyComment } from "../../../assets/export";

const ReviewsSection = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);

  const dispatch = useDispatch();
  const { SingleProductReview, isLoading } = useSelector((state) => state.app);
  const { company } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProductReviewByID(id));
  }, [id, dispatch]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-[#FFFFFF] rounded-2xl shadow-sm border-[0.3px] border-gray-200 p-6 mt-10 mx-auto font-inter">
      <h2 className="text-[18px] font-semibold text-[#181818] mb-6">
        Reviews{" "}
        <span className="text-[#5C5C5C] text-[13px] font-[400]">
          ({SingleProductReview?.length || 0})
        </span>
      </h2>

      {isLoading && <p>Loading reviews...</p>}

      {!isLoading && SingleProductReview?.length === 0 && (
        <p className="text-gray-500 text-sm">No reviews yet.</p>
      )}

      <div className="space-y-6">
        {SingleProductReview?.map((review) => (
          <div
            key={review._id}
            className="border-b border-gray-200 pb-6 last:border-none"
          >
            <div className="flex items-center space-x-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`${
                    i < review.rating ? "text-yellow-400" : "text-gray-300"
                  } text-lg`}
                />
              ))}
            </div>

            <div className="flex justify-between gap-4 items-start ">
              <p className="text-[#181818] text-[12px] font-[400] leading-relaxed">
                {review.reviews}
              </p>

              {!review.reply && (
                <Button
                  onClick={() => {
                    setSelectedReviewId(review._id);
                    setIsOpen(true);
                  }}
                  text={"Write a Reply"}
                  customClass={
                    "w-[120px] !text-[14px] !font-[400] !rounded-[15px]"
                  }
                />
              )}
            </div>

            <div className="flex justify-between items-center">
              <div className="flex relative items-center space-x-3">
                <img
                  src={review.user?.profilePicture}
                  alt={review.user?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />

                {review.reply && (
                  <img
                    src={ReplyComment}
                    className="absolute top-11 left-2 w-[12px]"
                    alt="ReplyComment"
                  />
                )}

                <div className="flex items-center gap-2">
                  <p className="font-medium text-[12px] text-[#181818]">
                    {review.user?.name}
                  </p>
                  <p className="text-[#838383] text-[12px] font-[400]">
                    {formatDate(review.createdAt)}
                  </p>
                </div>
              </div> 
            </div>

            {review.reply && (
              <div className="mt-2 ml-8 pl-4">
                <p className="text-[#181818] text-[12px] w-[260px] font-[400] mb-2">
                  {review.reply}
                </p>
                <p className="text-[#181818] flex items-center mt-2 gap-2 text-[12px] font-medium">
                  <img
                    src={company?.profilePicture}
                    alt="reply-user"
                    className="w-10 h-10 rounded-full object-cover"
                  />{" "}
                  Replied By You
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      <ReplyReviewModal
        apiCallOnReplye={() => dispatch(getProductReviewByID(id))}
        reviewId={selectedReviewId}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
};

export default ReviewsSection;
