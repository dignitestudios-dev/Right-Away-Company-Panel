import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { PhoneNumberImage } from "../../assets/export";
import { NavLink } from "react-router";

export default function Input({
  text,
  name,
  type,
  holder,
  value,
  handleChange,
  handleBlur,
  error,
  touched,
  maxLength,
  hideText,
  options = [], // 👈 new for radio buttons
}) {
  const [isPassVisible, setIsPassVisible] = useState(true);

  // 🧩 Handle Radio Input
  if (type === "radio") {
    return (
      <div className="w-full h-auto flex flex-col justify-start items-start gap-2">
        <label className="font-[700] capitalize text-[12px]">{text}</label>
        <div className="flex flex-col space-y-2">
          {options.map((option, idx) => (
            <label
              key={idx}
              className="flex items-center gap-2 cursor-pointer text-[15px] text-[#262626]"
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={handleChange}
                className="accent-[#0AA48B] w-4 h-4"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
        {error && touched ? (
          <p className="text-red-700 text-sm font-medium">{error}</p>
        ) : null}
      </div>
    );
  }

  // 🧩 Handle Textarea / Normal Inputs (same as before)
  return (
    <div className="w-full h-auto flex flex-col justify-start items-start gap-1">
      <div className="flex w-full justify-between items-center">
        <label htmlFor={name} className="font-[700] capitalize text-[12px]">
          {text}
        </label>
        {type === "password" && !hideText && (
          <NavLink
            to={"/auth/forgot-password"}
            className="text-[#0084FF] text-[12px] font-[400]"
          >
            Forgot Password?
          </NavLink>
        )}
      </div>

      {type === "textarea" ? (
        <>
          <div
            className={`h-[80px] flex justify-start bg-[#FFFFFF] items-start w-full relative border-[0.8px] rounded-[18px] ${
              error && touched ? "border-red-500" : "border-[#D9D9D9]"
            }`}
          >
            <textarea
              id={name}
              name={name}
              maxLength={maxLength}
              value={value}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={holder}
              className="w-full resize-none h-[80px] py-2 px-3 bg-transparent outline-none text-[#262626] text-[16px] placeholder:text-[#959393]"
            />
          </div>
          {error && touched ? (
            <p className="text-red-700 text-sm font-medium">{error}</p>
          ) : null}
        </>
      ) : (
        <>
          <div
            className={`h-[49px] flex justify-start bg-[#FFFFFF] items-start w-full relative border-[0.8px] rounded-[18px] ${
              error && touched ? "border-red-500" : "border-[#D9D9D9]"
            }`}
          >
            {text?.includes("Phone Number") && (
              <img
                src={PhoneNumberImage}
                className="w-[80px] h-[100%] ml-2"
                alt="PhoneNumberImage"
              />
            )}

            <input
              type={isPassVisible ? type : "text"}
              id={name}
              name={name}
              maxLength={maxLength}
              value={value}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={holder}
              className="w-full h-[49px] bg-transparent outline-none px-3 text-[16px] text-[#262626] placeholder:text-[#959393]"
            />

            {type === "password" && (
              <button
                type="button"
                onClick={() => setIsPassVisible((prev) => !prev)}
                className="w-[10%] h-full bg-transparent text-md text-[#959393] flex items-center justify-center"
              >
                {isPassVisible ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            )}
          </div>
          {error && touched ? (
            <p className="text-red-700 text-sm font-medium">{error}</p>
          ) : null}
        </>
      )}
    </div>
  );
}
