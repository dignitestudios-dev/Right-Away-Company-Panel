import React, { useState } from "react";
import { BankFlagIcon, DeleteIcon, EditImg } from "../../../assets/export";
import Button from "../../global/Button";
import { useNavigate } from "react-router";
import DeleteBankModal from "./DeleteBankModal";

export default function BankDetail() {
  const navigate = useNavigate("");
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="py-2 px-2">
      <div className="flex items-center  gap-2 mb-6">
        <h1 className="text-[32px] font-semibold text-[#202224]">
          Payment Method
        </h1>
      </div>
      <div className="bg-[#EBEBEB] h-[400px] rounded-[16px] p-2">
        <div className="p-4">
          {/* Title */}
          <div className="flex items-center  justify-between">
            <h1 className="text-[32px] font-[500] text-[#181818] mb-4">
              Bank Account Details
            </h1>
            <Button
              onClick={() => navigate("/app/add-card")}
              text={"Add Bank"}
              customClass={"w-[180px]"}
            />
          </div>

          {/* Subtitle */}
          <h2 className="text-[16px] text-[#212935] font-medium mb-3">
            Attached Bank Account
          </h2>

          {/* Bank Card */}
          <div className="bg-[#FFFFFF] flex items-center py-2 justify-between rounded-[8px] px-4  shadow-sm">
            {/* Left side */}
            <div className="flex items-center gap-4">
              <img
                src={BankFlagIcon}
                alt="Bank Logo"
                className="w-10 h-10 object-contain"
              />
              <div>
                <h3 className="text-[15px] font-[500] text-[#000000]">
                  Bank Of America
                </h3>
                <p className="text-[#00000099] tracking-widest text-[14px] font-[400]">
                  ***** ***** **** 4684
                </p>
              </div>
            </div>

            {/* Right side icons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/app/edit-card")}
                className="text-green-600 hover:scale-110 transition"
              >
                <img
                  src={EditImg}
                  className="w-[20px] h-[20px]"
                  alt="EditIcon"
                />
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-red-600 hover:scale-110 transition"
              >
                <img
                  src={DeleteIcon}
                  className="w-[15px] h-[15px]"
                  alt="EditIcon"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <DeleteBankModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
