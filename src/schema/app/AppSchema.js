import * as Yup from "yup";

export const AddInventorySchema = Yup.object({
  storeName: Yup.string().required("Store Name is required"),
  stock: Yup.string().required("stock is required"),
  minOrder: Yup.string().required("min Order is required"),
  maxOrder: Yup.string().required("max Order is required"),
});

export const ProductSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(3, "Product name must be at least 3 characters")
    .max(100, "Product name can't exceed 100 characters")
    .required("Product name is required"),

  description: Yup.string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description can't exceed 1000 characters")
    .required("Description is required"),

  category: Yup.string().required("Category is required"),
  subCategory: Yup.string().required("Sub-category is required"),

  itemHeight: Yup.string()
    .matches(/^\d+$/, "Only numbers allowed")
    .max(4, "Max 4 digits allowed")
    .required("Item height is required"),

  itemWidth: Yup.string()
    .matches(/^\d+$/, "Only numbers allowed")
    .max(4, "Max 4 digits allowed")
    .required("Item width is required"),

  itemLength: Yup.string()
    .matches(/^\d+$/, "Only numbers allowed")
    .max(4, "Max 4 digits allowed")
    .required("Item length is required"),

  itemWeight: Yup.string()
    .matches(/^\d+$/, "Only numbers allowed")
    .max(4, "Max 4 digits allowed")
    .required("Item weight is required"),

  packageHeight: Yup.string()
    .matches(/^\d+$/, "Only numbers allowed")
    .max(4, "Max 4 digits allowed")
    .required("Package height is required"),

  packageWidth: Yup.string()
    .matches(/^\d+$/, "Only numbers allowed")
    .max(4, "Max 4 digits allowed")
    .required("Package width is required"),

  packageLength: Yup.string()
    .matches(/^\d+$/, "Only numbers allowed")
    .max(4, "Max 4 digits allowed")
    .required("Package length is required"),

  packageWeight: Yup.string()
    .matches(/^\d+$/, "Only numbers allowed")
    .max(4, "Max 4 digits allowed")
    .required("Package weight is required"),

  unitPrice: Yup.string()
    .matches(/^\d+$/, "Only numbers allowed")
    .max(4, "Max 4 digits allowed")
    .required("Unit price is required"),

  unitMessurement: Yup.string()
    .matches(/^\d+$/, "Only numbers allowed")
    .max(4, "Max 4 digits allowed")
    .required("Unit measurement is required"),

  instructions: Yup.string()
    .max(300, "Special instructions can't exceed 300 characters")
    .nullable(),

  delivery: Yup.boolean().required("Delivery field is required"),
});
