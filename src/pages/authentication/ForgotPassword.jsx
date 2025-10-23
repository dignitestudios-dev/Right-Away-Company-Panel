import React from "react";
import Input from "../../components/global/Input";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { forgetPasswordSchema } from "../../schema/authentication/dummyLoginSchema";
import { forgetPasswordValues } from "../../init/authentication/dummyLoginValues";
import { LoginBgTopShapes } from "../../assets/export";
import Button from "../../components/global/Button";
import { FaArrowLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword } from "../../redux/slices/authSlice";

export default function ForgotPassword() {
  const navigate = useNavigate("");
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: forgetPasswordValues,
      validationSchema: forgetPasswordSchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async (values, action) => {
        const data = {
          email: values?.email,
          role: "company",
        };
        await dispatch(forgetPassword(data)).unwrap();
        navigate("/auth/otp-verification",{state:{email:values?.email}});        
      },
    });
  return (
    <div className={`grid grid-cols-1  h-full w-full xl:grid-cols-2`}>
      <div className=" md:px-5 pb-5 flex flex-col justify-end"></div>
      <div className="w-full px-10 lg:px-20">
        <div
          className={`bg-white px-10 py-5  relative  flex justify-center flex-col items-center h-full backdrop-blur-[34px] rounded-[28px]`}
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

          <form onSubmit={handleSubmit} className="w-full lg:px-[60px] space-y-4 mt-4">
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
              type="submit"
              loading={isLoading}
              customClass={"w-full"}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
