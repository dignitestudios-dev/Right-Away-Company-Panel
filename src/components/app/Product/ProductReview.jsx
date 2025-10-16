import { FaFilePdf, FaMapMarkerAlt } from "react-icons/fa";
import Button from "../../global/Button";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router";
import { LargeImageMilk, MilkPackImg } from "../../../assets/export";

export default function ProductReview() {
  const navigate = useNavigate("");
  const stores = [
    {
      name: "Store 01",
      address: "123 Bay Street, Downtown Toronto M5J",
      stock: 258,
    },
    {
      name: "Store 02",
      address: "123 Bay Street, Downtown Toronto M5J",
      stock: 258,
    },
    {
      name: "Store 03",
      address: "123 Bay Street, Downtown Toronto M5J",
      stock: 258,
    },
    {
      name: "Store 04",
      address: "123 Bay Street, Downtown Toronto M5J",
      stock: 258,
    },
  ];

  return (
    <div className=" min-h-screen p-2">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-[32px] font-[600] flex items-center gap-2 text-[#202224]">
            <GoArrowLeft
              color="#22B573"
              className="cursor-pointer"
              onClick={() => navigate(-1)}
              size={21}
            />{" "}
            Product Details
          </h1>
          <Button
            text={"Publish Now"}
            onClick={() => navigate("/app/product-detail")}
            customClass="px-5 py-3"
          />
        </div>
      </div>
      <div className="bg-white rounded-2xl mt-4 shadow-sm border border-gray-200 p-6 grid grid-cols-12 gap-6 max-w-7xl mx-auto font-inter">
        {/* Left Side */}
        <div className="col-span-4">
          <div className="bg-[#F2FBF7] rounded-2xl flex justify-center items-center p-6">
            <img
              src={LargeImageMilk}
              alt="Product"
              className="h-56 object-contain"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex justify-between mt-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-[#F2FBF7] rounded-xl w-[70px] h-[70px] flex justify-center items-center cursor-pointer border hover:border-[#22b573]"
              >
                <img
                  src={MilkPackImg}
                  alt="Thumbnail"
                  className="w-12 object-contain"
                />
              </div>
            ))}
          </div>

          {/* Product Documents */}
          <div className="mt-12 bg-[#F4F4F4] rounded-[18px] p-3 ">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-[#181818] text-[16px]">
                Product Documents
              </h3>
              <button className="gradient-text text-sm font-medium border-b border-[#22B573]">
                Add New
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                "Material Safety",
                "Product Specs",
                "Product Specs",
                "Material Safety",
                "Product Specs",
                "Product Specs",
              ].map((label, i) => (
                <div
                  key={i}
                  className="rounded-xl p-2 flex flex-col items-center justify-center text-center cursor-pointer hover:border hover:border-[#22b573]"
                >
                  <div className="bg-[#FFFFFF] rounded-[9px] p-3 w-full flex items-center justify-center h-[74px] ">
                    <FaFilePdf className="text-red-600 text-3xl mb-1" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="col-span-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-[22px] font-[600] text-[#000000]">
                Product Name
              </h1>
              <p className="text-[#838383] text-[13px] mt-2 leading-relaxed font-[400]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor labore et dolore magna aliqua. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit.
              </p>
            </div>
            <h2 className="gradient-text font-bold text-[24px]">
              $125.00
              <span className="text-[10px] font-[400] ml-1">/Unit</span>
            </h2>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-4 mt-6 border-t border-gray-200 pt-4">
            <div className="border-r border-[#EEEEEE]">
              <p className="text-[#181818] mb-1 text-[14px] font-[500] capitalize">
                Category
              </p>
              <p className="font-[400] text-[12px] text-[#838383]">
                Building Material
              </p>
            </div>
            <div className="border-r border-[#EEEEEE]">
              <p className="text-[#181818] mb-1 text-[14px] font-[500] capitalize">
                Sub Category
              </p>
              <p className="font-[400] text-[12px] text-[#838383]">
                Concrete Blocks
              </p>
            </div>
            <div className="border-r border-[#EEEEEE]">
              <p className="text-[#181818] mb-1 text-[14px] font-[500] capitalize">
                Total Stock
              </p>
              <p className="font-[400] text-[12px] text-[#838383]">942</p>
            </div>
            <div>
              <p className="text-[#181818] mb-1 text-[14px] font-[500] capitalize">
                Package Size
              </p>
              <p className="font-[400] text-[12px] text-[#838383]">
                54 x 57 x 47 Ft
              </p>
            </div>
          </div>

          {/* Dimensions */}
          <div className="grid grid-cols-5 gap-y-4 mt-4 gap-4 border-t border-gray-200 pt-4">
            {[
              "Package Weight",
              "Item Height",
              "Item Width",
              "Item Length",
              "Item Weight",
            ].map((label) => (
              <div key={label} className="border-r border-[#EEEEEE]">
                <p className="text-[#181818] text-[14px] font-[500] mb-1">
                  {label}
                </p>
                <p className="text-[#838383] text-[12px] font-[400]">
                  {label === "Item Weight" || label === "Package Weight"
                    ? "Lbs"
                    : "Ft"}
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor labore et dolore magna aliqua. Lorem ipsum dolor
              sit amet, consectetur adipiscing elit.
            </p>
          </div>

          {/* Available Location */}
          <div className="mt-8 border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-[500] text-[#181818] text-[22px]">
                Available Location
              </h3>
              <button className="gradient-text text-sm font-medium border-b border-[#03958A]">
                Add New Location
              </button>
            </div>

            <div className="space-y-2">
              {stores.map((store, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b border-gray-200 rounded-xl p-2"
                >
                  <div>
                    <h4 className="font-medium text-[#181818] text-[14px]  ">
                      {store.name}
                    </h4>
                    <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                      <FaMapMarkerAlt className="text-[#22b573]" />{" "}
                      {store.address}
                    </p>
                  </div>
                  <p className="text-[#181818] font-medium text-[14px]">
                    Total Stock <br />
                    <span className="font-normal text-[12px]">
                      {store.stock} Units
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
