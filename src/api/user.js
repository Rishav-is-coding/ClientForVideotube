import axios from './axios';

export const register = (data) => axios.post('/users/register', data);
export const login = (data) => axios.post('/users/login', data);
export const getCurrentUser = () => axios.get('/users/current-user');
export const logout = () => axios.post('/users/logout');
export const getChannelProfile = (userName) => axios.get(`/users/c/${userName}`);
export const getWatchHistory = () => axios.get('/users/history');
export const getDashboardData = (userName) => axios.get(`/users/c/${userName}/dashboard`);

