import * as yup from "yup"
const registerSchema = yup.object({
    first_name: yup.string().required("Please filling"),
    last_name: yup.string().required("Please filling"),
    username: yup.string().required("Please filling"),
    password: yup.string().min(3).required("Please filling"),
})

export default registerSchema;