import React from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

export default function Pagination({
  currentPage = 1,
  totalPages = 3,
  totalItems = 24,
  itemsPerPage = 10,
  onPageChange = () => {},
}) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex justify-between  items-center w-full mb-2 mt-3">
      {/* Left side info */}
      <p className="text-[16px] font-[400] text-[#000000]">
        You have {" "}
        <span className="font-semibold text-[#22B573]">{startItem}</span> –{" "}
        <span className="font-semibold text-[#22B573]">{endItem}</span> of{" "}
        <span className="font-semibold text-[#22B573] mr-1">{totalItems}</span>
         Pages
      </p>

      {/* Right side pagination buttons */}
      <div className="flex items-center  bg-[#FFFFFF]  p-3 rounded-[20px] gap-3">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`w-10 h-10 flex items-center justify-center rounded-[14px] transition ${
            currentPage === 1
              ? "bg-[#EDEDED] text-gray-400 cursor-not-allowed"
              : "bg-[#22B573] text-gray-600 hover:bg-gray-200"
          }`}
        >
          <IoChevronBack size={18} />
        </button>

        {/* Page Numbers */}
        <div className="flex items-center bg-[#EDEDED] rounded-[14px] px-3 py-1">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => onPageChange(i + 1)}
              className={`w-8 h-8 flex items-center justify-center rounded-[8px] text-sm font-medium transition ${
                currentPage === i + 1
                  ? "bg-[#0EBB8E]/10 text-[#0EBB8E]"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`w-10 h-10 flex items-center justify-center rounded-[14px] transition ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-[#0EBB8E] text-white hover:opacity-90"
          }`}
        >
          <IoChevronForward size={18} />
        </button>
      </div>    
    </div>
  );
}
