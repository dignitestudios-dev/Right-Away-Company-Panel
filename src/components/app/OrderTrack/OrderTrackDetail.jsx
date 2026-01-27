import React, { useEffect, useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { useLocation, useNavigate } from "react-router";
import {
  CallIcon,
  ChatBtnIcon,
  MessageIcon,
  SubTitleIcon,
  TruckIcon,
} from "../../../assets/export";
import Button from "../../global/Button";
// import OrderCancelConfirmModal from "./CancelOrderConfirmModal";

import { FaStar, FaRegStar } from "react-icons/fa";
import ShippingActivity from "./ShippingActivity";
// import { socket } from "../../../../socket";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById, setSingleOrder } from "../../../redux/slices/AppSlice";
import { formatDate, formatTime } from "../../../lib/helpers";
import OrderDetailSkeleton from "../../global/DetailSkeliton";
import { ErrorToast, SuccessToast } from "../../global/Toaster";
import { OpenRiderChat } from "../../../redux/slices/ChatSlice";
import QRCode from "react-qr-code";
import OrderTrackingModal from "../../global/OrderTrackingModal";

const CustomerReviewCard = ({ review }) => {
  const { userRecord, rating, reviews, createdAt, reply } = review[0];

  return (
    <div className="w-full mt-4 bg-white rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.1)] p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-gray-900 text-[20px] font-[600]">
          Customer Review
        </h2>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-2">
        {[1, 2, 3, 4, 5].map((star) =>
          star <= rating ? (
            <FaStar key={star} className="text-yellow-400 text-lg" />
          ) : (
            <FaRegStar key={star} className="text-yellow-400 text-lg" />
          ),
        )}
      </div>

      {/* Review Text */}
      <p className="text-[#181818] text-[12px] mb-2 font-[400]">{reviews}</p>

      {/* User Info */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={userRecord?.profilePicture}
          alt="Profile"
          className="w-10 h-10 rounded-full border-2 border-[#00B39F]"
        />
        <div>
          <h3 className="text-[12px] font-[500] text-[#181818]">
            {userRecord?.name}
          </h3>
          <p className="text-[10px] font-[400] text-[#5C5C5C]">
            {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Reply Section */}
      {reply && (
        <>
          <div className="pl-3 ml-6 mb-2">
            <p className="text-[#181818] text-[12px] font-[400]">{reply}</p>
          </div>

          <div className="flex items-center gap-2 ml-8">
            <p className="text-[#181818] flex items-center mt-2 gap-2 text-[12px] font-medium">
              Replied By You
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default function OrderTrackDetail() {
  const navigate = useNavigate("");
  const [orderStatus, setOrderStatus] = useState("Ready For Pickup");
  const [isTrackOpen, setIsTrackOpen] = useState(false);
  const statusMap = {
    pickUp: "Ready For Pickup",
    delivery: "Out for Delivery",
    completed: "Delivered",
  };

  // Map display statuses to styles
  const statusStyles = {
    "Ready For Pickup": {
      bg: "bg-[#10CBFF26]",
      text: "text-[#10CBFF]",
    },
    "Out for Delivery": {
      bg: "bg-[#FF6D0826]",
      text: "text-[#FF6D08]",
    },
    Delivered: {
      bg: "bg-[#20BD4A26]",
      text: "text-[#20BD4A]",
    },
  };

  // Convert backend status to display status
  const displayStatus = statusMap[orderStatus] || "Unknown Status";

  // Get current style
  const currentStyle = statusStyles[displayStatus] || {
    bg: "bg-gray-100",
    text: "text-gray-500",
  };
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState("");

  const { singleOrder, isLoading } = useSelector((state) => state?.app);
  const loc = useLocation();
  const orderId = loc?.state?.id;
  const gerOrderDetail = async () => {
    dispatch(getOrderById(orderId)).unwrap();
  };
  useEffect(() => {
    const fetchProductId = async () => {
      await gerOrderDetail();
    };

    fetchProductId();
  }, [orderId]);

  useEffect(() => {
    setOrderStatus(singleOrder?.status);
  }, [singleOrder]);

  // useEffect(() => {
  //   // ✅ Success response listener
  //   socket.on("order:updated:status", (data) => {
  //     console.log("✅ Order status update success:", data);
  //     dispatch(setSingleOrder(data?.data));
  //     SuccessToast("Order status updated successfully!");
  //   });

  //   // ❌ Error response listener
  //   socket.on("order:update:status:error", (error) => {
  //     ErrorToast(error?.message);
  //   });

  //   // 🧹 Cleanup on unmount
  //   return () => {
  //     socket.off("order:updated:status");
  //     socket.off("order:update:status:error");
  //   };
  // }, []);

  const handleStartPreparingClick = async (status) => {
    if (!selectedOption && status === "processing") {
      ErrorToast("Please select a delivery option before proceeding.");
      return;
    }

    try {
      socket.emit("order:update:status", {
        id: singleOrder?._id,
        status: status,
      });
    } catch (error) {
      ErrorToast(error?.message);
    }
  };
  const handleChatWithRider = async (rider) => {
    console.log(rider, "riderRecord");
    await dispatch(OpenRiderChat(rider?._id)).unwrap();
    navigate("/app/chat");
  };
  console.log(singleOrder, "deliverMethods");
  return (
    <>
      {isLoading ? (
        <OrderDetailSkeleton />
      ) : (
        <div>
          <div className="flex justify-between ">
            <h3 className="font-[600] text-[32px] flex items-center gap-2">
              {" "}
              <GoArrowLeft
                onClick={() => navigate(-1)}
                className="text-[#03958A] cursor-pointer "
                size={21}
              />{" "}
              Order Tracking Details
            </h3>
            <div className="flex items-center gap-4">
              {statusMap[orderStatus] != "delivered" &&
                singleOrder?.rideStatus != "completed" && (
                  <>
                    <button
                      onClick={() => handleChatWithRider(singleOrder?.user)}
                      className="bg-transparent border border-[#03958A] font-[500] gradient-text  text-[13px] w-[150px] h-[44px] rounded-[15px]"
                    >
                      Chat With Buyer
                    </button>
                    <Button
                      onClick={() => setIsTrackOpen(true)}
                      customClass={"w-[150px]"}
                      text={"Track Order"}
                    />
                  </>
                )}
            </div>
          </div>
          <div className="grid lg:grid-cols-12 items-start gap-4  mt-4">
            <div className=" col-span-12  lg:col-span-8 ">
              <div className="p-4 bg-[#FFFFFF] border drop-shadow-sm rounded-[14px]">
                <div className="flex justify-between items-center">
                  <h3 className="text-[20px] font-[600]">Order Items</h3>
                  <div
                    className={`${currentStyle.bg} ${currentStyle.text}  mb-4 capitalize text-[14px] ml-auto p-3 font-[500]  h-[37px] rounded-full flex justify-center items-center`}
                  >
                    {displayStatus}
                  </div>
                </div>
                {singleOrder?.item?.map((item, i) => (
                  <div key={i} className="flex  py-1 justify-between">
                    <div className="flex gap-4 items-center">
                      <div className="w-[84px] flex items-center justify-center h-[84px] bg-[#F2FBF7] rounded-[15px]">
                        <img
                          src={item?.products?.images[0]}
                          className="w-[70px] rounded-md h-[70px]"
                          alt=""
                        />
                      </div>
                      <div>
                        <h3 className="text-[20px] text-[#000000] font-[600] ">
                          {item?.products?.name}
                        </h3>
                        <p className="text-[16px] font-[400] text-[#000000]">
                          <span className="text-[#959393]  ">Category:</span>{" "}
                          {item?.products?.category}
                        </p>
                        <p className="text-[16px] font-[400] text-[#000000]">
                          <span className="text-[#959393]  ">
                            Sub Category:
                          </span>{" "}
                          {item?.products?.subCategory}{" "}
                          <span className="text-[#959393]  ">Qty:</span>{" "}
                          {item?.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Order Details */}
                <div className="border-b border-t py-4 flex items-center justify-between border-[#D4D4D4]">
                  <p className="text-[#7C7C7C]  font-[400] text-[16px]">
                    Order ID
                  </p>
                  <p className="text-[#000000]  font-[400] text-[16px]">
                    #{singleOrder?.orderId}
                  </p>
                </div>
                <div className="border-b py-4 flex items-center justify-between border-[#D4D4D4]">
                  <p className="text-[#7C7C7C]  font-[400] text-[16px]">
                    Order Date
                  </p>
                  <p className="text-[#000000]  font-[400] text-[16px]">
                    {formatDate(singleOrder?.createdAt)}
                  </p>
                </div>
                {singleOrder?.type == "Scheduled" && (
                  <div className="border-b py-4 flex items-center justify-between border-[#D4D4D4]">
                    <p className="text-[#7C7C7C]  font-[400] text-[16px]">
                      Scheduled Date
                    </p>
                    <p className="text-[#000000]  font-[400] text-[16px]">
                      {formatDate(singleOrder?.createdAt)}
                    </p>
                  </div>
                )}
                <div className="border-b py-4 flex items-center justify-between border-[#D4D4D4]">
                  <p className="text-[#7C7C7C]  font-[400] text-[16px]">
                    Delivery Address
                  </p>
                  <p className="text-[#000000]  font-[400] text-[16px]">
                    {singleOrder?.address?.address}
                  </p>
                </div>
                <div className="border-b py-4 flex items-center justify-between border-[#D4D4D4]">
                  <p className="text-[#7C7C7C]  font-[400] text-[16px]">
                    Delivery Type
                  </p>
                  <p className="text-[#000000] capitalize font-[400] text-[16px]">
                    {" "}
                    {singleOrder?.type}
                  </p>
                </div>
                <div className="border-b py-4 flex items-center justify-between border-[#D4D4D4]">
                  <p className="text-[#7C7C7C]  font-[400] text-[16px]">
                    Special Instructions
                  </p>
                  <p className="text-[#000000]  font-[400] text-[16px]">
                    {singleOrder?.instruction || "-"}
                  </p>
                </div>
                <div className="border-b py-4 flex items-center justify-between border-[#D4D4D4]">
                  <p className="text-[#7C7C7C]  font-[400] text-[16px]">
                    User Name
                  </p>
                  <p
                    onClick={() =>
                      navigate("/app/customer-detail", {
                        state: { customer: singleOrder?.user },
                      })
                    }
                    className="text-[#000000] flex items-center gap-3 font-[400] text-[16px]"
                  >
                    <div className="border h-[43px] w-[43px] rounded-full p-[2px] border-[#03958A]">
                      <img
                        src={singleOrder?.user?.profilePicture}
                        alt="person"
                        className="w-full h-full rounded-full"
                      />
                    </div>
                    {singleOrder?.user?.name}
                  </p>
                </div>
                <div className="border-b py-4 flex items-center justify-between border-[#D4D4D4]">
                  <p className="text-[#7C7C7C]  font-[400] text-[16px]">
                    Email Address
                  </p>
                  <p className="text-[#000000]  font-[400] text-[16px]">
                    {singleOrder?.user?.email}
                  </p>
                </div>
                <div className=" py-4 flex items-center justify-between border-[#D4D4D4]">
                  <p className="text-[#7C7C7C]  font-[400] text-[16px]">
                    Contact Number
                  </p>
                  <p className="text-[#000000]  font-[400] text-[16px]">
                    {singleOrder?.user?.phone}
                  </p>
                </div>
              </div>
              {console.log(statusMap[orderStatus], "orderStatusChecking")}
              {statusMap[orderStatus] == "Delivered" && (
                <div className="border mt-4 col-span-12  lg:col-span-8 p-4 bg-[#FFFFFF] drop-shadow-sm rounded-[14px]">
                  <h3 className="text-[20px] capitalize font-[600] mb-4">
                    proof of delivery
                  </h3>
                  <div className="w-[190px] h-[165px] ">
                    <img
                      src={singleOrder?.confirmDeliveryFile}
                      className="rounded-lg h-full w-full"
                      alt="confirmDeliveryFile"
                      srcset=""
                    />
                  </div>
                  <p className="text-[16px] mt-2">
                    {singleOrder?.confirmDeliveryNote}
                  </p>
                </div>
              )}
            </div>

            <div className="lg:col-span-4 col-span-12 ">
              {statusMap[orderStatus] !== "Delivered" && (
                <div className="bg-[#FFFFFF] p-4   drop-shadow-sm rounded-[14px]">
                  <h3 className="text-[20px] font-[600] mb-4 text-[#000000] ">
                    Payment Details
                  </h3>
                  {singleOrder?.item?.map((item, i) => (
                    <div
                      key={i}
                      className="border-b border-t py-3 flex items-center justify-between border-[#D4D4D4]"
                    >
                      <p className="text-[#7C7C7C]  font-[400] text-[16px]">
                        {item?.products?.name}
                      </p>
                      <p className="text-[#000000] font-[400] text-[16px]">
                        ${Number(item?.products?.unitPrice || 0).toFixed(2)}
                      </p>
                    </div>
                  ))}
                  <div className="border-b border-t py-3 flex items-center justify-between border-[#D4D4D4]">
                    <p className="text-[#000000] capitalize font-[600] text-[16px]">
                      Sub Total
                    </p>
                    <p className="text-[#000000] font-[400] text-[16px]">
                      ${Number(singleOrder?.subTotal || 0).toFixed(2)}
                    </p>
                  </div>
                  <div className="border-b  py-3 flex items-center justify-between border-[#D4D4D4]">
                    <p className="text-[#7C7C7C]  font-[400] text-[16px]">
                      Total Items
                    </p>
                    <p className="text-[#000000]  font-[400] text-[16px]">
                      {singleOrder?.item?.length}
                    </p>
                  </div>
                  <div className=" py-3 flex items-center justify-between border-[#D4D4D4]">
                    <p className="text-[#202224]  font-[600] text-[16px]">
                      Total Amount
                    </p>
                    <p className="gradient-text  font-[700] text-[16px]">
                      ${Number(singleOrder?.total || 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              )}

              {statusMap[orderStatus] === "Delivered" && (
                <div className="bg-[#FFFFFF] p-4  drop-shadow-sm rounded-[14px]">
                  <h3 className="text-[20px] font-[600] mb-1 text-[#000000]">
                    Successfully Delivered
                  </h3>

                  <div className="col-span-6">
                    {/* Contact Number */}
                    <div className="py-1 flex items-center justify-between">
                      <p className="text-[#7C7C7C] flex items-center gap-2 font-[400] text-[16px]">
                        Delivery Date
                      </p>
                      <p className="text-[#000000] font-[400] text-[16px]">
                        {formatDate(singleOrder?.deliveryDateTime)}
                      </p>
                    </div>
                    <div className="py-1 flex items-center justify-between">
                      <p className="text-[#7C7C7C] flex items-center gap-2 font-[400] text-[16px]">
                        Delivery Time
                      </p>
                      <p className="text-[#000000] font-[400] text-[16px]">
                        {formatTime(singleOrder?.deliveryDateTime)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {(statusMap[orderStatus] === "Out for Delivery" ||
                statusMap[orderStatus] === "Ready For Pickup" ||
                statusMap[orderStatus] === "Delivered") &&
                singleOrder?.rider && (
                  <div className="bg-[#FFFFFF] p-4 mt-4 drop-shadow-sm rounded-[14px]">
                    <h3 className="text-[20px] font-[600] mb-1 text-[#000000]">
                      Rider Information
                    </h3>

                    <div className="col-span-6">
                      {/* Rider Header */}
                      <div className="py-4 flex items-center justify-between">
                        <p className="text-[#000000] flex items-center gap-3 font-[600] text-[14px]">
                          <div className="border h-[43px] w-[43px] rounded-full p-[2px] border-[#03958A]">
                            <img
                              src={singleOrder?.rider?.profilePicture}
                              className="h-full w-full rounded-full"
                              alt="person"
                            />
                          </div>
                          {singleOrder?.rider?.name}
                        </p>
                        <button
                          onClick={() =>
                            handleChatWithRider(singleOrder?.rider)
                          }
                        >
                          <img
                            src={ChatBtnIcon}
                            className="w-[34px] h-[34px]"
                            alt="chat"
                          />
                        </button>
                      </div>

                      {/* Contact Number */}
                      <div className="py-1 flex items-center justify-between">
                        <p className="text-[#464646] flex items-center gap-2 font-[500] text-[12px]">
                          <img
                            src={CallIcon}
                            className="w-[18px] h-[14px]"
                            alt="call"
                          />
                          Contact Number
                        </p>
                        <p className="text-[#464646] font-[500] text-[12px]">
                          {singleOrder?.rider?.phone}
                        </p>
                      </div>

                      {/* Email */}
                      <div className="py-1 flex items-center justify-between">
                        <p className="text-[#464646] flex items-center gap-2 font-[500] text-[12px]">
                          <img
                            src={MessageIcon}
                            className="w-[18px] h-[14px]"
                            alt="email"
                          />
                          Email Address
                        </p>
                        <p className="text-[#464646] font-[500] text-[12px]">
                          {singleOrder?.rider?.email}
                        </p>
                      </div>

                      {/* Vehicle Type */}
                      <div className="py-1 flex items-center justify-between">
                        <p className="text-[#464646] flex items-center gap-2 font-[500] text-[12px]">
                          <img
                            src={TruckIcon}
                            className="w-[18px] h-[14px]"
                            alt="truck"
                          />
                          Vehicle Type
                        </p>
                        <p className="text-[#464646] font-[500] capitalize text-[12px]">
                          {singleOrder?.vehicle?.vehicle}
                        </p>
                      </div>

                      {/* Vehicle Number */}
                      <div className="py-1 flex items-center justify-between">
                        <p className="text-[#464646] flex items-center gap-2 font-[500] text-[12px]">
                          <img
                            src={SubTitleIcon}
                            className="w-[18px] h-[14px]"
                            alt="icon"
                          />
                          Vehicle Number
                        </p>
                        <p className="text-[#464646] font-[500] text-[12px]">
                          {singleOrder?.vehicle?.registrationNumber}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              {statusMap[orderStatus] != "Delivered" && (
                <ShippingActivity
                  orderStatus={statusMap[orderStatus]}
                  setOrderStatus={handleStartPreparingClick}
                />
              )}
              {singleOrder?.deliveryMethod?.trim().toLowerCase() !== "store" &&
                statusMap[orderStatus] !== "Delivered" && (
                  <div className="bg-[#FFFFFF] px-6 p-4 mt-4 drop-shadow-sm rounded-[14px]">
                    <h3 className="text-[20px] font-[600] mb-1 text-[#000000]">
                      QR Code
                    </h3>
                    <QRCode
                      value={singleOrder?._id || ""}
                      className="mt-2 -ml-8 w-full"
                    />
                  </div>
                )}

              {statusMap[orderStatus] == "Delivered" &&
                singleOrder?.review?.length > 0 && (
                  <CustomerReviewCard review={singleOrder?.review} />
                )}
            </div>
          </div>
          {/* <OrderCancelConfirmModal
        setOrderStatus={setOrderStatus}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      /> */}
          <OrderTrackingModal
            isOpen={isTrackOpen}
            setIsOpen={setIsTrackOpen}
            order={singleOrder}
          />
        </div>
      )}
    </>
  );
}
