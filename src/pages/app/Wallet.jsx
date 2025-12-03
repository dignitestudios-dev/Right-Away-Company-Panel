import React, { useEffect, useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import Filter from "../../components/global/Filter";
import { useNavigate } from "react-router";
import Button from "../../components/global/Button";
import WalletData from "../../components/app/Wallet/WalletData";
import AddBankModal from "../../components/app/Wallet/AddBankModal";
import WithdrawModal from "../../components/app/Wallet/WithdrawModal";
import { useDispatch, useSelector } from "react-redux";
import { getWallet } from "../../redux/slices/AppSlice";

export default function Wallet() {
  const navigate = useNavigate("");
  const [addFunds, setAddFunds] = useState(false);
  const [withrawModal, setWithrawModal] = useState(false);
  const dispatch = useDispatch();
  const { wallet } = useSelector((state) => state?.app);
  const { Banks } = useSelector((state) => state?.auth);
  const handleGetWallet = async () => {
    await dispatch(getWallet()).unwrap();
  };
  useEffect(() => {
    handleGetWallet();
  }, []);
  console.log(wallet, "wallet-get");
  return (
    <div className="py-4">
      <div className="flex justify-between ">
        <h3 className="font-[600] text-[32px] flex items-center gap-2">
          {" "}
          <GoArrowLeft
            onClick={() => navigate(-1)}
            className="text-[#03958A] cursor-pointer "
            size={21}
          />{" "}
          Wallet
        </h3>
        <div className="flex items-center gap-4">
          <Filter hide={true} searchBarHide={true} />
        </div>
      </div>
      <div className="flex justify-between items-center py-3 p-6 mt-3 bg-[#FFFFFF] rounded-[12px] ">
        <div>
          <p className="text-[20px] text-[#A0A0A0]  font-[500]">
            Remaining Balance
          </p>
          <h3 className="gradient-text font-[700] text-[40px] ">
            $ {wallet?.dollars}
          </h3>
        </div>
        <div>
          {Banks?.lenght > 0 ? (
            <Button
              onClick={() => setWithrawModal(!withrawModal)}
              text={"Funds withdraw"}
              customClass={"w-[173px]"}
            />
          ) : (
            <Button
              onClick={() => setAddFunds(!addFunds)}
              text={"Add Bank account"}
              customClass={"w-[173px]"}
            />
          )}
        </div>
      </div>
      <WalletData />
      <AddBankModal isOpen={addFunds} setIsOpen={setAddFunds} />
      <WithdrawModal isOpen={withrawModal} setIsOpen={setWithrawModal} />
    </div>
  );
}
