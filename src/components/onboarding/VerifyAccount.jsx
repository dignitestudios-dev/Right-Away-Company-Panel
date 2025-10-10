import React from "react";
import OtpForm from "../global/OtpForm";

export default function VerifyAccount({handleNext}) {
  return (
    <div className={`w-full py-10 px-28`}>
      {/* Form Content */}
      <div className="flex flex-col items-center gap-4">
        <h3 className="font-[600] text-[36px]">Verification</h3>
        <p className="text-[#838383] text-[16px] font-[400] ">
          Please enter OTP code sent to designer@dignitestudios.com
        </p>
      </div>
      <div className="flex justify-center w-full">
        <OtpForm handleNext={handleNext} />
      </div>
    </div>
  );
}
