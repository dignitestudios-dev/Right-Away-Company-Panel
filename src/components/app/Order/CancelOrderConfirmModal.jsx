import { IoCloseSharp } from "react-icons/io5";
import Modal from "react-modal";
import {
  CrossIcon,
  OrderCancelConfirm,
  ReviewSubmit,
} from "../../../assets/export";
import Button from "../../global/Button";
import { useState } from "react";
import Input from "../../global/Input";
const OrderCancelConfirmModal = ({ isOpen, setIsOpen,setOrderStatus }) => {
  const [step, setStep] = useState(1);
  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Page Not Found"
      shouldCloseOnOverlayClick={false} // Prevent closing by clicking outside
      shouldCloseOnEsc={false}
      className="flex items-center justify-center border-none outline-none z-[1000] "
      overlayClassName="fixed inset-0 bg-[#C6C6C6] bg-opacity-50 backdrop-blur-sm z-[1000]  flex justify-center items-center"
    >
      <div className="bg-white rounded-[24px] p-4 shadow-lg w-[460px] py-4">
        {step == 1 && (
          <>
            <div className="flex justify-end items-center">
              <IoCloseSharp
                size={22}
                className="cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
            </div>
            <div className="flex mt-5 flex-col gap-2 text-center justify-center items-center">
              <img
                src={OrderCancelConfirm}
                className="w-[132px] h-[129px]"
                alt="CrossIcon"
              />
              <h3 className="font-[700] mt-2 text-[24px] text-[#181818] ">
                Confirm Order Cancellation
              </h3>
              <p className="text-[#838383] text-[14px] font-[400]">
                Are you sure you want to cancel this booking? Please note that a
                cancellation fee will apply.
              </p>
              <div className="flex gap-3 items-center mt-3">
                <Button
                  text={"Confirm"}
                  customClass={"w-[385px]"}
                  onClick={() => setStep(2)}
                />
              </div>
            </div>
          </>
        )}
        {step == 2 && (
          <>
            <div className="flex justify-end items-center">
              <IoCloseSharp
                size={22}
                className="cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
            </div>
            <div className="flex mt-5 flex-col gap-2 text-center justify-center items-center">
              <h3 className="font-[700] mt-2 text-[24px] text-[#181818] ">
                Cancellation Reasons
              </h3>
              <form method="post" className="w-full mt-3">
                <div className="w-full text-start">
                  <label
                    htmlFor=""
                    className="text-[14px] font-[400] text-[#000000]"
                  >
                    Title
                  </label>
                  <br />
                  <input
                    type="text"
                    className="bg-[#F9F9F9] w-full p-2 focus:outline-none rounded-[8px] h-[54px]"
                  />
                </div>
                <div className="w-full text-start mt-3">
                  <label
                    htmlFor=""
                    className="text-[14px] font-[400] text-[#000000]"
                  >
                    Detail
                  </label>
                  <br />
                  <textarea
                    name=""
                    id=""
                    className="bg-[#F9F9F9] h-[165px] w-full p-3 focus:outline-none rounded-[8px] "
                    placeholder="Write here"
                  ></textarea>
                </div>
              </form>
              <div className="flex gap-3 items-center mt-3">
                <Button
                  text={"Submit"}
                  customClass={"w-[385px]"}
                  onClick={() => setStep(3)}
                />
              </div>
            </div>
          </>
        )}
        {step == 3 && (
          <>
            <div className="flex justify-end items-center">
              <IoCloseSharp
                size={22}
                className="cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
            </div>
            <div className="flex mt-5 flex-col gap-2 text-center justify-center items-center">
              <img
                src={ReviewSubmit}
                className="w-[157px] h-[118px]"
                alt="CrossIcon"
              />
              <h3 className="font-[700] mt-2 text-[24px] text-[#181818] ">
                Thank You for Submitting Your Cancellation Reason
              </h3>

              <div className="flex gap-3 items-center mt-3">
                <Button
                  text={"Okay"}
                  customClass={"w-[385px]"}
                  onClick={() => {
                    setIsOpen(false);
                    setStep(1);
                    setOrderStatus("Cancelled")
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default OrderCancelConfirmModal;
