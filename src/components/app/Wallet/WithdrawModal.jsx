import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import Modal from "react-modal";
import Button from "../../global/Button";
import WithdrawSuccessModal from "./WithdrawSuccessModal";
export default function WithdrawModal({ isOpen, setIsOpen }) {
  const [amount, setAmount] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const handleChange = (e) => {
    const value = e.target.value;
    if (value === "" || Number(value) > 0) setAmount(value);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        className="flex items-center justify-center border-none outline-none z-[1000]"
        overlayClassName="fixed inset-0 bg-[#C6C6C6]/50 backdrop-blur-sm z-[1000] flex justify-center items-center"
      >
        <div className="bg-white rounded-[12px] p-6 shadow-lg w-[461px]">
          {/* Close Button */}
          <div className="flex justify-end items-center">
            <IoCloseSharp
              size={22}
              className="cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-semibold text-center mb-6">Withdraw</h2>

          {/* Bank Account */}
          <div className="mb-2">
            <p className="text-[12px] text-[#181919] mb-1">
              Attached Bank Account
            </p>
            <div className="w-full rounded-[8px] bg-[#ECE8E8] text-[#202020] py-3 px-4 text-[16px] text-start tracking-widest font-[400]">
              **** **** **** **** 499
            </div>
          </div>

          {/* Withdraw Section */}
          <div className="mb-2">
            <p className="font-semibold text-lg mb-4">Withdraw Funds</p>
            <label className="text-sm text-[#1C1B1F] font-[400]">
              Enter Amount
            </label>
            <input
              type="number"
              placeholder="$20"
              value={amount}
              onChange={handleChange}
              className="w-full border border-[#181818] rounded-xl px-4 py-3 mt-1 focus:outline-none focus:border-gray-500"
            />
          </div>

          {/* Button */}
          <Button
            onClick={() => {
              setIsSubmit(true);
              setIsOpen(false);
            }}
            text={"Request Withdraw"}
            customClass={"w-full mt-4"}
          />
        </div>
      </Modal>

      <WithdrawSuccessModal
        status={"approved"}
        isSuccess={isSubmit}
        setIsSuccess={setIsSubmit}
      />
    </>
  );
}
