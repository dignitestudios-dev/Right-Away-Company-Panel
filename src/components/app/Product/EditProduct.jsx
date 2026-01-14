import React, { useEffect, useState } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";
import { GoArrowLeft } from "react-icons/go";
import { useFormik } from "formik";

import Button from "../../global/Button";
import Input from "../../global/Input";
import StoreCard from "./AddInventryCard";
import AddInventory from "./AddInventory";
import EditInventory from "./EditInventory";
import DeleteInventoryModal from "./DeleteInventory";

import { AddBtnImg, CameraImg } from "../../../assets/export";
import { ProductSchema } from "../../../schema/app/AppSchema";
import { ProductValues } from "../../../init/app/AppValues";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getProductsById, updateProduct } from "../../../redux/slices/AppSlice";

export default function EditProduct() {
  const storeCategories = [
    {
      category: "Food & Beverages",
      subcategories: [
        "Fast Food & Snacks",
        "Restaurants & Cafés",
        "Beverages & Juices",
        "Desserts & Bakery",
        "Healthy / Organic Food",
      ],
    },
    {
      category: "Groceries & Daily Essentials",
      subcategories: [
        "Fruits & Vegetables",
        "Dairy & Eggs",
        "Meat & Seafood",
        "Snacks & Packaged Food",
        "Household Supplies",
      ],
    },
    {
      category: "Electronics & Gadgets",
      subcategories: [
        "Mobile Phones & Accessories",
        "Laptops & Computers",
        "Home Appliances",
        "Audio & Headphones",
        "Smart Watches & Wearables",
      ],
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [oldImages, setOldImages] = useState([]); // existing image URLs from product
  const [newImages, setNewImages] = useState([]); // new uploads
  const [oldDocs, setOldDocs] = useState([]); // existing doc URLs
  const [newDocs, setNewDocs] = useState([]); // new uploads
  const [inventories, setInventories] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleProduct, isLoading } = useSelector((state) => state?.app);
  const loc = useLocation();
  const product = loc?.state?.product;
  const getProductDetail = async () => {
    dispatch(getProductsById(product?._id));
  };
  useEffect(() => {
    const fetchProduct = async () => {
      await getProductDetail();
    };

    fetchProduct();
  }, [product?._id]);
  // 🔸 Append product fields
  const allowedFields = [
    "name",
    "description",
    "category",
    "itemHeight",
    "itemWidth",
    "itemLength",
    "itemWeight",
    "packageHeight",
    "packageWidth",
    "packageLength",
    "packageWeight",
    "unitPrice",
    "unitMessurement",
    "delivery",
    "instructions",
    "maxOrder",
    "minOrder",
  ];
  // 🧩 Load product data

  useEffect(() => {
    if (singleProduct) {
      setOldImages(singleProduct?.images || []);
      setOldDocs(singleProduct?.productDoc || []);
      setInventories(product?.inventories || []);
      setValues({ ...ProductValues, ...singleProduct });
    }
  }, [singleProduct]);

  console.log(singleProduct, "products--->");
  // 🧩 Formik Setup
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
    resetForm,
  } = useFormik({
    initialValues: {
      ...ProductValues,
      ...product,
    },
    validationSchema: ProductSchema,
    onSubmit: async (values) => {
      const form = new FormData();
      // 🔸 Append images
      oldImages.forEach((file) => form.append("images[]", file));
      newImages.forEach((file) => form.append("updateImages", file));

      // 🔸 Append documents
      // 🔸 Append documents
      if (oldDocs.length > 0) {
        oldDocs.forEach((file) => form.append("productDoc[]", file));
      } else {
        form.append("productDoc[]", ""); // 👈 empty key
      }
      newDocs.forEach((file) => form.append("updateProductDoc[]", file));

      // ✅ Add only allowed fields from values
      Object.entries(values).forEach(([key, value]) => {
        if (allowedFields.includes(key)) {
          form.append(key, value);
        }
      });
      // 🔸 Append inventory list
      inventories.forEach((inv, i) => {
        form.append(
          `inventories[${i}][storeRecord]`,
          inv.storeName || inv?.storeRecord?._id
        );
        form.append(`inventories[${i}][stock]`, inv.stock);
      });
      try {
        await dispatch(updateProduct({ id: product?._id, form })).unwrap();
        resetForm();
        navigate("/app/product-management");
      } catch (error) {
        console.error("❌ Error adding product:", error);
      }
    },
  });
  // 🖼️ Handle new image uploads
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prev) => [...prev, ...files]);
  };

  // 📄 Handle new document uploads
  const handleDocChange = (e) => {
    const files = Array.from(e.target.files);
    setNewDocs((prev) => [...prev, ...files]);
  };

  // ❌ Remove image (handles both old and new)
  const removeImage = (idx, type) => {
    if (type === "old") {
      setOldImages((prev) => prev.filter((_, i) => i !== idx));
    } else {
      setNewImages((prev) => prev.filter((_, i) => i !== idx));
    }
  };

  // ❌ Remove document
  const removeDoc = (idx, type) => {
    if (type === "old") {
      setOldDocs((prev) => prev.filter((_, i) => i !== idx));
    } else {
      setNewDocs((prev) => prev.filter((_, i) => i !== idx));
    }
  };

  return (
    <div className="min-h-screen p-2">
      <form onSubmit={handleSubmit} className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-[32px] font-[600] flex items-center gap-2 text-[#202224]">
            <GoArrowLeft
              color="#22B573"
              className="cursor-pointer"
              onClick={() => navigate(-1)}
              size={21}
            />{" "}
            Edit Product
          </h1>
          <Button
            loading={isLoading}
            text={"Update Product"}
            type={"submit"}
            customClass="px-5 py-3"
          />
        </div>

        {/* Product Form */}
        <div className="grid grid-cols-12 gap-6">
          {/* Basic Product Details */}
          <div className="bg-white col-span-12 lg:col-span-8 space-y-6 p-6 rounded-2xl shadow-sm">
            <h2 className="font-semibold text-lg text-gray-800 mb-4">
              Basic Product Details
            </h2>

            <Input
              text="Product Name"
              holder="Enter product name"
              name="name"
              type="text"
              bg
              value={values.name}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={errors.name}
              touched={touched.name}
            />

            <label className="font-[500] text-[14px]">
              Product Description
            </label>
            <textarea
              placeholder="Enter Product Description"
              rows={8}
              name="description"
              value={values.description}
              onChange={handleChange}
              className="w-full border bg-[#F8F8F8] border-[#F8F8F8] rounded-[15px] p-3 text-sm text-[#959393] outline-none resize-none"
            />
            {errors.description && touched.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="w-full">
                <label htmlFor="category" className="font-[500] text-[14px]">
                  Category
                </label>
                <br />
                <select
                  name="category"
                  value={values.category}
                  onChange={(e) => {
                    handleChange(e);
                    // Reset subCategory when category changes
                    handleChange({
                      target: { name: "subCategory", value: "" },
                    });
                  }}
                  className="border w-full bg-[#F8F8F8] border-gray-200 rounded-xl p-3 text-sm text-[#B7B7B7] outline-none"
                >
                  <option value="">Select Category</option>
                  {storeCategories?.map((cat, idx) => (
                    <option key={idx} value={cat.category}>
                      {cat.category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full">
                <label htmlFor="subCategory" className="font-[500] text-[14px]">
                  Sub Category
                </label>
                <br />
                <select
                  name="subCategory"
                  value={values.subCategory}
                  onChange={handleChange}
                  className="border w-full bg-[#F8F8F8] border-gray-200 rounded-xl p-3 text-sm text-[#B7B7B7] outline-none"
                  disabled={!values.category}
                >
                  <option value="">Select Sub Category</option>
                  {values.category &&
                    storeCategories
                      .find((c) => c.category === values.category)
                      ?.subcategories.map((sub, idx) => (
                        <option key={idx} value={sub}>
                          {sub}
                        </option>
                      ))}
                </select>
              </div>
            </div>
          </div>

          {/* Product Images */}
          <div className="bg-white col-span-12 lg:col-span-4 p-6 rounded-2xl shadow-sm">
            <h2 className="font-semibold text-lg text-gray-800 mb-4">
              Product Images
            </h2>

            <label
              htmlFor="productImages"
              className="border-2 border-dashed bg-[#FBFBFB] border-gray-300 rounded-xl min-h-[320px] flex flex-col justify-center items-center cursor-pointer hover:bg-gray-50"
            >
              <img src={CameraImg} alt="Camera" className="w-[30px] h-[30px]" />
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
                onChange={handleImageChange}
              />
            </label>

            {/* 🖼️ Old Image Previews */}
            <div className="grid grid-cols-3 gap-2 mt-3">
              {oldImages.map((url, idx) => (
                <div
                  key={`old-${idx}`}
                  className="relative w-full h-[100px] rounded-lg overflow-hidden"
                >
                  <img
                    src={url}
                    alt={`old-${idx}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(idx, "old")}
                    className="absolute top-1 right-1 bg-white rounded-full text-red-500 font-bold px-[6px]"
                  >
                    ×
                  </button>
                </div>
              ))}
              {/* 🆕 New Image Previews */}
              {newImages.map((file, idx) => (
                <div
                  key={`new-${idx}`}
                  className="relative w-full h-[100px] rounded-lg overflow-hidden"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`new-${idx}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(idx, "new")}
                    className="absolute top-1 right-1 bg-white rounded-full text-red-500 font-bold px-[6px]"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Dimensions & Weight */}
          <div className="bg-white col-span-12 lg:col-span-6 p-6 rounded-2xl shadow-sm">
            <h2 className="text-[22px] font-[500] mb-5">
              Item Dimensions & Weight
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <Input
                text="Height"
                holder="ft"
                name="itemHeight"
                type="number"
                bg
                value={values.itemHeight}
                handleChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || Number(value) > 0) {
                    handleChange(e); // pass the event, not just value
                  }
                }}
                handleBlur={handleBlur}
                error={errors.itemHeight}
                touched={touched.itemHeight}
              />
              <Input
                text="Width"
                holder="ft"
                name="itemWidth"
                type="number"
                bg
                value={values.itemWidth}
                handleChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || Number(value) > 0) {
                    handleChange(e); // pass the event, not just value
                  }
                }}
                handleBlur={handleBlur}
                error={errors.itemWidth}
                touched={touched.itemWidth}
              />
              <Input
                text="Length"
                holder="ft"
                name="itemLength"
                type="number"
                bg
                value={values.itemLength}
                handleChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || Number(value) > 0) {
                    handleChange(e); // pass the event, not just value
                  }
                }}
                handleBlur={handleBlur}
                error={errors.itemLength}
                touched={touched.itemLength}
              />
              <Input
                text="Weight"
                holder="lbs"
                name="itemWeight"
                type="number"
                bg
                value={values.itemWeight}
                handleChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || Number(value) > 0) {
                    handleChange(e); // pass the event, not just value
                  }
                }}
                handleBlur={handleBlur}
                error={errors.itemWeight}
                touched={touched.itemWeight}
              />
            </div>
          </div>

          {/* Package Details */}
          <div className="bg-white col-span-12 lg:col-span-6 p-6 rounded-2xl shadow-sm">
            <h2 className="text-[22px] font-[500] mb-5">Package Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <Input
                text="Height"
                holder="ft"
                name="packageHeight"
                type="number"
                bg
                value={values.packageHeight}
                handleChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || Number(value) > 0) {
                    handleChange(e); // pass the event, not just value
                  }
                }}
                handleBlur={handleBlur}
                error={errors.packageHeight}
                touched={touched.packageHeight}
              />
              <Input
                text="Width"
                holder="ft"
                name="packageWidth"
                type="number"
                bg
                value={values.packageWidth}
                handleChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || Number(value) > 0) {
                    handleChange(e); // pass the event, not just value
                  }
                }}
                handleBlur={handleBlur}
                error={errors.packageWidth}
                touched={touched.packageWidth}
              />
              <Input
                text="Length"
                holder="ft"
                name="packageLength"
                type="number"
                bg
                value={values.packageLength}
                handleChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || Number(value) > 0) {
                    handleChange(e); // pass the event, not just value
                  }
                }}
                handleBlur={handleBlur}
                error={errors.packageLength}
                touched={touched.packageLength}
              />
              <Input
                text="Weight"
                holder="lbs"
                name="packageWeight"
                type="number"
                bg
                value={values.packageWeight}
                handleChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || Number(value) > 0) {
                    handleChange(e); // pass the event, not just value
                  }
                }}
                handleBlur={handleBlur}
                error={errors.packageWeight}
                touched={touched.packageWeight}
              />
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div className="bg-white p-6 col-span-12 rounded-2xl shadow-sm">
            <h2 className="text-[22px] font-[500] mb-5">Pricing & Inventory</h2>
            <div className="grid grid-cols-2 gap-4">
              <Input
                text="Price Per Unit"
                holder="Fixed Price"
                name="unitPrice"
                type="number"
                value={values.unitPrice}
                handleChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || Number(value) > 0) {
                    handleChange(e); // pass the event, not just value
                  }
                }}
                handleBlur={handleBlur}
                error={errors.unitPrice}
                touched={touched.unitPrice}
              />
              <Input
                text="Unit of Measurement"
                holder="lbs"
                name="unitMessurement"
                type="number"
                value={values.unitMessurement}
                handleChange={(e) => {
                  const value = e.target.value;
                  if (value === "" || Number(value) > 0) {
                    handleChange(e); // pass the event, not just value
                  }
                }}
                handleBlur={handleBlur}
                error={errors.unitMessurement}
                touched={touched.unitMessurement}
              />

              {/* Min Quantity */}
              <Input
                text="Minimum Order Quantity"
                holder="Type here"
                type="number"
                touched={touched.minOrder}
                handleChange={(e) => {
                  const value = e.target.value;

                  if (
                    value === "" ||
                    (Number(value) > 0 && Number(value) <= 1000)
                  ) {
                    handleChange(e);
                  }
                }}
                name="minOrder"
                error={errors.minOrder}
                handleBlur={handleBlur}
                value={values.minOrder}
                min="1"
                max="1000"
              />

              <Input
                text="Maximum Order Quantity"
                holder="Type here"
                type="number"
                touched={touched.maxOrder}
                handleChange={(e) => {
                  const value = e.target.value;

                  if (
                    value === "" ||
                    (Number(value) > 0 && Number(value) <= 1000)
                  ) {
                    handleChange(e);
                  }
                }}
                name="maxOrder"
                error={errors.maxOrder}
                handleBlur={handleBlur}
                value={values.maxOrder}
                min="1"
                max="1000"
              />
            </div>

            <div className="mt-4">
              <label className="font-[500] text-[14px] block mb-2">
                Inventory Details
              </label>

              {inventories.map((item, i) => (
                <StoreCard
                  key={i}
                  item={item}
                  index={i}
                  setActionType={setActionType}
                  setIsOpen={setIsOpen}
                  setEditIndex={setEditIndex}
                />
              ))}

              <div className="mt-3 flex justify-between items-center px-3 py-2 rounded-[10px] bg-[#F8F8F899]">
                <p className="text-[#959393] text-[16px]">Add Inventory</p>
                <button
                  type="button"
                  onClick={() => {
                    setActionType("add");
                    setIsOpen(true);
                  }}
                >
                  <img
                    src={AddBtnImg}
                    alt="Add"
                    className="w-[25px] h-[25px]"
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
              text="Special Handling Instructions"
              holder="Details Here"
              type="text"
              bg
              name="instructions"
              value={values.instructions}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={errors.instructions}
              touched={touched.instructions}
            />
          </div>

          {/* Product Documents */}
          <div className="bg-white col-span-12 lg:col-span-6 p-6 rounded-2xl shadow-sm">
            <h2 className="font-semibold text-lg text-gray-800 mb-2">
              Product Documents
            </h2>
            <p className="text-sm text-gray-500 mb-3">
              Upload Product Specification PDF (Optional)
            </p>

            <label
              htmlFor="productDocs"
              className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col justify-center items-center cursor-pointer hover:bg-gray-50"
            >
              <MdOutlineCloudUpload className="text-gray-400 text-2xl mb-2" />
              <p className="text-sm text-gray-600">Upload document</p>
              <p className="text-xs text-gray-400">
                Up to 20MBs, JPG, PNG, PDF
              </p>
              <input
                type="file"
                multiple
                className="hidden"
                id="productDocs"
                onChange={handleDocChange}
              />
            </label>

            {/* 🧾 Old Docs */}
            {oldDocs.length > 0 && (
              <div className="mt-3 space-y-2">
                {oldDocs.map((url, idx) => (
                  <div
                    key={`old-doc-${idx}`}
                    className="flex justify-between items-center bg-gray-100 p-2 rounded-md"
                  >
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-blue-500 truncate w-[200px]"
                    >
                      {url.split("/").pop()}
                    </a>
                    <button
                      type="button"
                      onClick={() => removeDoc(idx, "old")}
                      className="text-red-500 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* 🆕 New Docs */}
            {newDocs.length > 0 && (
              <div className="mt-3 space-y-2">
                {newDocs.map((file, idx) => (
                  <div
                    key={`new-doc-${idx}`}
                    className="flex justify-between items-center bg-gray-100 p-2 rounded-md"
                  >
                    <p className="text-sm text-gray-700 truncate w-[200px]">
                      {file.name}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeDoc(idx, "new")}
                      className="text-red-500 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </form>

      {/* Inventory Modals */}
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
