import axios from './axios';

export const toggleVideoLike = (videoId) => axios.post(`/likes/toggle/v/${videoId}`);
export const toggleCommentLike = (commentId) => axios.post(`/likes/toggle/c/${commentId}`);
export const getLikedVideos = () => axios.get('/likes/videos');
