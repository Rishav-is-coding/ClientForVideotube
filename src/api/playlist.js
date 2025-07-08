import axios from './axios';

export const getUserPlaylists = (userName) => axios.get(`/playlists/user/${userName}`);
export const createPlaylist = (data) => axios.post('/playlists', data);
export const getPlaylistById = (playlistId) => axios.get(`/playlists/${playlistId}`);
export const addVideoToPlaylist = (videoId, playlistId) => axios.patch(`/playlists/add/${videoId}/${playlistId}`);
export const removeVideoFromPlaylist = (videoId, playlistId) => axios.patch(`/playlists/remove/${videoId}/${playlistId}`);
export const deletePlaylist = (playlistId) => axios.delete(`/playlists/${playlistId}`);
export const updatePlaylist = (playlistId, data) => axios.patch(`/playlists/${playlistId}`, data);
