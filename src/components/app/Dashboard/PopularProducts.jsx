import React from "react";
import { MilkPackImg } from "../../../assets/export";

export default function PopularProducts() {
  const popularProductsList = [
    {
      id: "Item# FXZ-4567",
      name: "Product Name",
      img: MilkPackImg,
      price: "$999.28",
    },
    {
      id: "Item# FXZ-4567",
      name: "Product Name",
      img: MilkPackImg,
      price: "$999.28",
    },
    {
      id: "Item# FXZ-4567",
      name: "Product Name",
      img: MilkPackImg,
      price: "$999.28",
    },
    {
      id: "Item# FXZ-4567",
      name: "Product Name",
      img: MilkPackImg,
      price: "$999.28",
    },
    {
      id: "Item# FXZ-4567",
      name: "Product Name",
      img: MilkPackImg,
      price: "$999.28",
    },
    {
      id: "Item# FXZ-4567",
      name: "Product Name",
      img: MilkPackImg,
      price: "$999.28",
    },
    {
      id: "Item# FXZ-4567",
      name: "Product Name",
      img: MilkPackImg,
      price: "$999.28",
    },
  ];
  return (
    <div className="col-span-12 lg:col-span-4 overflow-auto relative h-[400px] bg-white rounded-2xl shadow-sm p-4">
      <div className="flex items-center py-2 border-b border-[#2121211C] justify-between">
        <h3 className="font-[600] text-[#212121] text-[15px]">
          Popular Products
        </h3>
        <p className="gradient-text text-[12px] font-[500]">
          Total 10.4k Visitors{" "}
        </p>
      </div>
      <div>
        {popularProductsList?.map((item, i) => (
          <div key={i} className="flex mt-2 py-2 border-b border-[#2121211C] items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-[#F2FBF7] rounded-[8px] w-[42px] h-[42px] flex items-center justify-center">
                <img src={item?.img} alt={item?.img} />
              </div>
              <div>
                <h3 className="text-[15px]  font-[600] text-[#181818]">
                  {item?.name}
                </h3>
                <p className="text-[10px]  font-[400] text-[#838383]">
                  {item?.id}
                </p>
              </div>
            </div>
            <div>
              <p className="gradient-text font-[700] text-[10px] ">
                {item?.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
