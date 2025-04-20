import * as yup from "yup";

export const supportSchema = yup.object().shape({
  full_name: yup
    .string()
    .trim()
    .required("Full name is required")
    .min(3, "Full name should be minimum 3 charecter")
    .max(100, "Full name should be maximum 100 charecter")
    .matches(/^[A-Za-z\s]+$/, "Full name must contain alphabet and spaces"),

  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Invalid email format"),
  ph_no: yup
    .string()
    .trim()
    .required("Contact number is required")
    .min(8, "Contact number at least 8 digit allowed.")
    .max(15, "Contact number at most 15 digit allowed.")
    .matches(/^\d+$/, "Please enter a valid contact number"),
  details: yup.string().trim().required("Details is required")
});

export type SupportPayload = yup.InferType<typeof supportSchema>;
