import React, { useEffect, useState } from "react";
import { Person2 } from "../../../assets/export";
import GlobalTable from "../../global/Table";
import Pagination from "../../global/Pagination";
import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getCustomers } from "../../../redux/slices/AppSlice";

export default function CustomersData() {
  const [isOpen, setIsOpen] = useState(false);
  const columns = [
    "Customer Name",
    "Email Address",
    "Phone Number",
    "Location",
    "Action",
  ];

  const { Customers } = useSelector((state) => state?.app);
  const dispatch = useDispatch();
  const fetchCustomers = async () => {
    await dispatch(getCustomers()).unwrap();
  };
  useEffect(() => {
    fetchCustomers();
  }, []);
  // const customers = [
  //   {
  //     _id: "1",
  //     name: "Christine Easom",
  //     email: "christine@example.com",
  //     phone: "+1 (555) 123-4567",
  //     location: "New York, USA",
  //   },
  //   {
  //     _id: "2",
  //     name: "Michael Johnson",
  //     email: "michael.j@example.com",
  //     phone: "+1 (555) 987-6543",
  //     location: "Los Angeles, USA",
  //   },
  //   {
  //     _id: "3",
  //     name: "Sarah Williams",
  //     email: "sarah.w@example.com",
  //     phone: "+1 (555) 222-3344",
  //     location: "Chicago, USA",
  //   },
  //   {
  //     _id: "4",
  //     name: "David Brown",
  //     email: "david.b@example.com",
  //     phone: "+1 (555) 876-5432",
  //     location: "Houston, USA",
  //   },
  //   {
  //     _id: "5",
  //     name: "Emily Davis",
  //     email: "emily.d@example.com",
  //     phone: "+1 (555) 444-1122",
  //     location: "San Francisco, USA",
  //   },
  //   {
  //     _id: "6",
  //     name: "Daniel Garcia",
  //     email: "daniel.g@example.com",
  //     phone: "+1 (555) 666-7788",
  //     location: "Miami, USA",
  //   },
  //   {
  //     _id: "7",
  //     name: "Sophia Martinez",
  //     email: "sophia.m@example.com",
  //     phone: "+1 (555) 999-1234",
  //     location: "Seattle, USA",
  //   },
  //   {
  //     _id: "8",
  //     name: "James Anderson",
  //     email: "james.a@example.com",
  //     phone: "+1 (555) 333-5566",
  //     location: "Denver, USA",
  //   },
  //   {
  //     _id: "9",
  //     name: "Olivia Taylor",
  //     email: "olivia.t@example.com",
  //     phone: "+1 (555) 777-8888",
  //     location: "Boston, USA",
  //   },
  //   {
  //     _id: "10",
  //     name: "William Thompson",
  //     email: "william.t@example.com",
  //     phone: "+1 (555) 555-9999",
  //     location: "Atlanta, USA",
  //   },
  // ];

  // ✅ Properly structure rows for GlobalTable
  console.log(Customers, "customer--->");
  const data = Customers?.map((item, index) => ({
    _id: item.userId,
    cells: [
      <div key={index + "-name"} className="flex items-center gap-3">
        <img
          src={Person2}
          alt="Person"
          className="w-10 h-10 rounded-full border border-[#00C49A] object-cover"
        />
        <div>
          <p className="font-medium text-[14px]">{item?.name}</p>
        </div>
      </div>,

      <p
        key={index + "-description"}
        className="text-[#181818] text-[14px] font-[400]"
      >
        {item?.email}
      </p>,
      <p
        key={index + "-date"}
        className="text-[#181818] text-[14px] font-[400]"
      >
        {item?.phone}
      </p>,
      <p
        key={index + "-date"}
        className="text-[#181818] text-[14px] font-[400]"
      >
        {item?.address}
      </p>,
      <div key={index + "-action"} className="flex items-center gap-3">
        <NavLink
          to={"/app/customer-detail"}
          state={{ customer: item }}
          className="text-[#00C49A] font-[500] border-b border-[#00C49A]"
        >
          View Details
        </NavLink>
      </div>,
    ],
  }));
  return (
    <>
      <div className="mt-4 rounded-2xl shadow-sm border-t p-2 border-[#B9B9B9] bg-[#FFFFFF] ">
        {/* ✅ Pass structured data to GlobalTable */}
        <GlobalTable data={data} columns={columns} />
      </div>
      <Pagination />
    </>
  );
}
