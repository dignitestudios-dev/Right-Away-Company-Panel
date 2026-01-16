import * as Yup from "yup";

export const AddInventorySchema = Yup.object({
  storeName: Yup.string().required("Store Name is required"),

  stock: Yup.number()
    .typeError("Stock must be a number")
    .required("Stock is required")
    .max(99999, "Stock cannot be more than 99999"),
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
  minOrder: Yup.number()
    .typeError("Min Order must be a number")
    .required("Min Order is required")
    .max(1000, "Min Order cannot be more than 1000"),

  maxOrder: Yup.number()
    .typeError("Max Order must be a number")
    .required("Max Order is required")
    .max(1000, "Max Order cannot be more than 1000")
    // Condition 1: maxOrder <= stock
    .test(
      "maxOrder-less-than-stock",
      "Maximum Order cannot be greater than Total Stock",
      function (value) {
        const { stock } = this.parent;
        return !value || !stock || value <= stock;
      }
    )

    // Condition 2: maxOrder >= minOrder
    .test(
      "maxOrder-greater-than-minOrder",
      "Maximum Order must be greater than Minimum Order",
      function (value) {
        const { minOrder } = this.parent;
        return !value || !minOrder || value >= minOrder;
      }
    ),
  delivery: Yup.boolean().required("Delivery field is required"),
});
