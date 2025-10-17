import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import Button from "./Button";
import { FaPlus } from "react-icons/fa";
import { TbFilter } from "react-icons/tb";
import { useNavigate } from "react-router";
export default function Filter({ hide }) {
  const [isFilter, setIsFilter] = useState(false);
  const navigate = useNavigate("");
  return (
    <div className="flex gap-3 ml-auto mt-2 relative">
      <div className="relative">
        <CiSearch color="#959393" className="absolute top-[15px] left-1" />
        <input
          type="text"
          className="border border-[#D9D9D9] focus:outline-none h-[44px] text-[16px] text-[#959393] rounded-[15px] px-6 "
          placeholder="Search"
        />
      </div>
      {!hide && (
        <div>
          <Button
            onClick={() => navigate("/app/add-product")}
            customClass={"w-[180px]"}
            text={
              <div className="flex items-center gap-2">
                <FaPlus />
                Add New Product
              </div>
            }
          />
        </div>
      )}

      <div>
        <Button
          onClick={() => setIsFilter(!isFilter)}
          text={<TbFilter size={24} />}
          customClass={"w-[44px] h-[44px]"}
        />
      </div>
      {isFilter && (
        <div className="w-[330px] px-5 py-4 absolute z-40 top-14 shadow-md right-0 h-[316px] bg-[#FFFFFF] rounded-[14px]  ">
          <h1 className="font-[600] text-[18px] text-[#000000] border-b border-[#0000001A] py-2 ">
            Filter
          </h1>
          <div className="mt-3">
            <label
              htmlFor=""
              className="text-[14px] font-[500] text-[#000000] "
            >
              Start Date
            </label>
            <br />
            <input
              type="date"
              className="bg-[#FBFBFB] mt-2 px-3 w-full rounded-[9px]  text-[#000000] text-[16px] font-[400] h-[49px]  "
            />
          </div>
          <div className="mt-2">
            <label
              htmlFor=""
              className="text-[14px] font-[500] text-[#000000] "
            >
              End Date
            </label>
            <br />
            <input
              type="date"
              className="bg-[#FBFBFB] mt-2 px-3 w-full rounded-[9px]  text-[#000000] text-[16px] font-[400] h-[49px]  "
            />
          </div>
          <div>
            <div className="flex gap-3 items-center mt-3">
              <button className="bg-[#F0F0F0] w-[140px] text-[#6A6A6A] font-[600] text-[12px] rounded-[8px] p-3">
                Clear
              </button>
              <Button text={"Apply"} customClass={"w-[140px]"} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
