import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaReply } from "react-icons/fa";
import { ReplyComment } from "../../../assets/export";
import Button from "../../global/Button";
import ReplyReviewModal from "./ReplyReviewModal";

const ReviewsSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const reviews = [
    {
      id: 1,
      name: "Jason Cruz",
      date: "27 April, 2024",
      rating: 4,
      comment:
        "Amazing product. I booked on Monday and I got my order on the next day. I’m highly impressed with their services. Highly recommended. Amazing product. I booked on Monday and I got my order on the next day. I’m highly impressed with their services. Highly recommended!!",
      reply:
        "Amazing product. I’m highly impressed with their services. Highly recommended!",
    },
    {
      id: 2,
      name: "Jason Cruz",
      date: "27 April, 2024",
      rating: 4,
      comment:
        "Amazing product. I booked on Monday and I got my order on the next day. I’m highly impressed with their services. Highly recommended. Amazing product. I booked on Monday and I got my order on the next day. I’m highly impressed with their services. Highly recommended!!",
    },
    {
      id: 3,
      name: "Jason Cruz",
      date: "27 April, 2024",
      rating: 4,
      comment:
        "Amazing product. I booked on Monday and I got my order on the next day. I’m highly impressed with their services. Highly recommended. Amazing product. I booked on Monday and I got my order on the next day. I’m highly impressed with their services. Highly recommended!!",
    },
    {
      id: 4,
      name: "Jason Cruz",
      date: "27 April, 2024",
      rating: 4,
      comment:
        "Amazing product. I booked on Monday and I got my order on the next day. I’m highly impressed with their services. Highly recommended. Amazing product. I booked on Monday and I got my order on the next day. I’m highly impressed with their services. Highly recommended!!",
    },
  ];

  return (
    <div className="bg-[#FFFFFF] rounded-2xl shadow-sm border-[0.3px] border-gray-200  p-6 mt-10 mx-auto font-inter">
      {/* Header */}
      <h2 className="text-[18px] font-semibold text-[#181818] mb-6">
        Reviews{" "}
        <span className="text-[#5C5C5C] text-[13px] font-[400]">(56)</span>
      </h2>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border-b border-gray-200 pb-6 last:border-none"
          >
            {/* Stars */}
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

            {/* Comment */}
            <div className="flex justify-between gap-4 items-baseline mb-5">
              <p className="text-[#181818] text-[12px] font-[400] leading-relaxed ">
                {review.comment}
              </p>

              {!review.reply && (
                <Button
                  onClick={() => setIsOpen(!isOpen)}
                  text={"Write a Reply"}
                  customClass={
                    "w-[120px] !text-[14px] !font-[400] !rounded-[15px] "
                  }
                />
              )}
            </div>
            {/* User Info + Button */}
            <div className="flex justify-between items-center">
              <div className="flex relative items-center space-x-3">
                <img
                  src="https://i.pravatar.cc/40?img=1"
                  alt={review.name}
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
                    {review.name}
                  </p>
                  <p className="text-[#838383]  text-[12px] font-[400]">
                    {review.date}
                  </p>
                </div>
              </div>
            </div>

            {/* Reply Section */}
            {review.reply && (
              <div className="mt-2 ml-8 pl-4">
                <p className="text-[#181818] text-[12px] w-[260px] font-[400]  mb-2">
                  {review.reply}
                </p>
                <p className="text-[#181818] flex items-center mt-2 gap-2 text-[12px] font-medium">
                  <img
                    src="https://i.pravatar.cc/40?img=1"
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />{" "}
                  Replied By You
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      <ReplyReviewModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default ReviewsSection;
