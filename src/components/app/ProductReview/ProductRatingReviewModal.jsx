import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import Modal from "react-modal";
import { RatingIcon } from "../../../assets/export";
import Button from "../../global/Button";
import ReportModal from "../Customer/ReportReasonModal";

export default function ProductRatingReviewModal({
  isOpen,
  setIsOpen,
  selected,
}) {
  const [isReport, setIsReport] = useState(false);

  if (!selected) return null; // Prevent crash before data loads

  return (
    <>
      <Modal
        isOpen={isOpen}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
        className="flex items-center justify-center border-none outline-none z-[1000]"
        overlayClassName="fixed inset-0 bg-[#C6C6C6] bg-opacity-50 backdrop-blur-sm flex justify-center items-center"
      >
        <div className="bg-white rounded-[12px] p-4 px-5 shadow-lg w-[460px]">
          <div className="flex justify-end items-center">
            <IoCloseSharp
              size={22}
              className="cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>

          <div className="px-1">
            <h3 className="text-[24px] font-bold text-[#202224]">
              Rating & Reviews
            </h3>

            {/* Product Info */}
            <div className="mt-4 flex items-center gap-3">
              <div className="bg-[#F2FBF7] flex items-center justify-center rounded-[8px] w-[114px] h-[114px]">
                <img
                  src={selected?.productRecord?.images?.[0]}
                  className="w-[91px] h-[91px] object-cover rounded"
                  alt=""
                />
              </div>

              <div>
                <h4 className="font-[600] text-[18px] text-[#202224]">
                  {selected?.productRecord?.name}
                </h4>

                <div className="flex items-center gap-3 mt-3">
                  <div className="border-r pr-10 border-[#EEEEEE]">
                    <p className="text-[#181818] text-[14px] font-[500]">
                      Category
                    </p>
                    <span className="text-[#959393] text-nowrap text-[14px] font-[400]">
                      {selected?.productRecord?.category}
                    </span>
                  </div>

                  <div>
                    <p className="text-[#181818] text-[14px] font-[500]">
                      Sub Category
                    </p>
                    <span className="text-[#959393] text-nowrap text-[14px] font-[400]">
                      {selected?.productRecord?.subCategory}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* User + Date + Rating */}
            <div className="border-b flex items-center gap-2 justify-between py-4 mt-4 border-t border-[#F1F1F1]">
              <div className="border-r w-full border-[#F1F1F1]">
                <p className="text-[#959393] text-[16px] font-[400] mb-2">
                  Posted By
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={selected?.userRecord?.profilePicture}
                    className="w-[31px] h-[31px] rounded-full border-[#22B573] p-[1px] border"
                    alt=""
                  />
                  <span className="text-[#000000] text-[16px] font-[400]">
                    {selected?.userRecord?.name}
                  </span>
                </div>
              </div>

              <div className="border-r w-full border-[#F1F1F1]">
                <p className="text-[#959393] text-[16px] font-[400] mb-2">
                  Posted Date
                </p>
                <span className="text-[#000000] text-[16px] font-[400]">
                  {new Date(selected?.createdAt).toLocaleDateString("en-GB")}
                </span>
              </div>

              <div className="w-full">
                <p className="text-[#959393] text-[16px] font-[400] mb-2">
                  Ratings
                </p>
                <span className="text-[#000000] text-[16px] font-[400] flex items-center">
                  <img
                    src={RatingIcon}
                    className="w-[16px] h-[15px]"
                    alt="rating-icon"
                  />{" "}
                  {selected?.rating}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-[#959393] text-[16px] font-[400] mb-2">
                Description
              </p>
              <p className="text-[#000000] text-[16px] font-[400] mb-3">
                {selected?.productRecord?.description}
              </p>
            </div>

            <Button
              text="Report Review"
              onClick={() => {
                setIsReport(true);
                setIsOpen(false);
              }}
              customClass="w-[395px] mb-2"
            />
          </div>
        </div>
      </Modal>

      <ReportModal
        reviewId={selected?._id}
        isOpen={isReport}
        setIsOpen={setIsReport}
      />
    </>
  );
}
