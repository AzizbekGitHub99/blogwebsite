import axios from "axios";
import { ENDPOINT } from "../consts";
import { toast } from "react-toastify";

const request = axios.create({
    baseURL: ENDPOINT,
    timeout: 10000,
})

request.interceptors.response.use(response => response, (error) =>{
    toast.error(error?.message);
    return Promise.reject(error);
})
export default request