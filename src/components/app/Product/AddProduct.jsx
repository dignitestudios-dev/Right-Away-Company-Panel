import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdOutlineCloudUpload } from "react-icons/md";
import Button from "../../global/Button";
import { GoArrowLeft } from "react-icons/go";
import { AddBtnImg, CameraImg } from "../../../assets/export";
import Input from "../../global/Input";
import AddInventory from "./AddInventory";
export default function AddNewProduct() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-[#F6FBF8] min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-[32px] font-[600] flex items-center gap-2 text-[#202224]">
            <GoArrowLeft color="#22B573" size={21} /> Add New Product
          </h1>
          <Button text={"Add Product"} customClass="px-5 py-3" />
        </div>

        {/* Product Form */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Side */}

          {/* Basic Product Details */}
          <div className="bg-white col-span-12 lg:col-span-8 space-y-6 p-6 rounded-2xl shadow-sm">
            <h2 className="font-semibold text-lg text-gray-800 mb-4">
              Basic Product Details
            </h2>
            <label htmlFor="" className="font-[500] text-[14px]">
              Product Description
            </label>
            <textarea
              placeholder="Enter Product Description"
              rows={8}
              className="w-full  border bg-[#F8F8F8] border-[#F8F8F8] rounded-[15px] p-3 text-sm text-[#959393] outline-none resize-none"
            ></textarea>

            <div className="grid grid-cols-2 gap-4 ">
              <div className="w-full">
                <label htmlFor="" className="font-[500] text-[14px]">
                  Category
                </label>
                <br />
                <select className="border w-full bg-[#F8F8F8]  border-gray-200 rounded-xl p-3 text-sm text-[#B7B7B7] outline-none">
                  <option>Select Category</option>
                </select>
              </div>
              <div className="w-full">
                <label htmlFor="" className="font-[500] text-[14px]">
                  Sub Category
                </label>
                <br />
                <select className="border w-full bg-[#F8F8F8] border-gray-200 rounded-xl p-3 text-sm text-[#B7B7B7] outline-none">
                  <option>Select Sub Category</option>
                </select>
              </div>
            </div>
          </div>
          {/* Right Side — Product Images */}

          <div className="bg-white col-span-12 h-full lg:col-span-4 p-6 rounded-2xl shadow-sm">
            <h2 className="font-semibold text-lg text-gray-800 mb-4">
              Product Images
            </h2>
            <div className="border-2 border-dashed bg-[#FBFBFB] border-gray-300 rounded-xl h-[320px] flex flex-col justify-center items-center cursor-pointer hover:bg-gray-50">
              <img
                src={CameraImg}
                alt="CameraImg"
                className="w-[30px] h-[30px]"
              />
              <p className="text-[16px] mt-2 font-[500] text-[#181818]">
                Click To Upload{" "}
                <span className="text-[#959393] text-[13px] font-[500]">
                  {" "}
                  or Drag & Drop{" "}
                </span>
              </p>
            </div>
          </div>

          {/* Item Dimensions & Weight */}
          <div className="bg-white col-span-12 lg:col-span-6 p-6 rounded-2xl shadow-sm">
            <h2 className="text-[22px] font-[500] text-[#000000] mb-5">
              Item Dimensions & Weight
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <Input
                text={"Height"}
                holder={"ft"}
                name={"height"}
                type={"text"}
                bg={true}
              />
              <Input
                text={"Width"}
                holder={"ft"}
                name={"width"}
                type={"text"}
                bg={true}
              />
              <Input
                text={"Length"}
                holder={"ft"}
                name={"length"}
                type={"text"}
                bg={true}
              />
              <Input
                text={"Weight"}
                holder={"lbs"}
                name={"weight"}
                type={"text"}
                bg={true}
              />
            </div>
          </div>

          <div className="bg-white col-span-12 lg:col-span-6 p-6 rounded-2xl shadow-sm">
            <h2 className="text-[22px] font-[500] text-[#000000] mb-5">
              Package Details
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <Input
                text={"Height"}
                holder={"ft"}
                name={"height"}
                type={"text"}
                bg={true}
              />
              <Input
                text={"Width"}
                holder={"ft"}
                name={"width"}
                type={"text"}
                bg={true}
              />
              <Input
                text={"Length"}
                holder={"ft"}
                name={"length"}
                type={"text"}
                bg={true}
              />
              <Input
                text={"Weight"}
                holder={"lbs"}
                name={"weight"}
                type={"text"}
                bg={true}
              />
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div className="bg-white p-6  col-span-12 rounded-2xl shadow-sm">
            <h2 className="text-[22px] font-[500] text-[#000000] mb-5">
              Pricing & Inventory
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <Input
                text={"Price Per Unit"}
                holder={"Fixed Price"}
                name={"price"}
                type={"text"}
                bg={true}
              />
              <Input
                text={"Unit of Measurement"}
                holder={"lbs"}
                name={"unit"}
                type={"text"}
                bg={true}
              />
              <div>
                <label htmlFor="" className="font-[500] text-[14px]">
                  Inventory Details
                </label>
                <div className="mt-2 flex justify-between items-center px-2 h-[50px] rounded-[10px] bg-[#F8F8F899] border-none ">
                  <p className="text-[#959393] font-[400] text-[16px]">
                    Add Inventory Details
                  </p>
                  <button onClick={() => setIsOpen(!isOpen)}>
                    <img
                      src={AddBtnImg}
                      className="w-[25px] h-[25px]"
                      alt="AddBtnImg"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery & Shipping */}
          <div className="bg-white col-span-12 lg:col-span-6 p-6 rounded-2xl shadow-sm">
            <h2 className="font-semibold text-lg text-gray-800 mb-4">
              Delivery and Shipping Details
            </h2>
            <Input
              text={"Special Handling Instructions"}
              holder={"Details Here"}
              name={"special"}
              type={"text"}
              bg={true}
            />
          </div>

          <div className="bg-white col-span-12 lg:col-span-6 p-6 rounded-2xl shadow-sm">
            <h2 className="font-semibold text-lg text-gray-800 mb-2">
              Product Documents
            </h2>
            <p className="text-sm text-gray-500 mb-3">
              Upload Product Specification PDF (Optional): Datasheet, Material
              Safety Sheet
            </p>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col justify-center items-center cursor-pointer hover:bg-gray-50">
              <MdOutlineCloudUpload className="text-gray-400 text-2xl mb-2" />
              <p className="text-sm text-gray-600">Upload “document name”</p>
              <p className="text-xs text-gray-400">Up to 20MBs, JPG, PNG</p>
            </div>
          </div>
        </div>
      </div>
      <AddInventory isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
