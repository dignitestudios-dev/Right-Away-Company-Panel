import React, { useEffect, useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { useLocation, useNavigate } from "react-router";
import {
  CallIcon,
  ChatBtnIcon,
  MessageIcon,
  MilkPackImg,
  Person1,
  PersonImage,
  ReplyComment,
  SubTitleIcon,
  TruckIcon,
} from "../../../assets/export";
import Button from "../../global/Button";
import OrderCancelConfirmModal from "./CancelOrderConfirmModal";

import { FaStar, FaRegStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelOrder,
  getOrderById,
  setSingleOrder,
} from "../../../redux/slices/AppSlice";
import { formatDate } from "../../../lib/helpers";
import { socket } from "../../../../socket";
import { ErrorToast, SuccessToast } from "../../global/Toaster";
import OrderDetailSkeleton from "../../global/DetailSkeliton";
import QRCode from "react-qr-code";
const CustomerReviewCard = () => {
  return (
    <div className="w-full mt-4  bg-white rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.1)] p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h2 className=" text-gray-900 text-[20px]  font-[600]">
          Customer Review
        </h2>
        <button className="text-[14px] border-b border-[#22B573] font-[400] gradient-text  underline">
          Report Review
        </button>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-2">
        <FaStar className="text-yellow-400 text-lg" />
        <FaStar className="text-yellow-400 text-lg" />
        <FaStar className="text-yellow-400 text-lg" />
        <FaStar className="text-yellow-400 text-lg" />
        <FaRegStar className="text-yellow-400 text-lg" />
      </div>

      {/* Review Text */}
      <p className="text-[#181818] text-[12px] mb-2 font-[400]">
        Amazing product. I booked on Monday and I got my order on the next day.
        I’m highly impressed with their services. Highly recommended!
      </p>

      {/* User Info */}
      <div className="flex relative items-center gap-3 mb-3">
        <img
          src={Person1}
          alt="Profile"
          className="w-10 h-10 rounded-full border-2 border-[#00B39F]"
        />

        <img
          src={ReplyComment}
          className="absolute top-11 left-4 w-[12px]"
          alt="ReplyComment"
        />

        <div>
          <h3 className="text-[12px] font-[500] text-[#181818]">
            Christine Easom
          </h3>
          <p className="text-[10px] font-[400] text-[#5C5C5C]">17 Jan, 2023</p>
        </div>
      </div>

      {/* Reply Section */}
      <div className="pl-3 ml-6 mb-2">
        <p className="text-[#181818] text-[12px] font-[400]">
          Amazing product. I’m highly impressed with their services. Highly
          recommended!
        </p>
      </div>

      {/* Replied Tag */}
      <div className="flex items-center gap-2 ml-8">
        <p className="text-[#181818] flex items-center mt-2 gap-2 text-[12px] font-medium">
          <img
            src="https://i.pravatar.cc/40?img=1"
            className="w-[32px] h-[32px] rounded-full object-cover"
          />{" "}
          Replied By You
        </p>
      </div>
    </div>
  );
};

export default function OrderDetail() {
  const navigate = useNavigate("");
  const [isOpen, setIsOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState();
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(""); // for radio
  const [loading, setLoading] = useState(false);

  const { singleOrder, isLoading } = useSelector((state) => state?.app);
  const loc = useLocation();
  const orderId = loc?.state?.id;
  const gerOrderDetail = async () => {
    dispatch(getOrderById(orderId));
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
  const statusStyles = {
    incoming: {
      bg: "bg-[#7D72F126]",
      text: "text-[#7D72F1]",
    },
    processing: {
      bg: "bg-[#FF6D0826]",
      text: "text-[#FF6D08]",
    },
    completed: {
      bg: "bg-[#20BD4A26]",
      text: "text-[#20BD4A]",
    },
    cancelled: {
      bg: "bg-[#DC1D0026]",
      text: "text-[#DC1D00]",
    },
  };

  useEffect(() => {
    // ✅ Success response listener
    socket.on("order:updated:status", (data) => {
      console.log("✅ Order status update success:", data);
      dispatch(setSingleOrder(data?.data));
      SuccessToast("Order status updated successfully!");
    });

    // ❌ Error response listener
    socket.on("order:update:status:error", (error) => {
      ErrorToast(error?.message);
    });

    // 🧹 Cleanup on unmount
    return () => {
      socket.off("order:updated:status");
      socket.off("order:update:status:error");
    };
  }, []);

  const handleStartPreparingClick = async (status) => {
    if (!selectedOption && status === "processing") {
      ErrorToast("Please select a delivery option before proceeding.");
      return;
    }

    try {
      socket.emit("order:update:status", {
        id: orderId,
        status: status,
      });
    } catch (error) {
      ErrorToast(error?.message);
    }
  };

  // ✅ Always safely select a style (fallback = 'incoming')
  const currentStyle =
    statusStyles[orderStatus?.toLowerCase?.()] || statusStyles["incoming"];

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
              Order Details
            </h3>
            <div className="flex items-center gap-4">
              {orderStatus == "incoming" && (
                <>
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-[#EE3131] font-[500] text-white  text-[13px] w-[150px] h-[44px] rounded-[15px]"
                  >
                    Cancel Order
                  </button>
                  <button className="bg-[#E7E7E8] font-[500] text-[#181818] text-[13px] w-[150px] h-[44px] rounded-[15px]">
                    Track Order
                  </button>
                </>
              )}
              {orderStatus == "processing" && (
                <>
                  <button
                    onClick={() => navigate("/app/chat")}
                    className="bg-transparent border border-[#03958A] font-[500] gradient-text  text-[13px] w-[150px] h-[44px] rounded-[15px]"
                  >
                    Chat With Buyer
                  </button>
                  <Button customClass={"w-[150px]"} text={"Track Order"} />
                </>
              )}
            </div>
          </div>
          <div className="grid lg:grid-cols-12 gap-4  mt-4">
            <div className="border col-span-12 lg:col-span-8 p-4 bg-[#FFFFFF] drop-shadow-sm rounded-[14px]">
              <div className="flex justify-between items-center">
                <h3 className="text-[20px] font-[600]">Order Items</h3>
                <div
                  className={`${currentStyle.bg} ${currentStyle.text} mb-4 capitalize text-[14px] ml-auto p-3 font-[500]  w-[110px] h-[37px] rounded-full flex justify-center items-center`}
                >
                  {orderStatus}
                </div>
              </div>
              {singleOrder?.item?.map((item, i) => (
                <div key={i} className="flex  py-2 mb-2 justify-between">
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
                        <span className="text-[#959393]  ">Sub Category:</span>{" "}
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
                <p className="text-[#000000]  font-[400] text-[16px]">
                  {" "}
                  {singleOrder?.type}
                </p>
              </div>
              <div className="border-b py-4 flex items-center justify-between border-[#D4D4D4]">
                <p className="text-[#7C7C7C]  font-[400] text-[16px]">
                  Special Instructions
                </p>
                <p className="text-[#000000]  font-[400] text-[16px]">
                  {singleOrder?.instruction}
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
            <div className="col-span-12 lg:col-span-4 ">
              <div className="bg-[#FFFFFF] p-4   drop-shadow-sm rounded-[14px]">
                <h3 className="text-[20px] font-[600] mb-4 text-[#000000] ">
                  Payment Details
                </h3>
                {singleOrder?.item?.map((item, i) => (
                  <div
                    key={i}
                    className="border-b border-t py-5 flex items-center justify-between border-[#D4D4D4]"
                  >
                    <p className="text-[#7C7C7C]  font-[400] text-[16px]">
                      {item?.products?.name}
                    </p>
                    <p className="text-[#000000] font-[400] text-[16px]">
                      ${Number(item?.products?.unitPrice || 0).toFixed(2)}
                    </p>
                  </div>
                ))}
                <div className="border-b border-t py-5 flex items-center justify-between border-[#D4D4D4]">
                  <p className="text-[#000000]  font-[600] text-[16px]">
                    subtotal
                  </p>
                  <p className="text-[#000000] font-[400] text-[16px]">
                    ${Number(singleOrder?.subTotal || 0).toFixed(2)}
                  </p>
                </div>
                <div className="border-b  py-5 flex items-center justify-between border-[#D4D4D4]">
                  <p className="text-[#7C7C7C]  font-[400] text-[16px]">
                    Total Items
                  </p>
                  <p className="text-[#000000]  font-[400] text-[16px]">
                    {singleOrder?.item?.length}
                  </p>
                </div>
                <div className=" py-5 flex items-center justify-between border-[#D4D4D4]">
                  <p className="text-[#202224]  font-[600] text-[16px]">
                    Total Amount
                  </p>
                  <p className="gradient-text  font-[700] text-[16px]">
                    ${Number(singleOrder?.total || 0).toFixed(2)}
                  </p>
                </div>
              </div>
              {orderStatus === "incoming" && (
                <div className="bg-[#FFFFFF] p-4 mt-4 h-[205px] drop-shadow-sm rounded-[14px]">
                  <h3 className="text-[20px] font-[600] mb-4 text-[#000000]">
                    Delivery Options
                  </h3>
                  
                  <div className="col-span-6">
                    <label className="flex items-center gap-2 cursor-pointer font-[500] text-[16px] text-[#262626]">
                      <input
                        type="radio"
                        name="deliveryOption"
                        value="platformRider"
                        checked={selectedOption === "platformRider"}
                        onChange={(e) => setSelectedOption(e.target.value)}
                        className="accent-[#0AA48B] w-4 h-4"
                      />
                      <span>Assign to Platform Riders</span>
                    </label>

                    <p className="text-[#686868] font-[400] text-[13px]">
                      System auto-assigns an available rider
                    </p>

                    <Button
                      onClick={() => handleStartPreparingClick("processing")}
                      text="Start Preparing Order"
                      loading={loading}
                      customClass="w-[332px] mx-auto mt-5"
                    />
                  </div>
                </div>
              )}

              {orderStatus == "Cancelled" && (
                <div className="bg-[#FFFFFF] p-4 mt-4 h-[205px] drop-shadow-sm rounded-[14px]">
                  <h3 className="text-[20px] font-[600] mb-4 text-[#000000] ">
                    Cancellation Reason
                  </h3>
                  <div className="col-span-6">
                    <h5 className="text-[16px] font-[500] text-[#000000] ">
                      Lorem ipsum
                    </h5>
                    <p className="text-[#7C7C7C] text-[15px] font-[400] mt-2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud
                    </p>
                  </div>
                </div>
              )}
              {(orderStatus === "processing" || orderStatus === "completed") &&
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
                              src={
                                singleOrder?.rider?.profilePicture
                                  ? singleOrder?.rider?.profilePicture
                                  : PersonImage
                              }
                              className="w-full h-full rounded-full"
                              alt="person"
                            />
                          </div>
                          {singleOrder?.rider?.name}
                        </p>
                        <button onClick={() => navigate("/app/chat")}>
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
                        <p className="text-[#464646] font-[500] text-[12px]">
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

              {orderStatus == "Completed" && <CustomerReviewCard />}
              {orderStatus == "processing" && (
                <Button
                  text={"Ready for Pickup"}
                  onClick={() => {
                    handleStartPreparingClick("pickUp");
                    navigate(`/app/order-track-detail`, {
                      state: { id: singleOrder?._id },
                    });
                  }}
                  customClass={"w-full mt-4"}
                />
              )}
            </div>
          </div>
          <OrderCancelConfirmModal
            orderId={singleOrder?._id}
            setOrderStatus={setOrderStatus}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </div>
      )}
    </>
  );
}
