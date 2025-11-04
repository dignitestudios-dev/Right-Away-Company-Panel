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
  selectOptions = [], // ✅ Renamed for select inputs
  options = [], // for radio buttons
  bg,
  disabled
}) {
  const [isPassVisible, setIsPassVisible] = useState(true);

  // 🟢 Radio Input
  if (type === "radio") {
    return (
      <div className="w-full flex flex-col gap-2">
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
        {error && touched && (
          <p className="text-red-700 text-sm font-medium">{error}</p>
        )}
      </div>
    );
  }

  // 🟢 Select Input
  if (type === "select") {
    return (
      <div className="w-full flex flex-col gap-1">
        <label htmlFor={name} className="font-[700] capitalize text-[12px]">
          {text}
        </label>
        <div
          className={`h-[49px] flex justify-start items-center w-full relative border-[0.8px] rounded-[18px] px-3 bg-white ${
            error && touched ? "border-red-500" : "border-[#D9D9D9]"
          }`}
        >
          <select
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full bg-transparent outline-none text-[16px] text-[#262626]"
          >
            <option value="">{holder || "Select Option"}</option>
            {selectOptions.map((opt, idx) => (
              <option key={idx} value={opt.value || opt}>
                {opt.label || opt}
              </option>
            ))}
          </select>
        </div>
        {error && touched && (
          <p className="text-red-700 text-sm font-medium">{error}</p>
        )}
      </div>
    );
  }

  // 🟢 Textarea Input
  if (type === "textarea") {
    return (
      <div className="w-full flex flex-col gap-1">
        <label htmlFor={name} className="font-[700] capitalize text-[12px]">
          {text}
        </label>
        <div
          className={`h-[80px] flex bg-white justify-start items-start w-full relative border-[0.8px] rounded-[18px] ${
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
        {error && touched && (
          <p className="text-red-700 text-sm font-medium">{error}</p>
        )}
      </div>
    );
  }

  // 🟢 Default Text / Password Input
  return (
    <div className="w-full flex flex-col gap-1">
      <div className="flex justify-between items-center">
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

      <div
        className={`h-[49px] flex justify-start items-center w-full relative border-[0.8px] rounded-[18px] ${
          bg ? "bg-[#F8F8F899] border-none" : "bg-white"
        } ${error && touched ? "border-red-500" : "border-[#D9D9D9]"}`}
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
          disabled={disabled}
          className={`w-full h-[49px] bg-transparent outline-none px-3 text-[16px] text-[#262626] placeholder:text-[#959393] ${disabled&&"cursor-not-allowed"}`}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setIsPassVisible((prev) => !prev)}
            className="absolute right-3 text-[#959393]"
          >
            {isPassVisible ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        )}
      </div>
      {error && touched && (
        <p className="text-red-700 text-sm text-start font-medium">{error}</p>
      )}
    </div>
  );
}
