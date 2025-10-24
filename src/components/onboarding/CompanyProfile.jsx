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
        // Avatar
        if (values.profilePic) {
          formData.append("profilePicture", values.profilePic);
        }

        // Availability
        if (availability) {
          formData.append("openingTime", availability.start_time);
          formData.append("closingTime", availability.end_time);

          if (Array.isArray(availability.days)) {
            availability.days.forEach((day, i) => {
              formData.append(`operatingTime[${i}]`, day);
            });
          }
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

          <div className="col-span-12 lg:col-span-12 ">
            <label className="font-[700] text-[12px]">Set Availability</label>
            <div className="h-[49px] flex items-center justify-between bg-[#FFFFFF] w-full border border-[#D9D9D9] rounded-[8px]">
              {availability && (
                <div className="bg-[#F1F1F1D1] flex gap-2 items-center p-2 h-[38px] rounded-[8px] ml-1">
                  <p className="text-[14px]">
                    {availability.start_time} - {availability.end_time} (
                    {availability.days
                      .map((day) => dayAbbreviations[day] || day)
                      .join(", ")}
                  </p>
                  <FiTrash2
                    color={"#F01A1A"}
                    size={14}
                    className="cursor-pointer"
                    onClick={() => setAvailability(null)}
                  />
                </div>
              )}
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="w-[13%] bg-gradient ml-auto rounded-[8px] h-[38px] mr-2 flex items-center justify-center"
              >
                <FaPlus color="white" />
              </button>
            </div>
          </div>

          {/* Operating Hours */}
          {/* <div className="col-span-6">
            <Input
              text="Operating Hours"
              holder="e.g., 9 AM - 6 PM"
              type="text"
              touched={touched.operatingHours}
              handleChange={handleChange}
              name="operatingHours"
              error={errors.operatingHours}
              handleBlur={handleBlur}
              value={values.operatingHours}
            />
          </div> */}

          {/* Operating Days */}
          {/* <div className="col-span-6">
            <Input
              text="Operating Days"
              holder="e.g., Monday to Saturday"
              type="text"
              touched={touched.operatingDays}
              handleChange={handleChange}
              name="operatingDays"
              error={errors.operatingDays}
              handleBlur={handleBlur}
              value={values.operatingDays}
            />
          </div> */}
        </div>

        <Button loading={isLoading} text="Sign Up" type="submit" customClass="w-full lg:w-[360px] mx-auto" />
      </form>
      {showModal && (
        <AddAvailabilityModal
          onClose={() => setShowModal(false)}
          onSave={(data) => {
            setAvailability(data);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
