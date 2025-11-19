import React, { useEffect } from "react";
import Input from "../../global/Input";
import { useFormik } from "formik";
import { BankDetailsSchema } from "../../../schema/authentication/dummyLoginSchema";
import Button from "../../global/Button";
import { GoArrowLeft } from "react-icons/go";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { EditBank } from "../../../redux/slices/authSlice";

export default function EditCard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loc = useLocation();
  const bankDetails = loc?.state?.bankDetails;

  const { isLoading } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      bankName: bankDetails?.bankName || "",
      holderName: bankDetails?.accountHolderName || "", // optional: if you store holder name separately
      accountNumber: "", // map bank ID to accountNumber if needed
      routingNumber: bankDetails?.routing_number || "",
    },
    validationSchema: BankDetailsSchema,
    enableReinitialize: true, // ✅ important: allows form to update when bankDetails is loaded
    onSubmit: async (values) => {
      const data = {
        accountHolderName: values.holderName,
        routingNumber: values.routingNumber,
        accountNumber: values.accountNumber,
        bankName: values.bankName,
      };
      await dispatch(EditBank({ data, bankId: bankDetails?._id })).unwrap();
      navigate(-1);
    },
  });

  return (
    <div className="py-2 px-2">
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-[32px] flex items-center gap-2 font-semibold text-[#202224]">
          <GoArrowLeft
            onClick={() => navigate(-1)}
            className="text-[#03958A] cursor-pointer"
            size={21}
          />
          Edit Stripe Credit/Debit Card
        </h1>
      </div>

      <form onSubmit={formik.handleSubmit} className="w-full space-y-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <Input
              text="Bank Name"
              holder="Enter bank name here"
              type="text"
              touched={formik.touched.bankName}
              handleChange={formik.handleChange}
              name="bankName"
              error={formik.errors.bankName}
              handleBlur={formik.handleBlur}
              value={formik.values.bankName}
            />
          </div>
          <div className="col-span-12">
            <Input
              text="Account Holder Name"
              holder="Enter account holder name here"
              type="text"
              touched={formik.touched.holderName}
              handleChange={formik.handleChange}
              name="holderName"
              error={formik.errors.holderName}
              handleBlur={formik.handleBlur}
              value={formik.values.holderName}
            />
          </div>
          <div className="col-span-6">
            <Input
              text="Account Number"
              holder="Account Number"
              type="text"
              touched={formik.touched.accountNumber}
              handleChange={formik.handleChange}
              name="accountNumber"
              error={formik.errors.accountNumber}
              handleBlur={formik.handleBlur}
              value={formik.values.accountNumber}
            />
          </div>
          <div className="col-span-6">
            <Input
              text="Routing Number"
              holder="Routing Number"
              type="text"
              touched={formik.touched.routingNumber}
              handleChange={formik.handleChange}
              name="routingNumber"
              error={formik.errors.routingNumber}
              handleBlur={formik.handleBlur}
              value={formik.values.routingNumber}
            />
          </div>
        </div>

        <div className="flex flex-col items-end">
          <Button text={"Save"} customClass={"w-[140px]"} loading={isLoading} />
        </div>
      </form>
    </div>
  );
}
