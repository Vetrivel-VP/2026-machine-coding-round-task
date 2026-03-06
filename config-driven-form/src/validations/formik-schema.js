import * as yup from "yup";

export const formikSchema = yup.object({
  fullName: yup
    .string()
    .min(3, "Full name is required and should be at least 3 characters")
    .required("Full name is required"),
  email: yup
    .string()
    .email("Invalid Email Address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password should be at least 6 characters")
    .required("Password is required"),
  gender: yup
    .string()
    .min(1, "Gender is required")
    .required("Gender is required"),
});
