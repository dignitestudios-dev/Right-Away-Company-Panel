import React from "react";
import Input from "../../global/Input";
import { useFormik } from "formik";
import { BankDetailsValues } from "../../../init/authentication/dummyLoginValues";
import { BankDetailsSchema } from "../../../schema/authentication/dummyLoginSchema";
import Button from "../../global/Button";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { CreateBank } from "../../../redux/slices/authSlice";

export default function AddCard() {
  const navigate = useNavigate("");
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
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
      const data = {
        accountHolderName: values?.holderName,
        routingNumber: values?.routingNumber,
        accountNumber: values?.accountNumber,
        bankName: values?.bankName,
      };
      await dispatch(CreateBank(data)).unwrap();
      navigate(-1);
      action.resetForm();
    },
  });

  return (
    <div className="py-2 px-2">
      <div className="flex items-center  gap-2 mb-6">
        <h1 className="text-[32px] flex items-center gap-2 font-semibold text-[#202224]">
          <GoArrowLeft
            onClick={() => navigate(-1)}
            className="text-[#03958A] cursor-pointer "
            size={21}
          />{" "}
          Add Stripe Credit/Debit Card
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <Input
              text="Bank Name"
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
        <div className="flex flex-col items-end">
          <Button loading={isLoading} text={"Save"} customClass={"w-[140px]"} />
        </div>
      </form>
    </div>
  );
}
