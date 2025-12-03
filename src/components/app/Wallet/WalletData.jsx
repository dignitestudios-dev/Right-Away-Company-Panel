import React, { useEffect, useState } from "react";
import { MilkPackImg } from "../../../assets/export";
import GlobalTable from "../../global/Table";
import { formatDate } from "../../../lib/helpers";
import Pagination from "../../global/Pagination";
import Filter from "../../global/Filter";
import { useDispatch, useSelector } from "react-redux";
import { getWalletTransactions } from "../../../redux/slices/AppSlice";

export default function WalletData() {
  const [activeStatus, setActiveStatus] = useState("Transaction History");
  const [filters, setFilters] = useState({
    search: "",
    startDate: "",
    endDate: "",
  });
  const statuses = ["Transaction History", "Withdrawal History"];
  const dispatch = useDispatch();
  const { walletTransactions, isLoading, pagination } = useSelector(
    (state) => state.app
  );

  const handleWalletTransactions = async () => {
    await dispatch(
      getWalletTransactions({
        search: filters.search,
        startDate: filters.startDate,
        endDate: filters.endDate,
      })
    ).unwrap();
  };

  useEffect(() => {
    handleWalletTransactions();
  }, [dispatch, filters]);

  // Transaction Table Columns
  const transactionColumns = [
    "Transactions ID",
    "Order Id",
    "User Name",
    "Amount",
    "Date",
  ];

  // Withdrawal Table Columns
  const withdrawalColumns = [
    "Transactions ID",
    "Account Number",
    "Withdrawal Amount",
    "Transfer Method",
    "Status",
    "Withdrawal Date",
  ];

  // ✅ Transaction Data
  const transactions = [
    {
      _id: "1",
      id: "12fgh123",
      name: "Christine Easom",
      date: "20 jan, 2025",
      productName: "Product Name",
      qty: 20,
      amount: "$12500",
      status: "Transaction History",
      statusColor: "text-[#10CBFF]",
    },
    {
      _id: "2",
      id: "34jkl456",
      name: "Jordan Lee",
      date: "22 jan, 2025",
      productName: "Product Name",
      qty: 15,
      amount: "$15000",
      status: "Transaction History",
      statusColor: "text-[#10CBFF]",
    },
    {
      _id: "3",
      id: "56xyz789",
      name: "Alice Smith",
      date: "25 jan, 2025",
      productName: "Product Name",
      qty: 10,
      amount: "$20000",
      status: "Transaction History",
      statusColor: "text-[#10CBFF]",
    },
  ];

  // ✅ Withdrawal Data
  const withdrawals = [
    {
      id: "12fgh123",
      accountNumber: "00257 596, 00202 899",
      withdrawalAmount: "$30,000",
      transferMethod: "Bank Transfer",
      status: "Approved",
      date: "20 jan, 2025",
      statusColor: "text-[#00B074]",
    },
    {
      id: "15xyz456",
      accountNumber: "00258 597, 00203 900",
      withdrawalAmount: "$45,000",
      transferMethod: "Bank Transfer",
      status: "Rejected",
      date: "22 jan, 2025",
      statusColor: "text-[#FF2D2D]",
    },
    {
      id: "18jkl789",
      accountNumber: "00259 598, 00204 901",
      withdrawalAmount: "$27,500",
      transferMethod: "Bank Transfer",
      status: "Pending",
      date: "25 jan, 2025",
      statusColor: "text-[#F59E0B]",
    },
    {
      id: "20wqr123",
      accountNumber: "00260 599, 00205 902",
      withdrawalAmount: "$15,000",
      transferMethod: "Bank Transfer",
      status: "Approved",
      date: "28 jan, 2025",
      statusColor: "text-[#00B074]",
    },
    {
      id: "25abc456",
      accountNumber: "00261 600, 00206 903",
      withdrawalAmount: "$60,000",
      transferMethod: "Bank Transfer",
      status: "Rejected",
      date: "30 jan, 2025",
      statusColor: "text-[#FF2D2D]",
    },
    {
      id: "30lmn789",
      accountNumber: "00262 601, 00207 904",
      withdrawalAmount: "$5,000",
      transferMethod: "Bank Transfer",
      status: "Pending",
      date: "02 feb, 2025",
      statusColor: "text-[#F59E0B]",
    },
    {
      id: "35def012",
      accountNumber: "00263 602, 00208 905",
      withdrawalAmount: "$80,000",
      transferMethod: "Bank Transfer",
      status: "Approved",
      date: "05 feb, 2025",
      statusColor: "text-[#00B074]",
    },
    {
      id: "40ghi345",
      accountNumber: "00264 603, 00209 906",
      withdrawalAmount: "$12,500",
      transferMethod: "Bank Transfer",
      status: "Rejected",
      date: "08 feb, 2025",
      statusColor: "text-[#FF2D2D]",
    },
    {
      id: "45opq678",
      accountNumber: "00265 604, 00210 907",
      withdrawalAmount: "$22,000",
      transferMethod: "Bank Transfer",
      status: "Pending",
      date: "10 feb, 2025",
      statusColor: "text-[#F59E0B]",
    },
    {
      id: "50rst901",
      accountNumber: "00266 605, 00211 908",
      withdrawalAmount: "$18,000",
      transferMethod: "Bank Transfer",
      status: "Approved",
      date: "12 feb, 2025",
      statusColor: "text-[#00B074]",
    },
  ];

  // ✅ Decide which data & columns to show
  const isWithdrawal = activeStatus === "Withdrawal History";
  const columns = isWithdrawal ? withdrawalColumns : transactionColumns;
  const sourceData = isWithdrawal ? withdrawals : walletTransactions || [];

  // ✅ Format data for GlobalTable
  // Real API Transactions Mapping
  console.log(sourceData, "transactions-- data");
  const data = sourceData.map((item, index) => {
    if (isWithdrawal) {
      return {
        _id: item._id,
        cells: [
          <p key={index + "-id"}>{item._id}</p>,
          <p key={index + "-acc"}>{item.accountNumber || "--"}</p>,
          <p key={index + "-amount"}>{item.withdrawalAmount || "--"}</p>,
          <p key={index + "-method"}>{item.transferMethod || "--"}</p>,
          <p key={index + "-status"}>{item.status || "--"}</p>,
          <p key={index + "-date"}>{formatDate(item.createdAt)}</p>,
        ],
      };
    }

    // 🚀 Show Real Transaction Table Data
    return {
      _id: item._id,
      cells: [
        <p key={index + "-order"}>{item.orderId}</p>,

        <p key={index + "-order"}>{item.orderId}</p>,

        <p key={index + "-user"}>{item.user?.name}</p>,

        <p key={index + "-amount"}>{item.total}</p>,

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
