import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../global/Input";
import { useFormik } from "formik";
import { BankDetailsValues } from "../../../init/authentication/dummyLoginValues";
import { BankDetailsSchema } from "../../../schema/authentication/dummyLoginSchema";
import Modal from "react-modal";
import { IoCloseSharp } from "react-icons/io5";
import Button from "../../global/Button";
import { BorderSuccessIcon } from "../../../assets/export";
import { CreateBank, GetBanks } from "../../../redux/slices/authSlice";

export default function AddBankModal({ isOpen, setIsOpen }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state?.auth);

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: BankDetailsValues,
      validationSchema: BankDetailsSchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async (values) => {
        const data = {
          accountHolderName: values?.holderName,
          routingNumber: values?.routingNumber,
          accountNumber: values?.accountNumber,
          bankName: values?.bankName,
        };
        await dispatch(CreateBank(data)).unwrap();
        setTimeout(() => {
          setIsSuccess(true);
        }, 400);
        dispatch(GetBanks());
        setIsOpen(false);
      },
    });

  return (
    <>
      {/* ✅ Main Bank Modal */}
      <Modal
        isOpen={isOpen}
        contentLabel="Add Bank Account"
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
        className="flex items-center justify-center border-none outline-none z-[1000]"
        overlayClassName="fixed inset-0 bg-[#C6C6C6]/50 backdrop-blur-sm z-[1000] flex justify-center items-center"
      >
        <div className="bg-white rounded-[12px] p-6 shadow-lg w-[461px]">
          <div className="flex justify-end items-center">
            <IoCloseSharp
              size={22}
              className="cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <h3 className="text-[24px] text-center mb-6 mt-2 font-[600] text-[#181818]">
            Connect a Bank Account
          </h3>
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12">
                <Input
                  holder="Enter bank name here"
                  type="text"
                  touched={touched.bankName}
                  handleChange={handleChange}
                  name="bankName"
                  error={errors.bankName}
                  handleBlur={handleBlur}
                  value={values.bankName}
                />
              </div>
              <div className="col-span-12">
                <Input
                  text="Account Holder Name"
                  holder="Enter account holder name here"
                  type="text"
                  touched={touched.holderName}
                  handleChange={handleChange}
                  name="holderName"
                  error={errors.holderName}
                  handleBlur={handleBlur}
                  value={values.holderName}
                />
              </div>
              <div className="col-span-12">
                <Input
                  text="Account Number"
                  holder="Account Number"
                  type="text"
                  touched={touched.accountNumber}
                  handleChange={handleChange}
                  name="accountNumber"
                  error={errors.accountNumber}
                  handleBlur={handleBlur}
                  value={values.accountNumber}
                />
              </div>
              <div className="col-span-12">
                <Input
                  text="Routing Number"
                  holder="Routing Number"
                  type="text"
                  touched={touched.routingNumber}
                  handleChange={handleChange}
                  name="routingNumber"
                  error={errors.routingNumber}
                  handleBlur={handleBlur}
                  value={values.routingNumber}
                />
              </div>
            </div>

            <div className="flex flex-col items-center mt-6">
              <Button
                text={"Save"}
                customClass={"w-[385px] mx-auto"}
                loading={isLoading}
              />
            </div>
          </form>
        </div>
      </Modal>

      {/* ✅ Success Modal */}
      <Modal
        isOpen={isSuccess}
        contentLabel="Success"
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
        className="flex items-center justify-center border-none outline-none z-[1000]"
        overlayClassName="fixed inset-0 bg-[#C6C6C6]/50 backdrop-blur-sm z-[1000] flex justify-center items-center"
      >
        <div className="bg-white rounded-[24px] flex flex-col gap-4 justify-center items-center p-6 shadow-lg w-[460px] h-[291px]">
          <div className="flex w-full justify-end items-center">
            <IoCloseSharp
              size={22}
              className="cursor-pointer"
              onClick={() => setIsSuccess(false)}
            />
          </div>
          <img
            src={BorderSuccessIcon}
            alt="ReviewSubmit"
            className="w-[94px] h-[94px]"
          />
          <h3 className="font-[700] text-[24px] text-[#000000]">
            Account Connected
          </h3>
          <p className="text-[#3C3C43D9] font-[400] text-[16px] text-center">
            Your Bank Account Has been Successfully connected, Click below to
            continue your access
          </p>
        </div>
      </Modal>
    </>
  );
}
