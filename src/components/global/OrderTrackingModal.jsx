import { IoCloseSharp } from "react-icons/io5";
import Modal from "react-modal";
import TrackingMap from "../app/MapTracking/MapTracking";

const OrderTrackingModal = ({ isOpen, setIsOpen,order }) => {
  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Page Not Found"
      shouldCloseOnOverlayClick={false} // Prevent closing by clicking outside
      shouldCloseOnEsc={false}
      className="flex items-center justify-center border-none outline-none z-[1000] "
      overlayClassName="fixed inset-0 bg-[#C6C6C6] bg-opacity-50 backdrop-blur-sm z-[1000]  flex justify-center items-center"
    >
      <div className="bg-white rounded-[24px] p-4 shadow-lg w-[916px] h-[603px]">
        <div
          onClick={() => {
            alert("Are you sure you want to close the tracker?");
            setIsOpen(!isOpen);
          }}
          className="flex justify-end items-center"
        >
          <IoCloseSharp size={22} className="cursor-pointer" />
        </div>
        <div className="flex flex-col g text-center justify-center items-center">
          <TrackingMap order={order} />
        </div>
      </div>
    </Modal>
  );
};

export default OrderTrackingModal;
