import React, { useEffect, useState } from "react";
import GlobalTable from "../../global/Table";
import Pagination from "../../global/Pagination";
import Filter from "../../global/Filter";
import { useDispatch, useSelector } from "react-redux";
import {
  getWalletHistory,
  getWalletTransactions,
} from "../../../redux/slices/AppSlice";
import { formatDate } from "../../../lib/helpers";

export default function WalletData() {
  const [activeStatus, setActiveStatus] = useState("Transaction History");
  const [filters, setFilters] = useState({
    search: "",
    startDate: "",
    endDate: "",
    page: 1,
  });
  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  const statuses = ["Transaction History", "Withdrawal History"];
  const dispatch = useDispatch();
  const { walletTransactions, walletHistory, isLoading, pagination } =
    useSelector((state) => state?.app);

  // ✅ Debounce filters (500ms delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 500);
    return () => clearTimeout(timer);
  }, [filters]);

  // ✅ Fetch wallet data on debouncedFilters or activeStatus change
  useEffect(() => {
    const fetchData = async () => {
      if (activeStatus === "Transaction History") {
        await dispatch(
          getWalletTransactions({
            search: debouncedFilters.search,
            startDate: debouncedFilters.startDate,
            endDate: debouncedFilters.endDate,
            page: debouncedFilters.page,
            limit: 10,
          }),
        ).unwrap();
      } else {
        await dispatch(
          getWalletHistory({
            search: debouncedFilters.search,
            startDate: debouncedFilters.startDate,
            endDate: debouncedFilters.endDate,
            page: debouncedFilters.page,
            limit: 10,
          }),
        ).unwrap();
      }
    };
    fetchData();
  }, [dispatch, debouncedFilters, activeStatus]);

  // ✅ Table Columns
  const transactionColumns = ["Order Id", "User Name", "Amount", "Date"];
  const withdrawalColumns = [
    "Transactions ID",
    "Withdrawal Amount",
    "Status",
    "Withdrawal Date",
  ];
  const isWithdrawal = activeStatus === "Withdrawal History";
  const columns = isWithdrawal ? withdrawalColumns : transactionColumns;

  // ✅ Prepare Table Data
  const sourceData = isWithdrawal
    ? Array.isArray(walletHistory)
      ? walletHistory
      : []
    : Array.isArray(walletTransactions)
      ? walletTransactions
      : [];

  const data = sourceData.map((item, index) => {
    if (isWithdrawal) {
      return {
        _id: item._id,
        cells: [
          <p key={index + "-id"}>{item.transactionId}</p>,
          <p key={index + "-amount"}>${item.amount || "--"}</p>,
          <p className="capitalize" key={index + "-status"}>
            {item.status || "--"}
          </p>,
          <p key={index + "-date"}>{formatDate(item.date)}</p>,
        ],
      };
    }
    return {
      _id: item._id,
      cells: [
        <p key={index + "-order"}>#{item.orderId}</p>,
        <p key={index + "-user"}>{item.user?.name}</p>,
        <p key={index + "-amount"}>${item.total}</p>,
        <p key={index + "-date"}>{formatDate(item.createdAt)}</p>,
      ],
    };
  });

  return (
    <>
      <div className="flex justify-between mt-6">
        <h3 className="font-[600] text-[32px] flex items-center gap-2">
          {activeStatus}
        </h3>
        <div className="flex items-center gap-4">
          <Filter
            hide={true}
            dateHide={true}
            onFilterChange={(newFilters) =>
              setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }))
            }
          />
        </div>
      </div>

      {/* ✅ Filter Tabs */}
      <div className="mt-4 rounded-2xl shadow-sm border-t p-2 border-[#B9B9B9] bg-[#FFFFFF]">
        <div className="flex items-center gap-8 p-2">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setActiveStatus(status)}
              className={`text-[14px] font-[400] transition-colors relative pb-2 ${
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

        {/* ✅ Dynamic Table */}
        <GlobalTable data={data} columns={columns} loading={isLoading} />
      </div>

      {/* ✅ Pagination */}
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
