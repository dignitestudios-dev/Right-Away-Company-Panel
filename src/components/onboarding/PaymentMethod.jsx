import React, { useState } from "react";
import { FaCcVisa, FaCcPaypal, FaCcAmex, FaCcDiscover } from "react-icons/fa";
import {
  AmexIcon,
  DiscoverIcon,
  PaypalIcon,
  VisaIcon,
} from "../../assets/export";
import {
  BankDetailsValues,
  CompleteProfileValues,
} from "../../init/authentication/dummyLoginValues";
import {
  BankDetailsSchema,
  CompleteProfileSchema,
} from "../../schema/authentication/dummyLoginSchema";
import { useFormik } from "formik";
import Input from "../global/Input";
import Button from "../global/Button";
import AccountCreatedModal from "./AccountCreated";
import { useDispatch, useSelector } from "react-redux";
import { CreateBank } from "../../redux/slices/authSlice";

export default function PaymentMethod({ handleNext }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state?.auth);
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: BankDetailsValues,
    validationSchema: BankDetailsSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, action) => {
      console.log(values, "valuess");
      const data = {
        accountHolderName: values?.holderName,
        routingNumber: values?.routingNumber,
        accountNumber: values?.accountNumber,
        bankName: values?.bankName,
      };
      dispatch(CreateBank(data));
      setIsSuccess(true);
    },
  });

  return (
    <div className="w-full py-10 px-10 md:px-28">
      <div className="flex  mb-3 text-center flex-col items-center gap-2">
        <h3 className="font-[600]  text-[20px] md:text-[32px] lg:text-nowrap">
          Secure Your Payments & Withdraw Earnings Easily!
        </h3>
        <p className="text-[#838383] text-[16px] font-[400]">
          Add your bank details to receive seamless payouts and manage your
          earnings effortlessly.
        </p>
      </div>
      <div className="flex justify-between items-end">
        <h3 className="text-[16px] font-[500] text-[#181818]">Bank Name</h3>
        <div className="flex gap-3 mt-4 text-[28px] text-gray-500">
          <img src={VisaIcon} className="w-[40px] h-[27px]" alt={"visaIcon"} />
          <img
            src={PaypalIcon}
            className="w-[40px] h-[27px]"
            alt={"PaypalIcon"}
          />
          <img src={AmexIcon} className="w-[40px] h-[27px]" alt={"AmexIcon"} />
          <img
            src={DiscoverIcon}
            className="w-[40px] h-[27px]"
            alt={"DiscoverIcon"}
          />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <Input
              text=""
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
          <div className="col-span-6">
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
          <div className="col-span-6">
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
        <br />
        <div className="flex flex-col items-center">
          <Button
            text={"Save and Continue"}
            customClass={"w-[360px] mx-auto"}
            loading={isLoading}
          />
          <button
            onClick={() => setIsSuccess(true)}
            type="button"
            className="mt-3 w-[360px] bg-[#EDEDED]  hover:bg-[#d9d9d9] text-[#181818] px-12 py-3 rounded-xl text-[13px] font-[700] transition-all duration-200"
          >
            Skip
          </button>
        </div>
      </form>
      <AccountCreatedModal isOpen={isSuccess} setIsOpen={setIsSuccess} />
    </div>
  );
}
