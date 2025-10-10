import * as Yup from "yup";

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
    .min(5, "OTP must be 5 digits")
    .required("OTP is required"),
});

export const forgetPasswordSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

export const resetPasswordSchema = Yup.object({
  password: Yup.string()
    .matches(/^(?!\s)(?!.*\s$)/, "Password must not begin or end with spaces")
    .min(6, "Password must contain at least 6 characters.")
    .matches(
      /^(?=.*[!@#$%^&*(),.?":{}|<>])/,
      "Password must contain at least one special character"
    )
    .required("Please enter your password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .matches(
      /^(?=.*[!@#$%^&*(),.?":{}|<>])/,
      "Password must contain at least one special character"
    )
    .required("Please confirm your password"),
});

export const changedPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .matches(/^(?!\s)(?!.*\s$)/, "Password must not begin or end with spaces")
    .min(6, "Password must contain at least 6 characters.")
    .matches(
      /^(?=.*[!@#$%^&*(),.?":{}|<>])/,
      "Password must contain at least one special character"
    )
    .required("Please enter your password"),

  newPassword: Yup.string()
    .matches(/^(?!\s)(?!.*\s$)/, "Password must not begin or end with spaces")
    .min(6, "Password must contain at least 6 characters.")
    .matches(
      /^(?=.*[!@#$%^&*(),.?":{}|<>])/,
      "Password must contain at least one special character"
    )
    .required("Please enter your password"),

  confirmPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .matches(
      /^(?=.*[!@#$%^&*(),.?":{}|<>])/,
      "Password must contain at least one special character"
    )
    .required("Confirm Password is required"),
});
export const RegisterSchema = Yup.object({
  businessName: Yup.string()
    .trim()
    .min(3, "Business name must be at least 3 characters")
    .required("Business name is required"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Business email is required"),

  phoneNumber: Yup.string()
    .matches(/^[0-9]{10,15}$/, "Enter a valid phone number")
    .required("Phone number is required"),

  registerNumber: Yup.string()
    .min(3, "Registration number is too short")
    .required("Company registration number is required"),

  address: Yup.string()
    .min(5, "Address must be at least 5 characters long")
    .required("Business address is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),

  reTypePassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});
export const CompleteProfileSchema = Yup.object({
  profilePic: Yup.mixed()
    .required("Profile picture is required")
    .test("fileType", "Only image files are allowed", (value) => {
      return (
        !value ||
        (value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type))
      );
    }),

  businessName: Yup.string()
    .required("Business name is required")
    .min(2, "Must be at least 2 characters"),

  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),

  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),

  fulfillmentMethod: Yup.string().required(
    "Please select a fulfillment method"
  ),

  operatingHours: Yup.string().required("Operating hours are required"),

  operatingDays: Yup.string().required("Operating days are required"),
});
export const AddNewStoreSchema = Yup.object({
  businessName: Yup.string()
    .required("Store name is required")
    .min(2, "Store name must be at least 2 characters"),
  
  address: Yup.string()
    .required("Store address is required")
    .min(5, "Please enter a valid address"),
  
  operatingHours: Yup.string()
    .required("Operating hours are required")
    .matches(
      /^([0-9]{1,2}\s?(AM|PM|am|pm)?\s?-\s?[0-9]{1,2}\s?(AM|PM|am|pm)?)$/,
      "Enter valid hours, e.g., 9 AM - 6 PM"
    ),

  operatingDays: Yup.string()
    .required("Operating days are required")
    .min(3, "Please specify at least one day"),
});