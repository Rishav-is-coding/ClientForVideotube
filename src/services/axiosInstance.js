import axios from "axios"
import config from "../config/config.js";

const axiosInstance = axios.create({
    baseURL : config.baseURL,
    withCredentials : true, // include cookies in requests
})

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const serverError = error;
        if(error?.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try{
                await axios.post(
                    `${config.baseURL}/users/refresh-token`,
                    {},
                    { withCredentials : true }
                )
                
                //retry original request with new token
                return axiosInstance(originalRequest)
            }catch(error) {
                console.error(error.response)
                return Promise.reject(serverError ? serverError : error)
            }
        }

        return Promise.reject(error)
    }
)

export default axiosInstance
