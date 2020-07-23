import * as yup from 'yup'

const formSchema = yup.object().shape({
    email: yup
      .string()
      .email("Email must be valid")
      .required("Email is required"),
    name: yup
      .string()
      .required("Name is Required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required")
  })
  
  export default formSchema