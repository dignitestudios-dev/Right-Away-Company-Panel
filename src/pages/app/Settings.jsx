import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export default function Settings() {
  const menuItems = [
    { label: "Notification Settings", color: "text-gray-800" },
    { label: "Payment Method", color: "text-gray-800" },
    { label: "Change Password", color: "text-gray-800" },
    { label: "Terms & Conditions", color: "text-gray-800" },
    { label: "Privacy Policy", color: "text-gray-800" },
  ];

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-2xl font-semibold text-[#202224]">Settings</h1>
      </div>

      {/* Settings Menu */}
      <div className="">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center mb-2 justify-between rounded-[12px] px-6 py-4 bg-[#FFFFFF] border-b border-gray-100 hover:bg-gray-200 cursor-pointer transition-colors duration-200"
          >
            <span className={`text-[14px] font-medium ${item.color}`}>
              {item.label}
            </span>
            <MdOutlineKeyboardArrowRight size={20} className="text-[#22B573]" />
          </div>
        ))}
      </div>
    </div>
  );
}
