import React from "react";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router";
import Filter from "../../components/global/Filter";
import CustomersData from "../../components/app/Customer/CustomersData";

export default function Customers() {
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
          Customer
        </h3>
        <div className="flex items-center gap-4">
          <Filter hide={true} />
        </div>
      </div>
      <CustomersData />
    </div>
  );
}
