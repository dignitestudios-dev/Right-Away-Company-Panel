import React, { useEffect, useState } from "react";
import { Person2 } from "../../../assets/export";
import GlobalTable from "../../global/Table";
import Pagination from "../../global/Pagination";
import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerOrders } from "../../../redux/slices/AppSlice";
import { formatDate } from "../../../lib/helpers";

export default function CustomerDetailOrders({ customer }) {
  const columns = [
    "Order ID",
    "Product Name",
    "Booking",
    "Delivery Type",
    "Amount",
    "Action",
  ];
  console.log(customer, "customer_id");
  const { CustomerOrders, isLoading } = useSelector((state) => state?.app);
  const dispatch = useDispatch();
  const fetchCustomersOrders = async () => {
    await dispatch(getCustomerOrders(customer?.userId)).unwrap();
  };
  useEffect(() => {
    fetchCustomersOrders();
  }, [customer]);

  // ✅ Properly structure data for GlobalTable
  const data = CustomerOrders?.map((item, index) => ({
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
    <>
      <div className="mt-4 rounded-2xl shadow-sm border-t p-2 border-[#B9B9B9] bg-[#FFFFFF] ">
        {/* ✅ Pass structured data to GlobalTable */}
        <GlobalTable data={data} columns={columns} loading={isLoading} />
      </div>
      <Pagination />
    </>
  );
}
