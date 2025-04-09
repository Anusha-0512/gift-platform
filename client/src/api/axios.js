// src/api/axios.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // your backend URL
  withCredentials: true, // enable if you're using cookies/auth
});

export default API;
