import React, { useEffect, useState } from "react";
import { Person2 } from "../../../assets/export";
import GlobalTable from "../../global/Table";
import Pagination from "../../global/Pagination";
import { NavLink, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getCustomers } from "../../../redux/slices/AppSlice";
import { GoArrowLeft } from "react-icons/go";
import Filter from "../../global/Filter";

export default function CustomersData() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Customers, isLoading, pagination } = useSelector(
    (state) => state?.app,
  );

  // Filters state
  const [filters, setFilters] = useState({
    search: "",
    startDate: "",
    endDate: "",
    page: 1,
  });

  // Debounced search state
  const [debouncedSearch, setDebouncedSearch] = useState(filters.search);

  // Update debouncedSearch after 500ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filters.search);
    }, 500);

    return () => clearTimeout(timer);
  }, [filters.search]);

  // Fetch customers whenever debouncedSearch, dates, or page changes
  useEffect(() => {
    const fetchCustomers = async () => {
      await dispatch(
        getCustomers({
          search: debouncedSearch,
          startDate: filters.startDate,
          endDate: filters.endDate,
          page: filters.page,
          limit: 10,
        }),
      ).unwrap();
    };

    fetchCustomers();
  }, [
    dispatch,
    debouncedSearch,
    filters.startDate,
    filters.endDate,
    filters.page,
  ]);

  const columns = [
    "Customer Name",
    "Email Address",
    "Phone Number",
    "Location",
    "Action",
  ];

  // Format table rows
  const data =
    Customers?.map((item, index) => ({
      _id: item.userId,
      cells: [
        <div key={index + "-name"} className="flex items-center gap-3">
          <img
            src={item?.profilePicture || Person2}
            alt="Person"
            className="w-10 h-10 rounded-full border border-[#00C49A] object-cover"
          />
          <div>
            <p className="font-medium text-[14px]">{item?.name}</p>
          </div>
        </div>,
        <p
          key={index + "-email"}
          className="text-[#181818] text-[14px] font-[400]"
        >
          {item?.email}
        </p>,
        <p
          key={index + "-phone"}
          className="text-[#181818] text-[14px] font-[400]"
        >
          {item?.phone}
        </p>,
        <p
          key={index + "-address"}
          className="text-[#181818] text-[14px] font-[400]"
        >
          {item?.address}
        </p>,
        <div key={index + "-action"} className="flex items-center gap-3">
          <NavLink
            to={"/app/customer-detail"}
            state={{ customer: item }}
            className="text-[#00C49A] text-nowrap font-[500] border-b border-[#00C49A]"
          >
            View Details
          </NavLink>
        </div>,
      ],
    })) || [];

  return (
    <>
      <div className="flex justify-between ">
        <h3 className="font-[600] text-[32px] flex items-center gap-2">
          <GoArrowLeft
            onClick={() => navigate(-1)}
            className="text-[#03958A] cursor-pointer"
            size={21}
          />
          Customer
        </h3>

        <div className="flex items-center gap-4">
          {/* Show Filter with debounce */}
          <Filter
            hide={true} // show input
            
            onFilterChange={(newFilters) =>
              setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }))
            }
          />
        </div>
      </div>

      <div className="mt-4 rounded-2xl shadow-sm border-t p-2 border-[#B9B9B9] bg-[#FFFFFF]">
        <GlobalTable data={data} columns={columns} loading={isLoading} />
      </div>

      <Pagination
        currentPage={pagination?.currentPage || 1}
        totalPages={pagination?.totalPages || 1}
        totalItems={pagination?.totalItems || 0}
        itemsPerPage={pagination?.itemsPerPage || 10}
        onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
      />
    </>
  );
}
