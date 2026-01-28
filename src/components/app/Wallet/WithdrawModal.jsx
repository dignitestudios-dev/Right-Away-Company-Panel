import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import Modal from "react-modal";
import Button from "../../global/Button";
import WithdrawSuccessModal from "./WithdrawSuccessModal";
import { useDispatch, useSelector } from "react-redux";
import { withdrawFunds } from "../../../redux/slices/AppSlice";
import { ErrorToast } from "../../global/Toaster";
export default function WithdrawModal({ isOpen, setIsOpen }) {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const [selectedBank, setSelectedBank] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const { Banks } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.app);

  const [withdrawData, setWithdrawData] = useState(null); // add this

  const handleWithdraw = async () => {
    if (!amount || Number(amount) <= 0) {
      ErrorToast("Please enter a valid amount");
      return;
    }

    if (!selectedBank) {
      ErrorToast("Please select a bank account");
      return;
    }

    const result = await dispatch(
      withdrawFunds({
        ammount: Number(amount),
        bankAccount: selectedBank._id,
      }),
    );

    if (withdrawFunds.fulfilled.match(result)) {
      setWithdrawData(result.payload); // <-- store API response here
      setIsSuccess(true);
      setIsOpen(false);
      setSelectedBank(null);
    } else {
      alert(result.payload || "Withdrawal failed");
    }
  };
  console.log(withdrawData);
  return (
    <>
      <Modal
        isOpen={isOpen}
        className="flex items-center justify-center border-none outline-none z-[1000]"
        overlayClassName="fixed inset-0 bg-[#C6C6C6]/50 backdrop-blur-sm z-[1000] flex justify-center items-center"
      >
        <div className="bg-white rounded-[12px] p-6 shadow-lg w-[461px]">
          {/* Close Button */}
          <div className="flex justify-end">
            <IoCloseSharp
              size={22}
              className="cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-semibold text-center mb-6">Withdraw</h2>

          {/* Bank Accounts */}
          <div className="mb-4">
            <p className="text-[12px] text-[#181919] mb-2">
              Attached Bank Account
            </p>

            {Banks?.map((item) => (
              <div
                key={item._id}
                onClick={() => setSelectedBank(item)}
                className={`w-full mt-2 rounded-[8px] py-3 px-4 text-[14px] cursor-pointer
                ${
                  selectedBank?._id === item._id
                    ? "bg-black text-white"
                    : "bg-[#ECE8E8] text-[#202020]"
                }`}
              >
                {item.bankName} •••• {item.accountNumber?.slice(-4)}
              </div>
            ))}
          </div>

          {/* Amount */}
          <div className="mb-4">
            <label className="text-sm font-[400]">Enter Amount</label>
            <input
              type="number"
              placeholder="$20"
              value={amount}
              onChange={(e) =>
                e.target.value === "" || Number(e.target.value) > 0
                  ? setAmount(e.target.value)
                  : null
              }
              className="w-full border border-[#181818] rounded-xl px-4 py-3 mt-1 focus:outline-none"
            />
          </div>

          {/* Button */}
          <Button
            onClick={handleWithdraw}
            text={isLoading ? "Processing..." : "Request Withdraw"}
            customClass={"w-full"}
            disabled={isLoading}
          />
        </div>
      </Modal>

      {/* Success Modal */}
      <WithdrawSuccessModal
        isSuccess={isSuccess}
        amount={amount}
        setIsSuccess={setIsSuccess}
        status={withdrawData?.status || "submitted"} // or approved/rejected from API
        withdrawData={withdrawData}
      />
    </>
  );
}
