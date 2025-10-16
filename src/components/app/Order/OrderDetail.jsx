import React from "react";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router";

export default function OrderDetail() {
  const navigate = useNavigate("");
  return (
    <div>
      <div className="flex justify-between ">
        <h3 className="font-[600] text-[32px] flex items-center gap-2">
          {" "}
          <GoArrowLeft
            onClick={() => navigate(-1)}
            className="text-[#03958A] cursor-pointer "
            size={21}
          />{" "}
          Order Details
        </h3>
        <div className="flex items-center gap-4">
          <button className="bg-[#EE3131] font-[500] text-white  text-[13px] w-[150px] h-[44px] rounded-[15px]">
            Cancel Order
          </button>
          <button className="bg-[#E7E7E8] font-[500] text-[#181818] text-[13px] w-[150px] h-[44px] rounded-[15px]">
            Track Order
          </button>
        </div>
      </div>
    </div>
  );
}
