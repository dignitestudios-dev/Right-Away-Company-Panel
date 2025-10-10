import React from "react";
import Input from "../../components/global/Input";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { forgetPasswordSchema } from "../../schema/authentication/dummyLoginSchema";
import { forgetPasswordValues } from "../../init/authentication/dummyLoginValues";
import { LoginBgTopShapes } from "../../assets/export";
import Button from "../../components/global/Button";
import { FaArrowLeft } from "react-icons/fa6";

export default function ForgotPassword() {
  const navigate = useNavigate("");
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: forgetPasswordValues,
      validationSchema: forgetPasswordSchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async (values, action) => {
        navigate("/auth/otp-verification");
        // Use the loading state to show loading spinner
        // Use the response if you want to perform any specific functionality
        // Otherwise you can just pass a callback that will process everything
      },
    });
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
            <h3 className="font-[600] text-[36px]">Forgot Password</h3>
            <p className="text-[#838383] text-[16px] font-[400] ">
              Please enter your registered email address.
            </p>
          </div>

          <form action="" className="w-full space-y-4 md:w-[360px] mt-4">
            <Input
              text={"Email Address"}
              holder={"Enter email address"}
              type={"email"}
              touched={touched.email}
              handleChange={handleChange}
              name={"email"}
              error={errors.email}
              handleBlur={handleBlur}
            />
            <Button
              text={"Send Otp"}
              onClick={handleSubmit}
              type="submit"
              customClass={"w-full"}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
