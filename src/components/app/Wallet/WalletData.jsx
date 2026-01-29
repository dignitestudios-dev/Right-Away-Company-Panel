import React, { useEffect, useState } from "react";
import { MilkPackImg } from "../../../assets/export";
import GlobalTable from "../../global/Table";
import { formatDate } from "../../../lib/helpers";
import Pagination from "../../global/Pagination";
import Filter from "../../global/Filter";
import { useDispatch, useSelector } from "react-redux";
import {
  getWalletHistory,
  getWalletTransactions,
} from "../../../redux/slices/AppSlice";

export default function WalletData() {
  const [activeStatus, setActiveStatus] = useState("Transaction History");
  const [filters, setFilters] = useState({
    search: "",
    startDate: "",
    endDate: "",
  });
  const statuses = ["Transaction History", "Withdrawal History"];
  const dispatch = useDispatch();
  const { walletTransactions, walletHistory, isLoading, pagination } =
    useSelector((state) => state.app);

  const handleWalletTransactions = async () => {
    await dispatch(
      getWalletTransactions({
        search: filters.search,
        startDate: filters.startDate,
        endDate: filters.endDate,
      }),
    ).unwrap();
    await dispatch(
      getWalletHistory({
        search: filters.search,
        startDate: filters.startDate,
        endDate: filters.endDate,
      }),
    ).unwrap();
  };

  useEffect(() => {
    handleWalletTransactions();
  }, [dispatch, filters]);

  // Transaction Table Columns
  const transactionColumns = ["Order Id", "User Name", "Amount", "Date"];

  // Withdrawal Table Columns
  const withdrawalColumns = [
    "Transactions ID",
    "Withdrawal Amount",
    "Status",
    "Withdrawal Date",
  ];

  // ✅ Decide which data & columns to show
  const isWithdrawal = activeStatus === "Withdrawal History";
  const columns = isWithdrawal ? withdrawalColumns : transactionColumns;
  const sourceData = isWithdrawal ? walletHistory : walletTransactions || [];
  const data = sourceData?.map((item, index) => {
    if (isWithdrawal) {
      return {
        _id: item._id,
        cells: [
          <p key={index + "-id"}>{item.transactionId}</p>,
          <p key={index + "-amount"}>{item.amount || "--"}</p>,
          <p key={index + "-status"}>{item.status || "--"}</p>,
          <p key={index + "-date"}>{item.date}</p>,
        ],
      };
    }

    // 🚀 Show Real Transaction Table Data
    return {
      _id: item?._id,
      cells: [
        <p key={index + "-order"}>{item?.orderId}</p>,

        <p key={index + "-user"}>{item?.user?.name}</p>,

        <p key={index + "-amount"}>{item?.total}</p>,

        <p key={index + "-date"}>{formatDate(item?.createdAt)}</p>,
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
          <Filter hide={true} dateHide={true} onFilterChange={setFilters} />
        </div>
      </div>

      <div className="mt-4 rounded-2xl shadow-sm border-t p-2 border-[#B9B9B9] bg-[#FFFFFF]">
        {/* ✅ Filter Tabs */}
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
        <GlobalTable data={data} columns={columns} />
      </div>
      <Pagination
        currentPage={pagination?.currentPage}
        totalPages={pagination?.totalPages}
        totalItems={pagination?.totalItems}
        itemsPerPage={pagination?.itemsPerPage}
        onPageChange={(page) =>
          dispatch(getWalletTransactions({ ...filters, page, limit: 10 }))
        }
      />
    </>
  );
}
