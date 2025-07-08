import axios from './axios';

export const getComments = (videoId) => axios.get(`/comments/${videoId}`);
export const addComment = (videoId, data) => axios.post(`/comments/${videoId}`, data);
export const updateComment = (commentId, data) => axios.patch(`/comments/c/${commentId}`, data);
export const deleteComment = (commentId) => axios.delete(`/comments/c/${commentId}`);
