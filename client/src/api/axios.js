// src/api/axios.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://gift-platform.onrender.com', // your backend URL
  withCredentials: true, // enable if you're using cookies/auth
});

export default API;
