import * as Yup from "yup";
const passwordRules = Yup.string()
  .min(8, "Password must be at least 8 characters long")
  .max(35, "Password must be at most 35 characters long")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/[0-9]/, "Password must contain at least one number")
  .matches(
    /[@$!%*?&#^()_\-+=<>.,{}[\]|/~]/,
    "Password must contain at least one special character"
  )
  .required("Password is required");

export const signInSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Please enter your email"),
  password: Yup.string()
    .matches(/^(?!\s)(?!.*\s$)/, "Password must not begin or end with spaces")
    .min(6, "Password must contain at least 6 characters.")
    .matches(
      /^(?=.*[!@#$%^&*(),.?":{}|<>])/,
      "Password must contain at least one special character"
    )
    .required("Please enter your password"),
});

export const twoFactorSchema = Yup.object({
  otp: Yup.array()
    .of(Yup.string().matches(/^\d$/, "Must be a digit"))
    .min(4, "OTP must be 4 digits")
    .required("OTP is required"),
});

export const forgetPasswordSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

export const resetPasswordSchema = Yup.object({
  password: passwordRules,
  confirmPassword: passwordRules.label("Confirm Password"),
});

export const changedPasswordSchema = Yup.object().shape({
  password: passwordRules,

  newPassword: passwordRules.label("New Password"),

  confirmPassword: passwordRules.label("Confirm Password"),
});

export const RegisterSchema = Yup.object({
  businessName: Yup.string()
    .trim()
    .min(3, "Business name must be at least 3 characters")
    .required("Business name is required"),

  email: Yup.string()
    .matches(
      /^[A-Za-z0-9](?:[A-Za-z0-9._%+-]*[A-Za-z0-9])?@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Invalid email format"
    )
    .matches(/^(?!.*\.\.)/, "Email cannot contain consecutive dots")
    .required("Business email is required"),

  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),

  registerNumber: Yup.string()
    .matches(/^\d+$/, "Registration number must contain only numbers")
    .min(3, "Registration number is too short")
    .required("Company registration number is required"),

  address: Yup.string()
    .min(5, "Address must be at least 5 characters long")
    .required("Business address is required"),

  password: passwordRules,

  reTypePassword: passwordRules.label("Confirm Password"),
});

export const CompleteProfileSchema = Yup.object({
  profilePic: Yup.mixed()
    .required("Profile picture is required")
    .test("fileType", "Only PNG, JPG, or JPEG files are allowed", (value) => {
      // Accept if it's an existing URL string
      if (typeof value === "string") {
        return /^https?:\/\/.+\.(jpg|jpeg|png)$/i.test(value);
      }

      // Accept if it's a File object with valid image type
      if (value && value.type) {
        return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
      }

      return false;
    })
    .test("fileSize", "File size must be less than 10 MB", (value) => {
      // Only validate size if it's a File object
      if (value && value.size) {
        return value.size <= 10 * 1024 * 1024; // 10 MB
      }
      return true; // skip if it's a URL
    }),

  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),

  fulfillmentMethod: Yup.string().required(
    "Please select a fulfillment method"
  ),
});
export const AddNewStoreSchema = Yup.object({
  businessName: Yup.string()
    .required("Store name is required")
    .min(3, "Store name must be at least 3 characters")
    .max(50, "Store name cannot exceed 50 characters"),

  address: Yup.string()
    .required("Store address is required")
    .min(5, "Address must be at least 5 characters")
    .max(120, "Address cannot exceed 120 characters"),
});
export const BankDetailsSchema = Yup.object().shape({
  bankName: Yup.string()
    .required("Bank name is required")
    .min(3, "Bank name must be at least 3 characters long"),

  holderName: Yup.string()
    .required("Account holder name is required")
    .min(3, "Holder name must be at least 3 characters long"),

  accountNumber: Yup.string()
    .required("Account number is required")
    .matches(/^[0-9]+$/, "Account number must contain only digits")
    .min(8, "Account number must be at least 8 digits")
    .max(20, "Account number cannot exceed 20 digits"),

  routingNumber: Yup.string()
    .required("Routing number is required")
    .matches(/^[0-9]+$/, "Routing number must contain only digits")
    .min(6, "Routing number must be at least 6 digits")
    .max(9, "Routing number cannot exceed 9 digits"),
});
