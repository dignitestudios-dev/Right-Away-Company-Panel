import { twoFactorValues } from "../../init/authentication/dummyLoginValues";
import { LoginBgTopShapes } from "../../assets/export";
import Button from "../../components/global/Button";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router";

const TwoFactorAuthentication = () => {
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [timer, setTimer] = useState(60);
  const otpRefs = useRef([]);
  const navigate = useNavigate("");
  const [otp, setOtp] = useState(twoFactorValues.otp);
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

  //   const handleResendClick = async () => {
  //     const data = { email: email };
  //     try {
  //       await dispatch(ResentOtp(data)).unwrap();
  //       SuccessToast("OTP resent successfully.");
  //       setIsResendDisabled(true);
  //       setTimer(60);
  //       setOtp(emailVerificationValues.otp);
  //     } catch (err) {
  //       console.error("Resend OTP failed:", err);
  //     }
  //   };

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

  return (
    <div className={`grid grid-cols-1  h-full w-full lg:grid-cols-2`}>
      <div className=" md:px-5 pb-5 flex flex-col justify-end"></div>
      <div className="w-full md:px-20">
        <div
          className={`bg-white relative flex justify-center flex-col items-center h-full backdrop-blur-[34px] rounded-[28px]`}
        >
          <button
            className="absolute top-8 left-8"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="text-[#22B573]" size={25} />
          </button>
          {/* Bg Image */}
          <img
            src={LoginBgTopShapes}
            className="h-full absolute z-[-1] right-0"
            alt="LoginBgTopShapes"
          />
          {/* Form Content */}
          <div className="flex flex-col items-center gap-2">
            <h3 className="font-[600] text-[36px]">
              Two Factor Authentication
            </h3>
            <p className="text-[#838383] text-[16px] font-[400] ">
              Please enter OTP code sent to designer@dignitestudios.com
            </p>
          </div>

          <form className="w-full space-y-4 md:w-[360px] mt-4">
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
                className="outline-none text-[14px] flex items-center gap-2 border-none gradient-text font-[600]"
              >
                {isResendDisabled ? `Resend in ${timer}s` : "Resend now"}{" "}
                {/* {isResendLoading && <FaSpinner className="animate-spin" />} */}
              </button>
            </div>
            <Button
              text={"Verify"}
            //   onClick={() => navigate("")}
              type="button"
              customClass={"w-full"}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorAuthentication;
