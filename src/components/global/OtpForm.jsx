import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router";
import { twoFactorValues } from "../../init/authentication/dummyLoginValues";
import { useDispatch, useSelector } from "react-redux";
import {
  ReSendOtpAccountVerification,
  SendOtpAccountVerification,
  VerifyEmail,
} from "../../redux/slices/authSlice";
import { SuccessToast } from "./Toaster";
import { FaSpinner } from "react-icons/fa";

export default function OtpForm({ handleNext }) {
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [timer, setTimer] = useState(60);
  const otpRefs = useRef([]);
  const navigate = useNavigate("");
  const [otp, setOtp] = useState(twoFactorValues.otp);
  const dispatch = useDispatch();
  const { isLoading,isResendLoading } = useSelector((state) => state?.auth);
  useEffect(() => {
    dispatch(SendOtpAccountVerification()).unwrap();
  }, []);

  useEffect(() => {
    let interval;
    if (isResendDisabled && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
      setIsResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [isResendDisabled, timer]);

    const handleResendClick = async () => {
      try {
        await dispatch(ReSendOtpAccountVerification()).unwrap();
        SuccessToast("OTP resent successfully.");
        setIsResendDisabled(true);
        setTimer(60);
        setOtp(twoFactorValues.otp);
      } catch (err) {
        console.error("Resend OTP failed:", err);
      }
    };

  const handleChange = (e, i) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value) && value !== "") return;

    const otpval = [...otp];
    if (value === "") {
      otpval[i] = "";
      setOtp(otpval);
      if (i > 0) {
        otpRefs.current[i - 1].focus();
      }
    } else {
      otpval[i] = value;
      setOtp(otpval);
      if (value && otpRefs.current[i + 1]) {
        otpRefs.current[i + 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (!pasted) return;

    const updatedOtp = [...otp];
    for (let i = 0; i < pasted.length; i++) {
      updatedOtp[i] = pasted[i];
      if (otpRefs.current[i]) {
        otpRefs.current[i].value = pasted[i];
      }
    }

    setOtp(updatedOtp);
    const nextIndex = Math.min(pasted.length, 5);
    if (otpRefs.current[nextIndex]) {
      otpRefs.current[nextIndex].focus();
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      otp: otp.join(""),
    };
    await dispatch(VerifyEmail(data)).unwrap();
    handleNext();
  };
  
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full space-y-4 lg:px-[60px] mt-4"
    >
      <div className="w-full h-auto flex justify-center items-center gap-2 my-2 flex-wrap">
        {otp.map((item, index) => (
          <input
            key={index}
            value={item}
            onChange={(e) => handleChange(e, index)}
            name="otp"
            className="flex-1 min-w-[40px] max-w-[80px] h-[70px] rounded-[16px] bg-transparent outline-none text-center border border-[#c2c6cb] text-3xl focus:bg-[#D0FCB333] focus-within:border-[#3C043A]"
            maxLength={1}
            onPaste={handlePaste}
            ref={(el) => (otpRefs.current[index] = el)} // Set ref for each input
          />
        ))}
      </div>
      <div className="w-full  flex gap-1 justify-center items-center">
        <span className="text-[14px] font-medium text-[#565656]">
          Didn't receive a code?
        </span>
        <button
          type="button"
          onClick={handleResendClick}
          disabled={isResendDisabled}
          className={`${isResendDisabled?"cursor-not-allowed":""} outline-none text-[14px] flex items-center gap-2 border-none gradient-text font-[600]`}
        >
          {isResendDisabled ? `Resend in ${timer}s` : "Resend now"}{" "}
          {isResendLoading && <FaSpinner className="animate-spin text-[#22B573]" />}
        </button>
      </div>
      <Button
        text={"Verify"}
        loading={isLoading}
        type="submit"
        customClass={"w-full"}
      />
    </form>
  );
}
