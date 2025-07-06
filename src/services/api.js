import axiosInstance from "./axiosInstance.js";

//endpoint functions
export const createAccount = (userData) => {
    axiosInstance.post("/users/register" , userData, {
        headers :{
            "Content-Type" : "multipart/form-data"
        }
    })
}

export const login = (Credentials) => axiosInstance.post("/users/login" , Credentials)

export const getCurrentUser = () => axiosInstance.get("/users/current-user")

export const logout = () => axiosInstance.post("/users/logout")

export const fetchVideos = () => axiosInstance.get("/videos")

export const fetchVideoDetails = () => axiosInstance.get(`/videos/${id}`)

export const uploadVideo = (videoData) => axiosInstance.post("/videos" , videoData)