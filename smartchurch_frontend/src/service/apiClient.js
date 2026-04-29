// src/api/apiClient.js
import axios from 'axios';

// --- Axios & Token Setup ---
const apiClient = axios.create({
  baseURL: '/api/',
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// --- Auth ---
export const loginUser = async (credentials) => await apiClient.post('/token/', credentials);

// --- Video Feed ---
export const getVideoFeedUrl = () => `${apiClient.defaults.baseURL}video_feed/`;

// --- Members API ---
export const getAllMembers = async () => {
  const response = await apiClient.get('/members/');
  return response.data; 
};
export const createMember = async (payload) => await apiClient.post('/members/', payload); 
export const updateMember = async (id, payload) => await apiClient.put(`/members/${id}/`, payload);
export const deleteMember = async (id) => await apiClient.delete(`/members/${id}/`);
export const addFaceToMember = async (memberId, faceImageUrl) => {
  return await apiClient.post(`/members/${memberId}/add_face/`, { face_image_url: faceImageUrl });
};

// --- Users API ---
export const getAllUsers = async () => {
  const response = await apiClient.get('/manage-users/');
  return response.data;
};
export const createUser = async (payload) => await apiClient.post('/manage-users/', payload);
export const updateUser = async (id, payload) => await apiClient.put(`/manage-users/${id}/`, payload);
export const deleteUser = async (id) => await apiClient.delete(`/manage-users/${id}/`);

export default apiClient;