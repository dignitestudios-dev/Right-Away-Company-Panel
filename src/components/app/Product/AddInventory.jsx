import { useFormik } from "formik";
import { IoCloseSharp } from "react-icons/io5";
import Modal from "react-modal";
import { AddNewStoreValues } from "../../../init/authentication/dummyLoginValues";
import { AddNewStoreSchema } from "../../../schema/authentication/dummyLoginSchema";
import { useState } from "react";
import Input from "../../global/Input";
import { GoogleMap, Marker } from "@react-google-maps/api";
import Button from "../../global/Button";
import { AddInventoryValues } from "../../../init/app/AppValues";
import { AddInventorySchema } from "../../../schema/app/AppSchema";
import { useSelector } from "react-redux";

const AddInventory = ({ isOpen, setIsOpen, setInventories }) => {
  const { stores } = useSelector((state) => state?.auth);
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: AddInventoryValues,
      validationSchema: AddInventorySchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async (values, action) => {
        setInventories((prev) => [...prev, values]);
        setIsOpen(!isOpen);
      },
    });
  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Page Not Found"
      shouldCloseOnOverlayClick={false} // Prevent closing by clicking outside
      shouldCloseOnEsc={false}
      className="flex items-center justify-center border-none outline-none z-[1000] "
      overlayClassName="fixed inset-0 bg-[#C6C6C6] bg-opacity-50 backdrop-blur-sm z-[1000]  flex justify-center items-center"
    >
      <div className="bg-white rounded-[12px] p-6 shadow-lg w-[525px] py-10">
        <div className="flex justify-between items-center">
          <h3 className="text-[28px] font-[700] text-[#181818]">
            Add Inventory Details
          </h3>
          <IoCloseSharp
            size={22}
            className="cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </div>
        <form onSubmit={handleSubmit} className="w-full   mt-4">
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-12">
              <Input
                text="Store Name"
                holder="e.g. Main Warehouse, Downtown Branch"
                type="select"
                name="storeName"
                value={values.storeName}
                error={errors.storeName}
                handleChange={handleChange}
                touched={touched.storeName}
                handleBlur={handleBlur}
                selectOptions={stores.map((item) => ({
                  value: item._id,
                  label: item.name,
                }))}
              />
            </div>
            <div className="col-span-12">
              <Input
                text={"Total Stock"}
                holder={"Enter Store Address"}
                type={"number"}
                touched={touched.stock}
                handleChange={handleChange}
                name={"stock"}
                error={errors.stock}
                handleBlur={handleBlur}
              />
            </div>
            {/* Min Quantity */}
            <div className="col-span-6">
              <Input
                text="Minimum Order Quantity"
                holder="Type here"
                type="number"
                touched={touched.minOrder}
                handleChange={handleChange}
                name="minOrder"
                error={errors.minOrder}
                handleBlur={handleBlur}
                value={values.minOrder}
              />
            </div>

            {/* Maximum Quantity */}
            <div className="col-span-6">
              <Input
                text="Maximum Order Quanntity"
                holder="Type here"
                type="number"
                touched={touched.maxOrder}
                handleChange={handleChange}
                name="maxOrder"
                error={errors.maxOrder}
                handleBlur={handleBlur}
                value={values.maxOrder}
              />
            </div>
          </div>
          <Button
            text={"Add"}
            type="submit"
            customClass={"w-[360px] mx-auto mt-5"}
          />
        </form>
      </div>
    </Modal>
  );
};

export default AddInventory;
