import React, { useState } from "react";
import { UploadFiles } from "../../assets/export";
import Button from "../global/Button";
import RequestStatus from "./RequestStatus";
import { ErrorToast } from "../global/Toaster";
import { useDispatch, useSelector } from "react-redux";
import { UploadCompanyDocuments } from "../../redux/slices/authSlice";

export default function VerifyDocuments({ handleNext }) {
  const uploadFields = [
    { key: "businessLicense", label: "Business License", required: true },
    { key: "taxRegistration", label: "Tax Registration", required: true },
    {
      key: "businessCertificate",
      label: "Business/Ownership Certificate",
      required: true,
    },
    { key: "proofAddress", label: "Proof of Address", required: true },
  ];
  const { isLoading } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const [files, setFiles] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // handle file selection
  const handleFileChange = (key, file) => {
    if (!file) return;

    setFiles((prev) => ({
      ...prev,
      [key]: {
        file,
        preview: URL.createObjectURL(file),
      },
    }));
  };

  // ✅ handle submit
  const handleSubmit = async () => {
    // check if all required files uploaded
    const allUploaded = uploadFields.every((f) => files[f.key]?.file);
    if (!allUploaded) {
      ErrorToast("Please upload all required documents before submitting.");
      return;
    }

    // ✅ Build FormData payload
    const formData = new FormData();
    uploadFields.forEach((f) => {
      formData.append(f.key, files[f.key].file);
    });

    console.log("🚀 Payload ready:", Object.fromEntries(formData.entries()));

    // ✅ dispatch API call (uncomment when ready)
    await dispatch(UploadCompanyDocuments(formData)).unwrap();

    setSubmitted(true);
  };

  if (submitted) {
    return <RequestStatus status="submitted" handleNext={handleNext} />;
  }

  return (
    <div className="w-full py-10 px-28">
      {/* Header */}
      <div className="flex flex-col items-center">
        <h3 className="font-[600] text-[36px]">Verification Documents</h3>
        <p className="text-[#838383] text-[16px] font-[400]">
          Upload your business license, certifications (if any)
        </p>
      </div>

      {/* Upload Inputs */}
      <div className="grid grid-cols-1 mt-8 sm:grid-cols-2 gap-y-14 gap-6">
        {uploadFields.map((field) => (
          <div key={field.key} className="h-[150px] relative">
            <label className="text-sm text-gray-700 font-medium">
              {field.label}
              {field.required && <span className="text-red-500 ml-0.5">*</span>}
            </label>

            <div className="h-full border mt-2 border-gray-200 rounded-xl bg-white shadow-sm hover:border-gray-300 transition">
              <input
                type="file"
                accept="image/*,application/pdf"
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                onChange={(e) => handleFileChange(field.key, e.target.files[0])}
              />

              <div className="flex flex-col h-full relative items-center justify-center">
                {files[field.key]?.preview ? (
                  <img
                    src={files[field.key].preview}
                    alt="preview"
                    className="w-full object-cover h-full rounded-md"
                  />
                ) : (
                  <>
                    <img
                      src={UploadFiles}
                      alt="upload-img"
                      className="w-[30px] h-[30px]"
                    />
                    <p className="text-[12px] mt-2 font-[600] text-[#181818]">
                      choose file to{" "}
                      <span className="text-[12px] font-[400]">upload</span>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <Button
        text="Submit for Review"
        onClick={handleSubmit}
        loading={isLoading}
        customClass="mt-20 w-[360px] mx-auto"
      />
    </div>
  );
}
