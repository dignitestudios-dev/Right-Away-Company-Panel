import React, { useEffect, useState } from "react";
import { RatingIcon } from "../../../assets/export";
import GlobalTable from "../../global/Table";
import Pagination from "../../global/Pagination";
import ProductRatingReviewModal from "./ProductRatingReviewModal";
import { useDispatch, useSelector } from "react-redux";
import { getProductReview } from "../../../redux/slices/AppSlice";
import Filter from "../../global/Filter";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router";

export default function ProductReviewsData() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selected, setIsSelected] = useState(null);
  const { ProductReview, pagination } = useSelector((state) => state?.app);

  // Filters state
  const [filters, setFilters] = useState({
    search: "",
    startDate: "",
    endDate: "",
    page: 1,
  });

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState(filters.search);

  // Update debounce value after 500ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filters.search);
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [filters.search]);

  // Fetch Product Reviews whenever debouncedSearch, startDate, endDate, or page changes
  useEffect(() => {
    const fetchProductReview = async () => {
      await dispatch(
        getProductReview({
          search: debouncedSearch,
          startDate: filters.startDate,
          endDate: filters.endDate,
          page: filters.page,
          limit: 10,
        }),
      ).unwrap();
    };

    fetchProductReview();
  }, [
    dispatch,
    debouncedSearch,
    filters.startDate,
    filters.endDate,
    filters.page,
  ]);

  const columns = [
    "Customer Name",
    "Product",
    "Description",
    "Rating",
    "Date",
    "Action",
  ];

  // Format table data
  const data =
    ProductReview?.map((item, index) => ({
      _id: item._id,
      cells: [
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

        <p
          key={`desc-${index}`}
          className="text-[#181818] text-[14px] font-[400]"
        >
          {item?.productRecord?.description || "No description"}
        </p>,

        <div key={`rating-${index}`} className="flex items-center gap-1">
          <img src={RatingIcon} alt="rating" className="w-[16px] h-[15px]" />
          <p className="text-[#181818] text-[14px] font-[400]">
            {item?.rating || 0}
          </p>
        </div>,

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

        <button
          key={`action-${index}`}
          onClick={() => {
            setIsSelected(item);
            setIsOpen(true);
          }}
          className="text-[#00C49A] font-[500] border-b border-[#00C49A]"
        >
          View Details
        </button>,
      ],
    })) || [];

  return (
    <>
      <div className="flex justify-between ">
        <h3 className="font-[600] text-[32px] flex items-center gap-2">
          <GoArrowLeft
            onClick={() => navigate(-1)}
            className="text-[#03958A] cursor-pointer "
            size={21}
          />
          Product Reviews
        </h3>

        <div className="flex items-center gap-4">
          {/* Show Filter with debounce */}
          <Filter
            hide={false} // show input
            onFilterChange={(newFilters) =>
              setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }))
            }
          />
        </div>
      </div>

      <div className="mt-4 rounded-2xl shadow-sm border-t p-2 border-[#B9B9B9] bg-[#FFFFFF]">
        <GlobalTable data={data} columns={columns} />
      </div>

      <Pagination
        currentPage={pagination?.currentPage || 1}
        totalPages={pagination?.totalPages || 1}
        totalItems={pagination?.totalItems || 0}
        itemsPerPage={pagination?.itemsPerPage || 10}
        onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
      />

      <ProductRatingReviewModal
        selected={selected}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
}
