import React, { useState } from "react";
import {
  BorderSuccessIcon,
  RedAlertIcon,
  SuccessIcon,
} from "../../../assets/export";
import { IoCloseSharp } from "react-icons/io5";
import Modal from "react-modal";

export default function WithdrawSuccessModal({
  isSuccess,
  setIsSuccess,
  status,
  withdrawData,
  amount,
}) {
  const [isTransaction, setIsTransaction] = useState(false);

  if (!withdrawData) return null;

  const { referenceId, bankName, bankLast4, createdAt, userName } =
    withdrawData;

  return (
    <>
      {/* STATUS MODAL */}
      <Modal
        isOpen={isSuccess}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
        className="flex items-center justify-center outline-none"
        overlayClassName="fixed inset-0 bg-[#C6C6C6]/50 backdrop-blur-sm flex justify-center items-center"
      >
        <div className="bg-white rounded-[24px] py-8 px-6 shadow-lg w-[460px] flex flex-col gap-4 items-center">
          <div className="flex w-full justify-end">
            <IoCloseSharp
              size={22}
              className="cursor-pointer"
              onClick={() => {
                setIsSuccess(false);
                if (status === "approved") setIsTransaction(true);
              }}
            />
          </div>

          <img
            src={status === "rejected" ? RedAlertIcon : BorderSuccessIcon}
            className="w-[94px]"
          />

          <h3 className="text-[24px] font-[700] text-center">
            {status === "submitted"
              ? "Withdrawal Request Submitted"
              : status === "approved"
                ? "Withdrawal Approved"
                : "Withdrawal Rejected"}
          </h3>

          <p className="text-center text-[#3C3C43D9]">
            {status === "submitted" &&
              `Your withdrawal request of $${amount} has been submitted and is under review.`}

            {status === "approved" &&
              `Your withdrawal of $${amount} has been approved and sent to your bank account.`}

            {status === "rejected" &&
              `Your withdrawal request of $${amount} was rejected by admin.`}
          </p>
        </div>
      </Modal>

      {/* TRANSACTION DETAIL MODAL */}
      <Modal
        isOpen={isTransaction}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
        className="flex items-center justify-center outline-none"
        overlayClassName="fixed inset-0 bg-[#C6C6C6]/50 backdrop-blur-sm flex justify-center items-center"
      >
        <div className="bg-white rounded-[24px] py-8 px-6 shadow-lg w-[460px] text-center">
          <div className="flex w-full justify-end">
            <IoCloseSharp
              size={22}
              className="cursor-pointer"
              onClick={() => setIsTransaction(false)}
            />
          </div>

          <img src={SuccessIcon} className="w-[44px] mx-auto mb-4" />

          <h2 className="text-2xl font-bold mb-4">Withdraw Successful!</h2>

          <div className="space-y-2 text-center">
            <p className="text-[#959595] text-[13px]">Amount Withdrawn</p>
            <h3 className="text-2xl font-bold">${amount}</h3>

            <p className="text-[#959595] text-[13px]">Reference ID</p>
            <p className="font-[600]">{referenceId}</p>

            <p className="text-[#959595] text-[13px]">Name</p>
            <p className="capitalize font-[600]">{userName}</p>

            <p className="text-[#959595] text-[13px]">Date</p>
            <p className="font-[600]">{new Date(createdAt).toDateString()}</p>

            <p className="text-[#959595] text-[13px]">Type</p>
            <p className="font-[600] capitalize">Withdrawal</p>

            <p className="text-[#959595] text-[13px]">
              Direct to local bank account
            </p>
            <p className="font-[600]">
              {bankName} (**** {bankLast4})
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
}
