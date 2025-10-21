import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import RiderArivedModal from "./RiderArrivedModal";

const ShippingActivity = () => {
  const [steps, setSteps] = useState([
    {
      label: "Order Placed - Thursday, January (Pending)",
      completed: true,
    },
    { label: "Preparing", completed: true },
    { label: "Picked by the Rider", completed: false },
    { label: "On The Way", completed: false },
    { label: "Delivered", completed: false },
  ]);

  const [openModal, setOpenModal] = useState(false);

  const handlePickedClick = (index) => {
    // complete all steps up to "On The Way"
    const updated = steps.map((step, i) =>
      i <= index + 1 ? { ...step, completed: true } : step
    );
    setSteps(updated);
    setOpenModal(true); // show modal
  };

  return (
    <div className="mx-auto mt-4 bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Shipping Activity</h2>

      <div className="relative border-l border-dashed border-gray-300 ml-3">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`mb-6 flex items-start relative ${
              step.label === "Picked by the Rider" ? "cursor-pointer" : ""
            }`}
            onClick={() =>
              step.label === "Picked by the Rider" && handlePickedClick(index)
            }
          >
            {/* Timeline Dot / Check */}
            <div
              className={`absolute -left-[8px] flex items-center justify-center w-4 h-4 rounded-md ${
                step.completed
                  ? "bg-emerald-500 text-white"
                  : "border border-[#181818] text-[#181818] bg-white"
              }`}
            >
              <FaCheck className="text-[8px]" />
            </div>

            {/* Step Label */}
            <p
              className={`ml-6 text-[13px] font-[400] ${
                step.completed ? "text-[#181818]" : "text-[#18181861]"
              }`}
            >
              {step.label}
            </p>
          </div>
        ))}
      </div>

      {/* Modal */}
       <RiderArivedModal isOpen={openModal} setIsOpen={setOpenModal} />
    </div>
  );
};

export default ShippingActivity;
