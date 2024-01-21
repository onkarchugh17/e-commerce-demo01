import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address.")
    .matches(/@[^.]*\./, "Please enter a valid email address")
    .required("Please enter your email.")
    .min(10)
    .max(40),
  password: Yup.string().required("Please enter your password."),
});

export const signUpSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address.")
    .matches(/@[^.]*\./, "Please enter a valid email address")
    .required("Please enter your email.")
    .min(10)
    .max(40),
  password: Yup.string()
    .required("Please enter your password.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Enter a valid Password"
    )
    .min(6)
    .max(16),
  confirmPassword: Yup.string()
    .required("Please enter confirm password")
    .oneOf(
      [Yup.ref("password"), null],
      "Confirm password is not matching with new password"
    ),
});

export const addressSchema = Yup.object({
  name: Yup.string().required("This Field is required"),
  email: Yup.string()
    .email("Please enter a valid email address.")
    .matches(/@[^.]*\./, "Please enter a valid email address")
    .required("This Field is required.")
    .min(10)
    .max(40),
  city: Yup.string().required("This Field is required."),
  state: Yup.string().required("This Field is required."),
  pinCode: Yup.string().required("This Field is required."),
  street: Yup.string().required("This Field is required."),
  phone: Yup.number()
    .typeError("Please enter a valid number")
    .required("This Field is required."),
});

export const createProductSchema = Yup.object({
  title: Yup.string().required("This Field is required"),
  discountPercentage: Yup.number()
    .typeError("Please enter a valid number")
    .required("This Field is required"),
  stock: Yup.string()
    .typeError("Please enter a valid number")
    .required("This Field is required"),
  price: Yup.string()
    .typeError("Please enter a valid number")
    .required("This Field is required"),
  brand: Yup.string().required("This Field is required"),
  category: Yup.string().required("This Field is required"),
  description: Yup.string().required("This Field is required"),
  thumbnail: Yup.string().required("This Field is required"),
});
