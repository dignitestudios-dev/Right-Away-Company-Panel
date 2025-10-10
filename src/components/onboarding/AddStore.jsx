import React, { useState } from "react";
import AddNewStoreModal from "./AddNewStoreModal";
import SkipAddStoreModal from "./SkipAddStoreModal";
import { DeleteIcon, EditIcon } from "../../assets/export";
import { CiLocationOn } from "react-icons/ci";
import Button from "../global/Button";
import EditStoreModal from "./EditStoreModal";
import DeleteStoreModal from "./DeleteStoreModal";

export default function AddStore({handleNext}) {
  const [isStoreModal, setIsStoreModal] = useState(false);
  const [isSkipStoreModal, setIsSkipStoreModal] = useState(false);
  const [isEditStoreModal, setIsEditStoreModal] = useState(false);
  const [isDeleteStoreModal, setIsDeleteStoreModal] = useState(false);
  return (
    <div className="w-full py-10 px-28">
      {/* Header */}
      <div className="flex flex-col items-center gap-4">
        <h3 className="font-[600] text-[36px]">
          Add and Manage Multiple Store
        </h3>
        <p className="text-[#838383] text-[16px] font-[400]">
          Define your business locations to optimize deliveries and serve
          customers efficiently.
        </p>
      </div>
      {/* Add Store Button (Dashed Border Box) */}
      <div className="flex flex-col items-center mt-10">
        <button
          onClick={() => setIsStoreModal(!isStoreModal)}
          className="border-2 text-[16px] font-[500] border-dashed border-[#22B573] hover:border-[#22B573] rounded-[12px] w-[320px] md:w-[500px] h-[142px] flex items-center justify-center text-[#181818] hover:text-[#22B573] transition-all duration-200"
        >
          + Add a New Store
        </button>
        <div className="w-[500px]">
          <div className="border rounded-[10px] p-4 bg-white shadow-sm mt-5 relative">
            <div className="absolute top-4 right-4 flex gap-2">
              <img
                src={EditIcon}
                onClick={() => setIsEditStoreModal(true)}
                className="w-[20px] cursor-pointer h-[20px]"
                alt=""
              />
              <img
                src={DeleteIcon}
                onClick={() => setIsDeleteStoreModal(true)}
                className="w-[20px] cursor-pointer h-[20px]"
                alt=""
              />
            </div>
            <p className="font-[400] text-[14px] flex -ml-1 items-center gap-2">
              {" "}
              <CiLocationOn className="text-[#22B573]  font-bold" size={22} />
              Dallas, TX – 802 PainEase Plaza{" "}
            </p>
            <h4 className="font-[500] text-[14px] mt-1">Main Warehouse</h4>
            <p className="text-[#1F1F1F] font-[500] text-[14px] mt-1">
              9 AM - 6 PM, Monday to Saturday
            </p>
          </div>
        </div>
        <Button text={"Next"} onClick={handleNext} customClass={"w-[360px] mt-10"} />
        <button
          onClick={()=>setIsSkipStoreModal(true)}
          className="mt-8 w-[360px] bg-[#EDEDED] hover:bg-[#d9d9d9] text-[#181818] px-12 py-3 rounded-xl text-[13px] font-[700] transition-all duration-200"
        >
          Skip
        </button>
      </div>

      <AddNewStoreModal isOpen={isStoreModal} setIsOpen={setIsStoreModal} />
      <EditStoreModal
        isOpen={isEditStoreModal}
        setIsOpen={setIsEditStoreModal}
      />
      <DeleteStoreModal
        isOpen={isDeleteStoreModal}
        setIsOpen={setIsDeleteStoreModal}
      />
      <SkipAddStoreModal
        isOpen={isSkipStoreModal}
        setIsOpen={setIsSkipStoreModal}
      />
    </div>
  );
}
