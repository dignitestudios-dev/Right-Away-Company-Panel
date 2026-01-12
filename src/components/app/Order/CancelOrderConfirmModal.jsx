import { IoCloseSharp } from "react-icons/io5";
import Modal from "react-modal";
import {
  CrossIcon,
  OrderCancelConfirm,
  ReviewSubmit,
} from "../../../assets/export";
import Button from "../../global/Button";
import { useEffect, useState } from "react";
import Input from "../../global/Input";
import { useDispatch } from "react-redux";
import { cancelOrder, getOrderById } from "../../../redux/slices/AppSlice";

const OrderCancelConfirmModal = ({
  isOpen,
  setIsOpen,
  setOrderStatus,
  orderId,
  initialStep = 1, // ✅ Accept initial step as prop
}) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(initialStep);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [errors, setErrors] = useState({});

  // ✅ Update step when modal opens with different initialStep
  useEffect(() => {
    if (isOpen) {
      setStep(initialStep);
    }
  }, [isOpen, initialStep]);

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!detail.trim()) newErrors.detail = "Detail is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCancelOrder = async () => {
    if (!validate()) return;

    try {
      await dispatch(
        cancelOrder({ id: orderId, form: { title, details: detail } })
      ).unwrap();
      setOrderStatus("Cancelled");
      setStep(3); // ✅ Show step 3 immediately

      // DON'T close the modal automatically
      // User can manually close it by clicking the X button
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };

  const handleClose = async () => {
    await dispatch(getOrderById(orderId)).unwrap();
    setIsOpen(false);
    setStep(1); // Reset step when modal closed manually
    setTitle(""); // Clear form
    setDetail(""); // Clear form
    setErrors({}); // Clear errors
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Cancel Order"
      className="flex items-center justify-center border-none outline-none z-[1000]"
      overlayClassName="fixed inset-0 bg-[#C6C6C6] bg-opacity-50 backdrop-blur-sm z-[1000] flex justify-center items-center"
    >
      <div className="bg-white rounded-[24px] p-4 shadow-lg w-[460px] py-4">
        {/* Close button */}
        <div className="flex justify-end items-center">
          <IoCloseSharp
            size={22}
            className="cursor-pointer"
            onClick={handleClose}
          />
        </div>

        {step === 1 && (
          <div className="flex mt-5 flex-col gap-2 text-center justify-center items-center">
            <img
              src={OrderCancelConfirm}
              className="w-[132px] h-[129px]"
              alt="CrossIcon"
            />
            <h3 className="font-[700] mt-2 text-[24px] text-[#181818]">
              Confirm Order Cancellation
            </h3>
            <p className="text-[#838383] text-[14px] font-[400]">
              Are you sure you want to cancel this booking? Please note that a
              cancellation fee will apply.
            </p>
            <div className="flex gap-3 items-center mt-3">
              <Button
                text="Confirm"
                customClass="w-[385px]"
                onClick={() => setStep(2)}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex mt-5 flex-col gap-2 text-center justify-center items-center">
            <h3 className="font-[700] mt-2 text-[24px] text-[#181818]">
              Cancellation Reasons
            </h3>
            <form className="w-full mt-3" onSubmit={(e) => e.preventDefault()}>
              <div className="w-full text-start">
                <label className="text-[14px] font-[400] text-[#000000]">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`bg-[#F9F9F9] w-full p-2 focus:outline-none rounded-[8px] h-[54px] ${
                    errors.title ? "border border-red-500" : ""
                  }`}
                />
                {errors.title && (
                  <p className="text-red-500 text-[12px]">{errors.title}</p>
                )}
              </div>

              <div className="w-full text-start mt-3">
                <label className="text-[14px] font-[400] text-[#000000]">
                  Detail
                </label>
                <textarea
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                  maxLength={200}
                  className={`bg-[#F9F9F9] h-[165px] w-full p-3 focus:outline-none rounded-[8px] ${
                    errors.detail ? "border border-red-500" : ""
                  }`}
                  placeholder="Write here (max 200 characters)"
                ></textarea>
                <p className="text-gray-400 text-[12px] text-right mt-1">
                  {detail.length}/200
                </p>
                {errors.detail && (
                  <p className="text-red-500 text-[12px]">{errors.detail}</p>
                )}
              </div>
            </form>

            <div className="flex gap-3 items-center mt-3">
              <Button
                text="Submit"
                customClass="w-[385px]"
                onClick={handleCancelOrder}
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex mt-5 flex-col gap-2 text-center justify-center items-center">
            <img
              src={ReviewSubmit}
              className="w-[157px] h-[118px]"
              alt="CrossIcon"
            />
            <h3 className="font-[700] mt-2 text-[24px] text-[#181818]">
              Thank You for Submitting Your Cancellation Reason
            </h3>
            <p className="text-[#838383] text-[14px] font-[400]">
              Your order has been cancelled successfully.
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default OrderCancelConfirmModal;
