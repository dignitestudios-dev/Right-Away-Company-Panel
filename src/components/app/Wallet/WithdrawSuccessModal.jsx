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
}) {
  const [isTransaction, setIsTransaction] = useState(false);
  return (
    <>
      <Modal
        isOpen={isSuccess}
        contentLabel="Success"
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
        className="flex items-center justify-center border-none outline-none z-[1000]"
        overlayClassName="fixed inset-0 bg-[#C6C6C6]/50 backdrop-blur-sm z-[1000] flex justify-center items-center"
      >
        {(status === "submited" ||
          status === "approved" ||
          status === "reject") && (
          <div className="bg-white rounded-[24px] py-8 flex flex-col gap-4 justify-center items-center px-6 shadow-lg w-[460px]">
            {/* Close Button */}
            <div className="flex w-full justify-end items-center">
              <IoCloseSharp
                size={22}
                className="cursor-pointer"
                onClick={() => {
                  setIsSuccess(false);
                  if (status === "approved") {
                    setIsTransaction(true);
                  }
                }}
              />
            </div>

            {/* Icon */}
            <img
              src={
                status === "submited" || status === "approved"
                  ? BorderSuccessIcon
                  : RedAlertIcon
              }
              alt="Status Icon"
              className="w-[94px]"
            />

            {/* Title */}
            <h3 className="font-[700] text-[24px] text-[#000000] text-center">
              {status === "submited"
                ? "Withdrawal Request Submitted"
                : status === "approved"
                ? "Withdrawal Request Approved"
                : "Withdrawal Request Rejected"}
            </h3>

            {/* Message */}
            <p className="text-[#3C3C43D9] font-[400] text-[16px] text-center leading-relaxed">
              {status === "submited" &&
                `Your withdrawal request of $2,500 has been submitted successfully. It is currently under review by the admin team. You will be notified once it is processed.`}

              {status === "approved" &&
                `Your withdrawal request of $2,500 has been approved. The funds have been transferred to your registered bank account (Bank of America - XXXX1234). Please allow 1–3 business days for processing.`}

              {status === "reject" &&
                `Your withdrawal request of $2,500 has been rejected. 
        Reason: Insufficient account balance / Invalid bank details (Admin specified reason here).`}
            </p>
          </div>
        )}
      </Modal>
      <Modal
        isOpen={isTransaction}
        contentLabel="Success"
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
        className="flex items-center justify-center border-none outline-none z-[1000]"
        overlayClassName="fixed inset-0 bg-[#C6C6C6]/50 backdrop-blur-sm z-[1000] flex justify-center items-center"
      >
        <div className="bg-white text-center rounded-[24px] py-8 flex flex-col gap-4 justify-center items-center px-6 shadow-lg w-[460px]">
          {/* Close Button */}
          <div className="flex w-full justify-end items-center">
            <IoCloseSharp
              size={22}
              className="cursor-pointer"
              onClick={() => setIsTransaction(false)}
            />
          </div>

          {/* Icon */}
          <img src={SuccessIcon} alt="Status Icon" className="w-[44px]" />
          {/* Title */}
          <h2 className="text-2xl font-bold text-center mb-2">
            Withdraw Successfully!
          </h2>
          <div>
            <span className="capitalize text-[#959595] text-[13px] font-[500]">
              amount withdraw
            </span>
            <h2 className="text-2xl font-bold text-center">USD $2500!</h2>
          </div>
          <div>
            <span className="capitalize text-[#959595] text-[13px] font-[500]">
              reference ID
            </span>
            <h2 className="text-[15px] font-[600] text-center">
              9621486393454
            </h2>
            <span className="capitalize text-[#959595] text-[13px] font-[500]">
              name
            </span>
            <h2 className="text-[15px] capitalize font-[600] text-center">
              olivia james
            </h2>
            <span className="capitalize text-[#959595] text-[13px] font-[500]">
              date
            </span>
            <h2 className="text-[15px] capitalize font-[600] text-center">
              wed, 10 jan
            </h2>
            <span className="capitalize text-[#959595] text-[13px] font-[500]">
              type
            </span>
            <h2 className="text-[15px] capitalize font-[600] text-center">
              withdrawal
            </h2>
            <span className="capitalize text-[#959595] text-[13px] font-[500]">
              direct to local bank account
            </span>
            <h2 className="text-[15px] capitalize font-[600] text-center">
              (**** **** ****499)
            </h2>
          </div>
        </div>
      </Modal>
    </>
  );
}
