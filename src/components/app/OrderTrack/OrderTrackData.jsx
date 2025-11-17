import { NavLink } from "react-router";
import { Person2 } from "../../../assets/export";
import Filter from "../../global/Filter";
import Pagination from "../../global/Pagination";
import GlobalTable from "../../global/Table";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../../redux/slices/AppSlice";
import { formatDate } from "../../../lib/helpers";

export default function OrderTrackData() {
  const [activeStatus, setActiveStatus] = useState("All");
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state) => state.app);
useEffect(() => {
  const payload = {
    type: "track",
    ...(activeStatus !== "All" && { status: statusMap[activeStatus] }),
    page: 1,
    limit: 20,
  };
  console.log("🚀 Dispatching getOrders with payload:", payload);
  dispatch(getOrders(payload));
}, [dispatch, activeStatus]);

const statuses = ["All", "Ready for Pickup", "Out for Delivery", "Completed"];
const statusMap = {
  "All": null, // no filter
  "Ready for Pickup": "pickUp",
  "Out for Delivery": "delivery",
  "Completed": "completed",
};


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
  console.log(orders, "order--->");
  // ✅ Properly structure rows for GlobalTable
  const data = orders?.map((item, index) => ({
    _id: item._id,
    cells: [
      <p
        key={`order-${index}-id`}
        className="text-[#181818] text-[14px] font-[400]"
      >
        {item.orderId}
      </p>,

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

      <p
        key={`order-${index}-date`}
        className="text-[#181818] text-[14px] font-[400]"
      >
        {formatDate(item.createdAt)}
      </p>,

      <p
        key={`order-${index}-type`}
        className="text-[#181818] text-[14px] font-[400]"
      >
        {item.type}
      </p>,

      <p
        key={`order-${index}-amount`}
        className="text-[#181818] text-[14px] font-[400]"
      >
        ${parseFloat(item.total || 0).toFixed(2)}
      </p>,

      <p
        key={`order-${index}-status`}
        className={`text-[14px] font-[500] capitalize ${
          item.status === "pickUp"
            ? "text-[#10CBFF]"
            : item.status === "delivery"
            ? "text-[#FF6D08]"
            : item.status === "completed"
            ? "text-[#00C853]"
            : "text-[#03958A]"
        }`}
      >
        {item.status}
      </p>,

      <div key={index + "-action"} className="flex items-center gap-3">
        <NavLink
          to="/app/order-track-detail"
          state={{ id: item._id }}
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
          ? "text-[#03958A] border-b-[1.5px] border-[#03958A]"
          : "text-[#000000] hover:text-gray-900"
      }`}
    >
      {status}
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
