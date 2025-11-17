import React, { useState } from "react";
import Button from "../global/Button";
import Input from "../global/Input";
import { useFormik } from "formik";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { CompleteProfileValues } from "../../init/authentication/dummyLoginValues";
import { CompleteProfileSchema } from "../../schema/authentication/dummyLoginSchema";
import { FaPlus } from "react-icons/fa";
import AddAvailabilityModal from "./AddAvaliablityModal";
import { useDispatch, useSelector } from "react-redux";
import { CompleteCompanyProfile } from "../../redux/slices/authSlice";

export default function CompanyProfile({ handleNext }) {
  const [preview, setPreview] = useState(null); // ✅ local preview image
  const [showModal, setShowModal] = useState(false);
  const [availability, setAvailability] = useState(null);
  const { company,isLoading } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const dayAbbreviations = {
    monday: "MON",
    tuesday: "TUE",
    wednesday: "WED",
    thursday: "THU",
    friday: "FRI",
    saturday: "SAT",
    sunday: "SUN",
  };
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: CompleteProfileValues,
    validationSchema: CompleteProfileSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, action) => {
      try {
        const formData = new FormData();
        // Basic info
        formData.append("description", values.description);
        formData.append("coordinates[0]", -122.4194);
        formData.append("coordinates[1]", 37.7749);
        formData.append("type", "Point");
        formData.append("store", values?.fulfillmentMethod);
        // formData.append("address", values?.address);
        // Avatar
        if (values.profilePic) {
          formData.append("profilePicture", values.profilePic);
        }
        await dispatch(CompleteCompanyProfile(formData)).unwrap();
        handleNext();
        action.resetForm();
      } catch (err) {
        console.error("Profile submission failed:", err);
      }
    },
  });

  // ✅ Handle image upload and preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue("profilePic", file);
      setPreview(URL.createObjectURL(file)); // create preview URL
    }
  };

  return (
    <div className="w-full py-10 px-10 lg:px-28">
      {/* Header */}
      <div className="flex flex-col items-center gap-4">
        <h3 className="font-[600] text-[36px]">Company Profile Setup</h3>
        <p className="text-[#838383] text-[16px] font-[400]">
          Please enter your details to complete your profile setup.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full space-y-4 mt-4">
        <div className="grid grid-cols-12 gap-4">
          {/* Profile Picture Upload */}
          <div className="col-span-12 lg:col-span-7">
            <label
              htmlFor="profilePic"
              className="flex cursor-pointer items-center gap-4"
            >
              <div className="border border-dashed flex justify-center items-center border-[#181818] bg-[#1818180A] w-[80px] h-[80px] rounded-full overflow-hidden">
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile Preview"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <FiPlus size={25} className="text-[#181818]" />
                )}
              </div>
              <input
                className="hidden"
                type="file"
                name="profilePic"
                id="profilePic"
                accept="image/*"
                onChange={handleFileChange}
                onBlur={handleBlur}
              />
              <p className="gradient-text border-b-2 border-[#22B573] text-[16px] font-[500]">
                Upload Profile Picture
              </p>
            </label>

            {/* ✅ Show validation error */}
            {touched.profilePic && errors.profilePic && (
              <p className="text-red-500 text-sm mt-1">{errors.profilePic}</p>
            )}
          </div>

          {/* Business Name */}
          <div className="col-span-12 lg:col-span-6">
            <Input
              text="Business Name"
              holder="Enter business name"
              type="text"
              disabled={true}
              touched={touched.businessName}
              handleChange={handleChange}
              name="businessName"
              error={errors.businessName}
              handleBlur={handleBlur}
              value={company?.name}
            />
          </div>

          {/* Business Email */}
          <div className="col-span-12 lg:col-span-6">
            <Input
              text="Business Email Address"
              holder="Enter Business Email Address"
              type="email"
              disabled={true}
              touched={touched.email}
              handleChange={handleChange}
              name="email"
              error={errors.email}
              handleBlur={handleBlur}
              value={company?.email}
            />
          </div>

          {/* Description */}
          <div className="col-span-12 lg:col-span-6">
            <Input
              text="Business Description"
              holder="Enter Business Description"
              type="textarea"
              touched={touched.description}
              handleChange={handleChange}
              name="description"
              error={errors.description}
              handleBlur={handleBlur}
              maxLength={300}
              value={values.description}
            />
          </div>

          {/* Fulfillment Method */}
          <div className="col-span-12 lg:col-span-6">
            <Input
              text="Delivery Fulfillment Method"
              type="radio"
              name="fulfillmentMethod"
              value={values.fulfillmentMethod}
              handleChange={handleChange}
              options={[
                { label: "Store Prepares the Order", value: "store" },
                { label: "Rider Fulfillment", value: "rider" },
              ]}
              error={errors.fulfillmentMethod}
              touched={touched.fulfillmentMethod}
            />
          </div>
        </div>

        <Button loading={isLoading} text="Sign Up" type="submit" customClass="w-full lg:w-[360px] mx-auto" />
      </form>      
    </div>
  );
}
