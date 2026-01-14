import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

const StoreCard = ({ setActionType, setIsOpen, item, setEditIndex, index }) => {
  const { stores } = useSelector((state) => state?.auth);
  console.log(stores[1]?._id, item?.storeRecord?._id, "testing---->");
  return (
    <div className="flex col-span-12 justify-between items-center bg-[#F9F9F9] rounded-2xl p-6 shadow-sm w-full ">
      {/* Left Section */}
      <div className="flex justify-between items-center w-[90%]">
        {/* Store Name */}
        <div className="flex items-center gap-10">
          <div className="flex flex-col">
            <p className="text-[16px] font-[400] text-[#181818]">Store Name</p>
            <p className="text-[#959393] text-[16px]">
              {stores?.find(
                (el) => el._id == (item?.storeName || item?.storeRecord?._id)
              )?.name || "Unknown Store"}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="text-[16px] font-[400] text-[#181818]">Total Stock</p>
            <p className="text-[#959393] text-[16px]">{item?.stock} units</p>
          </div>
        </div>

        {/* Total Stock */}

        {/* Minimum Order Quantity */}
        {/* <div className="flex flex-col">
          <p className="text-[16px] font-[400] text-[#181818]">
            Minimum Order Quantity
          </p>
          <p className="text-[#959393] text-[16px]">{item?.minOrder} units</p>
        </div> */}

        {/* Maximum Order Quantity */}
        {/* <div className="flex flex-col">
          <p className="text-[16px] font-[400] text-[#181818]">
            Maximum Order Quantity
          </p>
          <p className="text-[#959393] text-[16px]">{item?.maxOrder} units</p>
        </div> */}
      </div>

      {/* Icons */}
      <div className="flex flex-col justify-center items-center gap-3">
        <FaRegEdit
          onClick={() => {
            setEditIndex(index);
            setActionType("edit");
            setIsOpen(true);
          }}
          className="text-green-500 text-1xl cursor-pointer hover:scale-110 transition"
        />
        <FaTrashAlt
          onClick={() => {
            setEditIndex(index);
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
