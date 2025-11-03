import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import Modal from "react-modal";
import { LargeImageMilk, Person1, RatingIcon } from "../../../assets/export";
import Button from "../../global/Button";
import ReportModal from "../Customer/ReportReasonModal";
export default function ProductRatingReviewModal({ isOpen, setIsOpen }) {
  const [isReport, setIsReport] = useState(false);
  return (
    <>
      <Modal
        isOpen={isOpen}
        contentLabel="Page Not Found"
        shouldCloseOnOverlayClick={false} // Prevent closing by clicking outside
        shouldCloseOnEsc={false}
        className="flex items-center justify-center border-none outline-none z-[1000] "
        overlayClassName="fixed inset-0 bg-[#C6C6C6] bg-opacity-50 backdrop-blur-sm z-[1000]  flex justify-center items-center"
      >
        <div className="bg-white rounded-[12px] p-4 px-5 shadow-lg w-[460px] ">
          <div className="flex justify-end items-center">
            <IoCloseSharp
              size={22}
              className="cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
            {/* Product Detail */}
          </div>
          <div className="px-1">
            <h3 className="text-[24px] font-bold font-[#202224]">
              Rating & Reviews
            </h3>
            <div className="mt-4 flex items-center gap-3">
              <div className="bg-[#F2FBF7] flex items-center justify-center rounded-[8px] w-[114px] h-[114px]">
                <img
                  src={LargeImageMilk}
                  className="w-[91px] h-[91px]"
                  alt=""
                />
              </div>
              <div>
                <h4 className="font-[600] text-[18px] text-[#202224]">
                  Product Name
                </h4>
                <div className="flex items-center gap-3 mt-3">
                  <div className="border-r pr-10 border-[#EEEEEE]">
                    <p className="text-[#181818] text-[14px] font-[500]">
                      Category
                    </p>
                    <span className="text-[#959393] text-[14px] font-[400] ">
                      Metal
                    </span>
                  </div>
                  <div className="">
                    <p className="text-[#181818] text-[14px] font-[500]">
                      Sub Category
                    </p>
                    <span className="text-[#959393] text-[14px] font-[400] ">
                      Metal Rods
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-b  flex items-center gap-2 justify-between py-4 mt-4 border-t border-[#F1F1F1]">
              <div className="border-r w-full border-[#F1F1F1]">
                <p className="text-[#959393] text-[16px] font-[400] mb-2">
                  Posted By
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={Person1}
                    className="w-[31px] border p-[1px] rounded-full border-[#22B573] h-[31px]"
                    alt=""
                  />
                  <span className="text-[#000000] text-[16px] font-[400]">
                    John Doe
                  </span>
                </div>
              </div>
              <div className="border-r w-full border-[#F1F1F1]">
                <p className="text-[#959393] text-[16px] font-[400] mb-2">
                  Posted Date
                </p>
                <span className="text-[#000000] text-[16px] font-[400]">
                  11/11/2023
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
                  4.5
                </span>
              </div>
            </div>
            <div>
              <p className="text-[#959393] text-[16px] font-[400] mb-2">
                Description
              </p>
              <p className="text-[#000000] mb-3 text-[16px] font-[400] mb-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
            <Button
              text={"Report Review"}
              onClick={() => {
                setIsReport(true);
                setIsOpen(false);
              }}
              customClass={"w-[395px] mb-2"}
            />
          </div>
        </div>
      </Modal>
      <ReportModal isOpen={isReport} setIsOpen={setIsReport} />
    </>
  );
}
