import { NavLink } from "react-router";
import { Person2 } from "../../../assets/export";
import Filter from "../../global/Filter";
import Pagination from "../../global/Pagination";
import GlobalTable from "../../global/Table";
import { useState } from "react";

export default function OrderTrackData() {
  const [activeStatus, setActiveStatus] = useState("All");

  const statuses = ["All", "Ready for Pickup", "Out for Delivery", "Delivered"];

  const columns = [
    "Order ID",
    "Customer Name",
    "Booking",
    "Delivery Type",
    "Qty",
    "Amount",
    "Status",
    "Action",
  ];

  const orders = [
    {
      _id: "1",
      id: "#546879",
      name: "Christine Easom",
      date: "Jan 15, 2023, 10:21",
      type: "Immediate",
      qty: 100,
      amount: "$12,500",
      status: "Ready For Pickup",
      statusColor: "text-[#10CBFF]",
    },
    {
      _id: "2",
      id: "#546880",
      name: "John Alex",
      date: "Jan 15, 2023, 10:21",
      type: "Immediate",
      qty: 100,
      amount: "$12,500",
      status: "Out for Delivery",
      statusColor: "text-[#FF6D08]",
    },
    {
      _id: "3",
      id: "#546881",
      name: "James Bond",
      date: "Jan 15, 2023, 10:21",
      type: "Immediate",
      qty: 100,
      amount: "$12,500",
      status: "Delivered",
      statusColor: "text-[#00C853]",
    },
  ];

  // ✅ Filter by active status
  const filteredData =
    activeStatus === "All"
      ? orders
      : orders.filter((item) => item.status === activeStatus);

  // ✅ Properly structure rows for GlobalTable
  const data = filteredData.map((item, index) => ({
    _id: item._id,
    cells: [
      <p key={index + "-id"} className="text-[#181818] text-[14px] font-[400]">
        {item.id}
      </p>,

      <div key={index + "-name"} className="flex items-center gap-3">
        <img
          src={Person2}
          alt="Person"
          className="w-10 h-10 rounded-full border border-[#00C49A] object-cover"
        />
        <div>
          <p className="font-medium text-[14px]">{item.name}</p>
        </div>
      </div>,

      <p key={index + "-date"} className="text-[#181818] text-[14px] font-[400]">
        {item.date}
      </p>,

      <p key={index + "-type"} className="text-[#181818] text-[14px] font-[400]">
        {item.type}
      </p>,

      <p key={index + "-qty"} className="text-[#181818] text-[14px] font-[400]">
        {item.qty}
      </p>,

      <p
        key={index + "-amount"}
        className="text-[#181818] text-[14px] font-[400]"
      >
        {item.amount}
      </p>,

      <p
        key={index + "-status"}
        className={`${item.statusColor} text-[14px] font-[500] capitalize`}
      >
        {item.status}
      </p>,

      <div key={index + "-action"} className="flex items-center gap-3">
        <NavLink
          to="/app/order-track-detail"
          state={{ orderId: item._id }}
          className="text-[#00C49A] font-[500] border-b border-[#00C49A]"
        >
          View Details
        </NavLink>
      </div>,
    ],
  }));

  return (
    <div>
      <div className="flex justify-between">
        <h3 className="font-[600] text-[32px]">Order Tracking</h3>
        <Filter hide={true} />
      </div>

      <div className="mt-4 rounded-2xl shadow-sm border-t p-2 border-[#B9B9B9] bg-[#FFFFFF] ">
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

        {/* ✅ Pass structured data to GlobalTable */}
        <GlobalTable data={data} columns={columns} />
      </div>

      <Pagination />
    </div>
  );
}
