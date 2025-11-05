import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdOutlineCloudUpload } from "react-icons/md";
import Button from "../../global/Button";
import { GoArrowLeft } from "react-icons/go";
import { AddBtnImg, CameraImg } from "../../../assets/export";
import Input from "../../global/Input";
import AddInventory from "./AddInventory";
import { useNavigate } from "react-router";
import StoreCard from "./AddInventryCard";
import EditInventory from "./EditInventory";
import DeleteInventoryModal from "./DeleteInventory";
import { ProductValues } from "../../../init/app/AppValues";
import { useFormik } from "formik";
import { ProductSchema } from "../../../schema/app/AppSchema";
import { useDispatch, useSelector } from "react-redux";
import { CreateProduct } from "../../../redux/slices/AppSlice";
import ProductReview from "./ProductReview";
import { getStore } from "../../../redux/slices/authSlice";
export default function AddNewProduct() {
  const [isOpen, setIsOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const navigate = useNavigate("");
  const [uploadError, setUploadError] = useState({ images: "", docs: "" });

  const [productImages, setProductImages] = useState([]);
  const [inventories, setInventories] = useState([]);
  const [productReview, setProductReview] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const dispatch = useDispatch();
  const [finalForm, setFinalForm] = useState(null);
  const { isLoading } = useSelector((state) => state.app);
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProductImages((prevImages) => [...prevImages, ...files]);
  };
  const [productDocs, setProductDocs] = useState([]);

  const handleDocChange = (e) => {
    const files = Array.from(e.target.files);
    setProductDocs((prevDocs) => [...prevDocs, ...files]);
  };
  const form = new FormData();
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    resetForm,
  } = useFormik({
    initialValues: ProductValues,
    validationSchema: ProductSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      console.log(
        values,
        productImages,
        productDocs,
        inventories,
        "formData---->"
      );
      if (productImages.length === 0) {
        setUploadError({ images: "At least one image is required" });
        return;
      }
      if (productDocs.length === 0) {
        setUploadError({ docs: "At least one PDF document is required" });
        return;
      }
      const invalidDocs = productDocs.filter(
        (file) => file.type !== "application/pdf"
      );
      if (invalidDocs.length > 0) {
        setUploadError({ docs: "Only PDF format is allowed" });
        return;
      }
      setUploadError({ images: "", docs: "" });

      // 🔸 Append images
      productImages.forEach((file) => form.append("images", file));

      // 🔸 Append documents
      productDocs.forEach((file) => form.append("productDoc", file));

      // 🔸 Append product fields
      Object.entries(values).forEach(([key, value]) => {
        form.append(key, value);
      });

      // 🔸 Append inventory list
      inventories.forEach((inv, i) => {
        form.append(`inventories[${i}][storeRecord]`, inv.storeName);
        form.append(`inventories[${i}][stock]`, inv.stock);
        form.append(`inventories[${i}][minOrder]`, inv.minOrder);
        form.append(`inventories[${i}][maxOrder]`, inv.maxOrder);
      });

      try {
        setProductReview({
          values,
          productImages,
          productDocs,
        });
        setFinalForm(form);
      } catch (error) {
        console.error("❌ Error adding product:", error);
      }
    },
  });

  useEffect(() => {
    dispatch(getStore()).unwrap();
  }, []);
  return (
    <div className=" min-h-screen p-2">
      {productReview ? (
        <ProductReview
          inventoryAdd={() => {
            setActionType("add");
            setIsOpen(!isOpen);
          }}
          productDocs={productDocs}
          handleDocChange={handleDocChange}
          reviewData={productReview}
          isLoading={isLoading}
          inventories={inventories}
          onBack={() => setProductReview(false)}
          onConfirm={async () => {
            if (!finalForm) {
              console.error("❌ FormData missing, please resubmit.");
              return;
            }
            await dispatch(CreateProduct(finalForm));
            navigate("/app/product-management");
          }}
        />
      ) : (
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
              Add New Product
            </h1>
            <Button
              loading={isLoading}
              text={"Add Product"}
              onClick={handleSubmit}
              customClass="px-5 py-3"
            />
          </div>

          {/* Product Form */}
          <div className="grid  grid-cols-12 gap-6">
            {/* Left Side */}
            {/* Basic Product Details */}
            <div className="bg-white col-span-12 lg:col-span-8 space-y-6 p-6 rounded-2xl shadow-sm">
              <h2 className="font-semibold text-lg text-gray-800 mb-4">
                Basic Product Details
              </h2>
              <Input
                text={"Name"}
                holder={"Product Name"}
                name={"name"}
                type={"text"}
                bg={true}
                value={values.name}
                error={errors.name}
                touched={touched.name}
                handleBlur={handleBlur}
                handleChange={handleChange}
              />
              <label htmlFor="" className="font-[500] text-[14px]">
                Product Description
              </label>
              <textarea
                placeholder="Enter Product Description"
                rows={8}
                name="description"
                value={values.description}
                onChange={handleChange}
                className="w-full  border bg-[#F8F8F8] border-[#F8F8F8] rounded-[15px] p-3 text-sm text-[#959393] outline-none resize-none"
              ></textarea>
              {errors.description && touched.description && (
                <p className="text-red-700 text-sm font-medium">
                  {errors.description}
                </p>
              )}
              <div className="grid grid-cols-2 gap-4 ">
                <div className="w-full">
                  <label htmlFor="" className="font-[500] text-[14px]">
                    Category
                  </label>
                  <br />
                  <select
                    name="category"
                    value={values.category}
                    onChange={handleChange}
                    className="border w-full bg-[#F8F8F8]  border-gray-200 rounded-xl p-3 text-sm text-[#B7B7B7] outline-none"
                  >
                    <option>Select Category</option>
                  </select>
                </div>
                <div className="w-full">
                  <label htmlFor="" className="font-[500] text-[14px]">
                    Sub Category
                  </label>
                  <br />
                  <select
                    name="subCategory"
                    value={values.subCategory}
                    onChange={handleChange}
                    className="border w-full bg-[#F8F8F8] border-gray-200 rounded-xl p-3 text-sm text-[#B7B7B7] outline-none"
                  >
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
              <label
                htmlFor="productImages"
                className="border-2 border-dashed bg-[#FBFBFB] border-gray-300 rounded-xl min-h-[320px] flex flex-col justify-center items-center cursor-pointer hover:bg-gray-50 relative"
              >
                <img
                  src={CameraImg}
                  alt="CameraImg"
                  className="w-[30px] h-[30px]"
                />
                <p className="text-[16px] mt-2 font-[500] text-[#181818]">
                  Click To Upload{" "}
                  <span className="text-[#959393] text-[13px] font-[500]">
                    or Drag & Drop
                  </span>
                </p>

                <input
                  type="file"
                  multiple
                  className="hidden"
                  id="productImages"
                  name="productImages"
                  onChange={handleImageChange}
                />
                {uploadError.images && (
                  <p className="text-red-500 text-sm mt-1">
                    {uploadError.images}
                  </p>
                )}
              </label>
              <div className="grid grid-cols-3 gap-2 w-full p-3">
                {productImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative w-full h-[100px] bg-gray-100 rounded-lg overflow-hidden"
                  >
                    <img
                      src={URL.createObjectURL(img)}
                      alt={`preview-${idx}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setProductImages((prev) =>
                          prev.filter((_, i) => i !== idx)
                        );
                      }}
                      className="absolute top-1 right-1 bg-white rounded-full shadow text-red-500 font-bold px-[6px]"
                    >
                      ×
                    </button>
                  </div>
                ))}
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
                  name={"itemHeight"}
                  type={"number"}
                  bg={true}
                  value={values.itemHeight}
                  error={errors?.itemHeight}
                  handleChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || Number(value) > 0) {
                      handleChange(e); // pass the event, not just value
                    }
                  }}
                  touched={touched.itemHeight}
                  handleBlur={handleBlur}
                />
                <Input
                  text={"Width"}
                  holder={"ft"}
                  name={"itemWidth"}
                  type={"number"}
                  bg={true}
                  value={values.itemWidth}
                  error={errors?.itemWidth}
                  handleChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || Number(value) > 0) {
                      handleChange(e); // pass the event, not just value
                    }
                  }}
                  touched={touched.itemWidth}
                  handleBlur={handleBlur}
                />
                <Input
                  text={"Length"}
                  holder={"ft"}
                  name={"itemLength"}
                  type={"number"}
                  bg={true}
                  value={values.itemLength}
                  error={errors?.itemLength}
                  handleChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || Number(value) > 0) {
                      handleChange(e); // pass the event, not just value
                    }
                  }}
                  touched={touched.itemLength}
                  handleBlur={handleBlur}
                />
                <Input
                  text={"Weight"}
                  holder={"lbs"}
                  name={"itemWeight"}
                  type={"number"}
                  bg={true}
                  value={values.itemWeight}
                  error={errors?.itemWeight}
                  handleChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || Number(value) > 0) {
                      handleChange(e); // pass the event, not just value
                    }
                  }}
                  touched={touched.storeName}
                  handleBlur={handleBlur}
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
                  name={"packageHeight"}
                  type={"number"}
                  bg={true}
                  value={values.packageHeight}
                  error={errors?.packageHeight}
                  handleChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || Number(value) > 0) {
                      handleChange(e); // pass the event, not just value
                    }
                  }}
                  touched={touched.packageHeight}
                  handleBlur={handleBlur}
                />
                <Input
                  text={"Width"}
                  holder={"ft"}
                  name={"packageWidth"}
                  type={"number"}
                  bg={true}
                  value={values.packageWidth}
                  error={errors?.packageWidth}
                  handleChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || Number(value) > 0) {
                      handleChange(e); // pass the event, not just value
                    }
                  }}
                  touched={touched.packageWidth}
                  handleBlur={handleBlur}
                />
                <Input
                  text={"Length"}
                  holder={"ft"}
                  name={"packageLength"}
                  type={"number"}
                  bg={true}
                  value={values.packageLength}
                  error={errors?.packageLength}
                  handleChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || Number(value) > 0) {
                      handleChange(e); // pass the event, not just value
                    }
                  }}
                  touched={touched.packageLength}
                  handleBlur={handleBlur}
                />
                <Input
                  text={"Weight"}
                  holder={"lbs"}
                  name={"packageWeight"}
                  type={"number"}
                  bg={true}
                  value={values.packageWeight}
                  error={errors?.packageWeight}
                  handleChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || Number(value) > 0) {
                      handleChange(e); // pass the event, not just value
                    }
                  }}
                  touched={touched.packageWeight}
                  handleBlur={handleBlur}
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
                  text="Price Per Unit"
                  holder="Fixed Price"
                  name="unitPrice"
                  type={"number"}
                  handleChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || Number(value) > 0) {
                      handleChange(e); // pass the event, not just value
                    }
                  }}
                  touched={touched.unitPrice}
                  handleBlur={handleBlur}
                  value={values?.unitPrice}
                  error={errors?.unitPrice}
                />
                <Input
                  text="Unit of Measurement"
                  holder="lbs"
                  type={"number"}
                  name="unitMessurement"
                  handleChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || Number(value) > 0) {
                      handleChange(e); // pass the event, not just value
                    }
                  }}
                  touched={touched.unitMessurement}
                  handleBlur={handleBlur}
                  value={values?.unitMessurement}
                  error={errors?.unitMessurement}
                />
              </div>
              <div className="mt-2 gap-2 grid grid-cols-12">
                <label
                  htmlFor=""
                  className="font-[500] col-span-12 text-[14px]"
                >
                  Inventory Details
                </label>
                {inventories?.map((item, i) => (
                  <StoreCard
                    key={i}
                    index={i}
                    item={item}
                    setActionType={setActionType}
                    setIsOpen={setIsOpen}
                    setEditIndex={setEditIndex}
                  />
                ))}
                <div className="col-span-6 mt-2 flex justify-between items-center px-2 h-[50px] rounded-[10px] bg-[#F8F8F899] border-none ">
                  <p className="text-[#959393] font-[400] text-[16px]">
                    Add Inventory Details
                  </p>
                  <button
                    onClick={() => {
                      setActionType("add");
                      setIsOpen(!isOpen);
                    }}
                  >
                    <img
                      src={AddBtnImg}
                      className="w-[25px] h-[25px]"
                      alt="AddBtnImg"
                    />
                  </button>
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
                type={"text"}
                bg={true}
                name="instructions"
                value={values.instructions}
                error={errors.instructions}
                handleChange={handleChange}
                touched={touched.instructions}
                handleBlur={handleBlur}
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
              <label
                htmlFor="productDocuments"
                className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col justify-center items-center cursor-pointer hover:bg-gray-50"
              >
                <MdOutlineCloudUpload className="text-gray-400 text-2xl mb-2" />
                <p className="text-sm text-gray-600">Upload “document name”</p>
                <p className="text-xs text-gray-400">
                  Up to 20MBs, JPG, PNG, PDF
                </p>
                <input
                  type="file"
                  multiple
                  className="hidden"
                  name="productDocuments"
                  id="productDocuments"
                  onChange={handleDocChange}
                />
                {uploadError.docs && (
                  <p className="text-red-500 text-sm mt-1">
                    {uploadError.docs}
                  </p>
                )}
              </label>

              {/* Show Preview Below */}
              {productDocs.length > 0 && (
                <div className="mt-3 space-y-2">
                  {productDocs.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center bg-gray-100 p-2 rounded-md"
                    >
                      <p className="text-sm text-gray-700 truncate w-[200px]">
                        {file.name}
                      </p>
                      <button
                        className="text-red-500 text-sm"
                        onClick={() =>
                          setProductDocs((prev) =>
                            prev.filter((_, i) => i !== idx)
                          )
                        }
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {actionType == "edit" && (
        <EditInventory
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          editIndex={editIndex}
          inventories={inventories}
          setInventories={setInventories}
        />
      )}
      {actionType == "add" && (
        <AddInventory
          setInventories={setInventories}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
      {actionType == "dell" && (
        <DeleteInventoryModal
          inventories={inventories}
          setInventories={setInventories}
          deleteIndex={editIndex}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
}
