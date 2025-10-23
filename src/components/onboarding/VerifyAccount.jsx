import React from "react";
import OtpForm from "../global/OtpForm";
import { useSelector } from "react-redux";

export default function VerifyAccount({handleNext}) {
  const {company}=useSelector(state=>state?.auth)
  return (
    <div className={`w-full py-10 px-10 lg:px-28`}>
      {/* Form Content */}
      <div className="flex flex-col items-center gap-4">
        <h3 className="font-[600] text-[36px]">Verification</h3>
        <p className="text-[#838383] text-[16px] font-[400] ">
          Please enter OTP code sent to {company?.email}
        </p>
      </div>
      <div className="flex justify-center w-full">
        <OtpForm handleNext={handleNext} email={company?.email} />
      </div>
    </div>
  );
}
