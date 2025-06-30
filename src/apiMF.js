import axios from 'axios';

// Create axios instance with mfapi base URL
const MFAPI = axios.create({
  baseURL: 'https://api.mfapi.in',
});

export default MFAPI;
