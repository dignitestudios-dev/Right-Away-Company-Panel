import { NavLink } from "react-router";
import {
  DeleteImg,
  EditImg,
  MilkPackImg,
  Person2,
} from "../../../assets/export";
import Filter from "../../global/Filter";
import Pagination from "../../global/Pagination";
import GlobalTable from "../../global/Table";

export default function OrdersData() {
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

  const data = Array(10)
    .fill(null)
    .map((i) => [
      <p key={i} className="text-[#181818] text-[14px] font-[400] ">
        #546979
      </p>,
      <div key={i} className="flex items-center gap-3">
        <img
          src={Person2}
          alt="Person2"
          className="w-10 h-10 rounded-md object-cover"
        />
        <div>
          <p className="font-medium">Christine Easom</p>
        </div>
      </div>,

      <p key={i} className="text-[#181818] text-[14px] font-[400] ">
        Jan 15, 2023, 10:21
      </p>,
      <p key={i} className="text-[#181818] text-[14px] font-[400] ">
        Immediate
      </p>,
      <p key={i} className="text-[#181818] text-[14px] font-[400] ">
        100
      </p>,
      <p key={i} className="text-[#181818] text-[14px] font-[400] ">
        $12500
      </p>,
      <p key={i} className={`text-[#7D72F1] text-[14px] font-[500] `}>
        Incoming
      </p>,
      <div key={i} className="flex items-center gap-3">
         <NavLink to={"/app/order-detail"} className={"border-[#03958A] border-b gradient-text"} >View Details</NavLink>
      </div>,
    ]);
  return (
    <div>
      <div className="flex justify-between ">
        <h3 className="font-[600] text-[32px]">Order Management</h3>
        <Filter hide={true} />
      </div>
      <div className="mt-4">
        <GlobalTable data={data} columns={columns} />
      </div>
      <Pagination />
    </div>
  );
}
