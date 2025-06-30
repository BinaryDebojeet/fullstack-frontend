import axios from 'axios';

// Create axios instance with your backend base URL
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add token automatically to every request if available
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export default API;

