import * as yup from "yup"

const loginSchema  = yup.object({
    username: yup.string().required('Required'),
    password: yup.string().min(5).required('Required')
})

export default loginSchema; 