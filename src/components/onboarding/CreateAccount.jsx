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
import { useDispatch, useSelector } from "react-redux";
import { Register, SocialLogin } from "../../redux/slices/authSlice";
import { signInWithPopup } from "firebase/auth";
import { appleProvider, auth, googleProvider } from "../../firebase/firebase";
import getFCMToken from "../../firebase/getFcmToken";
import TermsConditionModal from "../global/TermsCondition";
export default function CreateAccount({ handleNext, setEmail }) {
  const [mapCenter, setMapCenter] = useState({ lat: 38.7946, lng: 106.5348 });
  const [isPrivacy, setIsPrivacy] = useState(false);
  const navigate = useNavigate("");
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state?.auth);
  const [termCondition, setIsTermsCondition] = useState(false);
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: RegisterAccount,
      validationSchema: RegisterSchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async (values, action) => {
        setEmail(values.email);
        await dispatch(Register(values)).unwrap();
        handleNext();
      },
    });
  const handleGoogleLogin = async () => {
    try {
      // Sign in with Google popup
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      const fcmToken = await getFCMToken();

      // Prepare payload
      const payload = {
        idToken,
        role: "company",
        fcmToken: fcmToken,
      };
      console.log(payload, "payload,");

      await dispatch(SocialLogin(payload)).unwrap();
      // Navigate after successful login
      navigate("/app/dashboard");
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const handleAppleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, appleProvider);
      const idToken = await result.user.getIdToken();
      const fcmToken = await getFCMToken();
      // Prepare payload
      const payload = {
        idToken,
        role: "company",
        fcmToken: fcmToken,
      };
      console.log(payload, "payload,");

      await dispatch(SocialLogin(payload)).unwrap();
      // Navigate after successful login
      navigate("/app/dashboard");
    } catch (error) {
      console.error("Apple login error:", error);
    }
  };
  return (
    <div className={`w-full py-10 px-10 xl:px-28`}>
      {/* Form Content */}
      <div className="flex flex-col items-center gap-4">
        <h3 className="font-[600] text-[20px] md:text-[36px]">
          Create Your Company Account
        </h3>
        <p className="text-[#838383]  text-[12px] md:text-[16px] font-[400] ">
          Register your business to start selling construction materials online.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-4  mt-4">
        <div className="grid  lg:grid-cols-12 gap-4">
          <div className="xl:col-span-6 col-span-12">
            <Input
              text={"Business Name"}
              holder={"Enter business name"}
              type={"text"}
              touched={touched.businessName}
              handleChange={handleChange}
              name={"businessName"}
              error={errors.businessName}
              handleBlur={handleBlur}
              maxLength={100}
            />
          </div>
          <div className="xl:col-span-6 col-span-12">
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
          <div className="xl:col-span-6 col-span-12">
            <Input
              text={"Business Phone Number"}
              holder={"Enter Business Phone Number"}
              type={"text"}
              touched={touched.phoneNumber}
              handleChange={(e) => {
                // allow only digits
                const value = e.target.value.replace(/\D/g, "");

                // limit to 10 digits
                if (value.length <= 10) {
                  e.target.value = value;
                  handleChange(e);
                }
              }}
              name={"phoneNumber"}
              error={errors.phoneNumber}
              handleBlur={handleBlur}
              maxLength={10} // 🔥 required!
            />
          </div>
          <div className="xl:col-span-6 col-span-12">
            <Input
              text={"Company Registration Number"}
              holder={"Enter Company Registration Number"}
              type={"text"}
              touched={touched.registerNumber}
              handleChange={(e) => {
                // remove non-digit characters
                const value = e.target.value.replace(/\D/g, "");
                e.target.value = value;

                if (value.length <= 10) handleChange(e);
              }}
              name={"registerNumber"}
              error={errors.registerNumber}
              handleBlur={handleBlur}
              maxLength={10}
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
          <div className="xl:col-span-6 col-span-12">
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
              maxLength={8}
            />
          </div>
          <div className="xl:col-span-6 col-span-12">
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
              maxLength={8}
            />
          </div>
        </div>
        <Button
          text={"Sign Up"}
          type="submit"
          loading={isLoading}
          customClass={"w-full md:w-[360px] mx-auto"}
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
        <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-4">
          <button
            onClick={handleGoogleLogin}
            className="bg-shadow flex items-center p-2 bg-[#FFFFFF]  rounded-full w-full h-12"
          >
            <img src={GoogleImage} alt="" className="w-8" />
            <span className="mx-auto text-[14px] font-[500] text-[#181818]">
              Continue With Google
            </span>
          </button>
          <button
            onClick={handleAppleLogin}
            className="bg-shadow flex items-center p-2 bg-[#FFFFFF]  rounded-full w-full h-12"
          >
            <img src={AppleImage} alt="" className="w-8" />
            <span className="mx-auto text-[14px] font-[500] text-[#181818]">
              Continue With Apple
            </span>
          </button>
        </div>
      </div>
      <PrivacyPolicyModal
        isOpen={termCondition}
        setIsOpen={setIsTermsCondition}
      />
      <TermsConditionModal isOpen={isPrivacy} setIsOpen={setIsPrivacy} />
    </div>
  );
}
