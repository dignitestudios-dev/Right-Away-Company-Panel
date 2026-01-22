import { IoCloseSharp } from "react-icons/io5";
import Modal from "react-modal";
import { CrossIcon } from "../../../assets/export";
import { useDispatch } from "react-redux";
import { deleteProducts, getProducts } from "../../../redux/slices/AppSlice";
import { useNavigate } from "react-router";
const DeleteProductModal = ({ isOpen, setIsOpen, selected, loading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async () => {
    await dispatch(deleteProducts(selected));
    setIsOpen(false);
    await dispatch(getProducts({}));
    navigate("/app/product-management");
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
      <div className="bg-white rounded-[24px] p-4 shadow-lg w-[320px] h-[240px]">
        <div className="flex justify-end items-center">
          <IoCloseSharp
            size={22}
            className="cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </div>
        <div className="flex flex-col gap-2 text-center justify-center items-center">
          <img src={CrossIcon} className="w-[35px] h-[35px]" alt="CrossIcon" />
          <h3 className="font-[600] mt-2 text-[20px] text-[#181818] ">
            Delete Product
          </h3>
          <p className="text-[#838383] text-[14px] font-[400]">
            Your data will be deleted from our data base permanently.
          </p>
          <div className="flex gap-3 items-center mt-3">
            <button
              className="bg-[#21293514] w-[140px] text-[#212935] font-[600] text-[12px] rounded-[8px] p-3"
              onClick={() => setIsOpen(!isOpen)}
            >
              Don’t delete
            </button>
            <button
              onClick={handleSubmit}
              className="bg-[#EE3131] w-[140px] text-[white] font-[600] text-[12px] rounded-[8px] p-3"
            >
              {loading ? "Deleting..." : " Delete now"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteProductModal;
