import { useFormik } from "formik";
import { IoCloseSharp } from "react-icons/io5";
import Modal from "react-modal";
import { AddNewStoreValues } from "../../init/authentication/dummyLoginValues";
import { AddNewStoreSchema } from "../../schema/authentication/dummyLoginSchema";
import { useState } from "react";
import Input from "../global/Input";
import { GoogleMap, Marker } from "@react-google-maps/api";
import Button from "../global/Button";
import { FaPlus } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import AddAvailabilityModal from "./AddAvaliablityModal";
import { useDispatch, useSelector } from "react-redux";
import { CreateStore, getStore } from "../../redux/slices/authSlice";

const AddNewStoreModal = ({ isOpen, setIsOpen }) => {
  const [mapCenter, setMapCenter] = useState({ lat: 38.7946, lng: 106.5348 });
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state?.auth);
  const [availability, setAvailability] = useState(null);
  const dayAbbreviations = {
    monday: "MON",
    tuesday: "TUE",
    wednesday: "WED",
    thursday: "THU",
    friday: "FRI",
    saturday: "SAT",
    sunday: "SUN",
  };
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: AddNewStoreValues,
      validationSchema: AddNewStoreSchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async (values, action) => {
        try {
          // Build plain JSON object instead of FormData
          const payload = {
            name: values.businessName,
            coordinates: [-122.4194, 37.7749],
            address: values?.address,
            type: "Point",
            isOpen: true,
            isActive: true,
          };

          // Add availability details
          if (availability) {
            payload.openingTime = availability.start_time;
            payload.closingTime = availability.end_time;

            if (Array.isArray(availability.days)) {
              payload.operatingDays = availability.days;
            }
          }

          await dispatch(CreateStore(payload)).unwrap();
          await dispatch(getStore()).unwrap()
          setIsOpen(!isOpen);
          action.resetForm();
        } catch (err) {
          console.error("Store Creating failed:", err);
        }
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
          <h3 className="text-[28px] font-[700] text-[#181818]">
            Add New Store
          </h3>
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
            <div className="col-span-12 ">
              <label className="font-[700] text-[12px]">Set Availability</label>
              <div className="h-[49px] flex items-center justify-between bg-[#FFFFFF] w-full border border-[#D9D9D9] rounded-[8px]">
                {availability && (
                  <div className="bg-[#F1F1F1D1] flex gap-2 items-center p-2 h-[38px] rounded-[8px] ml-1">
                    <p className="text-[14px]">
                      {availability.start_time} - {availability.end_time} (
                      {availability.days
                        .map((day) => dayAbbreviations[day] || day)
                        .join(", ")}
                    </p>
                    <FiTrash2
                      color={"#F01A1A"}
                      size={14}
                      className="cursor-pointer"
                      onClick={() => setAvailability(null)}
                    />
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="w-[13%] bg-gradient ml-auto rounded-[8px] h-[38px] mr-2 flex items-center justify-center"
                >
                  <FaPlus color="white" />
                </button>
              </div>
            </div>
          </div>
          <Button
            text={"Add"}
            type="submit"
            loading={isLoading}
            customClass={"w-[360px] mx-auto mt-10"}
          />
        </form>
      </div>
      {showModal && (
        <AddAvailabilityModal
          onClose={() => setShowModal(false)}
          onSave={(data) => {
            setAvailability(data);
            setShowModal(false);
          }}
        />
      )}
    </Modal>
  );
};

export default AddNewStoreModal;
