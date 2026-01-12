import { useFormik } from "formik";
import * as Yup from "yup";
import { IoCloseSharp } from "react-icons/io5";
import Modal from "react-modal";
import Button from "../../global/Button";
import ReviewSubmittedModal from "./ReviewSubmitted";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductReviewReply } from "../../../redux/slices/AppSlice";

const ReplyReviewModal = ({ isOpen, setIsOpen, reviewId, apiCallOnReplye }) => {
  const dispatch = useDispatch();
  const [isSubmit, setIsSubmit] = useState(false);
  const { isLoading } = useSelector((state) => state.app);

  // Validation Schema
  const ReplySchema = Yup.object().shape({
    reply: Yup.string()
      .min(3, "Reply must be at least 3 characters")
      .required("Reply is required"),
  });

  const { values, handleChange, handleSubmit, errors, touched, resetForm } =
    useFormik({
      initialValues: { reply: "" },
      validationSchema: ReplySchema,
      onSubmit: async (values) => {
        try {
          await dispatch(
            ProductReviewReply({
              id: reviewId,
              data: { reply: values.reply },
            })
          ).unwrap();

          // Refresh reviews (NO unwrap)
          await apiCallOnReplye();

          setIsOpen(false);
          setIsSubmit(true);
          resetForm();
        } catch (error) {
          console.log("Reply Error:", error);
        }
      },
    });

  return (
    <>
      <Modal
        isOpen={isOpen}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
        className="flex items-center justify-center z-[1000]"
        overlayClassName="fixed inset-0 bg-[#C6C6C6]/50 backdrop-blur-sm z-[1000] flex justify-center items-center"
      >
        <div className="bg-white rounded-[12px] p-6 shadow-lg w-[525px] h-[460px]">
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

          <p className="text-[16px] text-[#3C3C43D9] mt-2">
            Your reply will be visible to the user and potential clients.
          </p>

          <form onSubmit={handleSubmit} className="mt-4 w-full">
            <textarea
              name="reply"
              value={values.reply}
              onChange={handleChange}
              placeholder="Write a reply"
              maxLength={500} // <-- limit to 500 characters
              className={`p-3 h-[200px] w-full bg-[#F8F8F8] rounded-[15px] text-[16px] focus:outline-none ${
                errors.reply && touched.reply ? "border border-red-500" : ""
              }`}
            />
            {/* Optional character counter */}
            <p className="text-sm text-gray-400 mt-1">
              {values.reply.length}/500
            </p>

            {/* Error Message */}
            {errors.reply && touched.reply && (
              <p className="text-red-500 text-sm mt-1">{errors.reply}</p>
            )}

            <Button
              text={"Submit"}
              type="submit"
              loading={isLoading}
              customClass={"w-[360px] mx-auto mt-5"}
            />
          </form>
        </div>
      </Modal>

      <ReviewSubmittedModal isOpen={isSubmit} setIsOpen={setIsSubmit} />
    </>
  );
};

export default ReplyReviewModal;
