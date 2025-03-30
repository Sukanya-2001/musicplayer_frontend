import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(4, "Minimum character limit should be 4 to 20")
    .max(20, "Minimum character limit should be 4 to 20")
});

export type loginPayload = yup.InferType<typeof loginSchema>;

export const signUpSchema = yup.object().shape({
  firstName: yup.string().trim().required("First name is required"),
  lastName: yup.string().trim().required("Last name is required"),
  userName: yup.string().trim().required("Username is required"),
  phone: yup
    .string()
    .trim()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone is required"),
  email: yup
    .string()
    .trim()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(4, "Password must be between 4 to 20 characters")
    .max(20, "Password must be between 4 to 20 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required")
});

export type signUpPayload = yup.InferType<typeof signUpSchema>;

export const forgotEmailSchema = yup.object(). shape({
    email: yup.string().email().required("Email is required")
})

export type forgotEmailPayload = yup.InferType<typeof forgotEmailSchema>;

export const otpSchema = yup.object(). shape({
  otp: yup.string().required("OTP is required")
})

export type otpPayload = yup.InferType<typeof otpSchema>;

export const resetPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(6, "Minimum character limit should be 6 to 20")
    .max(20, "Minimum character limit should be 6 to 20")
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});

export type ResetPasswordPayload = yup.InferType<typeof resetPasswordSchema>;

