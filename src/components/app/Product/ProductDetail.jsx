import { FaFilePdf, FaMapMarkerAlt } from "react-icons/fa";
import Button from "../../global/Button";
import { GoArrowLeft } from "react-icons/go";
import { useLocation, useNavigate } from "react-router";
import { DelIcon, LargeImageMilk, MilkPackImg } from "../../../assets/export";
import { FaStar } from "react-icons/fa";
import ReviewsSection from "./UserReviews";
import DeleteProductModal from "./DeleteProductModal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsById } from "../../../redux/slices/AppSlice";

const RatingDisplay = ({ rating = 0 }) => {
  const totalRatings = rating;

  return (
    <div className="flex items-center space-x-2">
      {/* Stars */}
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={`${
              index < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Rating Value */}
      <p className="text-[#181818] font-[600] text-[14px]">{rating}</p>

      {/* Total Ratings */}
      <p className="text-[#0084FF] text-[13px] font-[300]">
        {totalRatings} Ratings
      </p>
    </div>
  );
};

export default function ProductDetail() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate("");
  const { singleProduct, isLoading } = useSelector((state) => state?.app);
  const loc = useLocation();
  const dispatch = useDispatch();
  const id = loc?.state?.id;
  const getProductDetail = async () => {
    dispatch(getProductsById(id));
  };
  useEffect(() => {
    const fetchProduct = async () => {
      await getProductDetail();
    };
    fetchProduct();
  }, [id]);
  return (
    <div className=" min-h-screen p-2">
      <div className="max-w-8xl mx-auto space-y-6">
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
          <div className="flex items-center gap-2">
            <button onClick={() => setIsOpen(true)}>
              <img src={DelIcon} alt="DelIcon" className="w-[44px] h-[44px]" />
            </button>
            <Button
              text={"Edit Product"}
              onClick={() =>
                navigate("/app/edit-product", {
                  state: { product: singleProduct },
                })
              }
              customClass="px-5 py-3 !text-[14px] !font-[400]"
            />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl mt-4 shadow-sm border border-gray-200 p-6 grid grid-cols-12 gap-6 mx-auto font-inter">
        {/* Left Side */}
        <div className="col-span-12 lg:col-span-4">
          {/* Main Image */}
          <div className="bg-[#F2FBF7] rounded-2xl flex justify-center items-center p-6">
            <img
              src={singleProduct?.images?.[0]}
              alt={singleProduct?.name}
              className="h-56 object-contain"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex flex-wrap gap-3 mt-4">
            {singleProduct?.images?.map((img, i) => (
              <div
                key={i}
                className="bg-[#F2FBF7] rounded-xl w-[70px] h-[70px] flex justify-center items-center cursor-pointer border hover:border-[#22b573]"
              >
                <img
                  src={img}
                  alt="Thumbnail"
                  className="w-12 object-contain"
                />
              </div>
            ))}
          </div>

          {/* Product Documents */}
          <div className="mt-12 bg-[#F4F4F4] rounded-[18px] p-3">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-[#181818] text-[16px]">
                Product Documents
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {singleProduct?.productDoc?.filter(
                (doc) => doc && doc.trim() !== "",
              ).length > 0 ? (
                singleProduct?.productDoc
                  ?.filter((doc) => doc && doc.trim() !== "")
                  .map((doc, i) => (
                    <a
                      key={i}
                      href={doc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-[#FFFFFF] rounded-[9px] flex flex-col items-center justify-center text-center cursor-pointer hover:border hover:border-[#22b573]"
                    >
                      <div className="w-full flex items-center justify-center">
                        <FaFilePdf className="text-red-600 text-3xl mb-1" />
                      </div>
                      <p className="text-sm font-medium text-gray-700">
                        Document {i + 1}
                      </p>
                    </a>
                  ))
              ) : (
                <p className="text-sm text-gray-500">No documents uploaded</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="col-span-12 lg:col-span-8">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <h1 className="text-[22px] font-[600] text-[#000000]">
                {singleProduct?.name}
              </h1>
              <RatingDisplay rating={singleProduct?.rating || 0} />
            </div>
            <div className="flex items-center gap-2">
              <label className="inline-flex font-[400] text-nowrap text-[10px] text-[#000000] items-center cursor-pointer">
                <span className="mr-2">Delivery:</span>
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={singleProduct?.delivery}
                  readOnly
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer py-[2.5px] peer-checked:bg-[#0EBB8E] after:content-[''] after:absolute after:w-5 after:h-5 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-5 relative"></div>
              </label>
              <h2 className="gradient-text font-bold text-[24px]">
                ${Number(singleProduct?.unitPrice || 0).toFixed(2)}
                <span className="text-[10px] font-[400] ">
                  /{singleProduct?.unitMessurement} Unit
                </span>
              </h2>
            </div>
          </div>

          {/* Description */}
          <p className="text-[#838383] text-[13px] mt-2 leading-relaxed font-[400]">
            {singleProduct?.description}
          </p>

          {/* Details */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-4 mt-6 border-t border-gray-200 pt-4">
            <div className="border-r border-[#EEEEEE]">
              <p className="text-[#181818] mb-1 text-[14px] font-[500] capitalize">
                Category
              </p>
              <p className="font-[400] text-[12px] text-[#838383]">
                {singleProduct?.category || "—"}
              </p>
            </div>
            <div className="border-r border-[#EEEEEE]">
              <p className="text-[#181818] mb-1 text-[14px] font-[500] capitalize">
                Total Stock
              </p>
              <p className="font-[400] text-[12px] text-[#838383]">
                {singleProduct?.inventories?.reduce(
                  (acc, inv) => acc + (inv?.stock || 0),
                  0,
                )}{" "}
                Units
              </p>
            </div>
            {/* Package Size */}
            <div>
              <p className="text-[#181818] mb-1 text-[14px] font-[500] capitalize">
                Package Size
              </p>
              <p className="font-[400] text-[12px] text-[#838383]">
                {singleProduct?.packageLength || 0} ×{" "}
                {singleProduct?.packageWidth || 0} ×{" "}
                {singleProduct?.packageHeight || 0} in
              </p>
            </div>
            <div className="border-r border-[#EEEEEE]">
              <p className="text-[#181818] text-[14px] font-[500] mb-1">
                Package Weight
              </p>
              <p className="text-[#838383] text-[12px] font-[400]">
                {singleProduct?.packageWeight || 0} Lbs
              </p>
            </div>
          </div>

          {/* Dimensions */}
          <div className="grid grid-cols-5 gap-y-4 mt-4 gap-4 border-t border-gray-200 pt-4">
            {/* ✅ Combined Item Size like package size */}
            <div className="border-r border-[#EEEEEE]">
              <p className="text-[#181818] text-[14px] font-[500] mb-1">
                Package Item Size
              </p>
              <p className="text-[#838383] text-[12px] font-[400]">
                {`${singleProduct?.itemLength || 0} × ${singleProduct?.itemWidth || 0} × ${singleProduct?.itemHeight || 0}`}{" "}
                in
              </p>
            </div>

            <div className="border-r border-[#EEEEEE]">
              <p className="text-[#181818] text-[14px] font-[500] mb-1">
                Item Weight
              </p>
              <p className="text-[#838383] text-[12px] font-[400]">
                {singleProduct?.itemWeight || 0} Lbs
              </p>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-6 border-t border-gray-200 pt-4">
            <h3 className="font-semibold text-gray-900 text-sm mb-2">
              Special Handling Instructions
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              {singleProduct?.instructions ||
                "No special handling instructions provided."}
            </p>
          </div>

          {/* Available Locations */}
          <div className="mt-8 border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-[500] text-[#181818] text-[22px]">
                Available Locations
              </h3>
            </div>

            <div className="space-y-2">
              {singleProduct?.inventories?.length > 0 ? (
                singleProduct?.inventories.map((store, index) => (
                  <div
                    key={index}
                    className="flex justify-between pb-4 items-center border-b border-gray-200 rounded-xl p-2"
                  >
                    <div>
                      <h4 className="font-medium text-[#181818] text-[14px]">
                        {store?.storeRecord?.name}
                      </h4>
                      <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                        <FaMapMarkerAlt className="text-[#22b573]" />{" "}
                        {store?.storeRecord?.address}
                      </p>
                    </div>
                    <p className="text-[#181818] font-medium text-[14px]">
                      Total Stock <br />
                      <span className="font-normal text-[12px]">
                        {store?.stock || 0} Units
                      </span>
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No inventory locations.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <ReviewsSection id={singleProduct?._id} />
      <DeleteProductModal
        loading={isLoading}
        selected={singleProduct?._id}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}
