import React from "react";
import {
  CustomerIcon,
  OrderIcon,
  ProductsIcon,
  RevenueIcon,
} from "../../../assets/export";

export default function Stats() {
  const statsData = [
    {
      title: "Total Customers",
      value: "3,000",
      img: CustomerIcon,
    },
    {
      title: "Total Orders",
      value: "2,689",
      img: OrderIcon,
    },
    {
      title: "Total Products",
      value: "1.423k",
      img: ProductsIcon,
    },
    {
      title: "Total Revenue",
      value: "$30,689",
      img: RevenueIcon,
    },
  ];
  return (
    <div className="grid grid-cols-4 mt-5 gap-3">
      {statsData?.map((item, i) => (
        <div key={i} className="p-5 flex justify-between items-center bg-[#FFFFFF]  rounded-[13px] shadow-sm ">
          <div className="" >
            <p className="text-[14px] font-[400] gradient-text">
              {" "}
              {item?.title}
            </p>
            <h3 className="text-[#202224] text-[26px] font-[700] mt-1">
              {item?.value}
            </h3>
          </div>
          <div>
            <img src={item?.img} alt={item?.img} className="h-[55px] w-[55px]" />
          </div>
        </div>
      ))}
      <div></div>
    </div>
  );
}
