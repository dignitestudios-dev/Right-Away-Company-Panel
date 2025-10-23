import React from "react";
import Button from "../../components/global/Button";
import Input from "../../components/global/Input";
import { FaArrowLeft } from "react-icons/fa6";
import { useFormik } from "formik";
import { resetPasswordValues } from "../../init/authentication/dummyLoginValues";
import { resetPasswordSchema } from "../../schema/authentication/dummyLoginSchema";
import { useNavigate } from "react-router";
import { LoginBgTopShapes } from "../../assets/export";

export default function ResetPassword() {
  const navigate = useNavigate("");
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: resetPasswordValues,
      validationSchema: resetPasswordSchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async (values, action) => {
        navigate("/auth/password-updated");
        // Use the loading state to show loading spinner
        // Use the response if you want to perform any specific functionality
        // Otherwise you can just pass a callback that will process everything
      },
    });
  return (
    <div className={`grid grid-cols-1  h-full w-full xl:grid-cols-2`}>
      <div className=" md:px-5 pb-5 flex flex-col justify-end"></div>
      <div className="w-full px-10 lg:px-20">
        <div
          className={`bg-white px-10 py-5  relative flex justify-center flex-col items-center h-full backdrop-blur-[34px] rounded-[28px]`}
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
            <h3 className="font-[600] text-[36px]">Set New Password</h3>
            <p className="text-[#838383] text-[16px] font-[400] ">
             Enter new password to reset.
            </p>
          </div>

          <form action="" className="w-full space-y-4 lg:px-[60px] mt-4">
            <Input
              text={"Password"}
              holder={"Enter Password"}
              type={"password"}
              touched={touched.password}
              handleChange={handleChange}
              name={"password"}
              error={errors.password}
              handleBlur={handleBlur}
              hideText={true}
            />
            <Input
              text={"Confirm Password"}
              holder={"Enter Confirm Password"}
              type={"password"}
              touched={touched.confirmPassword}
              handleChange={handleChange}
              name={"confirmPassword"}
              error={errors.confirmPassword}
              handleBlur={handleBlur}
              hideText={true}
            />
            <Button
              text={"Update"}
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
