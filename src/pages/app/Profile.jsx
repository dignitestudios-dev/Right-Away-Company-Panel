import { FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { DeleteImg, EditImg, Person1 } from "../../assets/export";
import AddNewStoreModal from "../../components/onboarding/AddNewStoreModal";
import EditStoreModal from "../../components/onboarding/EditStoreModal";
import DeleteStoreModal from "../../components/onboarding/DeleteStoreModal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStore } from "../../redux/slices/authSlice";
import { formatDays, formatOperatingDays, formatTime } from "../../lib/helpers";

const Profile = () => {
  const [isStoreModal, setIsStoreModal] = useState(false);
  const [isEditStoreModal, setIsEditStoreModal] = useState(false);
  const [isDeleteStoreModal, setIsDeleteStoreModal] = useState(false);
  const [isSelected, setIsSelected] = useState("");
  const { stores } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStore());
  }, []);

  return (
    <div className="p-6 md:p-10 min-h-screen">
      {/* Profile Header */}
      <h2 className="text-2xl font-bold mb-4">Profile</h2>

      <div className="bg-[#FFFFFF] rounded-[24px] shadow-sm p-6 border border-[#18181829]">
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          {/* Profile Info */}
          <div className="flex items-center gap-4">
            <div className=" rounded-full w-20 h-20 p-1 border border-dashed border-[#22B573]">
              <img src={Person1} alt="Profile" className=" object-cover" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Store Name</h3>
            </div>
          </div>

          <button className="self-start bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700">
            Edit Profile
          </button>
        </div>
        <div className="mt-4">
          <h3 className="text-[16px] font-[400] text-[#181818]">Description</h3>
          <p className="text-[16px] font-[400] text-[#959393] mt-1">
            Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do
            Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua.
          </p>
        </div>

        {/* Info Grid */}
        <div className="border-b border-[#EEEEEE] py-4 grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-700">
          <div className="border-r border-[#EEEEEE]">
            <p className="text-[16px] font-[400] text-[#181818]">
              Email Address
            </p>
            <p className="text-[16px] font-[400] text-[#959393]">
              store@mail.com
            </p>
          </div>
          <div className="border-r border-[#EEEEEE]">
            <p className="text-[16px] font-[400] text-[#181818]">
              Phone Number
            </p>
            <p className="text-[16px] font-[400] text-[#959393]">
              +000 000 000
            </p>
          </div>
          <div className="border-r border-[#EEEEEE]">
            <p className="text-[16px] font-[400] text-[#181818]">
              Company Registered Number
            </p>
            <p className="text-[16px] font-[400] text-[#959393]">
              145798523621
            </p>
          </div>
          <div>
            <p className="text-[16px] font-[400] text-[#181818]">Address</p>
            <p className="text-[16px] font-[400] text-[#959393]">
              Street 3, Jersey City, NJ 07310
            </p>
          </div>
        </div>
        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-700">
          <div className="border-r border-[#EEEEEE]">
            <p className="text-[16px] font-[400] text-[#181818]">
              Operating Hours
            </p>
            <p className="text-[16px] font-[400] text-[#959393]">
              09:00 AM to 06:00 PM
            </p>
          </div>
          <div className="border-r border-[#EEEEEE]">
            <p className="text-[16px] font-[400] text-[#181818]">
              Operating Days
            </p>
            <p className="text-[16px] font-[400] text-[#959393]">
              Monday to Saturday
            </p>
          </div>
          <div className="border-r border-[#EEEEEE]">
            <p className="text-[16px] font-[400] text-[#181818]">
              Delivery Fulfillment Method
            </p>
            <p className="text-[16px] font-[400] text-[#959393]">
              Store Prepares the Order
            </p>
          </div>
        </div>
      </div>

      {/* Available Locations */}
      <div className="bg-[#FFFFFF] rounded-[24px] shadow-sm p-6 mt-8 border border-[#18181829]">
        <div className="flex justify-between items-center ">
          <h3 className="text-[22px] font-[500] text-[#181818]">
            Available Location
          </h3>
          <button
            onClick={() => setIsStoreModal(!isStoreModal)}
            className="gradient-text border-b border-[#22B573] text-[14px] font-[500]"
          >
            Add New Location
          </button>
        </div>

        {stores.map((loc, i) => (
          <div
            key={i}
            className="border-b border-[#EEEEEE] py-4 flex justify-between items-center"
          >
            <div>
              <h4 className="font-[500] text-[#181818] text-[14px]">
                {loc.name}
              </h4>
              <div className="text-[12px] text-[400] text-[#181818] mt-1 flex flex-col gap-1">
                <div className="flex items-center gap-2 text-[12px] text-[400] text-[#181818]">
                  <FaMapMarkerAlt className="text-emerald-500" />
                  {loc.address}
                </div>
                <div className="flex items-center gap-2 text-sm text-[#181818]">
                  <FaClock className="text-emerald-500" />
                  <span>
                    {formatTime(loc.openingTime)} -{" "}
                    {formatTime(loc.closingTime)},{" "}
                    {formatOperatingDays(loc.operatingDays)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setIsSelected(loc);
                  setIsEditStoreModal(true);
                }}
              >
                <img src={EditImg} className="w-6 h-6" alt={"edit icon"} />
              </button>
              <button
                onClick={() => {
                  setIsDeleteStoreModal(true);
                  setIsSelected(loc?._id);
                }}
              >
                <img src={DeleteImg} className="w-6 h-6" alt={"edit icon"} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <AddNewStoreModal isOpen={isStoreModal} setIsOpen={setIsStoreModal} />
      <EditStoreModal
        isOpen={isEditStoreModal}
        setIsOpen={setIsEditStoreModal}
        isSelected={isSelected}
      />
      <DeleteStoreModal
        isSelected={isSelected}
        isOpen={isDeleteStoreModal}
        setIsOpen={setIsDeleteStoreModal}
      />
    </div>
  );
};

export default Profile;
