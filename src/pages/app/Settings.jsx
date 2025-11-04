import React, { useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import ChangedPassword from "../../components/app/Setting/ChangePassword";
import PrivacyPolicyModal from "../../components/global/PrivacyPolicy";
import TermsConditionModal from "../../components/global/TermsCondition";
import NotificationSettings from "../../components/app/Setting/NotificationSettings";
import PasswordUpdateModal from "../../components/app/Setting/PasswordUpdateModal";
import { useNavigate } from "react-router";

export default function Settings() {
  const [activeModal, setActiveModal] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [successFullUpdate, SetSuccessfulUpdate] = useState(false);
  const navigate = useNavigate("");
  const menuItems = [
    { label: "Notification Settings", color: "text-gray-800" },
    { label: "Payment Method", color: "text-gray-800" },
    { label: "Change Password", color: "text-gray-800" },
    { label: "Terms & Conditions", color: "text-gray-800" },
    { label: "Privacy Policy", color: "text-gray-800" },
  ];

  const handleItemClick = (label) => {
    setActiveModal(label);
    setIsOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-2xl font-semibold text-[#202224]">Settings</h1>
      </div>

      {/* Settings Menu */}
      <div>
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() =>
              item.label == "Payment Method"
                ? navigate("/app/payment-methods")
                : handleItemClick(item.label)
            }
            className="flex items-center mb-2 justify-between rounded-[12px] px-6 py-4 bg-[#FFFFFF] border-b border-gray-100 hover:bg-gray-200 cursor-pointer transition-colors duration-200"
          >
            <span className={`text-[14px] font-medium ${item.color}`}>
              {item.label}
            </span>
            <MdOutlineKeyboardArrowRight size={20} className="text-[#22B573]" />
          </div>
        ))}
      </div>

      {/* Modals */}
      {activeModal === "Terms & Conditions" && (
        <TermsConditionModal isOpen={isOpen} setIsOpen={setIsOpen} />
      )}

      {activeModal === "Privacy Policy" && (
        <PrivacyPolicyModal isOpen={isOpen} setIsOpen={setIsOpen} />
      )}

      {activeModal === "Change Password" && (
        <ChangedPassword
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          SetSuccessfulUpdate={SetSuccessfulUpdate}
          successFullUpdate={successFullUpdate}
        />
      )}

      {activeModal === "Notification Settings" && (
        <NotificationSettings
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          SetSuccessfulUpdate={SetSuccessfulUpdate}
          successFullUpdate={successFullUpdate}
        />
      )}

      <PasswordUpdateModal
        isOpen={successFullUpdate}
        setIsOpen={SetSuccessfulUpdate}
      />
    </div>
  );
}
