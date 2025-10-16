import { useFormik } from "formik";
import { IoCloseSharp } from "react-icons/io5";
import Modal from "react-modal";
import { AddNewStoreValues } from "../../../init/authentication/dummyLoginValues";
import { AddNewStoreSchema } from "../../../schema/authentication/dummyLoginSchema";
import Button from "../../global/Button";
import { ReviewSubmit } from "../../../assets/export";

const ReviewSubmittedModal = ({ isOpen, setIsOpen }) => {
  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Page Not Found"
      shouldCloseOnOverlayClick={false} // Prevent closing by clicking outside
      shouldCloseOnEsc={false}
      className="flex items-center justify-center border-none outline-none z-[1000] "
      overlayClassName="fixed inset-0 bg-[#C6C6C6] bg-opacity-50 backdrop-blur-sm z-[1000]  flex justify-center items-center"
    >
      <div className="bg-white rounded-[24px] flex flex-col gap-4 justify-center items-center p-6 shadow-lg w-[460px] h-[383px]">
        <img
          src={ReviewSubmit}
          alt="ReviewSubmit"
          className="w-[160px] h-[118px]"
        />
        <h3 className="font-[700] text-[24px]  text-[#000000]">
          Reply Submitted
        </h3>
        <p className="text-[#3C3C43D9] font-[400] text-[16px]">
          Your reply has been posted successfully.
        </p>
        <Button
          text={"Okay"}
          onClick={() => setIsOpen(false)}
          customClass={"w-[385px]"}
        />
      </div>
    </Modal>
  );
};

export default ReviewSubmittedModal;
