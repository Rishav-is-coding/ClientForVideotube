import axios from './axios';

export const toggleSubscription = (channelId) => axios.post(`/subscriptions/c/${channelId}`);
export const getChannelSubscribers = (channelId) => axios.get(`/subscriptions/c/subscribers/${channelId}`);
export const getSubscribedChannels = (userName) => axios.get(`/subscriptions/c/subscribed-to/${userName}`);
