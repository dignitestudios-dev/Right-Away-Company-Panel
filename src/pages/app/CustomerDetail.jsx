import { useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { useLocation, useNavigate } from "react-router";
import Button from "../../components/global/Button";
import ReportModal from "../../components/app/Customer/ReportReasonModal";
import CustomerDetailOrders from "../../components/app/Customer/CustomerDetailOrders";
import Filter from "../../components/global/Filter";

export default function CustomerDetail() {
  const navigate = useNavigate("");
  const [isReportOpen, setIsReportOpen] = useState(false);
  const loc = useLocation();
  const customer = loc?.state?.customer;
  console.log(customer, "customer name");
  return (
    <div className="py-4">
      <div className="flex justify-between ">
        <h3 className="font-[600] text-[32px] flex items-center gap-2">
          {" "}
          <GoArrowLeft
            onClick={() => navigate(-1)}
            className="text-[#03958A] cursor-pointer "
            size={21}
          />{" "}
          Customer Details
        </h3>
        <div className="flex items-center gap-4">
          <Button
            onClick={() => setIsReportOpen(true)}
            customClass={"w-[150px]"}
            text={"Report User"}
          />
        </div>
      </div>
      <div className="mt-4 bg-white rounded-[15px] shadow-[6px_6px_54px_0px_#0000000D] p-6 flex-wrap  lg:flex  items-center gap-6 mx-auto">
        {/* Left Side: Profile */}
        <div className="flex items-center gap-4 w-full pr-6">
          <div className="relative">
            <img
              src={customer?.profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full border p-1 border-dashed border-[#22B573] object-cover"
            />
          </div>
          <div>
            <h2 className="text-[26px] text-[#000000] font-[600]">
              {customer?.name}
            </h2>
            <p className="text-[#959393] font-[400] text-[16px]">
              {customer?.email}
            </p>
            <p className="text-[#959393] font-[400] text-[16px]">
              {customer?.phone}
            </p>
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="mt-5 lg:mt-0">      
          <div className="flex-1 mt-3 py-3 border-t grid-cols-1 grid lg:grid-cols-3 gap-y-4 gap-x-8 text-sm text-gray-700">
            <div className="border-r  border-[#BDBDBD]">
              <p className="text-[#959393] text-[16px] font-[400]">Country</p>
              <p className="font-[400] text-[16px] text-[#000000]">
                {customer?.country}
              </p>
            </div>
            <div className="border-r border-[#BDBDBD]">
              <p className="text-[#959393] text-[16px] font-[400]">City</p>
              <p className="font-[400] text-[16px] text-[#000000]">
                {customer?.city}
              </p>
            </div>
            <div>
              <p className="text-[#959393] text-[16px] font-[400]">Address</p>
              <p className="font-[400] text-[16px] text-[#000000]">
                {customer?.address}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-10">
        <h3 className="font-[600] text-[32px] flex items-center gap-2">
          Order History
        </h3>
        <div className="flex items-center gap-4">
          <Filter hide={true} dateHide={true} />
        </div>
      </div>
      <CustomerDetailOrders customer={customer} />
      <ReportModal isOpen={isReportOpen} setIsOpen={setIsReportOpen} />
    </div>
  );
}
