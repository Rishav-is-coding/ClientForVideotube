import axios from './axios';

export const getVideos = () => axios.get('/videos');
export const getVideoById = (id) => axios.get(`/videos/${id}`);
export const uploadVideo = (data) => axios.post('/videos/upload-video', data);
export const getRecommended = (videoId) => axios.get(`/videos/recommendation/${videoId}`);
