import { FaRegEdit, FaTrashAlt } from "react-icons/fa";

const StoreCard = ({ setActionType, setIsOpen }) => {
  return (
    <div className="flex col-span-12 justify-between items-center bg-[#F9F9F9] rounded-2xl p-6 shadow-sm w-full ">
      {/* Left Section */}
      <div className="flex justify-between items-center w-[90%]">
        {/* Store Name */}
        <div className="flex flex-col">
          <p className="text-[16px] font-[400] text-[#181818]">Store Name</p>
          <p className="text-[#959393] text-[16px]">Location number 1</p>
        </div>

        {/* Total Stock */}
        <div className="flex flex-col">
          <p className="text-[16px] font-[400] text-[#181818]">Total Stock</p>
          <p className="text-[#959393] text-[16px]">300 units</p>
        </div>

        {/* Minimum Order Quantity */}
        <div className="flex flex-col">
          <p className="text-[16px] font-[400] text-[#181818]">
            Minimum Order Quantity
          </p>
          <p className="text-[#959393] text-[16px]">300 units</p>
        </div>

        {/* Maximum Order Quantity */}
        <div className="flex flex-col">
          <p className="text-[16px] font-[400] text-[#181818]">
            Maximum Order Quantity
          </p>
          <p className="text-[#959393] text-[16px]">300 units</p>
        </div>
      </div>

      {/* Icons */}
      <div className="flex flex-col justify-center items-center gap-3">
        <FaRegEdit
          onClick={() => {
            setActionType("edit");
            setIsOpen(true);
          }}
          className="text-green-500 text-1xl cursor-pointer hover:scale-110 transition"
        />
        <FaTrashAlt
          onClick={() => {
            alert("hi")
            setActionType("dell");
            setIsOpen(true);
          }}
          className="text-red-500 text-1xl cursor-pointer hover:scale-110 transition"
        />
      </div>
    </div>
  );
};

export default StoreCard;
