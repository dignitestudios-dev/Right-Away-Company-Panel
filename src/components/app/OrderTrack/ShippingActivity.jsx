import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import RiderArivedModal from "./RiderArrivedModal";
import OrderSuccessfullyDelivered from "./OrderSuccessfullyDelivered";

const ShippingActivity = ({ setOrderStatus, orderStatus }) => {
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
  const statusToStepIndex = {
    "Ready For Pickup": 1, // pickUp
    "Out for Delivery": 3, // delivery
    Delivered: 4, // completed
  };

  const [openModal, setOpenModal] = useState(false);
  const [openDeliveredModal, setOpenDeliveredModal] = useState(false);
  useEffect(() => {
    if (!orderStatus) return;

    const statusIndex = statusToStepIndex[orderStatus];

    if (statusIndex !== undefined) {
      const updated = steps.map((step, i) => ({
        ...step,
        completed: i <= statusIndex,
      }));
      setSteps(updated);
    }
  }, [orderStatus]);

  const handlePickedClick = (index) => {
    // complete all steps up to "On The Way"
    const updated = steps.map((step, i) =>
      i <= index + 1 ? { ...step, completed: true } : step
    );
    // setSteps(updated);
    setOpenModal(true); // show modal
  };
  const handleDeliveredClick = (index) => {
    // complete all steps up to "On The Way"
    const updated = steps.map((step, i) =>
      i <= index + 1 ? { ...step, completed: true } : step
    );
    console.log(updated, "update--");
    // setSteps(updated);
    setOpenDeliveredModal(true); // show modal
  };

  return (
    <div className="mx-auto mt-4 bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Shipping Activity</h2>

      <div className="relative border-l border-dashed border-gray-300 ml-3">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`mb-6 flex items-start relative cursor-pointer`}
            onClick={() =>
              !step.completed &&
              ((step.label === "Picked by the Rider" &&
                handlePickedClick(index)) ||
                (step.label === "Delivered" && handleDeliveredClick(index)))
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
      <RiderArivedModal
        setOrderStatus={setOrderStatus}
        isOpen={openModal}
        setIsOpen={setOpenModal}
      />
      <OrderSuccessfullyDelivered
        setOrderStatus={setOrderStatus}
        isOpen={openDeliveredModal}
        setIsOpen={setOpenDeliveredModal}
      />
    </div>
  );
};

export default ShippingActivity;
