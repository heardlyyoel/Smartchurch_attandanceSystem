// src/api/apiClient.js
import axios from 'axios';

// ==========================================
// 1. PABRIK AXIOS & SATPAM TOKEN
// ==========================================
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ==========================================
// 2. BUKU MENU API (Daftar Fungsi)
// ==========================================

// API untuk Attendance (Streaming CCTV)
export const getVideoFeedUrl = () => `${apiClient.defaults.baseURL}video_feed/`;

// API untuk Ambil Semua Member (Dari temuan GuestValidation-mu)
export const getAllMembers = async () => {
  const response = await apiClient.get('/members/');
  return response.data; // Langsung kita return datanya biar komponen UI makin bersih!
};

// API untuk Membuat Jemaat Baru
export const createMember = async (payload) => {
  // Kita return seluruh "response" karena komponen UI-mu mengecek response.status
  return await apiClient.post('/members/', payload); 
};

// API untuk Mengikat Wajah ke Jemaat Lama
export const addFaceToMember = async (memberId, faceImageUrl) => {
  return await apiClient.post(`/members/${memberId}/add_face/`, { 
    face_image_url: faceImageUrl 
  });
};

// API untuk Login JWT
export const loginUser = async (credentials) => {
  return await apiClient.post('/token/', credentials);
};

// ==========================================
// API UNTUK MANAGE USERS
// ==========================================

// Membuat User Baru (POST)
export const createUser = async (payload) => {
  return await apiClient.post('/manage-users/', payload);
};

// Mengedit User yang Sudah Ada (PUT)
export const updateUser = async (id, payload) => {
  return await apiClient.put(`/manage-users/${id}/`, payload);
};

// Menghapus User (DELETE)
export const deleteUser = async (id) => {
  return await apiClient.delete(`/manage-users/${id}/`);
};

// Mengedit Data Jemaat (PUT)
export const updateMember = async (id, payload) => {
  return await apiClient.put(`/members/${id}/`, payload);
};

// Menghapus Data Jemaat (DELETE)
export const deleteMember = async (id) => {
  return await apiClient.delete(`/members/${id}/`);
};
export default apiClient;