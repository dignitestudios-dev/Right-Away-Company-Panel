import { useFormik } from "formik";
import { IoCloseSharp } from "react-icons/io5";
import Modal from "react-modal";
import { AddNewStoreValues } from "../../init/authentication/dummyLoginValues";
import { AddNewStoreSchema } from "../../schema/authentication/dummyLoginSchema";
import { useState } from "react";
import Input from "../global/Input";
import { GoogleMap, Marker } from "@react-google-maps/api";
import Button from "../global/Button";

const EditStoreModal = ({ isOpen, setIsOpen }) => {
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
      <div className="bg-white rounded-[12px] p-8 shadow-lg w-[525px] h-[604px]">
        <div className="flex justify-between items-center">
          <h3 className="text-[28px] font-[700] text-[#181818]">Edit Store</h3>
          <IoCloseSharp
            size={22}
            className="cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </div>
        <form onSubmit={handleSubmit} className="w-full space-y-4  mt-4">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12">
              <Input
                text={"Store Name"}
                holder={"e.g. Main Warehouse, Downtown Branch"}
                type={"text"}
                touched={touched.businessName}
                handleChange={handleChange}
                name={"businessName"}
                error={errors.businessName}
                handleBlur={handleBlur}
              />
            </div>
            <div className="col-span-12">
              <Input
                text={"Store Location"}
                holder={"Enter address here"}
                type={"text"}
                touched={touched.address}
                handleChange={handleChange}
                name={"address"}
                error={errors.address}
                handleBlur={handleBlur}
              />
            </div>
            <div className="col-span-12 h-[87px]">
              <GoogleMap
                center={mapCenter}
                zoom={10}
                mapContainerStyle={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "7px",
                }}
              >
                <Marker position={mapCenter} />
              </GoogleMap>
            </div>
            {/* Operating Hours */}
            <div className="col-span-6">
              <Input
                text="Operating Hours"
                holder="e.g., 9 AM - 6 PM"
                type="text"
                touched={touched.operatingHours}
                handleChange={handleChange}
                name="operatingHours"
                error={errors.operatingHours}
                handleBlur={handleBlur}
                value={values.operatingHours}
              />
            </div>

            {/* Operating Days */}
            <div className="col-span-6">
              <Input
                text="Operating Days"
                holder="e.g., Monday to Saturday"
                type="text"
                touched={touched.operatingDays}
                handleChange={handleChange}
                name="operatingDays"
                error={errors.operatingDays}
                handleBlur={handleBlur}
                value={values.operatingDays}
              />
            </div>
          </div>
          <Button
            text={"Add"}
            type="submit"
            customClass={"w-[360px] mx-auto mt-10"}
          />
        </form>
      </div>
    </Modal>
  );
};

export default EditStoreModal;
