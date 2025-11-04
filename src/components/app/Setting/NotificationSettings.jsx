import React, { useEffect, useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import Modal from "react-modal";
import Button from "../../global/Button";

export default function NotificationSettings({ isOpen, setIsOpen }) {
  const [toggles, setToggles] = useState([]);

  // Define your notification toggle fields
  const notificationFields = [
    {
      backendKey: "activity_notifications",
      key: "activity_notification",
      label: "Activity Notifications",
    },
    {
      backendKey: "general_notifications",
      key: "general_notification",
      label: "General Notifications",
    },
    {
      backendKey: "messages_notifications",
      key: "messages_notification",
      label: "Messages Notifications",
    },
    {
      backendKey: "transaction_notifications",
      key: "transaction_notification",
      label: "Transaction Notifications",
    },
  ];

  // Initialize toggle states on mount
  useEffect(() => {
    setToggles(
      notificationFields.map((item) => ({
        key: item.key,
        label: item.label,
        value: false, // default false (unchecked)
      }))
    );
  }, []);

  const handleToggle = (index) => {
    const updated = [...toggles];
    updated[index].value = !updated[index].value;
    setToggles(updated);
  };

  const handleSave = () => {
    const payload = toggles.reduce((acc, item) => {
      const backendField = notificationFields.find(
        (field) => field.key === item.key
      );
      acc[backendField.backendKey] = item.value;
      return acc;
    }, {});

    console.log("Saved notification settings:", payload);
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Notification Settings"
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      className="flex items-center justify-center border-none outline-none z-[1000]"
      overlayClassName="fixed inset-0 bg-[#C6C6C6] bg-opacity-50 backdrop-blur-sm z-[1000] flex justify-center items-center"
    >
      <div className="bg-white w-[500px] px-5 py-2 rounded-[16px] shadow-lg items-center flex flex-col justify-center gap-2 text-center">
        <div className="w-full flex justify-end">
          <button onClick={() => setIsOpen(false)}>
            <HiOutlineXMark size={22} />
          </button>
        </div>

        <div className="text-start w-full">
          <h2 className="text-[28px] font-bold text-black">
            Notification Settings
          </h2>
        </div>

        <div className="w-full flex flex-col gap-3 mt-6">
          {toggles.map((item, index) => (
            <div
              key={item.key}
              className="flex justify-between items-center bg-[#F9FAFA] px-4 py-3 rounded-xl"
            >
              <span className="text-[#181818] font-[500]">{item.label}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={item.value}
                  onChange={() => handleToggle(index)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 rounded-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
              </label>
            </div>
          ))}
        </div>

        <div className="mt-5 w-full py-4">
          <Button text={"Save"} customClass={"w-[360px] mx-auto"} onClick={handleSave} />
        </div>
      </div>
    </Modal>
  );
}
