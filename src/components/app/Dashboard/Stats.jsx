import React, { useEffect } from "react";
import {
  CustomerIcon,
  OrderIcon,
  ProductsIcon,
  RevenueIcon,
} from "../../../assets/export";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardStats } from "../../../redux/slices/AppSlice";

export default function Stats() {
  const dispatch = useDispatch();
  const { dashboardStats } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(getDashboardStats());
  }, [dispatch]);

  const statsData = [
    {
      title: "Total Customers",
      value: dashboardStats?.totalCustomers ?? 0,
      img: CustomerIcon,
    },
    {
      title: "Total Orders",
      value: dashboardStats?.totalOrders ?? 0,
      img: OrderIcon,
    },
    {
      title: "Total Products",
      value: dashboardStats?.totalProducts ?? 0,
      img: ProductsIcon,
    },
    {
      title: "Total Revenue",
      value: dashboardStats?.totallRevenue ?? 0,
      img: RevenueIcon,
    },
  ];

  return (
    <div className="grid lg:grid-cols-4 mb-5 mt-5 gap-3">
      {statsData.map((item, i) => (
        <div
          key={i}
          className="p-5 flex justify-between items-center bg-white rounded-[13px] shadow-sm"
        >
          <div>
            <p className="text-[14px] font-[400] gradient-text">{item.title}</p>
            <h3 className="text-[#202224] text-[26px] font-[700] mt-1">
              {item.value}
            </h3>
          </div>
          <img src={item.img} alt={item.title} className="h-[55px] w-[55px]" />
        </div>
      ))}
    </div>
  );
}
