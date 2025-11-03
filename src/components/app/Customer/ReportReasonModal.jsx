import { IoCloseSharp } from "react-icons/io5";
import Modal from "react-modal";
import { useState } from "react";
import Button from "../../global/Button";
import { ReviewSubmit } from "../../../assets/export"; // success icon/image

const ReportModal = ({ isOpen, setIsOpen }) => {
  const [step, setStep] = useState(1);
  const [selectedReason, setSelectedReason] = useState("");

  const reportReasons = [
    "False Information",
    "Offensive or Inappropriate Language",
    "Spam or Irrelevant Content",
    "Review Violates Guidelines",
    "Conflict of Interest",
  ];

  return (
    <Modal
      isOpen={isOpen}
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
      className="flex items-center justify-center border-none outline-none z-[1000]"
      overlayClassName="fixed inset-0 bg-[#C6C6C6] bg-opacity-50 backdrop-blur-sm z-[1000] flex justify-center items-center"
    >
      <div className="bg-white rounded-[24px] p-6 shadow-lg w-[460px]">
        {/* Step 1 - Select Reason */}
        {step === 1 && (
          <>
            <div className="flex justify-end items-center">
              <IoCloseSharp
                size={22}
                className="cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
            </div>
            <div className="flex flex-col  text-center items-center">
              <h3 className="font-[700] text-[24px] text-[#181818] mb-4">
                Report Reasons
              </h3>
              <div className="w-full mt-4 flex flex-col gap-3">
                {reportReasons.map((reason) => (
                  <label
                    key={reason}
                    className={`flex items-center gap-3 p-3 rounded-[12px] shadow-[0px_6px_20px_0px_#0000000A]
 cursor-pointer  ${
   selectedReason === reason
     ? "border-[#03958A] border bg-[#F3FCF8]"
     : ""
 }`}
                  >
                    <input
                      type="radio"
                      name="reportReason"
                      value={reason}
                      checked={selectedReason === reason}
                      onChange={() => setSelectedReason(reason)}
                      className=" w-4 h-4"
                    />
                    <span className="text-[14px] font-[400] text-[#000000]">
                      {reason}
                    </span>
                  </label>
                ))}
              </div>
              <Button
                text={"Submit"}
                customClass={"w-[385px] mt-5"}
                disabled={!selectedReason}
                onClick={() => setStep(2)}
              />
            </div>
          </>
        )}

        {/* Step 2 - Report Submitted */}
        {step === 2 && (
          <>
            <div className="flex justify-end items-center">
              <IoCloseSharp
                size={22}
                className="cursor-pointer"
                onClick={() => {
                  setStep(1);
                  setIsOpen(false);
                }}
              />
            </div>
            <div className="flex flex-col items-center text-center mt-5">
              <img
                src={ReviewSubmit}
                alt="Report Submitted"
                className="w-[157px] h-[118px]"
              />
              <h3 className="font-[700] text-[24px] text-[#000000] mt-4">
                Report Submitted,
                <br /> We Will Review Shortly
              </h3>
              <p className="text-[#3C3C43D9] text-[16px] font-[400] mt-2 max-w-[360px]">
                Thank you for submitting your report. Our team will review it,
                and you’ll be notified once a decision is made. We appreciate
                your cooperation.
              </p>
              <Button
                text={"Okay"}
                customClass={"w-[385px] mt-5"}
                onClick={() => {
                  setStep(1);
                  setSelectedReason("");
                  setIsOpen(false);
                }}
              />
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ReportModal;
