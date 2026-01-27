import { IoCloseSharp } from "react-icons/io5";
import Modal from "react-modal";
import { LogOutImg } from "../../assets/export";
import Button from "./Button";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout, resetAuthState } from "../../redux/slices/authSlice";
import Cookies from "js-cookie";
import { resetAppState } from "../../redux/slices/AppSlice";
import { resetChatState } from "../../redux/slices/ChatSlice";
const LogOutModal = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate("");
  const dispatch = useDispatch();
  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Page Not Found"
      shouldCloseOnOverlayClick={false} // Prevent closing by clicking outside
      shouldCloseOnEsc={false}
      className="flex items-center justify-center border-none outline-none z-[1000] "
      overlayClassName="fixed inset-0 bg-[#C6C6C6] bg-opacity-50 backdrop-blur-sm z-[1000]  flex justify-center items-center"
    >
      <div className="bg-white rounded-[24px] p-4 shadow-lg w-[320px] h-[226px]">
        <div className="flex justify-end items-center">
          <IoCloseSharp
            size={22}
            className="cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </div>
        <div className="flex flex-col g text-center justify-center items-center">
          <img src={LogOutImg} className="w-[35px] h-[35px]" alt="CrossIcon" />
          <h3 className="font-[600] mt-2 text-[20px] text-[#181818] ">
            Logout
          </h3>
          <p className="text-[#838383] text-[14px] font-[400]">
            Are you sure you want to logout your account?
          </p>
          <div className="flex gap-3 items-center mt-3">
            <button
              className="bg-[#21293514] w-[140px] text-[#212935] font-[600] text-[12px] rounded-[8px] p-3"
              onClick={() => setIsOpen(!isOpen)}
            >
              No
            </button>
            <Button
              onClick={async () => {
                await dispatch(logout());
                dispatch(resetAppState()); // app clear
                dispatch(resetAuthState()); // Auth clear
                dispatch(resetChatState()); // Chat clear

                Cookies.remove("token");
                navigate("/auth/login");
              }}
              text={"Yes"}
              customClass={"w-[140px]"}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LogOutModal;
