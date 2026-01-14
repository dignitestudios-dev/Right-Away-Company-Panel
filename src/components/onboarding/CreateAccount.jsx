import React, { useState } from "react";
import { AppleImage, GoogleImage } from "../../assets/export";
import Input from "../global/Input";
import Button from "../global/Button";
import { useFormik } from "formik";
import { GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state?.auth);

  const [autocomplete, setAutocomplete] = useState(null);
  const [isPrivacy, setIsPrivacy] = useState(false);
  const [termCondition, setIsTermsCondition] = useState(false);

  // 📍 Map + Coordinates
  const [mapCenter, setMapCenter] = useState({
    lat: 37.7749,
    lng: -122.4194,
  });

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      ...RegisterAccount,
      latitude: "",
      longitude: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      const payload = {
        ...values,
        coordinates: [values.longitude, values.latitude], // GeoJSON
        type: "Point",
      };

      setEmail(values.email);
      await dispatch(Register(payload)).unwrap();
      handleNext();
    },
  });

  const handleSocialLogin = async (provider) => {
    try {
      // Sign in with popup
      const result = await signInWithPopup(auth, provider);

      // Get Firebase ID token
      const idToken = await result.user.getIdToken();

      // Get FCM token
      const fcmToken = await getFCMToken();

      // Prepare payload
      const payload = {
        idToken,
        role: "company",
        fcmToken,
      };

      console.log(payload, "payload");

      // Dispatch login action
      await dispatch(SocialLogin(payload)).unwrap();

      // Navigate after successful login
      navigate("/app/dashboard");
    } catch (error) {
      console.error("Social login error:", error);
    }
  };
  const handleGoogleLogin = () => handleSocialLogin(googleProvider);
  const handleAppleLogin = () => handleSocialLogin(appleProvider);

  return (
    <div className="w-full py-10 px-10 xl:px-28">
      {/* Header */}
      <div className="flex flex-col items-center gap-4">
        <h3 className="font-[600] text-[20px] md:text-[36px]">
          Create Your Company Account
        </h3>
        <p className="text-[#838383] text-[12px] md:text-[16px]">
          Register your business to start selling construction materials online.
        </p>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <div className="grid lg:grid-cols-12 gap-4">
          {/* Business Name */}
          <div className="xl:col-span-6 col-span-12">
            <Input
              text="Business Name"
              holder="Enter business name"
              name="businessName"
              touched={touched.businessName}
              error={errors.businessName}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
          </div>

          {/* Email */}
          <div className="xl:col-span-6 col-span-12">
            <Input
              text="Business Email Address"
              type="email"
              name="email"
              touched={touched.email}
              error={errors.email}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
          </div>

          {/* Phone */}
          <div className="xl:col-span-6 col-span-12">
            <Input
              text="Business Phone Number"
              name="phoneNumber"
              touched={touched.phoneNumber}
              error={errors.phoneNumber}
              maxLength={10}
              handleChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                if (value.length <= 10) {
                  e.target.value = value;
                  handleChange(e);
                }
              }}
              handleBlur={handleBlur}
            />
          </div>

          {/* Register Number */}
          <div className="xl:col-span-6 col-span-12">
            <Input
              text="Company Registration Number"
              name="registerNumber"
              touched={touched.registerNumber}
              error={errors.registerNumber}
              handleChange={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
                handleChange(e);
              }}
              handleBlur={handleBlur}
            />
          </div>

          {/* 📍 Address with Places */}
          <div className="col-span-12">
            <Autocomplete
              onLoad={setAutocomplete}
              onPlaceChanged={() => {
                if (!autocomplete) return;
                const place = autocomplete.getPlace();
                if (!place.geometry) return;

                const lat = place.geometry.location.lat();
                const lng = place.geometry.location.lng();

                setMapCenter({ lat, lng });
                setFieldValue("address", place.formatted_address);
                setFieldValue("latitude", lat);
                setFieldValue("longitude", lng);
              }}
            >
              <Input
                text="Business Address"
                holder="Search business address"
                name="address"
                value={values.address}
                touched={touched.address}
                error={errors.address}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
            </Autocomplete>
          </div>

          {/* 🗺️ Map */}
          <div className="col-span-12 h-[130px]">
            <GoogleMap
              center={mapCenter}
              zoom={14}
              mapContainerStyle={{
                width: "100%",
                height: "100%",
                borderRadius: "7px",
              }}
            >
              <Marker
                position={mapCenter}
                draggable
                onDragEnd={(e) => {
                  const lat = e.latLng.lat();
                  const lng = e.latLng.lng();
                  setMapCenter({ lat, lng });
                  setFieldValue("latitude", lat);
                  setFieldValue("longitude", lng);
                }}
              />
            </GoogleMap>
          </div>

          {/* Password */}
          <div className="xl:col-span-6 col-span-12">
            <Input
              text="Password"
              type="password"
              name="password"
              touched={touched.password}
              error={errors.password}
              handleChange={handleChange}
              handleBlur={handleBlur}
              hideText={true}
            />
          </div>

          {/* Confirm Password */}
          <div className="xl:col-span-6 col-span-12">
            <Input
              text="Confirm Password"
              type="password"
              name="reTypePassword"
              touched={touched.reTypePassword}
              error={errors.reTypePassword}
              handleChange={handleChange}
              handleBlur={handleBlur}
              hideText={true}
            />
          </div>
        </div>

        <Button
          text="Sign Up"
          type="submit"
          loading={isLoading}
          customClass="w-full md:w-[360px] mx-auto"
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
