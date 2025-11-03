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

  itemHeight: Yup.number()
    .typeError("Item height must be a number")
    .positive("Item height must be positive")
    .required("Item height is required"),

  itemWidth: Yup.number()
    .typeError("Item width must be a number")
    .positive("Item width must be positive")
    .required("Item width is required"),

  itemLength: Yup.number()
    .typeError("Item length must be a number")
    .positive("Item length must be positive")
    .required("Item length is required"),

  itemWeight: Yup.number()
    .typeError("Item weight must be a number")
    .positive("Item weight must be positive")
    .required("Item weight is required"),

  packageHeight: Yup.number()
    .typeError("Package height must be a number")
    .positive("Package height must be positive")
    .required("Package height is required"),

  packageWidth: Yup.number()
    .typeError("Package width must be a number")
    .positive("Package width must be positive")
    .required("Package width is required"),

  packageLength: Yup.number()
    .typeError("Package length must be a number")
    .positive("Package length must be positive")
    .required("Package length is required"),

  packageWeight: Yup.number()
    .typeError("Package weight must be a number")
    .positive("Package weight must be positive")
    .required("Package weight is required"),

  unitPrice: Yup.number()
    .typeError("Unit price must be a number")
    .positive("Unit price must be positive")
    .required("Unit price is required"),

  unitMessurement: Yup.string().required("Unit measurement is required"),

  instructions: Yup.string()
    .max(300, "Special instructions can't exceed 300 characters")
    .nullable(),

  delivery: Yup.boolean().required("Delivery field is required"),
});
