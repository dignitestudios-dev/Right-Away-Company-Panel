import { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { AiOutlineInfo } from "react-icons/ai";
import { SuccessIcon } from "../../assets/export";
import Button from "../global/Button";

export default function RequestStatus({ handleNext, ProfileStatus }) {
  const [status, setStatus] = useState(ProfileStatus || "submitted");
  // useEffect(() => {
  //   let timer1, timer2, timer3;

  //   // Step 1: After 1 second → pending
  //   timer1 = setTimeout(() => setStatus("pending"), 1000);

  //   // Step 2: After 2 seconds → rejected OR congratulation
  //   timer2 = setTimeout(() => {
  //     const isRejected = Math.random() < 0.5; // 50% chance (optional)
  //     setStatus(isRejected ? "rejected" : "congratulation");
  //   }, 2000);

  //   // Step 3: After 3 seconds → if congratulated, go next
  //   timer3 = setTimeout(() => {
  //     if (status === "congratulation" && handleNext) handleNext();
  //   }, 3000);

  //   return () => {
  //     clearTimeout(timer1);
  //     clearTimeout(timer2);
  //     clearTimeout(timer3);
  //   };
  // }, []);

  // const isSubmited = status === "submited";
  const isPending = status === "in-review";
  const isRejected = status === "rejected";
  const isCongratulation = status === "approved";

  return (
    <div className="w-full flex items-center justify-center">
      {/* ✅ Submitted */}
      {/* {isSubmited && (
        <div className="flex flex-col text-center items-center space-y-4">
          <div className="bg-[#0AA48B] text-white rounded-full w-12 h-12 flex items-center justify-center">
            <img src={SuccessIcon} className="w-8" alt="success" />
          </div>
          <h2 className="text-[32px] font-semibold text-gray-900">
            Profile Submitted!
          </h2>
          <p className="text-[16px] font-[400] text-[#505050] max-w-sm">
            Your profile has been submitted successfully. You will receive an
            email once your request has been approved by the admin.
          </p>
        </div>
      )} */}

      {/* ⏳ Pending */}
      {isPending && (
        <div className="flex flex-col text-center items-center space-y-4">
          <div className="bg-[#FFC107] text-white rounded-full w-12 h-12 flex items-center justify-center">
            <AiOutlineInfo size={28} />
          </div>
          <h2 className="text-[32px] font-semibold text-gray-900">
            Request In-Review!
          </h2>
          <p className="text-[16px] font-[400] text-[#505050] max-w-sm">
            You will receive an email once your request has been approved by the
            admin.
          </p>
        </div>
      )}

      {/* ❌ Rejected */}
      {isRejected && (
        <div className="flex flex-col text-center items-center space-y-6">
          <div className="bg-[#E53935] text-white rounded-full w-12 h-12 flex items-center justify-center">
            <IoIosCloseCircleOutline size={28} />
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-[32px] font-semibold text-gray-900">
              Request Rejected!
            </h2>
            <p className="text-[16px] font-[400] text-[#505050] ">
              Your profile has been rejected due to the following reasons:
            </p>
            <ul className="text-left text-sm text-gray-600 w-[460px] mt-4 space-y-2 list-decimal list-inside">
              <li>
                <b>Incomplete or Incorrect Details</b> – Missing or incorrect
                company name, contact, or address.
              </li>
              <li>
                <b>Missing/Invalid Documents</b> – Expired or unclear business
                licenses, tax documents, etc.
              </li>
              <li>
                <b>Unverified Business</b> – Non-registered or fake business
                details.
              </li>
              <li>
                <b>Duplicate Account</b> – Attempt to register the same business
                multiple times.
              </li>
              <li>
                <b>Non-Compliance</b> – Business does not meet platform
                guidelines.
              </li>
              <li>
                <b>Fraudulent Activity</b> – Suspicious registration attempts or
                fake details.
              </li>
            </ul>
          </div>
          <button
            onClick={() => setStatus("congratulation")}
            className="bg-[#0AA48B] mt-3 text-white px-8 py-2 rounded-full text-sm font-medium hover:bg-[#099179] transition"
          >
            Resubmit
          </button>
        </div>
      )}

      {/* 🎉 Congratulation */}
      {isCongratulation && (
        <div className="flex flex-col text-center items-center space-y-4">
          <div className="bg-[#0AA48B] text-white rounded-full w-12 h-12 flex items-center justify-center">
            <img src={SuccessIcon} className="w-8" alt="success" />
          </div>
          <h2 className="text-[32px] font-semibold text-gray-900">
            Congratulations!
          </h2>
          <p className="text-[16px] font-[400] text-[#505050] max-w-sm">
            Your request has been approved.
          </p>
          <Button
            onClick={() => handleNext()}
            text={"Get Started"}
            customClass={"w-[360px]"}
          />
        </div>
      )}
    </div>
  );
}
