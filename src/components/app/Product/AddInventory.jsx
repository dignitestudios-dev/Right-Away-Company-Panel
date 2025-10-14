import { useFormik } from "formik";
import { IoCloseSharp } from "react-icons/io5";
import Modal from "react-modal";
import { AddNewStoreValues } from "../../../init/authentication/dummyLoginValues";
import { AddNewStoreSchema } from "../../../schema/authentication/dummyLoginSchema";
import { useState } from "react";
import Input from "../../global/Input";
import { GoogleMap, Marker } from "@react-google-maps/api";
import Button from "../../global/Button";

const AddInventory = ({ isOpen, setIsOpen }) => {
  const [mapCenter, setMapCenter] = useState({ lat: 38.7946, lng: 106.5348 });
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: AddNewStoreValues,
      validationSchema: AddNewStoreSchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async (values, action) => {
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
      <div className="bg-white rounded-[12px] p-6 shadow-lg w-[525px] h-[440px]">
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
                touched={touched.storeName}
                error={errors.storeName}
                handleChange={handleChange}
                handleBlur={handleBlur}
                selectOptions={[
                  { value: "abc", label: "Abc Store" },
                  { value: "main", label: "Main Warehouse" },
                ]}
              />
            </div>
            <div className="col-span-12">
              <Input
                text={"Total Stock"}
                holder={"Enter Store Address"}
                type={"text"}
                touched={touched.address}
                handleChange={handleChange}
                name={"address"}
                error={errors.address}
                handleBlur={handleBlur}
              />
            </div>          
            {/* Operating Hours */}
            <div className="col-span-6">
              <Input
                text="Minimum Order Quantity"
                holder="Type here"
                type="text"
                touched={touched.MinOrderQty}
                handleChange={handleChange}
                name="MinOrderQty"
                error={errors.MinOrderQty}
                handleBlur={handleBlur}
                value={values.MinOrderQty}
              />
            </div>

            {/* Operating Days */}
            <div className="col-span-6">
              <Input
                text="Maximum Order Quanntity"
                holder="Type here"
                type="text"
                touched={touched.maxOrderQty}
                handleChange={handleChange}
                name="maxOrderQty"
                error={errors.maxOrderQty}
                handleBlur={handleBlur}
                value={values.maxOrderQty}
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
