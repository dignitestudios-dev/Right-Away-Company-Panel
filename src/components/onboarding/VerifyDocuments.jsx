import React, { useState } from "react";
import { UploadFiles } from "../../assets/export";
import Button from "../global/Button";
import RequestStatus from "./RequestStatus";

export default function VerifyDocuments({ handleNext }) {
  const uploadFields = [
    { label: "Business License", required: true },
    { label: "Tax Registration", required: true },
    { label: "Business/Ownership Certificate", required: true },
    { label: "Proof of address", required: true },
  ];

  const [files, setFiles] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // handle file selection
  const handleFileChange = (index, file) => {
    setFiles((prev) => ({
      ...prev,
      [index]: file,
    }));
  };

  // handle submit
  const handleSubmit = () => {
    const allUploaded = uploadFields.every((_, index) => files[index]);
    if (!allUploaded) {
      alert("Please upload all required documents before submitting.");
      return;
    }

    // ✅ Simulate upload or API call here
    console.log("Uploaded files:", files);

    // Once submitted, show pending status
    setSubmitted(true);
  };

  if (true) {
    return <RequestStatus status="submited" handleNext={handleNext} />;
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
        {uploadFields.map((field, index) => (
          <div key={index} className="h-[100px]">
            <label className="text-sm text-gray-700 font-medium">
              {field.label}
              {field.required && <span className="text-red-500 ml-0.5">*</span>}
            </label>

            <div className="relative border mt-2 border-gray-200 rounded-xl bg-white shadow-sm hover:border-gray-300 transition">
              <input
                type="file"
                id={`file-${index}`}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                onChange={(e) => handleFileChange(index, e.target.files[0])}
              />

              <div className="flex flex-col items-center justify-center py-6">
                <img
                  src={UploadFiles}
                  alt="upload-img"
                  className="w-[30px] h-[30px]"
                />
                <p className="text-[12px] mt-2 font-[600] text-[#181818]">
                  {files[index] ? (
                    <>
                      {files[index].name.length > 20
                        ? files[index].name.slice(0, 20) + "..."
                        : files[index].name}
                    </>
                  ) : (
                    <>
                      choose file to{" "}
                      <span className="text-[12px] font-[400]">upload</span>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <Button
        text="Submit for Review"
        onClick={handleSubmit}
        customClass="mt-20 w-[360px] mx-auto"
      />
    </div>
  );
}
