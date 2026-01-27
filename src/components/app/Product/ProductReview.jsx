import { FaFilePdf, FaMapMarkerAlt } from "react-icons/fa";
import Button from "../../global/Button";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router";
import { LargeImageMilk, MilkPackImg } from "../../../assets/export";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

export default function ProductReview({
  reviewData,
  onBack,
  onConfirm,
  isLoading,
  inventoryAdd,
  inventories,
  handleDocChange,
  productDocs,
  uploadError,
  setProductDocs,
  productImages,
  setProductImages,
  handleImageChange,
}) {
  const navigate = useNavigate();
  const [selectedImg, setSelectedImg] = useState(null);
  const { stores } = useSelector((state) => state?.auth);
  const { values } = reviewData || {};
  useEffect(() => {
    if (productImages?.length > 0) {
      setSelectedImg(URL.createObjectURL(productImages[0]));
    } else {
      setSelectedImg(null); // no image selected
    }
  }, [productImages]);

  return (
    <div className=" min-h-screen p-2">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-[32px] font-[600] flex items-center gap-2 text-[#202224]">
            <GoArrowLeft
              color="#22B573"
              className="cursor-pointer"
              onClick={onBack}
              size={21}
            />{" "}
            Product Details
          </h1>
          <Button
            text={"Publish Now"}
            loading={isLoading}
            onClick={onConfirm}
            customClass="px-5 py-3"
          />
        </div>
      </div>
      <div className="bg-white rounded-2xl mt-4 shadow-sm border border-gray-200 p-6 grid grid-cols-12 gap-6 max-w-7xl mx-auto font-inter">
        {" "}
        {/* Left Side */}{" "}
        <div className="col-span-12 lg:col-span-4">
          {" "}
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-[#181818] text-[16px]">
              {" "}
              Product Images{" "}
            </h3>{" "}
            <label
              htmlFor="productImages"
              className="gradient-text cursor-pointer text-sm font-medium border-b border-[#22B573]"
            >
              <input
                type="file"
                multiple
                accept="image/jpeg,image/jpg,image/png"
                className="hidden"
                id="productImages"
                name="productImages"
                onChange={handleImageChange}
              />
              Add New{" "}
            </label>
          </div>
          <div className="bg-[#F2FBF7] rounded-2xl flex justify-center items-center p-6 h-56">
            {selectedImg ? (
              <img
                src={selectedImg}
                alt="Product"
                className="h-56 object-contain"
              />
            ) : (
              <p className="text-gray-400 font-medium text-sm">
                No images available
              </p>
            )}
          </div>
          {/* Thumbnails */}{" "}
          <div className="grid grid-cols-4 gap-2 w-full p-3 mt-4">
            {productImages?.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImg(URL.createObjectURL(img))}
                className="bg-[#F2FBF7] relative rounded-xl  h-[70px] flex justify-center items-center cursor-pointer border hover:border-[#22b573]"
              >
                {" "}
                <img
                  src={URL.createObjectURL(img)}
                  alt="Thumbnail"
                  className="w-full h-full object-contain"
                />{" "}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setProductImages((prev) =>
                      prev.filter((_, i) => i !== idx),
                    );
                  }}
                  className="absolute flex justify-center items-center top-1 right-1 w-[20px] h-[20px] bg-white rounded-full text-red-500 font-bold"
                >
                  <IoMdClose />
                </button>
              </div>
            ))}
          </div>
          {/* Product Documents */}{" "}
          <div className="mt-12 bg-[#F4F4F4] rounded-[18px] p-3 ">
            {" "}
            <div className="flex justify-between items-center mb-3">
              {" "}
              <h3 className="font-bold text-[#181818] text-[16px]">
                {" "}
                Product Documents{" "}
              </h3>{" "}
              <label
                htmlFor="productDocuments"
                className="gradient-text cursor-pointer text-sm font-medium border-b border-[#22B573]"
              >
                {" "}
                Add New{" "}
                <input
                  type="file"
                  multiple
                  accept="application/pdf"
                  className="hidden"
                  name="productDocuments"
                  id="productDocuments"
                  onChange={handleDocChange}
                />
              </label>
            </div>{" "}
            {uploadError && (
              <p className="text-red-500 text-sm mt-1">{uploadError}</p>
            )}{" "}
            <div className="grid grid-cols-3 gap-3">
              {" "}
              {productDocs?.map((label, idx) => (
                <div
                  key={idx}
                  className="rounded-xl p-2 flex flex-col items-center justify-center text-center cursor-pointer hover:border hover:border-[#22b573]"
                >
                  {" "}
                  <div className="bg-[#FFFFFF] rounded-[9px] p-3 w-full flex items-center justify-center h-[74px] ">
                    {" "}
                    <FaFilePdf className="text-red-600 text-3xl mb-1" />{" "}
                  </div>{" "}
                  <p className="text-sm font-medium text-gray-700">
                    {label?.name.slice(0, 12)}...
                  </p>{" "}
                  <button
                    className="text-red-500 text-sm"
                    onClick={() =>
                      setProductDocs((prev) => prev.filter((_, i) => i !== idx))
                    }
                  >
                    Remove
                  </button>
                </div>
              ))}{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        {/* Right Side */}{" "}
        <div className="col-span-12 lg:col-span-8">
          {" "}
          <div className="flex justify-between items-start">
            {" "}
            <div>
              {" "}
              <h1 className="text-[22px] font-[600] text-[#000000]">
                {" "}
                {values?.name}
              </h1>{" "}
              <p className="text-[#838383] text-[13px] mt-2 leading-relaxed font-[400]">
                {" "}
                {values?.description}
              </p>{" "}
            </div>{" "}
            <h2 className="gradient-text font-bold text-[24px]">
              {" "}
              ${values?.unitPrice}
              <span className="text-[10px] font-[400] ml-1">/Unit</span>{" "}
            </h2>{" "}
          </div>{" "}
          {/* Product Details */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-4 mt-6 border-t border-gray-200 pt-4">
            <div className="border-r border-[#EEEEEE]">
              <p className="text-[#181818] mb-1 text-[14px] font-[500] capitalize">
                Category
              </p>
              <p className="font-[400] text-[12px] text-[#838383]">
                {values?.category || "N/A"}
              </p>
            </div>

            <div className="border-r border-[#EEEEEE]">
              <p className="text-[#181818] mb-1 text-[14px] font-[500] capitalize">
                Sub Category
              </p>
              <p className="font-[400] text-[12px] text-[#838383]">
                {values?.subCategory || "Concrete Blocks"}
              </p>
            </div>

            <div className="border-r border-[#EEEEEE]">
              <p className="text-[#181818] mb-1 text-[14px] font-[500] capitalize">
                Total Stock
              </p>
              <p className="font-[400] text-[12px] text-[#838383]">
                {inventories?.[0]?.stock ?? "0"}
              </p>
            </div>

            <div>
              <p className="text-[#181818] mb-1 text-[14px] font-[500] capitalize">
                Package Size
              </p>
              <p className="font-[400] text-[12px] text-[#838383]">
                {`${values?.packageLength || 0} x ${values?.packageWidth || 0} x ${
                  values?.packageHeight || 0
                } in`}
              </p>
            </div>
          </div>
          {/* Dimensions */}
          <div className="grid grid-cols-5 gap-y-4 mt-4 gap-4 border-t border-gray-200 pt-4">
            {[
              {
                label: "Package Weight",
                value: `${values?.packageWeight || 0} Lbs`,
              },
              {
                label: "Package Item Size",
                value: `${values?.itemLength || 0} x ${values?.itemWidth || 0} x ${
                  values?.itemHeight || 0
                } in`, // ✅ combined dimensions like package size
              },
              { label: "Item Weight", value: `${values?.itemWeight || 0} Lbs` },
            ].map((item, idx) => (
              <div key={idx} className="border-r border-[#EEEEEE]">
                <p className="text-[#181818] text-[14px] font-[500] mb-1">
                  {item.label}
                </p>
                <p className="text-[#838383] text-[12px] font-[400]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
          {/* Special Handling */}
          <div className="mt-6 border-t border-gray-200 pt-4">
            <h3 className="font-semibold text-gray-900 text-sm mb-2">
              Special Handling Instructions
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              {values?.instructions ||
                "No special handling instructions provided."}
            </p>
          </div>
          {/* Available Location */}{" "}
          <div className="mt-8 border-t border-gray-200 pt-4">
            {" "}
            <div className="flex justify-between items-center mb-3">
              {" "}
              <h3 className="font-[500] text-[#181818] text-[22px]">
                {" "}
                Available Location{" "}
              </h3>{" "}
              <button
                onClick={inventoryAdd}
                className="gradient-text text-sm font-medium border-b border-[#03958A]"
              >
                {" "}
                Add New Location{" "}
              </button>{" "}
            </div>{" "}
            <div className="space-y-2">
              {" "}
              {inventories.map((store, index) => {
                // find the actual store object by its ID
                const matchedStore = stores?.find(
                  (el) => el._id === store?.storeName,
                );

                return (
                  <div
                    key={index}
                    className="flex justify-between items-center border-b border-gray-200 rounded-xl p-2"
                  >
                    {/* Left side */}
                    <div>
                      <h4 className="font-medium text-[#181818] text-[14px]">
                        {matchedStore?.name || "Unknown Store"}
                      </h4>

                      <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                        <FaMapMarkerAlt className="text-[#22b573]" />
                        {matchedStore?.address || "No address available"}
                      </p>
                    </div>

                    {/* Right side */}
                    <p className="text-[#181818] font-medium text-[14px] text-right">
                      Total Stock <br />
                      <span className="font-normal text-[12px]">
                        {store.stock} Units
                      </span>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
