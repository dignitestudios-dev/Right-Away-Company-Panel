import { IoCloseSharp } from "react-icons/io5";
import Modal from "react-modal";
import { CrossIcon } from "../../../assets/export";
import { useDispatch, useSelector } from "react-redux";
import { DeleteBank, GetBanks } from "../../../redux/slices/authSlice";
const DeleteBankModal = ({ isOpen, setIsOpen, selectedBank }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const handleDelete = async () => {
    if (!selectedBank?._id) return;

    await dispatch(DeleteBank(selectedBank._id))
      .unwrap()
      .then(() => setIsOpen(false))
      .catch((err) => console.log(err));
    await dispatch(GetBanks()).unwrap();
  };
  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Page Not Found"
      shouldCloseOnOverlayClick={false} // Prevent closing by clicking outside
      shouldCloseOnEsc={false}
      className="flex items-center justify-center border-none outline-none z-[1000] "
      overlayClassName="fixed inset-0 bg-[#C6C6C6] bg-opacity-50 backdrop-blur-sm z-[1000]  flex justify-center items-center"
    >
      <div className="bg-white rounded-[24px] p-4 shadow-lg w-[405px] h-[200px]">
        <div className="flex flex-col h-full gap-2 text-start justify-center items-start">
          <h3 className="font-[700] capitalize mt-2 text-[20px] text-[#181818] ">
            delete credit/debit card
          </h3>
          <p className="text-[#838383] text-[16px] font-[400]">
            Are you sure you want to delete credit/debit card?
          </p>
          <div className="flex gap-3 items-center mt-3">
            <button
              className="bg-[#21293514] w-[140px] text-[#212935] font-[600] text-[12px] rounded-[8px] p-3"
              onClick={() => setIsOpen(!isOpen)}
            >
              Don’t delete
            </button>
            <button
              onClick={() => {
                handleDelete();
              }}
              className="bg-[#EE3131] w-[140px] text-[white] font-[600] text-[12px] rounded-[8px] p-3"
            >
              {!isLoading ? "Delete now" : "Deleting..."}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteBankModal;
