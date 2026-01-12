import { NavLink } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getOrders } from "../../../redux/slices/AppSlice";
import { formatDate } from "../../../lib/helpers";
import Filter from "../../global/Filter";
import Pagination from "../../global/Pagination";
import GlobalTable from "../../global/Table";
import { Person2 } from "../../../assets/export";

export default function OrdersData() {
  const [activeStatus, setActiveStatus] = useState("All");
  const [filters, setFilters] = useState({
    search: "",
    startDate: "",
    endDate: "",
  });

  const dispatch = useDispatch();
  const { orders, isLoading, pagination } = useSelector((state) => state.app);

  // ✅ Fetch orders when filters or status or page changes
  useEffect(() => {
    const payload = {
      type: "manage",
      ...(activeStatus !== "All" && { status: activeStatus }),
      page: pagination?.currentPage,
      limit:10,
      search: filters.search,
      startDate: filters.startDate,
      endDate: filters.endDate,
    };

    dispatch(getOrders(payload));
  }, [dispatch, filters, activeStatus]); // 👈 re-fetch when filters change

  const statuses = ["All", "incoming","processing" ,"cancelled"];

  const columns = [
    "Order ID",
    "Customer Name",
    "Booking",
    "Delivery Type",
    "Amount",
    "Status",
    "Action",
  ];

  const data = orders?.map((item, index) => ({
    _id: item._id,
    cells: [
      // Order ID
      <p
        key={`order-${index}-id`}
        className="text-[#181818] text-[14px] font-[400]"
      >
        {item.orderId}
      </p>,

      // Customer Info
      <div key={`order-${index}-user`} className="flex items-center gap-3">
        <img
          src={item?.user?.profilePicture || Person2}
          alt="User"
          className="w-10 h-10 rounded-full border border-[#00C49A] object-cover"
        />
        <div>
          <p className="font-medium text-[14px]">{item?.user?.name}</p>
        </div>
      </div>,

      // Booking Date
      <p
        key={`order-${index}-date`}
        className="text-[#181818] text-[14px] font-[400]"
      >
        {formatDate(item.createdAt)}
      </p>,

      // Delivery Type
      <p
        key={`order-${index}-type`} 
        className="text-[#181818] capitalize text-[14px] font-[400]"
      >
        {item.type}
      </p>,

      // Amount
      <p
        key={`order-${index}-amount`}
        className="text-[#181818] text-[14px] font-[400]"
      >
        ${parseFloat(item.total || 0).toFixed(2)}
      </p>,

      // Status
      <p
        key={`order-${index}-status`}
        className={`text-[14px] font-[500] capitalize ${
          item.status === "Completed"
            ? "text-[#00C853]"
            : item.status === "cancelled"
            ? "text-[#FF3B30]"
            : item.status === "processing"
            ? "text-[#FF9800]"
            : "text-[#03958A]"
        }`}
      >
        {item.status}
      </p>,

      // Action
      <div key={`order-${index}-action`} className="flex items-center gap-3">
        <NavLink
          to="/app/order-detail"
          state={{ id: item?._id }}
          className="text-[#03958A] border-b border-[#03958A] font-[500]"
        >
          View Details
        </NavLink>
      </div>,
    ],
  }));

  return (
    <div>
      {/* ✅ Header and Filter */}
      <div className="flex justify-between flex-wrap items-center">
        <h3 className="font-[600] text-[32px]">Order Management</h3>
        <Filter onFilterChange={setFilters} hide={true} />
      </div>

      {/* ✅ Tabs + Table */}
      <div className="mt-4 rounded-2xl shadow-sm border-t p-3 border-[#B9B9B9] bg-[#FFFFFF]">
        {/* Status Tabs */}
        <div className="flex items-center gap-8 p-2">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => {
                setActiveStatus(status);
                setCurrentPage(1); // reset page when changing tab
              }}
              className={`text-[14px] font-[400] capitalize transition-colors relative pb-2 ${
                activeStatus === status
                  ? "gradient-text"
                  : "text-[#000000] hover:text-gray-900"
              }`}
            >
              {status}
              {activeStatus === status && (
                <div className="absolute top-5 left-0 right-0 h-[1.5px] bg-[#03958A]" />
              )}
            </button>
          ))}
        </div>

        {/* Orders Table */}
        <GlobalTable data={data} columns={columns} loading={isLoading} />
      </div>

      {/* ✅ Pagination */}
      <Pagination
        currentPage={pagination?.currentPage}
        totalPages={pagination?.totalPages}
        totalItems={pagination?.totalItems}
        itemsPerPage={pagination?.itemsPerPage}
        onPageChange={(page) =>
          dispatch(getOrders({...filters,type:"manage",page, limit: 10 }))
        }
      />
    </div>
  );
}
