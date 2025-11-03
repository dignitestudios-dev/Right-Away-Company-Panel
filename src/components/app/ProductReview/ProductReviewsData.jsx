import React, { useState } from "react";
import { MilkPackImg, Person2, RatingIcon } from "../../../assets/export";
import { NavLink } from "react-router";
import GlobalTable from "../../global/Table";
import Pagination from "../../global/Pagination";
import ProductRatingReviewModal from "./ProductRatingReviewModal";

export default function ProductReviewsData() {
  const [isOpen, setIsOpen] = useState(false);
  const columns = [
    "Order ID",
    "Customer Name",
    "Description",
    "Ratings",
    "Date",
    "Product Name",
    "Action",
  ];

  const orders = [
    {
      _id: "1",
      id: "#546979",
      name: "Christine Easom",
      description: "lorem ipsum dolor amet aute...",
      rating: 4.5,
      date: "20 jan, 2024",
      productName: "Product Name",
    },
    {
      _id: "2",
      id: "#546979",
      name: "Christine Easom",
      description: "lorem ipsum dolor amet aute...",
      rating: 4.5,
      date: "20 jan, 2024",
      productName: "Product Name",
    },
    {
      _id: "3",
      id: "#546979",
      name: "Christine Easom",
      description: "lorem ipsum dolor amet aute...",
      rating: 4.5,
      date: "20 jan, 2024",
      productName: "Product Name",
    },
    {
      _id: "4",
      id: "#546979",
      name: "Christine Easom",
      description: "lorem ipsum dolor amet aute...",
      rating: 4.5,
      date: "20 jan, 2024",
      productName: "Product Name",
    },
    {
      _id: "5",
      id: "#546979",
      name: "Christine Easom",
      description: "lorem ipsum dolor amet aute...",
      rating: 4.5,
      date: "20 jan, 2024",
      productName: "Product Name",
    },
    {
      _id: "6",
      id: "#546979",
      name: "Christine Easom",
      description: "lorem ipsum dolor amet aute...",
      rating: 4.5,
      date: "20 jan, 2024",
      productName: "Product Name",
    },
    {
      _id: "7",
      id: "#546979",
      name: "Christine Easom",
      description: "lorem ipsum dolor amet aute...",
      rating: 4.5,
      date: "20 jan, 2024",
      productName: "Product Name",
    },
    {
      _id: "8",
      id: "#546979",
      name: "Christine Easom",
      description: "lorem ipsum dolor amet aute...",
      rating: 4.5,
      date: "20 jan, 2024",
      productName: "Product Name",
    },
    {
      _id: "9",
      id: "#546979",
      name: "Christine Easom",
      description: "lorem ipsum dolor amet aute...",
      rating: 4.5,
      date: "20 jan, 2024",
      productName: "Product Name",
    },
    {
      _id: "10",
      id: "#546979",
      name: "Christine Easom",
      description: "lorem ipsum dolor amet aute...",
      rating: 4.5,
      date: "20 jan, 2024",
      productName: "Product Name",
    },
  ];

  // ✅ Properly structure rows for GlobalTable
  const data = orders.map((item, index) => ({
    _id: item._id,
    cells: [
      <p key={index + "-id"} className="text-[#181818] text-[14px] font-[400]">
        {item.id}
      </p>,

      <div key={index + "-name"} className="flex items-center gap-3">
        <img
          src={Person2}
          alt="Person"
          className="w-10 h-10 rounded-full border border-[#00C49A] object-cover"
        />
        <div>
          <p className="font-medium text-[14px]">{item.name}</p>
        </div>
      </div>,

      <p
        key={index + "-description"}
        className="text-[#181818] text-[14px] font-[400]"
      >
        {item.description}
      </p>,

      <div key={index + "-rating"} className="flex items-center gap-1">
        <span className="text-yellow-500">
          <img src={RatingIcon} alt="" className="w-[16px] h-[15px]" />{" "}
        </span>
        <p className="text-[#181818] text-[14px] font-[400]">{item.rating}</p>
      </div>,

      <p
        key={index + "-date"}
        className="text-[#181818] text-[14px] font-[400]"
      >
        {item.date}
      </p>,

      <div key={index + "-product"} className="flex items-center gap-2">
        <img src={MilkPackImg} alt="Product" className="w-8 h-8 object-cover" />
        <p className="text-[#181818] text-[14px] font-[400]">
          {item.productName}
        </p>
      </div>,

      <div key={index + "-action"} className="flex items-center gap-3">
        <button
          onClick={() => setIsOpen(true)}
          className="text-[#00C49A] font-[500] border-b border-[#00C49A]"
        >
          View Details
        </button>
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
      <ProductRatingReviewModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
