import { useFormik } from "formik";
import { IoCloseSharp } from "react-icons/io5";
import Modal from "react-modal";
import { AddNewStoreValues } from "../../init/authentication/dummyLoginValues";
import { AddNewStoreSchema } from "../../schema/authentication/dummyLoginSchema";
import { useEffect, useState } from "react";
import Input from "../global/Input";
import { GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";
import Button from "../global/Button";
import { EditStore, getStore } from "../../redux/slices/authSlice";
import AddAvailabilityModal from "./AddAvaliablityModal";
import { useDispatch, useSelector } from "react-redux";
import { FiTrash2 } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import StoreAddedSuccessfully from "../app/Profile/StoreAddSuccessFully";

const EditStoreModal = ({ isOpen, setIsOpen, isSelected }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state?.auth);

  const [autocomplete, setAutocomplete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [availability, setAvailability] = useState(null);

  const [mapCenter, setMapCenter] = useState({
    lat: isSelected?.coordinates?.[1] || 37.7749,
    lng: isSelected?.coordinates?.[0] || -122.4194,
  });

  const dayAbbreviations = {
    monday: "MON",
    tuesday: "TUE",
    wednesday: "WED",
    thursday: "THU",
    friday: "FRI",
    saturday: "SAT",
    sunday: "SUN",
  };

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      ...AddNewStoreValues,
      latitude: "",
      longitude: "",
    },
    validationSchema: AddNewStoreSchema,
    onSubmit: async (values, action) => {
      try {
        const payload = {
          id: isSelected?._id,
          data: {
            name: values.businessName,
            address: values.address,
            city: values.city, // ✅
            state: values.state, // ✅
            type: "Point",
            coordinates: [
              values.longitude || mapCenter.lng,
              values.latitude || mapCenter.lat,
            ],
            isOpen: true,
            isActive: true,
          },
        };

        if (availability) {
          payload.data.openingTime = availability.start_time;
          payload.data.closingTime = availability.end_time;
          payload.data.operatingDays = availability.days;
        }

        await dispatch(EditStore(payload)).unwrap();
        await dispatch(getStore()).unwrap();

        setIsSuccess(true);
        setIsOpen(false);
        action.resetForm();
      } catch (err) {
        console.error("Store update failed:", err);
      }
    },
  });

  // 🔄 Prefill store data
  useEffect(() => {
    if (isSelected) {
      setFieldValue("businessName", isSelected?.name);
      setFieldValue("address", isSelected?.address);

      setMapCenter({
        lat: isSelected?.coordinates?.[1],
        lng: isSelected?.coordinates?.[0],
      });

      setAvailability({
        start_time: isSelected?.openingTime || "",
        end_time: isSelected?.closingTime || "",
        days: isSelected?.operatingDays || [],
      });
    }
  }, [isSelected]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
        className="flex items-center justify-center z-[1000]"
        overlayClassName="fixed inset-0 bg-black/40 backdrop-blur-sm z-[1000]"
      >
        <div className="bg-white rounded-[12px] p-8 shadow-lg w-[525px] h-[604px]">
          <div className="flex justify-between items-center">
            <h3 className="text-[28px] font-[700]">Edit Store</h3>
            <IoCloseSharp size={22} onClick={() => setIsOpen(false)} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {/* Store Name */}
            <Input
              text="Store Name"
              name="businessName"
              value={values.businessName}
              touched={touched.businessName}
              error={errors.businessName}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />

            {/* 📍 Store Location with Places */}
            <Autocomplete
              onLoad={setAutocomplete}
              onPlaceChanged={() => {
                if (!autocomplete) return;

                const place = autocomplete.getPlace();
                if (!place.geometry) return;

                const lat = place.geometry.location.lat();
                const lng = place.geometry.location.lng();

                let city = "";
                let state = "";

                if (place.address_components) {
                  place.address_components.forEach((component) => {
                    if (component.types.includes("locality")) {
                      city = component.long_name;
                    }

                    if (
                      component.types.includes("administrative_area_level_1")
                    ) {
                      state = component.long_name;
                    }
                  });
                }

                setMapCenter({ lat, lng });

                setFieldValue("address", place.formatted_address);
                setFieldValue("latitude", lat);
                setFieldValue("longitude", lng);
                setFieldValue("city", city); // ✅
                setFieldValue("state", state); // ✅
              }}
            >
              <Input
                text="Store Location"
                holder="Search store location"
                name="address"
                value={values.address}
                touched={touched.address}
                error={errors.address}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
            </Autocomplete>

            {/* 🗺️ Map */}
            <div className="h-[87px]">
              <GoogleMap
                center={mapCenter}
                zoom={14}
                mapContainerStyle={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "7px",
                }}
              >
                <Marker
                  position={mapCenter}
                  draggable
                  onDragEnd={(e) => {
                    const lat = e.latLng.lat();
                    const lng = e.latLng.lng();
                    setMapCenter({ lat, lng });
                    setFieldValue("latitude", lat);
                    setFieldValue("longitude", lng);
                  }}
                />
              </GoogleMap>
            </div>

            {/* Availability */}
            <label className="font-[700] text-[12px]">Set Availability</label>
            <div className="flex items-center border rounded-[8px] h-[49px]">
              {availability && (
                <div className="flex items-center gap-2 p-2 bg-gray-100 rounded ml-1">
                  <p className="text-[14px]">
                    {availability.start_time} - {availability.end_time} (
                    {availability.days
                      .map((d) => dayAbbreviations[d] || d)
                      .join(", ")}
                    )
                  </p>
                  <FiTrash2 onClick={() => setAvailability(null)} />
                </div>
              )}
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="ml-auto mr-2 bg-gradient w-[38px] h-[38px] flex items-center justify-center rounded"
              >
                <FaPlus color="white" />
              </button>
            </div>

            <Button
              text="Update"
              type="submit"
              loading={isLoading}
              customClass="w-[360px] mx-auto mt-6"
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

      <StoreAddedSuccessfully
        isOpen={isSuccess}
        setIsOpen={setIsSuccess}
        title="Store Updated"
        description="You have successfully updated your store details."
      />
    </>
  );
};

export default EditStoreModal;
