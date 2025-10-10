import React, { useState } from "react";
import { AppleImage, GoogleImage, LoginBgTopShapes } from "../../assets/export";
import Input from "../global/Input";
import Button from "../global/Button";
import { useFormik } from "formik";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { RegisterSchema } from "../../schema/authentication/dummyLoginSchema";
import { RegisterAccount } from "../../init/authentication/dummyLoginValues";
import PrivacyPolicyModal from "../global/PrivacyPolicy";
import { useNavigate } from "react-router";
export default function CreateAccount({ handleNext, setEmail }) {
  const [mapCenter, setMapCenter] = useState({ lat: 38.7946, lng: 106.5348 });
  const [isPrivacy, setIsPrivacy] = useState(false);
  const navigate = useNavigate("");
  const [termCondition, setIsTermsCondition] = useState(false);
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: RegisterAccount,
      validationSchema: RegisterSchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async (values, action) => {
        handleNext();
        setEmail(values.email);
      },
    });
  return (
    <div className={`w-full py-10 px-28`}>
      {/* Form Content */}
      <div className="flex flex-col items-center gap-4">
        <h3 className="font-[600] text-[36px]">Create Your Company Account</h3>
        <p className="text-[#838383] text-[16px] font-[400] ">
          Register your business to start selling construction materials online.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-4  mt-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <Input
              text={"Business Name"}
              holder={"Enter business name"}
              type={"text"}
              touched={touched.businessName}
              handleChange={handleChange}
              name={"businessName"}
              error={errors.businessName}
              handleBlur={handleBlur}
            />
          </div>
          <div className="col-span-6">
            <Input
              text={"Business Email Address"}
              holder={"Enter Business Email Address"}
              type={"email"}
              touched={touched.email}
              handleChange={handleChange}
              name={"email"}
              error={errors.email}
              handleBlur={handleBlur}
            />
          </div>
          <div className="col-span-6">
            <Input
              text={"Business Phone Number"}
              holder={"Enter Business Phone Number"}
              type={"text"}
              touched={touched.phoneNumber}
              handleChange={handleChange}
              name={"phoneNumber"}
              error={errors.phoneNumber}
              handleBlur={handleBlur}
            />
          </div>
          <div className="col-span-6">
            <Input
              text={"Company Registration Number"}
              holder={"Enter Company Registration Number"}
              type={"text"}
              touched={touched.registerNumber}
              handleChange={handleChange}
              name={"registerNumber"}
              error={errors.registerNumber}
              handleBlur={handleBlur}
            />
          </div>
          <div className="col-span-12">
            <Input
              text={"Business Address"}
              holder={"Enter Business Address"}
              type={"text"}
              touched={touched.address}
              handleChange={handleChange}
              name={"address"}
              error={errors.address}
              handleBlur={handleBlur}
            />
          </div>
          <div className="col-span-12 h-[130px]">
            <GoogleMap
              center={mapCenter}
              zoom={10}
              mapContainerStyle={{
                width: "100%",
                height: "100%",
                borderRadius: "7px",
              }}
            >
              <Marker position={mapCenter} />
            </GoogleMap>
          </div>
          <div className="col-span-6">
            <Input
              text={"Password"}
              holder={"Enter password here"}
              type={"password"}
              touched={touched.password}
              handleChange={handleChange}
              name={"password"}
              hideText={true}
              error={errors.password}
              handleBlur={handleBlur}
            />
          </div>
          <div className="col-span-6">
            <Input
              text={"Confirm Password"}
              holder={"Re-enter password here"}
              type={"password"}
              touched={touched.reTypePassword}
              handleChange={handleChange}
              name={"reTypePassword"}
              hideText={true}
              error={errors.reTypePassword}
              handleBlur={handleBlur}
            />
          </div>
        </div>
        <Button
          text={"Sign Up"}
          type="submit"
          customClass={"w-[360px] mx-auto"}
        />
      </form>
      <div className="space-y-2 mt-2   ">
        <p className="text-[#484848] text-center text-[12px] font-[400] ">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/auth/login")}
            className="cursor-pointer gradient-text font-[600] text-[12px]"
          >
            Log In{" "}
          </span>
        </p>
        <p className="text-[#484848] text-center text-[12px] font-[400] ">
          I accept the
          <span
            onClick={() => setIsPrivacy(true)}
            className="gradient-text cursor-pointer ml-1 font-[600] text-[12px]"
          >
            Terms & conditions{" "}
          </span>
          and{" "}
          <span
            onClick={() => setIsTermsCondition(true)}
            className="gradient-text cursor-pointer ml-1 font-[600] text-[12px]"
          >
            Privacy policy{" "}
          </span>
        </p>
        <div className="flex w-full items-center rounded-full">
          <div className="flex-1 border-b border-gray-350" />
          <span className="text-[#484848] text-[20px] font-normal leading-8 px-3 ">
            Or
          </span>
          <div className="flex-1 border-b border-gray-350 " />
        </div>
        <div className="w-full grid grid-cols-2 items-center gap-4">
          <button className="bg-shadow flex items-center p-2 bg-[#FFFFFF]  rounded-full w-full h-12">
            <img src={GoogleImage} alt="" className="w-8" />
            <span className="mx-auto text-[14px] font-[500] text-[#181818]">
              Continue With Google
            </span>
          </button>
          <button className="bg-shadow flex items-center p-2 bg-[#FFFFFF]  rounded-full w-full h-12">
            <img src={AppleImage} alt="" className="w-8" />
            <span className="mx-auto text-[14px] font-[500] text-[#181818]">
              Continue With Apple
            </span>
          </button>
        </div>
      </div>
      <PrivacyPolicyModal isOpen={isPrivacy} setIsOpen={setIsPrivacy} />
      <PrivacyPolicyModal
        isOpen={termCondition}
        setIsOpen={setIsTermsCondition}
      />
    </div>
  );
}
