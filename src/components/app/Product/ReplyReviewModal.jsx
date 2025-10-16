import { useFormik } from "formik";
import { IoCloseSharp } from "react-icons/io5";
import Modal from "react-modal";
import { AddNewStoreValues } from "../../../init/authentication/dummyLoginValues";
import { AddNewStoreSchema } from "../../../schema/authentication/dummyLoginSchema";
import Button from "../../global/Button";
import ReviewSubmittedModal from "./ReviewSubmitted";
import { useState } from "react";

const ReplyReviewModal = ({ isOpen, setIsOpen }) => {
  const [isSubmit,setIsSubmit]=useState(false);
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: AddNewStoreValues,
      validationSchema: AddNewStoreSchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async (values, action) => {
        setIsOpen(!isOpen);
      },
    });
  return (
    <>
      <Modal
        isOpen={isOpen}
        contentLabel="Page Not Found"
        shouldCloseOnOverlayClick={false} // Prevent closing by clicking outside
        shouldCloseOnEsc={false}
        className="flex items-center justify-center border-none outline-none z-[1000] "
        overlayClassName="fixed inset-0 bg-[#C6C6C6] bg-opacity-50 backdrop-blur-sm z-[1000]  flex justify-center items-center"
      >
        <div className="bg-white rounded-[12px] p-6 shadow-lg w-[525px] h-[440px]">
          <div className="flex justify-between items-center">
            <h3 className="text-[24px] font-[600] text-[#181818]">
              Reply Review
            </h3>
            <IoCloseSharp
              size={22}
              className="cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <p className="text-[16px] text-[#3C3C43D9] font-[400]">
            Respond to the review posted by Christine Easom. Your reply will be
            visible to the user and other potential clients. Keep it
            professional and constructive.
          </p>
          <form onSubmit={handleSubmit} className="w-full   mt-4">
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-12">
                <textarea
                  placeholder="Write a reply"
                  className="p-3 font-[400] h-[200px] w-full text-[#959393] text-[16px] focus:outline-none bg-[#F8F8F8] rounded-[15px]  "
                ></textarea>
              </div>
            </div>
            <Button
              text={"Submit"}
              type="submit"
              onClick={() => {
                setIsSubmit(!isSubmit)
                setIsOpen(false)
              }}
              customClass={"w-[360px] mx-auto mt-5"}
            />
          </form>
        </div>
      </Modal>
      <ReviewSubmittedModal isOpen={isSubmit} setIsOpen={setIsSubmit}  />
    </>
  );
};

export default ReplyReviewModal;
