import { IoCloseSharp } from "react-icons/io5";
import Modal from "react-modal";
import { SuccessIcon } from "../../assets/export";
import { useNavigate } from "react-router";

const AccountCreatedModal = ({ isOpen, setIsOpen }) => {
  const navigate=useNavigate("");
  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Page Not Found"
      shouldCloseOnOverlayClick={false} // Prevent closing by clicking outside
      shouldCloseOnEsc={false}
      className="flex items-center justify-center border-none outline-none z-[1000] "
      overlayClassName="fixed inset-0 bg-[#C6C6C6] bg-opacity-50 backdrop-blur-sm z-[1000]  flex justify-center items-center"
    >
      <div className="bg-white rounded-[12px] p-8 shadow-lg w-[515px] h-[356px]">
        <div className="flex justify-end items-center">
          <IoCloseSharp
            size={22}
            className="cursor-pointer"
            onClick={() => {
              setIsOpen(false)
              navigate("/auth/login")
            }}
          />
        </div>
        <div className="flex flex-col mt-8 gap-2 text-center justify-center items-center">
          <img
            src={SuccessIcon}
            className="w-[66px] h-[60px]"
            alt="AlertIcon"
          />
          <h3 className="font-[600] mt-2 text-[32px] text-[#181818] ">
            Account Created!
          </h3>
          <p className="text-[#838383] text-[16px] font-[400]">
            Your account has been created successfully.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default AccountCreatedModal;
