import axios from 'axios';

// In production (Vercel), VITE_API_URL points to Railway backend
// In development, proxy in vite.config.js routes /api → localhost:8000
const BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Auto-attach JWT token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('gov_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
