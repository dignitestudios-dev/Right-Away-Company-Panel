import React, { useEffect, useState } from "react";
import { BankFlagIcon, DeleteIcon, EditImg } from "../../../assets/export";
import Button from "../../global/Button";
import { useNavigate } from "react-router";
import DeleteBankModal from "./DeleteBankModal";
import { useDispatch, useSelector } from "react-redux";
import { GetBanks } from "../../../redux/slices/authSlice";

export default function BankDetail() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { Banks, isLoading } = useSelector((state) => state.auth);
  const [selectedBank, setSelectedBank] = useState(null);
  useEffect(() => {
    dispatch(GetBanks()).unwrap();
  }, []);

  // Skeleton Loader
  const renderSkeleton = () => {
    return Array.from({ length: 3 }).map((_, index) => (
      <div
        key={index}
        className="bg-white flex items-center justify-between rounded-[8px] px-4 py-3 shadow-sm animate-pulse"
      >
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gray-200 rounded"></div>
          <div>
            <div className="h-4 bg-gray-200 w-32 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 w-48 rounded"></div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 bg-gray-200 rounded"></div>
          <div className="w-5 h-5 bg-gray-200 rounded"></div>
        </div>
      </div>
    ));
  };

  return (
    <div className="py-2 px-2">
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-[32px] font-semibold text-[#202224]">
          Payment Method
        </h1>
      </div>

      <div className="bg-[#EBEBEB] h-[400px] rounded-[16px] p-2">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-[32px] font-[500] text-[#181818] mb-4">
              Bank Account Details
            </h1>

            <Button
              onClick={() => navigate("/app/add-card")}
              text={"Add Bank"}
              customClass={"w-[180px]"}
            />
          </div>

          <h2 className="text-[16px] text-[#212935] font-medium mb-3">
            Attached Bank Account
          </h2>

          {/* SHOW SKELETON WHILE LOADING */}
          {isLoading ? (
            renderSkeleton()
          ) : Banks && Banks.length > 0 ? (
            Banks.map((bank, index) => (
              <div
                key={index}
                className="bg-white mt-2 flex items-center py-2 justify-between rounded-[8px] px-4 shadow-sm"
              >
                {/* Left */}
                <div className="flex items-center gap-4">
                  <img
                    src={BankFlagIcon}
                    alt="Bank Logo"
                    className="w-10 h-10 object-contain"
                  />
                  <div>
                    <h3 className="text-[15px] font-[500] text-[#000000]">
                      {bank.bankName || "Bank Of America"}
                    </h3>
                    <p className="text-[#00000099] tracking-widest text-[14px] font-[400]">
                      {bank.routing_number}
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      navigate("/app/edit-card", {
                        state: { bankDetails: bank },
                      })
                    }
                    className="text-green-600 hover:scale-110 transition"
                  >
                    <img
                      src={EditImg}
                      className="w-[20px] h-[20px]"
                      alt="EditIcon"
                    />
                  </button>

                  <button
                    onClick={() => 
                    {
                      setSelectedBank(bank);
                      setIsOpen(!isOpen)
                    }
                    }
                    className="text-red-600 hover:scale-110 transition"
                  >
                    <img
                      src={DeleteIcon}
                      className="w-[15px] h-[15px]"
                      alt="DeleteIcon"
                    />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-10">
              No bank accounts attached.
            </p>
          )}
        </div>
      </div>

      <DeleteBankModal selectedBank={selectedBank} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
