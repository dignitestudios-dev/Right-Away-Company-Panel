import React from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPageChange = () => {},
}) {
  if (!totalPages || totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  // ✅ Smart page rendering (with ellipsis)
  const getPageNumbers = () => {
    const pages = [];

    const maxVisible = 5; // how many numbers to show
    const half = Math.floor(maxVisible / 2);

    let start = Math.max(currentPage - half, 1);
    let end = Math.min(start + maxVisible - 1, totalPages);

    if (end - start < maxVisible - 1) {
      start = Math.max(end - maxVisible + 1, 1);
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex justify-between items-center w-full mb-2 mt-3 flex-wrap gap-3">
      {/* Left side info */}
      <p className="text-[14px] text-gray-600">
        Showing{" "}
        <span className="font-semibold text-[#22B573]">{startItem}</span> to{" "}
        <span className="font-semibold text-[#22B573]">{endItem}</span> of{" "}
        <span className="font-semibold text-[#22B573]">{totalItems}</span>{" "}
        results
      </p>

      {/* Right side controls */}
      <div className="flex items-center bg-white p-2 rounded-[20px] gap-2 shadow-sm">
        {/* Prev */}
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`w-9 h-9 flex items-center justify-center rounded-[12px] transition ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-[#22B573] text-white hover:opacity-90"
          }`}
        >
          <IoChevronBack size={18} />
        </button>

        {/* Page Numbers */}
        <div className="flex items-center bg-[#F3F4F6] rounded-[14px] px-2 py-1 gap-1">
          {getPageNumbers().map((page, index) =>
            page === "..." ? (
              <span key={index} className="px-2 text-gray-500">
                ...
              </span>
            ) : (
              <button
                key={index}
                onClick={() => onPageChange(page)}
                className={`w-8 h-8 flex items-center justify-center rounded-[8px] text-sm font-medium transition ${
                  currentPage === page
                    ? "bg-[#0EBB8E]/10 text-[#0EBB8E]"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                {page}
              </button>
            ),
          )}
        </div>

        {/* Next */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`w-9 h-9 flex items-center justify-center rounded-[12px] transition ${
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
